import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound.model';

@Component({
  selector: 'app-compound-edit',
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
    MatToolbarModule,
    MatSnackBarModule
  ],
  templateUrl: './compound-edit.component.html',
  styleUrls: [ './compound-edit.component.scss']
})
export class CompoundEditComponent implements OnInit {
  editForm!: FormGroup;
  compound: Compound | null = null;
  loading = true;
  saving = false;
  compoundId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.compoundId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.compoundId) {
      this.loadCompound();
    } else {
      this.router.navigate(['/compounds']);
    }
  }

  initForm() {
    const urlPattern = /^https?:\/\/.+/;
    
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required, Validators.pattern(urlPattern)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  loadCompound() {
    this.loading = true;
    this.compoundService.getCompoundById(this.compoundId).subscribe({
      next: (compound) => {
        this.compound = compound;
        this.editForm.patchValue({
          name: compound.name,
          image: compound.image,
          description: compound.description
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading compound:', error);
        this.loading = false;
        this.snackBar.open('Error loading compound', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit() {
    if (this.editForm.valid && !this.saving) {
      this.saving = true;
      const formData = this.editForm.value;
      
      this.compoundService.updateCompound(this.compoundId, formData).subscribe({
        next: (updatedCompound) => {
          this.saving = false;
          this.snackBar.open('Compound updated successfully!', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/compounds', this.compoundId]);
        },
        error: (error) => {
          this.saving = false;
          console.error('Error updating compound:', error);
          this.snackBar.open('Error updating compound. Please try again.', 'Close', { 
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  goBack() {
    if (this.compound) {
      this.router.navigate(['/compounds', this.compoundId]);
    } else {
      this.router.navigate(['/compounds']);
    }
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-molecule.svg';
  }
}