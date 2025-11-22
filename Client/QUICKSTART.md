# Quick Start Guide - Voice of Christ Church Website

## ⚡ Quick Setup (3 Steps)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the application**
   ```bash
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:4200
   ```

That's it! The website is now running locally.

## 🔐 Admin Login

**Access the admin panel:**
- Click "Login" in the navigation menu
- Username: `admin`
- Password: `admin123`

## 📊 Default Data

The application comes pre-loaded with sample data:

### Branches (3)
- Main Branch - Johannesburg
- Cape Town Branch
- Durban Branch

### Pastors (4)
- Pastor John Dube (Johannesburg)
- Pastor Sarah Khumalo (Johannesburg)
- Pastor David van der Merwe (Cape Town)
- Pastor Grace Naidoo (Durban)

### Events (6)
- Various upcoming and past events
- Different event types (Service, Youth, Women, Outreach)

### Church Information
- Mission statement
- Vision statement
- Core beliefs
- Church history

## 💾 Data Storage

- All data is stored in **browser's local storage**
- Data persists between sessions
- To reset to default data: Clear browser data/cache
- Each browser maintains its own independent data

## 🎯 Main Features to Try

### Public Pages
1. **Home** - View upcoming events
2. **About** - Read church mission and vision
3. **Branches** - Find branch locations
4. **Pastors** - Meet the pastoral team
5. **Events** - Browse and filter events

### Admin Panel
1. **Branches Tab** - Add/Edit/Delete branches
2. **Pastors Tab** - Manage pastoral staff
3. **Events Tab** - Create and manage events
4. **Church Info Tab** - Update church information

## 🛠️ Common Commands

```bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 📱 Testing Responsive Design

The application is fully responsive. Test on:
- Desktop browsers
- Mobile devices (responsive menu)
- Tablets

**Mobile Navigation:**
- Hamburger menu (3 lines) appears on small screens
- Click to expand/collapse menu
- Menu closes automatically when clicking a link

## 🔄 Making Changes

### Update Church Information
1. Login as admin
2. Go to "Church Info" tab
3. Edit mission, vision, beliefs, etc.
4. Click "Update Church Information"

### Add a New Event
1. Login as admin
2. Go to "Events" tab
3. Fill in event details
4. Click "Create Event"

### Add a New Pastor
1. Login as admin
2. Go to "Pastors" tab
3. Fill in pastor details
4. Select branch
5. Click "Create Pastor"

### Add a New Branch
1. Login as admin
2. Go to "Branches" tab
3. Fill in branch details
4. Click "Create Branch"

## 🎨 Customization Quick Tips

### Change Color Theme
Edit `src/styles.css`:
```css
/* Hero section gradient */
.hero-section {
  background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR 100%);
}

/* Primary button color */
.btn-primary {
  background-color: #YOUR_COLOR;
  border-color: #YOUR_COLOR;
}
```

### Change Admin Password
Edit `src/app/services/auth.service.ts`:
```typescript
private readonly ADMIN_USERNAME = 'your-username';
private readonly ADMIN_PASSWORD = 'your-password';
```

## ❓ Need Help?

Check the full README.md for detailed documentation.

## ✅ Everything Working?

You should see:
- ✅ Website loads at localhost:4200
- ✅ Can navigate between pages
- ✅ Can login with admin credentials
- ✅ Can view and manage data in admin panel
- ✅ Data persists after page reload
- ✅ Responsive menu works on mobile

---

**Enjoy building your church website! 🙏**
