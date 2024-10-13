import {Router} from 'express';

const router = Router();

let carts = [];
let cartId= 1 ;

router.post('/',(req,res)=>{
    const newCart={id:cartId++, products: []};
    carts.push (newCart);
    res.status(201).json(newCart);
});

router.get('/:cid',(req,res)=>{
    const cid= parseInt(req.params.cid);
    const cart = carts.find (c=> c.id === cid);
    if (!cart){
        return res.status(404).json('carrito no encontrado')
    }
    res.json(cart.products);
});

router.post('/:cid/product/:pid', (req,res)=>{
    const cid = parseInt (req.params.cid);
    const pid = parseInt (req.params.pid);
    const cart = carts.find(c=>c.id===cid);

    if(!cart){
        return res.status(404).json('carrito no encontrado')
    }
    const productExist= cart.products.find(p=> p.product ===pid);

    if(productExist){
        productExist.quantity +=1 ;
    }else {
        const newProduct={
        product: pid,
        quantity: 1
        };
    
    cart.products.push(newProduct);
    };
    
    res.status(200).json(cart);
});

export default router;