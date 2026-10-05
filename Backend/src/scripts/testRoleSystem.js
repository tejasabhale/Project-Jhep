import "../config/env.js";
import mongoose from "mongoose";
import { app } from "../app.js";
import { User } from "../models/user.model.js";
import Topic from "../models/topic.model.js";
import Lesson from "../models/lesson.model.js";
import Quiz from "../models/quiz.model.js";

async function runTests() {
  console.log("=== STARTING COMPREHENSIVE ROLE SYSTEM TESTS ===");

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}/api/v1`;
  console.log(`Test server running on ${baseUrl}`);

  const results = [];
  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      results.push({ passed: false, message });
      throw new Error(`Assertion failed: ${message}`);
    } else {
      console.log(`✅ PASS: ${message}`);
      results.push({ passed: true, message });
    }
  }

  try {
    // Clean up test data if any leftovers
    const timestamp = Date.now();
    await User.deleteMany({ email: /test.*@example\.com/ });

    // 1. Create users for testing: Admin, Content Creator, Regular User
    console.log("\n--- Setting up test users ---");
    const adminUser = await User.create({
      fullName: "Admin Tester",
      userName: `admin_${timestamp}`,
      email: `test_admin_${timestamp}@example.com`,
      password: "Password@123",
      mobileNo: `91${String(timestamp).slice(-8)}`,
      role: "admin",
      isVerified: true,
    });

    const contentCreatorUser = await User.create({
      fullName: "Content Creator Tester",
      userName: `creator_${timestamp}`,
      email: `test_creator_${timestamp}@example.com`,
      password: "Password@123",
      mobileNo: `92${String(timestamp).slice(-8)}`,
      role: "content_creator",
      isVerified: true,
      createdBy: adminUser._id,
    });

    const regularUser = await User.create({
      fullName: "Student Tester",
      userName: `student_${timestamp}`,
      email: `test_student_${timestamp}@example.com`,
      password: "Password@123",
      mobileNo: `93${String(timestamp).slice(-8)}`,
      role: "user",
      isVerified: true,
    });

    assert(contentCreatorUser.role === "content_creator", "Content creator user created in DB with role 'content_creator'");

    const adminToken = adminUser.generateAccessToken();
    const creatorToken = contentCreatorUser.generateAccessToken();
    const userToken = regularUser.generateAccessToken();

    // Helper request function
    async function api(path, { method = "GET", token, body, headers = {} } = {}) {
      const opts = {
        method,
        headers: {
          ...headers,
        },
      };
      if (token) {
        opts.headers["Authorization"] = `Bearer ${token}`;
      }
      if (body) {
        if (typeof body === "object" && !(body instanceof FormData)) {
          opts.headers["Content-Type"] = "application/json";
          opts.body = JSON.stringify(body);
        } else {
          opts.body = body;
        }
      }
      const res = await fetch(`${baseUrl}${path}`, opts);
      let data = null;
      try {
        data = await res.json();
      } catch (e) {
        // response might not be json
      }
      return { status: res.status, data };
    }

    // ==========================================
    // 2. USER MANAGEMENT PERMISSION TESTS
    // ==========================================
    console.log("\n--- Testing User Management & Role Assignment ---");

    // Admin should be able to create a content creator user
    const createCreatorByAdmin = await api("/users", {
      method: "POST",
      token: adminToken,
      body: {
        fullName: "Created Creator",
        userName: `c_creator_${timestamp}`,
        email: `test_c_creator_${timestamp}@example.com`,
        password: "Password@123",
        mobileNo: `94${String(timestamp).slice(-8)}`,
        role: "content_creator",
      },
    });
    assert(createCreatorByAdmin.status === 201, "Admin CAN create a user with role 'content_creator' (201 Created)");
    assert(createCreatorByAdmin.data?.data?.role === "content_creator", "Created user role is 'content_creator'");

    // Content Creator must NOT be allowed to create users
    const creatorTryCreateUser = await api("/users", {
      method: "POST",
      token: creatorToken,
      body: {
        fullName: "Hacker User",
        userName: `hacker_${timestamp}`,
        email: `test_hacker_${timestamp}@example.com`,
        password: "Password@123",
        mobileNo: `95${String(timestamp).slice(-8)}`,
        role: "admin",
      },
    });
    assert(creatorTryCreateUser.status === 403, "Content Creator CANNOT create users (403 Forbidden)");

    // Content Creator must NOT be allowed to view all users
    const creatorTryGetUsers = await api("/users", {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorTryGetUsers.status === 403, "Content Creator CANNOT list users (403 Forbidden)");

    // Content Creator must NOT be allowed to delete a user
    const creatorTryDeleteUser = await api(`/users/${regularUser._id}`, {
      method: "DELETE",
      token: creatorToken,
    });
    assert(creatorTryDeleteUser.status === 403, "Content Creator CANNOT delete users (403 Forbidden)");

    // ==========================================
    // 3. ADMIN SETTINGS / APIS ACCESS TESTS
    // ==========================================
    console.log("\n--- Testing Admin-only system routes ---");

    const creatorTryStats = await api("/admin/stats", {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorTryStats.status === 403, "Content Creator CANNOT access /admin/stats (403 Forbidden)");

    const creatorTryActivity = await api("/admin/activity", {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorTryActivity.status === 403, "Content Creator CANNOT access /admin/activity (403 Forbidden)");

    const creatorTrySchool = await api("/schools", {
      method: "POST",
      token: creatorToken,
      body: { name: "Test School" },
    });
    assert(creatorTrySchool.status === 403, "Content Creator CANNOT create schools (403 Forbidden)");

    const creatorTryTeam = await api("/team", {
      method: "POST",
      token: creatorToken,
      body: { name: "Test Team Member" },
    });
    assert(creatorTryTeam.status === 403, "Content Creator CANNOT create team members (403 Forbidden)");

    // ==========================================
    // 4. TOPICS CRUD TESTS
    // ==========================================
    console.log("\n--- Testing Topics CRUD for Content Creator ---");

    // Student cannot create topic
    const studentCreateTopic = await api("/topics", {
      method: "POST",
      token: userToken,
      body: {
        title: `Student Topic ${timestamp}`,
        description: "Student topic test",
      },
    });
    assert(studentCreateTopic.status === 403, "Student CANNOT create topics (403 Forbidden)");

    // Content Creator CAN create topic
    const creatorCreateTopic = await api("/topics", {
      method: "POST",
      token: creatorToken,
      body: {
        title: `Creator Topic ${timestamp}`,
        description: "Created by Content Creator",
        order: 9999,
        isPublished: true,
      },
    });
    assert(creatorCreateTopic.status === 201, "Content Creator CAN create topics (201 Created)");
    const topicId = creatorCreateTopic.data?.data?._id;
    assert(Boolean(topicId), "Created topic has valid _id");

    // Content Creator CAN view topics
    const creatorGetTopics = await api("/topics", {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorGetTopics.status === 200, "Content Creator CAN view topics (200 OK)");

    // Content Creator CAN view topic by ID
    const creatorGetTopicById = await api(`/topics/${topicId}`, {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorGetTopicById.status === 200, "Content Creator CAN view topic by ID (200 OK)");

    // Content Creator CAN update topic (PATCH)
    const creatorPatchTopic = await api(`/topics/${topicId}`, {
      method: "PATCH",
      token: creatorToken,
      body: {
        description: "Updated description via PATCH by Content Creator",
      },
    });
    assert(creatorPatchTopic.status === 200, "Content Creator CAN update topic via PATCH (200 OK)");

    // Content Creator CAN update topic (PUT)
    const creatorPutTopic = await api(`/topics/${topicId}`, {
      method: "PUT",
      token: creatorToken,
      body: {
        description: "Updated description via PUT by Content Creator",
      },
    });
    assert(creatorPutTopic.status === 200, "Content Creator CAN update topic via PUT (200 OK)");

    // ==========================================
    // 5. LESSONS CRUD TESTS
    // ==========================================
    console.log("\n--- Testing Lessons CRUD for Content Creator ---");

    // Student cannot create lesson
    const studentCreateLesson = await api("/lessons", {
      method: "POST",
      token: userToken,
      body: {
        topicId,
        title: `Student Lesson ${timestamp}`,
        fileType: "video",
        fileName: "lesson.mp4",
        fileUrl: "https://example.com/lesson.mp4",
      },
    });
    assert(studentCreateLesson.status === 403, "Student CANNOT create lessons (403 Forbidden)");

    // Content Creator CAN create lesson
    const creatorCreateLesson = await api("/lessons", {
      method: "POST",
      token: creatorToken,
      body: {
        topicId,
        title: `Creator Lesson ${timestamp}`,
        description: "Lesson created by Content Creator",
        order: 1,
        fileType: "video",
        fileName: "creator_lesson.mp4",
        fileUrl: "https://example.com/creator_lesson.mp4",
        isPublished: true,
      },
    });
    assert(creatorCreateLesson.status === 201, "Content Creator CAN create lessons (201 Created)");
    const lessonId = creatorCreateLesson.data?.data?._id;
    assert(Boolean(lessonId), "Created lesson has valid _id");

    // Content Creator CAN view all lessons
    const creatorGetLessons = await api("/lessons", {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorGetLessons.status === 200, "Content Creator CAN view all lessons (200 OK)");

    // Content Creator CAN view lesson by ID
    const creatorGetLessonById = await api(`/lessons/${lessonId}`, {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorGetLessonById.status === 200, "Content Creator CAN view lesson by ID (200 OK)");

    // Content Creator CAN update lesson (PATCH)
    const creatorPatchLesson = await api(`/lessons/${lessonId}`, {
      method: "PATCH",
      token: creatorToken,
      body: {
        description: "Updated lesson description via PATCH",
      },
    });
    assert(creatorPatchLesson.status === 200, "Content Creator CAN update lesson via PATCH (200 OK)");

    // Content Creator CAN update lesson (PUT)
    const creatorPutLesson = await api(`/lessons/${lessonId}`, {
      method: "PUT",
      token: creatorToken,
      body: {
        description: "Updated lesson description via PUT",
      },
    });
    assert(creatorPutLesson.status === 200, "Content Creator CAN update lesson via PUT (200 OK)");

    // Content Creator CAN toggle featured lesson
    const creatorToggleFeatured = await api(`/lessons/${lessonId}/featured`, {
      method: "PATCH",
      token: creatorToken,
    });
    assert(creatorToggleFeatured.status === 200, "Content Creator CAN toggle featured status (200 OK)");

    // ==========================================
    // 6. QUIZZES CRUD TESTS
    // ==========================================
    console.log("\n--- Testing Quizzes CRUD for Content Creator ---");

    // Student cannot access admin quizzes
    const studentGetAdminQuizzes = await api("/quizzes/admin", {
      method: "GET",
      token: userToken,
    });
    assert(studentGetAdminQuizzes.status === 403, "Student CANNOT access /quizzes/admin (403 Forbidden)");

    // Content Creator CAN access admin quizzes list
    const creatorGetAdminQuizzes = await api("/quizzes/admin", {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorGetAdminQuizzes.status === 200, "Content Creator CAN access /quizzes/admin (200 OK)");

    // Student cannot create quiz
    const studentCreateQuiz = await api("/quizzes", {
      method: "POST",
      token: userToken,
      body: {
        lessonId,
        title: `Student Quiz ${timestamp}`,
        questions: [
          {
            question: "Question 1?",
            options: ["A", "B", "C", "D"],
            correctOption: 0,
          },
        ],
      },
    });
    assert(studentCreateQuiz.status === 403, "Student CANNOT create quizzes (403 Forbidden)");

    // Content Creator CAN create quiz
    const creatorCreateQuiz = await api("/quizzes", {
      method: "POST",
      token: creatorToken,
      body: {
        lessonId,
        title: `Creator Quiz ${timestamp}`,
        description: "Quiz description created by Content Creator",
        questions: [
          {
            question: "What is the capital of France?",
            options: ["Berlin", "London", "Paris", "Rome"],
            correctOption: 2,
            explanation: "Paris is the capital of France.",
          },
        ],
        passingScore: 50,
        durationMinutes: 10,
        isPublished: true,
      },
    });
    assert(creatorCreateQuiz.status === 201, "Content Creator CAN create quizzes (201 Created)");
    const quizId = creatorCreateQuiz.data?.data?._id;
    assert(Boolean(quizId), "Created quiz has valid _id");

    // Content Creator CAN get quiz by ID via admin endpoint
    const creatorGetQuizByIdAdmin = await api(`/quizzes/admin/${quizId}`, {
      method: "GET",
      token: creatorToken,
    });
    assert(creatorGetQuizByIdAdmin.status === 200, "Content Creator CAN view quiz details via /quizzes/admin/:quizId (200 OK)");

    // Content Creator CAN update quiz (PATCH)
    const creatorPatchQuiz = await api(`/quizzes/${quizId}`, {
      method: "PATCH",
      token: creatorToken,
      body: {
        title: `Updated Creator Quiz ${timestamp}`,
        passingScore: 60,
      },
    });
    assert(creatorPatchQuiz.status === 200, "Content Creator CAN update quiz via PATCH (200 OK)");

    // Content Creator CAN update quiz (PUT)
    const creatorPutQuiz = await api(`/quizzes/${quizId}`, {
      method: "PUT",
      token: creatorToken,
      body: {
        title: `Updated via PUT Creator Quiz ${timestamp}`,
      },
    });
    assert(creatorPutQuiz.status === 200, "Content Creator CAN update quiz via PUT (200 OK)");

    // Content Creator CAN delete quiz
    const creatorDeleteQuiz = await api(`/quizzes/${quizId}`, {
      method: "DELETE",
      token: creatorToken,
    });
    assert(creatorDeleteQuiz.status === 200, "Content Creator CAN delete quiz (200 OK)");

    // Content Creator CAN delete lesson
    const creatorDeleteLesson = await api(`/lessons/${lessonId}`, {
      method: "DELETE",
      token: creatorToken,
    });
    assert(creatorDeleteLesson.status === 200, "Content Creator CAN delete lesson (200 OK)");

    // Content Creator CAN delete topic
    const creatorDeleteTopic = await api(`/topics/${topicId}`, {
      method: "DELETE",
      token: creatorToken,
    });
    assert(creatorDeleteTopic.status === 200, "Content Creator CAN delete topic (200 OK)");

    // ==========================================
    // 7. OWNER ROLE AND ROLE ASSIGNMENT TESTS
    // ==========================================
    console.log("\n--- Testing Owner role capabilities & Role Changes ---");
    const ownerUser = await User.create({
      fullName: "Owner Tester",
      userName: `owner_${timestamp}`,
      email: `test_owner_${timestamp}@example.com`,
      password: "Password@123",
      mobileNo: `96${String(timestamp).slice(-8)}`,
      role: "owner",
      isVerified: true,
    });
    const ownerToken = ownerUser.generateAccessToken();

    // Owner creates Content Creator
    const ownerCreateCreator = await api("/users", {
      method: "POST",
      token: ownerToken,
      body: {
        fullName: "Owner Created Creator",
        userName: `oc_${timestamp}`,
        email: `test_oc_${timestamp}@example.com`,
        password: "Password@123",
        mobileNo: `97${String(timestamp).slice(-8)}`,
        role: "content_creator",
      },
    });
    assert(ownerCreateCreator.status === 201, "Owner CAN create user with role 'content_creator' (201 Created)");

    // Owner updates a user's role to content_creator
    const targetUserId = ownerCreateCreator.data?.data?._id;
    const ownerChangeRole = await api(`/users/${targetUserId}`, {
      method: "PATCH",
      token: ownerToken,
      body: {
        role: "user",
      },
    });
    assert(ownerChangeRole.status === 200, "Owner CAN change user role to 'user' (200 OK)");

    const ownerReassignCreator = await api(`/users/${targetUserId}`, {
      method: "PATCH",
      token: ownerToken,
      body: {
        role: "content_creator",
      },
    });
    assert(ownerReassignCreator.status === 200, "Owner CAN reassign user role to 'content_creator' (200 OK)");

    // Content Creator CANNOT change roles
    const creatorTryChangeRole = await api(`/users/${targetUserId}`, {
      method: "PATCH",
      token: creatorToken,
      body: {
        role: "admin",
      },
    });
    assert(creatorTryChangeRole.status === 403, "Content Creator CANNOT change other user's role (403 Forbidden)");

    // ==========================================
    // 8. AUTHENTICATION & PROFILE TESTS
    // ==========================================
    console.log("\n--- Testing Authentication & Profile for Content Creator ---");

    // Login as Content Creator
    const loginRes = await api("/auth/login", {
      method: "POST",
      body: {
        email: contentCreatorUser.email,
        password: "Password@123",
      },
    });
    assert(loginRes.status === 200, "Content Creator CAN log in successfully (200 OK)");
    assert(loginRes.data?.data?.user?.role === "content_creator", "Login response returns user with role 'content_creator'");

    // Get current profile using creator's access token
    const profileRes = await api("/profile/me", {
      method: "GET",
      token: creatorToken,
    });
    assert(profileRes.status === 200, "Content Creator CAN fetch own profile via /profile/me (200 OK)");
    assert(profileRes.data?.data?.role === "content_creator", "Profile contains role 'content_creator'");

    // Update profile
    const updateProfileRes = await api("/profile/update", {
      method: "PATCH",
      token: creatorToken,
      body: {
        fullName: "Updated Creator Name",
      },
    });
    assert(updateProfileRes.status === 200, "Content Creator CAN update own profile (200 OK)");

    // Logout
    const logoutRes = await api("/auth/logout", {
      method: "POST",
      token: creatorToken,
    });
    assert(logoutRes.status === 200, "Content Creator CAN log out successfully (200 OK)");

    // ==========================================
    // 9. UNAUTHENTICATED REQUESTS TEST
    // ==========================================
    console.log("\n--- Testing Unauthenticated Access ---");
    const unauthTopic = await api("/topics", { method: "POST", body: { title: "No auth" } });
    assert(unauthTopic.status === 401, "Unauthenticated POST /topics returns 401 Unauthorized");

    const unauthLesson = await api("/lessons", { method: "POST", body: { title: "No auth" } });
    assert(unauthLesson.status === 401, "Unauthenticated POST /lessons returns 401 Unauthorized");

    const unauthQuiz = await api("/quizzes", { method: "POST", body: { title: "No auth" } });
    assert(unauthQuiz.status === 401, "Unauthenticated POST /quizzes returns 401 Unauthorized");

    // Clean up created users
    await User.deleteMany({ email: /test.*@example\.com/ });

    console.log(`\n🎉 ALL ${results.length} TESTS PASSED SUCCESSFULLY!`);
  } finally {
    server.close();
    await mongoose.disconnect();
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
