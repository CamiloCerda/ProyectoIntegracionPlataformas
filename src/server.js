const config = require('../config');
const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const rutas = require('../src/routes/rutas');

const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie: {  maxAge: 6000000 }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

rutas(app);

app.use((req, res) => {
    res.status(404).send("NOT FOUND");
});

const port = config.PORT;
//const host = config.HOST;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})


/* 
app.listen(port, host, () => {
    console.log(`Listening on port ${port}`);
}) 
*/