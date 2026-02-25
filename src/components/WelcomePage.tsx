import { Button } from './ui/button';

interface WelcomePageProps {
  onContinue: () => void;
}

export function WelcomePage({ onContinue }: WelcomePageProps) {
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
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 shadow-2xl">
          <span className="text-5xl">🏛️</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          Indian Heritage
        </h1>
        
        <p className="text-2xl md:text-3xl text-white/90 mb-12 drop-shadow-lg font-medium">
          Inspire awareness of Indian culture, heritage, and famous monuments
        </p>
        
        <Button 
          onClick={onContinue}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 text-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Explore Heritage
        </Button>
      </div>
    </div>
  );
}