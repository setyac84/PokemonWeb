import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokemonDetailDialogComponent } from '../pokemon-detail-dialog/pokemon-detail-dialog';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule, MatDialogModule],
  standalone: true,
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
})
export class PokemonCard {
  @Input() pokemon: any;
  imageError = false;

  constructor(private dialog: MatDialog) {}

  typeColorMap: Record<string, string> = {
    fire: '#f08030',
    water: '#6890f0',
    grass: '#78c850',
    poison: '#a040a0',
    electric: '#f8d030',
    normal: '#a8a878',
    flying: '#a890f0',
    fairy: '#ee99ac',
    ground: '#e0c068',
    bug: '#a8b820',
    psychic: '#f85888',
    rock: '#b8a038',
    ghost: '#705898',
    ice: '#98d8d8',
    dragon: '#7038f8',
    fighting: '#c03028',
    dark: '#705848',
    steel: '#b8b8d0',
  };

  get borderColor(): string {
    const type = this.pokemon?.types?.[0]?.type?.name || 'normal';
    return this.typeColorMap[type] || '#a8a878';
  }

  handleImageError() {
    this.imageError = true;
  }

  openDetail() {
    this.dialog.open(PokemonDetailDialogComponent, {
      data: this.pokemon,
      width: '400px',
    });
  }
}
