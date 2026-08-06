import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserCircle, LogOut, User, Loader } from "lucide-react";

import { getLessonsByTopic } from "../../api/lesson.api";

import LessonCard from "../../components/lesson/LessonCard";

import useAuth from "../../hooks/useAuth";

const TopicLessons = () => {
  const { topicId } = useParams();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [topic, setTopic] = useState(null);

  const [lessons, setLessons] = useState([]);

  const [loading, setLoading] = useState(true);

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonsByTopic(topicId);

        console.log(response);

        setTopic(response.data.topic);

        setLessons(response.data.lessons);
      } catch (error) {
        console.log("Lesson fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [topicId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="
      min-h-screen
      bg-white
      px-6
      py-8
      "
    >
      {/* Topic Header */}

      <div className="mx-auto max-w-6xl mt-10">
        <h1
          className="
          text-3xl
          font-bold
          text-slate-800
          "
        >
          {topic?.title}
        </h1>

        <p
          className="
          mt-2
          text-slate-600
          "
        >
          {topic?.description || "Learn English through interactive lessons."}
        </p>
      </div>

      {/* Lessons */}

      {lessons.length === 0 ? (
        <div
          className="
            text-center
            mt-20
            "
        >
          <h2
            className="
              text-xl
              font-semibold
              "
          >
            No lessons available
          </h2>
        </div>
      ) : (
        <div
          className="
            mx-auto
            mt-10
            max-w-6xl
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            "
        >
          {lessons.map((lesson, index) => (
            <LessonCard key={lesson._id} lesson={lesson} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicLessons;
