import { LoginComponent, ProductsSearchComponent, PageNotFoundComponent } from "./components";
import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: '', pathMatch: "full", redirectTo: 'products-search' },
    { path: 'login', pathMatch: "full", component: LoginComponent },
    { path: 'products-search', pathMatch: "full", component: ProductsSearchComponent },
    { path: 'page-not-found', pathMatch: "full", component: PageNotFoundComponent },
    { path: '**', pathMatch: "full", redirectTo: 'page-not-found', }
];