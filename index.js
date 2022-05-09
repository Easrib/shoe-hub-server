const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bjph8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('shoeHub').collection('shoes');
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        });
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);
        })

    }
    finally {

    }
}

run().catch(console.dir);

async function add() {
    try {
        await client.connect();
        const myProductCollection = client.db('shoeHub').collection('myShoes');

        app.post('/myproduct', async (req, res) => {
            const newProduct = req.body;
            const result = await myProductCollection.insertOne(newProduct);
            res.send(result);
        })

    }
    finally {

    }
}

add().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello from Shoe Hub apps')
})

app.listen(port, () => {
    console.log('listening shoe hub from ', port);
})