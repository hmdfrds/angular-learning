import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalValues(controlName1: string, controlName2: string) {

  return (control: AbstractControl) => {
    const value1 = control.get(controlName1)?.value;
    const value2 = control.get(controlName2)?.value;

    if (value1 === value2) {
      return null
    }

    return { valueNotEqual: true };
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.min(6)]
      }),
      confirmPassword: new FormControl("", {
        validators: [Validators.required, Validators.min(6)]
      }),
    }, { validators: [equalValues("password", "confirmPassword")] }),
    firstName: new FormControl("", {
      validators: [Validators.required]
    }),
    lastName: new FormControl("", {
      validators: [Validators.required]
    }),
    address: new FormGroup({

      street: new FormControl("", {
        validators: [Validators.required]
      }),
      number: new FormControl("", {
        validators: [Validators.required]
      }),
      postalCode: new FormControl("", {
        validators: [Validators.required]
      }),
      city: new FormControl("", {
        validators: [Validators.required]
      }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>("student", {
      validators: [Validators.required]
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log("INVALID FORM");
      return;
    }
  }

  onReset() {
    this.form.reset();
  }
}
