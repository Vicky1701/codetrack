# DSA Problem Tracker - Complete Development Guide

## 📋 Project Overview

A web application to track Data Structures and Algorithms problems you solve daily, with revision management and analytics.

---

## 🎯 Core Features

### 1. Problem Management
- Add new problems with details
- **Edit existing problems** ✨
- Delete problems
- **Bulk delete operations** ✨
- Search problems by title
- **Advanced multi-field search** ✨
- Filter by pattern type
- **Filter by tags** ✨
- **Filter by priority/rating** ✨
- Filter problems needing revision
- **Sort by multiple criteria** ✨

### 2. Problem Details Stored
- **Title**: Problem name
- **Pattern**: Category (Array, DP, Graph, etc.)
- **Difficulty**: Easy, Medium, or Hard
- **Platform**: LeetCode, GeeksforGeeks, etc.
- **Link**: URL to problem
- **Notes**: Your approach, time/space complexity
- **Solved Dates**: Array with date, time spent, and rating ✨
- **Revision Count**: How many times revised
- **Created At**: First time solved
- **Last Revised**: Most recent revision date
- **Tags**: Custom tags for categorization ✨
- **Priority**: Low, Medium, High, Critical ✨
- **Rating**: Average rating (1-5 stars) ✨
- **Time Tracking**: Time spent per solve ✨
- **Revision Interval**: Custom revision interval ✨

### 3. Statistics Dashboard
- Total problems solved
- **Current streak and longest streak** ✨
- **Average time per problem** ✨
- **Average rating** ✨
- Count by difficulty
- Count by each pattern
- **Count by priority** ✨
- **Count by tags** ✨
- Problems needing revision (custom intervals) ✨
- **Progress charts and visualizations** ✨

### 4. Revision System
- Mark problem as revised (adds new date)
- **Mark revision with time tracking and rating** ✨
- **Custom revision intervals per problem** ✨
- Auto-alerts for problems not revised
- Track revision history
- **Bulk mark as revised** ✨

### 5. Additional Features ✨
- **Export/Import**: Backup and restore data as JSON
- **Time Tracking**: Track time spent on each problem
- **Streak Counter**: Daily solving streaks with calendar
- **Calendar View**: Visual calendar of solved problems
- **Progress Charts**: Line, pie, and bar charts
- **Dark Mode**: Toggle between light and dark themes
- **Problem Templates**: Quick add from saved templates
- **Bulk Operations**: Bulk delete, revise, and tag

---

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend Framework**: React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser's localStorage (or sessionStorage)
- **State Management**: React useState hooks

### Component Structure
```
DSATracker (Main Component)
├── Header Section
│   ├── Title
│   ├── Theme Toggle (Dark/Light) ✨
│   ├── Export/Import Buttons ✨
│   └── Settings Button
├── Statistics Dashboard
│   ├── Total Problems Card
│   ├── Streak Counter Card ✨
│   ├── Average Time Card ✨
│   ├── Average Rating Card ✨
│   ├── Easy Count Card
│   ├── Medium Count Card
│   ├── Hard Count Card
│   └── Needs Revision Card
├── Pattern Statistics Section
│   └── Pattern Distribution Grid
├── Progress Charts Section ✨
│   ├── Problems Over Time (Line Chart)
│   ├── Pattern Distribution (Pie Chart)
│   └── Difficulty Distribution (Bar Chart)
├── Control Panel
│   ├── Add Problem Button
│   ├── Bulk Actions Toolbar ✨
│   ├── Advanced Search Input ✨
│   ├── Pattern Filter Dropdown
│   ├── Tag Filter Dropdown ✨
│   ├── Priority Filter Dropdown ✨
│   ├── Sort By Dropdown ✨
│   ├── Sort Order Toggle ✨
│   └── View Filter Dropdown
├── Calendar View Toggle ✨
│   └── Calendar Component (Monthly/Weekly)
├── Add Problem Form (Conditional)
│   ├── Basic Fields
│   ├── Tags Input ✨
│   ├── Priority Selector ✨
│   ├── Revision Interval Selector ✨
│   └── Template Selector ✨
├── Edit Problem Form (Conditional) ✨
│   └── (Same fields as Add Form)
└── Problems List
    └── Problem Cards (mapped)
        ├── Problem Info
        ├── Tags Display ✨
        ├── Rating Display ✨
        ├── Priority Badge ✨
        ├── Time Tracking Display ✨
        ├── Timer Controls ✨
        ├── Edit Button ✨
        ├── Revise Button
        ├── Delete Button
        └── Checkbox (for bulk selection) ✨
```

---

## 📊 Data Structure

### Problem Object Schema (Enhanced)
```javascript
{
  id: 1234567890,                    // Timestamp as unique ID
  title: "Two Sum",                  // Problem name
  pattern: "Array",                  // DSA pattern
  difficulty: "Easy",                // Easy/Medium/Hard
  platform: "LeetCode",              // Platform name
  link: "https://...",               // Problem URL
  notes: "Use hashmap...",           // Your notes
  solvedDates: [                     // Array of solve objects ✨
    {
      date: "2024-01-15T10:30:00.000Z",
      timeSpent: 25,                 // Minutes spent
      rating: 4                      // 1-5 stars
    },
    {
      date: "2024-01-22T14:20:00.000Z",
      timeSpent: 20,
      rating: 5
    }
  ],
  revisionCount: 1,                  // Number of revisions
  lastRevised: "2024-01-22T14:20:00.000Z", // Last revision date
  createdAt: "2024-01-15T10:30:00.000Z",  // First solve date
  // Enhanced fields ✨
  tags: ["hashmap", "two-pointer"], // Custom tags
  priority: "High",                  // Low, Medium, High, Critical
  averageRating: 4.5,                // Average of all ratings
  totalTimeSpent: 45,                // Total minutes across all solves
  revisionInterval: 7,               // Days between revisions
  isTemplate: false,                 // If saved as template
  templateName: null                 // Template name if applicable
}
```

