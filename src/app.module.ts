import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PredictionModule } from './prediction/prediction.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    PredictionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
