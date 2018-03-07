import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { flatMap, take } from "rxjs/operators";
import { AppConfiguration } from "../../app.config";
import { AccountRecord, Account } from "../../models";


@Injectable()
export class AccountsService {

    constructor(private config: AppConfiguration, private httpClient: HttpClient) {
    }

    getAccounts(): Observable<Account> {
        const url = `${this.config.apiSettings.apiBaseUrl}/api/accounts`;
        return this.httpClient.get<AccountRecord[]>(url)
            .pipe(
                flatMap(accounts => {
                    return accounts.map(acc => new Account(acc));
                })
            );
    }

    getDefaultAccount() {
        return this.getAccounts()
            .pipe(
                take(1)
            );
    }
}
