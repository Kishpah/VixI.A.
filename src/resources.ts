import { ImageSource } from "excalibur";

// Importar así es un asco, pero no sé por qué no me funciona hacerlo dinámicamente.
const pepino= import('/assets/images/pepino.png');
const ajo= import('/assets/images/ajo.png');
const regalo= import('/assets/images/regalo.png');
const balón= import('/assets/images/balón.png');
const hoguera= import('/assets/images/hoguera.png');
const gafas_de_sol= import('/assets/images/gafas de sol.png');
const tiovivo= import('/assets/images/tiovivo.png');
const árbol= import('/assets/images/árbol.png');
const tenedor= import('/assets/images/tenedor.png');
const gorro_de_fiesta= import('/assets/images/gorro de fiesta.png');
const gallina= import('/assets/images/gallina.png');
const pelota_de_tenis= import('/assets/images/pelota de tenis.png');
const huevo= import('/assets/images/huevo.png');
const caramelo= import('/assets/images/caramelo.png');
const avión= import('/assets/images/avión.png');
const hormiga= import('/assets/images/hormiga.png');
const tomate= import('/assets/images/tomate.png');
const leche= import('/assets/images/leche.png');
const pera= import('/assets/images/pera.png');
const mando= import('/assets/images/mando.png');
const ovni= import('/assets/images/ovni.png');
const silbato= import('/assets/images/silbato.png');
const oso= import('/assets/images/oso.png');
const maletín= import('/assets/images/maletín.png');
const clip= import('/assets/images/clip.png');
const magdalena= import('/assets/images/magdalena.png');
const taza= import('/assets/images/taza.png');
const vaca= import('/assets/images/vaca.png');
const pasta_de_dientes= import('/assets/images/pasta de dientes.png');
const manzana= import('/assets/images/manzana.png');
const flotador= import('/assets/images/flotador.png');
const pila= import('/assets/images/pila.png');
const moto= import('/assets/images/moto.png');
const hueso= import('/assets/images/hueso.png');
const noria= import('/assets/images/noria.png');
const prismáticos= import('/assets/images/prismáticos.png');
const tetera= import('/assets/images/tetera.png');
const reloj= import('/assets/images/reloj.png');
const regla= import('/assets/images/regla.png');
const saxofón= import('/assets/images/saxofón.png');

class resources {
    private resources: any[] = [];

    public async getResourceList() {
        console.log('Getting Resource List')
        this.resources = this.resources.concat([
            { name: 'pepino', imagefile:pepino},
            { name: 'ajo', imagefile:ajo},
            { name: 'regalo', imagefile:regalo},
            { name: 'balón', imagefile:balón},
            { name: 'hoguera', imagefile:hoguera},
            { name: 'gafas de sol', imagefile:gafas_de_sol},
            { name: 'tiovivo', imagefile:tiovivo},
            { name: 'árbol', imagefile:árbol},
            { name: 'tenedor', imagefile:tenedor},
            { name: 'gorro de fiesta', imagefile:gorro_de_fiesta},
            { name: 'gallina', imagefile:gallina},
            { name: 'pelota de tenis', imagefile:pelota_de_tenis},
            { name: 'huevo', imagefile:huevo},
            { name: 'caramelo', imagefile:caramelo},
            { name: 'avión', imagefile:avión},
            { name: 'hormiga', imagefile:hormiga},
            { name: 'tomate', imagefile:tomate},
            { name: 'leche', imagefile:leche},
            { name: 'pera', imagefile:pera},
            { name: 'mando', imagefile:mando},
            { name: 'ovni', imagefile:ovni},
            { name: 'silbato', imagefile:silbato},
            { name: 'oso', imagefile:oso},
            { name: 'maletín', imagefile:maletín},
            { name: 'clip', imagefile:clip},
            { name: 'magdalena', imagefile:magdalena},
            { name: 'taza', imagefile:taza},
            { name: 'vaca', imagefile:vaca},
            { name: 'pasta de dientes', imagefile:pasta_de_dientes},
            { name: 'manzana', imagefile:manzana},
            { name: 'flotador', imagefile:flotador},
            { name: 'pila', imagefile:pila},
            { name: 'moto', imagefile:moto},
            { name: 'hueso', imagefile:hueso},
            { name: 'noria', imagefile:noria},
            { name: 'prismáticos', imagefile:prismáticos},
            { name: 'tetera', imagefile:tetera},
            { name: 'reloj', imagefile:reloj},
            { name: 'regla', imagefile:regla},
            { name: 'saxofón', imagefile:saxofón},
        ]);
        
        for(let resource of this.resources) {
            
            // Por alguna extraña razón, esto funciona:
            // const image = import('/assets/images/pepino.png')
            // Pero esto no:
            // resource.path = 'assets/images/' + resource.name + '.png';
            // const image = import(resource.path)
            // Sospecho que es cosa de Parcel, pero no voy a cambiarlo ahora.

            resource.image = new ImageSource((await resource.imagefile).default);
        };

        return this.resources;
    }

    public getPromptList() {
        return [
            { text: 'Un oso y una hormiga montando\n en moto mientras se comen una manzana', tags: ['oso','hormiga','moto','manzana'] },
            { text: 'una vaca cocinando ajos en una hoguera', tags: ['vaca','ajo','hoguera'] },
            { text: 'una magdalena con gorro de fiesta repartiendo caramelos', tags: ['magdalena','gorro de fiesta','caramelo'] },
            { text: 'una gallina montada en una noria\n tocando el saxofón', tags: ['gallina','noria','saxofón'] },
            { text: 'una pera con gafas de sol\n volando en un ovni', tags: ['pera','gafas de sol','ovni'] },
            { text: 'una gallina midiendo un hueso\n con una regla', tags: ['gallina','hueso','regla'] },
            { text: 'un regalo con varias pelotas dentro', tags: ['regalo','balón', 'pelota de tenis'] },
            { text: 'una taza llena de clips\n en la copa de un árbol', tags: ['taza','clip','árbol'] },
            { text: 'un tiovivo con aviones y relojes', tags: ['tiovivo','avión','reloj'] },
            { text: 'unos prismáticos para ver\nuna pera con un tenedor clavado', tags: ['prismáticos','pera','tenedor'] },
        ]
    }
    
}

export default new resources();