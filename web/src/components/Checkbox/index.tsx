import { useState, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import { FiCheck } from 'react-icons/fi';
import styles from './styles.module.scss';

type Option = {
  label: string;
  value: string;
};

type CheckboxProps = {
  options: Option[];
  label: string;
  name: string;
};

type InputReferenceValue = {
  value: string[];
};

export function Checkbox({ options, label, name }: CheckboxProps): JSX.Element {
  const { registerField, defaultValue = [], error, fieldName } = useField(name);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const inputRef = useRef<InputReferenceValue>({ value: defaultValue });

  function handleSelectOption(option: string) {
    const findOptionIndex = selectedValues.findIndex(
      selected => selected === option,
    );

    if (findOptionIndex >= 0) {
      setSelectedValues(selectedValues.filter(selected => selected !== option));
      return;
    }

    setSelectedValues([...selectedValues, option]);
    inputRef.current.value = [...selectedValues, option];
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
        setSelectedValues(value as string[]);
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField, selectedValues]);

  return (
    <div>
      <label className={styles.inputLabel}>
        {label} {error && <span>{error}</span>}
      </label>

      <div className={styles.container}>
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelectOption(option.value)}
          >
            <div
              className={
                selectedValues.includes(option.value)
                  ? styles.selected
                  : styles.empty
              }
            >
              {selectedValues.includes(option.value) && (
                <FiCheck color="#fff" size={20} />
              )}
            </div>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
