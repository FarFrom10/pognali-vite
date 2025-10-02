import { Link } from 'react-router-dom';
import styles from './navigation.module.scss';
import { AppRoute } from '../../const/enum';

const Navigation = () => {
  const links = [
    { href: '/', label: 'О сервисе' },
    { href: '/', label: 'Направления' },
    { href: `${AppRoute.Catalog}`, label: 'Попутчики' }
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
