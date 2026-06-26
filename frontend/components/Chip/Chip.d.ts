import * as React from 'react';

/** Props for the MRAS status / risk pill. */
export interface ChipProps {
  /** Tone. Use low|moderate|high for JRISSI only. */
  tone?: 'low' | 'moderate' | 'high' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  /** Material Symbols icon name. */
  icon?: string;
  /** Leading colored dot. */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** MRAS status / risk pill. */
export declare function Chip(props: ChipProps): React.ReactElement;
