import { IsDefined, IsNumber, IsUUID, Min } from 'class-validator';

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

export class MakeMoveBody {
  @IsUUID()
  @IsDefined()
  public readonly userId!: string;

  @IsNumber()
  @IsDefined()
  @Min(1)
  @Min(9)
  public readonly position!: number;
}
