
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface FreelancerCardProps {
  freelancer: any;
  onClick: () => void;
}

export const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer, onClick }) => {
  const getRankingColor = (ranking: string) => {
    const rank = parseInt(ranking);
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (rank <= 3) return 'bg-gradient-to-r from-orange-400 to-red-500';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const getPerformanceScore = () => {
    const score = (freelancer.rating * 20) + (freelancer.completionRate * 0.8);
    return Math.min(100, Math.round(score));
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200 group overflow-hidden"
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              />
              <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getRankingColor(freelancer.ranking)} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                #{freelancer.ranking}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {freelancer.name}
              </h3>
              <p className="text-sm text-gray-500">{freelancer.company}</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
          >
            {getPerformanceScore()}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {freelancer.skills.slice(0, 3).map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs border-gray-300">
              {skill}
            </Badge>
          ))}
          {freelancer.skills.length > 3 && (
            <Badge variant="outline" className="text-xs border-gray-300">
              +{freelancer.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{freelancer.rating}</span>
            <span className="text-gray-500">({freelancer.totalReviews})</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">{freelancer.responseTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">{freelancer.completionRate}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-gray-600">{freelancer.keyword}</span>
          </div>
        </div>

        {/* Last review preview */}
        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-orange-500">
          <p className="text-xs text-gray-600 line-clamp-2">
            "{freelancer.review.substring(0, 80)}..."
          </p>
          <p className="text-xs text-gray-400 mt-1">Il y a {freelancer.daysAgo} jours</p>
        </div>
      </CardContent>
    </Card>
  );
};
