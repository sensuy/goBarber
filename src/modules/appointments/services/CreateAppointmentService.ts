import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  date: Date;
}

// SOLID

// Single Responsability Principle
// Dependency Invertion Principle

class CreateAppointmentService {
  constructor(
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, providerId }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
