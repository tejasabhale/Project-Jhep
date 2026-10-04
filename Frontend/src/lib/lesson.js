// Normalises lesson data so UI code doesn't depend on exact backend field names.

export function getLessonFile(lesson) {
  const f = lesson?.file ?? {};

  return {
    url: f.url ?? f.secure_url ?? lesson?.fileUrl ?? lesson?.url ?? "",
    type: f.type ?? lesson?.fileType ?? "",
    name: f.name ?? f.originalName ?? lesson?.fileName ?? "",
    duration: f.duration ?? lesson?.duration ?? "",
  };
}

// quizId may be a plain id or a populated quiz object.
export function getQuizId(lesson) {
  if (!lesson || lesson.hasQuiz === false) return null;

  const raw = lesson.quizId ?? lesson.quiz;
  const id = raw && typeof raw === "object" ? raw._id : raw;

  return id || null;
}

export const getLessonPath = (topicId, lessonId) =>
  topicId && lessonId ? `/lesson/${topicId}/${lessonId}` : null;

export const getQuizPath = (quizId) => (quizId ? `/quiz/${quizId}` : null);
