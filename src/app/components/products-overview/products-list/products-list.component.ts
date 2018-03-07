import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../../../state";
import { RetrieveProducts } from "../../../state/actions/products.actions";
import { Product } from "../../../models";
import { ChangeEvent } from "angular2-virtual-scroll";

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent {

    @Input() products: Product[] = [];

    constructor(private store: Store<State>) {
    }

    fetchMore(event: ChangeEvent) {
        if (event.end === this.products.length){
            this.store.dispatch(new RetrieveProducts());
        }
    }
}
