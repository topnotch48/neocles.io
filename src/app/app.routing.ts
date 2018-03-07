import { LoginComponent, ProductsOverviewComponent, PageNotFoundComponent } from "./components";
import { Routes } from "@angular/router";
import { Constants } from "./app.routing-constants";
import { AuthGuard } from "./shared";

export const routes: Routes = [
    { path: '',                         pathMatch: "full", redirectTo: Constants.ProductsOverview },
    { path: Constants.Login,            pathMatch: "full", component: LoginComponent },
    { path: Constants.ProductsOverview, pathMatch: "full", component: ProductsOverviewComponent,  canActivate: [AuthGuard], },
    { path: Constants.PageNotFound,     pathMatch: "full", component: PageNotFoundComponent },
    { path: '**',                       pathMatch: "full", redirectTo: Constants.PageNotFound, }
];
