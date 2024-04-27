import { useState, useEffect, useRef } from 'react';

import { Button, Flex, Input, Spacing, Text } from './shared';

declare global {
  interface Window {
    daum: any;
  }
}

export const Postcode = () => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const postcodeRef = useRef(null);

  useEffect(() => {
    if (isPostcodeOpen && postcodeRef.current) {
      new window.daum.Postcode({
        oncomplete: handleComplete,
        onresize: (size: any) => {
          if (postcodeRef.current) {
            // @ts-ignore
            postcodeRef.current.style.height = `${size.height}px`;
          }
        },
        width: '100%',
        height: '100%',
      }).embed(postcodeRef.current);
    }
  }, [isPostcodeOpen, postcodeRef.current]);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setPostcode(data.zonecode);
    setAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  const handleOpenPostcode = () => {
    setIsPostcodeOpen(true);
  };

  return (
    <Flex css={{ width: '100%' }} direction="column" gap={4}>
      <Text typography="t7">주소</Text>
      <Spacing size={6} />
      <Flex gap={8}>
        <Input
          css={{
            flex: 1,
          }}
          type="text"
          placeholder="우편번호"
          value={postcode}
          readOnly
          onClick={handleOpenPostcode}
        />
        <Button onClick={handleOpenPostcode}>우편번호 찾기</Button>
      </Flex>
      <Input type="text" placeholder="주소" value={address} readOnly />
      <Input
        type="text"
        placeholder="상세주소"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
      <Spacing size={24} />
      {isPostcodeOpen && (
        <div
          id="wrap"
          css={{
            position: 'relative',
            height: '480px',
          }}
        >
          <div
            ref={postcodeRef}
            style={{ width: '100%', height: '100%' }}
          ></div>
          <img
            src="//t1.daumcdn.net/postcode/resource/images/close.png"
            style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '0px',
              top: '-18px',
              zIndex: '1',
            }}
            onClick={() => setIsPostcodeOpen(false)}
            alt="접기 버튼"
          />
        </div>
      )}
    </Flex>
  );
};
