# Valora - Women's Safety Navigation App

Valora is a comprehensive women's safety application designed specifically for the Pune metropolitan area. The platform provides intelligent route planning, real-time safety zone information, incident reporting, and emergency assistance features to ensure women can navigate the city with confidence and security.

## Features

### 1. Safe Route Navigation
Find the safest route from your current location to any destination within Pune. The application analyzes safety data and suggests optimal paths that prioritize security over speed.

### 2. Zone Safety Information
- **Green Zone**: Safest areas with high security presence and well-lit environments
- **Yellow Zone**: Moderately safe areas requiring standard precautions
- **Red Zone**: Areas requiring heightened awareness and caution

The app continuously tracks your location and provides real-time updates about which safety zone you are currently in.

### 3. Incident Reporting
Users can report safety incidents through the "Post Incident" feature, creating a community-driven database of safety information. This allows other users to stay informed about recent incidents and take necessary precautions.

### 4. Emergency Services Locator
- **Police Stations Near Me**: Instantly locate the nearest police stations based on your current location
- **Hospitals Near Me**: Find nearby hospitals and medical facilities for emergency situations

### 5. Panic Button
The most critical safety feature allows users to send immediate emergency notifications to pre-configured emergency contacts. When activated, the panic button automatically shares the user's current location with designated contacts via SMS using Twilio integration.

## Technology Stack

- **Frontend**: ReactJS with Tailwind CSS for responsive and modern user interface
- **Backend**: Node.js with Express.js framework for robust server-side operations
- **Database**: PostgreSQL for reliable data storage and management
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for secure user authentication
- **Database Connection**: Supabase for seamless database integration and management
- **SMS Notifications**: Twilio for sending emergency notifications and alerts

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/im-anjali/Valora.git
cd Valora
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following configuration:
```env
DB_USER=postgres
DB_PASSWORD=valora!123
DB_HOST=db.ykbnbywlpxrdaeccjwkf.supabase.co
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=your_secret_key
PORT=6000
TWILIO_ACCOUNT_SID=AC1e80f892473b999eab57e5a560467acb
TWILIO_AUTH_TOKEN=b2eb32654ecd2f641d120e2a73c74d70
TWILIO_PHONE_NUMBER=+19785069061
```

Start the backend server:
```bash
nodemon app.js
```

### 3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

## Important Notes

- Make sure Supabase is set up and your database is live before starting the backend
- The Twilio credentials must be valid to use the panic button feature

## Security Implementation

Valora prioritizes user security through multiple layers of protection:

- **Password Security**: All user passwords are encrypted using bcrypt hashing algorithm
- **Authentication**: JWT tokens ensure secure user sessions and API access
- **Data Protection**: Sensitive user information is protected through secure database connections
- **Emergency Communications**: Twilio integration ensures reliable SMS delivery for emergency notifications

## Development Team

This project was developed by a dedicated team of developers committed to women's safety:

- **Noopur Karkare** - [GitHub](https://github.com/noopur1811)
- **Anjali Phule** - [GitHub](https://github.com/im-anjali)
- **Sejal Pathak** - [GitHub](https://github.com/sej197)
  
## Contributing

We welcome contributions to improve Valora's functionality and reach. Please feel free to submit issues, feature requests, or pull requests to help make our communities safer.



## Support

For technical support or feature requests, please create an issue in the GitHub repository or contact the development team directly.
