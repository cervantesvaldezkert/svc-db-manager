const mongodbController = require('../controllers/mongo.db.manager');
const utilServ = require('../services/util.serv');

//external routes
module.exports = (app) => {

    app.route('/health').get((req, res) => {
        res.send({
            status: "UP!"
        })
    });

    app.route('/task/insert').post((req, res) => {
        mongodbController.insertTask(req.body, cb => {
            console.log(cb);
                res.send(cb);
        });
    });

    app.route('/task/getById').get((req, res) => {
       
        const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);

        mongodbController.getTaskById(utilServ.getUrlParam(url, 'docId'), cb => {
            console.log(cb);
                res.send(cb);
        });
    });

    app.route('/task/getTasks').get((req, res) => {
        mongodbController.getTasks(req, cb => {
            console.log(cb);
                res.send(cb);
        });
    });

    app.route('/task/getTasks/Paginated').get((req, res) => {

        const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        req.body.page = utilServ.getUrlParam(url, 'page')
        req.body.limit = utilServ.getUrlParam(url, 'limit')

        mongodbController.getTasksPaginated(req.body, cb => {
            console.log(cb);
                res.send(cb);
        });
    });

    app.route('/task/update').post((req, res) => {

        const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        req.body.docId = utilServ.getUrlParam(url, 'docId')

        mongodbController.updateTask(req.body, cb => {
            console.log(cb);
                res.send(cb);
        });
    });

    app.route('/task/remove').get((req, res) => {
       
        const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);

        mongodbController.removeTaskById(utilServ.getUrlParam(url, 'docId'), cb => {
            console.log(cb);
                res.send(cb);
        });
    });

}