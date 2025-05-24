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
  templateUrl: './compound-details.component.html',
  styleUrls: ['./compound-details.component.scss']
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