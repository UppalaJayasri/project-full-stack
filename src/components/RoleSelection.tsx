import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Shield, Crown, User } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'admin' | 'cultural-enthusiast' | 'user') => void;
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
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
    <div className="w-full max-w-4xl mx-auto px-4">
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
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card
              key={role.id}
              onClick={() => onSelectRole(role.id as 'admin' | 'cultural-enthusiast' | 'user')}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 bg-white/95 backdrop-blur-sm border-white/50 hover:shadow-2xl"
            >
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{role.emoji}</span>
                </div>
                <CardTitle className="text-xl mb-1">{role.title}</CardTitle>
                <CardDescription className="text-sm">{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${role.gradient} text-white text-sm font-medium hover:shadow-lg transition-all`}>
                  Login as {role.title}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
