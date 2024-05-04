import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Pokemon } from '../../../models/pokemon.class';
import { LoadedPokemonService } from '../../services/loaded-pokemon.service';


@Component({
  selector: 'app-selected-pokemon',
  templateUrl: './selected-pokemon.component.html',
  styleUrl: './selected-pokemon.component.scss',
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
    this.pokemonIndex = this.pokemonService.search ? this.pokemonService.pokemonSearchList.indexOf(this.pokemon.name) : this.pokemonService.pokemonFullList.indexOf(this.pokemon.name);
  }

  /**
   * Load the next pokemon
   */
  async loadNextPokemon(lastOrNext: string) {
    if (this.pokemonService.search)
      this.pokemonIndex = this.pokemonService.pokemonSearchList.indexOf(this.pokemon.name);

    lastOrNext === "last" ? this.pokemonIndex-- : this.pokemonIndex++;
    this.pokemonService.search ? this.selectedPokemon = this.pokemonService.pokemonSearchList[this.pokemonIndex] : this.selectedPokemon = this.pokemonService.pokemonFullList[this.pokemonIndex];
    this.pokemon = new Pokemon(await this.pokemonService.loadPokemon(this.selectedPokemon));
  }

  progessbarWidth(stat: number) {
    return stat / 255 * 100;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.keyCode === 37 && this.pokemonIndex !== 0) {
      this.loadNextPokemon("last");
    } else if (event.keyCode === 39 && this.pokemonIndex !== this.pokemonService.pokemonFullList.length - 1) {
      if (this.pokemonService.search){
        this.pokemonIndex = this.pokemonService.pokemonSearchList.indexOf(this.pokemon.name);
        if (this.pokemonIndex < this.pokemonService.pokemonSearchList.length - 1) {
          this.loadNextPokemon("next");
        }
      } else {
        this.loadNextPokemon("next");
      }
    }
  }
  
}