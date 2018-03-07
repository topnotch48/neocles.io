export type AccountRecord = {
    accountId: string,
    name: string
}


export class Account {
    readonly id: string;
    readonly name: string;
    constructor(account: AccountRecord) {
        this.id = account.accountId;
        this.name = account.name;
    }
}
