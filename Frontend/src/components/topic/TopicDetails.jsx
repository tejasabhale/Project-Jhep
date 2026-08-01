import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getLessonsByTopic } from "../../api/lesson.api";

const TopicDetails = () => {
  const { topicId } = useParams();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonsByTopic(topicId);

        console.log(response);

        setLessons(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [topicId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Lessons</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
          <div
            key={lesson._id}
            className="
                    rounded-3xl
                    border
                    border-orange-100
                    p-6
                    hover:shadow-lg
                    "
          >
            <div className="text-3xl">{lesson.icon || "📘"}</div>

            <h2 className="mt-4 font-bold text-xl">{lesson.title}</h2>

            <p className="text-slate-500 mt-2">{lesson.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicDetails;
