import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, Crown, User } from 'lucide-react';
import { LoginForm } from './LoginForm';

interface LoginPageProps {
  onSelectRole: (role: 'admin' | 'cultural-enthusiast' | 'user') => void;
}

export function LoginPage({ onSelectRole }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'cultural-enthusiast' | 'user' | null>(null);

  const handleLogin = (credentials: { name: string; email: string; password: string }) => {
    // Admin goes directly without credentials
    if (selectedRole === 'admin') {
      onSelectRole(selectedRole);
    } else if (credentials.name && credentials.email && credentials.password && selectedRole) {
      onSelectRole(selectedRole);
    } else {
      alert('Please enter name, email and password!');
    }
  };

  if (selectedRole) {
    return (
      <LoginForm 
        role={selectedRole} 
        onLogin={handleLogin} 
        onBack={() => setSelectedRole(null)} 
      />
    );
  }
  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage heritage sites & users',
      icon: Shield,
      gradient: 'from-orange-500 to-red-600',
      emoji: '👑'
    },
    {
      id: 'cultural-enthusiast', 
      title: 'Culture Expert',
      description: 'Share knowledge & stories',
      icon: Crown,
      gradient: 'from-purple-500 to-pink-600',
      emoji: '🎭'
    },
    {
      id: 'user',
      title: 'Explorer',
      description: 'Discover Indian heritage',
      icon: User,
      gradient: 'from-blue-500 to-cyan-600', 
      emoji: '🗺️'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Beautiful Indian Heritage Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600"></div>
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=800&fit=crop"
            alt="Indian Heritage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/15 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      {/* Login Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 shadow-2xl">
            <span className="text-4xl">🏛️</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-2 text-white font-bold">
            Indian Heritage
          </h1>
          <p className="text-lg text-white/90">Choose your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <Card
              key={role.id}
              onClick={() => {
                if (role.id === 'admin') {
                  onSelectRole(role.id as 'admin' | 'cultural-enthusiast' | 'user');
                } else {
                  setSelectedRole(role.id as 'admin' | 'cultural-enthusiast' | 'user');
                }
              }}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 bg-white/95 backdrop-blur-sm border-white/50 hover:shadow-2xl"
            >
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{role.emoji}</span>
                </div>
                <CardTitle className="text-xl mb-1">{role.title}</CardTitle>
                <p className="text-sm text-gray-600">{role.description}</p>
              </CardHeader>
              <CardContent className="text-center pb-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${role.gradient} text-white text-sm font-medium hover:shadow-lg transition-all`}>
                  Login as {role.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}