import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  role: 'admin' | 'cultural-enthusiast' | 'user';
  onLogin: (credentials: { name: string; email: string; password: string }) => void;
  onBack: () => void;
}

export function LoginForm({ role, onLogin, onBack }: LoginFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const roleInfo = {
    admin: { title: isSignup ? 'Admin Signup' : 'Admin Login', emoji: '👑', gradient: 'from-orange-500 to-red-600' },
    'cultural-enthusiast': { title: isSignup ? 'Culture Expert Signup' : 'Culture Expert Login', emoji: '🎭', gradient: 'from-purple-500 to-pink-600' },
    user: { title: isSignup ? 'Explorer Signup' : 'Explorer Login', emoji: '🗺️', gradient: 'from-blue-500 to-cyan-600' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600"></div>
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop&crop=center"
            alt="Indian Heritage"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
      </div>
      
      {/* Login Form */}
      <div className="relative z-10 w-80 h-80 mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm border-white/50 hover:shadow-2xl w-full h-full flex flex-col">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="absolute left-2 top-2 p-1 h-6 w-6 z-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 flex flex-col justify-center p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mb-2 shadow-lg">
                <span className="text-xl">{roleInfo[role].emoji}</span>
              </div>
              <h3 className="text-base font-semibold">{roleInfo[role].title}</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-9 text-sm rounded-lg"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9 text-sm rounded-lg"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-9 text-sm rounded-lg"
              />
              <Button 
                type="submit" 
                className={`w-full h-9 bg-gradient-to-r ${roleInfo[role].gradient} text-white text-sm font-medium hover:shadow-lg rounded-lg`}
              >
                {isSignup ? 'Sign Up' : 'Login'}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-xs text-gray-600 hover:text-gray-900 underline"
                >
                  {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}