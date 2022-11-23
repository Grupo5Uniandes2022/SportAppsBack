import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from '../auth/auth.module';
import { EventsModule } from '../events/events.module';
import { PayModule } from '../pay/pay.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, EventsModule, PayModule]
})
export class SeedModule {}
