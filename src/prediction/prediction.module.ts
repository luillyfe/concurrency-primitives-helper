import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConcurrentService } from './concurrent/concurrent.service';

@Module({
  imports: [ConfigModule],
  providers: [ConcurrentService],
  exports: [ConcurrentService],
})
export class PredictionModule {}
