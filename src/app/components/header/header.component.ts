import { Component, input } from '@angular/core';
import { LoadedPokemonService } from '../../services/loaded-pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  inputField: string;

  constructor(public pokemonService: LoadedPokemonService) {}

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

  loadGen(start: number, end: number) {
    this.pokemonService.search = true;
    this.pokemonService.pokemonSearchList = this.pokemonService.pokemonFullList.filter((pokemon) => {
      return this.pokemonService.pokemonFullList.indexOf(pokemon) < end && this.pokemonService.pokemonFullList.indexOf(pokemon) >= start;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (start === 0 && end === 0) {
      console.log('start and end are 0');
      this.pokemonService.search = false;
      this.pokemonService.pokemonSearchList = [];
    }
  }
}
