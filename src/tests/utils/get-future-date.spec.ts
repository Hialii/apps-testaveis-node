import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test('increase date with one year', () => {
    const year = new Date().getFullYear();

   expect(getFutureDate(`${year}-11-25`).getFullYear()).toEqual(2024)
})