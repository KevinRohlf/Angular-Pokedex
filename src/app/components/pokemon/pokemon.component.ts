import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LoadedPokemonService } from '../../loaded-pokemon.service';
import { Pokemon } from '../../../models/pokemon.class';

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
    this.pokemon = new Pokemon(this.pokemon)
    this.imgsrc = this.pokemon.img
  }

  ngOnChanges(changes: SimpleChanges) {
    this.index = changes['index'].currentValue;
    this.loadPokemon()
  }
}
