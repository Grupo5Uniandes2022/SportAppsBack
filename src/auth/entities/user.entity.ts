import { Pay } from '../../pay/entities/pay.entity';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import { UserLimitation } from '../../user-limitations/entities/user-limitation.entity';
import { Event } from '../../events/entities/event.entity';


@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  email: string;
  
  @Column('text',{
    select: false
  })
  password: string;
  
  @Column('text')
  fullName: string;
  
  @Column('bool',{
    default: true
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user']
  })
  roles: string[];

  @ManyToOne(()=> Pay, (pay) => pay.users)
  pay: Pay;

  @OneToOne(() => UserLimitation)
  @JoinColumn()
  userLimitation: UserLimitation;

  @OneToMany(() => Event, (event)=> event.user)
  events: Event[]  
}
