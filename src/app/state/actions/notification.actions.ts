import { Action } from "@ngrx/store";

export enum ActionTypes {
    NOTIFICATION_SHOW_ERROR = "Show error notification",
}

export class ShowError implements Action {

    readonly type = ActionTypes.NOTIFICATION_SHOW_ERROR;

    constructor(public message: string, public title: string = "Error Occured") {
    }
}

export type Actions =
    ShowError
