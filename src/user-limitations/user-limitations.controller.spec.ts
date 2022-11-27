import { Test, TestingModule } from '@nestjs/testing';
import { UserLimitationsController } from './user-limitations.controller';
import { UserLimitationsService } from './user-limitations.service';

describe('UserLimitationsController', () => {
  let controller: UserLimitationsController;
  let service: UserLimitationsService;

  const mockService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLimitationsController],
      providers: [UserLimitationsService],
    })
      .overrideProvider(UserLimitationsService)
      .useValue(mockService)
      .compile();

    controller = module.get<UserLimitationsController>(
      UserLimitationsController,
    );
    service = module.get<UserLimitationsService>(UserLimitationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create UserLimitations', () => {
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
        alimentationType: '',
        alergies: [],
        foodIntolerances: [],
      },
    );
    expect(findSpy).toHaveBeenCalled();
  });
});
