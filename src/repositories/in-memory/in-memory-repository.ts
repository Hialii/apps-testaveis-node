import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointment-repository";

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public item: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.item.push(appointment);
  }

  async findOverLappingAppoinment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overLappingAppoinment = this.item.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }
      );
    });

    if (!overLappingAppoinment) {
      return null;
    }

    return overLappingAppoinment;
  }
}
