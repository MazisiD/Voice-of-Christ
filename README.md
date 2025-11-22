# Voice of Christ Church Website

A full-stack church management website built with Angular (Frontend) and .NET Core (Backend).

## Features

### Public Features
- **Home Page**: Welcome section with upcoming events preview
- **About Page**: Church mission, vision, beliefs, history, and contact information
- **Branches**: View all church branches with location details and assigned pastors
- **Pastors**: Directory of all pastors with their profiles and branch assignments
- **Events**: Calendar of past and upcoming church events with filtering by year and status

### Admin Features (Protected)
- **Secure Login**: JWT-based authentication
- **Branch Management**: Create, edit, and delete church branches
- **Pastor Management**: Manage pastor profiles and assign them to branches
- **Event Management**: Create and manage church events (upcoming, past, cancelled)
- **Church Info Management**: Update mission, vision, beliefs, and contact information

## Technology Stack

### Backend (.NET 8.0)
- ASP.NET Core Web API
- Entity Framework Core (Code First)
- SQL Server (LocalDB for development)
- JWT Authentication
- BCrypt for password hashing

### Frontend (Angular 17)
- Angular standalone components
- Bootstrap 5 for UI
- RxJS for reactive programming
- Route guards for admin protection
- HTTP interceptors for JWT token management

## Project Structure

```
Voice-of-Christ/
├── Server/
│   └── VoiceOfChrist.API/
│       ├── Controllers/        # API endpoints
│       ├── Models/             # Entity models
│       ├── Data/               # DbContext and configurations
│       ├── DTOs/               # Data transfer objects
│       └── Program.cs          # Application entry point
├── Client/
│   └── src/
│       ├── app/
│       │   ├── components/     # Angular components
│       │   ├── services/       # API services
│       │   ├── models/         # TypeScript interfaces
│       │   ├── guards/         # Route guards
│       │   └── interceptors/   # HTTP interceptors
│       └── assets/             # Static assets
└── README.md
```

## Setup Instructions

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- SQL Server or SQL Server Express (LocalDB included with Visual Studio)

### Backend Setup

1. Navigate to the server directory:
   ```powershell
   cd Server\VoiceOfChrist.API
   ```

2. Restore NuGet packages:
   ```powershell
   dotnet restore
   ```

3. Update the connection string in `appsettings.json` if needed (default uses LocalDB)

4. Create the database and apply migrations:
   ```powershell
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

5. Run the API:
   ```powershell
   dotnet run
   ```

   The API will be available at `https://localhost:5001` or `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```powershell
   cd Client
   ```

2. Install npm packages:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   ng serve
   ```

   The application will be available at `http://localhost:4200`

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `Admin123!`

⚠️ **Important**: Change these credentials in production!

## Database Seeding

The application automatically seeds the database with:
- 1 Admin account
- 1 Church info entry
- 3 Sample branches (Johannesburg, Pretoria, Durban)
- 3 Sample pastors
- 3 Sample events

## API Endpoints

### Public Endpoints
- `GET /api/branches` - Get all branches
- `GET /api/pastors` - Get all pastors
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/past` - Get past events
- `GET /api/churchinfo` - Get church information
- `POST /api/auth/login` - Admin login

### Protected Endpoints (Require JWT Token)
- `POST /api/branches` - Create branch
- `PUT /api/branches/{id}` - Update branch
- `DELETE /api/branches/{id}` - Delete branch
- `POST /api/pastors` - Create pastor
- `PUT /api/pastors/{id}` - Update pastor
- `DELETE /api/pastors/{id}` - Delete pastor
- `POST /api/events` - Create event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event
- `PUT /api/churchinfo/{id}` - Update church info

## Development Notes

### CORS Configuration
The backend is configured to allow requests from `http://localhost:4200` (Angular dev server).

### JWT Configuration
- Token expiration: 24 hours
- Secret key: Configured in `appsettings.json` (change in production!)

### Database Migrations
To create a new migration after model changes:
```powershell
cd Server\VoiceOfChrist.API
dotnet ef migrations add MigrationName
dotnet ef database update
```

## Building for Production

### Backend
```powershell
cd Server\VoiceOfChrist.API
dotnet publish -c Release -o ./publish
```

### Frontend
```powershell
cd Client
ng build --configuration production
```

The production files will be in `Client/dist/voice-of-christ-client`

## Future Enhancements

- Image upload functionality for pastors and events
- Email notifications for upcoming events
- Member registration and login
- Online giving/donations
- Sermon library with audio/video
- Prayer request system
- Multi-language support
- Mobile app (using Ionic or React Native)

## License

This project is created for Voice of Christ Church.

## Support

For issues or questions, contact the development team.
