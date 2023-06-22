const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serverConfig = require('./cofigs/server.config');


app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json({type: 'application/json'}));
require('./routes/mongo.db.routes')(app);

app.listen(serverConfig.port, () => {
    console.log('listening in port: ' + serverConfig.port);
})