import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './decorators';
import { User } from './entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  const mockAuthService = {
    create: jest.fn(),
    login: jest.fn(),
    checkAuthStatus: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, {provide: Auth, useValue: jest.fn().mockImplementation(()=>true)}],
    })
    .overrideProvider(AuthService).useValue(mockAuthService)
    .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user',() => {
    const createSpy = jest.spyOn(authService, 'create');
    controller.create({email:'test',fullName:'test',password:'test'});
    expect(createSpy).toHaveBeenCalled();
  });
  it('should login a user',() => {
    const loginSpy = jest.spyOn(authService, 'login');
    controller.loginUser({email:'test',password:'test'});
    expect(loginSpy).toHaveBeenCalled();
  });
  it('should check user status',() => {
    const checkSpy = jest.spyOn(authService, 'checkAuthStatus');
    controller.checkAuthStatus(new User);
    expect(checkSpy).toHaveBeenCalled();
  });
});
