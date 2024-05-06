import { OrderValue } from '@models';

export function validateOrder(order: OrderValue): boolean {
  if (
    !order.name ||
    !order.phoneNumber ||
    !order.receiptMethod ||
    order.selectedImage.length === 0
  ) {
    return false;
  }

  if (order.receiptMethod === '택배수령') {
    const { address } = order;
    if (
      !address ||
      !address.postcode ||
      !address.address ||
      !address.detailAddress
    ) {
      return false;
    }
  }

  return true;
}

export function isPhoneNumberFormat(phoneNumber: string) {
  if (phoneNumber == '') {
    return true;
  }
  const phoneNumberRule = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
  return phoneNumberRule.test(phoneNumber);
}

export function filterConsonantsOrVowelsOnly(name: string) {
  return /^(?![ㄱ-ㅎㅏ-ㅣ]+$).*/.test(name);
}
