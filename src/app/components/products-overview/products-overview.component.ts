import { Component, OnInit } from "@angular/core";
import { of } from "rxjs/observable/of";
import { IVirtualScrollOptions } from "od-virtualscroll";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'products-overview',
    templateUrl: './products-overview.component.html',
    styleUrls: ['./products-overview.component.scss'],
})
export class ProductsOverviewComponent implements OnInit {

    products = [1,2,3,4,5,6,7,8];
    ngOnInit(): void {


    }

}
