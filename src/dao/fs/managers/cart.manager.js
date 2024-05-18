import fs from "fs";

export class CartManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  async createCart(cart) {
    try {
      const cartsFile = await fs.promises.readFile(this.#path, "utf-8");
      const cartsArray = JSON.parse(cartsFile);
      cart.id = cartsArray.length;
      cartsArray.push(cart);

      await fs.promises.writeFile(this.#path, JSON.stringify(cartsArray));
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cid) {
    try {
      const cartsFile = await fs.promises.readFile(this.#path, "utf-8");
      const cartsArray = JSON.parse(cartsFile);
      const cart = cartsArray.find((c) => (c.id == cid));
      if (!cart) {
        throw new Error("Cart not found!");
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(cid, pid, quantity) {
    try {
      const cartsFile = await fs.promises.readFile(this.#path, "utf-8");
      const cartsArray = JSON.parse(cartsFile);
      let cartFounded = false;

      cartsArray.forEach((c) => {
        if (c.id == cid) {
          cartFounded = true;

          let productFounded = false;

          c.products.forEach((p) => {
            if (p.id == pid) {
              p.quantity += quantity;
              productFounded = true;
            }
          });

          if (!productFounded) {
            c.products.push({ id: parseInt(pid), quantity: quantity });
          }
        }
      });

      if (!cartFounded) {
        throw new Error("Cart not found!");
      }
      await fs.promises.writeFile(this.#path, JSON.stringify(cartsArray));
    } catch (error) {
      throw error;
    }
  }
}
