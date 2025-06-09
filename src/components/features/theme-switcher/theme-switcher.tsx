import { Button } from '@/components/ui/button/button';
import { useTheme } from '@/providers/theme-provider';
import { Theme } from '@/types/common-types';
import cn from 'classnames';
import * as styles from './theme-switcher.module.scss';

const themeOptions: { value: Theme; label: string }[] = [
  { value: 'middleware', label: 'Middleware' },
  { value: 'glass', label: 'Glass' },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className={styles.switcherContainer}>
      {themeOptions.map((theme) => (
        <Button
          key={theme.value}
          onClick={() => setTheme(theme.value)}
          className={cn(styles.themeButton, {
            [styles.active]: currentTheme === theme.value,
          })}
        >
          {theme.label}
        </Button>
      ))}
    </div>
  );
};
