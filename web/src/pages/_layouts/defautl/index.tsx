import React from 'react';

import styles from './styles.module.scss';

import { SideBar } from '../../../components/SideBar';
import { Navbar } from '../../../components/Navbar';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
  return (
    <div className={styles.container}>
      <section>
        <SideBar />
      </section>
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
}
