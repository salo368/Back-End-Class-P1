const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configurar body-parser



const routesUsers = require('./users/user.route');
//const routesOrders = require('./orders/order.route');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', routesUsers);
// app.use('/order', routesOrders);
// app.use('/book', routesOrders);

app.listen(3000, () => {
  console.log(`Servidor escuchando en el puerto`);
});