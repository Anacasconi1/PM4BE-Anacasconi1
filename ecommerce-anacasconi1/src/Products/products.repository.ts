import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { ProductDto } from "./dto/product.dto";

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
    getProducts (){
        return this.products
    }

    getProductsById(id: number){
        const product = this.products.find(product => product.id === id)
        return product
    }

    createProducts (product: ProductDto) {
        const id = this.products.length + 1;
        this.products.push({id, ...product})
        return {
            message: "Producto creado con exito",
            id
        }
    }

    updateProduct (newProduct: ProductDto, id: number){
        const product = this.products.find(product => product.id === id)
        product.imgUrl = newProduct.imgUrl
        product.description = newProduct.description
        product.name = newProduct.name
        product.price = newProduct.price
        product.stock = newProduct.stock
        return id
    }

    removeProduct (id: number) {
        this.products.filter(product => product.id !== id)
        return id
    }

    queryParamsLimitAndPage (limit: string, page: string) {
        if(!page){
          page = "1"
        } else if (!limit){
          limit = "5"
        }
      }

}