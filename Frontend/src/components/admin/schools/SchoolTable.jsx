import React from "react";
import { Edit3, Trash2, MapPin, School, Power } from "lucide-react";
import AdminStatusBadge from "../ui/AdminStatusBadge";
import {
  AdminTableWrapper,
  AdminTable,
  AdminTableHeader,
  AdminTableHead,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
} from "../ui/AdminTable";

export default function SchoolTable({
  schools = [],
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <AdminTableWrapper>
          <AdminTable>
            <AdminTableHeader>
              <AdminTableRow>
                <AdminTableHead className="w-[38%]">
                  School Name & Order
                </AdminTableHead>
                <AdminTableHead className="w-[28%]">
                  Location
                </AdminTableHead>
                <AdminTableHead className="w-[18%]">
                  Status
                </AdminTableHead>
                <AdminTableHead className="w-[16%] text-right">
                  Actions
                </AdminTableHead>
              </AdminTableRow>
            </AdminTableHeader>

            <AdminTableBody>
              {schools.map((school) => (
                <AdminTableRow key={school._id}>
                  {/* Name & Order */}
                  <AdminTableCell>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary-light text-primary">
                        <School size={18} strokeWidth={2} />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary truncate">
                          {school.name}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">
                          Display Order: #{school.order ?? 0}
                        </p>
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Location */}
                  <AdminTableCell>
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <MapPin size={14} className="shrink-0 text-text-muted" />
                      <span className="truncate">{school.location}</span>
                    </div>
                  </AdminTableCell>

                  {/* Status */}
                  <AdminTableCell>
                    <div className="flex items-center gap-2">
                      <AdminStatusBadge
                        status={school.isActive ? "active" : "inactive"}
                      />
                      <button
                        type="button"
                        onClick={() => onToggleStatus(school)}
                        className="rounded px-2 py-0.5 text-[11px] font-medium text-text-secondary hover:bg-background hover:text-text-primary border border-transparent hover:border-border transition"
                        title={
                          school.isActive
                            ? "Click to deactivate"
                            : "Click to activate"
                        }
                      >
                        {school.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </AdminTableCell>

                  {/* Actions */}
                  <AdminTableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(school)}
                        className="rounded-md p-1.5 text-text-secondary hover:bg-primary-light hover:text-primary transition"
                        title="Edit school"
                      >
                        <Edit3 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(school)}
                        className="rounded-md p-1.5 text-text-secondary hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete school"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ))}
            </AdminTableBody>
          </AdminTable>
        </AdminTableWrapper>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="space-y-3 lg:hidden">
        {schools.map((school) => (
          <div
            key={school._id}
            className="rounded-2xl border border-border bg-surface p-4 shadow-xs space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-primary">
                <School size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-text-primary truncate text-sm">
                    {school.name}
                  </h4>
                  <AdminStatusBadge
                    status={school.isActive ? "active" : "inactive"}
                    size="xs"
                  />
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary">
                  <MapPin size={13} className="text-text-muted shrink-0" />
                  <span className="truncate">{school.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-text-muted">
              <span>Display Order: #{school.order ?? 0}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-border pt-2.5">
              <button
                type="button"
                onClick={() => onToggleStatus(school)}
                className={`flex items-center justify-center gap-1 rounded-xl border px-2.5 py-2 text-xs font-semibold ${
                  school.isActive
                    ? "border-border bg-surface text-text-secondary"
                    : "border-success/30 bg-success-light text-success"
                }`}
              >
                <Power size={13} />
                <span>{school.isActive ? "Deactivate" : "Activate"}</span>
              </button>

              <button
                type="button"
                onClick={() => onEdit(school)}
                className="flex items-center justify-center gap-1 rounded-xl border border-border bg-surface px-2.5 py-2 text-xs font-semibold text-text-secondary"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => onDelete(school)}
                className="flex items-center justify-center gap-1 rounded-xl border border-error/20 bg-error-light px-2.5 py-2 text-xs font-semibold text-error"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
