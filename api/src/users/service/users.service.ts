import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/UserDTO';
import { randomUUID } from 'crypto';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../db/entities/user.entity';
import { Repository } from 'typeorm';

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

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async create(user: UserDTO): Promise<UserDTO> {
    // checks if object already exists
    const userExists = await this.existsObject(user);

    if (userExists) {
      throw new HttpException(
        {
          message: `User '${user.name}' already exists`,
          statusCode: HttpStatus.CONFLICT
        },
        HttpStatus.CONFLICT
      );
    }
    const dbUser = new UserEntity();

    // create object
    dbUser.id = randomUUID();
    dbUser.name = user.name;
    dbUser.password = hashSync(user.password, 16);
    dbUser.cnpj = user?.cnpj
    dbUser.cpf = user.cpf
    dbUser.email = user.email
    dbUser.rg = user.rg
    dbUser.dateOfBirth = user.dateOfBirth

    const userSaved = await this.usersRepository.save(dbUser);

    return userSaved;
  }

  async findByUsername(username: string): Promise<UserDTO> {

    const userSearched = await this.usersRepository.findOne({
      where: { name: username }
    });

    if (!userSearched)
      throw new HttpException(
        `User with name ${username} not found`,
        HttpStatus.NOT_FOUND
      );

    return userSearched;
  }

  async existsObject(user: UserDTO): Promise<boolean> {
    const uniqueFields = ['id', 'name', 'cpf', 'cnpj', 'email'];

    const whereConditions: Record<string, any> = {};
  
    // Create dinamic WHERE
    for (const field of uniqueFields) {
      if (user[field] !== undefined) {
        whereConditions[field] = user[field];
      }
    }
  
    const userExists = await this.usersRepository.findOne({
      where: whereConditions,
    });
  
    return !!userExists;
  }
}
