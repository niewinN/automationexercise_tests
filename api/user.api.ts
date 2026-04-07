import { APIRequestContext, expect } from "@playwright/test";
import { RegisterUser } from "../utils/user-factory";

export class UserApi {
    constructor(private request: APIRequestContext) {}

    async registerUser(user: RegisterUser): Promise<void> {
        const response = await this.request.post(
            'https://automationexercise.com/api/createAccount',
            {
                form: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    title: 'Mr',
                    birth_date: user.day,
                    birth_month: user.month,
                    birth_year: user.year,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    company: user.company,
                    address1: user.street,
                    address2: '',
                    country: 'India',
                    zipcode: user.zipCode,
                    state: user.state,
                    city: user.city,
                    mobile_number: user.phone,
                }
            }
        )
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.responseCode).toBe(201);
        expect(body.message).toContain('User created');
    }

    async deleteUser(user: RegisterUser): Promise<void> {
        const response = await this.request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                email: user.email,
                password: user.password
            }
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.responseCode).toBe(200)
        expect(body.message).toContain('Account deleted!')
    }

    async deleteUserIfExists(user: RegisterUser): Promise<void> {
        try {
            await this.deleteUser(user)
        } catch {}
    }
}