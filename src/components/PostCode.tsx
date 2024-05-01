import { useState, useEffect, useRef, ChangeEvent } from 'react';

import { Button, Flex, Input, Spacing, Text } from './shared';
import { PostInfo } from '@pages/Order';

declare global {
  interface Window {
    daum: any;
  }
}

export const Postcode = ({
  onChangePostInfo,
}: {
  onChangePostInfo: (postValue: PostInfo) => void;
}) => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<PostInfo>({
    postcode: '',
    address: '',
    detailAddress: '',
  });
  const postcodeRef = useRef(null);

  const handleChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setPostInfo((prev) => ({
      ...prev,
      detailAddress: event.target.value,
    }));
  };

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

  useEffect(() => {
    if (postInfo.postcode && postInfo.address && postInfo.detailAddress) {
      onChangePostInfo(postInfo);
    }
  }, [postInfo.postcode, postInfo.detailAddress]);

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

    setPostInfo((prev) => ({
      ...prev,
      postcode: data.zonecode,
      address: fullAddress,
    }));
    setIsPostcodeOpen(false);
  };

  const handleOpenPostcode = () => {
    setIsPostcodeOpen(true);
  };

  return (
    <Flex css={{ width: '100%' }} direction="column" gap={4}>
      <Text typography="t7" color="main">
        주소
      </Text>
      <Spacing size={6} />
      <Flex gap={8}>
        <Input
          css={{
            flex: 1,
          }}
          type="text"
          placeholder="우편번호"
          value={postInfo.postcode}
          readOnly
          onClick={handleOpenPostcode}
        />
        <Button onClick={handleOpenPostcode}>우편번호 찾기</Button>
      </Flex>
      <Input type="text" placeholder="주소" value={postInfo.address} readOnly />
      <Input
        type="text"
        placeholder="상세주소"
        value={postInfo.detailAddress}
        onChange={handleChangeDetailAddress}
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
