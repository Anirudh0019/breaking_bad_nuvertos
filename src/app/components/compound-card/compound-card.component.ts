import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Compound } from '../../models/compound.model';

@Component({
  selector: 'app-compound-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="compound-card" [routerLink]="['/compounds', compound.id]">
      <div class="card-image-container">
        <img 
          [src]="compound.image" 
          [alt]="compound.name"
          class="compound-image"
          (error)="onImageError($event)"
        />
      </div>
      <mat-card-content>
        <h3 class="compound-name">{{ compound.name }}</h3>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .compound-card {
      cursor: pointer;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .compound-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }

    .card-image-container {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      overflow: hidden;
    }

    .compound-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .compound-name {
      margin: 16px 0 8px 0;
      font-weight: 500;
      text-align: center;
      color: #333;
    }

    mat-card-content {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class CompoundCardComponent {
  @Input() compound!: Compound;

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-molecule.svg'; // You can add a placeholder image
  }
}