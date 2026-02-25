import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Crown, 
  Award, 
  BookOpen, 
  MessageSquare, 
  Star, 
  Trophy,
  Share2,
  Users,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

interface Contribution {
  id: string;
  title: string;
  type: 'article' | 'review' | 'guide';
  status: 'published' | 'pending';
  likes: number;
  date: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  earned: boolean;
  earnedDate?: string;
}

export function CulturalEnthusiastSection() {
  const [contributions] = useState<Contribution[]>([
    {
      id: '1',
      title: 'Complete Guide to Mughal Architecture',
      type: 'guide',
      status: 'published',
      likes: 124,
      date: '2025-01-20'
    },
    {
      id: '2',
      title: 'Taj Mahal: Beyond the Beauty',
      type: 'article',
      status: 'published',
      likes: 89,
      date: '2025-01-25'
    },
    {
      id: '3',
      title: 'Exploring Hampi Ruins',
      type: 'review',
      status: 'pending',
      likes: 0,
      date: '2025-02-05'
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Heritage Expert',
      description: 'Complete all 10 quiz questions with 100% accuracy',
      icon: Trophy,
      earned: true,
      earnedDate: '2025-01-15'
    },
    {
      id: '2',
      title: 'Content Creator',
      description: 'Publish 5 articles or guides',
      icon: BookOpen,
      earned: true,
      earnedDate: '2025-01-28'
    },
    {
      id: '3',
      title: 'Community Leader',
      description: 'Get 100 likes on your contributions',
      icon: Star,
      earned: true,
      earnedDate: '2025-02-01'
    },
    {
      id: '4',
      title: 'Site Reviewer',
      description: 'Visit and review 10 heritage sites',
      icon: Award,
      earned: false
    },
    {
      id: '5',
      title: 'Cultural Ambassador',
      description: 'Help 50 users with their questions',
      icon: Users,
      earned: false
    }
  ]);

  const stats = {
    totalContributions: contributions.length,
    publishedContributions: contributions.filter(c => c.status === 'published').length,
    totalLikes: contributions.reduce((sum, c) => sum + c.likes, 0),
    achievementsEarned: achievements.filter(a => a.earned).length,
    totalAchievements: achievements.length,
    rank: 'Gold Contributor'
  };

  const handleSubmitContribution = () => {
    toast.success('Your contribution has been submitted for review!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl mb-2">Cultural Enthusiast Portal</h1>
              <p className="text-purple-100">Share your knowledge and passion for Indian heritage</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Rank</p>
                  <p className="text-2xl">{stats.rank}</p>
                </div>
                <Crown className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Contributions</p>
                  <p className="text-2xl">{stats.publishedContributions}/{stats.totalContributions}</p>
                </div>
                <BookOpen className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Likes</p>
                  <p className="text-2xl">{stats.totalLikes}</p>
                </div>
                <Star className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Achievements</p>
                  <p className="text-2xl">{stats.achievementsEarned}/{stats.totalAchievements}</p>
                </div>
                <Trophy className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="contribute" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="contribute" className="gap-2">
              <Share2 className="w-4 h-4" />
              Contribute
            </TabsTrigger>
            <TabsTrigger value="my-content" className="gap-2">
              <BookOpen className="w-4 h-4" />
              My Content
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Contribute Tab */}
          <TabsContent value="contribute">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit an Article</CardTitle>
                  <CardDescription>Share your knowledge about heritage sites</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Article Title</Label>
                    <Input placeholder="Enter article title" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input placeholder="e.g., Architecture, History, Culture" />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea 
                      placeholder="Write your article content here..." 
                      className="min-h-[200px]"
                    />
                  </div>
                  <Button className="w-full gap-2" onClick={handleSubmitContribution}>
                    <Share2 className="w-4 h-4" />
                    Submit Article
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                  <CardDescription>Share your experience visiting a heritage site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Heritage Site</Label>
                    <Input placeholder="Select or type site name" />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button key={star} variant="outline" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Your Review</Label>
                    <Textarea 
                      placeholder="Share your experience..." 
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button className="w-full gap-2" onClick={handleSubmitContribution}>
                    <MessageSquare className="w-4 h-4" />
                    Submit Review
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Tips */}
            <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Contribution Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Ensure all information is accurate and well-researched</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Include historical facts, architectural details, and cultural significance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Add personal insights and unique perspectives from your visits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Maintain respectful and educational tone throughout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All submissions are reviewed by admins before publication</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Content Tab */}
          <TabsContent value="my-content">
            <Card>
              <CardHeader>
                <CardTitle>Your Contributions</CardTitle>
                <CardDescription>Track your published articles, reviews, and guides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <Card key={contribution.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4>{contribution.title}</h4>
                              <Badge variant="outline" className="capitalize">
                                {contribution.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(contribution.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {contribution.likes} likes
                              </span>
                              <Badge className={
                                contribution.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-orange-100 text-orange-800'
                              }>
                                {contribution.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Unlock badges by contributing to the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <Card 
                        key={achievement.id}
                        className={`${
                          achievement.earned 
                            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300' 
                            : 'bg-gray-50 opacity-60'
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                              achievement.earned 
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                                : 'bg-gray-300'
                            }`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="mb-2">{achievement.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                            {achievement.earned ? (
                              <Badge className="bg-green-600">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Earned {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()}
                              </Badge>
                            ) : (
                              <Badge variant="outline">Locked</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
