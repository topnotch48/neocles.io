import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { LoginComponent, ProductsSearchComponent, PageNotFoundComponent } from './components';

const components = [
    LoginComponent,
    ProductsSearchComponent,
    PageNotFoundComponent
]

const modules = [
    BrowserModule,
]

@NgModule({
    declarations: [
        ...components,
        AppComponent
    ],
    imports: [
        ...modules,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
