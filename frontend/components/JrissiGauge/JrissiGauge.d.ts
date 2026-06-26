import * as React from 'react';

/** Props for the MRAS doctor-only JRISSI risk dial. */
export interface JrissiGaugeProps {
  /** Mental-health risk score, 0–100. <34 low · 34–66 moderate · 67+ high. */
  score: number;
  /** Diameter in px. */
  size?: number;
}

/** MRAS doctor-only circular JRISSI risk dial. Tone auto-derives from score. */
export declare function JrissiGauge(props: JrissiGaugeProps): React.ReactElement;
