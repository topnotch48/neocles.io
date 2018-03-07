import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../../../state";
import { FilterProducts } from "../../../state/actions/products.actions";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, debounceTime } from "rxjs/operators";
import { ISubscription } from "rxjs/Subscription";
import { AppConfiguration } from "../../../app.config";

@Component({
    selector: 'products-filter',
    templateUrl: './products-filter.component.html',
    styleUrls: ['./products-filter.component.scss'],
})
export class ProductsFilterComponent implements OnInit, OnDestroy {

    @ViewChild("filter") input: ElementRef;

    private sub: ISubscription;
    private debounce: number;

    constructor(private config: AppConfiguration, private store: Store<State>) {
        this.debounce = this.config.apiSettings.products.filterDebounce || 500;
    }

    ngOnInit(): void {
        this.store.dispatch(new FilterProducts());

        const input$ =
            fromEvent(this.input.nativeElement, 'keyup').pipe(
                map((event: any) => event.target.value),
                debounceTime(this.debounce)
            );

        this.sub = input$.subscribe(filter => {
            this.store.dispatch(new FilterProducts(filter));
        })
    }

    ngOnDestroy(): void {
        this.sub && this.sub.unsubscribe();
    }
}
