export class Pokemon {
    name:string
    img:string
    pokemonType = []
    dexNumber:number

    constructor(obj?:any) {
        this.name = obj.name ? obj.name : "Unbekannt";
        this.img = obj.sprites.other["official-artwork"].front_default ? obj.sprites.other["official-artwork"].front_default : "";
        this.dexNumber = obj.id ? obj : 0;
        obj.types.forEach((pokemon: any) => {
            this.pokemonType.push(pokemon.name);
        });
    }
}