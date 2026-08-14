import { BookOpen } from "lucide-react";

export default function LessonHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div
        className="
        bg-orange-100
        p-3
        rounded-xl
      "
      >
        <BookOpen className="text-orange-600" />
      </div>

      <div>
        <h1
          className="
          text-2xl
          font-bold
          text-slate-800
        "
        >
          Add New Lesson
        </h1>

        <p
          className="
          text-slate-500
        "
        >
          Create lesson under a topic
        </p>
      </div>
    </div>
  );
}