### Storage Structure
```javascript
localStorage.setItem('dsa-problems', JSON.stringify([
  // Array of problem objects
]))
```

---

## 🔧 Core Functions Explained

### 1. Load Problems (on page load)
```javascript
const loadProblems = async () => {
  // Get data from storage
  const result = await window.storage.get('dsa-problems');
  
  // If data exists, parse and set to state
  if (result && result.value) {
    setProblems(JSON.parse(result.value));
  }
};
```

### 2. Save Problems (after any change)
```javascript
const saveProblems = async (updatedProblems) => {
  // Save to storage
  await window.storage.set('dsa-problems', JSON.stringify(updatedProblems));
  
  // Update state
  setProblems(updatedProblems);
};
```

### 3. Add New Problem
```javascript
const addProblem = () => {
  // Validate required fields
  if (!formData.title || !formData.pattern) {
    alert('Please fill in title and pattern');
    return;
  }

  // Create new problem object
  const newProblem = {
    id: Date.now(),                          // Unique ID
    ...formData,                             // Spread form data
    solvedDates: [new Date().toISOString()], // First solve date
    revisionCount: 0,                        // No revisions yet
    lastRevised: null,                       // Not revised yet
    createdAt: new Date().toISOString()      // Created timestamp
  };

  // Add to existing problems and save
  saveProblems([...problems, newProblem]);
  
  // Reset form and close
  setFormData({...}); // Reset to initial state
  setShowAddForm(false);
};
```

### 4. Mark Revision
```javascript
const markRevision = (id) => {
  // Map through all problems
  const updated = problems.map(p => {
    // Find the problem to update
    if (p.id === id) {
      return {
        ...p,
        // Add new solve date to array
        solvedDates: [...p.solvedDates, new Date().toISOString()],
        // Increment revision count
        revisionCount: p.revisionCount + 1,
        // Update last revised date
        lastRevised: new Date().toISOString()
      };
    }
    return p; // Return unchanged problems
  });
  
  saveProblems(updated);
};
```

### 5. Delete Problem
```javascript
const deleteProblem = (id) => {
  // Ask for confirmation
  if (confirm('Are you sure you want to delete this problem?')) {
    // Filter out the problem with matching id
    saveProblems(problems.filter(p => p.id !== id));
  }
};
```

### 6. Calculate Statistics
```javascript
const getStats = () => {
  const total = problems.length;
  const byPattern = {};      // Object to store pattern counts
  const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
  
  // Find problems needing revision (not revised in 7+ days)
  const needsRevision = problems.filter(p => {
    if (!p.lastRevised) return true; // Never revised
    
    // Calculate days since last revision
    const daysSinceRevision = 
      (Date.now() - new Date(p.lastRevised)) / (1000 * 60 * 60 * 24);
    
    return daysSinceRevision > 7;
  }).length;

  // Count problems by pattern and difficulty
  problems.forEach(p => {
    byPattern[p.pattern] = (byPattern[p.pattern] || 0) + 1;
    byDifficulty[p.difficulty]++;
  });

  return { total, byPattern, byDifficulty, needsRevision };
};
```

### 7. Filter Problems
```javascript
const filteredProblems = problems.filter(p => {
  // Check if title matches search term
  const matchesSearch = 
    p.title.toLowerCase().includes(searchTerm.toLowerCase());
  
  // Check if pattern matches selected filter
  const matchesPattern = 
    selectedPattern === 'all' || p.pattern === selectedPattern;
  
  // Check if needs revision (for revision filter)
  const matchesFilter = filter === 'all' || 
    (filter === 'revision' && 
     (!p.lastRevised || 
      (Date.now() - new Date(p.lastRevised)) / (1000 * 60 * 60 * 24) > 7));
  
  // Return true only if all conditions match
  return matchesSearch && matchesPattern && matchesFilter;
});
```

---

## 🎨 UI Components Breakdown

### 1. Statistics Cards
```
┌─────────────────────┐
│ Total Problems      │
│      125           │  ← Large number display
│              📊     │  ← Icon
└─────────────────────┘
```

### 2. Pattern Statistics Grid
```
┌────────┬────────┬────────┬────────┐
│ Array  │ String │  Tree  │ Graph  │
│   15   │   12   │   18   │   10   │
└────────┴────────┴────────┴────────┘
```

### 3. Problem Card Layout
```
┌─────────────────────────────────────────────┐
│ Two Sum                         [Revise] [X] │
│ ┌───────┐ ┌────────┐ ┌──────────┐          │
│ │ Array │ │  Easy  │ │ LeetCode │          │
│ └───────┘ └────────┘ └──────────┘          │
│                                             │
│ Notes: Use hashmap for O(n) solution...    │
│ Link: https://leetcode.com/...             │
│ ─────────────────────────────────────────  │
│ First Solved: Jan 15  | Revisions: 3       │
│ Last Revised: 2 days ago | Attempts: 4     │
│ ⏰ This problem needs revision!             │
└─────────────────────────────────────────────┘
```

---

## 🔄 User Flow

### Adding a Problem
1. User clicks "Add Problem" button
2. Form appears with input fields
3. User fills: Title, Pattern, Difficulty, Platform, Link, Notes
4. User clicks "Save Problem"
5. Problem is added with current date
6. Form closes, problem appears in list

