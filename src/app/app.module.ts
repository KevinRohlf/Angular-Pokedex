import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { SelectedPokemonComponent } from './components/selected-pokemon/selected-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    SelectedPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
