import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";
// import { ProductManager } from "../dao/fs/managers/product.manager.js";

// import path from "path";
// const __dirname = import.meta.dirname;

// const pManager = new ProductManager(
//   path.join(__dirname, "../data/products.json")
// );

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    // let products = await pManager.getProducts();
    let products = await productModel.find();
    if (limit) {
      products = products.slice(0, limit);
    }
    res.json({
      limit: limit,
      products: products,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    // const product = await pManager.getProductById(parseInt(pid));
    const product = await productModel.findById(pid)
    res.status(200).json({
      product: product,
    });
  } catch (error) {
    res.status(404).json({
      status_code: 404,
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status = true,
      stock,
      category,
      thumbnails = [],
    } = req.body;

    // await pManager.addProduct({
    //   title,
    //   description,
    //   code,
    //   price,
    //   status,
    //   stock,
    //   category,
    //   thumbnails,
    // });

    const product = await productModel.create({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    product.save();
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const {
      title,
      description,
      code,
      price,
      status = true,
      stock,
      category,
      thumbnails = [],
    } = req.body;

    // await pManager.updateProduct(pid, {
    //   title,
    //   description,
    //   code,
    //   price,
    //   status,
    //   stock,
    //   category,
    //   thumbnails,
    // });

    const product = await productModel.findByIdAndUpdate(pid, {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    product.save();
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    // await pManager.deleteProduct(pid);

    const product = await productModel.findByIdAndDelete(pid);

    product.save();
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

export default router;
