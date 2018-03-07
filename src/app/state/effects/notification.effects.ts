import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromNotification from "../actions/notification.actions";
import { tap } from 'rxjs/operators';
import { NotificationsService } from "angular2-notifications";

@Injectable()
export class NotificationEffects {

    constructor(
        private actions: Actions,
        private notificationService: NotificationsService) {

    }

    @Effect({ dispatch: false })
    onAuthenticate = this.actions.pipe(
        ofType<fromNotification.ShowError>(fromNotification.ActionTypes.NOTIFICATION_SHOW_ERROR),
        tap((action) => {
            this.notificationService.error(action.title, action.message);
        })
    );
}
