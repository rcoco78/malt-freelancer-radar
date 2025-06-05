
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Clock, CheckCircle, TrendingUp, Calendar, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FreelancerModalProps {
  freelancer: any;
  onClose: () => void;
}

export const FreelancerModal: React.FC<FreelancerModalProps> = ({ freelancer, onClose }) => {
  const getPerformanceScore = () => {
    const score = (freelancer.rating * 20) + (freelancer.completionRate * 0.8);
    return Math.min(100, Math.round(score));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-12 h-12 rounded-full border-2 border-orange-200"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{freelancer.name}</h2>
              <p className="text-gray-600">{freelancer.company}</p>
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white ml-auto">
              Classement #{freelancer.ranking}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Performance Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span>Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{freelancer.rating}</p>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{freelancer.responseTime}</p>
                    <p className="text-sm text-gray-600">Temps de réponse</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{freelancer.completionRate}%</p>
                    <p className="text-sm text-gray-600">Taux de réussite</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{freelancer.totalReviews}</p>
                    <p className="text-sm text-gray-600">Avis clients</p>
                  </div>
                </div>
                
                {/* Performance Score */}
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Score de performance global</span>
                    <span className="text-2xl font-bold text-orange-600">{getPerformanceScore()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getPerformanceScore()}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Latest Review */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span>Dernier avis client</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-gray-700 mb-3">"{freelancer.review}"</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{freelancer.reviewDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Longueur:</span>
                      <Badge variant="outline">{freelancer.reviewLength} caractères</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Compétences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mot-clé principal</span>
                  <Badge variant="outline">{freelancer.keyword}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière activité</span>
                  <span className="font-medium">{freelancer.daysAgo} jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fréquence d'avis</span>
                  <span className="font-medium">{freelancer.averageDaysBetweenReviews} jours</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Voir le profil complet</h3>
                <p className="text-sm opacity-90 mb-4">Accédez au profil Malt pour plus de détails</p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white text-orange-600 hover:bg-gray-100"
                  onClick={() => window.open(freelancer.profileUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ouvrir sur Malt
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
