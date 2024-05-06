import { useState, ChangeEvent } from 'react';

import { Postcode } from '@components';
import { Button, Checkbox, Flex, Text, TextField } from '@components/shared';
import { OrderValue, PostInfo } from '@models';
import {
  validateOrder,
  isPhoneNumberFormat,
  filterConsonantsOrVowelsOnly,
} from '../utils';
import { IMAGE_LIST, RECEIPT_LIST } from '@constants';
import { colors } from '@styles/colorPalette';
import { useAlertContext } from '@/contexts/alertContext';

export function FirstStep({
  onChangeOrderValue,
}: {
  onChangeOrderValue: (infoValue: Partial<OrderValue>) => void;
}) {
  const [infoValue, setInfoValue] = useState<OrderValue>({
    selectedImage: [],
    name: '',
    phoneNumber: '',
    receiptMethod: null,
  });

  const { open, close } = useAlertContext();

  const sortedImages = infoValue.selectedImage.sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const handleSelectedImages = (image: string) => {
    if (infoValue.selectedImage.includes(image)) {
      setInfoValue((prev) => ({
        ...prev,
        selectedImage: infoValue.selectedImage.filter(
          (currentImage) => currentImage !== image
        ),
      }));
    } else {
      setInfoValue((prev) => ({
        ...prev,
        selectedImage: [...prev.selectedImage, image],
      }));
    }
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInfoValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (checked) {
      setInfoValue((prev) => ({
        ...prev,
        receiptMethod: id,
      }));
    } else {
      setInfoValue((prev) => ({
        ...prev,
        receiptMethod: null,
      }));
    }
    if (infoValue.address) {
      delete infoValue.address;
    }
  };

  const handleChangePostInfo = (postValue: PostInfo) => {
    setInfoValue((prev) => ({
      ...prev,
      address: postValue,
    }));
  };

  const handleSubmitOrder = () => {
    if (!validateOrder(infoValue)) {
      return open({
        title: '',
        body: '모든 항목을 입력해주세요.',
        onButtonClick: close,
      });
    }

    if (!filterConsonantsOrVowelsOnly(infoValue.name)) {
      return open({
        title: '',
        body: '이름을 다시 입력해주세요.',
        onButtonClick: close,
      });
    }

    if (!isPhoneNumberFormat(infoValue.phoneNumber)) {
      return open({
        title: '',
        body: '휴대폰 번호를 다시 입력해주세요.',
        onButtonClick: close,
      });
    }
    onChangeOrderValue(infoValue);
  };

  return (
    <Flex
      css={{ width: '100%', maxWidth: 680 }}
      direction="column"
      align="start"
      gap={14}
    >
      <article
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          width: '100%',
        }}
      >
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text typography="t5" bold color="main" display="inline-block">
            select
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
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            rowGap: 14,
            marginBottom: 6,
          }}
        >
          {IMAGE_LIST.map((image, index) => (
            <>
              {image.soldOut ? (
                <div
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 110,
                    background: colors.main,
                    color: colors.white,
                    zIndex: 2,
                  }}
                >
                  Sold Out
                </div>
              ) : (
                <div
                  key={image.path}
                  css={{
                    position: 'relative',
                    cursor: 'pointer',
                    transform: infoValue.selectedImage.includes(image.name)
                      ? 'scale(0.9)'
                      : 'scale(1)',
                    transition: 'transform 0.2s ease',
                  }}
                  onClick={() => {
                    handleSelectedImages(image.name);
                  }}
                >
                  <img
                    css={{
                      width: index === 6 || index === 7 ? '160px' : '110px',
                      height: index === 0 ? '153.45px' : '',
                    }}
                    src={image.path}
                    alt={`이미지-${index}`}
                  />
                  <div
                    css={{
                      position: 'absolute',
                      top: 0,
                      padding: 4,
                      zIndex: 10,
                      backgroundColor: colors.main,
                      color: colors.white,
                      fontSize: 14,
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <TextField placeholder="선택한 항목" value={sortedImages} readOnly />
        <Text
          css={{
            alignSelf: 'end',
          }}
        >
          total{' '}
          {!!infoValue.selectedImage
            ? (3000 * infoValue.selectedImage.length).toLocaleString()
            : 0}
          원
        </Text>
      </article>
      <TextField
        id="name"
        label="name"
        value={infoValue.name}
        onChange={handleChangeInputValue}
      />
      <TextField
        type="number"
        inputMode="numeric"
        id="phoneNumber"
        label="phone number"
        value={infoValue.phoneNumber}
        onChange={handleChangeInputValue}
      />
      <article
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          width: '100%',
        }}
      >
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text typography="t5" bold color="main" display="inline-block">
            receipt method
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
        <Checkbox
          selectedValue={infoValue.receiptMethod}
          checkList={RECEIPT_LIST}
          onChangeCheckValue={handleCheckboxChange}
        />
        {infoValue.receiptMethod === '택배수령' && (
          <Postcode onChangePostInfo={handleChangePostInfo} />
        )}
      </article>
      <Button
        css={{ alignSelf: 'center', margin: '50px 0' }}
        size="large"
        onClick={handleSubmitOrder}
      >
        Next
      </Button>
    </Flex>
  );
}
