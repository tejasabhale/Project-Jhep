import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, ArrowLeft } from "lucide-react";

import LessonSidebar from "../../components/lesson/LessonSidebar";
import ContentTab from "../../components/lesson/ContentTab";
import QuizTab from "../../components/lesson/QuizTab";
import ErrorState from "../../components/common/ErrorState";

import useLesson from "../../hooks/useLesson";

const TABS = {
  content: "content",
  // quiz: "quiz",
};

export default function Lesson() {
  const navigate = useNavigate();

  const { lessonId } = useParams();

  const { lesson, contents, quiz, loading, error, retry } = useLesson(lessonId);

  const [activeTab, setActiveTab] = useState(TABS.content);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [activeTab]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-orange-50">
        <Loader className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-orange-50">
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-orange-50">
      <LessonSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-orange-600 transition hover:bg-orange-100"
            >
              <ArrowLeft size={18} />
              Back to Lessons
            </button>

            <div className="mb-8">
              <p className="text-sm font-medium text-orange-600">
                {lesson?.topic?.title}
              </p>

              <h1 className="mt-2 text-4xl font-extrabold text-slate-800">
                {lesson?.title}
              </h1>

              {lesson?.description && (
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                  {lesson.description}
                </p>
              )}
            </div>

            {activeTab === TABS.content && <ContentTab contents={contents} />}

            {activeTab === TABS.quiz && <QuizTab quiz={quiz} />}
          </div>
        </main>
      </div>
    </div>
  );
}
