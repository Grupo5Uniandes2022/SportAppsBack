import { User } from "../../auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  distance: number;

  @Column()
  duration: number;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

}
