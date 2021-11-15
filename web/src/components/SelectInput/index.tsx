import { ComponentType, InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import styles from './styles.module.scss';

type OptionProps = {
  label: string;
  value: number | string;
};

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  value: string;
  icon: ComponentType<IconBaseProps>;
  options: OptionProps[];
}

export function SelectInput({
  icon: Icon,
  value,
  options,
  ...rest
}: SelectInputProps): JSX.Element {
  return (
    <div className={`${styles.container}`}>
      <Icon size={24} color={value ? '#FFC312' : '#797d9a'} />
      <select {...rest} defaultValue="">
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
  );
}
