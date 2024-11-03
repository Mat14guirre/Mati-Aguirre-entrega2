import { Router } from 'express';
import OrderController from '../dao/orders.controller.js';


const  router = Router();

const controller = new OrderController();
//array con usuarios de prueba
const users = [
    { id: 1, firstName: 'Juan', lastName: 'Perez' },
    { id: 2, firstName: 'Carlos', lastName: 'Perren' },
    { id: 3, firstName: 'Luis', lastName: 'Gonzalez' }
];


router.get('/', (req, res) => {
    const data = {
        firstName: 'Mati',
        lastName: 'Aguirre',
        age: 32,
        email: 'mati.net@gmail.com',
        phone: '+546546546546',
        isAdmin: true,
        users: users
    };
    
    res.status(200).render('index', data);
});


router.get('/register', (req, res) => {
    const data = {
    };
    
    res.status(200).render('register', data);
});


router.get('/realtimeproducts',(req,res)=>{
    const data={
    };
    res.status(200).render('realtimeproducts',data)
});

router.get('/home',(req,res)=>{
    const data={
    };
    res.status(200).render('home',data)
})

router.get('/newproduct', (req, res) => {
    const data = {};
    
    res.status(200).render('newproduct', data);
});



router.get('/orders/:pg?', async (req, res) => {
    const pg = req.params.pg || 1;
    const data = await controller.getPaginated(pg);
    
    res.status(200).render('orders', { orders: data });
});


export default router;