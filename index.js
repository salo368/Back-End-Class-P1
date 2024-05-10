const express = require('express');
const cors = require('cors');

const routesUsers = require('./users/user.route');
const routesOrders = require('./orders/order.route');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', routesUsers);
app.use('/order', routesOrders);

app.listen(3000, () => {
  console.log(`Servidor escuchando en el puerto`);
});