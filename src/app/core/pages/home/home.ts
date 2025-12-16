import {Component, inject, signal} from '@angular/core';
import {email, Field, form, required} from '@angular/forms/signals';
import {FormField, FormFieldType} from '../../../shared/types/fields';
import {NgClass} from '@angular/common';
import {MyCard} from '../../../shared/components/my-card/my-card';
import {AuthFormModel} from '../../../features/auth/models/authForm.model';
import {AuthService} from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    Field,
    NgClass,
    MyCard
  ],
  templateUrl: './home.html',
})
export class Home {
  private _authService= inject(AuthService);

  loginModel = signal({
    email: '',
    password: '',
  })

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Введите email' });
    email(schemaPath.email, { message: 'Не корректный email' })
    required(schemaPath.password, { message: 'Введите пароль' });
  })

  loginFields: FormField<AuthFormModel>[] = [
    {
      label: 'Email',
      value: 'email',
      type: FormFieldType.TEXT,
      placeholder: 'email'
    },
    {
      label: 'Пароль',
      value: 'password',
      type: FormFieldType.PASSWORD,
      placeholder: 'Пароль'
    },
  ]
  onSubmit(event: Event) {
    event.preventDefault();
    this._authService.login(this.loginModel())

    /*
    this._authService.refresh()
      .subscribe({
        next: (data: string) => {
          console.log('refresh', data)
        },
        error: (err) => console.log('refresh', err),
      })
    setTimeout(() => {
      this._authService.info()
        .subscribe({
          next: (data) => {
            console.log('info', data)
          },
          error: (err) => console.log('info', err),
        })
    }, 500)

    */
  }
}
