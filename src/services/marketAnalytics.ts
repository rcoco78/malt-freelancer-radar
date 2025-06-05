
export interface MarketMetrics {
  averageRating: number;
  medianTjm: number;
  averageDaysToFirstMissions: number;
  activeProfiles: number;
  topPerformersThreshold: number;
  marketSaturation: 'low' | 'medium' | 'high';
}

export interface FreelancerComparison {
  ratingVsMarket: 'above' | 'below' | 'average';
  tjmVsMarket: 'above' | 'below' | 'average';
  isTopPerformer: boolean;
  marketPosition: 'top-10' | 'top-25' | 'average' | 'below-average';
}

export const calculateMarketMetrics = (freelancers: any[], keyword: string): MarketMetrics => {
  const keywordFreelancers = freelancers.filter(f => 
    f.keyword === keyword || f.skills.some((skill: string) => 
      skill.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  const ratings = keywordFreelancers.map(f => f.rating);
  const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  // Simulation TJM basée sur rating et ranking
  const tjms = keywordFreelancers.map(f => {
    const baseRate = 400;
    const ratingMultiplier = f.rating / 4.0;
    const rankingBonus = Math.max(0, (10 - parseInt(f.ranking)) * 50);
    return Math.round(baseRate * ratingMultiplier + rankingBonus);
  });
  
  const sortedTjms = tjms.sort((a, b) => a - b);
  const medianTjm = sortedTjms[Math.floor(sortedTjms.length / 2)];

  // Simulation jours avant premières missions
  const averageDaysToFirstMissions = Math.round(
    keywordFreelancers.reduce((acc, f) => {
      const simulatedDays = Math.max(5, 30 - (f.rating - 4.0) * 50);
      return acc + simulatedDays;
    }, 0) / keywordFreelancers.length
  );

  const activeProfiles = keywordFreelancers.filter(f => 
    parseInt(f.daysAgo) < 30
  ).length;

  const topPerformersThreshold = averageRating + 0.3;
  
  const saturationRatio = activeProfiles / keywordFreelancers.length;
  const marketSaturation: 'low' | 'medium' | 'high' = 
    saturationRatio > 0.7 ? 'high' : saturationRatio > 0.4 ? 'medium' : 'low';

  return {
    averageRating,
    medianTjm,
    averageDaysToFirstMissions,
    activeProfiles,
    topPerformersThreshold,
    marketSaturation
  };
};

export const compareFreelancerToMarket = (
  freelancer: any, 
  marketMetrics: MarketMetrics
): FreelancerComparison => {
  // Simulation TJM freelancer
  const baseRate = 400;
  const ratingMultiplier = freelancer.rating / 4.0;
  const rankingBonus = Math.max(0, (10 - parseInt(freelancer.ranking)) * 50);
  const estimatedTjm = Math.round(baseRate * ratingMultiplier + rankingBonus);

  const ratingDiff = freelancer.rating - marketMetrics.averageRating;
  const tjmDiff = estimatedTjm - marketMetrics.medianTjm;

  const ratingVsMarket: 'above' | 'below' | 'average' = 
    Math.abs(ratingDiff) < 0.1 ? 'average' : ratingDiff > 0 ? 'above' : 'below';

  const tjmVsMarket: 'above' | 'below' | 'average' = 
    Math.abs(tjmDiff) < 50 ? 'average' : tjmDiff > 0 ? 'above' : 'below';

  const isTopPerformer = freelancer.rating >= marketMetrics.topPerformersThreshold;
  
  const ranking = parseInt(freelancer.ranking);
  const marketPosition: 'top-10' | 'top-25' | 'average' | 'below-average' = 
    ranking <= 3 ? 'top-10' : ranking <= 10 ? 'top-25' : ranking <= 20 ? 'average' : 'below-average';

  return {
    ratingVsMarket,
    tjmVsMarket,
    isTopPerformer,
    marketPosition
  };
};
