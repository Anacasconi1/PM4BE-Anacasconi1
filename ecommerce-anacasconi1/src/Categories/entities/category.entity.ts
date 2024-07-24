import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/Product.entity";
import {v4 as uuid} from 'uuid'

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column({length: 50, unique: true})
    name: string

    @OneToMany(()=>Product, (product)=>product.category)
    products: Product[]
}