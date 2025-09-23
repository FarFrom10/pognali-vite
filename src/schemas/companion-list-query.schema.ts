export interface CompanionListQuery {
  page?: number;
  limit?: number;
  countries?: string[];
  continents?: string[];
  hobbies?: string[];
  musics?: string[];
  foods?: string[];
  transportType?: string[];
  minLevel?: number;
  maxLevel?: number;
}
