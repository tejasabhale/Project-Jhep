import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TopicCard } from "../../components/topic/TopicCard";
import { CardSkeleton } from "../../components/skeletons/CardSkeleton";

import useAuth from "../../hooks/useAuth";
import { getAllTopics } from "../../api/topic.api";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { logout } = useAuth();

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
          mx-auto
          max-w-6xl
          px-4
          py-12
        "
      >
        {loading ? (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
              items-stretch
              auto-rows-fr
            "
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-full">
                <CardSkeleton />
              </div>
            ))}
          </div>
        ) : topics.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold">No topics available</h2>

            <p className="mt-2 text-slate-500">Please check again later.</p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
              items-stretch
              auto-rows-fr
            "
          >
            {topics.map((topic, index) => (
              <div key={topic._id} className="h-full">
                <TopicCard topic={topic} index={index} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Topics;
