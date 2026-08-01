import React, { useEffect, useState } from "react";
import { UserCircle, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { TopicCard } from "../../components/topic/TopicCard";
import { CardSkeleton } from "../../components/skeletons/CardSkeleton";

import useAuth from "../../hooks/useAuth";
import { getAllTopics } from "../../api/topic.api";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

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
    const fetchTopics = async () => {
      try {
        setLoading(true);

        const response = await getAllTopics();

        console.log("TOPICS RESPONSE:", response);

        setTopics(response.data?.topics || []);
      } catch (error) {
        console.error("Failed to fetch topics:", error);

        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <main
        className="
        mx-auto max-w-6xl
        px-4 py-12
        "
      >
        {loading ? (
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
              "
          >
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold">No topics available</h2>

            <p className="text-slate-500 mt-2">Please check again later.</p>
          </div>
        ) : (
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
              "
          >
            {topics.map((topic, index) => (
              <TopicCard key={topic._id} topic={topic} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Topics;
