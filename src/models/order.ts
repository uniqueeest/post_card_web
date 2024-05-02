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

export type OrderData = OrderValue & {
  totalFee: number;
};
