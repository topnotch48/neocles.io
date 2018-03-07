import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginValidationSettings } from "./login.models";
import { AppConfiguration } from "../../app.config";
import { Store } from "@ngrx/store";
import { State, isAuthRequestInProgress } from "../../state";
import { Observable } from "rxjs/Observable";
import { Authenticate } from "../../state/actions/auth.actions";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    @Input() validationOptions: LoginValidationSettings
    form: FormGroup;
    usernameCtrl: FormControl;
    passwordCtrl: FormControl;
    inProgress: Observable<boolean>;

    constructor(private store: Store<State>, config: AppConfiguration, private fb: FormBuilder) {
        this.validationOptions = config.defaultLoginValidationSettings
    }

    ngOnInit(): void {
        const defaultValidators = [ Validators.required ];

        this.usernameCtrl = this.fb.control('', [
            ...defaultValidators,
            Validators.email,
            Validators.maxLength(this.validationOptions.usernameMaxLength),
            Validators.minLength(this.validationOptions.usernameMinLength)
        ]);

        this.passwordCtrl = this.fb.control('', [
            ...defaultValidators,
            Validators.maxLength(this.validationOptions.passwordMaxLength),
            Validators.minLength(this.validationOptions.passwordMinLength)
        ]);

        this.form = this.fb.group({
            username: this.usernameCtrl,
            password: this.passwordCtrl
        });

        this.inProgress = this.store.select(isAuthRequestInProgress);
    }

    public login() {
        const username = this.form.controls.username.value;
        const password = this.form.controls.password.value;
        this.store.dispatch(new Authenticate(username, password));
    }
}