### Marking Revision
1. User clicks "Revise" button on a problem card
2. System adds current date to solvedDates array
3. Revision count increments
4. Last revised date updates
5. Card updates showing new revision info

### Filtering Problems
1. User types in search box → Filters by title
2. User selects pattern dropdown → Shows only that pattern
3. User selects "Needs Revision" → Shows problems >7 days old

---

## 📝 State Management

### Main State Variables
```javascript
// Array of all problems
const [problems, setProblems] = useState([]);

// Toggle add form visibility
const [showAddForm, setShowAddForm] = useState(false);

// Filter option: 'all' or 'revision'
const [filter, setFilter] = useState('all');

// Search input value
const [searchTerm, setSearchTerm] = useState('');

// Selected pattern filter
const [selectedPattern, setSelectedPattern] = useState('all');

// Form input data
const [formData, setFormData] = useState({
  title: '',
  pattern: '',
  difficulty: 'Medium',
  platform: '',
  link: '',
  notes: ''
});
```

---

## 🎯 Key Algorithms

### 1. Revision Check Algorithm
```
For each problem:
  If lastRevised is null:
    → Needs revision
  Else:
    daysSince = (today - lastRevised) / millisecondsPerDay
    If daysSince > 7:
      → Needs revision
```

### 2. Date Calculation
```javascript
// Get days between two dates
const days = (date1 - date2) / (1000 * 60 * 60 * 24)
// 1000 ms → 1 second
// 60 seconds → 1 minute
// 60 minutes → 1 hour
// 24 hours → 1 day
```

### 3. Search Algorithm
```
For each problem:
  Convert title to lowercase
  Convert search term to lowercase
  Check if title includes search term
  → Return matching problems
```

---

## 🎨 Color Coding

### Difficulty Colors
- **Easy**: Green (`bg-green-100 text-green-800`)
- **Medium**: Yellow (`bg-yellow-100 text-yellow-800`)
- **Hard**: Red (`bg-red-100 text-red-800`)

### Alert Colors
- **Needs Revision**: Yellow border and background
- **Pattern Tags**: Indigo
- **Success Actions**: Green
- **Delete Actions**: Red

---

## 🚀 Development Steps

### Step 1: Setup
1. Create React app
2. Install Tailwind CSS
3. Install lucide-react for icons

### Step 2: Basic Structure
1. Create main component
2. Add state variables
3. Setup localStorage functions

### Step 3: UI Components
1. Build header
2. Create statistics cards
3. Design problem cards
4. Add form inputs

### Step 4: Core Features
1. Implement add problem
2. Implement delete problem
3. Implement mark revision
4. Add search functionality
5. Add filter functionality

### Step 5: Statistics
1. Calculate total problems
2. Calculate pattern counts
3. Calculate difficulty counts
4. Find problems needing revision

### Step 6: Polish
1. Add loading states
2. Add error handling
3. Improve responsive design
4. Add animations

---

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked cards
- Smaller text
- Collapsible form

### Tablet (768px - 1024px)
- 2 column grid
- Medium cards
- Side-by-side filters

### Desktop (> 1024px)
- 4 column stats grid
- 6 column pattern grid
- Full-width layout
- Larger text and spacing

---

## 🔐 Data Persistence

### Storage Methods

**Option 1: localStorage (Recommended)**
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key'));
```

**Option 2: Backend API**
```javascript
// Save
await fetch('/api/problems', {
  method: 'POST',
  body: JSON.stringify(problems)
});

