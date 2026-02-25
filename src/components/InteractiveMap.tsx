import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Navigation, Plane, Train, Bus, Car, ZoomIn, ZoomOut, Info } from 'lucide-react';
import { places, Place } from './PlacesGallery';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface InteractiveMapProps {
  selectedPlace?: Place | null;
  onPlaceSelect?: (place: Place) => void;
}

export function InteractiveMap({ selectedPlace, onPlaceSelect }: InteractiveMapProps) {
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="w-3 h-3" />;
      case 'train': return <Train className="w-3 h-3" />;
      case 'bus': return <Bus className="w-3 h-3" />;
      case 'auto': return <Car className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.8));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Interactive Heritage Map of India
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[3/4] rounded-lg border-2 border-gray-300 overflow-hidden shadow-lg">
          {/* Real India Map Background Image */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              transform: `scale(${zoomLevel})`, 
              transition: 'transform 0.3s ease',
              transformOrigin: 'center center'
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1546833998-07256bcc76ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMG1hcCUyMGdlb2dyYXBoaWNhbHxlbnwxfHx8fDE3NjIyNzMxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="India Map"
              className="w-full h-full object-cover"
            />
            {/* Semi-transparent overlay for better marker visibility */}
            <div className="absolute inset-0 bg-white/20"></div>
          </div>

          {/* Route lines SVG overlay - only shown when a place is selected */}
          {selectedPlace && (
            <svg 
              viewBox="0 0 100 120" 
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
              style={{ 
                transform: `scale(${zoomLevel})`, 
                transition: 'transform 0.3s ease',
                transformOrigin: 'center center',
                zIndex: 5
              }}
            >
              {places.map((place) => {
                if (place.id === selectedPlace.id) return null;
                
                const distance = Math.sqrt(
                  Math.pow(place.coordinates.x - selectedPlace.coordinates.x, 2) + 
                  Math.pow(place.coordinates.y - selectedPlace.coordinates.y, 2)
                );
                
                // Show routes to nearby places (within reasonable distance)
                if (distance < 30) {
                  return (
                    <g key={`route-${place.id}`}>
                      <line
                        x1={selectedPlace.coordinates.x}
                        y1={selectedPlace.coordinates.y}
                        x2={place.coordinates.x}
                        y2={place.coordinates.y}
                        stroke="#F59E0B"
                        strokeWidth="0.8"
                        strokeDasharray="3,3"
                        opacity="0.8"
                      />
                    </g>
                  );
                }
                return null;
              })}
            </svg>
          )}

          {/* Place Markers */}
          {places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;
            const isHovered = hoveredPlace?.id === place.id;
            const isActive = isSelected || isHovered;

            return (
              <button
                key={place.id}
                className="absolute group transition-all duration-200"
                style={{
                  left: `${place.coordinates.x}%`,
                  top: `${place.coordinates.y}%`,
                  transform: `translate(-50%, -50%) scale(${zoomLevel})`,
                  zIndex: isActive ? 30 : 10
                }}
                onClick={() => onPlaceSelect?.(place)}
                onMouseEnter={() => setHoveredPlace(place)}
                onMouseLeave={() => setHoveredPlace(null)}
              >
                {/* Marker Container */}
                <div className="relative">
                  {/* Pulse animation for selected */}
                  {isSelected && (
                    <div className="absolute inset-0 w-10 h-10 -translate-x-1 -translate-y-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    </div>
                  )}

                  {/* Main Marker Pin */}
                  <div 
                    className={`
                      relative w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-200 shadow-lg
                      ${isSelected 
                        ? 'bg-red-600 scale-150 ring-4 ring-red-300 animate-bounce' 
                        : isHovered
                        ? 'bg-orange-500 scale-125 ring-3 ring-orange-200'
                        : 'bg-blue-600 hover:bg-blue-700 hover:scale-110 ring-2 ring-blue-200'
                      }
                    `}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </div>

                  {/* UNESCO Badge on marker */}
                  {place.unescoCite && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs">★</span>
                    </div>
                  )}

                  {/* Enhanced Tooltip */}
                  <div 
                    className={`
                      absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                      transition-all duration-200 pointer-events-none
                      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    `}
                  >
                    <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl whitespace-nowrap min-w-[200px]">
                      <div className="mb-1">{place.name}</div>
                      <div className="text-xs text-gray-300 mb-2">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {place.location}, {place.state}
                      </div>
                      
                      {/* Transport icons in tooltip */}
                      <div className="flex gap-2 items-center border-t border-gray-700 pt-2">
                        <span className="text-xs text-gray-400">Transport:</span>
                        {place.transport.filter(t => t.available).map((transport, idx) => (
                          <div 
                            key={idx}
                            className="bg-gray-800 p-1 rounded"
                            title={transport.type}
                          >
                            {getTransportIcon(transport.type)}
                          </div>
                        ))}
                      </div>
                      
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-gray-900" />
                    </div>
                  </div>

                  {/* Place Label - shown for selected place */}
                  {isSelected && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-full shadow-lg border-2 border-red-500 whitespace-nowrap">
                      <span className="text-sm">{place.name}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200">
            <h4 className="mb-3 text-sm">Map Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <span>Heritage Site</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <span>Selected Site</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full border border-white flex items-center justify-center">
                  <span className="text-xs">★</span>
                </div>
                <span>UNESCO Site</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-orange-500 border-dashed border-t-2 border-orange-500"></div>
                <span>Route</span>
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200">
            <h4 className="mb-3 text-sm">Quick Stats</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Total Sites:</span>
                <span>{places.length}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">UNESCO Sites:</span>
                <span className="text-blue-600">{places.filter(p => p.unescoCite).length}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">States Covered:</span>
                <span className="text-green-600">{new Set(places.map(p => p.state)).size}</span>
              </div>
            </div>
          </div>

          {/* Transport Legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-gray-200">
            <h4 className="mb-2 text-xs">Transport</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Plane className="w-3 h-3 text-blue-600" />
                <span>Flight</span>
              </div>
              <div className="flex items-center gap-1">
                <Train className="w-3 h-3 text-green-600" />
                <span>Train</span>
              </div>
              <div className="flex items-center gap-1">
                <Bus className="w-3 h-3 text-orange-600" />
                <span>Bus</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="w-3 h-3 text-purple-600" />
                <span>Auto/Taxi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Place Detailed Info */}
        {selectedPlace && (
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg border-2 border-blue-200 shadow-lg">
            {/* Place Image */}
            <div className="mb-4 rounded-lg overflow-hidden shadow-md">
              <ImageWithFallback
                src={selectedPlace.imageUrl}
                alt={selectedPlace.name}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3>{selectedPlace.name}</h3>
                  {selectedPlace.unescoCite && (
                    <Badge className="bg-blue-600 text-xs">UNESCO World Heritage</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {selectedPlace.location}, {selectedPlace.state}
                </p>
                <p className="text-xs text-gray-500 mb-3">Built: {selectedPlace.yearBuilt}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                About {selectedPlace.name}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedPlace.description}
              </p>
            </div>

            {/* Transport Options for Selected Place */}
            <div className="border-t border-gray-300 pt-4">
              <h4 className="mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                How to Reach
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {selectedPlace.transport.map((transport, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-lg border-2 ${
                      transport.available 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-gray-100 border-gray-300 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded ${
                        transport.available ? 'bg-green-200' : 'bg-gray-300'
                      }`}>
                        {getTransportIcon(transport.type)}
                      </div>
                      <span className="text-sm capitalize">{transport.type}</span>
                    </div>
                    <Badge 
                      variant={transport.available ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {transport.available ? 'Available' : 'N/A'}
                    </Badge>
                    {transport.available && transport.nearestHub && (
                      <p className="text-xs text-gray-600 mt-1">
                        {transport.nearestHub}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Visiting Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 border-t border-gray-300 pt-4">
              <div className="bg-white p-3 rounded-lg">
                <span className="text-xs text-gray-600">Best Time to Visit</span>
                <p className="text-sm">{selectedPlace.bestTimeToVisit}</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <span className="text-xs text-gray-600">Entry Fee</span>
                <p className="text-sm">{selectedPlace.entryFee}</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <span className="text-xs text-gray-600">Timings</span>
                <p className="text-sm">{selectedPlace.timings}</p>
              </div>
            </div>
          </div>
        )}

        {/* Region-wise Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="text-2xl mb-1">{places.filter(p => p.state === 'Delhi').length}</div>
            <div className="text-xs text-gray-600">Delhi</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="text-2xl mb-1">{places.filter(p => p.state === 'Rajasthan').length}</div>
            <div className="text-xs text-gray-600">Rajasthan</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="text-2xl mb-1">{places.filter(p => p.state === 'Maharashtra').length}</div>
            <div className="text-xs text-gray-600">Maharashtra</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="text-2xl mb-1">{places.filter(p => p.state === 'Karnataka').length}</div>
            <div className="text-xs text-gray-600">Karnataka</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200">
            <div className="text-2xl mb-1">{places.filter(p => ['Uttar Pradesh', 'Punjab', 'West Bengal', 'Odisha', 'Telangana', 'Madhya Pradesh'].includes(p.state)).length}</div>
            <div className="text-xs text-gray-600">Others</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
