import cn from 'classnames';
import { forwardRef } from 'react';
import * as styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'outline' | 'filled';
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { variant = 'outline', className, ...rest } = props;

  const inputClasses = cn(styles[variant], className);

  return <input className={inputClasses} ref={ref} {...rest} />;
});

Input.displayName = 'Input';