// Load
const response = await fetch('/api/problems');
const data = await response.json();
```

---

## 🧪 Testing Scenarios

### Test Cases
1. ✅ Add problem with all fields
2. ✅ Add problem with required fields only
3. ✅ Delete problem
4. ✅ Mark problem as revised
5. ✅ Search for problem by name
6. ✅ Filter by pattern
7. ✅ Filter problems needing revision
8. ✅ Check revision count increments
9. ✅ Check dates are stored correctly
10. ✅ Reload page and data persists

---

## 🎓 Learning Points

### React Concepts Used
- **useState**: Managing component state
- **useEffect**: Running code on component mount
- **Array methods**: map, filter, forEach
- **Conditional rendering**: && and ternary operators
- **Event handling**: onClick, onChange
- **Props**: Passing data between components

### JavaScript Concepts
- **Array manipulation**: push, filter, map
- **Object destructuring**: {...obj}
- **Spread operator**: [...array]
- **Date manipulation**: new Date(), toISOString()
- **Local storage**: setItem, getItem
- **JSON**: stringify, parse

### CSS Concepts
- **Flexbox**: Layout and alignment
- **Grid**: Multi-column layouts
- **Responsive design**: Media queries
- **Tailwind utilities**: bg-, text-, rounded-, etc.

---

## ✨ Enhanced Features

### 1. Edit Problem Functionality
- Edit existing problem details
- Update title, pattern, difficulty, platform, link, and notes
- Preserve revision history when editing

### 2. Export/Import Data
- Export all problems as JSON file
- Import problems from JSON file
- Backup and restore functionality
- Merge imported data with existing data

### 3. Time Tracking
- Track time spent solving each problem
- Record time for each revision
- Display average time per problem
- Time statistics in dashboard

### 4. Streak Counter
- Track daily solving streaks
- Current streak and longest streak
- Streak calendar visualization
- Streak recovery (grace period)

### 5. Sort & Order Options
- Sort by: Date created, Last revised, Difficulty, Title, Revision count
- Sort order: Ascending/Descending
- Multi-column sorting

### 6. Custom Revision Intervals
- Set custom revision intervals per problem
- Default: 7 days, options: 1, 3, 7, 14, 30 days
- Smart revision reminders based on intervals

### 7. Problem Rating & Priority
- Rate problems: 1-5 stars
- Priority levels: Low, Medium, High, Critical
- Filter by rating and priority
- Sort by rating/priority

### 8. Tags System
- Add multiple custom tags per problem
- Filter by tags
- Tag-based statistics
- Tag suggestions/autocomplete

### 9. Calendar View
- Visual calendar showing solved problems
- Daily problem count
- Click date to see problems solved that day
- Monthly/weekly views

### 10. Progress Charts & Analytics
- Line chart: Problems solved over time
- Pie chart: Distribution by pattern
- Bar chart: Difficulty distribution
- Revision frequency graph

### 11. Bulk Operations
- Bulk delete selected problems
- Bulk mark as revised
- Bulk tag assignment
- Bulk export selected problems

### 12. Dark Mode
- Toggle between light and dark themes
- Persistent theme preference
- Smooth theme transitions

### 13. Problem Templates
- Save common problem templates
- Quick add from templates
- Template library for common patterns

### 14. Advanced Search
- Search by multiple fields (title, notes, platform)
- Search by date range
- Search by rating/priority
- Save search queries

### 15. Problem Statistics Per Pattern
- Average time per pattern
- Success rate per pattern
- Most revised patterns
- Pattern difficulty trends

---

## 📚 Resources for Learning

### React
- React official docs: react.dev
- useState hook guide
- useEffect hook guide

### Tailwind CSS
- Tailwind docs: tailwindcss.com
- Utility classes reference

### JavaScript
- Array methods (MDN)
- Date objects (MDN)
- LocalStorage API (MDN)

---

## 🐛 Common Issues & Solutions

### Issue 1: Data not persisting
**Solution**: Check localStorage is enabled, use try-catch

### Issue 2: Dates showing wrong
**Solution**: Use toISOString() for consistency

### Issue 3: State not updating
**Solution**: Create new arrays/objects, don't mutate

### Issue 4: Search not working
**Solution**: Convert to lowercase for comparison

### Issue 5: Performance with many problems
**Solution**: Use pagination or virtual scrolling

---

## 📊 Sample Data for Testing

```javascript
const sampleProblems = [
  {
    id: 1,
    title: "Two Sum",
    pattern: "Array",
    difficulty: "Easy",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/two-sum",
    notes: "Use hashmap for O(n) solution",
    solvedDates: ["2024-01-15T10:00:00.000Z"],
    revisionCount: 0,
    lastRevised: null,
    createdAt: "2024-01-15T10:00:00.000Z"
  },
  {
    id: 2,
    title: "Longest Palindromic Substring",
    pattern: "Dynamic Programming",
    difficulty: "Medium",
    platform: "LeetCode",
    link: "",
    notes: "Expand around center approach",
    solvedDates: ["2024-01-20T14:30:00.000Z", "2024-01-25T09:00:00.000Z"],
    revisionCount: 1,
    lastRevised: "2024-01-25T09:00:00.000Z",
    createdAt: "2024-01-20T14:30:00.000Z"
  }
];
```

---

## 🚀 Enhanced Features Implementation

### 1. Enhanced Data Structure

#### Updated Problem Object Schema
```javascript
{
  id: 1234567890,
  title: "Two Sum",
  pattern: "Array",
  difficulty: "Easy",
  platform: "LeetCode",
  link: "https://...",
  notes: "Use hashmap...",
  solvedDates: [
    {
      date: "2024-01-15T10:30:00.000Z",
      timeSpent: 25, // minutes
      rating: 4 // 1-5 stars
    }
  ],
  revisionCount: 1,
  lastRevised: "2024-01-22T14:20:00.000Z",
  createdAt: "2024-01-15T10:30:00.000Z",
  // NEW FIELDS
  tags: ["hashmap", "two-pointer"], // Array of tags
  priority: "High", // Low, Medium, High, Critical
  averageRating: 4.2, // Average of all ratings
  totalTimeSpent: 45, // Total minutes
  revisionInterval: 7, // Days between revisions
  isTemplate: false, // If saved as template
  templateName: null // Template name if applicable
}
```

#### User Preferences Schema
```javascript
{
  theme: "light", // "light" or "dark"
  defaultRevisionInterval: 7, // Days
  defaultDifficulty: "Medium",
  streakStartDate: "2024-01-01T00:00:00.000Z",
  currentStreak: 5,
  longestStreak: 12,
  lastSolvedDate: "2024-01-15T00:00:00.000Z"
}
```

---

### 2. Edit Problem Function

```javascript
const editProblem = (id, updatedData) => {
  const updated = problems.map(p => {
    if (p.id === id) {
      return {
        ...p,
        ...updatedData, // Update fields
        // Preserve revision history
        solvedDates: p.solvedDates,
        revisionCount: p.revisionCount,
        lastRevised: p.lastRevised,
        createdAt: p.createdAt
      };
    }
    return p;
  });
  
  saveProblems(updated);
  setEditingProblem(null); // Close edit form
};
```

---

### 3. Export/Import Functions

```javascript
// Export to JSON
const exportData = () => {
  const dataStr = JSON.stringify(problems, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dsa-problems-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// Import from JSON
const importData = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      const mergeMode = confirm('Merge with existing data? (Cancel to replace)');
      
      if (mergeMode) {
        // Merge: add new IDs to avoid conflicts
        const merged = [
          ...problems,
          ...imported.map(p => ({
            ...p,
            id: p.id + Date.now() // Ensure unique IDs
          }))
        ];
        saveProblems(merged);
      } else {
        saveProblems(imported);
      }
      
      alert('Data imported successfully!');
    } catch (error) {
      alert('Error importing data: ' + error.message);
    }
  };
  reader.readAsText(file);
};
```

---

### 4. Time Tracking Functions

```javascript
// Start timer for a problem
const startTimer = (id) => {
  setActiveTimer({
    problemId: id,
    startTime: Date.now()
  });
};

