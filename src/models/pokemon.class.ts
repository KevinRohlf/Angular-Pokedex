export class Pokemon {
    name:string
    img:string
    types = []
    dexNumber:number

    constructor(obj?:any) {
        this.name = obj.name ? obj.name : "Unbekannt";
        this.img = obj['sprites']['other']['official-artwork']['front_default'] ? obj['sprites']['other']['official-artwork']['front_default'] : "";
        this.dexNumber = obj.id ? obj.id : 0;
        obj.types.forEach((pokemon: any) => {
            this.types.push(pokemon.type.name);
        });
    }

    /**
     * make the dexnumber length to 3
     */
    get dexNumberString() {
        return this.dexNumber.toString().padStart(3, '0');
    }
}