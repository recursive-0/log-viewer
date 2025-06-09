export type SeverityLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LogEntry {
  timestamp: string;
  severity: SeverityLevel;
  body: string;
}

export type Theme = 'middleware' | 'glass';
