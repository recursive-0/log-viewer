import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { Input } from '@/components/ui/input/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@/components/ui/table/table';
import { useLogs } from '@/hooks/use-logs';
import { useDashboard } from '@/providers/dashboard-provider';
import { LogEntry, SeverityLevel } from '@/types/common-types';
import { formatTimestamp } from '@/utils/format-date-time';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './content.module.scss';
import { useVirtualList } from '@/hooks/use-virtual-list';

interface Column {
  key: keyof LogEntry;
  label: string;
  visible: boolean;
}

const getSeverityColor = (severity: SeverityLevel) => {
  const colors = {
    DEBUG: '#94A3B8',
    INFO: '#3B82F6',
    WARN: '#F59E0B',
    ERROR: '#EF4444',
  };
  return colors[severity];
};

const CONTAINER_HEIGHT = 500;
const ROW_HEIGHT = 80;

const formatBody = (body: string) => {
  try {
    const parsed = JSON.parse(body);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return body;
  }
};

export const Content = () => {
  const { selectedSeverities } = useDashboard();
  const { logs, isLoading } = useLogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([]);
  const [loadedCount, setLoadedCount] = useState(100);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [columns, setColumns] = useState<Column[]>([
    { key: 'timestamp', label: 'Timestamp', visible: true },
    { key: 'severity', label: 'Severity', visible: true },
    { key: 'body', label: 'Body', visible: true },
  ]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const severityMatch =
        selectedSeverities.length === 0 ||
        selectedSeverities.includes(log.severity);
      const searchMatch =
        searchTerm === '' ||
        log.body.toLowerCase().includes(searchTerm.toLowerCase());
      return severityMatch && searchMatch;
    });
  }, [logs, selectedSeverities, searchTerm]);

  useEffect(() => {
    setDisplayedLogs(filteredLogs.slice(0, loadedCount));
  }, [filteredLogs, loadedCount]);

  const loadMore = useCallback(() => {
    setLoadedCount((prev) => Math.min(prev + 100, filteredLogs.length));
  }, [filteredLogs.length]);

  const toggleColumn = useCallback((columnKey: keyof LogEntry) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  }, []);

  const { start, end, getItemStyle } = useVirtualList({
    rowHeight: ROW_HEIGHT,
    totalItems: displayedLogs.length,
    ref: scrollContainerRef.current,
    containerHeight: CONTAINER_HEIGHT,
  });

  const visibleColumns = columns.filter((col) => col.visible);
  const visibleLogs = displayedLogs.slice(start, end + 1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Log Viewer</h1>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <Input
              type="text"
              placeholder="Search in log body..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <ColumnDropdown columns={columns} onToggleColumn={toggleColumn} />
          </div>
        </div>
      </div>

      <div
        className={styles.tableContainer}
        style={{ height: CONTAINER_HEIGHT }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHeaderCell key={column.key} data-column={column.key}>
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody
            ref={scrollContainerRef}
            style={{
              height: CONTAINER_HEIGHT,
              overflow: 'auto',
              position: 'relative',
            }}
          >
            <div style={{ height: displayedLogs.length * ROW_HEIGHT }}>
              {visibleLogs.map((log, index) => (
                <TableRow key={index} style={getItemStyle(start + index)}>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.key} data-column={column.key}>
                      {column.key === 'timestamp' && (
                        <span className={styles.timestamp}>
                          {formatTimestamp(log[column.key])}
                        </span>
                      )}
                      {column.key === 'severity' && (
                        <span
                          className={styles.severityBadge}
                          style={{
                            backgroundColor: getSeverityColor(log.severity),
                          }}
                        >
                          {log[column.key]}
                        </span>
                      )}
                      {column.key === 'body' && (
                        <pre className={styles.bodyContent}>
                          {formatBody(log[column.key])}
                        </pre>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </div>
          </TableBody>
        </Table>
      </div>

      {displayedLogs.length < filteredLogs.length && (
        <div className={styles.loadMore}>
          <button onClick={loadMore} className={styles.loadMoreBtn}>
            Load More ({filteredLogs.length - displayedLogs.length} remaining)
          </button>
        </div>
      )}

      <div className={styles.stats}>
        Showing {displayedLogs.length} of {filteredLogs.length} logs
      </div>
    </div>
  );
};

interface ColumnDropdownProps {
  columns: Column[];
  onToggleColumn: (key: keyof LogEntry) => void;
  className?: string;
}

const ColumnDropdown = ({
  columns,
  onToggleColumn,
  className,
}: ColumnDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.columnDropdown} ${className || ''}`}
    >
      <Button
        className={styles.customizeBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        Customize
      </Button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownHeader}>Show columns:</div>
          {columns.map((column) => (
            <div key={column.key} className={styles.columnToggle}>
              <Checkbox
                checked={column.visible}
                onChange={() => onToggleColumn(column.key)}
              />
              <span>{column.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
