import { ICity } from './ICity';
import { IState } from './IState';

export interface IAddress {
  addressId: string;

  street: string;

  streetNumber: string;

  district: string;

  cityId: number;

  city: ICity;

  stateId: number;

  state: IState;

  cep: string;
}
