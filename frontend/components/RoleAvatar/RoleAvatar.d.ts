import * as React from 'react';

/** Props for the MRAS accent-coloured initials avatar. */
export interface RoleAvatarProps {
  /** Full name; initials are derived from the first two words. */
  name: string;
  role?: 'doctor' | 'employee' | 'pharmacy' | 'admin';
  /** Diameter in px. */
  size?: number;
  style?: React.CSSProperties;
}

/** MRAS accent-coloured initials avatar. Background = role accent token. */
export declare function RoleAvatar(props: RoleAvatarProps): React.ReactElement;
