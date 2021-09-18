import { useEffect, useState } from 'react';

export interface ICallbackParams<T, O = any> {
  isLoading: boolean;
  isFinishedOnce: boolean;
  error: string | undefined;
  hookData: O;
  input: T;
  exception?: Error;
}

export type CallbackFunctionType = (props: ICallbackParams<any>) => any;

interface IHookProps {
  initialIsLoading?: boolean;
  skipInitialApiCallOnEmptyInputs?: boolean;
  initialInput?: Record<any, any> | string | number | undefined;
  mountFn: CallbackFunctionType;
  errorFn: CallbackFunctionType;
  unmountFn: CallbackFunctionType;
}

type GenStateType<T> = [T, (f: T) => void];

export type HookReturnType<I, O = any> = [
  {
    isLoading: boolean;
    error: string | undefined;
    isFinishedOnce: boolean;
    hookData: O;
  },
  GenStateType<I>[1]
];

export function useApiHookWrapper(props: IHookProps): HookReturnType<any> {
  const {
    initialIsLoading = false,
    initialInput,
    skipInitialApiCallOnEmptyInputs = false,
    mountFn,
    unmountFn,
    errorFn,
  } = props;
  // initial states
  const [isLoading, setIsLoading]: GenStateType<boolean> = useState(initialIsLoading);
  const [isFinishedOnce, setIsFinishedOnce]: GenStateType<boolean> = useState(false as boolean);
  const [error, setError]: GenStateType<string> = useState();
  const [hookData, setHookData]: GenStateType<any> = useState();
  const [input, setInput]: GenStateType<typeof initialInput> = useState(initialInput);

  useEffect(() => {
    if (skipInitialApiCallOnEmptyInputs && (!input || Object.keys(input).length === 0)) {
      setIsLoading(false);
      return () => {};
    }

    let isObsolete = false;

    const fetchData = async () => {
      setError(undefined);
      setIsLoading(true);

      let res; // undefined

      try {
        res = await mountFn({ isLoading, isFinishedOnce, error, hookData, input });
      } catch (e) {
        if (!isObsolete) {
          const errorMsg = e?.response?.data?.message || e.message;

          errorFn &&
            (await errorFn({
              isLoading,
              isFinishedOnce,
              error: errorMsg,
              hookData,
              input,
              exception: e,
            }));
          setError(errorMsg);
        }
      }

      if (!isObsolete) {
        if (res) {
          setIsFinishedOnce(true);
          setHookData(res);
        }

        setIsLoading(false);
      }
    };

    fetchData();

    // will run on unmount, example cancellation of promises
    return async () => {
      isObsolete = true;
      unmountFn && (await unmountFn({ isLoading, isFinishedOnce, error, hookData, input }));
    };
  }, [input]);

  return [{ isLoading, error, isFinishedOnce, hookData }, setInput];
}
