import fs from 'fs';

export class cartsManager {
    constructor(file) {
        this.file = file;
    };

    async init() {
        try {
            const exists = await fs.promises.access(this.file);
            
        } catch (err) {
            console.log('archivo NO EXISTE');
            await fs.promises.writeFile(this.file, JSON.stringify([]));
        };
    };

    async #readCartsFile() {
        const carts = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(carts);
    };

    async createCarts(data) {
        const carts = await this.#readCartsFile();
        carts.push(data);
        await fs.promises.writeFile(this.file, JSON.stringify(carts));
        console.log('Nuevo carrito agregado');
    };

    async getCarts() {
        return await this.#readCartsFile();
    };
};