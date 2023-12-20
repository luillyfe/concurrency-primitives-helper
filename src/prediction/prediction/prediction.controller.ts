import {
  Controller,
  Post,
  Body,
  Query,
  Header,
  BadRequestException,
} from '@nestjs/common';

import { ConcurrentService } from '../concurrent/concurrent.service';

@Controller('predict')
export class PredictionController {
  constructor(private readonly concurrentService: ConcurrentService) {}
  // Endpoint for the prediction API
  // the get handler method will return a promise that resolves to a string
  // the string will be the output of the predict method from the concurrentService
  // the predict method will take in a string and return a string
  @Post()
  @Header('Content-Type', 'application/json')
  async predict(
    @Body('text') text: string,
    @Query('format') format = 'json',
  ): Promise<string> {
    // Generate input validation on text input string
    if (!text) {
      // If the text input is empty, return a error message
      throw new BadRequestException('Please enter a valid text input');
    }

    // Perform data sanitization on input string to remove any harmful characters
    text = text.replace(/[^a-zA-Z0-9 ]/g, '');

    // If the format parameter is 'JSON or json' return JSON object
    if (format.toLowerCase() === 'json') {
      return jsonfy(await this.concurrentService.predict(text));
    }

    // Call the predict method from the concurrentService
    return await this.concurrentService.predict(text);
  }
}
// Generate a function to remove any invalid character from an input string.
// The function will take in a string and return a string
// The function will use a regular expression to remove any invalid characters.
function jsonfy(text: string) {
  // remove all backticks from text
  text = text.replace(/`/g, '');

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(error);
    return text;
  }
}
