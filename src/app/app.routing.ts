import { LoginComponent, ProductsOverviewComponent, PageNotFoundComponent } from "./components";
import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: '', pathMatch: "full", redirectTo: 'products-overview' },
    { path: 'login', pathMatch: "full", component: LoginComponent },
    { path: 'products-overview', pathMatch: "full", component: ProductsOverviewComponent },
    { path: 'page-not-found', pathMatch: "full", component: PageNotFoundComponent },
    { path: '**', pathMatch: "full", redirectTo: 'page-not-found', }
];