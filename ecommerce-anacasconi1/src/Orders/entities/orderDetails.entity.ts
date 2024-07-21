import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/Products/entities/product.entity";
import { Order } from "src/Orders/entities/order.entity";
import {v4 as uuid} from 'uuid'


@Entity()
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({type: "decimal", scale: 2})
    price: number

    @OneToOne(()=> Order, order => order.orderDetails)
    @JoinColumn()
    order: Order

    @ManyToMany(()=>Product, product => product.orderDetails)
    products: Product[]
}