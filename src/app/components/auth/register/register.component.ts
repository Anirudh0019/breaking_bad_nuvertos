import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    console.log('RegisterComponent initialized');
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    console.log('Register form created:', this.registerForm);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      console.log('Password mismatch detected');
      return { passwordMismatch: true };
    }
    console.log('Passwords match');
    return null;
  }

  onSubmit() {
    console.log('Form submission attempted');
    console.log('Form valid:', this.registerForm.valid);
    console.log('Form value:', this.registerForm.value);
    
    if (this.registerForm.valid && !this.loading) {
      this.loading = true;
      console.log('Starting registration process...');
      
      const { confirmPassword, ...userData } = this.registerForm.value;
      console.log('User data to be sent:', userData);
      
      this.authService.register(userData).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Registration successful:', response);
          this.snackBar.open('Account created successfully!', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/compounds']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Registration failed:', error);
          const message = error.error?.message || 'Registration failed. Please try again.';
          this.snackBar.open(message, 'Close', { 
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      console.log('Form is invalid or already loading');
      if (this.registerForm.invalid) {
        console.log('Form errors:', this.registerForm.errors);
        Object.keys(this.registerForm.controls).forEach(key => {
          const control = this.registerForm.get(key);
          if (control && control.invalid) {
            console.log(`Field ${key} errors:`, control.errors);
          }
        });
      }
    }
  }
}