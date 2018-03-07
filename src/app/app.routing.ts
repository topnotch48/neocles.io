import { LoginComponent, ProductsOverviewComponent, PageNotFoundComponent } from "./components";
import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: '',                         pathMatch: "full", redirectTo: Constants.ProductsOverview },
    { path: Constants.Login,            pathMatch: "full", component: LoginComponent },
    { path: Constants.ProductsOverview, pathMatch: "full", component: ProductsOverviewComponent },
    { path: Constants.PageNotFound,     pathMatch: "full", component: PageNotFoundComponent },
    { path: '**',                       pathMatch: "full", redirectTo: Constants.PageNotFound, }
];
