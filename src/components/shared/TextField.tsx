import { forwardRef, InputHTMLAttributes } from 'react';

import { Text, Input } from '.';

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
    const labelColor = hasError ? 'red' : undefined;

    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          width: '100%',
        }}
      >
        {label && (
          <Text typography="t7" color={labelColor} display="inline-block">
            {label}
          </Text>
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
