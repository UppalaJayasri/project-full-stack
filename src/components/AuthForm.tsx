import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
  onToggle: () => void;
}

export function AuthForm({ type, onSubmit, onToggle }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isLogin = type === 'login';

  return (
    <Card className="w-full max-w-md bg-white/98 shadow-xl border-0">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">
          {isLogin ? 'Welcome back' : 'Create account'}
        </CardTitle>
        <CardDescription>
          {isLogin 
            ? 'Sign in to your account to continue' 
            : 'Enter your details to create your account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="h-11"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
              className="h-11"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700"
          >
            {isLogin ? 'Sign in' : 'Register'}
          </Button>
        </form>
        
        <div className="text-center">
          <button
            type="button"
            onClick={onToggle}
            className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            {isLogin 
              ? "Don't have an account? Register" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </CardContent>
    </Card>
  );
}