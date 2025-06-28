import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// For __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '$59.99',
    image: 'https://via.placeholder.com/100?text=Headphones'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '$129.99',
    image: 'https://via.placeholder.com/100?text=Smart+Watch'
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: '$39.99',
    image: 'https://via.placeholder.com/100?text=Speaker'
  }
];

let cart = [];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/cart', (req, res) => {
  const { id } = req.body;
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    res.json({ message: `${product.name} added to cart.` });
  } else {
    res.status(404).json({ error: 'Product not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
