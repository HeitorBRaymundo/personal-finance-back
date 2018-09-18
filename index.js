
const express = require('express');

const app = express();


const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://wodeudaeboijfq:5379dff71e5631ed61dbafe95bda354d03c3f26b68980c24da2556b847d6bc42@ec2-54-163-245-44.compute-1.amazonaws.com:5432/dduk4c0ses7ods',
    ssl: true,
});
client.connect();


app.get('/', (req, res) => {
    res.status(200).send('ok');
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.listen(process.env.PORT || 3030, '0.0.0.0', () => {
    console.log(`App listening on port 3030`);
});
