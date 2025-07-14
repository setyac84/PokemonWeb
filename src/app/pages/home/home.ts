import { Component, OnInit } from '@angular/core';
import { PokemonService } from './../../services/pokemon';
import { PaginationComponent } from '../../components/pagination/pagination';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    PokemonCard,
    PaginationComponent,
    FormsModule,
  ],
})

export class HomeComponent implements OnInit {
  allPokemons: any[] = [];   // ✅ Store all data here
  pokemons: any[] = [];      // ✅ What gets rendered on current page
  filteredPokemons: any[] = []; // ✅ Result after search/filter
  readonly limit = 10;
  currentPage = 1;
  totalPages = 1;
  offset = 0;
  searchTerm = '';
  selectedType = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.pokemonService.getPokemonList(151, 0).subscribe((res: any) => {
      const results = res.results;
      const pokemonPromises = results.map((poke: any) =>
        this.pokemonService.getPokemonDetail(poke.name).toPromise()
      );

      Promise.all(pokemonPromises).then((details) => {
        this.allPokemons = details.sort((a, b) => a.id - b.id);
        this.applyFilter(); // ✅ initial filtering
      });
    });
  }

  types = [
  { label: 'Normal', value: 'normal' },
  { label: 'Grass', value: 'grass' },
  { label: 'Fire', value: 'fire' },
  { label: 'Water', value: 'water' },
  { label: 'Bug', value: 'bug' },
  { label: 'Electric', value: 'electric' },
  { label: 'Rock', value: 'rock' },
  { label: 'Ghost', value: 'ghost' },
  { label: 'Poison', value: 'poison' },
  { label: 'Psychic', value: 'psychic' },
  { label: 'Fighting', value: 'fighting' },
  { label: 'Ground', value: 'ground' },
  { label: 'Dragon', value: 'dragon' },
];

onTypeButtonClick(type: string) {
  this.selectedType = type;
  this.currentPage = 1;
  this.applyFilter();
}

  applyFilter() {
    let filtered = [...this.allPokemons];

    // Apply search
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (this.selectedType) {
      filtered = filtered.filter(p =>
        p.types.some((t: { type: { name: string; }; }) => t.type.name === this.selectedType)
      );
    }

    this.filteredPokemons = filtered;
    this.totalPages = Math.ceil(this.filteredPokemons.length / this.limit);
    this.setPaginatedPokemons();
  }

  setPaginatedPokemons() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.pokemons = this.filteredPokemons.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.setPaginatedPokemons();
  }

  onSearchTermChange() {
    this.currentPage = 1;
    this.applyFilter();
  }

  onTypeChange() {
    this.currentPage = 1;
    this.applyFilter();
  }
}

