import express from 'express';
import handlebars from 'express-handlebars';
import usersRouter from './routes/users.router.js';
import config from './config.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'
import initSocket from './sockets.js';
import mongoose from 'mongoose';

const app = express();

const httpServer = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);

    console.log(`Server activo en puerto ${config.PORT} conectado a bbdd`);

    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);

    const midd1 = (req, res, next) => {
        console.log('Solicitud general recibida');
        next();
    }
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use (midd1); //habilitado en forma global ante cualquier solicitud
    
    app.engine('handlebars', handlebars.engine()); // motor de plantilla HANDLEBARS
    app.set ('views', `${config.DIRNAME}/views`);
    app.set ('view engine','handlebars');
    
    app.use('/views',viewsRouter); //servicio de plantillas para vistas
    app.use('/api/users', usersRouter); //paquete de rutas USUARIOS
    app.use('/api/products',productsRouter); //paquete rutas PRODUCTOS
    app.use('/api/carts',cartsRouter); // paquete de rutas CARRITO
    
    app.use('/static', express.static(`${config.DIRNAME}/public`)); //paquete de rutas ESTATICAS
    });