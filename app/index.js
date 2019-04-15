const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'stockx_test',
    password: 'postgres',
    port: 5432,
});

let query = (text, values)=>{
    return pool.query(text, values);
};

app.get('/', function (req, res) {
    res.send('Hello! Welcome to the StockX test app');
});

app.post('/api/v1/shoe_reading', (req, resu) => {
    console.log("Got to post endpoint");
    if(!req.body.shoe_name) {
        return resu.status(400).send({
            success: 'false',
            message: 'shoe_name is required'
        });
    } else if(!req.body.shoe_size) {
        return resu.status(400).send({
            success: 'false',
            message: 'shoe_size is required'
        });
    } else if(req.body.shoe_size<1 || req.body.shoe_size>5) {
        return resu.status(400).send({
            success: 'false',
            message: 'shoe_size should be between 1 and 5'
        });
    }

    let text = 'SELECT * from true_size where shoe_name = $1';
    let values = [req.body.shoe_name];

    query(text, values).then((res)=>{
            return res;
        }
    ).catch((rej)=>{
        console.log("Query to look if this shoe exists failed with error: ", rej);
        return resu.status(400).send({
            success: 'false',
            message: 'Error Checking for existing shoes. Check logs.'
        })
    }).then((res)=>{

        let shoe_count = 1;
        let avg = req.body.shoe_size;

        if(res.rows.length>0){
            shoe_count += res.rows[0].shoe_count;
            const prev_avg = parseFloat(res.rows[0].average);
            avg = prev_avg+((req.body.shoe_size-prev_avg)/shoe_count);

            text = 'UPDATE true_size SET average=$1, shoe_count=$2 WHERE shoe_name = $3 RETURNING *';
            values = [avg, shoe_count, req.body.shoe_name];

        } else {
            text = 'INSERT INTO true_size(shoe_name, average, shoe_count) VALUES($1, $2, $3) RETURNING *';
            values = [req.body.shoe_name, req.body.shoe_size, shoe_count];
        }

        return query(text, values);

    }).then((res)=>{
        return resu.status(201).send({
            success: 'true',
            message: 'shoe added successfully',
            entry: res.rows[0]
        })
    }).catch((rej)=>{
        console.log("ERROR adding/updating Shoe:", rej);
        return resu.status(400).send({
            success: 'false',
            message: 'Shoe wasn\'t added successfully. Check logs.'
        })
    });
});

app.listen(3000, function () {
    console.log('StockX test app listening on port 3000!');
});

