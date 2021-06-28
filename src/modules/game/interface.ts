import { IsDefined, IsUUID } from 'class-validator';

export class GetGameQuery {
  @IsUUID()
  @IsDefined()
  public readonly id!: string;
}

export class CreateGameBody {
  @IsUUID()
  @IsDefined()
  public readonly userOneId!: string;

  @IsUUID()
  @IsDefined()
  public readonly userTwoId!: string;
}
