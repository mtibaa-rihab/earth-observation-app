import { legende as legend } from './legende';

export interface layer {
  name: string;
  abstract: string;
  legende: legend;
  selected: boolean;
}
