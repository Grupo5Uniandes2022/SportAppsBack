import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Service } from '../services/entities/service.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ServicesService', () => {
  let service: ServicesService;
  let serviceRepository: Repository<Service>;
  let userRepository: Repository<User>;
  const SERVICE_REPOSITORY_TOKEN = getRepositoryToken(Service);
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: SERVICE_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    serviceRepository = module.get<Repository<Service>>(
      SERVICE_REPOSITORY_TOKEN,
    );
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
