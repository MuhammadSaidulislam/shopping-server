
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongoDb
require('dotenv').config()
console.log(process.env.DB_PASS);

// mongoDb connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.npcff.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const products = client.db("shopping_product").collection("product");
  
  // add products
  app.post('/addProduct',(req,res)=>{
    const product = req.body;
    products.insertMany(product)
    .then(result=>{
      console.log(result);
    })
  })

  // Product show
  app.get('/products',(req,res)=>{
    products.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

   // Product Detail show
   app.get('/products/:key',(req,res)=>{
    products.find({key: req.params.key})
    .toArray((err,documents)=>{
      res.send(documents[0])
    })
  })
    // Product Detail show
    app.get('/products/:key',(req,res)=>{
      products.find({key: req.params.key})
      .toArray((err,documents)=>{
        res.send(documents[0])
      })
    })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8000)
