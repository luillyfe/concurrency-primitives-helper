import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
} from '@google/generative-ai';

@Injectable()
export class ConcurrentService {
  private model: GenerativeModel;
  private prompt: string;

  private safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  private generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  constructor(private configService: ConfigService) {
    const MODEL_NAME = this.configService.get<string>('MODEL_NAME');
    const API_KEY = this.configService.get<string>('API_KEY');

    const genAI = new GoogleGenerativeAI(API_KEY);
    this.model = genAI.getGenerativeModel({ model: MODEL_NAME });
    this.prompt = this.configService.get<string>('TODOS_PROMPT');
  }

  async predict(text: string) {
    // Wrapping the input query
    const parts = [{ text }];

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
    });

    const response = result.response;
    return response.text();
  }

  // Generate the code for the predictTodos async method
  async predictTodos(topic = 'anything') {
    const parts = [
      {
        text:
          `Dear Gemini Pro, please set the context to ${topic}.` + this.prompt,
      },
    ];

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
    });

    const response = result.response;
    return response.text();
  }
}
