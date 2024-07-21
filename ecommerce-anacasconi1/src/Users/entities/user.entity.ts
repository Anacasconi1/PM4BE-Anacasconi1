import { Order } from "src/Orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'


@Entity({
  name: "users"
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({length:50})
  name: string;

  @Column({length:50, unique:true})
  email: string;

  @Column({length:20})
  password: string;
  
  @Column({type: "integer"})
  phone: number;
  
  @Column({type: "text"})
  address: string;

  @Column({length:50})
  country?: string | undefined;

  @Column({length:50})
  city?: string | undefined;

  @OneToMany(()=> Order, (order) => order.user)
  orders: Order[]
}
