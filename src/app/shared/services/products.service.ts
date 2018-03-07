import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { map, take } from "rxjs/operators";
import { GetProductsOptions, ProductsSearchResult, Product } from "../../models";
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

        const url = `${this.config.apiSettings.apiBaseUrl}/api/products/${accountId}/`;

        const params = new HttpParams()
            .set('q', productsOptions.searchQuery)
            .set('start', productsOptions.startIndex.toString())
            .set('num', productsOptions.numberOfItems.toString());

        return this.httpClient.get(url, { params: params })
            .pipe(
                map((searchResult: ProductsSearchResult) => {
                    return searchResult.products.map(p => new Product(p));
                }),
                take(1)
            );
    }
}
