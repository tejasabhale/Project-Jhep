import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, ArrowLeft, Menu } from "lucide-react";

import LessonSidebar from "../../components/lesson/LessonSidebar";
import ContentTab from "../../components/lesson/ContentTab";
import QuizTab from "../../components/lesson/QuizTab";
import QuizQuestions from "../../components/lesson/QuizQuestions";
import QuizResultInline from "../../components/lesson/QuizResultInline";
import ErrorState from "../../components/common/ErrorState";

import useLesson from "../../hooks/useLesson";
import { getQuizByLesson } from "../../api/quiz.api";

const TABS = {
  content: "content",
  quiz: "quiz",
};

export default function Lesson() {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const { lesson, contents, loading, error, retry } = useLesson(lessonId);
  const [activeTab, setActiveTab] = useState(TABS.content);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Quiz states
  const [quiz, setQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const mainRef = useRef(null);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Fetch quiz when Quiz tab becomes active
  useEffect(() => {
    if (activeTab === TABS.quiz && !quiz && !quizLoading) {
      const fetchQuiz = async () => {
        setQuizLoading(true);
        try {
          const response = await getQuizByLesson(lessonId);
          setQuiz(response.data);
        } catch (err) {
          console.error(err);
        } finally {
          setQuizLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [activeTab, lessonId, quiz, quizLoading]);

  // 🔁 Robust scroll-to-top when quiz starts
  useLayoutEffect(() => {
    if (quizStarted) {
      requestAnimationFrame(() => {
        // Scroll the inner container (if present)
        if (mainRef.current) {
          mainRef.current.scrollTop = 0;
          mainRef.current.scrollTo?.({ top: 0, behavior: "smooth" });
        }
        // Also scroll the window, in case the page is the main scrollable area
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }, [quizStarted]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== TABS.quiz) {
      setQuizStarted(false);
      setQuizResult(null);
    }
  };

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
    <div className="flex h-screen overflow-hidden bg-amber-50">
      <LessonSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-6 py-8">
            {/* Sidebar Toggle */}
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={toggleSidebar}
                className="flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-orange-600 transition hover:bg-orange-100"
              >
                <Menu size={20} />
                <span className="font-medium">
                  {sidebarOpen ? "Hide Menu" : "Lesson Menu"}
                </span>
              </button>
            </div>

            {/* Back Button */}
            {activeTab !== TABS.quiz || (!quizStarted && !quizResult) ? (
              <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-orange-600 transition hover:bg-orange-100"
              >
                <ArrowLeft size={18} />
                Back to Lessons
              </button>
            ) : null}

            {/* Lesson Header (only on content tab) */}
            {activeTab === TABS.content && (
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
            )}

            {/* Content / Quiz */}
            {activeTab === TABS.content && <ContentTab contents={contents} />}

            {activeTab === TABS.quiz && !quizStarted && !quizResult && (
              <QuizTab
                quiz={quiz}
                onStart={() => setQuizStarted(true)}
              />
            )}

            {activeTab === TABS.quiz && quizStarted && !quizResult && (
              <QuizQuestions
                quiz={quiz}
                onFinish={(earned, total) =>
                  setQuizResult({ earnedPoints: earned, totalPoints: total })
                }
                onBack={() => setQuizStarted(false)}
              />
            )}

            {activeTab === TABS.quiz && quizResult && (
              <QuizResultInline
                quiz={quiz}
                earnedPoints={quizResult.earnedPoints}
                totalPoints={quizResult.totalPoints}
                onRetry={() => {
                  setQuizStarted(true);
                  setQuizResult(null);
                }}
                onBack={() => {
                  setQuizStarted(false);
                  setQuizResult(null);
                }}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
