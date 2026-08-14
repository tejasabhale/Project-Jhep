import mongoose from "mongoose";
import dotenv from "dotenv";
import Conversation from "../models/conversation.model.js";
import Vocabulary from "../models/vocabulary.model.js";

dotenv.config();

const conversations = [
  {
    title: "Greeting a Friend",
    level: "Beginner",
    duration: "5 min",
    icon: "👋",
    category: "greetings",
    order: 1,
    dialogues: [
      {
        speaker: "Teacher",
        text: "Let's practice greeting a friend. Repeat after me.",
        translation:
          "चला मित्राला अभिवादन करण्याचा सराव करूया. माझ्या मागे म्हणा.",
      },
      {
        speaker: "Rahul",
        text: "Hello! How are you?",
        translation: "नमस्कार! तू कसा आहेस?",
      },
      {
        speaker: "Priya",
        text: "Hi! I'm fine, thank you. And you?",
        translation: "हाय! मी ठीक आहे, धन्यवाद. आणि तू?",
      },
      {
        speaker: "Rahul",
        text: "I'm great! Nice to see you.",
        translation: "मी खूप छान! तुला भेटून आनंद झाला.",
      },
      {
        speaker: "Priya",
        text: "Nice to see you too!",
        translation: "तुला पण भेटून आनंद झाला!",
      },
    ],
  },
  {
    title: "At the School",
    level: "Beginner",
    duration: "5 min",
    icon: "🏫",
    category: "school",
    order: 2,
    dialogues: [
      {
        speaker: "Teacher",
        text: "Practice talking about your school day.",
        translation: "तुमच्या शाळेच्या दिवसाबद्दल बोलण्याचा सराव करा.",
      },
      {
        speaker: "Amit",
        text: "What class do you have first?",
        translation: "तुझा पहिला तास कोणता आहे?",
      },
      {
        speaker: "Sita",
        text: "I have English class. It's my favorite!",
        translation: "माझा इंग्रजीचा तास आहे. तो माझा आवडता आहे!",
      },
      {
        speaker: "Amit",
        text: "That's great! I like English too.",
        translation: "खूप छान! मलाही इंग्रजी आवडते.",
      },
    ],
  },
  {
    title: "At the Market",
    level: "Intermediate",
    duration: "8 min",
    icon: "🛒",
    category: "shopping",
    order: 3,
    dialogues: [
      {
        speaker: "Teacher",
        text: "Learn how to shop at the market.",
        translation: "बाजारात खरेदी कशी करायची ते शिका.",
      },
      {
        speaker: "Shopkeeper",
        text: "Good morning! What would you like?",
        translation: "सुप्रभात! तुम्हाला काय हवे आहे?",
      },
      {
        speaker: "Customer",
        text: "I'd like some fruits, please.",
        translation: "मला काही फळे हवी आहेत, कृपया.",
      },
      {
        speaker: "Shopkeeper",
        text: "These apples are fresh and sweet.",
        translation: "ही सफरचंदं ताजी आणि गोड आहेत.",
      },
      {
        speaker: "Customer",
        text: "How much do they cost?",
        translation: "त्यांची किंमत किती आहे?",
      },
      {
        speaker: "Shopkeeper",
        text: "They are 50 rupees per kilogram.",
        translation: "ते 50 रुपये प्रति किलो आहेत.",
      },
    ],
  },
];

const vocabulary = [
  {
    word: "Hello",
    pronunciation: "he-loh",
    translation: "नमस्कार",
    difficulty: "Beginner",
    category: "greetings",
  },
  {
    word: "Thank you",
    pronunciation: "thangk yoo",
    translation: "धन्यवाद",
    difficulty: "Beginner",
    category: "greetings",
  },
  {
    word: "Please",
    pronunciation: "pleez",
    translation: "कृपया",
    difficulty: "Beginner",
    category: "common",
  },
  {
    word: "Good morning",
    pronunciation: "gud mor-ning",
    translation: "सुप्रभात",
    difficulty: "Beginner",
    category: "greetings",
  },
  {
    word: "How are you?",
    pronunciation: "hau aar yoo",
    translation: "तू कसा आहेस?",
    difficulty: "Beginner",
    category: "greetings",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Conversation.deleteMany({});
    await Vocabulary.deleteMany({});

    // Insert seed data
    await Conversation.insertMany(conversations);
    await Vocabulary.insertMany(vocabulary);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
