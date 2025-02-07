import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/UserDTO';
import { randomUUID } from 'crypto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDTO[] = [
    {
      id: '1',
      name: 'userex',
      rg: '1212332312',
      cpf: '092365423',
      cnpj: '98323y12b4874b',
      dateOfBirth: new Date('2011-10-05T21:57:00.000Z'),
      email: 'email.example@hotmail.com',
      password: 'passs',
    },
  ];

  checksIfObjectAlreadyExists(user: UserDTO) {
    // search object with its characteristics
    const existsUser = false;

    if (existsUser)
      throw new HttpException(`This user already exists`, HttpStatus.CONFLICT);

    return false;
  }

  create(user: UserDTO) {
    // checks if object already exists
    this.checksIfObjectAlreadyExists(user);

    // create object
    user.id = randomUUID();
    user.password = hashSync(user.password, 16);
    this.users.push(user);
    return this.users;
  }

  findByUsername(username: string): UserDTO | null {
    return this.users[1];
  }
}
