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
  templateUrl: './compound-gallery.component.html',
  styleUrls: ['./compound-gallery.component.scss']
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