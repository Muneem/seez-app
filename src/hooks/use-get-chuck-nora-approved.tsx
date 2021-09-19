import { axiosRequest } from '../util/http-client';
import { HookReturnType, ICallbackParams, useApiHookWrapper } from './use-api-hook-wrapper';

type Input = unknown;
type Output = any;
const mountFn = async (props: any) => {
    const {input} = props;

    const { data } = await axiosRequest({ url: 'https://api.chucknorris.io/jokes/search?query=' + input.search });
    return data;
};

const errorFn = async (props: ICallbackParams<Input, Output>) => {
    const { error, exception } = props;
    if (!error || !exception) {
        return {};
    }
    return { error, exception };
};

export const useGetChuckNoraApproved = (): HookReturnType<Input, Output> => {

    return useApiHookWrapper({
        initialInput: undefined,
        initialIsLoading: false,
        mountFn,
        unmountFn: undefined,
        skipInitialApiCallOnEmptyInputs: false,
        errorFn: errorFn
    });
};
