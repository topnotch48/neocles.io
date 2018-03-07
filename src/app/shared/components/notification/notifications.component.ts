import { Component } from "@angular/core";
import { Options } from "angular2-notifications";

@Component({
    selector: 'notifications-area',
    template: '<simple-notifications [options]="options"></simple-notifications>'
})
export class NotificationsComponent {
    options: Options;
    constructor() {
        this.options = <Options> {
            position: [ "top", "center" ],
            showProgressBar: false,
            preventDuplicates: true,
            clickToClose: true
        }
    }
}
