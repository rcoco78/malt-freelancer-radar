
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Données simulées pour les graphiques
const performanceData = [
  { date: '01/12', rating: 4.2, reviews: 8, activeFreelancers: 245 },
  { date: '02/12', rating: 4.3, reviews: 12, activeFreelancers: 267 },
  { date: '03/12', rating: 4.5, reviews: 15, activeFreelancers: 289 },
  { date: '04/12', rating: 4.4, reviews: 18, activeFreelancers: 301 },
  { date: '05/12', rating: 4.6, reviews: 22, activeFreelancers: 324 },
  { date: '06/12', rating: 4.7, reviews: 28, activeFreelancers: 342 },
];

const topSkillsData = [
  { skill: 'React', freelancers: 45, avgRating: 4.8 },
  { skill: 'Python', freelancers: 38, avgRating: 4.6 },
  { skill: 'UI/UX', freelancers: 32, avgRating: 4.7 },
  { skill: 'Node.js', freelancers: 29, avgRating: 4.5 },
  { skill: 'Figma', freelancers: 25, avgRating: 4.9 },
];

interface DashboardProps {
  freelancers: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ freelancers }) => {
  const chartConfig = {
    rating: {
      label: "Note moyenne",
      color: "#f97316",
    },
    reviews: {
      label: "Nouveaux avis",
      color: "#06b6d4",
    },
    activeFreelancers: {
      label: "Freelancers actifs",
      color: "#10b981",
    },
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span>Évolution des notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[4.0, 5.0]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke={chartConfig.rating.color}
                      strokeWidth={2}
                      dot={{ fill: chartConfig.rating.color, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span>Activité des freelancers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <AreaChart data={performanceData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="activeFreelancers" 
                      stroke={chartConfig.activeFreelancers.color}
                      fill={chartConfig.activeFreelancers.color}
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendances hebdomadaires</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <AreaChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="reviews" 
                    stroke={chartConfig.reviews.color}
                    fill={chartConfig.reviews.color}
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Compétences</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={topSkillsData}>
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="freelancers" fill="#f97316" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <h4 className="font-medium text-amber-900">Freelancers inactifs</h4>
                    <p className="text-sm text-amber-700">3 freelancers n'ont pas eu d'activité depuis plus de 60 jours</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">3</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-red-900">Baisse de performance</h4>
                    <p className="text-sm text-red-700">2 freelancers ont vu leur note moyenne diminuer cette semaine</p>
                  </div>
                  <Badge variant="destructive" className="ml-auto">2</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-900">Nouveaux top performers</h4>
                    <p className="text-sm text-green-700">5 freelancers ont rejoint le top 10 cette semaine</p>
                  </div>
                  <Badge className="ml-auto bg-green-600">5</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
