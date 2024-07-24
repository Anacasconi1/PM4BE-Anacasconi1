// import { Product } from "src/Products/entities/product.entity";
// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import {v4 as uuid} from 'uuid'

// @Entity()
// export class File {
//     @PrimaryGeneratedColumn('uuid')
//     id: string = uuid()

//     @Column()
//     name: string

//     @Column()
//     mimetype: string

//     @Column({type: 'bytea'})
//     data: Buffer

//     @ManyToOne(()=> Product, (product)=> product.images)
//     @JoinColumn()
//     product: Product
// }
