import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);

    const providers = await listProviderDayAvailability.execute({
      providerId,
      day,
      month,
      year,
    });

    return response.json(providers);
  }
}

export default ProviderMonthAvailabilityController;
