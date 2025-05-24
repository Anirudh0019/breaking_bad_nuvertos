import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CompoundCardComponent } from '../compound-card/compound-card.component';
import { CompoundService } from '../../services/compound.service';
import { AuthService } from '../../services/auth.service';
import { Compound } from '../../models/compound.model';

@Component({
  selector: 'app-compound-gallery',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CompoundCardComponent
  ],
  template: `
    <div class="gallery-container">
      <mat-toolbar class="gallery-header">
        <span>Chemical Compounds Gallery</span>
        <div class="header-spacer"></div>
        <div class="auth-buttons">
          <ng-container *ngIf="!isLoggedIn()">
            <button mat-button routerLink="/login">
              <mat-icon>login</mat-icon>
              Login
            </button>
            <button mat-button routerLink="/register">
              <mat-icon>person_add</mat-icon>
              Register
            </button>
          </ng-container>
          <ng-container *ngIf="isLoggedIn()">
            <span class="welcome-text">Welcome!</span>
            <button mat-button (click)="logout()">
              <mat-icon>logout</mat-icon>
              Logout
            </button>
          </ng-container>
        </div>
      </mat-toolbar>

      <div class="gallery-content">
        <div *ngIf="loading" class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading compounds...</p>
        </div>

        <div *ngIf="!loading && compounds.length > 0" class="compounds-grid">
          <app-compound-card 
            *ngFor="let compound of compounds" 
            [compound]="compound">
          </app-compound-card>
        </div>

        <div *ngIf="!loading && compounds.length === 0" class="no-compounds">
          <mat-icon>science</mat-icon>
          <h3>No compounds found</h3>
          <p>There are no compounds available at the moment.</p>
        </div>

        <mat-paginator 
          *ngIf="!loading && totalCompounds > 10"
          [length]="totalCompounds"
          [pageSize]="pageSize"
          [pageIndex]="currentPage - 1"
          [pageSizeOptions]="[10]"
          [showFirstLastButtons]="true"
          [hidePageSize]="true"
          (page)="onPageChange($event)"
          class="paginator">
        </mat-paginator>

        <!-- Debug info - remove this after testing -->
        <div *ngIf="!loading" class="debug-info">
          <small>
            Page: {{currentPage}} | Total: {{totalCompounds}} | 
            Showing: {{compounds.length}} compounds
          </small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .gallery-header {
      background-color: #1976d2;
      color: white;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-spacer {
      flex: 1 1 auto;
    }

    .auth-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .welcome-text {
      margin-right: 16px;
      font-size: 14px;
    }

    .gallery-content {
      padding: 24px;
      max-width: 1200px;
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

    .compounds-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .no-compounds {
      text-align: center;
      padding: 48px;
      color: #666;
    }

    .no-compounds mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
    }

    .paginator {
      display: flex;
      justify-content: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 16px;
    }

    .debug-info {
      text-align: center;
      color: #666;
      font-size: 12px;
      padding: 8px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }

    @media (max-width: 768px) {
      .gallery-content {
        padding: 16px;
      }
      
      .compounds-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
      }

      .auth-buttons {
        flex-direction: column;
        gap: 4px;
      }
    }
  `]
})
export class CompoundGalleryComponent implements OnInit {
  compounds: Compound[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 10;
  totalCompounds = 30; // Set default to 30 as per requirements

  constructor(
    private compoundService: CompoundService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCompounds();
  }

  loadCompounds() {
    this.loading = true;
    console.log('Loading compounds for page:', this.currentPage); // Debug log
    
    this.compoundService.getCompounds({ page: this.currentPage }).subscribe({
      next: (response) => {
        console.log('Received response:', response); // Debug log
        this.compounds = response.compounds;
        this.totalCompounds = response.total || 30;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading compounds:', error);
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    console.log('Page change event:', event); // Debug log
    this.currentPage = event.pageIndex + 1;
    this.loadCompounds();
    window.scrollTo(0, 0);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}