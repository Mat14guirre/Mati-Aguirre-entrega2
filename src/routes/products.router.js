import {Router} from 'express';


const router = Router();

const products = [
    { id: 1,code:'456136', name: 'iPhone 11', price: 430, category: 'celulares', stock: 23 },
    { id: 2,code:'789456', name: 'iPhone 12', price: 560, category: 'celulares', stock: 17 },
    { id: 3,code:'659324', name: 'iPhone 13', price: 650, category: 'celulares', stock: 36  },
    { id: 4,code:'514896', name: 'iPhone 14', price: 740, category: 'celulares', stock: 12 },
    { id: 5,code:'852569', name: 'iPhone 15', price: 860, category: 'celulares', stock: 24 }
];

router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: products });
});

router.post('/',(req,res)=>{
    const {code,name} = req.body;

    if (name != '' && code != '') {
        const maxId = Math.max(...products.map(element => +element.id));
        const newProduct = { id: maxId + 1,code:code, name:name };
        products.push(newProduct);
        res.status(200).send({ error: null, data: newProduct, file: req.file });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.put('/:pid', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(element => element.id === id);
    
    if (index > -1) {
        products[index] = req.body;
        res.status(200).send({ error: null, data: products[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

router.delete('/:pid', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(element => element.id === id);
    
    if (index > -1) {
        products.splice(index, 1);
        res.status(200).send({ error: null, data: 'Producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});


export default router;