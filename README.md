# RUGS AND ROOTS | Premium E-commerce Website

A comprehensive e-commerce platform for premium rugs and home decor featuring real product catalogs, interactive shopping experiences, and professional design. Built with modern web technologies and a focus on user experience.

## ✨ Features

### **🏠 Multi-Page Website**
- **Homepage**: Hero section, product collections, and featured products
- **Product Categories**: Dedicated pages for Modern and Traditional rugs
- **About Us**: Company story, values, and team information
- **Contact**: Professional contact form with validation and info

### **🛒 E-commerce Functionality**
- **Product Catalog**: Real product images organized by categories
- **Shopping Cart**: Add to cart, cart counter, and mini cart display
- **Quick View**: Modal product previews with detailed information
- **Interactive Elements**: Hover effects, product overlays, and animations

### **🎨 Professional Design**
- **Clean Layout**: Modern, minimalist design with premium typography
- **Responsive Design**: Optimized for all device sizes and screen types
- **Image Integration**: Real product photography from your image collection
- **Consistent Branding**: Professional color scheme and typography

## 🚀 Live Demo

Once deployed, your site will be available at: `https://[your-username].github.io/rug-root/`

## 🎯 What's Included

### **📄 Pages**
- `index.html` - Homepage with hero, collections, and featured products
- `modern-rugs.html` - Modern rugs category with 9 products
- `traditional-rugs.html` - Traditional rugs category with 9 products  
- `about.html` - Company story, values, and team
- `contact.html` - Contact form and business information

### **🎨 Styling & Scripts**
- `styles.css` - Complete responsive CSS with product styling
- `script.js` - Main JavaScript functionality
- `products.js` - E-commerce and cart functionality
- `contact.js` - Contact form validation and submission

### **📸 Product Catalog**
- **Modern Rugs**: Beige Harmony, Ink Path, Noir Illusion, Earth Echo, Picasso Lines, The Eclipse, Woolora, Linea, Cloud Rug
- **Traditional Rugs**: Royal Rootwork, Echoes of the Canopy, Desert Jewel, Blue Mirage, Petal Whisper, Serenity Lines, Tropic Maze, Ombre Royale, Aqua Plane

### **⚙️ Deployment**
- `.github/workflows/deploy.yml` - GitHub Actions for automatic deployment

## 🛠️ Setup GitHub Pages

1. **Push to GitHub**: Make sure all files are committed and pushed to your repository
2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
3. **Automatic Deployment**: The GitHub Action will automatically deploy on every push to the main branch

## 🎨 Customization

### Changing Brand Colors
Update the primary color in `styles.css`:
```css
:root {
    --primary-color: #ff6b35; /* Change to your brand color */
    --brand-color: #b8860b;   /* Logo/accent color */
}
```

### Modifying Content
Update text content in `index.html`:
```html
<h2>Your Headline</h2>
<h3>Your Subheadline</h3>
<p>Your custom description...</p>
```

### Newsletter Popup Timing
Adjust popup delay in `script.js`:
```javascript
setTimeout(() => {
    popup.classList.add('active');
}, 3000); // Change 3000 to your preferred delay in milliseconds
```

### Adding Products
Extend the features section or add product grids:
```html
<div class="product-grid">
    <div class="product-item">
        <!-- Your product content -->
    </div>
</div>
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🔧 Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## 📄 License

This project is open source and available under the MIT License.