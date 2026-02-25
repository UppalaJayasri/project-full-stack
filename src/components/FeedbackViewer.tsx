import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, MessageCircle, TrendingUp, Users } from 'lucide-react';

interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  userType: string;
}

const allFeedbacks: Feedback[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing app! The travel videos helped me plan my Taj Mahal visit perfectly. The quiz was educational and fun!',
    date: '2 days ago',
    userType: 'Explorer'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    rating: 4,
    comment: 'Great collection of heritage sites. The interactive map is very useful. Would love to see more videos added.',
    date: '1 week ago',
    userType: 'Explorer'
  },
  {
    id: '3',
    name: 'Anita Patel',
    rating: 5,
    comment: 'Love the detailed information about each monument. The Cultural Enthusiast features are fantastic!',
    date: '2 weeks ago',
    userType: 'Cultural Enthusiast'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    rating: 4,
    comment: 'The quiz section is very informative. Learned so much about Indian heritage. Great work!',
    date: '3 weeks ago',
    userType: 'Explorer'
  },
  {
    id: '5',
    name: 'Meera Joshi',
    rating: 5,
    comment: 'Excellent app for heritage lovers. The video guides are very helpful for planning trips.',
    date: '1 month ago',
    userType: 'Explorer'
  }
];

export function FeedbackViewer() {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = (allFeedbacks.reduce((sum, f) => sum + f.rating, 0) / allFeedbacks.length).toFixed(1);
  const totalFeedbacks = allFeedbacks.length;
  const positiveRating = allFeedbacks.filter(f => f.rating >= 4).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">📊 User Feedback Dashboard</h2>
        <p className="text-gray-600">Monitor user satisfaction and app performance</p>
      </div>

      {/* Feedback Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold">{averageRating}</span>
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold">{totalFeedbacks}</span>
            </div>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold">{Math.round((positiveRating/totalFeedbacks)*100)}%</span>
            </div>
            <p className="text-sm text-gray-600">Positive Reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedbacks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent User Feedbacks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allFeedbacks.map((feedback) => (
            <div key={feedback.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-medium">{feedback.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {renderStars(feedback.rating)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feedback.userType}
                      </Badge>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{feedback.date}</span>
              </div>
              <p className="text-sm text-gray-700">{feedback.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feedback Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4">
          <h4 className="mb-3">💡 Key Insights</h4>
          <ul className="text-sm space-y-2">
            <li>• Users love the travel video guides feature</li>
            <li>• Quiz section is highly appreciated for learning</li>
            <li>• Interactive map receives positive feedback</li>
            <li>• Request for more heritage sites and videos</li>
            <li>• Cultural Enthusiast features are well-received</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}