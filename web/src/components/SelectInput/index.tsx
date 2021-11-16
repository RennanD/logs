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

type OptionProps = {
  label: string;
  value: number | string;
};

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  icon: ComponentType<IconBaseProps>;
  options: OptionProps[];
}

export function SelectInput({
  icon: Icon,
  name,
  label,
  options,
  ...rest
}: SelectInputProps): JSX.Element {
  const { fieldName, defaultValue = '', error, registerField } = useField(name);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: () => {
        return inputValue;
      },
      clearValue: () => {
        setInputValue('');
        return '';
      },
    });
  }, [fieldName, registerField, inputValue]);

  function handleChange(value: string) {
    setInputValue(value);
  }

  return (
    <>
      <label className={styles.inputLabel}>
        {label} {error && <span>{error}</span>}
      </label>
      <div className={`${styles.container} ${error ? styles.inputError : ''}`}>
        <Icon
          size={24}
          color={inputRef.current?.value ? '#FFC312' : '#797d9a'}
        />
        <select
          {...rest}
          defaultValue={defaultValue}
          onChange={event => handleChange(event.target.value)}
        >
          <option value="" disabled selected>
            Selecione
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
