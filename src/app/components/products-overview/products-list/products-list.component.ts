import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { ChangeEvent, VirtualScrollComponent } from "angular2-virtual-scroll";
import { Product } from "../../../models";
import { State } from "../../../state";
import { RetrieveProducts } from "../../../state/actions/products.actions";

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent {
    @ViewChild(VirtualScrollComponent) scroll: VirtualScrollComponent;
    @Input() products: Product[] = [];

    constructor(private store: Store<State>) {
    }

    fetchMore(event: ChangeEvent) {
        if (event.end === this.products.length){
            this.store.dispatch(new RetrieveProducts());
        }
    }
}
