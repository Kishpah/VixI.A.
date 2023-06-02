
class resources {
    private resources: any[] = [];

    // constructor() {
    // }

    // public addresource(resource: any) {
    //     this.resources.push(resource);
    // }

    // public loadresources(path: string, resourceNames: string[]) {
    //     resourceNames.forEach((resourceName) => {
    //         this.addresource(path + resourceName);
    //     });
    // }

    public getResourceList() {
        console.log('Getting Resource List')
        this.resources = this.resources.concat([
            { name: 'pepino', path: '' },
            { name: 'ajo', path: '' },
            { name: 'cebolla', path: '' },
            { name: 'regalo', path: '' },
            { name: 'balón', path: '' },
            { name: 'hoguera', path: '' },
            { name: 'gafas de sol', path: '' },
            { name: 'tiovivo', path: '' },
            { name: 'árbol', path: '' },
            { name: 'tenedor', path: '' },
            { name: 'gorro de fiesta', path: '' },
            { name: 'gallina', path: '' },
            { name: 'pelota de tenis', path: '' },
            { name: 'huevo', path: '' },
            { name: 'caramelo', path: '' },
            { name: 'avión', path: '' },
            { name: 'hormiga', path: '' },
            { name: 'tomate', path: '' },
            { name: 'leche', path: '' },
            { name: 'pera', path: '' },
            { name: 'mando', path: '' },
            { name: 'lechuga', path: '' },
            { name: 'ovni', path: '' },
            { name: 'silbato', path: '' },
            { name: 'oso polar', path: '' },
            { name: 'maletín', path: '' },
            { name: 'mundo', path: '' },
            { name: 'clip', path: '' },
            { name: 'magdalena', path: '' },
            { name: 'taza', path: '' },
            { name: 'vaca', path: '' },
            { name: 'pasta de dientes', path: '' },
            { name: 'manzana', path: '' },
            { name: 'batidora', path: '' },
            { name: 'flotador', path: '' },
            { name: 'pila', path: '' },
            { name: 'moto', path: '' },
            { name: 'perrito caliente', path: '' },
            { name: 'hueso', path: '' },
            { name: 'noria', path: '' },
            { name: 'prismáticos', path: '' },
            { name: 'tetera', path: '' },
            { name: 'bola de espejos', path: '' },
            { name: 'reloj', path: '' },
            { name: 'regla', path: '' },
            { name: 'pato', path: '' },
            { name: 'palo de golf', path: '' },
            { name: 'saxofón', path: '' },
        ]);

        return this.resources;
    }
}

export default new resources();