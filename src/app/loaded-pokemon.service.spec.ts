import { TestBed } from '@angular/core/testing';

import { LoadedPokemonService } from './loaded-pokemon.service';

describe('LoadedPokemonService', () => {
  let service: LoadedPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadedPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
