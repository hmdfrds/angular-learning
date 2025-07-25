import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== "test@example.com") {
    return of(null);
  }
  return of({ notUnique: true });
}

let initialEmailValue = "";
const savedForm = window.localStorage.getItem("saved-login-form");

if (savedForm) {
  const loadedSavedForm = JSON.parse(savedForm);
  initialEmailValue = loadedSavedForm.email;


}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    })
  });

  ngOnInit(): void {
    // const savedForm = window.localStorage.getItem("saved-login-form");
    //
    // if (savedForm) {
    //   const loadedSavedForm = JSON.parse(savedForm);
    //   this.form.patchValue({ email: loadedSavedForm.email })
    // }
    //
    // const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
    //   next: (value) => {
    //     window.localStorage.setItem("saved-login-form", JSON.stringify({ email: value.email }));
    //   }
    // });
    //
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // })
  }

  get emailIsInvalid() {
    const emailControl = this.form.controls.email;
    return emailControl.touched && emailControl.dirty && emailControl.invalid;
  }

  get passwordIsInvalid() {
    const passwordControl = this.form.controls.password;
    return passwordControl.touched && passwordControl.dirty && passwordControl.invalid;
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log(enteredEmail, enteredPassword);
  }

}
