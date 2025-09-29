export type DateRange = {
  from?: Date | null;
  to?: Date | null;
};

export type FormValues = {
    peopleAmount: number;
    duration: number;
    isChildrenAllowed: boolean;
    dateRange: DateRange;
    countries: { value: string }[];
    comments: Record<string, string>;
    // tags: string[];
  };
