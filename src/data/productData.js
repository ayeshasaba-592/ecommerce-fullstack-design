import shirt from "../assets/shirt.png";
import jacket from "../assets/jacket.png";
import suit from "../assets/suit.png";
import wallet from "../assets/wallet.png";
import bag from "../assets/travel-bag.png";
import jeans from "../assets/jeans.png";
import headset from "../assets/headset.png";
import watch from "../assets/watch.png";
import pot from "../assets/pot.png";
import kettle from "../assets/kettle.png";

export const RECOMMENDED_PRODUCTS = [
  { 
    id: 101, 
    price: "10", 
    name: "T-shirts with multiple colors, for men", 
    img: shirt,
    rating: 4.5,
    reviews: 32,
    sold: 154,
    description: "High-quality cotton t-shirts available in various sizes and colors."
  },
  { 
    id: 102, 
    price: "10", 
    name: "Brown winter coat medium size", 
    img: jacket,
    rating: 4.8,
    reviews: 12,
    sold: 45,
    description: "Warm and stylish winter coat perfect for cold weather."
  },
  { id: 103, price: "12", name: "Men suit medium size", img: suit, rating: 4.2, reviews: 8, sold: 10 },
  { id: 104, price: "34", name: "Leather Wallet", img: wallet, rating: 4.9, reviews: 120, sold: 500 },
  { id: 105, price: "99", name: "Jeans bag for travel for men", img: bag, rating: 4.0, reviews: 5, sold: 20 },
  { id: 106, price: "9", name: "Blue short jeans", img: jeans, rating: 4.3, reviews: 22, sold: 88 },
  { id: 107, price: "8", name: "Headset for gaming with mic", img: headset, rating: 4.7, reviews: 200, sold: 1000 },
  { id: 108, price: "10", name: "Smartwatch silver color modern", img: watch, rating: 4.6, reviews: 45, sold: 130 },
  { id: 109, price: "10", name: "Pots for home", img: pot, rating: 3.9, reviews: 14, sold: 55 },
  { id: 110, price: "80", name: "Electric Kettle", img: kettle, rating: 4.5, reviews: 30, sold: 75 },
];