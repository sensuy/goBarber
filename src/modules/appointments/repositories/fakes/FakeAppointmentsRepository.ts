import { v4 as uuidv4 } from 'uuid';
import {
  getDate, getMonth, getYear, isEqual,
} from 'date-fns';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      (appointment) => isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async create({
    providerId,
    userId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuidv4(),
      date,
      providerId,
      userId,
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter((appointment) => (
      appointment.providerId === providerId
      && getMonth(appointment.date) + 1 === month
      && getYear(appointment.date) === year
    ));

    return appointments;
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter((appointment) => (
      appointment.providerId === providerId
      && getDate(appointment.date) === day
      && getMonth(appointment.date) + 1 === month
      && getYear(appointment.date) === year
    ));

    return appointments;
  }
}

export default FakeAppointmentsRepository;
