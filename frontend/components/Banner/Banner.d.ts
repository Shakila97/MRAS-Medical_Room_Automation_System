import * as React from 'react';

/** Props for the MRAS page-level callout banner. */
export interface BannerProps {
  tone?: 'info' | 'warning' | 'danger' | 'success';
  /** Override the default per-tone Material Symbols glyph. */
  icon?: string;
  /** Bold lead-in text. */
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** MRAS page-level callout banner. */
export declare function Banner(props: BannerProps): React.ReactElement;
