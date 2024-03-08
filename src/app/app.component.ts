import { Component } from '@angular/core';
import { LoadedPokemonService } from './loaded-pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Pokedex';
  currentIndex:any;
  constructor(public loadedPokemon:LoadedPokemonService){
    this.currentIndex = loadedPokemon.pokemonList;
  }
  

  
}
