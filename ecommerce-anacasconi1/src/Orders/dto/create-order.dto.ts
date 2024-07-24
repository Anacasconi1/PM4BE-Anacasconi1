
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/products/entities/Product.entity"


export class OrderDto {
    @IsNotEmpty()
    @IsUUID()
    idUser: string

    @IsArray()
    @ArrayNotEmpty()
    products: Partial<Product[]>
}
