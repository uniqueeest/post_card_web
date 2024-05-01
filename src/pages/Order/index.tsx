import { useState } from 'react';

import { FirstStep, SecondStep } from './components';

export type PostInfo = {
  postcode: string;
  address: string;
  detailAddress: string;
};

export type OrderValue = {
  selectedImage: string[];
  name: string;
  phoneNumber: string;
  receiptMethod: string | null;
  address?: PostInfo;
};

export function OrderPage() {
  const [step, setStep] = useState(1);
  const [orderValue, setOrderValue] = useState<Partial<OrderValue>>({});

  const handleChangeOrderValue = (infoValue: Partial<OrderValue>) => {
    setOrderValue((prev) => ({
      ...prev,
      ...infoValue,
    }));
    setStep((prev) => prev + 1);
  };

  return (
    <section
      css={{
        padding: 16,
      }}
    >
      {step === 1 && <FirstStep onChangeOrderValue={handleChangeOrderValue} />}
      {step === 2 && <SecondStep />}
    </section>
  );
}
