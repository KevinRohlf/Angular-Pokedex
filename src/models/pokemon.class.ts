export class Pokemon {
    name:string
    img:string
    types = []
    dexNumber:number
    height:any
    weight:any
    abilities = []
    stats = []

    constructor(obj?:any) {
        this.name = obj.name ? obj.name : "Unbekannt";
        this.img = obj['sprites']['other']['official-artwork']['front_default'] ? obj['sprites']['other']['official-artwork']['front_default'] : "/assets/img/loading.svg";
        this.dexNumber = obj.id ? obj.id : 0;
        obj.types.forEach((pokemon: any) => {
            this.types.push(pokemon.type.name);
        });
        obj.abilities.forEach((ability: any) => {
            this.abilities.push(ability.ability.name);
        });
        this.height = this.convertHAndW(obj.height);
        this.weight = this.convertHAndW(obj.weight);
        obj.stats.forEach((stat: any) => {
            this.stats.push({name: stat.stat.name, value: stat.base_stat});
        });
    }

    /**
     * make the dexnumber length to 3
     */
    get dexNumberString() {
        return this.dexNumber.toString().padStart(3, '0');
    }

    convertHAndW(hw: any) {
        hw = hw.toString();
        if (hw.length < 2) {
            for (let i = 0; hw.length < 2; i++) {
                hw = 0 + hw;
            }
        }
        hw = hw.substr(0, hw.length - 1) + "," + hw.substr(hw.length - 1, 1);
        return hw;
    }
}