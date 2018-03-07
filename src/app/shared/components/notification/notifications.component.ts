import { Component } from "@angular/core";
import { Options } from "angular2-notifications";
import { AppConfiguration } from "../../../app.config";

@Component({
    selector: 'notifications-area',
    template: '<simple-notifications [options]="options"></simple-notifications>'
})
export class NotificationsComponent {
    options: Options;
    constructor(config: AppConfiguration) {
        this.options = <Options> {
            position: [ "top", "center" ],
            preventDuplicates: true,
            clickToClose: true,
            ...config.notificationSettings
        }
    }
}
