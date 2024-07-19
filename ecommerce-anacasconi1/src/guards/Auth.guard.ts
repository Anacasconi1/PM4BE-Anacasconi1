import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authRepository: AuthRepository) {}
  private credentials = this.authRepository.usersCredential();
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
        const credentialFinder = this.credentials.find(
          (credentials) =>
            credentials.email === email && credentials.password === password,
        );
        if (!credentialFinder) {
          return false;
        }
        return true;
      }
    }
  }
}
