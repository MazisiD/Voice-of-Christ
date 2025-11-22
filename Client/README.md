# Voice of Christ Church Website

A standalone Angular application for managing and displaying church information, events, branches, and pastors. This application runs entirely in the browser using local storage - no backend server required!

## 🌟 Features

- **Public Pages**
  - Home page with upcoming events
  - About page with church mission, vision, and beliefs
  - Branches directory with contact information
  - Pastors directory with bios and contact details
  - Events calendar with filtering by year and status
  - Fully responsive design

- **Admin Dashboard**
  - Secure login (username: `admin`, password: `admin123`)
  - Manage branches (create, edit, delete)
  - Manage pastors (create, edit, delete)
  - Manage events (create, edit, delete)
  - Update church information
  - All data stored locally in browser

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

### Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Usage

### Public Access

Navigate through the website using the navigation menu:
- **Home**: View upcoming events and church overview
- **About**: Learn about the church's mission, vision, and beliefs
- **Branches**: Find church locations and contact information
- **Pastors**: Meet the pastoral team
- **Events**: Browse upcoming and past events

### Admin Access

1. Click "Login" in the navigation menu
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Access the admin dashboard to manage:
   - Branches
   - Pastors
   - Events
   - Church Information

### Data Storage

All data is stored in the browser's local storage:
- Data persists between sessions
- Each browser stores its own data independently
- Clear browser data to reset to default values
- Default sample data is provided on first load

### Customizing Default Data

To modify the default data that loads on first use, edit:
```
src/app/services/local-storage.service.ts
```

Look for the `initializeDefaultData()` method and update the sample data.

## 🎨 Customization

### Changing Colors

Edit `src/styles.css` to customize the color scheme:
- Hero gradient: `.hero-section` background
- Primary button color: `.btn-primary`
- Navbar: `.navbar`

### Admin Credentials

To change admin credentials, edit:
```typescript
// src/app/services/auth.service.ts
private readonly ADMIN_USERNAME = 'admin';
private readonly ADMIN_PASSWORD = 'admin123';
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── about/          # About page
│   │   ├── admin/          # Admin dashboard
│   │   ├── branches/       # Branches listing
│   │   ├── events/         # Events calendar
│   │   ├── footer/         # Footer component
│   │   ├── home/           # Home page
│   │   ├── navbar/         # Navigation bar
│   │   └── pastors/        # Pastors directory
│   ├── guards/
│   │   └── auth.guard.ts   # Route protection
│   ├── models/
│   │   └── models.ts       # TypeScript interfaces
│   └── services/
│       ├── auth.service.ts        # Authentication
│       ├── branch.service.ts      # Branch operations
│       ├── church-info.service.ts # Church info
│       ├── event.service.ts       # Event operations
│       ├── pastor.service.ts      # Pastor operations
│       └── local-storage.service.ts # Data persistence
└── styles.css              # Global styles
```

## 🔧 Technical Details

### Technology Stack

- **Angular 18+**: Frontend framework
- **Bootstrap 5**: UI components and styling
- **Bootstrap Icons**: Icon library
- **RxJS**: Reactive programming
- **LocalStorage API**: Data persistence

### Key Features

- **Standalone Components**: Modern Angular architecture
- **Reactive Forms**: Form handling with two-way binding
- **Route Guards**: Protected admin routes
- **Responsive Design**: Mobile-friendly interface
- **LocalStorage**: Browser-based data persistence
- **Observable Patterns**: Asynchronous data handling

## 🛠️ Development

### Adding New Features

1. Create new component:
   ```bash
   ng generate component components/feature-name
   ```

2. Add route in `src/app/app.routes.ts`

3. Update services if data management is needed

### Modifying Data Models

Edit `src/app/models/models.ts` to add or modify data structures.

## 📝 Notes

- This is a client-only application with no backend server
- All data is stored locally in the browser
- Admin password is stored in plain text (not suitable for production with sensitive data)
- For a production environment with multiple users, consider adding a proper backend

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is for demonstration purposes.

## 🆘 Troubleshooting

### Data Not Persisting
- Check browser's local storage settings
- Ensure cookies/storage are not blocked
- Try a different browser

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear Angular cache: `ng cache clean`
- Update Angular CLI: `npm install -g @angular/cli@latest`

### Admin Login Not Working
- Ensure credentials are: username `admin`, password `admin123`
- Check browser console for errors
- Clear browser cache and reload

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ for Voice of Christ Church**
