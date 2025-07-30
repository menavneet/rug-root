# THE RUGS STORY | Premium E-commerce Website

A beautiful, professional e-commerce website for premium rugs and home decor. This project showcases modern web design principles with clean aesthetics, smooth interactions, and a focus on user experience.

## ✨ Features

- **Modern Design**: Clean, professional layout with premium typography
- **Responsive Navigation**: Sticky header with search, account, and cart functionality
- **Hero Section**: Compelling product showcase with call-to-action
- **Newsletter Popup**: Elegant subscription modal with smooth animations
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions
- **Mobile Responsive**: Optimized for all device sizes
- **Professional Branding**: Consistent brand identity throughout

## 🚀 Live Demo

Once deployed, your site will be available at: `https://[your-username].github.io/rug-root/`

## 🎯 What's Included

- `index.html` - Main HTML structure with semantic markup
- `styles.css` - Complete CSS with animations and responsive design
- `script.js` - Interactive JavaScript functionality
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