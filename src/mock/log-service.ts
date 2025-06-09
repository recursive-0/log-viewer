import { LogEntry, SeverityLevel } from '@/types/common-types';

const SEVERITY_LEVELS: SeverityLevel[] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
const ACTIONS = [
  'User login',
  'API request',
  'Database query',
  'Cache access',
  'File upload',
  'Authentication check',
];
const STATUSES = [
  'successful',
  'failed',
  'processed',
  'initiated',
  'completed',
  'timed out',
  'denied',
];
const RESOURCES = [
  '/api/users',
  '/api/products/12345',
  '/auth/token',
  'user_profile_avatar.jpg',
  'main_db_replica_1',
  'product_info_cache',
];

const getRandomElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateMockLogs = (count: number): LogEntry[] => {
  const logs: LogEntry[] = [];

  for (let i = 0; i < count; i++) {
    const timestamp = (
      Date.now() -
      Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toString();
    const severity: SeverityLevel = SEVERITY_LEVELS[
      Math.floor(Math.random() * SEVERITY_LEVELS.length)
    ] as SeverityLevel;
    const composedMessage = `${getRandomElement(ACTIONS)} on resource ${getRandomElement(RESOURCES)} was ${getRandomElement(STATUSES)}.`;

    const messageBody = {
      message: composedMessage,
      userId: Math.floor(Math.random() * count) + 1,
    };

    const message = JSON.stringify(messageBody);
    const logEntry: LogEntry = {
      timestamp: timestamp,
      severity,
      body: message,
    };

    logs.push(logEntry);
  }

  return logs.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
};