// Stop timer and save time
const stopTimer = (id) => {
  if (!activeTimer || activeTimer.problemId !== id) return;
  
  const timeSpent = Math.round((Date.now() - activeTimer.startTime) / 60000); // minutes
  
  const updated = problems.map(p => {
    if (p.id === id) {
      const newSolveDate = {
        date: new Date().toISOString(),
        timeSpent: timeSpent,
        rating: formData.rating || null
      };
      
      return {
        ...p,
        solvedDates: [...p.solvedDates, newSolveDate],
        totalTimeSpent: (p.totalTimeSpent || 0) + timeSpent,
        revisionCount: p.revisionCount + 1,
        lastRevised: new Date().toISOString()
      };
    }
    return p;
  });
  
  saveProblems(updated);
  setActiveTimer(null);
};

// Calculate average time
const getAverageTime = (problem) => {
  if (!problem.solvedDates || problem.solvedDates.length === 0) return 0;
  const total = problem.solvedDates.reduce((sum, d) => sum + (d.timeSpent || 0), 0);
  return Math.round(total / problem.solvedDates.length);
};
```

---

### 5. Streak Counter Functions

```javascript
// Calculate and update streak
const updateStreak = () => {
  const today = new Date().toDateString();
  const lastSolved = new Date(userPrefs.lastSolvedDate).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  let newStreak = userPrefs.currentStreak;
  let newLongestStreak = userPrefs.longestStreak;
  
  if (today === lastSolved) {
    // Already solved today, no change
    return;
  } else if (yesterday === lastSolved) {
    // Solved yesterday, continue streak
    newStreak += 1;
  } else {
    // Streak broken, reset
    newStreak = 1;
  }
  
  if (newStreak > newLongestStreak) {
    newLongestStreak = newStreak;
  }
  
  const updatedPrefs = {
    ...userPrefs,
    currentStreak: newStreak,
    longestStreak: newLongestStreak,
    lastSolvedDate: new Date().toISOString()
  };
  
  saveUserPreferences(updatedPrefs);
};

// Check if streak is active
const isStreakActive = () => {
  const lastSolved = new Date(userPrefs.lastSolvedDate).toDateString();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  return lastSolved === today || lastSolved === yesterday;
};
```

---

### 6. Sort Functions

```javascript
const sortProblems = (problems, sortBy, order) => {
  const sorted = [...problems].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
      case 'lastRevised':
        comparison = (new Date(a.lastRevised || 0) - new Date(b.lastRevised || 0));
        break;
      case 'difficulty':
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'revisionCount':
        comparison = a.revisionCount - b.revisionCount;
        break;
      case 'rating':
        comparison = (a.averageRating || 0) - (b.averageRating || 0);
        break;
      default:
        return 0;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
};

// Usage
const [sortBy, setSortBy] = useState('date');
const [sortOrder, setSortOrder] = useState('desc');
const sortedProblems = sortProblems(filteredProblems, sortBy, sortOrder);
```

---

### 7. Tags Management Functions

```javascript
// Add tag to problem
const addTag = (problemId, tag) => {
  const updated = problems.map(p => {
    if (p.id === problemId) {
      const tags = p.tags || [];
      if (!tags.includes(tag)) {
        return { ...p, tags: [...tags, tag] };
      }
    }
    return p;
  });
  saveProblems(updated);
};

// Remove tag from problem
const removeTag = (problemId, tag) => {
  const updated = problems.map(p => {
    if (p.id === problemId) {
      return {
        ...p,
        tags: (p.tags || []).filter(t => t !== tag)
      };
    }
    return p;
  });
  saveProblems(updated);
};

