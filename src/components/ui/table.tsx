'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FC } from 'react';

function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div data-slot="table-wrapper" className="relative w-full overflow-auto">
      <table data-slot="table" className={cn('w-full caption-bottom text-foreground text-sm', className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />;
}

function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody data-slot="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-t bg-muted/50 font-medium last:[&>tr]:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-12 px-4 text-left rtl:text-right align-middle font-normal text-muted-foreground [&:has([role=checkbox])]:pe-0',
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td data-slot="table-cell" className={cn('p-4 align-middle [&:has([role=checkbox])]:pe-0', className)} {...props} />
  );
}

function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption data-slot="table-caption" className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  );
}

interface CustomHeaderProps {
  headLabel: Array<{
    id: string;
    label: string;
    align?: string;
  }>;
}
  
const TableHeadCustom: FC<CustomHeaderProps> = ({ headLabel }) => {

  const getTextAlignClass = (align?: string) => {
    switch (align) {
      case "right":
        return "text-right";
      case "center":
        return "text-center";
      default:
        return "text-left";
    }
  };

  return (
    <TableHeader>
      <TableRow className="">
        {headLabel.map((header: any) => (
          <TableHead
            key={header.id}
            className={cn(
              "text-[12px] py-4  ",
              "text-slate-700 dark:text-white",
              "bg-[#fbfbfb] dark:bg-slate-800",
              "border-b border-slate-300 dark:border-slate-700",
              getTextAlignClass(header.align)
            )}
          >
            {header.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
}: PaginationControlsProps) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let end = start + maxPagesToShow - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPagesToShow + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <Pagination className="mt-3 flex flex-wrap items-center justify-end gap-4 text-sm">
      <div className="text-muted-foreground">
        Page {currentPage} of {totalPages} | Total: {totalRecords}
      </div>

      {/* Pagination */}
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href="#"
              isActive={pageNum === currentPage}
              onClick={(e) => {
                e.preventDefault();
                if (pageNum !== currentPage) onPageChange(pageNum);
              }}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

'use client';

import { ReactNode } from 'react';
import { LoadingBar } from './table-bar-loading';

interface TableBodyWrapperProps {
  loading?: boolean;
  colSpan: number;
  dataLength: number;
  emptyMessage?: string;
  children: ReactNode;
}

const TableBodyWrapper = ({
  loading,
  colSpan,
  dataLength,
  emptyMessage = 'No data found',
  children,
}: TableBodyWrapperProps) => {
  return (
    <TableBody>
      {loading ? (
        <tr>
          <td colSpan={colSpan} className="py-0 text-center">
            <LoadingBar variant="default" />
          </td>
        </tr>
      ) : dataLength === 0 ? (
        <tr>
          <td
            colSpan={colSpan}
            className="h-[40vh] border-b-0 text-center align-middle"
          >
            <div className="flex h-full w-full items-center justify-center text-xl">
              {emptyMessage}
            </div>
          </td>
        </tr>
      ) : (
        children
      )}
    </TableBody>
  );
};




export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableHeadCustom ,PaginationControls, TableBodyWrapper};
