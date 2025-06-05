
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

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

  const getTrendIcon = () => {
    // Simulation des tendances basée sur les données
    const score = freelancer.rating * 20;
    if (score > 95) return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (score < 85) return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <TrendingUp className="w-3 h-3 text-green-500" />;
  };

  const hasAlert = freelancer.rating < 4.5 || parseInt(freelancer.daysAgo) > 100;

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200 group overflow-hidden relative"
      onClick={onClick}
    >
      {hasAlert && (
        <div className="absolute top-2 right-2 z-10">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${getRankingColor(freelancer.ranking)} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                {freelancer.ranking}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">
                {freelancer.name}
              </h3>
              <p className="text-xs text-gray-500 truncate max-w-[120px]">{freelancer.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Métriques essentielles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span className="text-sm font-medium">{freelancer.rating}</span>
            <span className="text-xs text-gray-500">({freelancer.totalReviews})</span>
          </div>
          <Badge variant="outline" className="text-xs px-2 py-1">
            {freelancer.keyword}
          </Badge>
        </div>

        {/* Activité récente */}
        <div className="text-xs text-gray-500">
          Dernière activité : <span className="font-medium">{freelancer.daysAgo}j</span>
        </div>
      </CardContent>
    </Card>
  );
};
