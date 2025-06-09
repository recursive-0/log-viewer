import { SeverityLevel } from '@/types/common-types';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface DashboardContextType {
  selectedSeverities: SeverityLevel[];
  setSelectedSeverities: (severities: SeverityLevel[]) => void;
}

export const dashboardContext = createContext<DashboardContextType>({
  selectedSeverities: [],
  setSelectedSeverities: () => {},
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSeverities, setSelectedSeverities] = useState<SeverityLevel[]>(
    []
  );

  const value = useMemo(() => {
    return {
      selectedSeverities,
      setSelectedSeverities,
    };
  }, [selectedSeverities]);

  return (
    <dashboardContext.Provider value={value}>
      {children}
    </dashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(dashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
