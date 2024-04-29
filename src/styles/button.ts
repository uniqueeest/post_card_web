import { css } from '@emotion/react';

import { colors } from './colorPalette';

export const buttonColorMap = {
  primary: css`
    border: 1px solid ${colors.main};
    background-color: ${colors.white};
    color: ${colors.main};
  `,
  error: css`
    border: none;
    background-color: ${colors.red};
    color: ${colors.white};
  `,
};

export const buttonWeakMap = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.main};
    border: 1px solid ${colors.main};
  `,
  error: css`
    background-color: ${colors.white};
    color: ${colors.red};
    border: 1px solid ${colors.red};
  `,
};

export const buttonSizeMap = {
  small: css`
    font-size: 14px;
    padding: 8px 10px;
  `,
  medium: css`
    font-size: 16px;
    padding: 8px 12px;
  `,
  large: css`
    font-size: 18px;
    padding: 8px 16px;
  `,
};

export type ButtonColor = keyof typeof buttonColorMap;
export type ButtonSize = keyof typeof buttonSizeMap;
