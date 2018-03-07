import { Component, OnInit } from "@angular/core";

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
