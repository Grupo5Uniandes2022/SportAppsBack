import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Event } from './entities/event.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as BcryptUtils from 'bcrypt';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

describe('EventsService', () => {
  let service: EventsService;
  let userRepository: Repository<User>;
  let eventRepository: Repository<Event>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const EVENT_REPOSITORY_TOKEN = getRepositoryToken(Event);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        EventsService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: EVENT_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    eventRepository = module.get<Repository<Event>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should inject user repo', () => {
    expect(userRepository).toBeDefined();
  });

  it('should inject user repo', () => {
    expect(eventRepository).toBeDefined();
  });
});
