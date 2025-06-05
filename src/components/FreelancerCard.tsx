
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, TrendingDown, AlertTriangle, Crown, Zap, DollarSign } from 'lucide-react';
import { compareFreelancerToMarket, type MarketMetrics } from '@/services/marketAnalytics';

interface FreelancerCardProps {
  freelancer: any;
  onClick: () => void;
  marketMetrics: MarketMetrics;
}

export const FreelancerCard: React.FC<FreelancerCardProps> = ({ 
  freelancer, 
  onClick, 
  marketMetrics 
}) => {
  const comparison = compareFreelancerToMarket(freelancer, marketMetrics);
  
  const getRankingColor = (ranking: string) => {
    const rank = parseInt(ranking);
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (rank <= 3) return 'bg-gradient-to-r from-orange-400 to-red-500';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const getPositionBadge = () => {
    if (comparison.marketPosition === 'top-10') {
      return <Badge className="bg-yellow-500 text-white text-xs"><Crown className="w-3 h-3 mr-1" />Top 10</Badge>;
    }
    if (comparison.isTopPerformer) {
      return <Badge className="bg-green-500 text-white text-xs"><Zap className="w-3 h-3 mr-1" />Star</Badge>;
    }
    return null;
  };

  const getComparisonIcon = (comparison: 'above' | 'below' | 'average') => {
    if (comparison === 'above') return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (comparison === 'below') return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
  };

  // Calcul TJM estimé
  const baseRate = 400;
  const ratingMultiplier = freelancer.rating / 4.0;
  const rankingBonus = Math.max(0, (10 - parseInt(freelancer.ranking)) * 50);
  const estimatedTjm = Math.round(baseRate * ratingMultiplier + rankingBonus);

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
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              />
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getRankingColor(freelancer.ranking)} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                {freelancer.ranking}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">
                {freelancer.name}
              </h3>
              <p className="text-xs text-gray-500 truncate max-w-[100px]">{freelancer.company}</p>
            </div>
          </div>
          {getPositionBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Métriques vs marché */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-sm font-medium">{freelancer.rating}</span>
              {getComparisonIcon(comparison.ratingVsMarket)}
            </div>
            <span className="text-xs text-gray-500">vs {marketMetrics.averageRating.toFixed(1)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-3 h-3 text-green-500" />
              <span className="text-sm font-medium">{estimatedTjm}€</span>
              {getComparisonIcon(comparison.tjmVsMarket)}
            </div>
            <span className="text-xs text-gray-500">vs {marketMetrics.medianTjm}€</span>
          </div>
        </div>

        {/* Compétence principale */}
        <Badge variant="outline" className="text-xs px-2 py-1 w-fit">
          {freelancer.keyword}
        </Badge>

        {/* Activité récente */}
        <div className="text-xs text-gray-500">
          Dernière activité : <span className="font-medium">{freelancer.daysAgo}j</span>
        </div>
      </CardContent>
    </Card>
  );
};
