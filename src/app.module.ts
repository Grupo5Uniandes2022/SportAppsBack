import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PayModule } from './pay/pay.module';
import { UserLimitationsModule } from './user-limitations/user-limitations.module';
import { EventsModule } from './events/events.module';
import { SeedModule } from './seed/seed.module';
import { ServicesModule } from './services/services.module';
import { LivenessModule } from './liveness/liveness.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true //No Usar en prod, en prod hay migraciones
    }),
    AuthModule,
    PayModule,
    UserLimitationsModule,
    EventsModule,
    SeedModule,
    ServicesModule,
    LivenessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
