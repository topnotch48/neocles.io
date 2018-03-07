import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { GetProductsOptions } from "../../models";
import { AppConfiguration } from "../../app.config";

@Injectable()
export class ProductsService {

    readonly defaultProductsOptions: GetProductsOptions;

    constructor(private config: AppConfiguration, private httpClient: HttpClient) {
        this.defaultProductsOptions = {
            numberOfItems: config.apiSettings.products.numberOfItems,
            searchQuery: "",
            startIndex: 0
        }
    }

    getProducts(accountId: string, options: GetProductsOptions): Observable<any> {
        const productsOptions = options ?
            { ...this.defaultProductsOptions, ...options } :
            this.defaultProductsOptions;

        const url = `${this.config.apiBaseUrl}/api/products/${accountId}/`;

        let params = new HttpParams();
        params = params.set('q', productsOptions.searchQuery);
        params = params.set('start', productsOptions.startIndex.toString());
        params = params.set('num', productsOptions.numberOfItems.toString());

        return this.httpClient.get(url)
            .pipe(map(products => {
                return products;
            }));
    }
}
