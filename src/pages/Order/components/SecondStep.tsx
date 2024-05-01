import { keyframes } from '@emotion/react';

import { colors } from '@styles/colorPalette';

export function SecondStep() {
  return (
    <article
      css={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        width: '100%',
        color: colors.main,
        animation: `${fadeIn} 1s ease-out 1s forwards`,
        opacity: 0,
      }}
    >
      <h2
        css={{
          fontSize: 38,
          fontWeight: 'bold',
        }}
      >
        Order Complete
      </h2>
      <span css={{ fontSize: 14 }}>
        주문 확인 후 안내 메시지 보내드리겠습니다.
      </span>
    </article>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
