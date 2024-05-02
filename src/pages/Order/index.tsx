import { useEffect, useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';

import { FirstStep, SecondStep } from './components';
import { validateOrder, generateSixDigitNumber } from './utils';
import { OrderValue } from '@models';
import { store } from '@/remote/firebase';
import { COLLECTIONS } from '@constants';

export function OrderPage() {
  const [step, setStep] = useState(1);
  const [orderValue, setOrderValue] = useState<Partial<OrderValue>>({});

  const handleChangeOrderValue = (infoValue: Partial<OrderValue>) => {
    setOrderValue((prev) => ({
      ...prev,
      ...infoValue,
      totalFee: total(infoValue as OrderValue),
    }));
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    async function postOrderInfo() {
      if (validateOrder(orderValue as OrderValue) && step === 2) {
        const orderRef = doc(
          collection(store, COLLECTIONS.ORDER),
          generateSixDigitNumber()
        );
        await setDoc(orderRef, orderValue);
      }
    }

    postOrderInfo();
  }, [step]);

  return (
    <section
      css={{
        display: 'flex',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      {step === 1 && <FirstStep onChangeOrderValue={handleChangeOrderValue} />}
      {step === 2 && <SecondStep />}
    </section>
  );
}

function total(orderValue: OrderValue) {
  const { selectedImage, receiptMethod } = orderValue;
  const totalPostFee = selectedImage.length * 3000;
  const deliveryFee = receiptMethod === '택배수령' ? 3300 : 0;

  return totalPostFee + deliveryFee;
}
