import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LoadedPokemonService } from '../../services/loaded-pokemon.service';
import { Pokemon } from '../../../models/pokemon.class';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit{
  @Input() index;
  pokemon:any = [{types: false}];

  ngOnInit(): void {
  }
  
  constructor(public loadedPokemon:LoadedPokemonService){
    
  }

/**
 *  Load the pokemon class
 * @param changes  The changes to the input
 */
  async ngOnChanges(changes: SimpleChanges) {
    this.index = changes['index'].currentValue;
    this.pokemon = new Pokemon(await this.loadedPokemon.loadPokemon(this.index));
  }
}
