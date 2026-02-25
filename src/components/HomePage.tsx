import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { PlacesGallery, Place } from './PlacesGallery';
import { InteractiveMap } from './InteractiveMap';
import { Quiz } from './Quiz';
import { CulturalEnthusiastSection } from './CulturalEnthusiastSection';
import { FeedbackSection } from './FeedbackSection';
import { LogOut, Map, Grid3x3, User, Brain, Crown, MessageCircle } from 'lucide-react';

interface HomePageProps {
  user: { 
    name?: string; 
    email: string;
    role: 'admin' | 'cultural-enthusiast' | 'user';
  };
  onLogout: () => void;
}

export function HomePage({ user, onLogout }: HomePageProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setActiveTab('map');
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore(score);
    setTotalQuestions(total);
  };

  const getRoleBadge = () => {
    if (user.role === 'cultural-enthusiast') {
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-300 border flex items-center gap-1">
          <Crown className="w-3 h-3" />
          Cultural Enthusiast
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl">Indian Heritage Explorer</h1>
                <p className="text-sm text-gray-600">Discover India's Architectural Marvels</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">{user.name || 'Explorer'}</span>
                {getRoleBadge()}
              </div>
              <Button 
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full max-w-4xl mx-auto mb-8 ${
            user.role === 'cultural-enthusiast' ? 'grid-cols-5' : user.role === 'user' ? 'grid-cols-5' : 'grid-cols-4'
          }`}>
            <TabsTrigger value="overview" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
            {user.role === 'user' && (
              <TabsTrigger value="feedback" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Feedback</span>
              </TabsTrigger>
            )}
            {user.role === 'cultural-enthusiast' && (
              <TabsTrigger value="contribute" className="gap-2">
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Contribute</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-xl">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl">🏛️</span>
                </div>
                <CardTitle className="text-3xl">Welcome, {user.name || 'Heritage Explorer'}!</CardTitle>
                <CardDescription className="text-lg">
                  Explore 15 magnificent heritage sites across India
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-4xl mb-2">15</div>
                      <p className="text-gray-600">Heritage Sites</p>
                    </div>
                    <div>
                      <div className="text-4xl mb-2">8</div>
                      <p className="text-gray-600">UNESCO Sites</p>
                    </div>
                    <div>
                      <div className="text-4xl mb-2">12</div>
                      <p className="text-gray-600">States Covered</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-3xl mb-3">🕌</div>
                    <h4 className="mb-2">Historic Monuments</h4>
                    <p className="text-sm text-gray-600">Explore magnificent forts, palaces, and temples from ancient India</p>
                  </div>
                  <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-3xl mb-3">🗺️</div>
                    <h4 className="mb-2">Interactive Map</h4>
                    <p className="text-sm text-gray-600">Navigate through India's heritage sites on our interactive map</p>
                  </div>
                  <div className="bg-white rounded-lg border p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-3xl mb-3">📚</div>
                    <h4 className="mb-2">Rich History</h4>
                    <p className="text-sm text-gray-600">Learn fascinating stories and historical facts about each site</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="mb-3 text-center">Featured Heritage Sites</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="text-center">🕌 Taj Mahal</div>
                    <div className="text-center">🏰 Red Fort</div>
                    <div className="text-center">⛩️ Golden Temple</div>
                    <div className="text-center">🏛️ Mysore Palace</div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => setActiveTab('map')}
                    className="gap-2"
                  >
                    <Map className="w-4 h-4" />
                    Explore Map
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('gallery')}
                    variant="outline"
                    className="gap-2"
                  >
                    <Grid3x3 className="w-4 h-4" />
                    View Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <InteractiveMap 
              selectedPlace={selectedPlace}
              onPlaceSelect={setSelectedPlace}
            />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl mb-2">Heritage Gallery</h2>
              <p className="text-gray-600">
                Explore detailed information about India's most iconic heritage sites
              </p>
            </div>
            <PlacesGallery onSelectPlace={handlePlaceSelect} />
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl mb-2">Heritage Knowledge Quiz</h2>
              <p className="text-gray-600">
                Test your knowledge about India's magnificent heritage sites
              </p>
              {quizScore !== null && (
                <div className="mt-4">
                  <Badge className="text-lg px-4 py-2 bg-green-600">
                    Last Score: {quizScore}/{totalQuestions}
                  </Badge>
                </div>
              )}
            </div>
            <Quiz onComplete={handleQuizComplete} />
          </TabsContent>

          {/* Feedback Tab - Only for regular users */}
          {user.role === 'user' && (
            <TabsContent value="feedback" className="space-y-6">
              <FeedbackSection userName={user.name || 'Heritage Explorer'} />
            </TabsContent>
          )}

          {/* Cultural Enthusiast Tab */}
          {user.role === 'cultural-enthusiast' && (
            <TabsContent value="contribute" className="space-y-6">
              <CulturalEnthusiastSection />
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>Indian Heritage Explorer © 2025 | Discover the beauty of India's architectural heritage</p>
          </div>
        </div>
      </footer>
    </div>
  );
}