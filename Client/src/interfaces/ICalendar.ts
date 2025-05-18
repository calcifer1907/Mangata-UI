export interface IBodyBlockDay {
  id: number;
  valid_date: Date;
}

export interface IRangaDate {
  startDate: Date;
  endDate: Date;
  id_employee?: number | undefined;
  key?: string;
}
