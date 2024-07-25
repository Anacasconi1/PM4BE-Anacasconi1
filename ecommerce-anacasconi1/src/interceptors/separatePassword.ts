import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformUser implements NestInterceptor  {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            const user = data.newUser
            const {password, passwordConfirm,  ...User} =user
            return {User, statusCode: context.switchToHttp().getResponse().statusCode}
        }))
    }
}

@Injectable()
export class TransformUsers implements NestInterceptor  {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => {
            const User = data.map(user =>{
                const {password,  ...cleanUser} =user
                return cleanUser
            })
            
            return {User, statusCode: context.switchToHttp().getResponse().statusCode}
        }))
    }
}