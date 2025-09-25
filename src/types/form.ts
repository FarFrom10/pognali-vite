export type DateRange = {
  from?: Date | null;
  to?: Date | null;
};

export type FormValues = {
    peopleAmount: number;
    duration: number;
    isChildrenAllowed: boolean;
    dateRange: DateRange;
    // countries: string[];
    // tags: string[];
    // comments: string;
  };
