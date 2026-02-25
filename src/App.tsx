import { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type UserRole = 'admin' | 'cultural-enthusiast' | 'user';

interface User {
  name: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    // Create user based on selected role
    const roleNames = {
      'admin': 'Admin User',
      'cultural-enthusiast': 'Cultural Enthusiast',
      'user': 'Heritage Explorer'
    };
    
    const roleEmails = {
      'admin': 'admin@heritage.com',
      'cultural-enthusiast': 'enthusiast@heritage.com',
      'user': 'user@heritage.com'
    };
    
    const userData: User = {
      name: roleNames[role],
      email: roleEmails[role],
      role: role
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    
    console.log('User logged in as:', userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setShowWelcome(true);
  };

  const handleContinue = () => {
    setShowWelcome(false);
  };

  // Show appropriate dashboard based on user role
  if (isAuthenticated && user) {
    if (user.role === 'admin') {
      return (
        <>
          <AdminDashboard onLogout={handleLogout} />
          <Toaster />
        </>
      );
    }
    return (
      <>
        <HomePage user={user} onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  // Show welcome page first
  if (showWelcome) {
    return (
      <>
        <WelcomePage onContinue={handleContinue} />
        <Toaster />
      </>
    );
  }

  // Show login page
  return (
    <>
      <LoginPage onSelectRole={handleRoleSelect} />
      <Toaster />
    </>
  );
}