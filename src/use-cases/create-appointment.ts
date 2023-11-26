import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointment-repository";

export interface CreateAppontmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppontmentResponse = Appointment;

export class CreateAppontment {
  constructor(private appointmentsRepository: AppointmentRepository) {}
  async execute({
    //reqquest
    customer,
    startsAt,
    endsAt,
  }: CreateAppontmentRequest): Promise<CreateAppontmentResponse> {
    const overLappingAppoinment =
      await this.appointmentsRepository.findOverLappingAppoinment(
        startsAt,
        endsAt
      );

      if(overLappingAppoinment) {
         throw new Error('Another appointment overlaps this appointment dates')
      }

    const appointment = new Appointment({
      //request
      customer,
      endsAt,
      startsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
