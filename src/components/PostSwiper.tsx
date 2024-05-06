import { useState } from 'react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IMAGE_LIST } from '@constants';
import 'swiper/css';

SwiperCore.use([Navigation, Pagination]);

export const PostSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      <LeftArrow currentIndex={activeIndex} />
      <Swiper
        css={{
          width: '330px',
        }}
        navigation={{ nextEl: '.next_click', prevEl: '.prev_click' }}
        onSwiper={(swiper) => {
          swiper.on('slideChange', () => {
            setActiveIndex(swiper.activeIndex);
          });
        }}
      >
        {IMAGE_LIST.map((image, index) => (
          <SwiperSlide
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            key={image.name}
          >
            <img
              css={{
                width: index === 6 || index === 7 ? '300px' : '200px',
                height: index === 6 || index === 7 ? '215px' : '',
              }}
              src={image.path}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <RightArrow currentIndex={activeIndex} dataLength={IMAGE_LIST.length} />
    </section>
  );
};

function LeftArrow({ currentIndex }: { currentIndex: number }) {
  return (
    <svg
      width="10"
      height="20"
      className="prev_click"
      css={{
        cursor: 'pointer',
      }}
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1L2 11L12 21"
        stroke={currentIndex === 0 ? '#D0D0D0' : '#0B0B0B'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RightArrow({
  currentIndex,
  dataLength,
}: {
  currentIndex: number;
  dataLength: number;
}) {
  return (
    <svg
      width="10"
      height="20"
      className="next_click"
      css={{
        cursor: 'pointer',
      }}
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L11 11L1 21"
        stroke={currentIndex === dataLength - 1 ? '#D0D0D0' : '#0B0B0B'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
