import User from "../models/User.mjs";
import mongoose from "mongoose";

/**            
 * this function is added product to cart for the current user
 *
 */
export async function addCart(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const userId = req.user._id;
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const productId = req.body.productId;

    if (!productId) {
      return res.status(400).json({ error: "product ID is required." });
    }

    const objectId = new mongoose.Types.ObjectId(productId);
    currentUser.carts.push(objectId);

    await currentUser.save();

    res.status(200).json({ message: "Product added to cart", cart: currentUser.carts });
  } catch (err) {
    console.error("Cart Add Error:", err.message);
    res.status(400).json({ message: err.message });
  }
}
/**
 * this function is get cart for the current user
 *
 */
export async function getCart(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized: User not found",
      });
    }
    let userId = req.user._id;
    let currentUser = await User.findOne({_id:userId }).populate("carts");
    let products = currentUser.carts;
    let productCountMap = countProductOccurrences(products);
    const productsArray = [];
    for (const [productId, count] of productCountMap.entries()) {
      if (count >= 1) {
        const product = products.find((p) => p._id.toString() === productId);
        if (product) {
          const clonedProduct = {
            _id: product._id,
            name: product.name,
            price: product.price,
            desc: product.desc,
            stock: product.stock,
            images: product.images[0],
            count: count,
          };
          productsArray.push(clonedProduct);
        }
      }
    }
    res.status(200).json({
      message: "Retrieved product occurrences in the cart for the current user",
      data: productsArray,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}

/**
 * this function is delete product from cart for the current user
 *
 */
export async function deleteCart(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized: User not found",
      });
    }
    let userId = req.user._id;
    let currentUser = await User.findById(userId);
    const productId = req.body.productId;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID is required.",
      });
    }
    const productIndex = currentUser.carts.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).json({
        error: "Product not found in cart.",
      });
    }

    if (req.body.type == "removeAll") {
      let productIndex = currentUser.carts.indexOf(productId);
      while (productIndex !== -1) {
        currentUser.carts.splice(productIndex, 1);
        productIndex = currentUser.carts.indexOf(productId);
      }
    } else {
      currentUser.carts.splice(productIndex, 1);
    }
    await currentUser.save();
    res.status(200).json({
      message: "Product removed from cart for the current user.",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}
/**
 * this function is get size of cart for the current user
 *
 */
export async function getCartSize(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized: User not found",
      });
    }
    let userId = req.user._id;
    let currentUser = await User.findById(userId);
    let products = countProductOccurrences(currentUser.carts);
    res.status(200).json({
      message: "Retrieved cart size for the current user",
      data: products.size,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}

export async function uploadImage(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized: User not found",
    });
  }
  const image = req.files.image;
  try {
    if (!image) {
      return res.status(400).send("No file uploaded");
    }
    const base64String = image[0].buffer.toString("base64");
    console.log(base64String);
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    user.image = base64String;
    await user.save();
    return res.status(200).json({ message: "image uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * this function is calculate Occurrences of Products in cart
 * @result:{ 'productId': 'Occurrence'}
 */
export function countProductOccurrences(cart) {
  const productCountMap = new Map();
  cart.forEach((product) => {
    const productId = product._id.toString();
    if (productCountMap.has(productId)) {
      productCountMap.set(productId, productCountMap.get(productId) + 1);
    } else {
      productCountMap.set(productId, 1);
    }
  });
  return productCountMap;
}
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = [];
    await user.save();

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (err) {
    console.error('Cart Clear Error:', err);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};