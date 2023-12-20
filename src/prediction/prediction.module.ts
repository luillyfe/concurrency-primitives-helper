import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConcurrentService } from './concurrent/concurrent.service';
import { PredictionController } from './prediction/prediction.controller';

@Module({
  imports: [ConfigModule],
  providers: [ConcurrentService],
  controllers: [PredictionController],
})
export class PredictionModule {}
