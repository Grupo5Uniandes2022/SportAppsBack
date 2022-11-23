import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as BcryptUtils from 'bcrypt';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService, 
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn()
          } 
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn()
          }
        }
      ],
    })
    .compile();

    service = module.get<AuthService>(AuthService);
    userRepository =  module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should inject user repo', () => {
    expect(userRepository).toBeDefined();
  });
  it('should create user', async () => {
    jest.spyOn(userRepository,'create').mockReturnValue({
      id: '1', email: 'test', password: 'sdadas', fullName: 'test', isActive: true, roles: [], pay: {id:'test', title:'test plan',features: ["te1"], users: []},userLimitation:null, events: []
    });
    await service.create({
      fullName:'test',
      email:'test',
      password: 'test'
    });
    expect(userRepository.create).toHaveBeenCalled();
  });
  it('should handle db failure', async () => {
    const userSpy =  jest.spyOn(userRepository,'create');
    await expect(service.create({
      fullName:'test',
      email:'test',
      password: 'test'
    })
    ).rejects.toThrow(InternalServerErrorException);
  });
  it('should handle db failure 2', async () => {
    const userSpy =  jest.spyOn(userRepository,'create');
    let throwError = {code: '0'};
    try {
      await service.create({
        fullName:'test',
        email:'test',
        password: 'test'
      })
    } catch (error) {
      throwError.code = '23505'
    }
    expect(throwError.code).toEqual('23505');
  });

  it('should login user', async () => {
    jest.spyOn(BcryptUtils, 'compareSync').mockReturnValue(true);
    jest.spyOn(userRepository,'findOne').mockResolvedValue({
      id: '1', email: 'test', password: 'sdadas', fullName: 'test', isActive: true, roles: [], pay: {id:'test', title:'test plan',features: ["te1"], users: []},userLimitation:null, events: []
    });
    await service.login({
      email:'test',
      password: 'test'
    });
    expect(userRepository.findOne).toHaveBeenCalled();
  });
  it('should throw credentials invalid user wrong password', async () => {
    jest.spyOn(BcryptUtils, 'compareSync').mockReturnValue(false);
    jest.spyOn(userRepository,'findOne').mockResolvedValue({
      id: '1', email: 'test', password: 'sdadas', fullName: 'test', isActive: true, roles: [], pay: {id:'test', title:'test plan',features: ["te1"], users: []},userLimitation:null, events: []
    });
    await expect(service.login({
      email:'test',
      password: 'test'
    })
    ).rejects.toThrow(UnauthorizedException)
  });
  it('should throw credentials not found user', async () => {
    jest.spyOn(BcryptUtils, 'compareSync').mockReturnValue(false);
    await expect(service.login({
      email:'test',
      password: 'test'
    })
    ).rejects.toThrow(UnauthorizedException)
  });

  it('should check status', () => {
    const jwtSpy = jest.spyOn(JwtService.prototype,'sign')
    service.checkAuthStatus({
      id: '1', email: 'test', password: 'sdadas', fullName: 'test', isActive: true, roles: [], pay: {id:'test', title:'test plan',features: ["te1"], users: []},userLimitation:null, events:[]
    });
    expect(jwtSpy).not.toHaveBeenCalled()
  });
});

