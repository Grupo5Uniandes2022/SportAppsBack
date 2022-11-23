import { Test, TestingModule } from '@nestjs/testing';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';

describe('PayController', () => {
  let controller: PayController;
  let payService: PayService;

  const mockService = {
    findAll: jest.fn(),
    create: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayController],
      providers: [PayService],
    })
    .overrideProvider(PayService).useValue(mockService)
    .compile();

    controller = module.get<PayController>(PayController);
    payService = module.get<PayService>(PayService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all', () => {
    const findSpy = jest.spyOn(payService, 'findAll');
    controller.findAll();
    expect(findSpy).toHaveBeenCalled();
  });

  it('create payment', () => {
    const createSpy = jest.spyOn(payService, 'create');
    controller.create({title: 'test plan', features: ['/test']});
    expect(createSpy).toHaveBeenCalled();
  });
});
