import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.handlerGuardAuthorization(req);
  }
  handlerGuardAuthorization(request) {
    if (request) {
      const header = request.headers.authorization;
      if (!header || !header.startsWith('Basic ')) {
        return false;
      } else {
        const creds = header.split(' ')[1];
        const email = creds.split(':')[0];
        const password = creds.split(':')[1];
        if(!email || !password){
          return false
        }
        return true
      }
    }
  }
}
