
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

 console.log(process.env.DB_USER);
 console.log(process.env.DB_PASS);
 console.log(process.env.DB_NAME);

// mongoDb connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.npcff.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const clientProducts = client.db("shopping_db").collection("shopping_product");
  // add products
   console.log('success');

  //  Add product
  app.post('/addProduct',(req,res)=>{
    const products = req.body;
    clientProducts.insertMany(products)
    .then(result=>{
       res.send(result.insertedCount)
    })
  })

  // Show product
  app.get('/products', (req, res) => {
    products.find({})
      .toArray((err, documents) => {
        res.send(documents);
        //  console.log(documents);
      })
  })

  
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8000)