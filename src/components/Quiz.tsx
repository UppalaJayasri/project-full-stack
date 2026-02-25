import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { CheckCircle2, XCircle, Trophy, BookOpen, Brain } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "In which year was the Taj Mahal completed?",
    options: ["1632", "1643", "1653", "1665"],
    correctAnswer: 2,
    explanation: "The Taj Mahal was completed in 1653, taking approximately 22 years to build. Construction began in 1632 under Emperor Shah Jahan.",
    category: "Mughal Architecture"
  },
  {
    id: 2,
    question: "Which Mughal emperor built the Red Fort in Delhi?",
    options: ["Akbar", "Shah Jahan", "Aurangzeb", "Jahangir"],
    correctAnswer: 1,
    explanation: "Emperor Shah Jahan built the Red Fort (Lal Qila) between 1638-1648 when he shifted his capital from Agra to Delhi.",
    category: "Historical Facts"
  },
  {
    id: 3,
    question: "How many UNESCO World Heritage Sites are featured in this collection?",
    options: ["5", "6", "8", "10"],
    correctAnswer: 2,
    explanation: "There are 8 UNESCO World Heritage Sites in our collection: Taj Mahal, Red Fort, Qutub Minar, Amber Fort, Ajanta Caves, Ellora Caves, Hampi, Konark Sun Temple, and Khajuraho Temples.",
    category: "UNESCO Sites"
  },
  {
    id: 4,
    question: "The Konark Sun Temple is designed in the shape of a:",
    options: ["Lotus Flower", "Chariot", "Peacock", "Elephant"],
    correctAnswer: 1,
    explanation: "The Konark Sun Temple is designed as a massive chariot with 24 elaborately carved stone wheels pulled by seven horses, representing the Sun God Surya's chariot.",
    category: "Architecture"
  },
  {
    id: 5,
    question: "Which architectural style does Hawa Mahal belong to?",
    options: ["Dravidian", "Indo-Islamic", "Rajput", "Gothic"],
    correctAnswer: 2,
    explanation: "Hawa Mahal (Palace of Winds) is built in Rajput architectural style with 953 small windows (jharokhas) made from red and pink sandstone.",
    category: "Architecture"
  },
  {
    id: 6,
    question: "Which of these sites is NOT a fort?",
    options: ["Amber Fort", "Red Fort", "Qutub Minar", "Gateway of India"],
    correctAnswer: 2,
    explanation: "Qutub Minar is a victory tower/minaret, not a fort. It's a 73-meter tall tower built of red sandstone and marble.",
    category: "Monument Types"
  },
  {
    id: 7,
    question: "The Golden Temple in Amritsar is the holiest shrine of which religion?",
    options: ["Hinduism", "Buddhism", "Sikhism", "Jainism"],
    correctAnswer: 2,
    explanation: "The Golden Temple (Harmandir Sahib) is the holiest shrine in Sikhism. It was completed in 1604 and welcomes people of all faiths.",
    category: "Religious Heritage"
  },
  {
    id: 8,
    question: "Hampi was the capital of which ancient empire?",
    options: ["Maurya Empire", "Gupta Empire", "Vijayanagara Empire", "Chola Empire"],
    correctAnswer: 2,
    explanation: "Hampi served as the capital of the Vijayanagara Empire from 1336-1565 CE. At its peak, it was one of the richest and largest cities in the world.",
    category: "Historical Facts"
  },
  {
    id: 9,
    question: "Which caves feature Buddhist, Hindu, and Jain monuments together?",
    options: ["Ajanta Caves", "Elephanta Caves", "Ellora Caves", "Badami Caves"],
    correctAnswer: 2,
    explanation: "Ellora Caves uniquely feature 34 caves representing three different religions - Buddhism, Hinduism, and Jainism - carved adjacent to each other, symbolizing religious harmony.",
    category: "Cultural Diversity"
  },
  {
    id: 10,
    question: "How many light bulbs illuminate Mysore Palace during festivals?",
    options: ["50,000", "75,000", "100,000", "150,000"],
    correctAnswer: 2,
    explanation: "Mysore Palace is illuminated with nearly 100,000 light bulbs every Sunday evening and during the 10-day Dasara festival, creating a spectacular sight.",
    category: "Festivals & Celebrations"
  }
];

