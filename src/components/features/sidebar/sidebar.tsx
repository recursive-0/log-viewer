import { Button } from '@/components/ui/button/button';
import { useDashboard } from '@/providers/dashboard-provider';
import { SeverityLevel } from '@/types/common-types';
import * as styles from './sidebar.module.scss';

const severityLevels: {
  value: SeverityLevel;
  label: string;
  color: string;
}[] = [
  {
    value: 'DEBUG',
    label: 'Debug',
    color: '#94A3B8',
  },
  {
    value: 'INFO',
    label: 'Info',
    color: '#3B82F6',
  },
  {
    value: 'WARN',
    label: 'Warning',
    color: '#F59E0B',
  },
  {
    value: 'ERROR',
    label: 'Error',
    color: '#EF4444',
  },
];

export const Sidebar = () => {
  const { selectedSeverities, setSelectedSeverities } = useDashboard();
  const handleSeverityToggle = (severity: SeverityLevel) => {
    const isSelected = selectedSeverities.includes(severity);

    if (isSelected) {
      setSelectedSeverities(selectedSeverities.filter((s) => s !== severity));
    } else {
      setSelectedSeverities([...selectedSeverities, severity]);
    }
  };

  const handleSelectAll = () => {
    if (selectedSeverities.length === severityLevels.length) {
      setSelectedSeverities([]);
    } else {
      setSelectedSeverities(severityLevels.map((level) => level.value));
    }
  };

  const isAllSelected = selectedSeverities.length === severityLevels.length;

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        <button className={styles.selectAllBtn} onClick={handleSelectAll}>
          {isAllSelected ? 'Clear All' : 'Select All'}
        </button>
      </div>

      <div className={styles.filterList}>
        {severityLevels.map(({ value, label, color }) => {
          const isSelected = selectedSeverities.includes(value);

          return (
            <Button
              key={value}
              className={`${styles.filterItem} ${
                isSelected ? styles.selected : ''
              }`}
              onClick={() => handleSeverityToggle(value)}
            >
              <div
                className={styles.indicator}
                style={{ backgroundColor: color }}
              />
              <span className={styles.label}>{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
