
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, className }) => {
  const skills = ['Python', 'React', 'TypeScript', 'Node.js', 'UI/UX', 'Figma', 'Photoshop', 'Scraping', 'Automation'];
  
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s: string) => s !== skill)
      : [...filters.skills, skill];
    updateFilter('skills', newSkills);
  };

  const clearFilters = () => {
    onFiltersChange({
      minRating: 0,
      skills: [],
      responseTime: 'all'
    });
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Filtres avancés</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="w-4 h-4 mr-1" />
          Effacer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note minimum
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => updateFilter('minRating', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value={0}>Toutes les notes</option>
            <option value={4.0}>4.0+ ⭐</option>
            <option value={4.5}>4.5+ ⭐</option>
            <option value={4.8}>4.8+ ⭐</option>
          </select>
        </div>

        {/* Response Time Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temps de réponse
          </label>
          <select
            value={filters.responseTime}
            onChange={(e) => updateFilter('responseTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous</option>
            <option value="1h">Moins d'1 heure</option>
            <option value="3h">Moins de 3 heures</option>
            <option value="24h">Moins de 24 heures</option>
          </select>
        </div>

        {/* Skills Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compétences ({filters.skills.length} sélectionnées)
          </label>
          <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant={filters.skills.includes(skill) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.skills.includes(skill)
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                }`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
