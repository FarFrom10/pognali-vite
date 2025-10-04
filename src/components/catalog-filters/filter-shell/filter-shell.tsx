import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './filter-shell.module.scss';

interface Props {
  title: string;
  children: React.ReactNode;
}

function FilterShell({ title, children }: Props) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={styles.wrapper}>
          <DisclosureButton className={styles.headerButton}>
            {title}
            <motion.span
              className={styles.arrow}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
          </DisclosureButton>

          <AnimatePresence initial={false}>
            {open && (
              <DisclosurePanel static>
                <motion.div
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: 500 }}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className={styles.content}
                >
                  {children}
                </motion.div>
              </DisclosurePanel>
            )}
          </AnimatePresence>
        </div>
      )}
    </Disclosure>
  );
}

export default FilterShell;
