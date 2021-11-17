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

  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);

  const inputRef = useRef<InputReferenceValue>(null);

  function handleSelectOption(option: string) {
    const findOptionIndex = selectedValues.findIndex(
      selected => selected === option,
    );

    if (findOptionIndex >= 0) {
      setSelectedValues(selectedValues.filter(selected => selected !== option));
      return;
    }

    setSelectedValues(oldState => [...oldState, option]);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: () => {
        return selectedValues;
      },
      clearValue: () => {
        setSelectedValues([]);
        return '';
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
