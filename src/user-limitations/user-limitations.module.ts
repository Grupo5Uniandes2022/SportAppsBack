import { Module } from '@nestjs/common';
import { UserLimitationsService } from './user-limitations.service';
import { UserLimitationsController } from './user-limitations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLimitation } from './entities/user-limitation.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLimitation]),
    AuthModule
  ],
  controllers: [UserLimitationsController],
  providers: [UserLimitationsService]
})
export class UserLimitationsModule {}
