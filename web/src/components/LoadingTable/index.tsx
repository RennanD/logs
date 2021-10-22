import styles from './styles.module.scss';

export function LoadingTable(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  );
}
