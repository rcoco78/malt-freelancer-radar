
import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, Users, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FreelancerCard } from '@/components/FreelancerCard';
import { FreelancerModal } from '@/components/FreelancerModal';
import { StatsCards } from '@/components/StatsCards';
import { FilterPanel } from '@/components/FilterPanel';

// Mock data basé sur votre structure
const mockFreelancers = [
  {
    id: 1,
    name: "Nina",
    company: "Nina ALEM SEBBAGH",
    profileUrl: "https://www.malt.fr/profile/romaindufourt?q=scraping&searchid=6841d79c12ce7a79c9c24695",
    review: "Super collaboration ! Romain a tout de suite compris nos besoins sur le projet, a fait preuve de réactivité et a réalisé une super automatisation claire et détaillée. Je recommande et le contacterai pour de futurs projets !",
    reviewDate: "12/08/2024",
    daysAgo: "297",
    reviewLength: "223",
    totalReviews: "1",
    averageDaysBetweenReviews: "0",
    keyword: "scraping",
    ranking: "1",
    avatar: "/placeholder.svg",
    skills: ["Python", "Scraping", "Automation"],
    rating: 4.8,
    responseTime: "2h",
    completionRate: 98
  },
  {
    id: 2,
    name: "Alexandre Dubois",
    company: "Tech Solutions SARL",
    profileUrl: "https://www.malt.fr/profile/alexandre",
    review: "Excellent développeur, très professionnel et livraison dans les temps. Recommandé !",
    reviewDate: "15/09/2024",
    daysAgo: "263",
    reviewLength: "87",
    totalReviews: "15",
    averageDaysBetweenReviews: "18",
    keyword: "react",
    ranking: "2",
    avatar: "/placeholder.svg",
    skills: ["React", "TypeScript", "Node.js"],
    rating: 4.9,
    responseTime: "1h",
    completionRate: 100
  },
  {
    id: 3,
    name: "Marie Petit",
    company: "Design Studio",
    profileUrl: "https://www.malt.fr/profile/marie",
    review: "Créativité exceptionnelle et écoute client parfaite. Très satisfait du résultat final.",
    reviewDate: "03/10/2024",
    daysAgo: "245",
    reviewLength: "94",
    totalReviews: "8",
    averageDaysBetweenReviews: "31",
    keyword: "design",
    ranking: "3",
    avatar: "/placeholder.svg",
    skills: ["UI/UX", "Figma", "Photoshop"],
    rating: 4.7,
    responseTime: "3h",
    completionRate: 95
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('ranking');
  const [filters, setFilters] = useState({
    minRating: 0,
    skills: [],
    responseTime: 'all'
  });

  const filteredFreelancers = useMemo(() => {
    return mockFreelancers
      .filter(freelancer => {
        const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesRating = freelancer.rating >= filters.minRating;
        return matchesSearch && matchesRating;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'reviews':
            return parseInt(b.totalReviews) - parseInt(a.totalReviews);
          case 'ranking':
          default:
            return parseInt(a.ranking) - parseInt(b.ranking);
        }
      });
  }, [searchTerm, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FreelanceTracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {mockFreelancers.length} freelances analysés
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards freelancers={mockFreelancers} />

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou compétence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="ranking">Classement</option>
                <option value="rating">Note</option>
                <option value="reviews">Nombre d'avis</option>
              </select>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-300 hover:border-orange-500 hover:text-orange-600"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          {showFilters && (
            <FilterPanel 
              filters={filters} 
              onFiltersChange={setFilters}
              className="mt-6 pt-6 border-t border-gray-200" 
            />
          )}
        </div>

        {/* Freelancers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <FreelancerCard
              key={freelancer.id}
              freelancer={freelancer}
              onClick={() => setSelectedFreelancer(freelancer)}
            />
          ))}
        </div>

        {filteredFreelancers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun freelance trouvé</h3>
            <p className="text-gray-500">Essayez d'ajuster vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedFreelancer && (
        <FreelancerModal
          freelancer={selectedFreelancer}
          onClose={() => setSelectedFreelancer(null)}
        />
      )}
    </div>
  );
};

export default Index;
