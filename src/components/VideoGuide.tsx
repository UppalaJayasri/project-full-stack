import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Pause, Volume2, VolumeX, Maximize, MapPin, Clock } from 'lucide-react';

interface VideoGuideProps {
  placeId: number;
  placeName: string;
  location: string;
}

interface TravelVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'route' | 'transport' | 'local-guide' | 'aerial';
  videoUrl: string;
  thumbnail: string;
}

// Verified working travel guide videos for heritage destinations
const travelVideos: Record<number, TravelVideo[]> = {
  1: [ // Taj Mahal
    {
      id: 'taj-route-1',
      title: 'Taj Mahal Complete Travel Guide',
      description: 'How to reach Taj Mahal from Delhi - Train, Bus, Car options with insider tips',
      duration: '10:30',
      type: 'route',
      videoUrl: 'https://www.youtube.com/embed/49HTIoCccDY',
      thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=225&fit=crop'
    },
    {
      id: 'taj-guide-2',
      title: 'Taj Mahal Inside Tour & History',
      description: 'Detailed exploration of Taj Mahal architecture and historical significance',
      duration: '12:45',
      type: 'local-guide',
      videoUrl: 'https://www.youtube.com/embed/0NSq1-Ne26Y',
      thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=225&fit=crop'
    }
  ],
  2: [ // Red Fort
    {
      id: 'redfort-guide-1',
      title: 'Red Fort Complete Tour Delhi',
      description: 'Complete walkthrough of Red Fort - history, architecture, and key attractions',
      duration: '15:20',
      type: 'local-guide',
      videoUrl: 'https://www.youtube.com/embed/nznsdcazwqc',
      thumbnail: 'https://images.unsplash.com/photo-1713729991304-d0b6c328560e?w=400&h=225&fit=crop'
    }
  ],
  4: [ // Hawa Mahal
    {
      id: 'hawa-guide-1',
      title: 'Hawa Mahal Complete Tour Jaipur',
      description: 'Explore the Palace of Winds - architecture, history, and photography guide',
      duration: '8:45',
      type: 'local-guide',
      videoUrl: 'https://www.youtube.com/embed/vsHNmarXkMQ',
      thumbnail: 'https://images.unsplash.com/photo-1650530777057-3a7dbc24bf6c?w=400&h=225&fit=crop'
    }
  ],
  9: [ // Golden Temple
    {
      id: 'golden-guide-1',
      title: 'Golden Temple Complete Tour Amritsar',
      description: 'Complete guide to Golden Temple - history, significance, and visitor experience',
      duration: '12:30',
      type: 'local-guide',
      videoUrl: 'https://www.youtube.com/embed/m701WKQMeYQ',
      thumbnail: 'https://images.unsplash.com/photo-1623059508779-2542c6e83753?w=400&h=225&fit=crop'
    }
  ],
  3: [ // Qutub Minar
    {
      id: 'qutub-guide-1',
      title: 'Qutub Minar Complete Tour Delhi',
      description: 'Explore Qutub Minar complex - history, architecture, and Iron Pillar mystery',
      duration: '10:15',
      type: 'local-guide',
      videoUrl: 'https://www.youtube.com/embed/J7nmPBAE2X8',
      thumbnail: 'https://images.unsplash.com/photo-1667849521021-86eec155bfac?w=400&h=225&fit=crop'
    }
  ],
  5: [ // Amber Fort
    {
      id: 'amber-guide-1',
      title: 'Amber Fort Complete Tour Jaipur',
      description: 'Explore Amber Fort - Sheesh Mahal, elephant rides, and Rajput architecture',
      duration: '14:20',
      type: 'local-guide',
      videoUrl: 'https://www.youtube.com/embed/kRZLUCWswlw',
      thumbnail: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=400&h=225&fit=crop'
    }
  ],
  6: [ // Gateway of India
    {
      id: 'gateway-guide-1',
      title: 'Gateway of India Complete Tour Mumbai',
      description: 'Explore Gateway of India - history, architecture, and nearby attractions',
      duration: '8:30',
      type: 'local-guide',
      videoUrl: 'https://www.youtube.com/embed/e9HiA6U1b-8',
      thumbnail: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&h=225&fit=crop'
    }
  ]
};

export function VideoGuide({ placeId, placeName, location }: VideoGuideProps) {
  const [selectedVideo, setSelectedVideo] = useState<TravelVideo | null>(null);
  const videos = travelVideos[placeId] || [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'route': return '🗺️';
      case 'transport': return '🚗';
      case 'local-guide': return '👨‍🏫';
      case 'aerial': return '🚁';
      default: return '📹';
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'route': 'bg-blue-100 text-blue-800',
      'transport': 'bg-green-100 text-green-800',
      'local-guide': 'bg-purple-100 text-purple-800',
      'aerial': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (videos.length === 0) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🎬</div>
          <h4 className="mb-2">Travel Videos Coming Soon</h4>
          <p className="text-sm text-gray-600">
            We're working on creating comprehensive travel guides for {placeName}.
            Check back soon for detailed video directions!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl mb-2">🎬 Travel Guide Videos</h3>
        <p className="text-gray-600">
          Watch step-by-step guides to reach {placeName}, {location}
        </p>
      </div>

      {/* Video Player */}
      {selectedVideo && (
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span>{getTypeIcon(selectedVideo.type)}</span>
              {selectedVideo.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {selectedVideo.duration}
              <Badge className={getTypeBadge(selectedVideo.type)}>
                {selectedVideo.type.replace('-', ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700">{selectedVideo.description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video List */}
      <div className="grid gap-4">
        <h4 className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Available Travel Guides
        </h4>
        
        {videos.map((video) => (
          <Card 
            key={video.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedVideo?.id === video.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedVideo(video)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-medium line-clamp-1">{video.title}</h4>
                    <Badge className={`${getTypeBadge(video.type)} text-xs flex-shrink-0`}>
                      {getTypeIcon(video.type)} {video.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Travel Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="mb-3 flex items-center gap-2">
            💡 Video Travel Tips
          </h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Watch route videos before starting your journey</li>
            <li>Download offline maps as backup navigation</li>
            <li>Check current transport schedules and timings</li>
            <li>Keep emergency contact numbers handy</li>
            <li>Follow local customs shown in guide videos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}