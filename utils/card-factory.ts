import { faker } from "@faker-js/faker";
import { Card } from "../models/card";


export const createCard = (): Card => ({
    name: faker.person.fullName(),
    number: faker.finance.creditCardNumber(),
    cvc: faker.finance.creditCardCVV(),
    month: '10',
    year: '2030'
})