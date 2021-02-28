import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { RootState } from "~client/redux/store";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
