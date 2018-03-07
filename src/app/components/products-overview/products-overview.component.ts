import { Component, OnInit } from "@angular/core";
import { ChangeEvent } from "angular2-virtual-scroll";
import { Store, select } from "@ngrx/store";
import { State, getProducts } from "../../state";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";
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
        console.log("attemp to fetch");

        this.store.pipe(
            select(getProducts),
            take(1),
        ).subscribe(products => {
            console.log("attemp to fetch");
            if (event.end === products.length){
                console.log("dispatched retrieve products");
                this.store.dispatch(new RetrieveProducts());
            }
        });
        // this.store.select(getProducts).pipe(
        //     take(1),
        //     tap(products => {
        //         console.log('fetch next chunk');
        //         if (event.end === products.length){
        //             this.store.dispatch(new RetrieveProducts())
        //         }
        //     })
        // );
    }
}
