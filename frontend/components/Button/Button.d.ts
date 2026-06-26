import * as React from 'react';

/** Props for the MRAS primary action control. */
export interface ButtonProps {
  /** Visual style. */
  kind?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Height preset: sm 28 · md 36 · lg 44 px. */
  size?: 'sm' | 'md' | 'lg';
  /** Material Symbols icon name, rendered leading. */
  icon?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** MRAS primary action control. */
export declare function Button(props: ButtonProps): React.ReactElement;
