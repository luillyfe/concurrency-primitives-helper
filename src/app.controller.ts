import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): { message: string } {
    return { message: 'root endpoint for the prediction API' };
  }
}
