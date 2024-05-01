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
