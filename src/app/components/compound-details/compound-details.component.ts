import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CompoundService } from '../../services/compound.service';
import { AuthService } from '../../services/auth.service';
import { Compound } from '../../models/compound.model';

@Component({
  selector: 'app-compound-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  template: `
    <div class="details-container">
      <mat-toolbar class="details-header">
        <button mat-icon-button routerLink="/compounds">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span>Compound Details</span>
        <div class="header-spacer"></div>
        <button 
          *ngIf="compound && isLoggedIn()" 
          mat-raised-button 
          color="primary"
          [routerLink]="['/compounds', compound.id, 'edit']">
          <mat-icon>edit</mat-icon>
          Edit
        </button>
      </mat-toolbar>

      <div class="details-content">
        <div *ngIf="loading" class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading compound details...</p>
        </div>

        <mat-card *ngIf="!loading && compound" class="compound-details-card">
          <div class="compound-header">
            <h1>{{ compound.name }}</h1>
          </div>
          
          <div class="compound-image-section">
            <img 
              [src]="compound.image" 
              [alt]="compound.name"
              class="compound-image"
              (error)="onImageError($event)"
            />
          </div>

          <mat-card-content class="compound-description">
            <h3>Description</h3>
            <p>{{ compound.description }}</p>
          </mat-card-content>
        </mat-card>

        <div *ngIf="!loading && !compound" class="error-container">
          <mat-icon>error</mat-icon>
          <h3>Compound not found</h3>
          <p>The compound you're looking for doesn't exist.</p>
          <button mat-raised-button color="primary" routerLink="/compounds">
            Back to Gallery
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .details-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .details-header {
      background-color: #1976d2;
      color: white;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-spacer {
      flex: 1 1 auto;
    }

    .details-content {
      padding: 24px;
      max-width: 800px;
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

    .compound-details-card {
      margin-top: 0;
    }

    .compound-header {
      padding: 24px 24px 16px 24px;
      text-align: center;
      border-bottom: 1px solid #e0e0e0;
    }

    .compound-header h1 {
      margin: 0;
      color: #1976d2;
      font-size: 2rem;
      font-weight: 500;
    }

    .compound-image-section {
      display: flex;
      justify-content: center;
      padding: 32px;
      background-color: #fafafa;
    }

    .compound-image {
      max-width: 100%;
      max-height: 400px;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .compound-description {
      padding: 24px;
    }

    .compound-description h3 {
      color: #333;
      margin-bottom: 16px;
      font-size: 1.2rem;
    }

    .compound-description p {
      line-height: 1.6;
      color: #666;
      font-size: 1rem;
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
      .details-content {
        padding: 16px;
      }

      .compound-header h1 {
        font-size: 1.5rem;
      }

      .compound-image-section {
        padding: 16px;
      }

      .compound-description {
        padding: 16px;
      }
    }
  `]
})
export class CompoundDetailsComponent implements OnInit {
  compound: Compound | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCompound(id);
    } else {
      this.router.navigate(['/compounds']);
    }
  }

  loadCompound(id: number) {
    this.loading = true;
    this.compoundService.getCompoundById(id).subscribe({
      next: (compound) => {
        this.compound = compound;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading compound:', error);
        this.compound = null;
        this.loading = false;
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-molecule.svg';
  }
}