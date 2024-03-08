import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LoadedPokemonService } from '../loaded-pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit{
  @Input() index;
  pokemon:any = [];
  currentIndex:number = 2;
  imgsrc:string;

  ngOnInit(): void {
  }
  
  constructor(public loadedPokemon:LoadedPokemonService){
    
  }

  async loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/${this.index}` 
    let response = await fetch(url);
    this.pokemon = await response.json();
    this.imgsrc = this.pokemon['sprites']['other']['official-artwork']['front_default']
  }

  ngOnChanges(changes: SimpleChanges) {
    this.index = changes['index'].currentValue;
    this.loadPokemon()
  }
}
