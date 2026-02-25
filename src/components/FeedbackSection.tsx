import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Star, Send, Heart, ThumbsUp, MessageSquare, Reply } from 'lucide-react';

interface FeedbackSectionProps {
  userName: string;
}

interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Comment {
  id: string;
  name: string;
  message: string;
  date: string;
  replies?: Comment[];
}

const sampleComments: Comment[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    message: 'Just visited Taj Mahal using the travel videos from this app. Super helpful! The route guide saved me so much time.',
    date: '3 hours ago',
    replies: [
      {
        id: '1-1',
        name: 'Priya Singh',
        message: 'Which video did you find most useful? Planning my trip next week!',
        date: '2 hours ago'
      }
    ]
  },
  {
    id: '2',
    name: 'Kavya Sharma',
    message: 'The quiz section is amazing! Learned so much about Indian heritage. My score improved from 6 to 9!',
    date: '1 day ago'
  },
  {
    id: '3',
    name: 'Rohit Kumar',
    message: 'Love the interactive map feature. Makes planning heritage tours so much easier. Great work team!',
    date: '2 days ago',
    replies: [
      {
        id: '3-1',
        name: 'Heritage Explorer',
        message: 'Thanks! Which heritage site are you planning to visit next?',
        date: '1 day ago'
      }
    ]
  }
];

const sampleFeedbacks: Feedback[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing app! The travel videos helped me plan my Taj Mahal visit perfectly. The quiz was educational and fun!',
    date: '2 days ago'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    rating: 4,
    comment: 'Great collection of heritage sites. The interactive map is very useful. Would love to see more videos added.',
    date: '1 week ago'
  },
  {
    id: '3',
    name: 'Anita Patel',
    rating: 5,
    comment: 'Love the detailed information about each monument. The Cultural Enthusiast features are fantastic!',
    date: '2 weeks ago'
  }
];

export function FeedbackSection({ userName }: FeedbackSectionProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(sampleFeedbacks);
  const [submitted, setSubmitted] = useState(false);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmit = () => {
    if (rating > 0 && comment.trim()) {
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        name: userName,
        rating,
        comment: comment.trim(),
        date: 'Just now'
      };
      setFeedbacks([newFeedback, ...feedbacks]);
      setRating(0);
      setComment('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        name: userName,
        message: newComment.trim(),
        date: 'Just now'
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleReplySubmit = (commentId: string) => {
    if (replyText.trim()) {
      const reply: Comment = {
        id: `${commentId}-${Date.now()}`,
        name: userName,
        message: replyText.trim(),
        date: 'Just now'
      };
      setComments(comments.map(c => 
        c.id === commentId 
          ? { ...c, replies: [...(c.replies || []), reply] }
          : c
      ));
      setReplyText('');
      setReplyTo(null);
    }
  };

  const renderStars = (count: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < count 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl mb-2">💬 User Feedback</h3>
        <p className="text-gray-600">Share your experience with Indian Heritage Explorer</p>
      </div>

      {/* Submit Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Share Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Rate your experience:</label>
            <div className="flex gap-1">
              {renderStars(rating, true)}
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-2">Your feedback:</label>
            <Textarea
              placeholder="Tell us what you loved about the app, suggestions for improvement, or your heritage exploration experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={rating === 0 || !comment.trim()}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </Button>

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-sm">✅ Thank you for your feedback! It helps us improve the app.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Display Feedbacks */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          What Users Are Saying
        </h4>
        
        {feedbacks.map((feedback) => (
          <Card key={feedback.id} className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-medium">{feedback.name}</h5>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feedback.rating}/5
                    </Badge>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{feedback.date}</span>
              </div>
              <p className="text-sm text-gray-700">{feedback.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            Community Comments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Comment */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <label className="block text-sm mb-2">Share your thoughts:</label>
            <Textarea
              placeholder="Ask questions, share experiences, or discuss heritage sites with the community..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
            />
            <Button 
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
              size="sm"
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Post Comment
            </Button>
          </div>

          {/* Display Comments */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {comment.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">{comment.name}</h5>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="gap-1"
                  >
                    <Reply className="w-3 h-3" />
                    Reply
                  </Button>
                </div>
                <p className="text-sm text-gray-700 mb-3">{comment.message}</p>
                
                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-6 space-y-3 border-l-2 border-gray-200 pl-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-purple-600">
                              {reply.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{reply.name}</span>
                          <span className="text-xs text-gray-500">{reply.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                {replyTo === comment.id && (
                  <div className="ml-6 mt-3 border-l-2 border-blue-200 pl-4">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="mb-2"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => handleReplySubmit(comment.id)}
                        disabled={!replyText.trim()}
                      >
                        Reply
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setReplyTo(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* App Stats */}
      <Card className="bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200">
        <CardContent className="p-4">
          <h4 className="mb-3 text-center">📊 App Statistics</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">4.8</div>
              <p className="text-xs text-gray-600">Average Rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">1.2K+</div>
              <p className="text-xs text-gray-600">Happy Users</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">15</div>
              <p className="text-xs text-gray-600">Heritage Sites</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}