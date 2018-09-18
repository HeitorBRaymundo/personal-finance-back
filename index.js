
const express = require('express');

const app = express();


const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://jrglluyyzzravw:de1bf0e46da080b9608c82f68ee3f36b75db3662bb1744dd6fc668797cdd8a48@ec2-54-227-244-12.compute-1.amazonaws.com:5432/d9lk3t87li46jo',
    ssl: true,
});
client.connect();


app.get('/', (req, res) => {
    res.status(200).send('ok');
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/getAll', async (req, res) => {
    const { filter, value} = req.query;

    let query;
    let values = [];

    if(filter && value){

        if(filter === 'category'){
            query = `SELECT * FROM product WHERE category = $1;`;
        }
        if(filter === 'product'){
            query = `SELECT * FROM product WHERE product = $1;`;
        }
        if(filter === 'company'){
            query = `SELECT * FROM product WHERE company = $1;`;
        }
        if(filter === 'price'){
            query = `SELECT * FROM product WHERE price < $1;`;
        }
        values = [value.replace('-', ' ')];
    }else{
        query = `SELECT * FROM product;`;
    }

    const response = await client.query(query, values);

    res.status(200).send(JSON.stringify(response.rows));
});

app.listen(process.env.PORT || 3030, '0.0.0.0', () => {
    console.log(`App listening on port 3030`);
});
