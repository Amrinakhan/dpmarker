export const vendors = [
  {
    id: 'vendor-1',
    slug: 'tech-gadgets',
    name: 'Tech Gadgets Store',
    logo: '/images/vendors/vendor-1.jpg',
    coverImage: '/assets/images/vendors/vendor-1.jpg',
    bio: 'Your one-stop shop for all tech gadgets and accessories. We offer the latest smartphones, laptops, and tech accessories with competitive prices and excellent customer service.',
    rating: 4.8,
    totalSales: 1250,
    joinedDate: '2023-01-15',
    products: [
      {
        id: 'prod-1',
        name: 'Wireless Earbuds Pro',
        price: 99.99,
        image: '/images/products/earbuds.jpg',
        description: 'High-quality wireless earbuds with noise cancellation',
        category: 'Audio',
        stock: 50
      },
      {
        id: 'prod-2',
        name: 'Smart Watch Series 5',
        price: 299.99,
        image: '/images/products/smartwatch.jpg',
        description: 'Advanced smartwatch with health monitoring features',
        category: 'Wearables',
        stock: 30
      }
    ]
  },
  {
    id: 'vendor-2',
    slug: 'fashion-boutique',
    name: 'Fashion Boutique',
    logo: '/assets/images/vendors/5c12b7f3a9054809970046d2.webp',
    coverImage: '/assets/images/vendors/cover.jpg',
    bio: 'Trendy fashion boutique offering the latest styles in clothing and accessories. From casual wear to formal attire, we have everything to make you look your best.',
    rating: 4.6,
    totalSales: 850,
    joinedDate: '2023-03-20',
    products: [
      {
        id: 'prod-3',
        name: 'Designer Handbag',
        price: 199.99,
        image: '/assets/images/vendors/vendor-2.jpg',
        description: 'Elegant designer handbag with premium materials',
        category: 'Accessories',
        stock: 25
      },
      {
        id: 'prod-4',
        name: 'Summer Dress Collection',
        price: 79.99,
        image: '/assets/images/vendors/vendor-1.jpg',
        description: 'Beautiful summer dresses in various colors',
        category: 'Clothing',
        stock: 40
      }
    ]
  }
];

export function getVendorBySlug(slug) {
  return vendors.find(vendor => vendor.slug === slug);
}

export function getAllVendorSlugs() {
  return vendors.map(vendor => vendor.slug);
}

export function getAllVendors() {
  return vendors;
} 