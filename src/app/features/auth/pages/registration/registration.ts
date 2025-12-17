import {Component, inject, signal} from '@angular/core';
import {MyCard} from '../../../../shared/components/my-card/my-card';
import {email, Field, form, minLength, required} from '@angular/forms/signals';
import {FormField, FormFieldType} from '../../../../shared/types/fields';
import {RegisterFormModel} from '../../models/authForm.model';
import {AuthService} from '../../services/auth.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [
    MyCard,
    Field,
    NgClass
  ],
  templateUrl: './registration.html',
})
export class Registration {
  private _authService= inject(AuthService);
  registerModel = signal({
    name: '',
    email: '',
    password: '',
  })

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Введите имя' });
    minLength(schemaPath.name, 3, { message: 'Имя не может быть меньше 3 символов' });
    required(schemaPath.email, { message: 'Введите email' });
    email(schemaPath.email, { message: 'Не корректный email' })
    required(schemaPath.password, { message: 'Введите пароль' });
  })

  registerFields: FormField<RegisterFormModel>[] = [
    {
      label: 'Имя',
      value: 'name',
      type: FormFieldType.TEXT,
      placeholder: 'Имя'
    },
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
    this._authService.login(this.registerModel())
  }
}
