import { IState } from './IState';

export interface ICity {
  cityId: number;

  stateId: number;

  ibgeCode: number;

  state: IState;

  name: string;
}
