import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';

import { Button, Flex, Spacing, Text } from '@components/shared';
import { PostSwiper } from '@components';
import 'aos/dist/aos.css';

export function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section
      css={{
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <Flex css={{ maxWidth: 680 }} direction="column" align="center">
        <Spacing size={38} />
        <Text
          css={{
            marginBottom: '-10px',
          }}
          color="main"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          project
        </Text>
        <Text
          typography="t1"
          color="main"
          bold
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          youwere
        </Text>
        <Spacing size={38} />
        <PostSwiper />
        <Spacing size={38} />
        <Button
          css={{ width: '130px' }}
          data-aos="zoom-in"
          data-aos-duration="1000"
          onClick={() => navigate('/order')}
        >
          BUY IT NOW
        </Button>
      </Flex>
    </section>
  );
}
