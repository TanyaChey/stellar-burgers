// hooks.ts
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { AppDispatch, RootState } from './index';

type DispatchFunc = () => AppDispatch
export const useDispatch: DispatchFunc = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook