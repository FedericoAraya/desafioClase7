const express = require("express")
const app = express()
const ProductManager = require('./productManager');
const productManager = new ProductManager()

app.get('/products', (req, res) => {
    let limit = parseInt(req.query.limit)
    let result = productManager.getProducts()
    if (!isNaN(limit)) {
      result = result.slice(0, limit)
    }
    res.json(result)
  });

  app.get('/products/:id', (req, res) => {
    let productId = parseInt(req.params.id);
    let product = productManager.getProductsById(productId); 
    if (!product) {
      return res.status(404).send('No se encontró el producto'); 
    }
    res.json(product); 
  });

app.listen(8080, () => console.log("server Up"))


//TEST

productManager.addProduct( 'PC' , 'Samsung i5' , 1500 , 'foto' , 101 , 5 )
productManager.addProduct( 'Celular' , 'Nokia' , 900 , 'foto' , 102 , 15 )
productManager.addProduct( 'Tablet' , 'Asus' , 600 , 'foto' , 103 , 8 )
productManager.addProduct( 'TV' , 'LG 40"' , 700 , 'foto' , 104 , 9 )
productManager.getProducts()
productManager.getProductsById(2)
productManager.updateProduct( 1 , "title" , "calculadora")
productManager.getProducts()
productManager.deleteProduct(2)
productManager.getProducts()