import { Test, TestingModule } from '@nestjs/testing';
import { UserLimitationsService } from './user-limitations.service';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { UserLimitation } from './entities/user-limitation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserLimitationsService', () => {
  let service: UserLimitationsService;
  let userLimitationRepository: Repository<UserLimitation>;
  let userRepository: Repository<User>;
  const USER_LIMITATION_REPOSITORY_TOKEN = getRepositoryToken(UserLimitation);
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserLimitationsService,
        {
          provide: USER_LIMITATION_REPOSITORY_TOKEN,
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

    service = module.get<UserLimitationsService>(UserLimitationsService);
    userLimitationRepository = module.get<Repository<UserLimitation>>(
      USER_LIMITATION_REPOSITORY_TOKEN,
    );
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should inject userLimitationRepository repo', () => {
    expect(userLimitationRepository).toBeDefined();
  });

  it('should inject user repo', () => {
    expect(userRepository).toBeDefined();
  });
});
