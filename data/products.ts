export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  isNew?: boolean;
  onSale?: boolean;
}

const productNames = [
  'Silk Trench Coat',
  'Structured Blazer',
  'Velvet Evening Gown',
  'Cashmere Oversized Sweater',
  'Leather Midi Skirt',
  'Pleated Wide Trousers',
  'Wool Double-Breasted Coat',
  'Silk Slip Dress',
  'Linen Summer Suit',
  'Embroidered Kaftan',
  'Sequin Party Top',
  'Tailored Wool Vest',
  'Cropped Denim Jacket',
  'Satin Blouse',
  'High-Waist Jeans',
  'Knit Cardigan',
  'Printed Maxi Dress',
  'Leather Belt Bag',
  'Suede Ankle Boots',
  'Statement Earrings',
];

const categories = [
  'Outerwear',
  'Tailoring',
  'Evening',
  'Knitwear',
  'Bottoms',
  'Dresses',
  'Accessories',
  'Shoes',
  'Jewelry',
];

const descriptions = [
  'An exploration of texture and form. Our latest piece highlights the intricate details that define modern luxury.',
  'Crafted with precision and designed for the discerning aesthetic. This piece embodies timeless elegance.',
  'A testament to artisanal craftsmanship, this garment combines traditional techniques with contemporary design.',
  'Designed for those who appreciate the finer things in life. Every stitch tells a story of excellence.',
  'Transcending seasonal trends, this piece is an investment in enduring style and quality.',
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Trench Coat',
    price: 1200,
    category: 'Outerwear',
    description: descriptions[0],
    images: ['/images/InShot_20260422_093300108.jpg.jpeg'],
    isNew: true,
  },
  {
    id: '2',
    name: 'Structured Blazer',
    price: 890,
    category: 'Tailoring',
    description: descriptions[1],
    images: ['/images/IMG_20260422_093407.jpg.jpeg'],
    isNew: true,
  },
  {
    id: '3',
    name: 'Velvet Evening Gown',
    price: 2450,
    category: 'Evening',
    description: descriptions[2],
    images: ['/images/Picsart_26-04-22_07-23-21-200.jpg.jpeg'],
  },
  {
    id: '4',
    name: 'Cashmere Oversized Sweater',
    price: 680,
    category: 'Knitwear',
    description: descriptions[3],
    images: ['/images/InShot_20260422_065916073.jpg.jpeg'],
    isNew: true,
  },
  {
    id: '5',
    name: 'Leather Midi Skirt',
    price: 750,
    category: 'Bottoms',
    description: descriptions[4],
    images: ['/images/InShot_20260422_111205315.jpg.jpeg'],
  },
  {
    id: '6',
    name: 'Pleated Wide Trousers',
    price: 520,
    category: 'Bottoms',
    description: descriptions[0],
    images: ['/images/InShot_20260422_112532366.jpg.jpeg'],
  },
  {
    id: '7',
    name: 'Wool Double-Breasted Coat',
    price: 1850,
    category: 'Outerwear',
    description: descriptions[1],
    images: ['/images/1000045092.png'],
  },
  {
    id: '8',
    name: 'Silk Slip Dress',
    price: 920,
    category: 'Dresses',
    description: descriptions[2],
    images: ['/images/1000045093.jpg.jpeg'],
  },
  {
    id: '9',
    name: 'Linen Summer Suit',
    price: 1100,
    category: 'Tailoring',
    description: descriptions[3],
    images: ['/images/1000045094.jpg.jpeg'],
    isNew: true,
  },
  {
    id: '10',
    name: 'Embroidered Kaftan',
    price: 780,
    category: 'Dresses',
    description: descriptions[4],
    images: ['/images/1000045095.jpg.jpeg'],
  },
  {
    id: '11',
    name: 'Sequin Party Top',
    price: 340,
    category: 'Tops',
    description: descriptions[0],
    images: ['/images/1000045096.jpg.jpeg'],
    onSale: true,
  },
  {
    id: '12',
    name: 'Tailored Wool Vest',
    price: 450,
    category: 'Tailoring',
    description: descriptions[1],
    images: ['/images/1000045131.png'],
  },
  {
    id: '13',
    name: 'Cropped Denim Jacket',
    price: 380,
    category: 'Outerwear',
    description: descriptions[2],
    images: ['/images/1000045132.png'],
  },
  {
    id: '14',
    name: 'Satin Blouse',
    price: 290,
    category: 'Tops',
    description: descriptions[3],
    images: ['/images/1000045133.png'],
  },
  {
    id: '15',
    name: 'High-Waist Jeans',
    price: 320,
    category: 'Bottoms',
    description: descriptions[4],
    images: ['/images/1000045135.jpg.jpeg'],
  },
  {
    id: '16',
    name: 'Knit Cardigan',
    price: 420,
    category: 'Knitwear',
    description: descriptions[0],
    images: ['/images/1000045164.jpg.jpeg'],
  },
  {
    id: '17',
    name: 'Printed Maxi Dress',
    price: 680,
    category: 'Dresses',
    description: descriptions[1],
    images: ['/images/1000045166.png'],
  },
  {
    id: '18',
    name: 'Leather Belt Bag',
    price: 550,
    category: 'Accessories',
    description: descriptions[2],
    images: ['/images/1000045167.jpg.jpeg'],
  },
  {
    id: '19',
    name: 'Suede Ankle Boots',
    price: 620,
    category: 'Shoes',
    description: descriptions[3],
    images: ['/images/file_0000000007747208a5a0ea5010bbec11.png'],
  },
  {
    id: '20',
    name: 'Statement Earrings',
    price: 180,
    category: 'Jewelry',
    description: descriptions[4],
    images: ['/images/file_0000000064987208be53a41598e6c069.png'],
    isNew: true,
  },
  {
    id: '21',
    name: 'Gold Chain Necklace',
    price: 420,
    category: 'Jewelry',
    description: descriptions[0],
    images: ['/images/file_00000000088871fab9ebca715ca92db3.png'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getSaleItems = (): Product[] => {
  return products.filter((p) => p.onSale);
};

export const getAllCategories = (): string[] => {
  const cats = new Set(products.map((p) => p.category));
  return Array.from(cats);
};