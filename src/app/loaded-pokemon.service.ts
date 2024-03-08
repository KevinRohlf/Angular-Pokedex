import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadedPokemonService {
  pokemonList = []

  constructor() {
    this.loadPokemonsInList();
  }

  async loadPokemonsInList() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
    let response = await fetch(url);
    let list = await response.json();
    list.results.forEach((pokemon) => {
      this.pokemonList.push(pokemon.name);
    });
  }
}
