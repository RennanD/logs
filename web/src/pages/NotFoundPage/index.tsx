import styles from './styles.module.scss';

import notFoundImage from '../../assets/not-found.svg';

export function NotFoundPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="" />
      <aside>
        <h1>404...</h1>
        <p>A página acessada não existe</p>
      </aside>
    </div>
  );
}
