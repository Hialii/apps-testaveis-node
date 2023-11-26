import { Appointment } from "../entities/appointment";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  findOverLappingAppoinment(startsAt: Date, endsAt: Date): Promise< Appointment  | null>
}
