import { Routes, Route } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import AdminLayout from "../layouts/AdminLayout";

import Loader from "../components/common/Loader";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoutes from "./AdminRoutes";
import HomeRoute from "./HomeRoute";

// Public / User Pages
import Topics from "../pages/Topics/Topics";
import TopicLessons from "../pages/Topics/TopicLessons";
import Lesson from "../pages/Lesson/Lesson";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

// Profile
import Profile from "../pages/Profile/Profile";

// Admin Pages
import Admin from "../pages/Admin/Admin";

import AddTopic from "../pages/Admin/Topic/AddTopic";
import ManageTopics from "../pages/Admin/Topic/ManageTopics";
import EditTopic from "../pages/Admin/Topic/EditTopic";

import AddLesson from "../pages/Admin/Lesson/AddLesson";
import ManageLessons from "../pages/Admin/Lesson/ManageLessons";
import EditLesson from "../pages/Admin/Lesson/EditLesson";

import AddLessonContent from "../pages/Admin/LessonContent/AddLessonContent";
import ManageLessonContent from "../pages/Admin/LessonContent/ManageLessonContent";
import EditLessonContent from "../pages/Admin/LessonContent/EditLessonContent";
import About from "../pages/About/About";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../pages/Privacy Policy/PrivacyPolicy";
import Team from "../pages/Team/Team";
import ManageQuizzes from "../pages/Admin/Quizzes/ManageQuizzes";
import AddQuiz from "../pages/Admin/Quizzes/AddQuiz";
import EditQuiz from "../pages/Admin/Quizzes/EditQuiz";
import Activity from "../pages/Admin/Activity/Activity";
import AddTeamMember from "../pages/Admin/Team/AddTeamMember";
import ManageTeamMembers from "../pages/Admin/Team/ManageTeamMembers";
import EditTeamMember from "../pages/Admin/Team/EditTeamMember";
import Users from "../pages/Admin/Users/Users";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Landing */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="/tnc" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/team" element={<Team />} />
      </Route>

      {/* Guest Routes */}

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />

        {/* <Route path="/register" element={<Register />} /> */}

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Protected User Routes */}

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/topics" element={<Topics />} />

          <Route path="/topics/:topicId/lessons" element={<TopicLessons />} />

          <Route path="/lessons/:lessonId" element={<Lesson />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin Routes */}

      <Route element={<AdminRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/profile" element={<Profile />} />

          {/* Topic Management */}

          <Route path="/admin/topics/add" element={<AddTopic />} />

          <Route path="/admin/topics/manage" element={<ManageTopics />} />

          <Route path="/admin/topics/edit/:topicId" element={<EditTopic />} />

          {/* Lesson Management */}

          <Route path="/admin/lessons/add" element={<AddLesson />} />

          <Route path="/admin/lessons/manage" element={<ManageLessons />} />

          <Route
            path="/admin/lessons/edit/:lessonId"
            element={<EditLesson />}
          />

          {/* Lesson Content Management */}

          <Route
            path="/admin/lesson-content/add/:lessonId"
            element={<AddLessonContent />}
          />

          <Route
            path="/admin/lesson-content/manage/:lessonId"
            element={<ManageLessonContent />}
          />

          <Route
            path="/admin/lesson-content/edit/:lessonId/:contentId"
            element={<EditLessonContent />}
          />

          {/* Quiz Management */}

          <Route path="/admin/quizzes" element={<ManageQuizzes />} />

          <Route path="/admin/quizzes/add/:lessonId" element={<AddQuiz />} />

          <Route path="/admin/quizzes/edit/:lessonId" element={<EditQuiz />} />

          {/* User Activity  */}

          <Route path="/admin/activity" element={<Activity />} />

          {/* Team Members  */}

          <Route path="/admin/team/add" element={<AddTeamMember />} />

          <Route path="/admin/team/manage" element={<ManageTeamMembers />} />

          <Route path="/admin/team/edit/:teamId" element={<EditTeamMember />} />

          {/* User Management  */}

          <Route path="admin/users/add" element={<Users/>} />
        </Route>
      </Route>

      {/* Fallback */}

      <Route path="*" element={<HomeRoute />} />
    </Routes>
  );
};

export default AppRoutes;
