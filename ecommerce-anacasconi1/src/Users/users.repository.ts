import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository {
    private users: User[] = [
        {
            id: 1,
            email: "Sincere@april.biz",
            name: "Leanne Graham",
            password: "ofsw54564",
            address: "Kulas Light Apt.658",
            phone: "1-770-736-8031 x56442",
            city: "Gwenborough",
            country:"Belgica"
        },
        {
            id: 2,
            email: "kjga@april.biz",
            name: "Jane Doe",
            password: "sg465fgvd",
            address: "Victor Plains 89",
            phone: "010-692-6593 x09125",
            city: "South Elvis",
            country:"Alemania"
        },{
            id: 3,
            email: "maria@mail.biz",
            name: "Maria lopez",
            password: "df546d",
            address: "Calle siempre viva 123",
            phone: "0303456",
            
        },{
            id: 4,
            email: "leo123@champ.colombiatucasa",
            name: "Lionel Andres Messi",
            password: "afma4",
            address: "Calle bicampeon 4",
            phone: "0800alloraralcampito",
            country:"Argentina"
        }
    ]
    async getUsers (){
        return await this.users
    }
    }