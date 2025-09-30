import React from 'react';
import styles from './container.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: Props) => (
  <div className={`${styles.container} ${className}`}>
    {children}
  </div>
);

export default Container;
