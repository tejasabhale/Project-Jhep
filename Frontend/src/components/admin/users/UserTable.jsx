import React from "react";
import { Pencil, Trash2, UserRound, Phone, Mail, Clock, Activity } from "lucide-react";
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

function formatTimestamp(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function UserTable({
  users = [],
  activityMap = new Map(),
  currentUser,
  onEdit,
  onDelete,
}) {
  // Permission checks
  const canModifyUser = (user) => {
    if (user.role === "owner") return false;
    if (currentUser?.role === "owner") return true;
    if (currentUser?.role === "admin") {
      const createdById = user.createdBy?._id || user.createdBy;
      return String(createdById) === String(currentUser?._id);
    }
    return false;
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <AdminTableWrapper>
          <AdminTable>
            <AdminTableHeader>
              <AdminTableRow>
                <AdminTableHead className="w-[24%]">Name & Identity</AdminTableHead>
                <AdminTableHead className="w-[20%]">Contact</AdminTableHead>
                <AdminTableHead className="w-[12%]">Role</AdminTableHead>
                <AdminTableHead className="w-[12%]">Status</AdminTableHead>
                <AdminTableHead className="w-[12%]">Joined</AdminTableHead>
                <AdminTableHead className="w-[12%]">Last Activity</AdminTableHead>
                <AdminTableHead className="w-[8%] text-right">Actions</AdminTableHead>
              </AdminTableRow>
            </AdminTableHeader>

            <AdminTableBody>
              {users.map((user) => {
                const canModify = canModifyUser(user);
                const lastAct = activityMap.get(user._id?.toString());
                const isActiveSession = lastAct?.status === "active";

                return (
                  <AdminTableRow key={user._id}>
                    {/* User Profile */}
                    <AdminTableCell>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light font-display text-xs font-bold text-primary-dark">
                          {user.fullName ? (
                            user.fullName.charAt(0).toUpperCase()
                          ) : (
                            <UserRound size={15} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold text-text-primary truncate">
                            {user.fullName || "Unnamed User"}
                          </div>
                          <div className="text-xs text-text-muted font-mono truncate mt-0.5">
                            @{user.userName || "unknown"}
                          </div>
                        </div>
                      </div>
                    </AdminTableCell>

                    {/* Contact */}
                    <AdminTableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary truncate">
                          <Mail size={13} className="text-text-muted shrink-0" />
                          <span className="truncate">{user.email || "No email"}</span>
                        </div>
                        {user.mobileNo && (
                          <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                            <Phone size={13} className="text-text-muted shrink-0" />
                            <span>{user.mobileNo}</span>
                          </div>
                        )}
                      </div>
                    </AdminTableCell>

                    {/* Role */}
                    <AdminTableCell>
                      <AdminStatusBadge status={user.role || "user"} size="xs" />
                    </AdminTableCell>

                    {/* Status */}
                    <AdminTableCell>
                      <AdminStatusBadge
                        status={isActiveSession ? "active" : "inactive"}
                        label={isActiveSession ? "Online" : "Standard"}
                        size="xs"
                      />
                    </AdminTableCell>

                    {/* Joined Date */}
                    <AdminTableCell>
                      <span className="text-xs text-text-secondary">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </span>
                    </AdminTableCell>

                    {/* Last Activity */}
                    <AdminTableCell>
                      {lastAct?.loginTime || lastAct?.createdAt ? (
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                          <Clock size={12} className="text-text-muted shrink-0" />
                          <span>{formatTimestamp(lastAct.loginTime || lastAct.createdAt)}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-text-muted italic">No activity</span>
                      )}
                    </AdminTableCell>

                    {/* Actions */}
                    <AdminTableCell className="text-right">
                      {canModify ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onEdit(user)}
                            className="rounded-lg border border-border bg-surface p-1.5 text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
                            title="Edit user"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => onDelete(user)}
                            className="rounded-lg border border-border bg-surface p-1.5 text-text-secondary hover:bg-error-light hover:text-error transition"
                            title="Delete user"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-text-muted italic">
                          {user.role === "owner" ? "Owner Protected" : "Read-only"}
                        </span>
                      )}
                    </AdminTableCell>
                  </AdminTableRow>
                );
              })}
            </AdminTableBody>
          </AdminTable>
        </AdminTableWrapper>
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="space-y-3 lg:hidden">
        {users.map((user) => {
          const canModify = canModifyUser(user);
          const lastAct = activityMap.get(user._id?.toString());
          const isActiveSession = lastAct?.status === "active";

          return (
            <div
              key={user._id}
              className="rounded-2xl border border-border bg-surface p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light font-display text-sm font-bold text-primary-dark">
                    {user.fullName ? (
                      user.fullName.charAt(0).toUpperCase()
                    ) : (
                      <UserRound size={16} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-bold text-text-primary truncate text-sm">
                      {user.fullName || "Unnamed User"}
                    </p>
                    <p className="text-xs text-text-muted font-mono truncate">
                      @{user.userName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <AdminStatusBadge status={user.role || "user"} size="xs" />
                  <AdminStatusBadge
                    status={isActiveSession ? "active" : "inactive"}
                    label={isActiveSession ? "Online" : "Standard"}
                    size="xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5 border-t border-border pt-3 text-xs text-text-secondary">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Email:</span>
                  <span className="truncate max-w-[200px] font-medium text-text-primary">{user.email}</span>
                </div>
                {user.mobileNo && (
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Mobile:</span>
                    <span className="font-mono text-text-primary">{user.mobileNo}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Joined:</span>
                  <span>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Last Activity:</span>
                  <span>
                    {lastAct?.loginTime || lastAct?.createdAt
                      ? formatTimestamp(lastAct.loginTime || lastAct.createdAt)
                      : "No activity"}
                  </span>
                </div>
              </div>

              {canModify && (
                <div className="grid grid-cols-2 gap-2 border-t border-border pt-2.5">
                  <button
                    type="button"
                    onClick={() => onEdit(user)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
                  >
                    <Pencil size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(user)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-error/20 bg-error-light px-3 py-2 text-xs font-semibold text-error hover:bg-error-light/80 transition"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
