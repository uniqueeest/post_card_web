import { useState, ChangeEvent, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';

import { Button, Flex, Text, TextField } from '@components/shared';
import { useAlertContext } from '@/contexts/alertContext';
import { useOrders } from './hooks/useOrder';
import { OrderData } from '@models';
import { colors } from '@styles/colorPalette';

export function AdminPage() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState<string | null>(() => {
    if (window.localStorage.getItem('admin')) {
      return window.localStorage.getItem('admin');
    }
    return '';
  });

  const { open, close } = useAlertContext();

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmitPassword = () => {
    if (password === '0228') {
      setStep(2);
      if (!window.localStorage.getItem('admin')) {
        window.localStorage.setItem('admin', password);
      }
    } else {
      open({
        title: '',
        body: '비밀번호가 일치하지 않습니다.',
        onButtonClick: close,
      });
    }
  };

  useEffect(() => {
    if (password === '0228') {
      setStep(2);
    }
  }, []);

  return (
    <Flex
      css={{
        width: '100%',
      }}
    >
      {step === 1 && (
        <CheckPassword
          password={password ?? ''}
          onChangePassword={handleChangePassword}
          onSubmitPassword={handleSubmitPassword}
        />
      )}
      {step === 2 && <OrderConfirm />}
    </Flex>
  );
}

function CheckPassword({
  password,
  onChangePassword,
  onSubmitPassword,
}: {
  password: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitPassword: () => void;
}) {
  return (
    <Flex
      css={{
        position: 'absolute',
        top: '30%',
        translate: 'transform(-50%)',
        padding: 16,
        width: '100%',
        boxSizing: 'border-box',
      }}
      direction="column"
      align="center"
      gap={18}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          onSubmitPassword();
        }
      }}
    >
      <Text>비밀번호를 입력해주세요.</Text>
      <TextField
        css={{
          alignSelf: 'center',
          maxWidth: 400,
        }}
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <Button onClick={onSubmitPassword}>확인</Button>
    </Flex>
  );
}

function OrderConfirm({}) {
  const { data: orders, hasNextPage, loadMore } = useOrders();

  return (
    <article
      css={{
        padding: 16,
        width: '100%',
      }}
    >
      <InfiniteScroll
        dataLength={orders.length}
        hasMore={hasNextPage}
        loader={<div></div>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <TableComponents orderList={orders} />
      </InfiniteScroll>
    </article>
  );
}

function TableComponents({ orderList }: { orderList: OrderData[] }) {
  return (
    <Table
      css={{
        width: '100%',
        border: `1px solid ${colors.gray200}`,
      }}
    >
      <thead>
        <tr>
          <Th width="8%">이름</Th>
          <Th width="16%">전화번호</Th>
          <Th width="8%">수령 방법</Th>
          <Th width="24%">선택된 이미지</Th>
          <Th width="16%">총 비용</Th>
          <Th width="28%">주소</Th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((order, index) => (
          <tr
            css={{
              textAlign: 'center',
            }}
            key={index}
          >
            <Td width="8%">{order.name}</Td>
            <Td width="16%">{order.phoneNumber}</Td>
            <Td width="8%">{order.receiptMethod}</Td>
            <Td width="24%">{order.selectedImage.join(', ')}</Td>
            <Td width="16%">{order.totalFee.toLocaleString()}원</Td>
            <Td
              css={{
                lineHeight: 1.8,
              }}
              width="28%"
            >
              {order.address
                ? `${order.address?.address} ${order.address?.detailAddress} (${order.address?.postcode})`
                : ''}
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th<{ width: string }>`
  padding: 8px;
  width: ${(props) => props.width};
  background-color: ${colors.main};
  color: ${colors.white};
  border: 1px solid ${colors.white};
  white-space: nowrap;
`;

const Td = styled.td<{ width: string }>`
  padding: 8px;
  align-items: center;
  width: ${(props) => props.width};
  border: 1px solid ${colors.main};
  word-break: keep-all;
  white-space: nowrap;
  font-family: 'Pretendard-Regular';
`;
