import { transportConfig } from '../const/const';

export type DateRange = {
  from?: Date | null;
  to?: Date | null;
};

export type TransportId = keyof typeof transportConfig;
