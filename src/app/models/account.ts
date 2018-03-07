export type AccountRecord = {
    accountId: string,
    name: string
}


export class Account {
    readonly accountId: string;
    readonly name: string;
    constructor(account: AccountRecord) {
        this.accountId = account.accountId;
        this.name = account.name;
    }
}
