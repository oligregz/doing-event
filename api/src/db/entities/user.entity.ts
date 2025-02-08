import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'varchar'})
  rg: string;

  @Column({type: 'varchar'})
  cpf: string;

  @Column({type: 'varchar'})
  cnpj?: string;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'timestamptz', name: 'date_of_birth'})
  dateOfBirth: Date;
}