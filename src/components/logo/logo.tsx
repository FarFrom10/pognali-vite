import { Link } from 'react-router-dom'; //тут у next.js своя реализации import Link from 'next/link'; и нужно заменить to на href после Link
import styles from './logo.module.scss';
import LogoIcon from '/images/assets/icons/logo-full.svg';

const Logo = () => (
  <Link to="/" className={styles.logo} aria-label="На главную">
    <img src={LogoIcon} alt="Логотип Погнали" />
  </Link>
);

export default Logo;
