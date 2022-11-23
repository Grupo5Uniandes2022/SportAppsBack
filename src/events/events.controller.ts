import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Auth()
  create(@GetUser() user: User, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(user, createEventDto);
  }

  @Put('/:id')
  @Auth()
  update(@GetUser() user: User, @Param('id') idEvento: string, @Body() updateEventDto: UpdateEventDto){
    return this.eventsService.update(user, idEvento, updateEventDto);
  }

  @Get()
  @Auth()
  findAll(@GetUser()  user:User) {
    return this.eventsService.findAll(user);
  }

  @Post('/appointment/:id')
  @Auth()
  setAppointment(@GetUser() user: User, @Param('id') idDoctor: string, @Body() createEventDto: CreateEventDto){
    return this.eventsService.setAppointment(user, idDoctor, createEventDto);
  }

}