// Get all unique tags
const getAllTags = () => {
  const tagSet = new Set();
  problems.forEach(p => {
    (p.tags || []).forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

// Filter by tags
const filterByTags = (problems, selectedTags) => {
  if (selectedTags.length === 0) return problems;
  
  return problems.filter(p => {
    const problemTags = p.tags || [];
    return selectedTags.some(tag => problemTags.includes(tag));
  });
};
```

---

### 8. Custom Revision Intervals

```javascript
// Check if problem needs revision (with custom interval)
const needsRevision = (problem) => {
  if (!problem.lastRevised) return true;
  
  const interval = problem.revisionInterval || userPrefs.defaultRevisionInterval || 7;
  const daysSince = (Date.now() - new Date(problem.lastRevised)) / (1000 * 60 * 60 * 24);
  
  return daysSince > interval;
};

// Update revision interval for problem
const setRevisionInterval = (problemId, days) => {
  const updated = problems.map(p => {
    if (p.id === problemId) {
      return { ...p, revisionInterval: days };
    }
    return p;
  });
  saveProblems(updated);
};
```

---

### 9. Problem Rating Functions

```javascript
// Calculate average rating
const calculateAverageRating = (problem) => {
  if (!problem.solvedDates || problem.solvedDates.length === 0) return 0;
  
  const ratings = problem.solvedDates
    .map(d => d.rating)
    .filter(r => r !== null && r !== undefined);
  
  if (ratings.length === 0) return 0;
  
  const sum = ratings.reduce((a, b) => a + b, 0);
  return Math.round((sum / ratings.length) * 10) / 10; // Round to 1 decimal
};

// Update rating when marking revision
const markRevisionWithRating = (id, rating, timeSpent) => {
  const updated = problems.map(p => {
    if (p.id === id) {
      const newSolveDate = {
        date: new Date().toISOString(),
        timeSpent: timeSpent || null,
        rating: rating || null
      };
      
      const newSolvedDates = [...p.solvedDates, newSolveDate];
      const avgRating = calculateAverageRating({
        ...p,
        solvedDates: newSolvedDates
      });
      
      return {
        ...p,
        solvedDates: newSolvedDates,
        averageRating: avgRating,
        revisionCount: p.revisionCount + 1,
        lastRevised: new Date().toISOString()
      };
    }
    return p;
  });
  
  saveProblems(updated);
};
```

---

### 10. Calendar View Functions

```javascript
// Get problems solved on a specific date
const getProblemsByDate = (date) => {
  const dateStr = new Date(date).toDateString();
  return problems.filter(p => {
    return p.solvedDates.some(sd => {
      const solveDate = new Date(sd.date || sd).toDateString();
      return solveDate === dateStr;
    });
  });
};

// Get problems solved in a date range
const getProblemsByDateRange = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  
  return problems.filter(p => {
    return p.solvedDates.some(sd => {
      const solveTime = new Date(sd.date || sd).getTime();
      return solveTime >= start && solveTime <= end;
    });
  });
};

// Get daily solve count for calendar
const getDailySolveCount = (year, month) => {
  const counts = {};
  problems.forEach(p => {
    p.solvedDates.forEach(sd => {
      const date = new Date(sd.date || sd);
      if (date.getFullYear() === year && date.getMonth() === month) {
        const day = date.getDate();
        counts[day] = (counts[day] || 0) + 1;
      }
    });
  });
  return counts;
};
```

---

### 11. Bulk Operations Functions

```javascript
// Bulk delete
const bulkDelete = (selectedIds) => {
  if (confirm(`Delete ${selectedIds.length} problem(s)?`)) {
    saveProblems(problems.filter(p => !selectedIds.includes(p.id)));
    setSelectedProblems([]);
  }
};

// Bulk mark as revised
const bulkMarkRevised = (selectedIds) => {
  const updated = problems.map(p => {
    if (selectedIds.includes(p.id)) {
      return {
        ...p,
        solvedDates: [...p.solvedDates, { date: new Date().toISOString() }],
        revisionCount: p.revisionCount + 1,
        lastRevised: new Date().toISOString()
      };
    }
    return p;
  });
  saveProblems(updated);
  setSelectedProblems([]);
};

// Bulk add tags
const bulkAddTags = (selectedIds, tags) => {
  const updated = problems.map(p => {
    if (selectedIds.includes(p.id)) {
      const existingTags = p.tags || [];
      const newTags = tags.filter(t => !existingTags.includes(t));
      return { ...p, tags: [...existingTags, ...newTags] };
    }
    return p;
  });
  saveProblems(updated);
};
```

---

### 12. Dark Mode Implementation

```javascript
// Theme state and toggle
const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem('dsa-theme');
  return saved || 'light';
});

useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('dsa-theme', theme);
}, [theme]);

const toggleTheme = () => {
  setTheme(prev => prev === 'light' ? 'dark' : 'light');
};

