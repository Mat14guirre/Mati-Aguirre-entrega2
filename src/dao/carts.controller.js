import cartModel from './models/cart.model.js';
import userModel from './models/user.model.js';


class CartController {
    constructor() {}

    get = async () => {
        try {
            return await cartModel
                .find()
                .populate({ path: 'user', model: userModel, select: 'email firstName lastName' })
                .lean();
        } catch (err) {
            return err.message;
        }
    }

    getOne = async (id) => {
        try {
            return await cartModel.finById(id).populate({ path: 'user', model: userModel }).lean();
        } catch (err) {
            return err.message;
        }
    }

    add = async (data) => {
        try {
            return await cartModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options) => {
        try {
            return await cartModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    delete = async (filter, options) => {
        try {
            return await cartModel.findOneAndDelete(filter, options);
        } catch (err) {
            return err.message;
        }
    }
}


export default CartController;