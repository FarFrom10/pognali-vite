export type Countries = {
  flags: Record<string, string>;
  locations: Record<string, string[]>;
}

export type CompanionsQueryKey = ['companions', string?];

export type CompanionsFilter = {
  limit?: number;
  page?: number;
  countries?: string[];
  minLevel?: number;
  maxLevel?: number;
  continents?: string[];
  hobbies?: string[];
  musics?: string[];
  transportType?: string[];
  foods?: string[];
};

export type ExtraFilters = {
  hobbies: string[];
  musics: string[];
  foods: string[];
  transportType: string[];
  minLevel: number;
  maxLevel: number;
}
