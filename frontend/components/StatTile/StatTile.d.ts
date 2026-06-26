import * as React from 'react';

/** Props for the MRAS clinical readout cell. */
export interface StatTileProps {
  /** Material Symbols icon name. */
  icon?: string;
  label: string;
  value: string | number;
  /** Unit suffix, rendered smaller next to the value. */
  unit?: string;
  /** Delta string, e.g. "+12 vs last month". */
  delta?: string;
  /** Colours the delta: good=green, bad=red, neutral=grey. */
  deltaTone?: 'good' | 'bad' | 'neutral';
  style?: React.CSSProperties;
}

/** MRAS clinical readout cell (label + mono value + optional delta). */
export declare function StatTile(props: StatTileProps): React.ReactElement;
