import { Server } from 'socket.io';

const initSocket = (httpServer) => {
    const io = new Server(httpServer);
    console.log('Servicio socket.io activo');

    let products = []; // Array para almacenar los productos
    
    io.on('connection', (client) => {
        console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

        // Enviar lista de productos al cliente recién conectado
        client.emit('current_products', products);

        // Suscripción para agregar un nuevo producto
        client.on('new_product', (data) => {
            try {
                if (data && data.name && data.price) { // Validar que los datos sean correctos
                    products.push(data);
                    io.emit('new_product', data); // Notificar a todos los clientes sobre el nuevo producto
                } else {
                    console.error('Datos de producto inválidos:', data);
                }
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        });

        // Suscripción para eliminar un producto
        client.on('delete_product', (productName) => {
            try {
                products = products.filter(product => product.name !== productName);
                io.emit('current_products', products); // Enviar lista actualizada a todos los clientes
            } catch (error) {
                console.error('Error al eliminar producto:', error);
            }
        });

        client.on('disconnect', (reason) => {
            console.log(`Cliente desconectado: ${reason}`);
        });
    });

    return io;
}

export default initSocket;
