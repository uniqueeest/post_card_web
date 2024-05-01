import { ChangeEvent } from 'react';

import { colors } from '@styles/colorPalette';

interface CheckboxProps {
  selectedValue: string | null;
  checkList: {
    value: string;
    label: string;
  }[];
  onChangeCheckValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  selectedValue,
  checkList,
  onChangeCheckValue,
}: CheckboxProps) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {checkList.map((item) => (
        <label
          css={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: colors.main,
          }}
          key={item.value}
        >
          <input
            css={{
              display: 'none',
            }}
            type="checkbox"
            id={item.value}
            checked={selectedValue === item.value}
            onChange={onChangeCheckValue}
          />
          <CheckboxIcon isCheck={selectedValue === item.value} />
          {item.label}
        </label>
      ))}
    </div>
  );
};

function CheckboxIcon({ isCheck }: { isCheck: boolean }) {
  return isCheck ? (
    <svg
      fill="none"
      height="24"
      stroke={colors.main}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <polyline points="9 11 12 14 20 6" />
      <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
    </svg>
  ) : (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6Z"
        fill={colors.main}
      />
    </svg>
  );
}
