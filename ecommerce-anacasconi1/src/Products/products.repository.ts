import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsRepository {
    private products:Product[]=[
        {
            id: 1,
            imgUrl: "https://unaurlcualquiera.com",
            description: "Celular Samsung S24",
            name: "Celular",
            price: 1000,
            stock: true
        },{
            id:2,
            imgUrl: "https://unaurlcualquiera.com",
            description: "Horno electrico color gris oscuro",
            name: "Horno electrico",
            price: 600,
            stock: true
        },{
            id:3,
            imgUrl: "https://unaurlcualquiera.com",
            description: "Mouse inhalambrico tamaño mediano hergonomico",
            name: "Mouse inhalambrico",
            price: 800,
            stock: true
        },{
            id:4,
            imgUrl: "https://unaurlcualquiera.com",
            description: "Pack de resaltadores filgo color pastel",
            name: "pack de resaltadores",
            price: 3,
            stock: true
        }
    ]
    async getProducts (){
        return await this.products
    }
}