import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from '../events/events.service';
import { PayService } from '../pay/pay.service';
import { AuthService } from '../auth/auth.service';
import { SeedService } from './seed.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SeedService', () => {
  let service: SeedService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SeedService,
        {
          provide: EventsService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: PayService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
