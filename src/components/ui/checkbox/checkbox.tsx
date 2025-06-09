import cn from 'classnames';
import * as styles from './checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Checkbox = ({
  checked,
  onChange,
  children,
  className,
  disabled,
}: CheckboxProps) => {
  const checkboxClasses = cn(
    styles.checkbox,
    {
      [styles.checked]: checked,
      [styles.disabled]: disabled,
    },
    className
  );

  const handleClick = () => {
    if (!disabled) {
      onChange();
    }
  };

  return (
    <div className={styles.checkboxWrapper} onClick={handleClick}>
      <div className={checkboxClasses}>
        {checked && (
          <svg className={styles.checkIcon} viewBox="0 0 16 16" fill="none">
            <path
              d="M13.5 4.5L6 12L2.5 8.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {children && <span className={styles.label}>{children}</span>}
    </div>
  );
};
