const STUDENTS = [
  { id: "BBA-2024-001", password: "1234", name: "Ahmed Hassan", year: 3, gpa: 3.7 },
  { id: "BBA-2024-002", password: "1234", name: "Sara Mohamed", year: 1, gpa: 3.9 },
  { id: "BBA-2024-003", password: "1234", name: "Omar Khalil", year: 2, gpa: 3.4 },
  { id: "BBA-2024-004", password: "1234", name: "Nour Abdalla", year: 4, gpa: 3.6 },
  { id: "BBA-2024-005", password: "1234", name: "Youssef Ali", year: 3, gpa: 3.2 },
  { id: "admin", password: "admin", name: "Dr. Hossam Barakat", year: 0, role: "admin" }
];

const YEAR_LABELS = { 1: "1st Year", 2: "2nd Year", 3: "3rd Year", 4: "4th Year" };

const CURRICULUM = {
  1: {
    semester: "Fall 2024 – Spring 2025",
    subjects: [
      { name: "Principles of Management", code: "MGT101", credits: 3, instructor: "Dr. Laila Samy", schedule: "Sun / Tue  9:00–10:30", room: "B-201", icon: "building", color: "blue" },
      { name: "Business Mathematics", code: "MTH101", credits: 3, instructor: "Dr. Karim Nour", schedule: "Mon / Wed  10:00–11:30", room: "B-105", icon: "math-function", color: "green" },
      { name: "Microeconomics", code: "ECO101", credits: 3, instructor: "Dr. Amr Fouad", schedule: "Sun / Tue  11:00–12:30", room: "B-301", icon: "trending-up", color: "amber" },
      { name: "Business Communication", code: "COM101", credits: 2, instructor: "Dr. Heba Ramzy", schedule: "Mon  12:00–14:00", room: "B-110", icon: "messages", color: "pink" },
      { name: "Financial Accounting I", code: "ACC101", credits: 3, instructor: "Dr. Sherif Magdy", schedule: "Wed / Thu  9:00–10:30", room: "B-205", icon: "receipt", color: "teal" },
      { name: "Introduction to IT", code: "IT101", credits: 2, instructor: "Eng. Rania Adel", schedule: "Thu  14:00–16:00", room: "Lab-A", icon: "device-laptop", color: "purple" }
    ]
  },
  2: {
    semester: "Fall 2024 – Spring 2025",
    subjects: [
      { name: "Macroeconomics", code: "ECO201", credits: 3, instructor: "Dr. Amr Fouad", schedule: "Sun / Tue  9:00–10:30", room: "B-301", icon: "chart-line", color: "amber" },
      { name: "Financial Accounting II", code: "ACC201", credits: 3, instructor: "Dr. Sherif Magdy", schedule: "Mon / Wed  9:00–10:30", room: "B-205", icon: "calculator", color: "teal" },
      { name: "Organizational Behavior", code: "MGT201", credits: 3, instructor: "Dr. Laila Samy", schedule: "Sun / Tue  11:00–12:30", room: "B-201", icon: "users", color: "blue" },
      { name: "Business Statistics", code: "STA201", credits: 3, instructor: "Dr. Karim Nour", schedule: "Mon / Wed  11:00–12:30", room: "B-105", icon: "chart-bar", color: "green" },
      { name: "Marketing Principles", code: "MKT201", credits: 3, instructor: "Dr. Dina Sabry", schedule: "Wed / Thu  11:00–12:30", room: "B-210", icon: "speakerphone", color: "pink" },
      { name: "Corporate Finance", code: "FIN201", credits: 3, instructor: "Dr. Tarek Wahba", schedule: "Thu  9:00–12:00", room: "B-302", icon: "coin", color: "purple" }
    ]
  },
  3: {
    semester: "Fall 2024 – Spring 2025",
    subjects: [
      { name: "Tax Accounting", code: "ACC301", credits: 3, instructor: "Dr. Sherif Magdy", schedule: "Sun / Tue  9:00–10:30", room: "B-205", icon: "file-invoice", color: "teal" },
      { name: "Managerial Communication", code: "COM301", credits: 2, instructor: "Dr. Heba Ramzy", schedule: "Mon  10:00–12:00", room: "B-110", icon: "message-star", color: "pink" },
      { name: "Negotiation Management", code: "MGT302", credits: 3, instructor: "Dr. Laila Samy", schedule: "Sun / Tue  11:00–12:30", room: "B-201", icon: "handshake", color: "blue" },
      { name: "Logistics & Supply Chain", code: "SCM301", credits: 3, instructor: "Dr. Maged Samir", schedule: "Mon / Wed  9:00–10:30", room: "B-305", icon: "truck", color: "amber" },
      { name: "Risk Management & Insurance", code: "FIN301", credits: 3, instructor: "Dr. Tarek Wahba", schedule: "Wed / Thu  9:00–10:30", room: "B-302", icon: "shield-check", color: "purple" },
      { name: "Electronic Business Management", code: "EBM301", credits: 3, instructor: "Eng. Rania Adel", schedule: "Thu  9:00–12:00", room: "Lab-B", icon: "world-www", color: "green" }
    ]
  },
  4: {
    semester: "Fall 2024 – Spring 2025",
    subjects: [
      { name: "Strategic Management", code: "MGT401", credits: 3, instructor: "Dr. Laila Samy", schedule: "Sun / Tue  9:00–10:30", room: "B-201", icon: "chess", color: "blue" },
      { name: "International Business", code: "BUS401", credits: 3, instructor: "Dr. Amr Fouad", schedule: "Mon / Wed  9:00–10:30", room: "B-301", icon: "plane", color: "amber" },
      { name: "Business Law", code: "LAW401", credits: 3, instructor: "Dr. Nadia Helmy", schedule: "Sun / Tue  11:00–12:30", room: "B-108", icon: "gavel", color: "purple" },
      { name: "Human Resource Management", code: "HRM401", credits: 3, instructor: "Dr. Dina Sabry", schedule: "Mon / Wed  11:00–12:30", room: "B-210", icon: "user-star", color: "pink" },
      { name: "Entrepreneurship", code: "ENT401", credits: 3, instructor: "Dr. Maged Samir", schedule: "Wed / Thu  11:00–12:30", room: "B-305", icon: "bulb", color: "green" },
      { name: "Graduation Project", code: "PRJ499", credits: 6, instructor: "Dr. Hossam Barakat", schedule: "Thu  9:00–13:00", room: "B-Lab", icon: "award", color: "teal" }
    ]
  }
};

const ANNOUNCEMENTS = [
  { id: 1, title: "Midterm Exam Schedule Released", body: "Midterm exams for all departments will be held from October 20–27. Check your student portal for your personal schedule.", date: "Oct 10, 2024", type: "exam", icon: "calendar-event" },
  { id: 2, title: "Registration Deadline Reminder", body: "Last day to add or drop courses for the current semester is October 15, 2024. Contact the registrar's office for assistance.", date: "Oct 8, 2024", type: "admin", icon: "alert-circle" },
  { id: 3, title: "Career Fair — Business Administration", body: "The annual career fair will be held in the main hall on November 5, 2024. Over 30 companies will be recruiting. Dress professionally.", date: "Oct 5, 2024", type: "event", icon: "briefcase" },
  { id: 4, title: "Library Extended Hours", body: "The university library will operate extended hours (7 AM – 11 PM) throughout the exam period to support student preparation.", date: "Oct 3, 2024", type: "info", icon: "book" }
];
