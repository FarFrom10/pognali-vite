import styles from './navigation.module.scss';

const Navigation = () => {
  const links = [
    { href: '/about', label: 'О сервисе' },
    { href: '/directions', label: 'Направления' },
    { href: '/companions', label: 'Попутчики' }
  ];

  return (
    <nav className={styles.navigation}>
      {links.map((link) => (
        <a key={link.href} href={link.href} className={styles.link}>
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
