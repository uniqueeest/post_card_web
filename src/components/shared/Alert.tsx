import styled from '@emotion/styled';

import { colors } from '@styles/colorPalette';
import { Button } from './Button';

interface AlertProps {
  open: boolean;
  title?: string;
  body: React.ReactNode;
  buttonLabel?: string;
  onButtonClick: () => void;
}

export function Alert({
  open,
  title,
  body,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) {
  if (!open) {
    return null;
  }

  return (
    <DimmedContainer>
      <AlertContainer>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '320px',
          }}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              padding: '18px',
              color: colors.main,
            }}
          >
            {title && (
              <span
                css={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                {title}
              </span>
            )}
            {body}
          </div>
          <Button
            css={{
              marginBottom: '18px',
            }}
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button>
        </div>
      </AlertContainer>
    </DimmedContainer>
  );
}

const DimmedContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #0e0e0e70;
  z-index: 999;
`;

const AlertContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
`;
