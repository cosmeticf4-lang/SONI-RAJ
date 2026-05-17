import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Mail, 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Phone, 
  LayoutTemplate,
  BarChart3,
  LayoutDashboard,
  Box,
  Share2,
  TrendingUp,
  Award,
  Users,
  MapPin,
  Smartphone,
  CheckCircle2,
  Star,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Package,
  Clock,
  Truck,
  Search,
  Send,
  Headset,
  ShieldCheck,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { OWNER_DETAILS, CATEGORIES, PRODUCTS, SYSTEM_APPS, RESELLER_TERMS, CATALOGS } from './constants';
import SupportChat from './components/SupportChat';

const ProductAdmin = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');

  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = filterCategory === 'all' || product.category === filterCategory;
    let stockMatch = true;
    if (filterStock === 'out') stockMatch = product.stock === 0;
    else if (filterStock === 'low') stockMatch = product.stock > 0 && product.stock <= 5;
    
    return categoryMatch && stockMatch;
  });

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
    >
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-5xl bg-luxury-bg border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-luxury-surface">
          <div>
            <h2 className="text-3xl font-serif text-white italic mb-1">Product Inventory</h2>
            <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Administrative Control Panel</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Product List */}
          <div className="w-full md:w-1/2 border-r border-white/5 overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">Active Products</h3>
              <button className="text-[10px] bg-luxury-gold text-black px-4 py-1.5 rounded-full font-bold uppercase tracking-tight hover:bg-white transition-all">
                + New Product
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="space-y-2">
                <label className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-bold flex items-center gap-2">
                  <Filter className="w-2.5 h-2.5" /> Category
                </label>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white outline-none focus:border-luxury-gold transition-colors appearance-none"
                >
                  <option value="all">All Categories</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="fashion">Fashion</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-bold flex items-center gap-2">
                  <AlertTriangle className="w-2.5 h-2.5" /> Stock Level
                </label>
                <select 
                  value={filterStock}
                  onChange={(e) => setFilterStock(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white outline-none focus:border-luxury-gold transition-colors appearance-none"
                >
                  <option value="all">All Stock</option>
                  <option value="out">Out of Stock</option>
                  <option value="low">Low Stock (≤5)</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? filteredProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedProduct?.id === product.id 
                    ? 'bg-luxury-gold/10 border-luxury-gold' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img src={product.image} className="w-16 h-16 object-cover rounded-lg grayscale" alt="" />
                  <div className="flex-1">
                    <h4 className="text-white font-serif italic">{product.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-luxury-gold font-bold">₹{product.price}</span>
                      <span className={`text-[9px] uppercase tracking-widest font-bold ${
                        product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-orange-500' : 'text-white/40'
                      }`}>
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className={`w-4 h-4 ${selectedProduct?.id === product.id ? 'text-luxury-gold' : 'text-white/20'}`} />
                </div>
              </div>
            )) : (
              <div className="py-12 text-center opacity-40">
                <p className="text-sm font-serif italic text-white">No products match your filters</p>
              </div>
            )}
          </div>

          {/* Edit Panel */}
          <div className="flex-1 bg-luxury-surface/50 p-8 overflow-y-auto">
            {selectedProduct ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif text-white italic">Edit Details</h3>
                  <span className="text-[9px] bg-white/10 text-white/60 px-3 py-1 rounded-full uppercase tracking-widest">ID: {selectedProduct.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Title</label>
                    <input 
                      type="text" 
                      defaultValue={selectedProduct.title}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Price (₹)</label>
                    <input 
                      type="number" 
                      defaultValue={selectedProduct.price}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Stock Quantity</label>
                    <input 
                      type="number" 
                      defaultValue={selectedProduct.stock}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Category</label>
                    <select 
                      defaultValue={selectedProduct.category}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-luxury-gold transition-colors appearance-none"
                    >
                      <option value="cosmetics">Cosmetics</option>
                      <option value="fashion">Fashion</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Description</label>
                  <textarea 
                    rows={4}
                    defaultValue={selectedProduct.description}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-luxury-gold transition-colors resize-none"
                  />
                </div>

                <div className="pt-8 border-t border-white/5 flex gap-4">
                  <button className="flex-1 bg-luxury-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all">
                    Save Changes
                  </button>
                  <button className="px-8 border border-red-500/30 text-red-500 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                    Archived
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <Box className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-serif italic text-white">Select a product to manage</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] mt-2">Inventory Management Protocol</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PressLogos = () => (
  <section className="py-12 border-b border-white/5 bg-black/20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
        <span className="text-xl md:text-2xl font-serif italic text-white">VOGUE</span>
        <span className="text-xl md:text-2xl font-serif italic text-white">ELLE</span>
        <span className="text-xl md:text-2xl font-serif italic text-white">BAZAAR</span>
        <span className="text-xl md:text-2xl font-serif italic text-white">COSMOPOLITAN</span>
        <span className="text-xl md:text-2xl font-serif italic text-white">GRAZIA</span>
      </div>
    </div>
  </section>
);

const Craftsmanship = () => (
  <section id="craftsmanship" className="py-32 px-6 bg-luxury-bg relative overflow-hidden">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
      <div className="relative group">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1541944743827-e04bb645f946?w=800&auto=format&fit=crop&q=60" 
            alt="Handcrafting" 
            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 aspect-square bg-luxury-surface border border-luxury-gold/20 rounded-3xl p-8 backdrop-blur-xl hidden lg:block">
          <div className="flex flex-col h-full justify-center text-center">
            <span className="text-4xl font-serif italic text-luxury-gold mb-2">100+</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Hours of labor per piece</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-8 font-black">Our Philosophy</h3>
        <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8 leading-tight">The Art of Pure Perfection</h2>
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif italic text-xl mb-2">Ethical Sourcing</h4>
              <p className="text-white/40 text-sm leading-relaxed">We source only the finest raw materials directly from artisanal communities, ensuring sustainability and heritage.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif italic text-xl mb-2">Modern Innovation</h4>
              <p className="text-white/40 text-sm leading-relaxed">Blending traditional techniques with cutting-edge cosmetic science to deliver unparalleled efficiency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-8 font-black">Contact</h3>
          <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-12">Let's Connect</h2>
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold border border-luxury-gold/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Direct Line</p>
                <a href={`tel:${OWNER_DETAILS.phone}`} className="text-2xl text-white hover:text-luxury-gold transition-colors">{OWNER_DETAILS.phone}</a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold border border-luxury-gold/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Email Concierge</p>
                <a href={`mailto:${OWNER_DETAILS.email}`} className="text-2xl text-white hover:text-luxury-gold transition-colors">{OWNER_DETAILS.email}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-luxury-surface border border-white/10 rounded-3xl p-10 md:p-16">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Your Noble Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-luxury-gold transition-colors" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-luxury-gold transition-colors" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Desired Inquiry</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-luxury-gold transition-colors resize-none" placeholder="Tell us how we may assist you..."></textarea>
            </div>
            <button className="w-full bg-luxury-gold text-black py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all transform active:scale-95">Send Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Navbar = ({ onOpenAdmin }: { onOpenAdmin: () => void }) => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: isScrolled ? 1.02 : 1 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-luxury-bg/95 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMenuOpen(true)} className="hover:text-luxury-gold transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-medium">
            <a href="#collections" className="hover:text-luxury-gold transition-colors">Collections</a>
            <a href="#resell" className="hover:text-luxury-gold transition-colors text-luxury-gold">Resell & Earn</a>
            <a href="#track" className="hover:text-luxury-gold transition-colors">Track Order</a>
            <a href="#ecosystem" className="hover:text-luxury-gold transition-colors">Ecosystem</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none flex flex-col items-center">
          <img 
            src={OWNER_DETAILS.logo} 
            alt="Soni Raj Logo" 
            className="h-10 md:h-12 w-auto mb-1 group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-xl md:text-2xl font-display tracking-[0.1em] font-bold uppercase text-white hidden md:block">
            SONI RAJ
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-medium">
            <a href="#about" className="hover:text-luxury-gold transition-colors">Profile</a>
            <a href="#contact" className="hover:text-luxury-gold transition-colors">Contact</a>
            <button 
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-4 py-2 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
          <div className="w-10 h-10 border border-luxury-gold/50 rounded-full flex items-center justify-center text-[10px] text-luxury-gold font-bold">
            SR
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-luxury-bg z-[60] flex flex-col p-12 border-r border-white/5"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 left-8 hover:text-luxury-gold transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="mt-24 space-y-8">
              {['Home', 'Collections', 'Resell', 'Track', 'Ecosystem', 'Profile', 'Contact', 'Admin'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Admin' ? '#' : `#${item.toLowerCase()}`} 
                  onClick={() => {
                    if (item === 'Admin') onOpenAdmin();
                    setIsMenuOpen(false);
                  }}
                  className={`block text-4xl md:text-6xl font-serif hover:text-luxury-gold transition-colors italic ${item === 'Admin' ? 'text-luxury-gold' : 'text-white'}`}
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto pt-12 border-t border-white/10 space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2 font-bold">Connect via WhatsApp</p>
                <a href={`https://wa.me/${OWNER_DETAILS.whatsapp}`} className="text-2xl font-serif text-white hover:text-luxury-gold transition-colors">{OWNER_DETAILS.phone}</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2 font-bold">Follow Our Style</p>
                <a href={OWNER_DETAILS.instagram_url} target="_blank" rel="noopener noreferrer" className="text-2xl font-serif text-white hover:text-luxury-gold transition-colors">Instagram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
    <motion.div 
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute inset-0"
    >
      <img 
        src={OWNER_DETAILS.banner} 
        alt="Soni Raj Boutique Hero" 
        className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-bg/50 to-luxury-bg" />
    </motion.div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="lg:w-7/12 text-center lg:text-left"
      >
        <h1 className="text-5xl md:text-8xl font-serif leading-none mb-8 text-white">
          SONI RAJ <br/> 
          <span className="italic text-luxury-gold">Cosmetic & Fashion</span>
        </h1>
        <p className="max-w-md text-white/50 text-sm md:text-base leading-relaxed mb-10 mx-auto lg:mx-0 font-light italic">
          Experience a curated selection of luxury cosmetics and high-fashion pieces designed for the modern individual. Under the vision of Soni Raj, we redefine elegance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="px-10 py-5 bg-luxury-gold text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white glow-hover">
            Explore Catalog
          </button>
          <button className="px-10 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black">
            Join Community
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="hidden lg:block w-4/12 border border-white/5 bg-luxury-surface/50 backdrop-blur-xl p-10 rounded-sm"
      >
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 font-bold">Featured Concept</h2>
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Authenticity Suite</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Verification Protocol</p>
            </div>
          </div>
          <div className="h-[1px] bg-white/5" />
          <p className="text-xs text-white/50 leading-relaxed font-light italic">
            "We aren't just selling products; we're providing a lifestyle of conscious luxury."
          </p>
          <div className="flex items-center gap-2 text-[10px] text-luxury-gold uppercase tracking-widest font-bold">
            Learn More <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const AppEcosystem = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'LayoutTemplate': return <LayoutTemplate className="w-6 h-6" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-6 h-6" />;
      default: return <Box className="w-6 h-6" />;
    }
  };

  return (
    <section id="ecosystem" className="py-32 px-6 bg-luxury-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-6 font-black opacity-60 underline decoration-luxury-gold/30 underline-offset-8">Soni Raj Hub</h3>
            <h2 className="text-5xl md:text-7xl font-serif italic text-white">The System Ecosystem</h2>
          </div>
          <p className="max-w-xs text-sm text-white/40 font-light leading-relaxed">
            A unified platform managing all facets of the Soni Raj brand from retail to B2B logistics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEM_APPS.map((app, idx) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-luxury-gold/50 transition-all cursor-pointer group"
            >
              <div className="text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {getIcon(app.icon)}
              </div>
              <h3 className="text-lg font-medium text-white mb-1">{app.title}</h3>
              <p className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-bold">{app.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderModal = ({ product, isOpen, onClose }: { product: any, isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMode: 'Online Payment'
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const orderId = `SR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const resellPrice = Math.round(product.price * (1 + RESELLER_TERMS.commission_rate));
    
    // Save to localStorage for tracking simulation
    const newOrder = {
      id: orderId,
      productTitle: product.title,
      productImage: product.image,
      customerName: formData.name,
      status: 'Order Placed',
      date: new Date().toLocaleDateString(),
      price: resellPrice
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('soni_raj_orders') || '[]');
    localStorage.setItem('soni_raj_orders', JSON.stringify([...existingOrders, newOrder]));

    const message = `📦 *NEW CUSTOMER ORDER* 📦\n\n*Order ID:* ${orderId}\n*Product:* ${product.title}\n*Resell Price:* ₹${resellPrice}\n\n👤 *Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nPincode: ${formData.pincode}\n\n💳 *Payment Method:* ${formData.paymentMode}\n\n*Reseller ID:* ${OWNER_DETAILS.whatsapp}`;
    const whatsappUrl = `https://wa.me/${OWNER_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    alert(`Order Placed Successfully! Your Order ID is: ${orderId}. You can track it in the Track Order section.`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-serif italic mb-1">Customer Details</h3>
                  <p className="text-xs text-gray-400 font-medium">Entering accurate address ensures 100% delivery.</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl flex gap-4 items-center mb-6">
                  <img src={product.image} className="w-16 h-16 object-cover rounded-lg" alt="" />
                  <div>
                    <p className="font-bold text-sm tracking-tight">{product.title}</p>
                    <p className="text-pink-600 font-bold text-xs">Customer Pays: ₹{Math.round(product.price * (1 + RESELLER_TERMS.commission_rate))}</p>
                  </div>
                </div>

                <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-600" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-pink-600">Secure Online Payment</span>
                  </div>
                  <span className="text-[9px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded font-bold">PREPAID ONLY</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Customer Name</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:border-pink-500 outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        required
                        type="tel" 
                        placeholder="Mobile number"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:border-pink-500 outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-4 w-4 h-4 text-gray-300" />
                    <textarea 
                      required
                      placeholder="House No, Street, City, State"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:border-pink-500 outline-none transition-all h-24"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Pincode</label>
                  <input 
                    required
                    type="text" 
                    placeholder="6-digit pincode"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:border-pink-500 outline-none transition-all"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-pink-600 transition-all shadow-xl shadow-black/10 flex flex-col items-center justify-center gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Pay & Place Order
                    </div>
                    <span className="text-[9px] opacity-60 font-medium">Redirecting to WhatsApp for Payment Confirmation</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ShareModal = ({ item, isOpen, onClose, isCatalog = false }: { item: any, isOpen: boolean, onClose: () => void, isCatalog?: boolean }) => {
  const [copied, setCopied] = useState(false);
  if (!item) return null;

  const resellPrice = isCatalog ? 0 : Math.round(item.price * (1 + RESELLER_TERMS.commission_rate));
  const shareUrl = `${window.location.origin}${isCatalog ? '/catalog/' : '/item/'}${item.id}`;
  const message = isCatalog 
    ? `🛍️ *Soni Raj New Catalog: ${item.title}* 🛍️\n\n${item.description}\n\n✨ *View Collection:* ${shareUrl}`
    : `🔥 *Soni Raj Special* 🔥\n\n*${item.title}*\n${item.description}\n\n✨ *Price:* ₹${resellPrice}\n🛒 *Order via WhatsApp:* https://wa.me/${OWNER_DETAILS.whatsapp}?text=I%20want%20to%20buy%20${item.title}`;

  const platforms = [
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle className="w-5 h-5" />, 
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(message)}`
    },
    { 
      name: 'Facebook', 
      icon: <Facebook className="w-5 h-5" />, 
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(message)}`
    },
    { 
      name: 'X (Twitter)', 
      icon: <Twitter className="w-5 h-5" />, 
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="w-5 h-5" />, 
      color: 'bg-[#0077B5]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif italic">Share to Network</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {platforms.map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 rounded-3xl hover:bg-gray-50 transition-all border border-gray-50 group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${platform.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {platform.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{platform.name}</span>
                </a>
              ))}
            </div>

            <button 
              onClick={handleCopy}
              className="w-full py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard' : 'Copy Share Message'}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProductDetailModal = ({ product, isOpen, onClose, onBuy, onShare }: { product: any, isOpen: boolean, onClose: () => void, onBuy: (p: any) => void, onShare: (p: any) => void }) => {
  const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });

  if (!product) return null;

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API. 
    // Here we'll just show an alert and reset.
    alert("Thank you for your review! It will be visible after moderation.");
    setNewReview({ user: '', rating: 5, comment: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full transition-colors text-white md:text-black md:bg-gray-100">
              <X className="w-6 h-6" />
            </button>

            {/* Left side: Image */}
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                src={product.image} 
                className="w-full h-full object-cover" 
                alt={product.title}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right side: Content */}
            <div className="md:w-1/2 overflow-y-auto p-8 md:p-12">
              <div className="mb-8">
                <div className="flex items-center gap-1 text-luxury-gold mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-[10px] text-gray-400 font-bold ml-2">{product.rating} / 5.0</span>
                </div>
                <h2 className="text-4xl font-serif italic mb-2">{product.title}</h2>
                <p className="text-gray-400 italic text-sm mb-6">{product.description}</p>
                <div className="flex items-end gap-3 mb-8">
                  <span className="text-3xl font-bold">₹{product.price}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1.5 opacity-60">Verified Product</span>
                </div>
                <div className="flex gap-4 mb-12">
                  <button 
                    onClick={() => onBuy(product)}
                    className="flex-grow py-4 bg-black text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-pink-600 transition-all shadow-xl shadow-pink-600/10"
                  >
                    Confirm Purchase
                  </button>
                  <button 
                    onClick={() => onShare(product)}
                    className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="border-t border-gray-100 pt-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-serif italic flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-pink-600" />
                    Customer Reviews
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{product.reviews?.length || 0} Comments</span>
                </div>

                <div className="space-y-6 mb-12">
                  {product.reviews?.map((review: any) => (
                    <div key={review.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1">{review.user}</p>
                          <div className="flex gap-0.5 text-luxury-gold">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono">{review.date}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>

                {/* Leave a Review Form */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Leave a Review</h4>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <input 
                      required
                      type="text" 
                      placeholder="Your Name"
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none focus:border-pink-500 transition-all"
                      value={newReview.user}
                      onChange={(e) => setNewReview({...newReview, user: e.target.value})}
                    />
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Rating</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star 
                            key={star} 
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className={`w-5 h-5 cursor-pointer transition-colors ${star <= newReview.rating ? 'text-luxury-gold fill-current' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <textarea 
                      required
                      placeholder="Your thoughts on this product..."
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none focus:border-pink-500 transition-all h-24"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    />
                    <button 
                      type="submit"
                      className="w-full py-4 border border-black text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                    >
                      Post Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ResellerCatalog = () => {
  const [view, setView] = useState<'products' | 'catalogs'>('products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [earnings] = useState(14500);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<any>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<any>(null);
  const [sharingItem, setSharingItem] = useState<{item: any, isCatalog: boolean} | null>(null);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShare = (item: any, isCatalog = false) => {
    setSharingItem({ item, isCatalog });
  };

  const handleWithdraw = () => {
    const message = `💸 *EARNINGS WITHDRAWAL REQUEST* 💸\n\n*Amount:* ₹${earnings}\n*Method:* UPI\n*UPI ID:* ${OWNER_DETAILS.upi_id}\n\n*Reseller:* ${OWNER_DETAILS.name} (${OWNER_DETAILS.whatsapp})`;
    const whatsappUrl = `https://wa.me/${OWNER_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="resell" className="py-24 px-6 bg-[#f8f9fa] text-black">
      <div className="max-w-7xl mx-auto">
        {/* Reseller Dashboard Header */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-pink-600 rounded-2xl p-8 text-white flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-70 mb-2">Total Earnings</p>
              <h3 className="text-4xl font-bold font-mono">₹{earnings.toLocaleString()}</h3>
            </div>
            <div className="space-y-4">
              <div className="text-[9px] uppercase tracking-widest font-bold opacity-60">
                Linked UPI: {OWNER_DETAILS.upi_id}
              </div>
              <div 
                onClick={handleWithdraw}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white text-pink-600 w-fit px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-all shadow-lg active:scale-95"
              >
                Withdraw Funds <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm col-span-2 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-serif italic mb-1">Reseller Growth</h3>
                <p className="text-xs text-gray-400">You are in the top 5% of Soni Raj partners.</p>
              </div>
              <TrendingUp className="text-pink-600 w-8 h-8" />
            </div>
            <div className="mt-8 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { label: 'Orders', val: '124' },
                { label: 'Shares', val: '2.1k' },
                { label: 'Network', val: '48' }
              ].map((stat, i) => (
                <div key={i} className="flex-shrink-0 px-6 py-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">{stat.label}</span>
                  <span className="text-lg font-bold">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Control Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="flex flex-col gap-4">
             <div className="flex gap-4 border-b border-gray-100 pb-2">
                <button 
                  onClick={() => setView('products')}
                  className={`text-sm font-bold uppercase tracking-widest pb-2 transition-all relative ${view === 'products' ? 'text-pink-600' : 'text-gray-400'}`}
                >
                  Products
                  {view === 'products' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600" />}
                </button>
                <button 
                  onClick={() => setView('catalogs')}
                  className={`text-sm font-bold uppercase tracking-widest pb-2 transition-all relative ${view === 'catalogs' ? 'text-pink-600' : 'text-gray-400'}`}
                >
                  Catalogs List
                  {view === 'catalogs' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600" />}
                </button>
             </div>
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products or catalogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-lg text-xs w-full md:w-80 outline-none focus:border-pink-600 transition-colors"
                />
             </div>
          </div>
          
          <div className="flex gap-2 bg-gray-100 p-1 rounded-full border border-gray-200">
            {['all', 'cosmetics', 'fashion'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-white text-black shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Display */}
        <AnimatePresence mode="wait">
          {view === 'products' ? (
            <motion.div 
              key="products"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300">
                  <div 
                    onClick={() => setSelectedProductForDetail(product)}
                    className="aspect-[3/4] relative overflow-hidden cursor-pointer"
                  >
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute top-3 right-3 bg-pink-600 text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-lg">
                      ₹{Math.round(product.price * RESELLER_TERMS.commission_rate)} PROFIT
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-luxury-gold shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span className="text-[9px] font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 
                      onClick={() => setSelectedProductForDetail(product)}
                      className="font-bold text-sm mb-1 cursor-pointer hover:text-pink-600 transition-colors"
                    >
                      {product.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 mb-6 line-clamp-2 italic font-medium">{product.description}</p>
                    <div className="mt-auto">
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-bold">Invest Price</span>
                          <span className="text-lg font-bold">₹{product.price}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-pink-600 uppercase tracking-widest block font-bold">Resell Price</span>
                          <span className="text-sm font-bold text-gray-400 font-mono">₹{Math.round(product.price * (1 + RESELLER_TERMS.commission_rate))}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleShare(product)}
                          className="flex-grow py-4 bg-gray-100 text-black rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                        >
                          <Share2 className="w-3.5 h-3.5" /> Share
                        </button>
                        <button 
                          onClick={() => setSelectedProductForOrder(product)}
                          className="flex-grow py-4 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-pink-600 transition-all font-sans"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="catalogs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {CATALOGS.map((catalog) => (
                <div key={catalog.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="md:w-5/12 relative aspect-video md:aspect-auto overflow-hidden">
                    <img src={catalog.image} alt={catalog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-8 md:w-7/12 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-pink-600 font-bold uppercase tracking-[0.2em] mb-2">{catalog.products.length} High-End Items</div>
                      <h3 className="text-3xl font-serif italic mb-4">{catalog.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-6 italic">{catalog.description}</p>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleShare(catalog, true)}
                        className="flex-grow py-4 bg-pink-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
                      >
                        <Share2 className="w-4 h-4" /> Share Collection
                      </button>
                      <button className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-24 p-12 bg-white border border-gray-100 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShoppingBag className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <h4 className="text-[10px] text-pink-600 uppercase tracking-[0.4em] mb-6 font-black">Support & Training</h4>
            <h3 className="text-4xl md:text-5xl font-serif italic mb-8">Master the Soni Raj <br/> Reselling Protocol</h3>
            <p className="max-w-xl text-gray-500 mb-12 italic leading-relaxed">Access exclusive marketing tools, HD imagery, and product training videos. Our top resellers earn over ₹50,000 monthly.</p>
            <div className="flex flex-wrap gap-4">
               <button className="px-10 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-pink-600 transition-all">Join Training Web</button>
               <button className="px-10 py-5 border border-gray-200 text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-100 transition-all">Download Guidelines</button>
            </div>
          </div>
        </div>
      </div>
    <OrderModal 
        product={selectedProductForOrder} 
        isOpen={!!selectedProductForOrder} 
        onClose={() => setSelectedProductForOrder(null)} 
      />
      <ProductDetailModal 
        product={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onBuy={(p) => {
          setSelectedProductForDetail(null);
          setSelectedProductForOrder(p);
        }}
        onShare={(p) => handleShare(p)}
      />
      <ShareModal 
        item={sharingItem?.item}
        isCatalog={sharingItem?.isCatalog}
        isOpen={!!sharingItem}
        onClose={() => setSharingItem(null)}
      />
    </section>
  );
};
const OrderTracker = () => {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = () => {
    const existingOrders = JSON.parse(localStorage.getItem('soni_raj_orders') || '[]');
    const order = existingOrders.find((o: any) => o.id.toUpperCase() === orderIdInput.toUpperCase());
    
    if (order) {
      setFoundOrder(order);
      setError('');
    } else {
      setFoundOrder(null);
      setError('Order ID not found. Please check and try again.');
    }
  };

  const steps = [
    { label: 'Order Placed', icon: <Package className="w-4 h-4" />, status: 'Order Placed' },
    { label: 'Processing', icon: <Clock className="w-4 h-4" />, status: 'Processing' },
    { label: 'Shipped', icon: <Truck className="w-4 h-4" />, status: 'Shipped' },
    { label: 'Delivered', icon: <CheckCircle2 className="w-4 h-4" />, status: 'Delivered' }
  ];

  const getStepIndex = (status: string) => {
    return steps.findIndex(s => s.status === status);
  };

  return (
    <section id="track" className="py-24 px-6 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-4 font-black">Post-Purchase</h3>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Track Your Radiance</h2>
          <p className="text-gray-400 italic text-sm">Enter your Order ID (e.g. SR-XXXXXX) to check delivery status.</p>
        </div>

        <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                type="text" 
                placeholder="Enter Order ID"
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold uppercase tracking-widest outline-none focus:border-pink-600 transition-all shadow-sm"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
              />
            </div>
            <button 
              onClick={handleTrack}
              className="px-10 py-4 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-pink-600 transition-all shadow-lg"
            >
              Track Order
            </button>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-red-500 text-xs font-bold uppercase tracking-widest"
              >
                {error}
              </motion.p>
            )}

            {foundOrder && (
              <motion.div 
                key={foundOrder.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-gray-100">
                  <div className="flex gap-4 items-center">
                    <img src={foundOrder.productImage} className="w-20 h-20 object-cover rounded-2xl shadow-md" alt="" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order ID: {foundOrder.id}</p>
                      <h4 className="text-xl font-serif italic">{foundOrder.productTitle}</h4>
                      <p className="text-xs font-bold text-pink-600">₹{foundOrder.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Customer</p>
                    <p className="font-bold text-sm">{foundOrder.customerName}</p>
                    <p className="text-[10px] text-gray-400">{foundOrder.date}</p>
                  </div>
                </div>

                <div className="relative pt-8">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    {steps.map((step, idx) => {
                      const isCompleted = idx <= getStepIndex(foundOrder.status);
                      const isCurrent = idx === getStepIndex(foundOrder.status);
                      return (
                        <div key={idx} className="flex flex-col items-center text-center group">
                          <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center transition-all duration-500 shadow-lg ${
                            isCompleted ? 'bg-black text-white' : 'bg-white text-gray-300 border border-gray-100'
                          } ${isCurrent ? 'ring-4 ring-pink-100 scale-110' : ''}`}>
                            {step.icon}
                          </div>
                          <div className="mt-4">
                            <p className={`text-[9px] uppercase tracking-[0.2em] font-bold ${isCompleted ? 'text-black' : 'text-gray-300'}`}>
                              {step.label}
                            </p>
                            {isCurrent && (
                              <span className="inline-block w-2 h-2 bg-pink-600 rounded-full animate-pulse mt-2" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 flex items-center justify-between">
                   <div className="flex items-center gap-4 text-pink-600">
                     <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Smartphone className="w-4 h-4" />
                     </div>
                     <div>
                        <p className="text-xs font-bold">Need Help?</p>
                        <p className="text-[10px] opacity-70 italic">Chat with our delivery support on WhatsApp</p>
                     </div>
                   </div>
                   <a 
                    href={`https://wa.me/${OWNER_DETAILS.whatsapp}?text=I%20need%20help%20with%20order%20${foundOrder.id}`}
                    className="px-6 py-2 bg-pink-600 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all"
                   >
                    Contact Support
                   </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CollectionsSection = () => (
  <section id="collections" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 items-stretch">
        {CATEGORIES.map((cat, idx) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            className="group relative"
          >
            <div className="relative overflow-hidden aspect-[16/10] mb-8 border border-white/5 glow-hover">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold border border-white/20 px-4 py-2 bg-black/20 backdrop-blur-sm">View Gallery</span>
              </div>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="text-3xl font-serif text-white mb-2 tracking-wide italic">{cat.title}</h4>
                <p className="text-xs text-white/40 mb-6 font-light leading-relaxed max-w-sm">{cat.description}</p>
              </div>
              <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black transition-all duration-500">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const VideoTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ananya Sharma",
      quote: "The attention to detail in their cosmetic line is unparalleled. Truly a luxury experience.",
      videoUrl: "https://www.youtube.com/embed/Sc63S9Y8_K4", // Placeholder luxury beauty video
    },
    {
      id: 2,
      name: "Priya Patel",
      quote: "Soni Raj's fashion sense is ahead of its time. I feel empowered every time I wear their pieces.",
      videoUrl: "https://www.youtube.com/embed/Sc63S9Y8_K4", // Placeholder luxury fashion video
    }
  ];

  return (
    <section id="testimonials" className="py-32 px-6 bg-black/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-6 font-black opacity-60">Testimonials</h3>
          <h2 className="text-5xl md:text-7xl font-serif italic text-white">Hear From Our Clients</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="bg-luxury-surface border border-white/10 rounded-2xl overflow-hidden group shadow-2xl hover:border-luxury-gold/30 transition-all"
            >
              <div className="aspect-video relative overflow-hidden bg-black/40">
                <iframe
                  className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                  src={t.videoUrl}
                  title={`Testimonial from ${t.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-10">
                <div className="flex text-luxury-gold mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xl font-serif text-white/80 italic leading-relaxed mb-8">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold text-[10px] font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic text-lg">{t.name}</h4>
                    <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Verified Patron</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutOwner = () => (
  <section id="about" className="py-32 px-6 bg-black relative">
    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
       <span className="text-[20vw] font-display font-black text-white/5 absolute -left-20 -top-20 uppercase leading-none">Soni</span>
    </div>
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
      <div className="lg:w-5/12 relative">
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="aspect-[4/5] overflow-hidden grayscale contrast-125 border border-white/10"
        >
          <img 
            src="/src/assets/images/regenerated_image_1779010057713.png" 
            alt="Soni Raj" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute -left-6 -bottom-6 w-32 h-32 border border-luxury-gold/20 hidden xl:block z-20" />
      </div>
      <div className="lg:w-7/12">
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold mb-6 font-black opacity-60">The Vision</h3>
        <h2 className="text-6xl md:text-8xl font-serif text-white italic mb-10 leading-tight">Artistic Direction & <span className="text-luxury-gold">Precision</span></h2>
        <div className="space-y-8 text-white/50 leading-relaxed font-light italic text-lg">
          <p>
            Under the guidance of Soni Raj, our boutique serves as a sanctuary for those who seek high-performance beauty and bespoke fashion. 
          </p>
          <p>
            "Style is an architecture of the self. My goal is to provide the materials for that construction."
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-12 border-t border-white/5 pt-12">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-white/20 block mb-2 font-bold">Establishment</span>
            <span className="text-2xl font-serif text-white">Est. 2023 India</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-white/20 block mb-2 font-bold">Core Focus</span>
            <span className="text-2xl font-serif text-white tracking-widest underline decoration-luxury-gold/50">Luxury & Beauty</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footnotes = () => (
    <footer id="contact" className="bg-luxury-surface border-t border-white/5 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-24 mb-24">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <img 
                src={OWNER_DETAILS.logo} 
                alt="Soni Raj Logo" 
                className="w-12 h-12 rounded-full border border-luxury-gold/30 p-1"
                referrerPolicy="no-referrer"
              />
              <h2 className="text-4xl font-serif text-white italic">SONI RAJ</h2>
            </div>
            <p className="text-white/40 mb-8 font-light leading-relaxed max-w-xs italic text-sm">
              Defining the apex of luxury cosmetics and fashion. A system designed for the sophisticated modern era.
            </p>
            
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold block mb-6">Newsletter</span>
              <form className="relative group max-w-sm" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Soni Raj Inner Circle!'); }}>
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white outline-none focus:border-luxury-gold transition-colors pr-12"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-luxury-gold text-black rounded-lg flex items-center justify-center hover:bg-white transition-all transform hover:scale-105 active:scale-95"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
              <p className="mt-3 text-[9px] text-white/20 italic tracking-widest">Join our circle for early access and exclusives.</p>
            </div>

            <div className="flex gap-6">
              <a href={OWNER_DETAILS.instagram_url} target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 text-white/40 hover:text-luxury-gold transition-colors cursor-pointer" />
              </a>
              <a href={`https://wa.me/${OWNER_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-luxury-gold transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-luxury-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-8">Navigation</span>
              <ul className="space-y-4 text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bespoke</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ecosystem</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portal</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-8">Direct Access</span>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/20 mb-2 font-bold">Business WhatsApp</p>
                  <p className="text-white font-mono text-xl tracking-tight">{OWNER_DETAILS.phone}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/20 mb-2 font-bold">Professional Email</p>
                  <p className="text-white font-serif italic text-xl underline decoration-luxury-gold/30 underline-offset-8">{OWNER_DETAILS.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 italic">
             Modern Luxury © 2026 Soni Raj • Handcrafted with Precision
           </div>
           <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30 font-bold">
             <a href="#" className="hover:text-luxury-gold transition-colors">Compliance</a>
             <a href="#" className="hover:text-luxury-gold transition-colors">Security</a>
             <a href="#" className="hover:text-luxury-gold transition-colors">Global Rights</a>
           </div>
        </div>
      </div>
    </footer>
);

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />
      <main>
        <Hero />
        <PressLogos />
        <ResellerCatalog />
        <OrderTracker />
        <AppEcosystem />
        <Craftsmanship />
        <CollectionsSection />
        <VideoTestimonials />
        <AboutOwner />
        <ContactSection />
        <Footnotes />
      </main>
      <SupportChat />
      <ProductAdmin isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
