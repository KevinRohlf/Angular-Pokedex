import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class LoadedPokemonService {
  pokemonList = [];
  pokemonFullList = [];
  pokemonSearchList = [];
  offset: number = 0;
  limit: number = 30;
  loading: boolean = false;
  openOverlay: boolean = false;
  search: boolean = false;
  generations = [];
  loadedGen: number = 0;

  constructor() {
    this.loadPokemonsInList();
    this.loadGenerations();
  }
  /**
   * Load more pokemons from the pokeapi
   */
  async loadPokemonsInList() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    let response = await fetch(url);
    let list = await response.json();
    list.results.forEach((pokemon: any) => {
      if (!this.pokemonFullList.includes(pokemon.name)) {
        this.pokemonFullList.push(pokemon.name);
      }
    });
    this.loadPokemonCards();
  }

  /**
   * Load the generations from the pokeapi
   */
  async loadGenerations() {
    let url = `https://pokeapi.co/api/v2/generation/`;
    let response = await fetch(url);
    let generations = await response.json();
    generations.results.forEach((generation: any) => {
      this.generations.push(generation.name);
    });
  }

  /**
   * Load the pokemon from a specific generation
   * @param gen The generation number
   */
  async loadGenPokemon(gen: number) {
    this.search = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (gen == 0) {
      this.pokemonSearchList = [];
      this.search = false;
      this.loadedGen = 0;
    } else {
      let url = `https://pokeapi.co/api/v2/generation/${gen}/`;
      let response = await fetch(url);
      let generation = await response.json();
      generation.pokemon_species.forEach((element) => {
        element.url = element.url.split('/')[6];
      });
      generation.pokemon_species.sort((a, b) => a.url - b.url);
      this.pokemonSearchList = generation.pokemon_species.map(
        (pokemon: any) => {
          return pokemon.name;
        }
      );
      this.loadedGen = gen;
    }
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
  async loadPokemon(name: string) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    return pokemon;
  }
  
  /**
   * Capitalize the first letter of a word
   * @param word The word to capitalize
   * @returns The capitalized word
   */
  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
