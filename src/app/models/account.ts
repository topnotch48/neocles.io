import { AccountRecord } from "../api/models";

export class Account {
    readonly id: string;
    readonly name: string;
    constructor(account: AccountRecord) {
        this.id = account.accountId;
        this.name = account.name;
    }
}
