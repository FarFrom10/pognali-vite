import styles from './contact-icons.module.scss';
import PhoneIcon from '/images/assets/icons/icon-call.svg';
import MailIcon from '/images/assets/icons/icon-mail.svg';

const ContactIcons = () => (
  <div className={styles.contactIcons}>
    <a
      href="#tel"
      className={styles.iconLink}
      aria-label="Позвонить"
    >
      <img src={PhoneIcon} alt="" />
    </a>

    <a
      href="#mail"
      className={styles.iconLink}
      aria-label="Отправить письмо"
    >
      <img src={MailIcon} alt="" />
    </a>
  </div>
);

export default ContactIcons;
