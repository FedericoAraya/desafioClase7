const FileSystem = require("fs")

class ProductManager {
    
    constructor(){
        this.products = []
        this.index = 0
    }
    getProducts = () => {
        console.log(this.products)
        return this.products
    }
    
    addProduct = (title , description , price , thumbnail , code , stock) => {
        this.index++
        const id = this.index
        const product = {title , description , price , thumbnail , code , stock , id}
        if ( !title || !description || !price || !thumbnail || !code || !stock || !id){
            return console.log("faltan datos")
        }
        if (this.products.find(prod => prod.code === product.code)){
            return console.log("El codigo ingresado ya pertenece a un producto cargado");
        }
        this.products.push(product)    
        }
    
    getProductsById = (findId) => {
        if (this.products.find(prod => prod.id === findId)) {
            console.log("El Producto Buscado es:")
            return this.products.find(prod => prod.id === findId)
        }else{
            console.log("Not found");
        }
        
    }
    updateProduct = (id,key,value)=>{
        const productIndex = this.products.findIndex( prod => prod.id === id)
        console.log("Funcion updateProduct");
        if (productIndex != -1){
            this.products[productIndex][key] = value
            const db = "./database.txt"
            FileSystem.writeFileSync (db , JSON.stringify(this.products , null , "\t"))
            return console.log(`Actualizado producto con id ${id}`)
        }else{
            return console.log("Producto no encontrado");
        }
    }
    deleteProduct = (id) =>{
        const productDelete = this.products.findIndex( prod => prod.id === id)
    
        if (productDelete != -1){
            this.products.splice(productDelete , 1)   
            const db = "./database.txt"
            FileSystem.writeFileSync (db , JSON.stringify(this.products , null , "\t")) 
        }else{
            console.log("No se encontro el producto que desea eliminar");
        }
    }

    }
    
module.exports = ProductManager;

/*
    const manager = new ProductManager()
    manager.addProduct( 'PC' , 'Samsung i5' , 1500 , 'foto' , 101 , 5 )
    manager.addProduct( 'Celular' , 'Nokia' , 900 , 'foto' , 102 , 15 )
    manager.addProduct( 'Tablet' , 'Asus' , 600 , 'foto' , 103 , 8 )
    manager.addProduct( 'TV' , 'LG 40"' , 700 , 'foto' , 104 , 9 )
    manager.getProducts()
    manager.getProductsById(2)
    manager.updateProduct( 1 , "title" , "calculadora")
    manager.getProducts()
    manager.deleteProduct(2)
    manager.getProducts()
*/