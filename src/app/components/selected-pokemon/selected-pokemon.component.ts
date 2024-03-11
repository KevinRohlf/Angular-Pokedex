import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon.class';
import { LoadedPokemonService } from '../../services/loaded-pokemon.service';

@Component({
  selector: 'app-selected-pokemon',
  templateUrl: './selected-pokemon.component.html',
  styleUrl: './selected-pokemon.component.scss'
})
export class SelectedPokemonComponent implements OnInit{
  @Input() selectedPokemon:any;
  pokemon:Pokemon;
  pokemonIndex: number;
  general = true;

  ngOnInit(): void {
  }

  constructor(public pokemonService:LoadedPokemonService) { 
    
  }
  async ngOnChanges() {
    this.pokemon = new Pokemon(await this.pokemonService.loadPokemon(this.selectedPokemon));
    this.pokemonIndex = this.pokemonService.pokemonFullList.indexOf(this.pokemon.name);
    console.log(this.pokemon.abilities)
  }

  /**
   * Load the next pokemon
   */
  async loadNextPokemon(lastOrNext: string) {
    if (lastOrNext === "last") {
      this.pokemonIndex--;
    } else {
      this.pokemonIndex++;
    }
    this.selectedPokemon = this.pokemonService.pokemonFullList[this.pokemonIndex];
    this.pokemon = new Pokemon(await this.pokemonService.loadPokemon(this.selectedPokemon));
  }
}
