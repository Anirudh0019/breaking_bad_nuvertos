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
  template: `
    <div class="edit-container">
      <mat-toolbar class="edit-header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Edit Compound</span>
      </mat-toolbar>

      <div class="edit-content">
        <div *ngIf="loading" class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading compound...</p>
        </div>

        <mat-card *ngIf="!loading && editForm" class="edit-card">
          <mat-card-header>
            <mat-card-title>Edit Compound Details</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="editForm" (ngSubmit)="onSubmit()" class="edit-form">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Compound Name</mat-label>
                <input matInput formControlName="name" placeholder="Enter compound name">
                <mat-error *ngIf="editForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Image URL</mat-label>
                <input matInput formControlName="image" placeholder="Enter image URL">
                <mat-error *ngIf="editForm.get('image')?.hasError('required')">
                  Image URL is required
                </mat-error>
                <mat-error *ngIf="editForm.get('image')?.hasError('pattern')">
                  Please enter a valid URL
                </mat-error>
              </mat-form-field>

              <div class="image-preview" *ngIf="editForm.get('image')?.value">
                <h4>Image Preview:</h4>
                <img 
                  [src]="editForm.get('image')?.value" 
                  alt="Preview"
                  class="preview-image"
                  (error)="onImageError($event)"
                />
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Description</mat-label>
                <textarea 
                  matInput 
                  formControlName="description" 
                  placeholder="Enter compound description"
                  rows="4">
                </textarea>
                <mat-error *ngIf="editForm.get('description')?.hasError('required')">
                  Description is required
                </mat-error>
              </mat-form-field>

              <div class="form-actions">
                <button 
                  type="button" 
                  mat-button 
                  (click)="goBack()"
                  [disabled]="saving">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  mat-raised-button 
                  color="primary"
                  [disabled]="editForm.invalid || saving">
                  <mat-icon *ngIf="saving">hourglass_empty</mat-icon>
                  <mat-icon *ngIf="!saving">save</mat-icon>
                  {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <div *ngIf="!loading && !compound" class="error-container">
          <mat-icon>error</mat-icon>
          <h3>Compound not found</h3>
          <p>The compound you're trying to edit doesn't exist.</p>
          <button mat-raised-button color="primary" routerLink="/compounds">
            Back to Gallery
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .edit-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .edit-header {
      background-color: #1976d2;
      color: white;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .edit-content {
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
    }

    .loading-container p {
      margin-top: 16px;
      color: #666;
    }

    .edit-card {
      margin-top: 0;
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }

    .full-width {
      width: 100%;
    }

    .image-preview {
      margin: 16px 0;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #fafafa;
    }

    .image-preview h4 {
      margin: 0 0 12px 0;
      color: #666;
      font-size: 14px;
    }

    .preview-image {
      max-width: 100%;
      max-height: 200px;
      object-fit: contain;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .error-container {
      text-align: center;
      padding: 48px;
      color: #666;
    }

    .error-container mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
      color: #f44336;
    }

    @media (max-width: 768px) {
      .edit-content {
        padding: 16px;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
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