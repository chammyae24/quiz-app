import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { store } from "../app/store";

export const useQuizDispatch: () => typeof store.dispatch = useDispatch;
export const useQuizSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
