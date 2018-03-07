import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State, getProducts, hasProducts, isLoadingProducts } from "../../state";
import { Observable } from "rxjs/Observable";
import { Product } from "../../models";

@Component({
    selector: 'products-overview',
    templateUrl: './products-overview.component.html',
    styleUrls: ['./products-overview.component.scss'],
})
export class ProductsOverviewComponent implements OnInit {

    products: Observable<Product[]>;

    hasProducts: Observable<boolean>;

    isLoadingProducts: Observable<boolean>;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.products = this.store.select(getProducts);
        this.hasProducts = this.store.select(hasProducts);
        this.isLoadingProducts = this.store.select(isLoadingProducts);
    }
}
