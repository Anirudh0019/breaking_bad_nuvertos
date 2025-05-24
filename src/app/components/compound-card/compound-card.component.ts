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
  templateUrl: './compound-card.component.html',

  styleUrls: ['./compound-card.component.scss']
})
export class CompoundCardComponent {
  @Input() compound!: Compound;

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-molecule.svg'; // You can add a placeholder image
  }
}