/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOptions {
  label: string;
  value: number;
}

export interface IFields {
  name: string;
  lunch: IOptions;
}

export interface IPropsAccompanist {
  title: string;
  icon: boolean;
  index: number;
  errors: IErrorFieldAccompanist;
  field: IFields;
  handleChange: (index: number, name: string, value: string) => void;
  onRemove: (index: number) => void;
  optionsLunches: IOptions[];
}

export interface IErrorFieldAccompanist {
  name: boolean;
  lunch: boolean;
}

export interface ILunches {
  ID: number;
  DESCRIPTION: string;
}
