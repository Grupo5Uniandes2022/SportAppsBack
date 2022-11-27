import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

describe('SeedController', () => {
  let controller: SeedController;
  let service: SeedService;

  const mockService = {
    executeSeed: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [SeedService],
    })
      .overrideProvider(SeedService)
      .useValue(mockService)
      .compile();

    controller = module.get<SeedController>(SeedController);
    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should executeSeed', () => {
    const executeSeed = jest.spyOn(service, 'executeSeed');
    controller.executeSeed();
    expect(executeSeed).toHaveBeenCalled();
  });
});
