import { describe, expect, it } from "vitest";
import { CreateAppontment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-repository";
describe("create Apponintment", () => {
  it("should be able to create an appointment", () => {
    const appointmentsRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppontment(appointmentsRepository);

    const startsAt = getFutureDate("2023-11-26");
    const endsAt = getFutureDate("2023-11-27");

    expect(
      createAppointment.execute({
        customer: "Jonh Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should be able to create an appointment with overlapping dates", async () => {
    const appointmentsRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppontment(appointmentsRepository);

    const startsAt = getFutureDate("2023-11-26");
    const endsAt = getFutureDate("2023-11-29");

    await createAppointment.execute({
      customer: "Jonh Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "Jonh Doe",
        startsAt: getFutureDate("2023-11-26"),
        endsAt: getFutureDate("2023-11-28"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
