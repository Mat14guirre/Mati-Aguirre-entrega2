import orderModel from './models/order.model.js';
import config from '../config.js';


class OrderController {
    constructor() {}

    get = async () => {
        try {
            return await orderModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    getPaginated = async (pg) => {
        try {
            return await orderModel.paginate({}, { limit: config.ITEMS_PER_PAGE, page: pg, lean: true });
        } catch (err) {
            return err.message;
        }
    }

    add = async (data) => {
        try {
            return await orderModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options) => {
        try {
            return await orderModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    delete = async (filter, options) => {
        try {
            return await orderModel.findOneAndDelete(filter, options);
        } catch (err) {
            return err.message;
        }
    }

    stats = async (size) => {
        try {
            return await orderModel.aggregate([
                { $match: { size: size } }, 
                { $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } } }, 
                { $sort: { totalQuantity: -1 } } 

            ]);
        } catch (err) {
            return err.message;
        }
    }
}


export default OrderController;