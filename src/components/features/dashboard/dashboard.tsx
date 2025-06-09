import { Content } from '@/components/features/content/content';
import { Sidebar } from '@/components/features/sidebar/sidebar';
import { ThemeSwitcher } from '@/components/features/theme-switcher/theme-switcher';
import { DashboardProvider } from '@/providers/dashboard-provider';
import * as styles from './dashboard.module.scss';

export const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <DashboardProvider>
        <Sidebar />
        <Content />
        <ThemeSwitcher />
      </DashboardProvider>
    </div>
  );
};
