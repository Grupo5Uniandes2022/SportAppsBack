import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  const mockService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    })
      .overrideProvider(EventsService)
      .useValue(mockService)
      .compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all', () => {
    const findSpy = jest.spyOn(service, 'findAll');
    controller.findAll({
      email: 'test',
      fullName: 'test',
      password: 'test',
      plan: '',
      edad: 0,
      peso: 0,
      imc: 0,
      id: '',
      isActive: false,
      roles: [],
      pay: null,
      userLimitation: null,
      events: [],
    });
    expect(findSpy).toHaveBeenCalled();
  });

  it('create Events', () => {
    const createSpy = jest.spyOn(service, 'create');
    controller.create(
      {
        email: 'test',
        fullName: 'test',
        password: 'test',
        plan: '',
        edad: 0,
        peso: 0,
        imc: 0,
        id: '',
        isActive: false,
        roles: [],
        pay: null,
        userLimitation: null,
        events: [],
      },
      {
        startDate: undefined,
        endDate: undefined,
        title: '',
        type: '',
        duration: 0,
        distance: 0,
      },
    );
    expect(createSpy).toHaveBeenCalled();
  });
});
