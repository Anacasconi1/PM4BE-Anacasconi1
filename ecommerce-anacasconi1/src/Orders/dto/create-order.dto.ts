import { PartialType } from "@nestjs/mapped-types"
import { ArrayContains, ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/Products/entities/product.entity"


export class OrderDto {
    @IsNotEmpty()
    @IsUUID()
    idUser: string

    @IsArray()
    @ArrayNotEmpty()
    @ArrayContains([PartialType<Product>])
    products: Partial<Product>[]
}
