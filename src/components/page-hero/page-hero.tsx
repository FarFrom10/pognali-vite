
import styles from './page-hero.module.scss';
import Container from '../container/container';
import Avatar from '../ui/avatar/avatar';
import TagsInput from '../ui/tags-input/tags-input';
import TransportIcons from '../ui/transport-icons/transport-icons';
import LevelCircle from '../ui/level-circle/level-circle';
import { FormValues } from '../../schemas/form-schema';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  title?: string;
}

const PageHero = ({ title = 'Направления' }: Props) => {
  const { control } = useFormContext<FormValues>();

  return (
    (
      <section className={styles.pageHero}>
        {/* Заголовок с фоном */}
        <div className={styles.headerBlock}>
          <Container>
            <h1 className={styles.title}>{title}</h1>
          </Container>
        </div>

        <div className={styles.contentBlock}>
          <Container className={styles.contentInner}>

            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagsInput
                  tags={field.value}
                  onChange={field.onChange}
                  className={styles.tagsHero}
                  withBorder
                />
              )}
            />

            <Controller
              name="transport"
              control={control}
              render={({ field }) => (
                <TransportIcons
                  value={field.value}
                  onChange={field.onChange}
                  className={styles.transportHero}
                  withBorder
                />
              )}
            />

            <LevelCircle className={styles.levelHero} value={80} size={95} />

            <Avatar className={styles.avatarHero} src={'/images/assets/avatar-1.png'} width={220} height={237} borderRadius={24} />

          </Container>
        </div>
      </section>
    )
  );
};

export default PageHero;
