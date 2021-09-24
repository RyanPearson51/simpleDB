const express = require('express')
const app = express()
const port = process.env.PORT || 4048

const mysql = require('mysql');

app.use(express.static('./public'));

app.use(express.json());

//app.use(express.static('./public'));



app.get('/', (req, res) => res.send('default route'))

let usersRoutes = require('./routers/users');
app.use(usersRoutes);

app.listen(port, () => {
  console.log('app is listening on:', port)
})

