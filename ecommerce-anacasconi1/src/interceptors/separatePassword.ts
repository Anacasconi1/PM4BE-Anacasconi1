import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformUser implements NestInterceptor  {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            const user = data.newUser
            const {password, passwordConfirm, isAdmin,  ...User} =user
            return {User, statusCode: context.switchToHttp().getResponse().statusCode}
        }))
    }
}

@Injectable()
export class TransformUsers implements NestInterceptor  {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            console.log(typeof(data));
            
            const User = data.map(user =>{
                const {password, isAdmin,  ...cleanUser} =user
                return cleanUser
            })
            
            return {User, statusCode: context.switchToHttp().getResponse().statusCode}
        }))
    }
}