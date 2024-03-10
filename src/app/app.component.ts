import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { LoadedPokemonService } from './services/loaded-pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'Pokedex';
  selectedPokemon: any;
  height: number;
  @ViewChild('pokemon') body: ElementRef;
  constructor(public loadedPokemon: LoadedPokemonService) { }

  ngAfterViewInit() {
  }




  selectPokemon(index) {
    this.selectedPokemon = index;
  }
  /**
   * Load more pokemons from the pokeapi if the user scrolls to the bottom of the page
   */
  @HostListener("window:scroll", [])
  onScroll(): void {
    let height = this.body.nativeElement.offsetHeight;
    if ((window.innerHeight + window.scrollY) >= height && !this.loadedPokemon.loading) {
      this.loadedPokemon.loadPokemonCards();
    }
  }
/**
 *  Stop the event from propagating
 * @param event The event to stop from propagating
 */
  doNotClose(event:any) {
    event.stopPropagation();
  }


}
