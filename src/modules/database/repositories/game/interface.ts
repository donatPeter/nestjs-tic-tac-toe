export interface IGame {
  moves: IMove[];
  userOneId: string;
  userTwoId: string;
  status: GameStatus;
}

export interface IMove {
  userId: string;
  position: number;
}

export type GameStatus = 'IN_GAME' | 'DRAW' | 'USER_ONE_WINS' | 'USER_TWO_WINS';
