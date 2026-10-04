import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  FileText,
  HelpCircle,
  Activity,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  School,
  ExternalLink,
  Shield,
  Layers,
  ChevronRight,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import {
  fetchAdminDashboard,
  fetchAllTopics,
  fetchAllLessons,
} from "../../api/adminServices";
import AdminStatusBadge from "../../components/admin/ui/AdminStatusBadge";
import { StatCardSkeleton } from "../../components/admin/ui/AdminSkeleton";
import AdminErrorState from "../../components/admin/ui/AdminErrorState";

export default function Admin() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    users: 0,
    topics: 0,
    lessons: 0,
    activeUsers: 0,
    quizzes: 0,
    publishedQuizzes: 0,
    recentActivities: [],
  });

  const [topicList, setTopicList] = useState([]);
  const [lessonList, setLessonList] = useState([]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [dash, topicsData, lessonsData] = await Promise.all([
        fetchAdminDashboard(),
        fetchAllTopics({ limit: 5 }),
        fetchAllLessons(),
      ]);

      setDashboardData(dash);
      setTopicList(topicsData.topics || []);
      setLessonList(lessonsData || []);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
      setError("Failed to load dashboard statistics. Please try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const publishedTopics = topicList.filter((t) => t.isPublished).length;
  const publishedLessons = lessonList.filter((l) => l.isPublished).length;
  const featuredLessons = lessonList.filter((l) => l.isFeatured).length;
  const lessonsWithQuiz = lessonList.filter((l) => l.hasQuiz).length;

  const quizCoveragePercent =
    lessonList.length > 0
      ? Math.round((lessonsWithQuiz / lessonList.length) * 100)
      : 0;

  if (error) {
    return <AdminErrorState message={error} onRetry={loadData} />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-light px-2.5 py-0.5 text-[11px] font-bold text-primary-dark">
                <Shield size={11} />
                ADMINISTRATION DASHBOARD
              </span>
            </div>

            <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Welcome back, {user?.fullName || user?.userName || "Admin"}
            </h1>

            <p className="text-sm text-text-secondary max-w-2xl">
              Here is what is happening across the Project Jhep education platform today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition disabled:opacity-50"
              title="Refresh dashboard stats"
            >
              <RefreshCw
                size={13}
                className={loading ? "animate-spin text-primary" : ""}
              />
              <span>Refresh</span>
            </button>

            <Link
              to="/admin/topics/add"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark transition"
            >
              <Plus size={15} />
              <span>Create Topic</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KEY METRICS */}
      {loading ? (
        <StatCardSkeleton count={4} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Users */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Total Users
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users size={18} strokeWidth={2} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold tracking-tight text-text-primary">
                {dashboardData.users}
              </span>
              <span className="text-xs text-text-muted">registered</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs text-text-secondary">
              <span>Active users right now</span>
              <span className="inline-flex items-center gap-1 font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                {dashboardData.activeUsers}
              </span>
            </div>
          </div>

          {/* Topics */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Topics
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-primary">
                <BookOpen size={18} strokeWidth={2} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold tracking-tight text-text-primary">
                {dashboardData.topics}
              </span>
              <span className="text-xs text-text-muted">topics created</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs text-text-secondary">
              <span>Published status</span>
              <span className="font-semibold text-text-primary">
                {publishedTopics} published
              </span>
            </div>
          </div>

          {/* Lessons */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Lessons
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FileText size={18} strokeWidth={2} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold tracking-tight text-text-primary">
                {dashboardData.lessons}
              </span>
              <span className="text-xs text-text-muted">total lessons</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs text-text-secondary">
              <span>Featured lessons</span>
              <span className="font-semibold text-amber-600">
                {featuredLessons} / 6
              </span>
            </div>
          </div>

          {/* Quizzes */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Quizzes
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <HelpCircle size={18} strokeWidth={2} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold tracking-tight text-text-primary">
                {dashboardData.quizzes}
              </span>
              <span className="text-xs text-text-muted">assessments</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs text-text-secondary">
              <span>Quiz coverage</span>
              <span className="font-semibold text-text-primary">
                {quizCoveragePercent}% of lessons
              </span>
            </div>
          </div>
        </div>
      )}

      {/* HEALTH & QUICK ACTIONS ROW */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions Card */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-text-primary">
                Quick Actions
              </h3>
              <Sparkles size={16} className="text-primary" />
            </div>
            <p className="mt-1 text-xs text-text-secondary">
              Frequently accessed administrative tasks.
            </p>

            <div className="mt-5 space-y-2">
              <Link
                to="/admin/topics/add"
                className="flex items-center justify-between rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs font-semibold text-text-primary hover:border-primary-light hover:bg-surface-muted transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <BookOpen size={14} />
                  </div>
                  <span>Create Topic</span>
                </div>
                <Plus size={14} className="text-text-muted" />
              </Link>

              <Link
                to="/admin/lessons/add"
                className="flex items-center justify-between rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs font-semibold text-text-primary hover:border-primary-light hover:bg-surface-muted transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <FileText size={14} />
                  </div>
                  <span>Add Lesson</span>
                </div>
                <Plus size={14} className="text-text-muted" />
              </Link>

              <Link
                to="/admin/quizzes/add"
                className="flex items-center justify-between rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs font-semibold text-text-primary hover:border-primary-light hover:bg-surface-muted transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <HelpCircle size={14} />
                  </div>
                  <span>Create Quiz</span>
                </div>
                <Plus size={14} className="text-text-muted" />
              </Link>

              <Link
                to="/admin/users/add"
                className="flex items-center justify-between rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs font-semibold text-text-primary hover:border-primary-light hover:bg-surface-muted transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Users size={14} />
                  </div>
                  <span>Manage Users</span>
                </div>
                <ChevronRight size={14} className="text-text-muted" />
              </Link>
            </div>
          </div>

          <div className="mt-5 border-t border-border pt-3">
            <Link
              to="/admin/schools/manage"
              className="flex items-center justify-between text-xs font-medium text-text-secondary hover:text-primary transition"
            >
              <span>Manage Partner Schools</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Content Status & Health Card */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-text-primary">
                Content Health & Coverage
              </h3>
              <p className="mt-0.5 text-xs text-text-secondary">
                Overview of published learning materials across modules.
              </p>
            </div>
            <span className="rounded-full border border-success/20 bg-success-light px-2.5 py-1 text-xs font-bold text-success flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Platform Healthy
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-medium text-text-secondary">Topics Published</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-text-primary">
                  {publishedTopics}
                </span>
                <span className="text-xs text-text-muted">/ {dashboardData.topics}</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${
                      dashboardData.topics > 0
                        ? (publishedTopics / dashboardData.topics) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-medium text-text-secondary">Lessons Published</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-text-primary">
                  {publishedLessons}
                </span>
                <span className="text-xs text-text-muted">/ {dashboardData.lessons}</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-success rounded-full transition-all"
                  style={{
                    width: `${
                      dashboardData.lessons > 0
                        ? (publishedLessons / dashboardData.lessons) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-medium text-text-secondary">Quiz Coverage</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-text-primary">
                  {quizCoveragePercent}%
                </span>
                <span className="text-xs text-text-muted">
                  ({lessonsWithQuiz} lessons)
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${quizCoveragePercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-text-secondary">
            <div className="flex items-center gap-4">
              <span>
                Featured lessons active: <strong>{featuredLessons}/6</strong>
              </span>
              <span>•</span>
              <span>
                Published quizzes: <strong>{dashboardData.publishedQuizzes}</strong>
              </span>
            </div>
            <Link
              to="/admin/lessons/manage"
              className="font-semibold text-primary hover:text-primary-dark transition inline-flex items-center gap-1"
            >
              Manage all lessons
              <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY & CONTENT SHORTCUTS */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent User Activity */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="font-display text-base font-bold text-text-primary">
                Recent User Activity
              </h3>
              <p className="mt-0.5 text-xs text-text-secondary">
                Latest sign-ins and session status.
              </p>
            </div>
            <Link
              to="/admin/activity"
              className="text-xs font-semibold text-primary hover:text-primary-dark transition inline-flex items-center gap-1"
            >
              View audit log
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-4">
            {dashboardData.recentActivities?.length === 0 ? (
              <p className="py-8 text-center text-xs text-text-muted">
                No user activities recorded yet.
              </p>
            ) : (
              <div className="divide-y divide-border/60">
                {dashboardData.recentActivities.slice(0, 5).map((act) => (
                  <div
                    key={act._id}
                    className="flex items-center justify-between py-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted font-bold text-text-secondary">
                        {(act.user?.name || act.user?.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary truncate">
                          {act.user?.name || act.user?.email || "User"}
                        </p>
                        <p className="text-[11px] text-text-muted truncate">
                          {act.user?.email || "No email"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <AdminStatusBadge status={act.status} size="xs" />
                      <p className="mt-1 text-[10px] text-text-muted">
                        {act.loginTime
                          ? new Date(act.loginTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Topics Snapshot */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="font-display text-base font-bold text-text-primary">
                Learning Topics
              </h3>
              <p className="mt-0.5 text-xs text-text-secondary">
                Active modules in your English curriculum.
              </p>
            </div>
            <Link
              to="/admin/topics/manage"
              className="text-xs font-semibold text-primary hover:text-primary-dark transition inline-flex items-center gap-1"
            >
              Manage topics
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-4">
            {topicList.length === 0 ? (
              <p className="py-8 text-center text-xs text-text-muted">
                No topics found. Create your first topic to get started.
              </p>
            ) : (
              <div className="divide-y divide-border/60">
                {topicList.slice(0, 5).map((topic) => (
                  <div
                    key={topic._id}
                    className="flex items-center justify-between py-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-muted flex items-center justify-center">
                        {topic.thumbnail?.url ? (
                          <img
                            src={topic.thumbnail.url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <BookOpen size={14} className="text-primary" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary truncate">
                          {topic.title}
                        </p>
                        <p className="text-[11px] text-text-muted truncate">
                          Order #{topic.order ?? 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <AdminStatusBadge
                        status={topic.isPublished ? "published" : "unpublished"}
                        size="xs"
                      />
                      <Link
                        to={`/admin/topics/edit/${topic._id}`}
                        className="rounded-lg p-1 text-text-muted hover:text-primary hover:bg-surface-muted transition"
                        title="Edit topic"
                      >
                        <ChevronRight size={15} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
