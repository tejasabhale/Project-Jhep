import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Activity as ActivityIcon,
  RefreshCw,
  Clock,
  UserCheck,
  UserX,
  UserRound,
} from "lucide-react";
import { toast } from "react-hot-toast";

import AdminPageHeader from "../../../components/admin/ui/AdminPageHeader";
import AdminToolbar from "../../../components/admin/ui/AdminToolbar";
import AdminStatusBadge from "../../../components/admin/ui/AdminStatusBadge";
import AdminEmptyState from "../../../components/admin/ui/AdminEmptyState";
import AdminErrorState from "../../../components/admin/ui/AdminErrorState";
import { TableSkeleton } from "../../../components/admin/ui/AdminSkeleton";
import {
  AdminTableWrapper,
  AdminTable,
  AdminTableHeader,
  AdminTableHead,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
} from "../../../components/admin/ui/AdminTable";

import { fetchUserActivities } from "../../../api/adminServices";

// Format duration helper
function formatDuration(loginTime, logoutTime) {
  if (!loginTime) return "—";
  if (!logoutTime) return "In progress";

  const diffMs = new Date(logoutTime) - new Date(loginTime);
  if (isNaN(diffMs) || diffMs < 0) return "—";

  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "< 1 min";
  if (diffMinutes < 60) return `${diffMinutes} min`;

  const hours = Math.floor(diffMinutes / 60);
  const remMinutes = diffMinutes % 60;
  return `${hours}h ${remMinutes}m`;
}

// Format date helper
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

