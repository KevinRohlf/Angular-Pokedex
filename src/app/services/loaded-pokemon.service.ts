import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon.class';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoadedPokemonService {
  pokemonList = [];
  pokemonFullList = [];
  offset = 0;
  limit = 30;
  loading = false;
  openOverlay = false;

  constructor() {
    this.loadPokemonsInList();
  }
  /**
   * Load more pokemons from the pokeapi
   */
  async loadPokemonsInList() {
    console.log("Loading more pokemons");
    let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    let response = await fetch(url);
    let list = await response.json();
    list.results.forEach((pokemon) => {
      if (!this.pokemonFullList.includes(pokemon.name)) {
        this.pokemonFullList.push(pokemon.name);
      }
    });
    this.loadPokemonCards();
  }

  /**
   * Load 30 pokemon from pokemonFullList in pokemonList
   */
  loadPokemonCards() {
    if (this.loading) return;
    this.loading = true;
    for (let i = this.offset; i < this.limit; i++) {
      if (!this.pokemonList.includes(this.pokemonFullList[i])) {
        this.pokemonList.push(this.pokemonFullList[i]);
      }
    }
    this.offset = this.limit;
    this.limit += 30;
    this.loading = false;
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
    return pokemon;
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
