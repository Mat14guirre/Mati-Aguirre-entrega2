import fs from 'fs';

export class productsManager {
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

    async #readProductsFile() {
        const products = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(products);
    };

    async createProduct(data) {
        const products = await this.#readProductsFile();
        products.push(data);
        await fs.promises.writeFile(this.file, JSON.stringify(products));
        console.log('Nuevo Producto agregado');
    };

    async getProducts() {
        return await this.#readProductsFile();
    };
};