import fs from "fs";

export class ProductManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

//   async init() {
//     await fs.promises.writeFile(this.#path, "[]");
//   }

  async addProduct(product) {
    try {
      const productsFile = await fs.promises.readFile(this.#path, "utf-8");
      const productsArray = JSON.parse(productsFile);
      product.id = productsArray.length;
      productsArray.push(product);

      await fs.promises.writeFile(this.#path, JSON.stringify(productsArray));
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      const productsFile = await fs.promises.readFile(this.#path, "utf-8");
      const productsArray = JSON.parse(productsFile);
      return productsArray;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const productsFile = await fs.promises.readFile(this.#path, "utf-8");
      const productsArray = JSON.parse(productsFile);
      const product = productsArray.find((e) => e.id === id);
      if (!product) {
        throw new Error("Product not found!");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      const productsFile = await fs.promises.readFile(this.#path, "utf-8");
      const productsArray = JSON.parse(productsFile);
      product.id = id; //Para evitar modificar el id, se le pasa al producto el mismo id que se esta buscando para actualizar!
      productsArray.forEach((e) => {
        if (e.id == id) {
          Object.assign(e, product);
        }
      });
      await fs.promises.writeFile(this.#path, JSON.stringify(productsArray));
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const productsFile = await fs.promises.readFile(this.#path, "utf-8");
      const productsArray = JSON.parse(productsFile);
      const index = productsArray.findIndex((e) => e.id === id);
      if (index !== -1) {
        productsArray.splice(index, 1);
      }
      await fs.promises.writeFile(this.#path, JSON.stringify(productsArray));
    } catch (error) {
      throw error;
    }
  }
}
