import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";
import { productModel } from "../dao/models/product.model.js";
// import { ProductManager } from "../dao/fs/managers/product.manager.js";
// import { CartManager } from "../dao/fs/managers/cart.manager.js";

// import path from "path";
// const __dirname = import.meta.dirname;

// const cManager = new CartManager(path.join(__dirname, "../data/carts.json"));

// const pManager = new ProductManager(
//   path.join(__dirname, "../data/products.json")
// );

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { products } = req.body;

    // await cManager.createCart({ products });

    const cart = await cartModel.create({products});

    cart.save();
    res.json({
      ok: true,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    // const cart = await cManager.getCartById(cid);

    const cart = await cartModel.findById(cid).populate('pid');

    // const productPromises = cart.products.map(async (p)=>{
    //   const pData =  await pManager.getProductById(p.id);
    //   return {
    //     id: p.id,
    //     name: pData.title,
    //     price: pData.price,
    //     quantity: p.quantity,
    //   }
    // });
    // const products = await Promise.all(productPromises);

    res.json({
      ok: true,
      cid: cid,
      cart,
    });
  } catch (error) {
    throw error;
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const { quantity } = req.body;

    const cart = await cartModel.findById(cid);
    const product = await productModel.findById(pid);

    if(cart && product){
      const existingProductIndex = cart.products.findIndex(item => item.pid.toString() == pid);
      if(existingProductIndex >= 0){
        cart.products[existingProductIndex].quantity += quantity;
      } else{
        cart.products.push({pid: pid, quantity: quantity});
      }
    }



    // await cManager.addProduct(cid, pid, quantity);

    await cart.save();
    res.json({ ok: true });
  } catch (error) {
    res.json({
      error,
    });
  }
});

export default router;