import styles from './header.module.scss';
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';
import ContactIcons from '../contact-icons/contact-icons';
import Container from '../container/container';

const Header = () => (
  <header className={styles.header}>
    <Container className={styles.wrapper}>
      <div className={styles.leftSection}>
        <Logo />
        {/* длинное тире */}
        <div className={styles.separator}></div>
        <Navigation />
      </div>
      <div className={styles.rightSection}>
        <ContactIcons />
      </div>
    </Container>
  </header>
);

export default Header;
