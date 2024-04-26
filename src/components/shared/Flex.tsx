import { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface FlexProps {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
}

export const Flex = styled.div<FlexProps>(({ align, justify, direction }) => ({
  display: 'flex',
  flexDirection: direction,
  alignItems: align,
  justifyContent: justify,
}));
