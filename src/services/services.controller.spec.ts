import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: ServicesService;

  const mockService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [ServicesService],
    })
      .overrideProvider(ServicesService)
      .useValue(mockService)
      .compile();

    controller = module.get<ServicesController>(ServicesController);
    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all', () => {
    const findSpy = jest.spyOn(service, 'findAll');
    controller.findAll();
    expect(findSpy).toHaveBeenCalled();
  });

  it('create Services', () => {
    const findSpy = jest.spyOn(service, 'create');
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
        name: '',
        address: '',
        type: '',
      },
    );
    expect(findSpy).toHaveBeenCalled();
  });
});
