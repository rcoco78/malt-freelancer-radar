
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Clock, Target, AlertTriangle } from 'lucide-react';
import { calculateMarketMetrics } from '@/services/marketAnalytics';

interface MarketDashboardProps {
  freelancers: any[];
  selectedKeyword: string;
}

export const MarketDashboard: React.FC<MarketDashboardProps> = ({ 
  freelancers, 
  selectedKeyword 
}) => {
  const marketMetrics = calculateMarketMetrics(freelancers, selectedKeyword);

  const getSaturationColor = (saturation: string) => {
    switch (saturation) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSaturationIcon = (saturation: string) => {
    switch (saturation) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      case 'low': return <TrendingUp className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Analyse Marché : {selectedKeyword}
        </h2>
        <Badge variant="outline" className={getSaturationColor(marketMetrics.marketSaturation)}>
          {getSaturationIcon(marketMetrics.marketSaturation)}
          <span className="ml-1">
            Saturation {marketMetrics.marketSaturation === 'low' ? 'Faible' : 
                     marketMetrics.marketSaturation === 'medium' ? 'Moyenne' : 'Élevée'}
          </span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span>TJM Médian</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {marketMetrics.medianTjm}€
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Pour le mot-clé "{selectedKeyword}"
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Temps Décollage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {marketMetrics.averageDaysToFirstMissions}j
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Avant 10 premières missions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Profils Actifs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {marketMetrics.activeProfiles}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Actifs derniers 30j
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span>Note Moyenne</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {marketMetrics.averageRating.toFixed(1)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Seuil top performer: {marketMetrics.topPerformersThreshold.toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Insights créatifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💡 Insights Marché</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">
                Les top 10% gagnent en moyenne {Math.round(marketMetrics.medianTjm * 1.4)}€/jour
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">
                {Math.round((marketMetrics.activeProfiles / freelancers.length) * 100)}% des profils sont actifs
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">
                Temps moyen de réponse estimé: {Math.round(marketMetrics.averageDaysToFirstMissions / 5)}h
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎯 Recommandations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketMetrics.marketSaturation === 'high' && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-800">
                  ⚠️ Marché saturé - Difficile de se démarquer
                </p>
              </div>
            )}
            {marketMetrics.marketSaturation === 'low' && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  🚀 Opportunité - Marché peu concurrentiel
                </p>
              </div>
            )}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                💰 TJM recommandé pour nouveaux: {Math.round(marketMetrics.medianTjm * 0.8)}€
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
