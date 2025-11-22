# Configuration Guide

## Admin Credentials

The default admin credentials are stored in the authentication service.

**Default Login:**
- Username: `admin`
- Password: `admin123`

**To change these credentials:**

1. Open `src/app/services/auth.service.ts`
2. Find these lines:
   ```typescript
   private readonly ADMIN_USERNAME = 'admin';
   private readonly ADMIN_PASSWORD = 'admin123';
   ```
3. Change the values to your preferred credentials
4. Rebuild the application: `npm run build`

## Data Initialization

Default data (branches, pastors, events, church info) is initialized in:
```
src/app/services/local-storage.service.ts
```

Look for the `initializeDefaultData()` method to customize:
- Default branches
- Default pastors
- Default events
- Church information

## Styling Configuration

### Color Theme

Primary colors are defined in `src/styles.css`:

```css
/* Hero gradient */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Primary buttons */
.btn-primary {
  background-color: #667eea;
  border-color: #667eea;
}

/* Primary button hover */
.btn-primary:hover {
  background-color: #764ba2;
  border-color: #764ba2;
}
```

### Navigation Bar

Navbar styling in `src/styles.css`:
```css
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## Application Configuration

### Build Configuration

Located in `angular.json`:
- Output directory
- Asset paths
- Styles (Bootstrap CSS)
- Build budgets

### TypeScript Configuration

Located in `tsconfig.json` and `tsconfig.app.json`:
- Compiler options
- Target ES version
- Module resolution

## Environment-Specific Settings

Since this is a standalone app, there are no environment files. However, you can create them if needed:

1. Create `src/environments/environment.ts`
2. Create `src/environments/environment.prod.ts`
3. Add environment-specific configurations

Example:
```typescript
export const environment = {
  production: false,
  appName: 'Voice of Christ Church',
  version: '1.0.0'
};
```

## Browser Storage Keys

The application uses these localStorage keys:
- `voc_branches` - Branch data
- `voc_pastors` - Pastor data
- `voc_events` - Event data
- `voc_church_info` - Church information
- `auth_token` - Authentication token
- `user` - User information

**To clear all data:** Open browser DevTools → Application → Local Storage → Clear all

## Security Notes

⚠️ **Important:** This is a client-side only application with basic authentication.

**Not suitable for:**
- Production environments with sensitive data
- Multi-user systems requiring role-based access
- Applications requiring data synchronization across devices

**Suitable for:**
- Simple informational websites
- Single admin/small team management
- Local or demo deployments
- Development/testing purposes

**For production use with sensitive data, consider:**
- Adding a proper backend API
- Implementing secure authentication (JWT, OAuth)
- Using a database instead of localStorage
- Adding HTTPS/SSL
- Implementing user roles and permissions

## Performance Optimization

### Bundle Size

Current build creates approximately:
- Main JS: ~306 KB (uncompressed)
- Styles: ~226 KB (uncompressed)
- Polyfills: ~34 KB (uncompressed)

**To reduce bundle size:**
1. Remove unused Bootstrap components
2. Enable production mode optimizations
3. Use lazy loading for admin components
4. Remove unused dependencies

### Local Storage Limits

Browsers typically allow ~5-10MB of localStorage per domain.

**Current data usage is minimal:**
- ~100 KB for all sample data
- Sufficient for thousands of records

### Loading Performance

- Simulated API delay: 100ms (see services)
- To remove delay, remove `.pipe(delay(100))` from services
- Data loads instantly from localStorage

## Deployment

### Deploying to Hosting Service

After running `npm run build`, deploy the `dist/voice-of-christ-client` folder to:

- **GitHub Pages**: Use GitHub Actions
- **Netlify**: Drag and drop dist folder
- **Vercel**: Connect repository
- **Firebase Hosting**: Use Firebase CLI
- **Azure Static Web Apps**: Connect repository

### Base HREF for Subdirectory

If deploying to a subdirectory, update `base href` in `src/index.html`:

```html
<base href="/subdirectory/">
```

Or build with:
```bash
ng build --base-href /subdirectory/
```

## Backup and Restore

### Export Data

To export data from localStorage:
```javascript
// Open browser console and run:
const data = {
  branches: localStorage.getItem('voc_branches'),
  pastors: localStorage.getItem('voc_pastors'),
  events: localStorage.getItem('voc_events'),
  churchInfo: localStorage.getItem('voc_church_info')
};
console.log(JSON.stringify(data));
```

### Import Data

To import data:
```javascript
// In browser console:
const data = { /* paste exported data */ };
Object.keys(data).forEach(key => {
  localStorage.setItem('voc_' + key, data[key]);
});
location.reload();
```

## Support and Updates

For issues or updates:
1. Check the README.md
2. Review this configuration guide
3. Check browser console for errors
4. Clear cache and rebuild if needed

---

**Last Updated:** November 2025
