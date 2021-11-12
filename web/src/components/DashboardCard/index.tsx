import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons/lib';

import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

type DashboardCardProps = {
  title: string;
  subtitle: string;
  link: string;
  icon: ComponentType<IconBaseProps>;
};

export function DashboardCard({
  title,
  icon: Icon,
  link,
  subtitle,
}: DashboardCardProps): JSX.Element {
  return (
    <Link to={link}>
      <article className={styles.container}>
        <Icon size={40} />
        <div>
          <strong>{title}</strong>
          <p>{subtitle}</p>
        </div>
      </article>
    </Link>
  );
}
