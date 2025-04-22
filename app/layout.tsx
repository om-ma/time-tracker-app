'use client';

import React from "react";
import { Provider } from "react-redux";  
import store from "../lib/store";       
import { CounterProvider } from "../app/components/counter/counterContext"; 

import type { ReactNode } from "react";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        {/*  Wrap Redux Provider around the entire application */}
        <Provider store={store}>
          {/* Wrap CounterProvider if still needed */}
          <CounterProvider>
            <section className={styles.container}>
              <main className={styles.main}>{children}</main>
            </section>
          </CounterProvider>
        </Provider>
      </body>
    </html>
  );
}
