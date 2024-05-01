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
        padding: '16px',
      }}
    >
      <Flex direction="column" align="center">
        <Text
          css={{
            alignSelf: 'start',
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
        <Spacing size={28} />
        <PostSwiper />
        <Spacing size={50} />
        <Button
          css={{ width: '50%' }}
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
