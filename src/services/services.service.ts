import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    
  }

  async create(user: User, createServiceDto: CreateServiceDto) {
    const newService = await this.serviceRepository.create(createServiceDto);
    newService.user = user;
    await this.serviceRepository.save(newService);
    return { ok: true };
  }

  async findAll() {
    return await this.serviceRepository.find();
  }

  async findAllByUser(user: User) {
    return await (
      await this.serviceRepository.find({ relations: ['user'] })
    ).filter((service) => service.user.id === user.id);
  }

  async find(user: User, id: string) {
    return await (
      await this.serviceRepository.find({ relations: ['user'] })
    ).filter((service) => service.id === id);
  }

  async remove(id: string) {
    await this.serviceRepository.delete(id);

    return { ok: true };
  }
}
