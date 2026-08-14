import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

import { createQuiz } from "../../../api/quiz.api";

export default function AddQuiz() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    passingMarks: 0,
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: 0,
        points: 1,
        explanation: "",
      },
    ],
  });

  const handleQuizChange = (e) => {
    setQuiz((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "passingMarks"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];

    updatedQuestions[index][field] = value;

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quiz.questions];

    updatedQuestions[questionIndex].options[optionIndex] = value;

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const addQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: ["", "", "", ""],
          answer: 0,
          points: 1,
          explanation: "",
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const validateQuiz = () => {
    if (!quiz.title.trim()) {
      toast.error("Quiz title is required");
      return false;
    }

    if (!quiz.questions.length) {
      toast.error("Add at least one question");
      return false;
    }

    for (const question of quiz.questions) {
      if (!question.question.trim()) {
        toast.error("Question text is required");
        return false;
      }

      if (question.options.some((option) => !option.trim())) {
        toast.error("All options are required");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateQuiz()) return;

    try {
      await createQuiz(lessonId, quiz);

      toast.success("Quiz created successfully");

      navigate("/admin/quizzes");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create quiz");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Add Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            placeholder="Quiz title"
            className="w-full rounded-xl border p-3"
          />

          <textarea
            name="description"
            value={quiz.description}
            onChange={handleQuizChange}
            placeholder="Quiz description"
            className="w-full rounded-xl border p-3"
          />

          {quiz.questions.map((question, index) => (
            <div
              key={index}
              className="rounded-2xl border border-orange-100 p-5"
            >
              <div className="mb-4 flex justify-between">
                <h2 className="font-semibold">Question {index + 1}</h2>

                {quiz.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <input
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                placeholder="Question"
                className="mb-4 w-full rounded-xl border p-3"
              />

              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(index, optionIndex, e.target.value)
                  }
                  placeholder={`Option ${optionIndex + 1}`}
                  className="mb-2 w-full rounded-xl border p-3"
                />
              ))}

              <select
                value={question.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", Number(e.target.value))
                }
                className="mt-3 w-full rounded-xl border p-3"
              >
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
                <option value={3}>Option 4</option>
              </select>

              <input
                type="number"
                value={question.points}
                onChange={(e) =>
                  handleQuestionChange(index, "points", Number(e.target.value))
                }
                placeholder="Points"
                className="mt-3 w-full rounded-xl border p-3"
              />

              <textarea
                value={question.explanation}
                onChange={(e) =>
                  handleQuestionChange(index, "explanation", e.target.value)
                }
                placeholder="Explanation"
                className="mt-3 w-full rounded-xl border p-3"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-2 rounded-xl bg-orange-100 px-5 py-3 text-orange-600"
          >
            <Plus size={18} />
            Add Question
          </button>

          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
}
