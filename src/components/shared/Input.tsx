import styled from '@emotion/styled';

import { colors } from '@styles/colorPalette';

export const Input = styled.input`
  padding: 8px 0;
  font-size: 14px;
  width: 100%;
  font-weight: 400;
  border: none;
  border-bottom: 1px solid ${colors.gray400};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue980};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red100};
  }
`;
