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

interface InputReferenceValue {
  value: string;
}

export function SelectInput({
  icon: Icon,
  name,
  label,
  options,
  ...rest
}: SelectInputProps): JSX.Element {
  const { fieldName, defaultValue = '', error, registerField } = useField(name);
  const [inputValue, setInputValue] = useState(defaultValue);

  const inputRef = useRef<InputReferenceValue>({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        console.log(ref);

        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  // function handleChange(value: string) {
  //   inputRef.current.value = value;
  //   setInputValue(value);
  // }

  return (
    <>
      <label className={styles.inputLabel}>
        {label} {error && <span>{error}</span>}
      </label>
      <div className={`${styles.container} ${error ? styles.inputError : ''}`}>
        <Icon size={24} color={inputValue ? '#FFC312' : '#797d9a'} />
        <select
          {...rest}
          className={`${!inputValue ? styles.hasPlaceholder : styles.selected}`}
          // defaultChecked={defaultValue}
          defaultValue={defaultValue}
          // onChange={event => handleChange(event.target.value)}
        >
          <option value="" disabled>
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
