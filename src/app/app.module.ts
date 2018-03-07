import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { routes } from './app.routing';
import { LoginComponent, ProductsOverviewComponent, PageNotFoundComponent, ProductComponent, ProductsFilterComponent } from './components';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfiguration } from './app.config';
import { reducers } from './state/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as effects from './state/effects/index';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService, AccountsService, ProductsService, NotificationsComponent, AuthGuard } from './shared';
import { AuthInterceptor, AuthErrorInterceptor } from './api';


const components = [
    LoginComponent,
    ProductsOverviewComponent,
    PageNotFoundComponent,
    ProductComponent,
    ProductsFilterComponent,
    NotificationsComponent
];

const modules = [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollModule
];

const guards = [
    AuthGuard,
];

const providers = [
    AppConfiguration,
    AuthService,
    AccountsService,
    ProductsService,
    ...guards
];

const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthErrorInterceptor,
        multi: true
    }
];

@NgModule({
    declarations: [
        ...components,
        AppComponent
    ],
    imports: [
        ...modules,
        SimpleNotificationsModule.forRoot(),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            effects.AuthEffects,
            effects.NotificationEffects,
            effects.ProductsEffects
        ]),
        RouterModule.forRoot(routes, { useHash: true })
    ],
    providers: [
        ...providers,
        ...interceptors,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
