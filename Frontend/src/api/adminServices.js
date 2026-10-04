import { getAdminStats, getUserActivity } from "./admin.api";
import {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} from "./topic.api";
import {
  getLessons,
  getLessonById,
  getLessonsByTopic,
  createLesson,
  updateLesson,
  deleteLesson,
  toggleFeaturedLesson,
} from "./lesson.api";
import {
  getQuizzes,
  getQuizByIdAdmin,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "./quiz.api";
import {
  getAllSchoolsForAdmin,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
  toggleSchoolStatus,
} from "./school.api";
import {
  getAllTestimonialsForAdmin,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
} from "./testimonial.api";
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "./team.api";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./user.api";

// Helper to extract array or payload data from various backend response formats
const extractData = (response) => {
  if (!response) return null;
  // If response is Axios response object with .data
  const body = response.data !== undefined ? response.data : response;
  if (!body) return null;
  // If ApiResponse format: { statusCode, data, message, success }
  if (body.data !== undefined) {
    return body.data;
  }
  return body;
};

// ==========================================
// ADMIN DASHBOARD & STATS
// ==========================================
export const fetchAdminDashboard = async () => {
  try {
    const [statsRes, quizzesRes, activitiesRes] = await Promise.allSettled([
      getAdminStats(),
      getQuizzes(),
      getUserActivity(),
    ]);

    const statsData =
      statsRes.status === "fulfilled" ? extractData(statsRes.value) || {} : {};

    const quizzesData =
      quizzesRes.status === "fulfilled"
        ? extractData(quizzesRes.value) || []
        : [];
    const quizList = Array.isArray(quizzesData) ? quizzesData : [];

    const activitiesData =
      activitiesRes.status === "fulfilled"
        ? extractData(activitiesRes.value) || []
        : [];
    const activityList = Array.isArray(activitiesData) ? activitiesData : [];

    return {
      users: Number(statsData.users || 0),
      topics: Number(statsData.topics || 0),
      lessons: Number(statsData.lessons || 0),
      activeUsers: Number(statsData.activeUsers || 0),
      quizzes: quizList.length,
      publishedQuizzes: quizList.filter((q) => q.isPublished).length,
      recentActivities: activityList.slice(0, 8),
    };
  } catch (error) {
    console.error("fetchAdminDashboard error:", error);
    throw error;
  }
};

export const fetchAdminUserActivities = async () => {
  const res = await getUserActivity();
  const data = extractData(res);
  return Array.isArray(data) ? data : [];
};

// ==========================================
// TOPICS SERVICE
// ==========================================
export const fetchAllTopics = async (params = {}) => {
  const res = await getAllTopics(params);
  const data = extractData(res);
  if (Array.isArray(data?.topics)) {
    return {
      topics: data.topics,
      pagination: data.pagination || null,
    };
  }
  if (Array.isArray(data)) {
    return { topics: data, pagination: null };
  }
  return { topics: [], pagination: null };
};

export const fetchTopicDetails = async (topicId) => {
  const res = await getTopicById(topicId);
  const data = extractData(res);
  return data?.topic || data || null;
};

export const saveTopic = async (payload, topicId = null) => {
  if (topicId) {
    const res = await updateTopic(topicId, payload);
    return extractData(res);
  }
  const res = await createTopic(payload);
  return extractData(res);
};

export const removeTopic = async (topicId) => {
  const res = await deleteTopic(topicId);
  return extractData(res);
};

// ==========================================
// LESSONS SERVICE
// ==========================================
export const fetchAllLessons = async (topicId = null) => {
  const [lessonsRes, quizzesRes] = await Promise.all([
    getLessons(),
    getQuizzes().catch(() => ({ data: [] })),
  ]);

  const rawLessons = extractData(lessonsRes);
  const lessonList = Array.isArray(rawLessons?.lessons)
    ? rawLessons.lessons
    : Array.isArray(rawLessons)
    ? rawLessons
    : [];

  const rawQuizzes = extractData(quizzesRes);
  const quizList = Array.isArray(rawQuizzes) ? rawQuizzes : [];

  const quizMap = new Map();
  quizList.forEach((q) => {
    const qLessonId = q.lesson?._id || q.lesson;
    if (qLessonId) {
      quizMap.set(qLessonId.toString(), q);
    }
  });

  const enriched = lessonList.map((lesson) => {
    const q = quizMap.get(lesson._id?.toString());
    return {
      ...lesson,
      hasQuiz: Boolean(q),
      quiz: q
        ? {
            _id: q._id,
            title: q.title,
            questionCount: q.questions?.length || 0,
            isPublished: Boolean(q.isPublished),
          }
        : null,
    };
  });

  if (topicId) {
    return enriched.filter((lesson) => {
      const lTopicId = lesson.topic?._id || lesson.topic;
      return lTopicId?.toString() === topicId.toString();
    });
  }

  return enriched;
};

export const fetchLessonDetails = async (lessonId) => {
  const res = await getLessonById(lessonId);
  const data = extractData(res);
  return data?.lesson || data || null;
};

export const saveLesson = async (payload, lessonId = null) => {
  if (lessonId) {
    const res = await updateLesson(lessonId, payload);
    return extractData(res);
  }
  const res = await createLesson(payload);
  return extractData(res);
};

export const removeLesson = async (lessonId) => {
  const res = await deleteLesson(lessonId);
  return extractData(res);
};

export const toggleLessonFeaturedStatus = async (lessonId) => {
  const res = await toggleFeaturedLesson(lessonId);
  return extractData(res);
};

// ==========================================
// QUIZZES SERVICE
// ==========================================
export const fetchAllQuizzes = async () => {
  const res = await getQuizzes();
  const data = extractData(res);
  return Array.isArray(data) ? data : [];
};

export const fetchQuizDetails = async (quizId) => {
  const res = await getQuizByIdAdmin(quizId);
  const data = extractData(res);
  return data?.quiz || data || null;
};

export const saveQuiz = async (payload, quizId = null) => {
  if (quizId) {
    const res = await updateQuiz(quizId, payload);
    return extractData(res);
  }
  const res = await createQuiz(payload);
  return extractData(res);
};

export const removeQuiz = async (quizId) => {
  const res = await deleteQuiz(quizId);
  return extractData(res);
};

// ==========================================
// SCHOOLS SERVICE
// ==========================================
export const fetchAllSchools = async () => {
  const res = await getAllSchoolsForAdmin();
  const data = extractData(res);
  return Array.isArray(data) ? data : [];
};

export const fetchSchoolDetails = async (schoolId) => {
  const res = await getSchoolById(schoolId);
  const data = extractData(res);
  return data?.school || data || null;
};

export const saveSchool = async (payload, schoolId = null) => {
  if (schoolId) {
    const res = await updateSchool(schoolId, payload);
    return extractData(res);
  }
  const res = await createSchool(payload);
  return extractData(res);
};

export const removeSchool = async (schoolId) => {
  const res = await deleteSchool(schoolId);
  return extractData(res);
};

export const toggleSchoolActive = async (schoolId) => {
  const res = await toggleSchoolStatus(schoolId);
  return extractData(res);
};

// ==========================================
// TESTIMONIALS SERVICE
// ==========================================
export const fetchAllTestimonials = async () => {
  const res = await getAllTestimonialsForAdmin();
  const data = extractData(res);
  return Array.isArray(data) ? data : [];
};

export const fetchTestimonialDetails = async (testimonialId) => {
  const res = await getTestimonialById(testimonialId);
  const data = extractData(res);
  return data?.testimonial || data || null;
};

export const saveTestimonial = async (payload, testimonialId = null) => {
  if (testimonialId) {
    const res = await updateTestimonial(testimonialId, payload);
    return extractData(res);
  }
  const res = await createTestimonial(payload);
  return extractData(res);
};

export const removeTestimonial = async (testimonialId) => {
  const res = await deleteTestimonial(testimonialId);
  return extractData(res);
};

export const toggleTestimonialActive = async (testimonialId) => {
  const res = await toggleTestimonialStatus(testimonialId);
  return extractData(res);
};

// ==========================================
// TEAM MEMBERS SERVICE
// ==========================================
export const fetchAllTeamMembers = async () => {
  const res = await getAllTeamMembers();
  const data = extractData(res);
  return Array.isArray(data) ? data : [];
};

export const fetchTeamMemberDetails = async (teamId) => {
  const res = await getTeamMemberById(teamId);
  const data = extractData(res);
  return data?.member || data || null;
};

export const saveTeamMember = async (payload, teamId = null) => {
  if (teamId) {
    const res = await updateTeamMember(teamId, payload);
    return extractData(res);
  }
  const res = await createTeamMember(payload);
  return extractData(res);
};

export const removeTeamMember = async (teamId) => {
  const res = await deleteTeamMember(teamId);
  return extractData(res);
};

export const toggleTeamMemberStatus = async (teamId, nextActiveState) => {
  const res = await updateTeamMember(teamId, { isActive: nextActiveState ? "true" : "false" });
  return extractData(res);
};

// ==========================================
// USERS SERVICE
// ==========================================
export const fetchAllUsers = async () => {
  const res = await getAllUsers();
  const data = extractData(res);
  return Array.isArray(data) ? data : [];
};

export const saveUser = async (payload, userId = null) => {
  if (userId) {
    const res = await updateUser(userId, payload);
    return extractData(res);
  }
  const res = await createUser(payload);
  return extractData(res);
};

export const removeUser = async (userId) => {
  const res = await deleteUser(userId);
  return extractData(res);
};

// ==========================================
// USER ACTIVITY SERVICE
// ==========================================
export const fetchUserActivities = async () => {
  const res = await getUserActivity();
  const data = extractData(res);
  return Array.isArray(data) ? data : [];
};
