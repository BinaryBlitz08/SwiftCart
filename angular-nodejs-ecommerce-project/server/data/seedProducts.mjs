import mongoose from "mongoose";
import Product from "../models/Product.mjs";


const products = [
 
  {
    name: 'PURPLE CHAIR',
    images: ['assets/images/product-chair.png'],
    price: 4500,
    stock: 57,
    category: "chair",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: 'LARGE SOFA',
  images: ['assets/images/sofa(8).jpeg'],
    price: 12000,
    stock: 25,
    category: "sofa",
    isNew: true,
    isRecommended: false,
    isTopDeal: true
  },
  {
    name: 'PERFECT KITCHEN',
    price: 125000,
    stock: 80,
    images: ['assets/images/kitchen.png'],
    category: "kitchen",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    stock: 19,
    name: 'MATRASS COMFORT +',
    price: 2400,
    images: ['assets/images/mattress(4).jpg'],
    category: "bed",
    isNew: true,
    isRecommended: false,
    isTopDeal: true
  },
  {
    stock: 100,
    name: 'QUEEN SIZE BED',
    price: 29000,
    images: ['assets/images/bedroom.png'],
    category: "bed",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    stock: 196,
    name: 'CHAIR',
    price: 800,
    images: ['assets/images/product-chair.png'],
    category: "chair",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  
  {
    stock: 25,
    name: "GUYER KITCHEN",
    images: ["./assets/images/kitchen.png"],
    price: 200000,
    category: "kitchen",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    stock: 49,
    name: "BEDROOM",
    images: ["./assets/images/bedroom.png"],
    price: 170000,
    category: "bed",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    stock: 28,
    name: "STREET CHAIR",
    images: ["./assets/images/outdoors.png"],
    price: 1299,
    category: "chair",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    stock: 78,
    name: "WHITE SOFA",
    images: ["./assets/images/sofa(6).jpeg"],
    price: 9000,
    category: "sofa",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "DINING TABLE COMBO",
    price: 15500,
    stock: 34,
    images: ["assets/images/table(4).jpeg"],
    category: "table",
    isNew: true,
    isRecommended: false,
    isTopDeal: true
  },
  {
    name: "KITCHEN ISLAND",
    price: 195000,
    stock: 6,
    images: ["assets/images/kitchen.png"],
    category: "kitchen",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "COMFY ARM CHAIR",
    price: 5200,
    stock: 44,
    images: ["assets/images/product-chair.png"],
    category: "chair",
    isNew: true,
    isRecommended: false,
    isTopDeal: true
  },
  {
    name: "BASIC BED SET",
    price: 21000,
    stock: 27,
    images: ["assets/images/bedroom.png"],
    category: "bed",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "SOFA SET ",
    price: 18000,
    stock: 17,
    images: ["assets/images/sofa(6).jpeg"],
    category: "sofa",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "KITCHEN STORAGE UNIT",
    price: 9900,
    stock: 42,
    images: ["assets/images/kitchen.png"],
    category: "kitchen",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "BED WITH STORAGE",
    price: 67000,
    stock: 9,
    images: ["assets/images/bedroom.png"],
    category: "bed",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "STUDY TABLE",
    price: 7600,
    stock: 38,
    images: ["assets/images/table(3).jpeg"],
    category: "table",
    isNew: true,
    isRecommended: false,
    isTopDeal: true
  },
  {
    name: "KITCHEN RACK",
    price: 5000,
    stock: 60,
    images: ["assets/images/kitchen.png"],
    category: "kitchen",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "FOLDABLE CHAIR",
    price: 1600,
    stock: 110,
    images: ["assets/images/product-chair.png"],
    category: "chair",
    isNew: true,
    isRecommended: false,
    isTopDeal: true
  },
  {
    name: "SOFA LOUNGE",
    price: 25000,
    stock: 12,
    images: ["./assets/images/sofa(6).jpg"],
    category: "sofa",
    isNew: true,
    isRecommended: false,
    isTopDeal: true
  },
  {
    name: "MODULAR BEDROOM SET",
    price: 120000,
    stock: 8,
    images: ["./assets/images/bedroom.png"],
    category: "bed",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "COZY CHAIR SET",
    price: 4700,
    stock: 33,
    images: ["assets/images/table(6).jpg"],
    category: "chair",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "KITCHEN WITH OVEN",
    price: 200000,
    stock: 4,
    images: ["assets/images/kitchen.png"],
    category: "kitchen",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "SOFA CUM BED",
    price: 28000,
    stock: 11,
    images: ["assets/images/sofa(6).jpeg"],
    category: "bed",
    isNew: false,
    isRecommended: false,
    isTopDeal: true
  },
  {
    name: "SIDE TABLE",
    price: 3200,
    stock: 59,
    images: ["assets/images/product-chair.png"],
    category: "table",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "KITCHEN CORNER UNIT",
    price: 175000,
    stock: 6,
    images: ["assets/images/kitchen.png"],
    category: "kitchen",
    isNew: true,
    isRecommended: false,
    isTopDeal: true
  },
  {
    name: "DOUBLE BED FRAME",
    price: 36000,
    stock: 22,
    images: ["assets/images/bedroom.png"],
    category: "bed",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "RELAXING SOFA",
    price: 14500,
    stock: 29,
    images: ["assets/images/sofa(7).jpg"],
    category: "sofa",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "SWING",
    price: 3900,
    stock: 54,
    images: ["assets/images/swing(2).jpg"],
    category: "chair",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "FAMILY BED SET",
    price: 75000,
    stock: 13,
    images: ["assets/images/bedroom.png"],
    category: "bed",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "WHITE KITCHEN SET",
    price: 160000,
    stock: 7,
    images: ["assets/images/kitchen.png"],
    category: "kitchen",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  },
  {
    name: "DINING TABLE SET",
    price: 18000,
    stock: 21,
    images: ["assets/images/table(4).jpeg"],
    category: "table",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "SOFA WITH OTTOMAN",
    price: 22000,
    stock: 19,
    images: ["./assets/images/sofa(3).jpg"],
    category: "sofa",
    isNew: false,
    isRecommended: true,
    isTopDeal: true
  },
  {
    name: "MODERN CHAIR",
    price: 4900,
    stock: 62,
    images: ["assets/images/product-chair.png"],
    category: "chair",
    isNew: true,
    isRecommended: true,
    isTopDeal: false
  }
];


const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb+srv://binaryblitz08:mauli@cluster0.byuduhy.mongodb.net/swiftcart?retryWrites=true&w=majority&appName=Cluster0");
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(" Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(" Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
