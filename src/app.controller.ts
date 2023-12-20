import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';

import { ConcurrentService } from './prediction/concurrent/concurrent.service';

@Controller()
export class AppController {
  constructor(private concurrentService: ConcurrentService) {}

  @Get()
  getHello(): { message: string } {
    return { message: 'root endpoint for the prediction API' };
  }

  // Endpoint for the prediction API
  // the get handler method will return a promise that resolves to a string
  // the string will be the output of the predict method from the concurrentService
  // the predict method will take in a string and return a string
  @Post('/predict')
  async predict(@Body('text') text: string): Promise<string> {
    // Generate input validation on text input string
    if (!text) {
      // If the text input is empty, return a error message
      throw new BadRequestException('Please enter a valid text input');
    }

    // Perform data sanitization on input string to remove any harmful characters
    text = text.replace(/[^a-zA-Z0-9 ]/g, '');

    // Call the predict method from the concurrentService
    return await this.concurrentService.predict(text);
  }
}
