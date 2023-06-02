import { ImageSource } from "excalibur";

// import imagen from '/assets/images/árbol.png';
class resources {
    private resources: any[] = [];

    public async getResourceList() {
        console.log('Getting Resource List')
        this.resources = this.resources.concat([
            { name: 'pepino', path: '/assets/images/pepino.png' },
            { name: 'ajo', path: '/assets/images/ajo.png' },
            { name: 'cebolla', path: '/assets/images/cebolla.png' },
            { name: 'regalo', path: '/assets/images/regalo.png' },
            { name: 'balón', path: '/assets/images/balón.png' },
            { name: 'hoguera', path: '/assets/images/hoguera.png' },
            { name: 'gafas de sol', path: '/assets/images/gafas de sol.png' },
            { name: 'tiovivo', path: '/assets/images/tiovivo.png' },
            { name: 'árbol', path: '/assets/images/árbol.png' },
            { name: 'tenedor', path: '/assets/images/tenedor.png' },
            { name: 'gorro de fiesta', path: '/assets/images/gorro de fiesta.png' },
            { name: 'gallina', path: '/assets/images/gallina.png' },
            { name: 'pelota de tenis', path: '/assets/images/pelota de tenis.png' },
            { name: 'huevo', path: '/assets/images/huevo.png' },
            { name: 'caramelo', path: '/assets/images/caramelo.png' },
            { name: 'avión', path: '/assets/images/avión.png' },
            { name: 'hormiga', path: '/assets/images/hormiga.png' },
            { name: 'tomate', path: '/assets/images/tomate.png' },
            { name: 'leche', path: '/assets/images/leche.png' },
            { name: 'pera', path: '/assets/images/pera.png' },
            { name: 'mando', path: '/assets/images/mando.png' },
            { name: 'ovni', path: '/assets/images/ovni.png' },
            { name: 'silbato', path: '/assets/images/silbato.png' },
            { name: 'oso', path: '/assets/images/oso.png' },
            { name: 'maletín', path: '/assets/images/maletín.png' },
            { name: 'clip', path: '/assets/images/clip.png' },
            { name: 'magdalena', path: '/assets/images/magdalena.png' },
            { name: 'taza', path: '/assets/images/taza.png' },
            { name: 'vaca', path: '/assets/images/vaca.png' },
            { name: 'pasta de dientes', path: '/assets/images/pasta de dientes.png' },
            { name: 'manzana', path: '/assets/images/manzana.png' },
            { name: 'flotador', path: '/assets/images/flotador.png' },
            { name: 'pila', path: '/assets/images/pila.png' },
            { name: 'moto', path: '/assets/images/moto.png' },
            { name: 'hueso', path: '/assets/images/hueso.png' },
            { name: 'noria', path: '/assets/images/noria.png' },
            { name: 'prismáticos', path: '/assets/images/prismáticos.png' },
            { name: 'tetera', path: '/assets/images/tetera.png' },
            { name: 'reloj', path: '/assets/images/reloj.png' },
            { name: 'regla', path: '/assets/images/regla.png' },
            { name: 'saxofón', path: '/assets/images/saxofón.png' },
        ]);
        // for(let i = 0; i < this.resources.length; i++) {
        for(let resource of this.resources) {
            resource.path = '/assets/images/' + resource.name + '.png';
            console.log('Loading resource: ' + resource.path)
            //let image = await require(resource.path);

            //let image = await 
            //import(this.resources[i].path).then((image) => {
            //console.log('Loaded resource: ' + this.resources[i].path)
            //this.resources[i].image = new ImageSource(image.default);
            // resource.image = new ImageSource(imagen.default);
            // console.log('Added resource: ' + resource.image)

        };

        return this.resources;
    }
}

export default new resources();