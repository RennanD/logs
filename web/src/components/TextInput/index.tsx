import {
  ComponentType,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';

import styles from './styles.module.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  icon: ComponentType<IconBaseProps>;
}

export function TextInput({
  name,

  label,
  icon: Icon,
  ...rest
}: TextInputProps): JSX.Element {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(!!inputRef.current?.value);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
        setIsFilled(!!value);
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label className={styles.inputLabel}>
        {label} {!!error && <span>{error}</span>}
      </label>
      <div
        className={`${styles.container} ${
          isFocused ? styles.inputFocused : ''
        } ${error ? styles.inputError : ''}`}
      >
        <Icon size={24} color={isFilled || isFocused ? '#FFC312' : '#797d9a'} />
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
      </div>
    </>
  );
}
