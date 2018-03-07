import { LoginValidationSettings } from "./components/login/login.models";
import { Injectable } from "@angular/core";
import { Options } from "angular2-notifications";

@Injectable()
export class AppConfiguration {
    readonly notificationSettings: Options = {
        timeOut: 5000,
        showProgressBar: true
    }

    readonly apiSettings = {
        apiAuthSuffix: 'token',
        apiBaseUrl: "https://epicuroapitest.azurewebsites.net",
        products: {
            numberOfItems: 10,
            filterDebounce: 400
        }
    }
    readonly defaultLoginValidationSettings: LoginValidationSettings = {
        passwordMaxLength: 50,
        passwordMinLength: 8,
        usernameMaxLength: 50,
        usernameMinLength: 10
    }
}
