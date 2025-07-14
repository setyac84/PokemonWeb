import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail-dialog.html',
  styleUrls: ['./pokemon-detail-dialog.scss'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
      ]),
    ]),
  ],
})
export class PokemonDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public pokemon: any,
    private dialogRef: MatDialogRef<PokemonDetailDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
