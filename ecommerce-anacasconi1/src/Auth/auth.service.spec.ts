import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('Authservice', () => {
    let usersRepository;
  it('Se crea el sistema de autenticacion', async () => {
    const mockUsersRepository = {
      findOne: () =>
        Promise.resolve({
          name: 'Pablo',
          email: 'mail@mail.com',
          isAdmin: false,
          id: 'fefgd-dfergt-grt4tret545465',
        }),
    };

    const module = await Test.createTestingModule({
      providers: [AuthService, 
        {
            provide: usersRepository,
            useValue: mockUsersRepository
        }
      ],
    }).compile();
    const authService = module.get<AuthService>(AuthService);

    expect(authService).toBeDefined();
  });
});
