export const OWNER_DETAILS = {
  name: "Soni Raj",
  whatsapp: "7667249624",
  email: "cosmeticf4@gmail.com",
  phone: "+91 7667249624",
  logo: "/src/assets/images/soni_raj_luxury_logo_1779009426806.png",
  banner: "/src/assets/images/soni_raj_banner_1779006339316.png",
  upi_id: "sonidevi9524@nyes",
  instagram_url: "https://www.instagram.com/soni.raj.cosmetic.fashion?igsh=MTAzaGUxY3g4NXNtag==",
};

export const CATEGORIES = [
  {
    id: "cosmetics",
    title: "Cosmetic Boutique",
    description: "Discover our premium range of skincare and beauty essentials curated for the modern woman.",
    image: "/src/assets/images/luxury_cosmetics_collection_1779005792841.png",
  },
  {
    id: "fashion",
    title: "Fashion & Style",
    description: "Elegance defined through a selection of high-end fashion pieces and designer accessories.",
    image: "/src/assets/images/high_end_fashion_collection_1779005810699.png",
  },
];

export const PRODUCTS = [
  {
    id: "p1",
    title: "Saffron Radiance Cream",
    price: 1299,
    category: "cosmetics",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=60",
    description: "Anti-aging formula infused with Kashmiri saffron.",
    stock: 45,
    rating: 4.8,
    reviews: [
      { id: "r1", user: "Ananya S.", rating: 5, comment: "Amazing glow! I've been using it for a week and I can already see the difference.", date: "2024-05-10" },
      { id: "r2", user: "Priya K.", rating: 4, comment: "Very hydrating, but a bit pricey for the quantity.", date: "2024-05-12" }
    ]
  },
  {
    id: "p2",
    title: "Silk Embroidered Saree",
    price: 4999,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=60",
    description: "Handcrafted Banarasi silk with gold zari work.",
    stock: 12,
    rating: 4.9,
    reviews: [
      { id: "r3", user: "Meera R.", rating: 5, comment: "The quality is outstanding. The gold work is even more beautiful in person.", date: "2024-05-08" }
    ]
  },
  {
    id: "p3",
    title: "Rose Quartz Face Roller",
    price: 899,
    category: "cosmetics",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=60",
    description: "Natural cooling stone for facial lymphatic drainage.",
    stock: 150,
    rating: 4.5,
    reviews: [
      { id: "r4", user: "Sneha V.", rating: 4, comment: "So cooling! Great for my morning routine.", date: "2024-05-14" },
      { id: "r5", user: "Rahul T.", rating: 5, comment: "Bought it as a gift, my sister loves it.", date: "2024-05-15" }
    ]
  },
  {
    id: "p4",
    title: "Velvet Evening Gown",
    price: 8500,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=60",
    description: "Deep emerald velvet with crystal embellishments.",
    stock: 5,
    rating: 5.0,
    reviews: [
      { id: "r6", user: "Zoya H.", rating: 5, comment: "Stunning dress. Perfect fit for the gala event.", date: "2024-05-01" }
    ]
  }
];

export const RESELLER_TERMS = {
  commission_rate: 0.15,
  min_payout: 500,
  whatsapp_template: "Check out this beautiful product from Soni Raj! Link: {url} Price: {price}",
};

export const CATALOGS = [
  {
    id: "cat1",
    title: "Summer Radiance Set",
    products: ["p1", "p3"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=800&auto=format&fit=crop&q=60",
    description: "The ultimate skincare routine for glowing summer skin."
  },
  {
    id: "cat2",
    title: "Royal Wedding Collection",
    products: ["p2", "p4"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=60",
    description: "Exquisite fashion pieces for your most special occasions."
  }
];

export const SYSTEM_APPS = [
  {
    id: "store",
    title: "Soni Raj Store",
    description: "Direct Retail Experience",
    icon: "ShoppingBag",
  },
  {
    id: "catalog",
    title: "Soni Raj Catalog",
    description: "Lookbook v2.0",
    icon: "LayoutTemplate",
  },
  {
    id: "analytics",
    title: "Soni Raj Analytics",
    description: "Insights Dashboard",
    icon: "BarChart3",
  },
  {
    id: "portal",
    title: "Soni Raj Portal",
    description: "B2B Management",
    icon: "LayoutDashboard",
  },
];
