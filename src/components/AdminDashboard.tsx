import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Shield, 
  Trash2, 
  Edit,
  Plus,
  Crown,
  UserCheck,
  MessageSquare,
  Eye,
  LogOut,
  Home
} from 'lucide-react';
import { toast } from 'sonner';
import { FeedbackViewer } from './FeedbackViewer';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cultural-enthusiast' | 'user';
  joinedDate: string;
  quizScore?: number;
  interactions: number;
}

interface ContentItem {
  id: string;
  title: string;
  type: 'place' | 'article' | 'event';
  status: 'published' | 'draft';
  createdBy: string;
  createdDate: string;
}

interface Interaction {
  id: string;
  userId: string;
  userName: string;
  type: 'comment' | 'review' | 'question';
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Heritage Explorer',
      email: 'explorer@heritage.com',
      role: 'user',
      joinedDate: '2025-01-15',
      quizScore: 8,
      interactions: 5
    },
    {
      id: '2',
      name: 'Cultural Expert',
      email: 'expert@heritage.com',
      role: 'cultural-enthusiast',
      joinedDate: '2025-01-10',
      quizScore: 10,
      interactions: 25
    },
    {
      id: '3',
      name: 'History Buff',
      email: 'history@heritage.com',
      role: 'user',
      joinedDate: '2025-02-01',
      quizScore: 6,
      interactions: 3
    }
  ]);

  const [content, setContent] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Taj Mahal Virtual Tour',
      type: 'place',
      status: 'published',
      createdBy: 'Admin',
      createdDate: '2025-01-20'
    },
    {
      id: '2',
      title: 'Mughal Architecture Guide',
      type: 'article',
      status: 'published',
      createdBy: 'Cultural Expert',
      createdDate: '2025-01-25'
    },
    {
      id: '3',
      title: 'Heritage Festival 2025',
      type: 'event',
      status: 'draft',
      createdBy: 'Admin',
      createdDate: '2025-02-01'
    }
  ]);

  const [interactions, setInteractions] = useState<Interaction[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Heritage Explorer',
      type: 'comment',
      content: 'Amazing details about the Taj Mahal! Very informative.',
      date: '2025-02-03',
      status: 'approved'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Cultural Expert',
      type: 'review',
      content: 'The architectural analysis is excellent. I would add more about the Pietra Dura technique.',
      date: '2025-02-04',
      status: 'pending'
    },
    {
      id: '3',
      userId: '3',
      userName: 'History Buff',
      type: 'question',
      content: 'Are there guided tours available at Red Fort on weekdays?',
      date: '2025-02-05',
      status: 'pending'
    }
  ]);

  const [newUserDialog, setNewUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleRoleChange = (userId: string, newRole: 'admin' | 'cultural-enthusiast' | 'user') => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast.success(`User role updated to ${newRole.replace('-', ' ')}`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast.success('User deleted successfully');
  };

  const handleInteractionStatus = (interactionId: string, status: 'approved' | 'rejected') => {
    setInteractions(interactions.map(i => 
      i.id === interactionId ? { ...i, status } : i
    ));
    toast.success(`Interaction ${status}`);
  };

  const handleContentStatusChange = (contentId: string, status: 'published' | 'draft') => {
    setContent(content.map(c => 
      c.id === contentId ? { ...c, status } : c
    ));
    toast.success(`Content ${status}`);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-600" />;
      case 'cultural-enthusiast': return <Crown className="w-4 h-4 text-purple-600" />;
      default: return <UserCheck className="w-4 h-4 text-blue-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800 border-red-300',
      'cultural-enthusiast': 'bg-purple-100 text-purple-800 border-purple-300',
      user: 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[role as keyof typeof colors] || colors.user;
  };

  const stats = {
    totalUsers: users.length,
    culturalEnthusiasts: users.filter(u => u.role === 'cultural-enthusiast').length,
    totalContent: content.length,
    pendingInteractions: interactions.filter(i => i.status === 'pending').length,
    publishedContent: content.filter(c => c.status === 'published').length,
    averageQuizScore: Math.round(
      users.reduce((sum, u) => sum + (u.quizScore || 0), 0) / users.filter(u => u.quizScore).length
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl">Admin Dashboard</h1>
                <p className="text-gray-600">Manage content, users, and interactions</p>
              </div>
            </div>
            <Button 
              onClick={onLogout}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout & Switch Role
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl">{stats.totalUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Enthusiasts</p>
                    <p className="text-2xl">{stats.culturalEnthusiasts}</p>
                  </div>
                  <Crown className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Published</p>
                    <p className="text-2xl">{stats.publishedContent}</p>
                  </div>
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl">{stats.pendingInteractions}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Quiz Score</p>
                    <p className="text-2xl">{stats.averageQuizScore}/10</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Content</p>
                    <p className="text-2xl">{stats.totalContent}</p>
                  </div>
                  <FileText className="w-8 h-8 text-teal-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText className="w-4 h-4" />
              Content Management
            </TabsTrigger>
            <TabsTrigger value="interactions" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              User Interactions
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              User Feedback
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and assign roles</CardDescription>
                  </div>
                  <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a new user account</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Name</Label>
                          <Input placeholder="Enter name" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" placeholder="Enter email" />
                        </div>
                        <div>
                          <Label>Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="cultural-enthusiast">Cultural Enthusiast</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Create User</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Quiz Score</TableHead>
                      <TableHead>Interactions</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p>{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getRoleBadge(user.role)} border flex items-center gap-1 w-fit`}>
                            {getRoleIcon(user.role)}
                            {user.role.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.quizScore ? `${user.quizScore}/10` : 'N/A'}
                        </TableCell>
                        <TableCell>{user.interactions}</TableCell>
                        <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select 
                              value={user.role} 
                              onValueChange={(value: any) => handleRoleChange(user.id, value)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="cultural-enthusiast">Cultural Enthusiast</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Manage heritage site content and articles</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {content.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.createdBy}</TableCell>
                        <TableCell>{new Date(item.createdDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {item.status === 'draft' ? (
                              <Button 
                                size="sm"
                                onClick={() => handleContentStatusChange(item.id, 'published')}
                              >
                                Publish
                              </Button>
                            ) : (
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => handleContentStatusChange(item.id, 'draft')}
                              >
                                Unpublish
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interactions Tab */}
          <TabsContent value="interactions">
            <Card>
              <CardHeader>
                <CardTitle>User Interactions</CardTitle>
                <CardDescription>Moderate comments, reviews, and questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interactions.map((interaction) => (
                    <Card key={interaction.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{interaction.type}</Badge>
                              <span className="text-sm">{interaction.userName}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(interaction.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">{interaction.content}</p>
                            <div className="flex gap-2">
                              {interaction.status === 'pending' ? (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleInteractionStatus(interaction.id, 'approved')}
                                  >
                                    Approve
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleInteractionStatus(interaction.id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                </>
                              ) : (
                                <Badge className={
                                  interaction.status === 'approved' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }>
                                  {interaction.status}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab - Admin View Only */}
          <TabsContent value="feedback">
            <FeedbackViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
