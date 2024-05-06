import { Component, input } from '@angular/core';
import { LoadedPokemonService } from '../../services/loaded-pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  inputField: string;
  openSearch = false;

  constructor(public pokemonService: LoadedPokemonService) {}

  /**
   * Search for a pokemon
   * @param event The keyup event
   */
  search(event: any) {
    if (this.inputField === '') {
      this.pokemonService.search = false;
      this.pokemonService.pokemonSearchList = [];
      return;
    } else {
      this.pokemonService.search = true;
      this.pokemonService.pokemonSearchList =
        this.pokemonService.pokemonFullList.filter((pokemon) => {
          return pokemon.includes(this.inputField.toLowerCase());
        });
    }
  }

  isOpenSearchbar() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 600) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  openSearchbar() {
    this.openSearch = !this.openSearch;
    console.log(this.openSearch);
  }
}
