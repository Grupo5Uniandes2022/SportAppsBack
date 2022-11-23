import { Controller, Get, Post, Body } from '@nestjs/common';
import { PayService } from './pay.service';
import { CreatePayDto } from './dto/create-pay.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { AddPayDto } from './dto/add-pay.dto';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post()
  create(@Body() createPayDto: CreatePayDto) {
    return this.payService.create(createPayDto);
  }

  @Get()
  findAll() {
    return this.payService.findAll();
  }
  @Get('user')
  @Auth()
  getUserPay(@GetUser() user: User){
    return this.payService.findUserPayment(user);
  }

  @Post('user')
  @Auth()
  addUserPay(@GetUser() user: User, @Body() payTitle: AddPayDto){
    return this.payService.addUserPayment(user,payTitle);
  }
}