interface QuizProps {
  onComplete?: (score: number, totalQuestions: number) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizQuestions.length).fill(false)
  );
  const [userAnswers, setUserAnswers] = useState<number[]>(
    new Array(quizQuestions.length).fill(-1)
  );

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    
    // Update score if this is the first time answering
    if (!answeredQuestions[currentQuestion]) {
      if (isCorrect) {
        setScore(score + 1);
      }
      const newAnswered = [...answeredQuestions];
      newAnswered[currentQuestion] = true;
      setAnsweredQuestions(newAnswered);
    }

    // Save user answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newUserAnswers);

    // Move to next question or show results
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
    } else {
      setShowResult(true);
      if (onComplete) {
        onComplete(isCorrect ? score + 1 : score, quizQuestions.length);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
    setUserAnswers(new Array(quizQuestions.length).fill(-1));
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];

  if (showResult) {
    const percentage = (score / quizQuestions.length) * 100;
    let message = '';
    let emoji = '';

    if (percentage >= 80) {
      message = 'Outstanding! You are a true Heritage Expert!';
      emoji = '🏆';
    } else if (percentage >= 60) {
      message = 'Great job! You have good knowledge of Indian heritage!';
      emoji = '🌟';
    } else if (percentage >= 40) {
      message = 'Good effort! Keep exploring to learn more!';
      emoji = '📚';
    } else {
      message = 'Keep learning! Visit more places to expand your knowledge!';
      emoji = '💡';
    }

    return (
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-3xl mb-2">Quiz Completed!</CardTitle>
          <CardDescription className="text-xl">{emoji} {message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">{score}/{quizQuestions.length}</div>
            <p className="text-xl text-gray-600">Questions Answered Correctly</p>
            <div className="mt-4">
              <Progress value={percentage} className="h-4" />
              <p className="text-sm text-gray-500 mt-2">{percentage.toFixed(0)}% Score</p>
            </div>
          </div>

          {/* Review Answers */}
          <div className="space-y-4 mt-8">
            <h3 className="text-center mb-4">Review Your Answers</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quizQuestions.map((q, index) => {
                const isCorrect = userAnswers[index] === q.correctAnswer;
                return (
                  <Card key={q.id} className={`border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="mb-2">{index + 1}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-1">
                            Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              {q.options[userAnswers[index]]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-700 mb-2">
                              Correct answer: {q.options[q.correctAnswer]}
                            </p>
                          )}
                          <p className="text-xs text-gray-600 italic">{q.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} size="lg" className="gap-2">
              <Brain className="w-5 h-5" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="text-sm">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Badge>
          <Badge className="bg-blue-600">
            {currentQ.category}
          </Badge>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        <CardTitle className="flex items-center gap-2 text-2xl">
          <BookOpen className="w-6 h-6" />
          Heritage Knowledge Quiz
        </CardTitle>
        <CardDescription>
          Test your knowledge about India's magnificent heritage sites
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
          <h3 className="text-xl mb-4">{currentQ.question}</h3>
          
          <RadioGroup 
            value={selectedAnswer?.toString()} 
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-blue-400 hover:bg-blue-50 ${
                    selectedAnswer === index 
                      ? 'border-blue-500 bg-blue-100' 
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Current Score Display */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span>Current Score: {score}/{currentQuestion + (answeredQuestions[currentQuestion] ? 1 : 0)}</span>
          </div>
          <div className="text-sm text-gray-600">
            {answeredQuestions.filter(a => a).length} answered
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="gap-2"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