export default function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchActivities = useCallback(async (isSilent = false) => {
    try {
      if (isSilent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const data = await fetchUserActivities();
      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch activity:", err);
      setError(err?.response?.data?.message || "Failed to load activity logs.");
      toast.error("Unable to load activity logs.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Filtered activities
  const filteredActivities = useMemo(() => {
    const q = search.trim().toLowerCase();

    return activities.filter((act) => {
      const userName = act.user?.name || act.user?.fullName || "";
      const userEmail = act.user?.email || "";

      const matchesSearch =
        !q ||
        userName.toLowerCase().includes(q) ||
        userEmail.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" || act.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [activities, search, statusFilter]);

  // Metrics
  const totalCount = activities.length;
  const activeCount = activities.filter((a) => a.status === "active").length;
  const offlineCount = activities.filter((a) => a.status === "offline").length;

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="User Activity"
        subtitle="Live audit trail of user authentication, active sessions, and access history."
        badge={`${totalCount} ${totalCount === 1 ? "session" : "sessions"}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "User Activity" },
        ]}
        actions={
          <button
            type="button"
            disabled={refreshing || loading}
            onClick={() => fetchActivities(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-text-primary shadow-xs transition hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 active:bg-secondary-light/40 disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin text-primary" : "text-text-muted"}
            />
            {refreshing ? "Refreshing..." : "Refresh Logs"}
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Total Logged Sessions
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <ActivityIcon size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {totalCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Recorded authentication events</p>
        </div>

        <div className="rounded-xl border border-success/20 bg-success/5 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-success">
              Active Sessions
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15 text-success">
              <UserCheck size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-success">
            {activeCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Users currently authenticated</p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Ended / Offline
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-text-muted">
              <UserX size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {offlineCount}
          </div>
          <p className="mt-1 text-xs text-text-muted">Closed or expired sessions</p>
        </div>
      </div>

      {/* Toolbar */}
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by user name or email address..."
        totalCount={totalCount}
        filteredCount={filteredActivities.length}
        onReset={handleResetFilters}
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Sessions", value: "all" },
              { label: "Active Only", value: "active" },
              { label: "Offline Only", value: "offline" },
            ],
          },
        ]}
      />

      {/* Table Content */}
      {loading ? (
        <TableSkeleton rows={6} columns={5} />
      ) : error ? (
        <AdminErrorState
          title="Failed to Load Activities"
          message={error}
          onRetry={fetchActivities}
        />
      ) : activities.length === 0 ? (
        <AdminEmptyState
          title="No activity recorded"
          description="Activity events will appear here when users sign in to the platform."
        />
      ) : filteredActivities.length === 0 ? (
        <AdminEmptyState
          isFiltered
          title="No matching activity logs"
          description="No sessions match your search keywords or filter criteria."
          onResetFilters={handleResetFilters}
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <AdminTableWrapper>
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
                    <AdminTableHead className="w-[30%]">User</AdminTableHead>
                    <AdminTableHead className="w-[15%]">Status</AdminTableHead>
                    <AdminTableHead className="w-[22%]">Login Time</AdminTableHead>
                    <AdminTableHead className="w-[20%]">Logout Time</AdminTableHead>
                    <AdminTableHead className="w-[13%] text-right">Duration</AdminTableHead>
                  </AdminTableRow>
                </AdminTableHeader>

                <AdminTableBody>
                  {filteredActivities.map((act) => {
                    const userName = act.user?.name || act.user?.fullName || "Unknown User";
                    const userEmail = act.user?.email || "No email";
                    const duration = formatDuration(act.loginTime, act.logoutTime);

                    return (
                      <AdminTableRow key={act._id}>
                        {/* User */}
                        <AdminTableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light font-semibold text-primary text-xs border border-primary/20">
                              {userName ? userName.charAt(0).toUpperCase() : <UserRound size={14} />}
                            </div>

                            <div className="min-w-0">
                              <div className="font-semibold text-text-primary truncate">
                                {userName}
                              </div>
                              <div className="text-xs text-text-secondary truncate mt-0.5">
                                {userEmail}
                              </div>
                            </div>
                          </div>
                        </AdminTableCell>

                        {/* Status */}
                        <AdminTableCell>
                          <AdminStatusBadge
                            status={act.status === "active" ? "active" : "inactive"}
                            label={act.status === "active" ? "Active Now" : "Offline"}
                          />
                        </AdminTableCell>

                        {/* Login Time */}
                        <AdminTableCell>
                          <div className="text-xs text-text-primary font-mono">
                            {formatTimestamp(act.loginTime || act.createdAt)}
                          </div>
                        </AdminTableCell>

                        {/* Logout Time */}
                        <AdminTableCell>
                          <div className="text-xs text-text-secondary font-mono">
                            {act.logoutTime ? (
                              formatTimestamp(act.logoutTime)
                            ) : (
                              <span className="text-success font-sans italic">
                                Active session
                              </span>
                            )}
                          </div>
                        </AdminTableCell>

                        {/* Duration */}
                        <AdminTableCell className="text-right">
                          <span className="font-mono text-xs text-text-primary bg-background border border-border px-2 py-0.5 rounded">
                            {duration}
                          </span>
                        </AdminTableCell>
                      </AdminTableRow>
                    );
                  })}
                </AdminTableBody>
              </AdminTable>
            </AdminTableWrapper>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {filteredActivities.map((act) => {
              const userName = act.user?.name || act.user?.fullName || "Unknown User";
              const userEmail = act.user?.email || "No email";
              const duration = formatDuration(act.loginTime, act.logoutTime);

              return (
                <div
                  key={act._id}
                  className="rounded-xl border border-border bg-surface p-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light font-bold text-primary text-sm border border-primary/20">
                        {userName ? userName.charAt(0).toUpperCase() : <UserRound size={16} />}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary truncate">
                          {userName}
                        </p>
                        <p className="text-xs text-text-secondary truncate mt-0.5">
                          {userEmail}
                        </p>
                      </div>
                    </div>

                    <AdminStatusBadge
                      status={act.status === "active" ? "active" : "inactive"}
                      label={act.status === "active" ? "Active" : "Offline"}
                    />
                  </div>

                  <div className="mt-3 space-y-1.5 border-t border-border/60 pt-3 text-xs text-text-secondary font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted font-sans">Login:</span>
                      <span className="text-text-primary">{formatTimestamp(act.loginTime || act.createdAt)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-muted font-sans">Logout:</span>
                      <span>
                        {act.logoutTime ? (
                          <span className="text-text-primary">{formatTimestamp(act.logoutTime)}</span>
                        ) : (
                          <span className="text-success font-sans italic">
                            Active session
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-text-muted font-sans">Duration:</span>
                      <span className="rounded bg-background border border-border px-2 py-0.5 font-sans font-medium text-text-primary">
                        {duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
