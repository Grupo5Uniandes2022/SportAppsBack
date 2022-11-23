import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePayDto } from './dto/create-pay.dto';
import { Pay } from './entities/pay.entity';
import { AddPayDto } from './dto/add-pay.dto';

@Injectable()
export class PayService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Pay)
    private readonly payRepository: Repository<Pay>,
  ){}

  async findAll() {
    return await this.payRepository.find({});
  }

  async create(createPayDto: CreatePayDto){
    try {
      const newPay = await this.payRepository.create(createPayDto);
      await this.payRepository.save(newPay);
      return {ok: true}
    } catch (error) {
       throw  new ConflictException(error.detail);
    }
  }

  async findUserPayment(user: User){
    const userDB = await this.userRepository.findOne({where: {id: user.id}, relations: ['pay']});
    return {userDB};
  }

  async addUserPayment(user: User, {payTitle}: AddPayDto){
    const pay = await this.payRepository.findOneBy({title: payTitle});
    const userDb = await this.userRepository.findOneBy({id: user.id});

    userDb.pay = pay;
    await this.userRepository.save(userDb);

    return {ok: true};

    
  }
}
