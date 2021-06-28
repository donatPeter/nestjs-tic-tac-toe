import { IsDefined, IsEmail, IsUUID } from 'class-validator';

export class GetUserQuery {
  @IsUUID()
  @IsDefined()
  public readonly id!: string;
}

export class CreateUserBody {
  @IsEmail()
  @IsDefined()
  public readonly email!: string;
}
