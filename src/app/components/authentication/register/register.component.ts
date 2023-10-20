// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';  // Ensure the path is correct

function matchingPasswords(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { 'mismatchedPasswords': true };
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;

  registerForm: FormGroup;

  constructor(private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder, private authService: AuthenticationService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: matchingPasswords() });
  }

  ngOnInit() {
    // You can initialize your form here if not done in the constructor
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe(
        (data: any) => { 
          this.isLoading = false;
          this.snackBar.open('Registration Successful', '', {
            duration: 2000,
          });
          this.router.navigate(['/login']);  // Add this line for redirect
        },
        (error: any) => { 
          this.isLoading = false;
          // ... handle error
        }
      );
    }
  } 
}