// Tailwind dark mode classes
// Add 'dark:' prefix to classes for dark mode
// Example: bg-white dark:bg-gray-800
```

---

### 13. Enhanced Statistics Functions

```javascript
// Get comprehensive statistics
const getEnhancedStats = () => {
  const stats = {
    total: problems.length,
    byPattern: {},
    byDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
    byPriority: { Low: 0, Medium: 0, High: 0, Critical: 0 },
    needsRevision: 0,
    totalTimeSpent: 0,
    averageTimePerProblem: 0,
    averageRating: 0,
    totalRevisions: 0,
    problemsWithTags: 0,
    mostCommonTag: null
  };
  
  const tagCounts = {};
  
  problems.forEach(p => {
    // Pattern count
    stats.byPattern[p.pattern] = (stats.byPattern[p.pattern] || 0) + 1;
    
    // Difficulty count
    stats.byDifficulty[p.difficulty]++;
    
    // Priority count
    if (p.priority) {
      stats.byPriority[p.priority]++;
    }
    
    // Revision check
    if (needsRevision(p)) {
      stats.needsRevision++;
    }
    
    // Time tracking
    stats.totalTimeSpent += p.totalTimeSpent || 0;
    stats.totalRevisions += p.revisionCount || 0;
    
    // Rating
    if (p.averageRating) {
      stats.averageRating += p.averageRating;
    }
    
    // Tags
    if (p.tags && p.tags.length > 0) {
      stats.problemsWithTags++;
      p.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  
  // Calculate averages
  if (problems.length > 0) {
    stats.averageTimePerProblem = Math.round(stats.totalTimeSpent / problems.length);
    stats.averageRating = Math.round((stats.averageRating / problems.length) * 10) / 10;
  }
  
  // Find most common tag
  const tagEntries = Object.entries(tagCounts);
  if (tagEntries.length > 0) {
    stats.mostCommonTag = tagEntries.reduce((a, b) => 
      tagCounts[a[0]] > tagCounts[b[0]] ? a : b
    )[0];
  }
  
  return stats;
};
```

---

### 14. Advanced Search Function

```javascript
// Multi-field search
const advancedSearch = (problems, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') return problems;
  
  const query = searchQuery.toLowerCase();
  
  return problems.filter(p => {
    // Search in title
    const titleMatch = p.title.toLowerCase().includes(query);
    
    // Search in notes
    const notesMatch = p.notes?.toLowerCase().includes(query);
    
    // Search in platform
    const platformMatch = p.platform?.toLowerCase().includes(query);
    
    // Search in tags
    const tagsMatch = (p.tags || []).some(tag => 
      tag.toLowerCase().includes(query)
    );
    
    // Search in pattern
    const patternMatch = p.pattern?.toLowerCase().includes(query);
    
    return titleMatch || notesMatch || platformMatch || tagsMatch || patternMatch;
  });
};

// Search with filters
const searchWithFilters = (problems, searchQuery, filters) => {
  let results = problems;
  
  // Apply search query
  if (searchQuery) {
    results = advancedSearch(results, searchQuery);
  }
  
  // Apply date range filter
  if (filters.dateFrom && filters.dateTo) {
    results = results.filter(p => {
      const created = new Date(p.createdAt);
      return created >= new Date(filters.dateFrom) && 
             created <= new Date(filters.dateTo);
    });
  }
  
  // Apply rating filter
  if (filters.minRating) {
    results = results.filter(p => 
      (p.averageRating || 0) >= filters.minRating
    );
  }
  
  // Apply priority filter
  if (filters.priority && filters.priority !== 'all') {
    results = results.filter(p => p.priority === filters.priority);
  }
  
  return results;
};
```

---

### 15. Progress Charts Data Preparation

```javascript
// Prepare data for line chart (problems over time)
const getProblemsOverTime = () => {
  const data = {};
  
  problems.forEach(p => {
    const date = new Date(p.createdAt).toDateString();
    data[date] = (data[date] || 0) + 1;
  });
  
  // Convert to array format for charting library
  return Object.entries(data)
    .map(([date, count]) => ({
      date: new Date(date),
      count: count
    }))
    .sort((a, b) => a.date - b.date);
};

// Prepare data for pie chart (pattern distribution)
const getPatternDistribution = () => {
  const distribution = {};
  
  problems.forEach(p => {
    distribution[p.pattern] = (distribution[p.pattern] || 0) + 1;
  });
  
  return Object.entries(distribution).map(([pattern, count]) => ({
    pattern,
    count,
    percentage: Math.round((count / problems.length) * 100)
  }));
};

// Prepare data for bar chart (difficulty distribution)
const getDifficultyDistribution = () => {
  const distribution = { Easy: 0, Medium: 0, Hard: 0 };
  
  problems.forEach(p => {
    distribution[p.difficulty]++;
  });
  
  return Object.entries(distribution).map(([difficulty, count]) => ({
    difficulty,
    count
  }));
};
```

---

### 16. Enhanced State Management

```javascript
// Updated state variables
const [problems, setProblems] = useState([]);
const [showAddForm, setShowAddForm] = useState(false);
const [editingProblem, setEditingProblem] = useState(null);
const [filter, setFilter] = useState('all');
const [searchTerm, setSearchTerm] = useState('');
const [selectedPattern, setSelectedPattern] = useState('all');
const [selectedTags, setSelectedTags] = useState([]);
const [sortBy, setSortBy] = useState('date');
const [sortOrder, setSortOrder] = useState('desc');
const [selectedProblems, setSelectedProblems] = useState([]);
const [activeTimer, setActiveTimer] = useState(null);
const [userPrefs, setUserPrefs] = useState({
  theme: 'light',
  defaultRevisionInterval: 7,
  defaultDifficulty: 'Medium',
  currentStreak: 0,
  longestStreak: 0,
  lastSolvedDate: null
});

const [formData, setFormData] = useState({
  title: '',
  pattern: '',
  difficulty: 'Medium',
  platform: '',
  link: '',
  notes: '',
  tags: [],
  priority: 'Medium',
  revisionInterval: 7,
  rating: null,
  timeSpent: null
});
```

---

### 17. Enhanced UI Components

#### Problem Card with New Features
```
┌─────────────────────────────────────────────────────┐
│ Two Sum                    [⭐4.2] [🔴High] [Edit][X]│
│ ┌───────┐ ┌────────┐ ┌──────────┐ ┌─────────────┐  │
│ │ Array │ │  Easy  │ │ LeetCode │ │ ⏱️ 25 min   │  │
│ └───────┘ └────────┘ └──────────┘ └─────────────┘  │
│ Tags: #hashmap #two-pointer                         │
│                                                     │
│ Notes: Use hashmap for O(n) solution...            │
│ Link: https://leetcode.com/...                     │
│ ─────────────────────────────────────────────────  │
│ First Solved: Jan 15  | Revisions: 3              │
│ Last Revised: 2 days ago | Attempts: 4             │
│ Avg Time: 25 min | Total Time: 100 min            │
│ Revision Interval: 7 days                          │
│ ⏰ This problem needs revision!                    │
│ [Revise] [Start Timer] [Set Interval]              │
└─────────────────────────────────────────────────────┘
```

#### Enhanced Statistics Dashboard
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   Total     │   Streak    │  Avg Time   │  Avg Rating │
│    125      │     5 🔥    │   25 min    │    4.2 ⭐   │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

---

### 18. Implementation Priority

**Phase 1 (Essential Enhancements)**
1. Edit Problem Functionality
2. Sort & Order Options
3. Export/Import Data
4. Enhanced Statistics

**Phase 2 (User Experience)**
5. Time Tracking
6. Streak Counter
7. Custom Revision Intervals
8. Problem Rating & Priority

**Phase 3 (Advanced Features)**
9. Tags System
10. Calendar View
11. Progress Charts
12. Bulk Operations

**Phase 4 (Polish)**
13. Dark Mode
14. Advanced Search
15. Problem Templates

---

This enhanced guide now includes comprehensive features to make your DSA Problem Tracker a powerful learning and tracking tool!

---

## 📋 Quick Reference: New Features Summary

### ✨ Feature Checklist

**Problem Management**
- ✅ Edit existing problems
- ✅ Bulk delete operations
- ✅ Advanced multi-field search
- ✅ Filter by tags
- ✅ Filter by priority/rating
- ✅ Sort by multiple criteria (date, difficulty, title, rating, etc.)

**Data & Storage**
- ✅ Export data as JSON
- ✅ Import data from JSON
- ✅ Merge imported data
- ✅ Backup and restore functionality

**Time & Performance Tracking**
- ✅ Track time spent per problem
- ✅ Timer functionality
- ✅ Average time calculations
- ✅ Total time statistics

**Gamification & Motivation**
- ✅ Daily streak counter
- ✅ Longest streak tracking
- ✅ Streak calendar visualization
- ✅ Problem rating system (1-5 stars)
- ✅ Priority levels (Low, Medium, High, Critical)

**Revision System**
- ✅ Custom revision intervals per problem
- ✅ Bulk mark as revised
- ✅ Revision with time and rating
- ✅ Smart revision reminders

**Organization**
- ✅ Custom tags system
- ✅ Tag-based filtering
- ✅ Tag statistics
- ✅ Problem templates
- ✅ Quick add from templates

**Visualization & Analytics**
- ✅ Calendar view (monthly/weekly)
- ✅ Problems over time chart
- ✅ Pattern distribution chart
- ✅ Difficulty distribution chart
- ✅ Enhanced statistics dashboard

**User Experience**
- ✅ Dark mode support
- ✅ Theme persistence
- ✅ Bulk operations UI
- ✅ Multi-select functionality
- ✅ Advanced search UI

**Statistics & Insights**
- ✅ Average rating per problem
- ✅ Average time per problem
- ✅ Pattern-based statistics
- ✅ Priority-based statistics
- ✅ Tag-based statistics
- ✅ Revision frequency analysis

---

## 🎯 Implementation Quick Start

### Priority 1: Must-Have Features
1. **Edit Problem** - Essential for data management
2. **Sort & Filter** - Improves usability significantly
3. **Export/Import** - Data backup is critical

### Priority 2: High-Value Features
4. **Time Tracking** - Valuable for performance analysis
5. **Streak Counter** - Great for motivation
6. **Custom Revision Intervals** - Flexible learning schedule

### Priority 3: Nice-to-Have Features
7. **Tags System** - Better organization
8. **Calendar View** - Visual progress tracking
9. **Charts & Analytics** - Data insights

### Priority 4: Polish Features
10. **Dark Mode** - User preference
11. **Bulk Operations** - Efficiency for power users
12. **Templates** - Quick problem entry

---

## 🔗 Feature Dependencies

```
Edit Problem
  └─ No dependencies

Sort & Filter
  └─ No dependencies

Export/Import
  └─ No dependencies

Time Tracking
  └─ Enhanced solvedDates structure

Streak Counter
  └─ User preferences storage

Custom Revision Intervals
  └─ Problem schema update

Tags System
  └─ Problem schema update

Calendar View
  └─ solvedDates array

Charts & Analytics
  └─ All data structures

Dark Mode
  └─ Theme state management

Bulk Operations
  └─ Selection state management

Templates
  └─ Template storage structure
```

---

## 📊 Feature Impact Matrix

| Feature | User Value | Implementation Effort | Priority |
|---------|-----------|---------------------|----------|
| Edit Problem | ⭐⭐⭐⭐⭐ | Low | P1 |
| Sort & Filter | ⭐⭐⭐⭐⭐ | Low | P1 |
| Export/Import | ⭐⭐⭐⭐⭐ | Low | P1 |
| Time Tracking | ⭐⭐⭐⭐ | Medium | P2 |
| Streak Counter | ⭐⭐⭐⭐ | Medium | P2 |
| Custom Intervals | ⭐⭐⭐⭐ | Low | P2 |
| Tags System | ⭐⭐⭐ | Medium | P3 |
| Calendar View | ⭐⭐⭐ | High | P3 |
| Charts | ⭐⭐⭐ | High | P3 |
| Dark Mode | ⭐⭐ | Low | P4 |
| Bulk Operations | ⭐⭐⭐ | Medium | P4 |
| Templates | ⭐⭐ | Low | P4 |

---

## 🚀 Getting Started with Enhancements

1. **Start with Data Structure Updates**
   - Update problem schema to include new fields
   - Add user preferences storage
   - Migrate existing data if needed

2. **Implement Core Features First**
   - Edit functionality
   - Sort and filter
   - Export/Import

3. **Add User Experience Features**
   - Time tracking
   - Streak counter
   - Custom intervals

4. **Enhance with Advanced Features**
   - Tags system
   - Calendar view
   - Charts and analytics

5. **Polish with UI/UX**
   - Dark mode
   - Bulk operations
   - Templates

---

## 💡 Tips for Implementation

1. **Incremental Development**: Implement features one at a time and test thoroughly
2. **Backward Compatibility**: Ensure existing data works with new features
3. **User Preferences**: Store all user settings in localStorage
4. **Performance**: Consider pagination for large problem lists
5. **Error Handling**: Add try-catch blocks for all storage operations
6. **Data Migration**: Create migration functions for existing users
7. **Testing**: Test each feature with sample data before full implementation

---

**Happy Coding! 🎉**