import { IsDefined, IsNumber, IsUUID, Max, Min } from 'class-validator';

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
  @Max(9)
  public readonly position!: number;
}
