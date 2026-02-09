# Kiruthika Marikumaran - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing my experience, projects, and skills in Computer Engineering and AI.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, animated sections, and hover effects
- **Project Showcase**: Highlighting key projects from GitHub
- **Experience Timeline**: Visual timeline of work experience and research
- **Skills Display**: Categorized technical skills with interactive tags
- **Contact Section**: Easy ways to get in touch

## 📋 Technologies Used

- HTML5
- CSS3 (with custom properties and animations)
- JavaScript (Vanilla)
- Font Awesome Icons
- Responsive Grid & Flexbox layouts

## 🌐 Publishing to GitHub Pages

### Step 1: Create a New Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Name your repository: `kirustar14.github.io` (or `your-username.github.io`)
   - This creates a user site that will be available at `https://kirustar14.github.io`
5. Set the repository to **Public**
6. **Do NOT** initialize with README, .gitignore, or license (we'll add these later)
7. Click **"Create repository"**

### Step 2: Upload Your Website Files

#### Option A: Using GitHub Web Interface (Easiest)

1. In your new repository, click **"uploading an existing file"**
2. Drag and drop these files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `Kiruthika_Marikumaran_Resume.pdf` (your resume PDF - **IMPORTANT!**)
   - `README.md` (this file)
3. Add a commit message like "Initial commit: Add portfolio website"
4. Click **"Commit changes"**

**IMPORTANT:** Make sure to upload your resume PDF file named exactly `Kiruthika_Marikumaran_Resume.pdf` so the download links work correctly!

#### Option B: Using Git Command Line

1. Open your terminal/command prompt
2. Navigate to the folder containing your website files
3. Run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Add portfolio website"

# Add your GitHub repository as remote
git remote add origin https://github.com/kirustar14/kirustar14.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**
6. Wait a few minutes for GitHub to build your site
7. Your website will be live at: `https://kirustar14.github.io`

### Step 4: Verify Your Website

1. After a few minutes, visit `https://kirustar14.github.io`
2. Your portfolio should be live!
3. If you see a 404 error, wait a bit longer (it can take up to 10 minutes)

## 🎨 Customization

### Updating Content

1. **Personal Information**: Edit the text in `index.html`
2. **Styling**: Modify colors and styles in `styles.css` (see CSS variables at the top)
3. **Projects**: Update the projects section with your latest work
4. **Experience**: Add or modify your work experience in the timeline

### Color Scheme

To change the color scheme, edit these CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main accent color */
    --secondary-color: #8b5cf6;    /* Secondary accent */
    --accent-color: #ec4899;       /* Highlight color */
    --dark-bg: #0f172a;            /* Background color */
    --card-bg: #1e293b;            /* Card background */
}
```

### Adding Your Photo

1. Add your photo to the repository (e.g., `profile.jpg`)
2. In `index.html`, find the `.image-bg` div inside `.hero-image`
3. Replace it with:
```html
<img src="profile.jpg" alt="Kiruthika Marikumaran" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
```

## 🔄 Updating Your Website

After making changes to your website:

```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "Update projects section"

# Push to GitHub
git push origin main
```

Your changes will be live within a few minutes!

## 📱 Testing Locally

To test your website locally before publishing:

1. Simply open `index.html` in your web browser
2. Or use a local server:
   - **Python 3**: `python -m http.server 8000`
   - **Python 2**: `python -m SimpleHTTPServer 8000`
   - **Node.js**: `npx http-server`
3. Visit `http://localhost:8000` in your browser

## 🐛 Troubleshooting

### Website Not Loading
- Wait 10-15 minutes after first deployment
- Check that GitHub Pages is enabled in repository Settings > Pages
- Ensure your repository is named correctly (`username.github.io`)
- Check that `index.html` is in the root directory

### Styles Not Appearing
- Verify that `styles.css` and `script.js` are in the same folder as `index.html`
- Check browser console (F12) for any errors
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Links Not Working
- Ensure all href and src paths are relative (no leading `/`)
- Check that all referenced files exist in the repository

## 📄 File Structure

```
kirustar14.github.io/
│
├── index.html                          # Main HTML file
├── styles.css                          # CSS styles
├── script.js                           # JavaScript functionality
├── Kiruthika_Marikumaran_Resume.pdf    # Your resume (upload this!)
└── README.md                           # This file
```

## 🎯 Future Enhancements

Consider adding:
- [ ] Custom domain name
- [ ] Blog section
- [ ] Dark/Light mode toggle
- [ ] Contact form with backend
- [ ] Analytics (Google Analytics)
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Accessibility improvements

## 📧 Contact

- **Email**: kiruthika.star14@gmail.com
- **LinkedIn**: [linkedin.com/in/kiruthika-star14](https://linkedin.com/in/kiruthika-star14)
- **GitHub**: [github.com/kirustar14](https://github.com/kirustar14)
- **Phone**: 925-967-7432

## 📝 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Kiruthika Marikumaran**
