# Luxe Beauty - Professional Cosmetologist Website

A modern, professional website for cosmetologists featuring a welcome section, personal story, skills showcase, interactive booking calendar, and contact information.

## 🎨 Features

### 1. **Modern Navigation Bar**
- Sticky navigation with smooth scrolling
- Responsive hamburger menu for mobile devices
- Elegant logo with gradient styling
- Active link indicators

### 2. **Hero Section (Welcome)**
- Eye-catching headline with gradient text
- Compelling tagline and description
- Call-to-action button
- Inspiring visual placeholder
- Smooth animations on page load

### 3. **Personal Story Section**
- Engaging narrative about the cosmetologist's journey
- Professional background and experience
- Mission and values
- Responsive layout with image placeholder

### 4. **Skills Showcase**
- 6 professional skill cards with icons
- Services include:
  - Makeup Artistry
  - Hair Styling
  - Skincare Consultation
  - Nail Art
  - Eyebrow Design
  - Color Consultation
- Hover animations for interactivity
- Grid layout that adapts to screen size

### 5. **Interactive Booking Calendar**
- Full calendar with month navigation
- Date selection with visual feedback
- Automatic past date disabling
- Service selection dropdown
- Preferred time slots (9 AM - 5 PM)
- Additional notes field
- Form validation
- Success/error message notifications
- Booking data stored in browser's localStorage

### 6. **Contact Information**
- Location details with icon
- Phone number (clickable link)
- Email address (clickable mailto link)
- Business hours
- Social media links (Instagram, Facebook, TikTok, Pinterest)
- Hover animations on contact items

### 7. **Professional Design**
- Golden/bronze color palette (elegant and professional)
- Strong visual hierarchy
- Smooth transitions and animations
- Box shadows for depth
- Gradient overlays for visual interest
- Fully responsive design

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css         # Complete styling with responsive design
├── script.js          # JavaScript functionality (calendar, forms, interactions)
└── README.md          # This file
```

## 🚀 How to Use

### Basic Setup
1. Open `index.html` in a web browser
2. The website is fully self-contained with no external dependencies (except Font Awesome icons via CDN)

### Customization

#### Change Business Information
1. **Contact Details**: Edit the contact section in `index.html`
   - Location address (line ~190)
   - Phone number (line ~199)
   - Email address (line ~208)
   - Business hours (line ~217)

2. **Business Name**: Search for "Luxe Beauty" in all files and replace with your name
   - HTML: Page title, navbar logo, footer
   - CSS: Variables if using custom colors
   - JavaScript: No specific references

#### Update Personal Story
- Modify the `<section id="about">` in `index.html` (around line 70)
- Update the paragraphs with your professional background

#### Modify Services/Skills
- Edit the skill cards in `<section id="skills">` (around line 95)
- Change icons using Font Awesome classes
- Update titles and descriptions

#### Customize Colors
The design uses CSS custom properties (variables) for easy color changes:
- Open `styles.css`
- Modify the `:root` section at the top:
  ```css
  --primary: #c9a875;      /* Main gold color */
  --primary-dark: #a87c4b;  /* Dark variant */
  --secondary: #f5e6d3;     /* Light background */
  --accent: #d4a574;        /* Accent color */
  --dark: #1a1a1a;          /* Dark text */
  --light: #f9f7f4;         /* Light background */
  ```

#### Add Your Photos
Replace the placeholder elements with actual images:
- Hero image: Change `.image-placeholder` div to `<img src="your-image.jpg" alt="...">`
- About image: Change `.image-placeholder-secondary` similarly
- For best results, use high-quality portrait/beauty photos

#### Update Booking Services
Edit the service options in the booking form (`<select id="service">`):
```html
<option value="makeup">Makeup Artistry</option>
<option value="hair">Hair Styling</option>
<!-- Add or remove services as needed -->
```

#### Change Booking Times
Modify the time options in the booking form (`<select id="time">`):
```html
<option value="09:00">09:00 AM</option>
<option value="10:00">10:00 AM</option>
<!-- Adjust times based on your availability -->
```

## 🎯 Color Palette

The website uses an elegant golden/bronze palette:
- **Primary Gold**: `#c9a875` - Main brand color
- **Dark Gold**: `#a87c4b` - Darker variant for contrast
- **Cream**: `#f5e6d3` - Light, elegant background
- **Accent Gold**: `#d4a574` - Highlights and accents
- **Dark Text**: `#1a1a1a` - Primary text
- **Light Background**: `#f9f7f4` - Page background

These colors convey luxury, professionalism, and warmth—perfect for beauty services.

## 📱 Responsive Design

The website is fully responsive and works on:
- **Desktop**: Full grid layouts with side-by-side sections
- **Tablet**: Optimized grid adjustments
- **Mobile**: Single column layout with touch-friendly buttons

Breakpoints:
- Desktop: 1200px and above
- Tablet: 768px to 1199px
- Mobile: Below 768px
- Small Mobile: Below 480px

## 🔧 Features & Functionality

### Calendar Booking System
- Navigate between months
- Click dates to select appointment
- Past dates are automatically disabled
- Selected date displays in the form field

### Form Validation
- Required fields: Name, Email, Phone, Service, Time
- Date selection is mandatory
- Error/success messages appear automatically
- Form resets after successful booking

### Data Storage
Bookings are stored in the browser's localStorage, allowing you to:
- View all bookings in browser console: `JSON.parse(localStorage.getItem('cosmetologyBookings'))`
- Clear bookings: `localStorage.clear()`

*Note: For production, connect to a backend database.*

### Smooth Scrolling
- Navigation links smoothly scroll to sections
- Works across all modern browsers

### Animations
- Fade-in animations on page load
- Hover effects on cards and buttons
- Scroll-triggered animations for skill cards
- Smooth transitions throughout

## 🌐 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## 📦 External Resources

- **Font Awesome Icons**: CDN link included for beautiful icons
- **Google Fonts**: Uses system fonts (Segoe UI) for best performance
- **No Build Tools Required**: Plain HTML/CSS/JavaScript

## 💡 Tips for Success

1. **Professional Photos**: High-quality images make a huge difference
2. **Regular Updates**: Keep your availability and services current
3. **Social Media**: Connect your social accounts (update links)
4. **Mobile Friendly**: Test the site on mobile devices regularly
5. **Backup Data**: Export booking data regularly if using localStorage

## 🔐 Deployment

To deploy your website:
1. **Netlify**: Drag and drop the entire `portfolio` folder
2. **GitHub Pages**: Push to a GitHub repository
3. **Traditional Hosting**: Upload all files via FTP
4. **No database needed**: Works as static files until you add backend

For backend integration (if needed):
- Connect booking form to a database service
- Use Firebase, Supabase, or traditional backend
- Add email notifications for bookings

## 📞 Support & Customization

To further customize:
- Change font styles: Search for `font-family` in CSS
- Adjust spacing: Look for `padding` and `margin` values
- Modify shadows: Find `box-shadow` properties
- Add more sections: Copy existing sections and modify

## 📄 License

This template is created for professional beauty services. Feel free to customize and use for your business.

---

**Last Updated**: 2024
**Created for**: Professional Cosmetologists and Beauty Service Providers