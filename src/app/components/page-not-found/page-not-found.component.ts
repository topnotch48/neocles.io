import { Component } from "@angular/core";
import { Constants } from "../../app.routing-constants";

@Component({
    selector: 'page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
    routerLink = `/${Constants.ProductsOverview}`;
}
