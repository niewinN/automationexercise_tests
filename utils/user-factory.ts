import { faker } from '@faker-js/faker';

export type RegisterUser = {
  name: string;
  surname: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  street: string;
  state: string;
  city: string;
  zipCode: string;
  phone: string;
};

export const createUser = (): RegisterUser => ({
  name: faker.person.firstName(),
  surname: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  day: '1',
  month: '1',
  year: '2000',
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  street: faker.location.streetAddress(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipCode: faker.location.zipCode(),
  phone: faker.phone.number(),
});