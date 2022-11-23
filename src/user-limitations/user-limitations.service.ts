import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserLimitationDto } from './dto/create-user-limitation.dto';
import { UserLimitation } from './entities/user-limitation.entity';

@Injectable()
export class UserLimitationsService {
  constructor(
    @InjectRepository(UserLimitation)
    private readonly userLimitationRepository: Repository<UserLimitation>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}
  async create(userId: string, createUserLimitationDto: CreateUserLimitationDto) {
    try {
    const user = await this.userRepository.findOneBy({id: userId});
    const newUserLimitation = await this.userLimitationRepository.create(createUserLimitationDto);
    await this.userLimitationRepository.save(newUserLimitation);
    user.userLimitation = newUserLimitation;
    await  this.userRepository.save(user);
      } catch (error) {
        console.log(error);      
      }
    return {ok: true, message: 'Process completed'};
  }
}
