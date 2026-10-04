import React from "react";
import { Edit, Star, Trash2, Power, MessageSquareQuote } from "lucide-react";
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

export default function TestimonialTable({
  testimonials = [],
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
                <AdminTableHead className="w-[24%]">
                  Student / Author
                </AdminTableHead>
                <AdminTableHead className="w-[42%]">
                  Feedback Review
                </AdminTableHead>
                <AdminTableHead className="w-[12%]">
                  Rating
                </AdminTableHead>
                <AdminTableHead className="w-[10%]">
                  Status
                </AdminTableHead>
                <AdminTableHead className="w-[12%] text-right">
                  Actions
                </AdminTableHead>
              </AdminTableRow>
            </AdminTableHeader>

            <AdminTableBody>
              {testimonials.map((item) => (
                <AdminTableRow key={item._id}>
                  {/* Author */}
                  <AdminTableCell>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light font-bold text-xs text-primary border border-primary/20">
                        {(item.name || "S").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary truncate">
                          {item.name}
                        </p>
                        <span className="text-[11px] text-text-muted">
                          Student Learner
                        </span>
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Review Quote */}
                  <AdminTableCell>
                    <p
                      className="text-xs text-text-secondary leading-relaxed line-clamp-2 italic"
                      title={item.review}
                    >
                      "{item.review}"
                    </p>
                  </AdminTableCell>

                  {/* Rating */}
                  <AdminTableCell>
                    <div className="flex items-center gap-1 text-xs font-bold text-text-primary">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span>{item.rating || 5}.0</span>
                    </div>
                  </AdminTableCell>

                  {/* Status */}
                  <AdminTableCell>
                    <div className="flex items-center gap-2">
                      <AdminStatusBadge
                        status={item.isActive ? "active" : "inactive"}
                      />
                      <button
                        type="button"
                        onClick={() => onToggleStatus(item)}
                        className="rounded px-2 py-0.5 text-[11px] font-medium text-text-secondary hover:bg-background hover:text-text-primary border border-transparent hover:border-border transition"
                        title={item.isActive ? "Deactivate review" : "Activate review"}
                      >
                        {item.isActive ? "Hide" : "Show"}
                      </button>
                    </div>
                  </AdminTableCell>

                  {/* Actions */}
                  <AdminTableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="rounded-md p-1.5 text-text-secondary hover:bg-primary-light hover:text-primary transition"
                        title="Edit testimonial"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="rounded-md p-1.5 text-text-secondary hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete testimonial"
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
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl border border-border bg-surface p-4 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light font-bold text-xs text-primary-dark">
                  {(item.name || "S").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-text-primary truncate text-sm">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                    <Star size={12} className="fill-amber-400" />
                    <span>{item.rating || 5}.0</span>
                  </div>
                </div>
              </div>

              <AdminStatusBadge
                status={item.isActive ? "active" : "inactive"}
                size="xs"
              />
            </div>

            <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 italic bg-background p-3 rounded-xl border border-border/60">
              "{item.review}"
            </p>

            <div className="grid grid-cols-3 gap-2 border-t border-border pt-2.5">
              <button
                type="button"
                onClick={() => onToggleStatus(item)}
                className={`flex items-center justify-center gap-1 rounded-xl border px-2.5 py-2 text-xs font-semibold ${
                  item.isActive
                    ? "border-border bg-surface text-text-secondary"
                    : "border-success/30 bg-success-light text-success"
                }`}
              >
                <Power size={13} />
                <span>{item.isActive ? "Deactivate" : "Activate"}</span>
              </button>

              <button
                type="button"
                onClick={() => onEdit(item)}
                className="flex items-center justify-center gap-1 rounded-xl border border-border bg-surface px-2.5 py-2 text-xs font-semibold text-text-secondary"
              >
                <Edit size={13} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => onDelete(item)}
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
