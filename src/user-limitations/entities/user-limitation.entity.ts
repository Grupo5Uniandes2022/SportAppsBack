import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserLimitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alimentationType: string;

  @Column('text',{
    array: true
  })
  alergies: string[];

  @Column('text',{
    array: true
  })
  foodIntolerances: string[];

}
