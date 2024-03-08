import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon.class';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoadedPokemonService {
  pokemonList = []
  offset = 0;
  limit = 20;
  loading = false;

  constructor() {
    this.loadPokemonsInList();
  }
  /**
   * Load more pokemons from the pokeapi
   */
  async loadPokemonsInList() {
    this.loading = true;
    console.log("Loading more pokemons");
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`;
    let response = await fetch(url);
    let list = await response.json();
    list.results.forEach((pokemon) => {
      if (!this.pokemonList.includes(pokemon.name)) {
        this.pokemonList.push(pokemon.name);
      } else {
        console.log("Pokemon already loaded");
      }
    });
    this.offset = this.limit;
    this.limit += 20;
    this.loading = false;
    console.log('offset ' + this.offset, 'limit ' + this.limit);
  }

  /**
   * Load a pokemon from the pokeapi
   * @param name  The name of the pokemon  
   * @returns   The pokemon object
   */
  async loadPokemon(name:string) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}` 
    let response = await fetch(url);
    let pokemon = await response.json();
    // pokemon = new Pokemon(pokemon);
    return pokemon;
  }
}
