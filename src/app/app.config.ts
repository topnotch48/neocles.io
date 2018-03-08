import { LoginValidationSettings } from "./components/login/login.models";
import { Injectable } from "@angular/core";
import { Options } from "angular2-notifications";

@Injectable()
export class AppConfiguration {
    readonly notificationSettings: Options = {
        timeOut: 5000,
        showProgressBar: true
    }

    // todo would be nice to have models generated based on server contracts
    // in this case we could encapsulate all api routes in one place
    readonly apiSettings = {
        apiAuthSuffix: 'token',
        apiBaseUrl: "https://epicuroapitest.azurewebsites.net",
        products: {
            numberOfItems: 10,
            filterDebounce: 500
        }
    }
    readonly defaultLoginValidationSettings: LoginValidationSettings = {
        passwordMaxLength: 50,
        passwordMinLength: 8,
        usernameMaxLength: 50,
        usernameMinLength: 10
    }
}
