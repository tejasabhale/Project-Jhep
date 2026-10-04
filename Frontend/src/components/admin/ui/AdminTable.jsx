import React from "react";

export function AdminTableWrapper({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-xs ${className}`}
    >
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function AdminTable({ children, className = "" }) {
  return (
    <table className={`w-full text-left text-sm ${className}`}>
      {children}
    </table>
  );
}

export function AdminTableHeader({ children, className = "" }) {
  return (
    <thead
      className={`border-b border-border bg-surface-muted/60 text-[11px] font-bold uppercase tracking-wider text-text-muted ${className}`}
    >
      {children}
    </thead>
  );
}

export function AdminTableBody({ children, className = "" }) {
  return (
    <tbody className={`divide-y divide-border/60 ${className}`}>
      {children}
    </tbody>
  );
}

export function AdminTableRow({ children, className = "", onClick = null }) {
  return (
    <tr
      onClick={onClick}
      className={`transition-colors duration-150 hover:bg-surface-muted/40 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </tr>
  );
}

export function AdminTableHead({ children, className = "" }) {
  return (
    <th className={`px-4 py-3.5 align-middle font-bold ${className}`}>
      {children}
    </th>
  );
}

export function AdminTableCell({ children, className = "", isHeader = false }) {
  if (isHeader) {
    return (
      <th className={`px-4 py-3.5 align-middle font-bold ${className}`}>
        {children}
      </th>
    );
  }
  return (
    <td className={`px-4 py-3.5 align-middle text-text-primary ${className}`}>
      {children}
    </td>
  );
}

export default {
  Wrapper: AdminTableWrapper,
  Table: AdminTable,
  Header: AdminTableHeader,
  Body: AdminTableBody,
  Row: AdminTableRow,
  Cell: AdminTableCell,
};
