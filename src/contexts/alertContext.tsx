import {
  useState,
  createContext,
  useContext,
  ComponentProps,
  useCallback,
  useMemo,
} from 'react';

import { Alert } from '@components/shared';
import { createPortal } from 'react-dom';

type AlertProps = ComponentProps<typeof Alert>;
type AlertOptions = Omit<AlertProps, 'open'>;

interface AlertContextValue {
  open: (options: AlertOptions) => void;
  close: () => void;
}

const Context = createContext<AlertContextValue | undefined>(undefined);

const defaultValue: AlertProps = {
  open: false,
  body: null,
  onButtonClick: () => {},
};

interface AlertContextProps {
  children: React.ReactNode;
}

export function AlertContext({ children }: AlertContextProps) {
  const [modalState, setModalState] = useState<AlertProps>(defaultValue);

  const $portal_root = document.getElementById('portal');

  const open = useCallback((options: AlertOptions) => {
    setModalState({ ...options, open: true });
  }, []);

  const close = useCallback(() => {
    setModalState(defaultValue);
  }, []);

  const values = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close]
  );

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root !== null
        ? createPortal(<Alert {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  );
}

export function useAlertContext() {
  const values = useContext(Context);

  if (!values) {
    throw new Error('AlertContext 안에서 사용해주세요.');
  }

  return values;
}
