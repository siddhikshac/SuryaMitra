export interface SolarCalculationResult {
  estimatedSystemSizeKw: number;
  estimatedCostINR: number;
  subsidyAmountINR: number;
  monthlySavingsINR: number;
  paybackPeriodYears: number;
  co2OffsetTonsPerYear: number;
  recommendation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum SolarChallengeType {
  DUST = 'Dust & Pollution',
  HEAT = 'Temperature & Efficiency',
  SPACE = 'Rooftop Space',
  GRID = 'Grid Reliability'
}
