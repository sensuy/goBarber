import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      providerId: 'provider-id',
      userId: 'user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('provider-id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    await createAppointment.execute({
      date: new Date(2020, 4, 10, 14),
      providerId: 'provider-id',
      userId: 'user-id',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 14),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(
      () => new Date(2020, 4, 10, 12).getTime(),
    );

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(
      () => new Date(2020, 4, 10, 12).getTime(),
    );

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        userId: 'user-id',
        providerId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(
      () => new Date(2020, 4, 10, 12).getTime(),
    );

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        userId: 'user-id',
        providerId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        userId: 'user-id',
        providerId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
