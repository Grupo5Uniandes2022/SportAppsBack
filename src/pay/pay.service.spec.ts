import { Test, TestingModule } from '@nestjs/testing';
import { PayService } from './pay.service';
import { Repository } from 'typeorm';
import { Pay } from './entities/pay.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';

describe('PayService', () => {
  let service: PayService;
  let payRepository: Repository<Pay>;
  let userRepository: Repository<User>;
  const PAY_REPOSITORY_TOKEN = getRepositoryToken(Pay);
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayService,
        {
          provide: PAY_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
          }
        },{
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<PayService>(PayService);
    payRepository = module.get<Repository<Pay>>(PAY_REPOSITORY_TOKEN);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all plans', async () => {
    const paySpy = jest.spyOn(payRepository, 'find')
    await service.findAll()
    expect(paySpy).toHaveBeenCalled();
  });

  it('should create a plan', async () => {
    const paySpy = jest.spyOn(payRepository, 'create')
    await service.create({features:['/test'],title:'test plan'});
    expect(paySpy).toHaveBeenCalled();
  });
  it('should create a plan with exception', async () => {
    const paySpy = jest.spyOn(payRepository, 'create').mockImplementation(() => {
      throw  new ConflictException('Conflict')
    });
    try {
     await service.create({features:['/test'],title:'test plan'});
    } catch (error) {
      expect(error.message).toBe('Conflict');
    }
  });
});
