import { ComponentPropsWithoutRef, forwardRef } from 'react';
import * as styles from './table.module.scss';

export interface TableProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export const Table = forwardRef<HTMLDivElement, TableProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.table} ${className || ''}`}
        {...props}
      />
    );
  }
);

Table.displayName = 'Table';

export interface TableHeaderProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.tableHeader} ${className || ''}`}
        {...props}
      />
    );
  }
);

TableHeader.displayName = 'TableHeader';

export interface TableBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export const TableBody = forwardRef<HTMLDivElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.tableBody} ${className || ''}`}
        {...props}
      />
    );
  }
);

TableBody.displayName = 'TableBody';

export interface TableRowProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.tableRow} ${className || ''}`}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  width?: string;
}

export const TableHeaderCell = forwardRef<HTMLDivElement, TableHeaderCellProps>(
  ({ className, width, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.headerCell} ${className || ''}`}
        style={{ width, ...style }}
        {...props}
      />
    );
  }
);

TableHeaderCell.displayName = 'TableHeaderCell';

export interface TableCellProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  width?: string;
}

export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  ({ className, width, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.tableCell} ${className || ''}`}
        style={{ width, ...style }}
        {...props}
      />
    );
  }
);

TableCell.displayName = 'TableCell';
