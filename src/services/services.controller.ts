import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Auth()
  create(@GetUser() user: User, @Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(user, createServiceDto);
  }

  @Get('/by-supplier')
  @Auth()
  findAllByUser(@GetUser() user: User) {
    return this.servicesService.findAllByUser(user);
  }

  @Get()
  @Auth()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @Auth()
  find(@GetUser() user: User, @Param('id') id: string) {
    return this.servicesService.find(user, id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
