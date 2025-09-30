import { useState } from 'react';
import styles from './tags-input.module.scss';

type Props = {
  initialTags?: string[];
  placeholder?: string;
  label?: string;
  withBorder?: boolean;
  className?: string;
  onChange?: (updated: string[]) => void;
}

const TagsInput = ({
  initialTags = ['#бургер', '#бар', '#футбол', '#концерт', '#крафт'],
  placeholder = '',
  label = 'тэги',
  withBorder = true,
  className = '',
  onChange
}: Props) => {
  const [tags, setTags] = useState(initialTags);
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    const newTag = tag.trim();
    if (!newTag || tags.includes(newTag)) {
      return;
    }
    const updated = [...tags, newTag];
    setTags(updated);
    onChange?.(updated);
    setInput('');
  };

  const removeTag = (idx: number) => {
    const updated = tags.filter((_, i) => i !== idx);
    setTags(updated);
    onChange?.(updated);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' || evt.key === ',') {
      evt.preventDefault();
      addTag(input);
    }
  };

  return (
    <div className={`${styles.tagsInput} ${withBorder ? styles.withBorder : ''} ${className}`}>
      {withBorder && label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        <div className={styles.tagsContainer}>
          {tags.map((tag, i) => (
            <span key={tag} className={styles.tag}>
              {tag}
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeTag(i)}
              >
                ×
              </button>
            </span>
          ))}

          <input
            type="text"
            value={input}
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default TagsInput;
