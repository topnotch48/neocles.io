import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { LoginComponent, ProductsOverviewComponent, PageNotFoundComponent, ProductComponent, ProductsFilterComponent } from './components';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfiguration } from './app.config';
import { reducers } from './state/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as effects from './state/effects/index';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';

const components = [
    LoginComponent,
    ProductsOverviewComponent,
    PageNotFoundComponent,
    ProductComponent,
    ProductsFilterComponent,
]

const modules = [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollModule
]

const providers = [
    AppConfiguration,
    AuthService
]

@NgModule({
    declarations: [
        ...components,
        AppComponent
    ],
    imports: [
        ...modules,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            effects.AuthEffects
        ]),
        RouterModule.forRoot(routes, { useHash: true })
    ],
    providers: [
        ...providers
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
