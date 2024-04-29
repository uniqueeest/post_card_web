import { forwardRef, InputHTMLAttributes } from 'react';

import { Text, Input } from '.';
import { colors } from '@styles/colorPalette';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref
  ) {
    const labelColor = hasError ? 'red' : 'main';

    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          width: '100%',
        }}
      >
        {label && (
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Text
              typography="t5"
              bold
              color={labelColor}
              display="inline-block"
            >
              {label}
            </Text>
            <hr
              css={{
                flex: 1,
                height: '2px',
                backgroundColor: colors.main,
                border: 'none',
              }}
            />
          </div>
        )}
        <Input ref={ref} aria-invalid={hasError} {...props} />
        {helpMessage && (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ fontSize: '12px' }}
          >
            {helpMessage}
          </Text>
        )}
      </div>
    );
  }
);
