import styled from '@emotion/styled';

import { colors } from '@styles/colorPalette';

export const Input = styled.input`
  padding: 8px 4px;
  font-size: 14px;
  width: 100%;
  font-weight: 400;
  color: ${colors.main};
  border: none;
  border: 1px solid ${colors.main};
  box-sizing: border-box;

  &:focus {
    outline: none;
    color: ${colors.main};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red100};
  }
`;
