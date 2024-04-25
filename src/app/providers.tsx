'use client';
import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

const store = makeStore();
setupListeners(store.dispatch)

export function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
