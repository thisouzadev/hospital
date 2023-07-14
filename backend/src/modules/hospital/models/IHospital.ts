import { IEmployee } from '../../employee/models/IEmployee';

export class IHospital {
  hospitalId: string;

  hospitalName: string;

  director: string;

  deletedAt: Date;

  employees: IEmployee[];
}
