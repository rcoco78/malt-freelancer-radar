
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Star, Clock } from 'lucide-react';

interface StatsCardsProps {
  freelancers: any[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ freelancers }) => {
  const totalFreelancers = freelancers.length;
  const averageRating = freelancers.reduce((acc, f) => acc + f.rating, 0) / freelancers.length;
  const totalReviews = freelancers.reduce((acc, f) => acc + parseInt(f.totalReviews), 0);
  const topPerformers = freelancers.filter(f => f.rating >= 4.8).length;

  const stats = [
    {
      title: "Total Freelances",
      value: totalFreelancers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeColor: "text-blue-600"
    },
    {
      title: "Note Moyenne",
      value: averageRating.toFixed(1),
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "+0.2",
      changeColor: "text-yellow-600"
    },
    {
      title: "Total Avis",
      value: totalReviews,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+25%",
      changeColor: "text-green-600"
    },
    {
      title: "Top Performers",
      value: topPerformers,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+3",
      changeColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.changeColor} flex items-center mt-1`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
