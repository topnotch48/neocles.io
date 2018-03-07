import { LoginValidationSettings } from "./components";
import { Injectable } from "@angular/core";

@Injectable()
export class AppConfiguration {
    readonly apiSettings = {
        products: {
            numberOfItems: 10,

        }
    }
    readonly defaultLoginValidationSettings: LoginValidationSettings = {
        passwordMaxLength: 50,
        passwordMinLength: 8,
        usernameMaxLength: 50,
        usernameMinLength: 10
    }

    readonly apiBaseUrl = "https://epicuroapitest.azurewebsites.net";
}
