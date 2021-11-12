import { ComponentType, InputHTMLAttributes, useState } from 'react';
import { IconBaseProps } from 'react-icons';

import styles from './styles.module.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  icon: ComponentType<IconBaseProps>;
}

export function TextInput({
  value,
  icon: Icon,
  ...rest
}: TextInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <div
      className={`${styles.container} ${isFocused ? styles.inputFocused : ''}`}
    >
      <Icon size={24} color={isFilled || isFocused ? '#FFC312' : '#797d9a'} />
      <input
        value={value}
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </div>
  );
}
