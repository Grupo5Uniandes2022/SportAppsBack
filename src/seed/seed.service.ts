import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { EventsService } from '../events/events.service';
import {v4 as uuid} from 'uuid';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { PayService } from '../pay/pay.service';
import { CreatePayDto } from '../pay/dto/create-pay.dto';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly authService: AuthService,
    private readonly eventService: EventsService,
    private readonly payService:PayService
  ) {
    
  }
  async executeSeed() {
  return    await this.insertNewDoctors();
  }

  private async insertNewDoctors(){
    const pay: CreatePayDto[] = [{
      title:'gratis',
      features: ['/home','/pay','/search']
    },
    {
      title: 'intermedio',
      features: ['/home','/pay','/search','/calendar','/workout','/plan']
    },
    {
      title: 'premium',
      features: ['/home','/pay','/search','/calendar','/workout','/plan','/live','/group','/book']
    }
  ]
    const users: CreateUserDto[] = [{
      fullName: 'doc',
      email: 'doc@doc.com',
      password: 'Doc123',
    },
    {
      fullName: 'doc1',
      email: 'doc1@doc.com',
      password: 'Doc123',
    },
    {
      fullName: 'doc2',
      email: 'doc2@doc.com',
      password: 'Doc123',
    },
    {
      fullName: 'doc3',
      email: 'doc3@doc.com',
      password: 'Doc123',
    },
    ];  
      const insertUsersPromises=  [];
      users.forEach(user => insertUsersPromises.push(this.authService.create(user)))
      const rest = await Promise.all(insertUsersPromises);
      const doctorPromises = [];
      rest.forEach(doctor => {
        doctorPromises.push(this.authService.addDoctor(doctor.id))
        doctorPromises.push(this.eventService.addEvents(doctor, 5))
      })
      await Promise.all(doctorPromises);
      const payPromises =[];
      pay.forEach(pay => payPromises.push(this.payService.create(pay)))
      await Promise.all(payPromises);
      return 'seed ok';

    }
  }

