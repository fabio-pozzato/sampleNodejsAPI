const errors = require('restify-errors');

const CustomerDAO = require('../DAO/CustomerDAO');

module.exports =  server => {
    server.get('/customers', async (req, res, next) => {
        try {
            const customers = await CustomerDAO.find({});
            res.send(customers);
            next();
        } catch(err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    server.get('/customers/:id', async (req, res, next) => {
        try {
            const customers = await CustomerDAO.findById(req.params.id);
            res.send(customers);
            next();
        } catch(err) {
            return next(new errors.ResourceNotFoundError('Customer not found. ID: '+req.params.id));
        }
    });

    server.post('/customers', async (req, res, next) => {
        if(!req.is('application/json')) {
            return new errors.InvalidContentError("Expects 'application/json");
        }
        const {name, email, balance} = req.body;

        const customer = new CustomerDAO({
            name,
            email,
            balance
        });

        try {
            await customer.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });

    server.put('/customers/:id', async (req, res, next) => {
        if(!req.is('application/json')) {
            return new errors.InvalidContentError("Expects 'application/json");
        }

        try {
            await CustomerDAO.findOneAndUpdate({_id: req.params.id}, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError('Customer not found. ID: '+req.params.id));
        }
    });

    server.del('/customers/:id', async (req, res, next) => {

        try {
            await CustomerDAO.findOneAndRemove({_id: req.params.id});
            res.send(204);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError('Customer not found. ID: '+req.params.id));
        }
    });

};