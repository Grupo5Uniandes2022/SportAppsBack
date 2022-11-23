import { User } from "../../auth/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class Pay {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{
    unique: true
  })
  title: string;

  @Column('text',{
    array: true
  })
  features: string[];

  @OneToMany(() => User, (user)=> user.pay)
  users: User[]
}
