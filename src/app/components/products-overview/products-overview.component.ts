import { Component, OnInit } from "@angular/core";
import { ChangeEvent } from "angular2-virtual-scroll";
import { Store } from "@ngrx/store";
import { State, getProducts } from "../../state";
import { Observable } from "rxjs/Observable";
import { first, tap } from "rxjs/operators";
import { RetrieveProducts } from "../../state/actions/products.actions";

@Component({
    selector: 'products-overview',
    templateUrl: './products-overview.component.html',
    styleUrls: ['./products-overview.component.scss'],
})
export class ProductsOverviewComponent implements OnInit {

    products: Observable<any[]>;

    constructor(private store: Store<State>) {

    }
    ngOnInit(): void {
        this.products = this.store.select(getProducts)
    }

    fetchMore(event: ChangeEvent) {
        this.products.pipe(
            first(),
            tap(products => {
                console.log('fetch next chunk');
                if (event.end === products.length){
                    this.store.dispatch(new RetrieveProducts())
                }
            })
        );
    }
}
