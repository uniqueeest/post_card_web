import { CSSProperties } from 'react';
import styled from '@emotion/styled';

import { Typography, Colors, colors, typographyMap } from '@/styles';

interface TextProps {
  color?: Colors;
  typography?: Typography;
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
}

export const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography]
);
