import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    
  }
  async create(user: User, createEventDto: CreateEventDto) {
    const newEvent = await this.eventRepository.create(createEventDto);
    newEvent.user = user;
    await    this.eventRepository.save(newEvent);
    return {ok: true}
  }

  async update(user: User, idEvento: string, updateEventDto: UpdateEventDto) {
    const updateEvent = await this.eventRepository.update(idEvento, updateEventDto);
    return {ok: true}
  }

  async findAll(user: User) {
    return  await (await this.eventRepository.find({relations:['user']})).filter(event => event.user.id === user.id);

  }

  async setAppointment(user: User, idDoctor: string, createEventDto: CreateEventDto){
    createEventDto.title = `Appointment ${user.fullName}`;
    const newEvent = await this.eventRepository.create(createEventDto)
    const doctor = await this.userRepository.findOneBy({id: idDoctor});
    if(doctor){
      newEvent.user = doctor;
      await this.eventRepository.save(newEvent);
      const newUserEvent = await this.eventRepository.create({...createEventDto,user,title: `Appointment ${doctor.fullName}` })
      await this.eventRepository.save(newUserEvent);
      return {ok: true}
    }    
    return {ok: false}
   }

   async addEvents(user: User, eventNumber: number){
    const states= ['appointment','free']; 
    for(let i = 0; i < eventNumber ; i++){
      const createDto = new CreateEventDto()
      createDto.endDate = new Date();
      createDto.endDate.setDate(createDto.endDate.getDay() + i);
      createDto.startDate = new Date();
      createDto.startDate.setDate(createDto.startDate.getDay() + i);
      createDto.type = states[Math.floor(Math.random() * 2)];
      createDto.duration = Math.floor(Math.random() * 10);
      createDto.distance = Math.floor(Math.random() * 10);
      createDto.title = createDto.type;
      await this.create(user, createDto );
    }

   }
 
}
