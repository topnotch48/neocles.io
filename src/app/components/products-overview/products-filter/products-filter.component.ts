import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../../../state";
import { FilterProducts } from "../../../state/actions/products.actions";

@Component({
    selector: 'products-filter',
    templateUrl: './products-filter.component.html',
    styleUrls: ['./products-filter.component.scss'],
})
export class ProductsFilterComponent implements OnInit {

    filterValue = "";

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new FilterProducts());
    }

    triggerFilter(filter: string) {
        this.store.dispatch(new FilterProducts(filter));
    }
}
