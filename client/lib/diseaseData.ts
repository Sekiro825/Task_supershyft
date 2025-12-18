export interface Disease {
  id: string;
  name: string;
  score: number;
  icon: string;
  description: string;
  causes: string[];
  effects: string[];
  insights: string[];
  lifestyleContribution: 'LOW' | 'MODERATE' | 'INCREASED' | 'HIGH' | 'VERY HIGH';
  healthRank: number;
}

export const diseases: Disease[] = [
  {
    id: 'thyroid-health',
    name: 'Thyroid Health',
    score: 20,
    icon: '🦋',
    description: 'Thyroid health affects metabolism, energy levels, and overall hormonal balance.',
    causes: ['Lifestyle score', 'Nutrition score', 'Stress levels'],
    effects: ['Metabolic changes', 'Energy fluctuations', 'Weight changes'],
    insights: ['Regular sleep schedule', 'Balanced diet', 'Stress management'],
    lifestyleContribution: 'LOW',
    healthRank: 15
  },
  {
    id: 'obesity',
    name: 'Obesity',
    score: 20,
    icon: '⚖️',
    description: 'Obesity increases the risk of multiple chronic diseases and affects overall health.',
    causes: ['Lifestyle score', 'Fitness score', 'Nutrition score'],
    effects: ['Increased disease risk', 'Joint problems', 'Cardiovascular issues'],
    insights: ['Regular exercise', 'Portion control', 'Healthy eating habits'],
    lifestyleContribution: 'MODERATE',
    healthRank: 22
  },
  {
    id: 'nafld',
    name: 'NAFLD',
    score: 35,
    icon: '🫁',
    description: 'Non-alcoholic fatty liver disease can progress to serious liver conditions.',
    causes: ['Lifestyle score', 'Nutrition score', 'Weight management'],
    effects: ['Liver inflammation', 'Metabolic syndrome', 'Cirrhosis risk'],
    insights: ['Weight loss', 'Reduce sugar intake', 'Regular exercise'],
    lifestyleContribution: 'INCREASED',
    healthRank: 45
  },
  {
    id: 'cardiac-health',
    name: 'Cardiac Health',
    score: 65,
    icon: '❤️',
    description: 'Heart health is crucial for overall well-being and longevity.',
    causes: ['Lifestyle score', 'Fitness score', 'Stress levels'],
    effects: ['Cardiovascular disease', 'Reduced stamina', 'Heart attack risk'],
    insights: ['Cardio exercise', 'Heart-healthy diet', 'Stress reduction'],
    lifestyleContribution: 'HIGH',
    healthRank: 68
  },
  {
    id: 'dyslipidemia',
    name: 'Dyslipidemia',
    score: 55,
    icon: '🔬',
    description: 'Abnormal cholesterol levels increase cardiovascular disease risk.',
    causes: ['Nutrition score', 'Fitness score', 'Genetic factors'],
    effects: ['Arterial plaque', 'Heart disease', 'Stroke risk'],
    insights: ['Healthy fats', 'Regular exercise', 'Medication if needed'],
    lifestyleContribution: 'HIGH',
    healthRank: 55
  },
  {
    id: 'type2-diabetes',
    name: 'Type 2 Diabetes',
    score: 24,
    icon: '🩸',
    description: 'Type 2 diabetes affects blood sugar regulation and overall metabolism.',
    causes: ['Lifestyle score', 'Nutrition score', 'Weight management'],
    effects: ['Blood sugar spikes', 'Nerve damage', 'Kidney problems'],
    insights: ['Low glycemic diet', 'Regular exercise', 'Weight management'],
    lifestyleContribution: 'MODERATE',
    healthRank: 28
  },
  {
    id: 'pcos-pcod',
    name: 'PCOS/PCOD',
    score: 30,
    icon: '🌸',
    description: 'Polycystic ovary syndrome affects hormonal balance and reproductive health.',
    causes: ['Lifestyle score', 'Nutrition score', 'Hormonal factors'],
    effects: ['Irregular periods', 'Insulin resistance', 'Fertility issues'],
    insights: ['Balanced diet', 'Regular exercise', 'Stress management'],
    lifestyleContribution: 'MODERATE',
    healthRank: 35
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    score: 45,
    icon: '📊',
    description: 'High blood pressure increases the risk of heart disease and stroke.',
    causes: ['Lifestyle score', 'Stress levels', 'Nutrition score'],
    effects: ['Heart strain', 'Stroke risk', 'Kidney damage'],
    insights: ['Reduce sodium', 'Regular exercise', 'Stress management'],
    lifestyleContribution: 'INCREASED',
    healthRank: 50
  },
  {
    id: 'oxidative-stress',
    name: 'Oxidative Stress',
    score: 85,
    icon: '⚡',
    description: 'Oxidative stress is an imbalance in your body where there are too many unstable molecules called free radicals and not enough antioxidants to neutralize them.',
    causes: ['Lifestyle score', 'Fitness score', 'Nutrition score'],
    effects: ['Damage to Kidney', 'Issues in blood circulation', 'Damage to Liver'],
    insights: ['Improve sleep habits', 'Meditation', 'Journaling'],
    lifestyleContribution: 'LOW',
    healthRank: 55
  },
  {
    id: 'metabolic-health',
    name: 'Metabolic Health',
    score: 14,
    icon: '🔄',
    description: 'Overall metabolic health affects energy production and disease resistance.',
    causes: ['Lifestyle score', 'Fitness score', 'Nutrition score'],
    effects: ['Energy fluctuations', 'Weight changes', 'Disease susceptibility'],
    insights: ['Balanced meals', 'Regular activity', 'Adequate sleep'],
    lifestyleContribution: 'LOW',
    healthRank: 18
  }
];

export function getRiskLevel(score: number): 'healthy' | 'increased' | 'high' | 'very-high' {
  if (score <= 25) return 'healthy';
  if (score <= 50) return 'increased';
  if (score <= 75) return 'high';
  return 'very-high';
}

export function getRiskColor(score: number): string {
  const level = getRiskLevel(score);
  switch (level) {
    case 'healthy': return '#90DF9E';
    case 'increased': return '#DAC15A';
    case 'high': return '#EE8B48';
    case 'very-high': return '#E95D5C';
  }
}

export function getRiskLabel(score: number): string {
  const level = getRiskLevel(score);
  switch (level) {
    case 'healthy': return 'Healthy';
    case 'increased': return 'Increased Risk';
    case 'high': return 'High Risk';
    case 'very-high': return 'Very High Risk';
  }
}
