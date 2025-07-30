# root - rug | E-commerce Loading Experience

An intentionally problematic e-commerce site that simulates various loading issues and connection problems. This project demonstrates what happens when an online rug store experiences technical difficulties, creating a realistic "struggling website" experience.

## ⚠️ Features (Intentional Issues)

- **Stuttering Progress Bars**: Progress that moves forward and back, simulating connection issues
- **Glitching Loading Spinners**: Visual glitches and color shifts in loading animations  
- **Failed Section Loading**: Product sections that fail to load with error messages
- **Network Status Indicators**: Real-time status showing database and payment gateway failures
- **Random Error Popups**: Occasional error notifications sliding in from the right
- **Title Glitches**: Site name occasionally corrupts or shows "ERROR: 404"
- **Connection Timeouts**: Loading messages that indicate server problems
- **Realistic E-commerce Context**: All loading issues are themed around online retail problems

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

### Adding More Error Messages
Update the error arrays in `script.js`:
```javascript
const loadingMessages = [
    "Your custom server error...",
    "Another connection issue...",
    // Add more realistic e-commerce problems
];
```

### Adjusting Glitch Frequency
Modify the probability in `script.js`:
```javascript
if (Math.random() > 0.7) { // Change 0.7 to adjust glitch frequency (lower = more glitches)
```

### Customizing Network Status
Add more status indicators in `index.html`:
```html
<div class="status-item">
    <span class="status-dot error"></span>
    <span>Your custom service: Failed</span>
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