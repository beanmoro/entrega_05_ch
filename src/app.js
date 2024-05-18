import express from "express";
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import path from "path";
import productsRoutes from "./router/products.route.js";
import cartsRoutes from "./router/carts.route.js";
import viewsRoutes from "./router/views.route.js";
import mongoose from "mongoose";

import { ProductManager } from "./dao/fs/managers/product.manager.js";
import { productModel } from "./dao/models/product.model.js";

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = import.meta.dirname;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

try {
  await mongoose.connect('mongodb+srv://CoderUser:123@codercluster.67vrm4s.mongodb.net/?retryWrites=true&w=majority')
  console.log('Connected to MongoDB');
} catch (error) {
  console.log('Cannot connect to database: ' + error);
        process.exit();
}

const pManager = new ProductManager(
  
  path.join(__dirname, "/dao/fs/data/products.json")
);

const realTimeProducts = await pManager.getProducts();


realTimeProducts.forEach(async e => {
  const newProduct = new productModel(e);

  try {
    const savedProduct = await newProduct.save()
    console.log('Product Added: ', savedProduct)
  } catch (error) {
    console.error(error)
  }
});


// const socketServer = new Server(httpServer);

// socketServer.on('connection', socket => {
//   console.log("Nuevo cliente conectado!")

//   const prdcts = realTimeProducts;


//   socket.on('add', data=>{
//       const {title, description, price, stock } = data
//       const pid = realTimeProducts.length;
//       prdcts.push({ title, description, price, stock, id: pid})
//       socket.emit('updated_data', prdcts)
//   });

//   socket.on('remove', data=>{
//       const { id } = data
//       console.log(id)
//       const index = prdcts.findIndex((e) => e.id === parseInt(id));
//       if (index !== -1) {
//         prdcts.splice(index, 1);
//       }
//       socket.emit('updated_data', prdcts);
//   })
  

// })






app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);



