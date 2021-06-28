import { IsDefined, IsUUID } from 'class-validator';

export class GetGameQuery {
  @IsUUID()
  @IsDefined()
  public readonly id!: string;
}
