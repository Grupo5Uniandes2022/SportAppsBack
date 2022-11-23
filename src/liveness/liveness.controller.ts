import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller('liveness')
export class LivenessController {
  @Get('health-check')
  healthCheck() {
    return 'Health check passed';
  }
  @Get('bad-health')
  badCheck() {
    throw new InternalServerErrorException('Health check did not pass');
  }
}
