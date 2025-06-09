import { generateMockLogs } from '@/mock/log-service';
import { LogEntry } from '@/types/common-types';
import { useEffect, useState } from 'react';

// this hook is responsible for dealing with the logs from the backend
export const useLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockLogs = generateMockLogs(10000);
    setLogs(mockLogs);
    setIsLoading(false);
  }, []);

  return {
    logs,
    isLoading,
  };
};
