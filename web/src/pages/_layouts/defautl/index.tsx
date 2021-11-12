import React from 'react';

import styles from './styles.module.scss';

import { SideBar } from '../../../components/SideBar';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
  return (
    <div className={styles.container}>
      <section>
        <SideBar />
      </section>
      <main>{children}</main>
    </div>
  );
}
