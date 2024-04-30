import { ButtonHTMLAttributes } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex, Spacing, Text } from '.';
import {
  ButtonColor,
  ButtonSize,
  buttonColorMap,
  buttonSizeMap,
  buttonWeakMap,
} from '@/styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  weak?: boolean;
  full?: boolean;
  disabled?: boolean;
}

const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'normal',
  },
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: initial;
        `
      : undefined
);

const ButtonGroup = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <Flex direction="column">
      {title && (
        <>
          <Text typography="t6" bold>
            {title}
          </Text>
          <Spacing size={8} />
        </>
      )}
      <Flex css={buttonGroupStyle}>{children}</Flex>
    </Flex>
  );
};

const buttonGroupStyle = css`
  flex-wrap: wrap;
  gap: 10px;

  button {
    flex: 1;
  }
`;

export const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup;
};

Button.Group = ButtonGroup;
