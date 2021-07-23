import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import { getDate, getDaysInMonth } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {

  }
}

export default ListProviderMonthAvailabilityService;
