import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser, RawHeaders, Auth, RoleProtected } from './decorators';
import {
  LoginUserDto,
  CreateUserDto,
  UpdateUserDto,
  SportUserDto,
} from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('plan')
  @Auth()
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.authService.update(updateUserDto, user);
  }

  @Post('sport')
  @Auth()
  updateSportInfo(@Body() sportUserDto: SportUserDto, @GetUser() user: User) {
    return this.authService.updateSportInfo(sportUserDto, user);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
