import cn from 'classnames';
import * as styles from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const { children, variant = 'primary', className, ...rest } = props;

  const buttonClasses = cn(styles[variant], className);

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};
