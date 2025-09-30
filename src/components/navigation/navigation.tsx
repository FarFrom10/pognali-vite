import { Link } from 'react-router-dom';
import styles from './navigation.module.scss';

const Navigation = () => {
  const links = [
    { href: '/', label: 'О сервисе' },
    { href: '/', label: 'Направления' },
    { href: '/', label: 'Попутчики' }
  ];

  return (
    <nav className={styles.navigation}>
      {links.map((link) => (
        <Link key={link.label} to={link.href} className={styles.link}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
