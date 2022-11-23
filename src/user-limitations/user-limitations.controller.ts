import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserLimitationsService } from './user-limitations.service';
import { CreateUserLimitationDto } from './dto/create-user-limitation.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { Food } from './data/food';

@Controller('user-limitations')
export class UserLimitationsController {
  constructor(private readonly userLimitationsService: UserLimitationsService) {}

  @Post()
  @Auth()
  create(@GetUser()user: User, @Body() createUserLimitationDto: CreateUserLimitationDto) {
    return this.userLimitationsService.create(user.id, createUserLimitationDto);
  }

  @Get('/food/:type')
  @Auth()
  getFoodPlan(@Param('type')type: string){
    if(['vegano','vegetariano','curdivegano','animal'].includes(type)){
      return Food[type];
    }
    else{
      return {ok: false, message: 'los tipos deben son vegano,vegetariano,curdivegano,animal'}
    }
  }

}
