import { useState } from 'react';
import styles from './tags-input.module.scss';

type Props = {
  tags: string[];
  onChange: (updated: string[]) => void;
  placeholder?: string;
  label?: string;
  withBorder?: boolean;
  className?: string;
}

const TagsInput = ({
  tags,
  placeholder = 'Укажите хотя бы 1 тег (#концерт)',
  label = 'тэги',
  withBorder = true,
  className = '',
  onChange
}: Props) => {
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    const newTag = tag.trim();
    if (!newTag || tags.includes(newTag)) {
      return;
    }

    const tagWithSymbol = newTag.startsWith('#') ? newTag : `#${newTag}`;
    const updated = [...tags, tagWithSymbol];
    onChange?.(updated);
    setInput('');
  };

  const removeTag = (idx: number) => {
    const updated = tags.filter((_, i) => i !== idx);
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
            placeholder={!tags.length && placeholder || ''}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default TagsInput;
