# 🤖 Reddit Client
<p align="center">
  <img src="src/assets/reddit-client-preview.png" width="800"/>
</p>

A Reddit-style browsing client built as the capstone project for the Redux module of my Full-Stack Engineer path. Browse popular subreddits, view post feeds, search content, and read full comment threads — all powered by Redux Toolkit and React Router.

---

## 🚀 Live Features

* Popular communities sidebar with subreddit selection
* Subreddit feed that updates based on selected community
* Global search bar with submit-to-search behavior
* Individual post detail pages with full comment threads
* Recursive nested comment rendering (replies-to-replies, arbitrary depth)
* Client-side routing via React Router (`/post/:postId`)
* Responsive Reddit-inspired UI

---

## 🛠️ Tech Stack

* React
* TypeScript
* Redux Toolkit (slices, async thunks, `extraReducers`)
* React Router v6
* Vite
* Netlify (deployment + serverless function)

---

## 📂 Project Structure

```
src/
│
├── app/
│   ├── App.tsx          (router config)
│   ├── hooks.ts
│   └── store.ts
│
├── features/
│   ├── Popular/         (popularSlice + Popular component)
│   ├── Feed/             (feedSlice + Feed component)
│   ├── Searchbar/        (searchbarSlice + Searchbar component)
│   └── PostDetail/       (postDetailSlice + PostDetail component)
│
└── components/
    ├── Navbar/
    ├── Sidebar/
    ├── Posts/
    ├── PostCard/
    └── CommentCard/
```

---

## 📌 Key Highlights

### 1. Redux Architecture
* Four feature slices, each with their own async thunk and `extraReducers` pending/fulfilled/rejected lifecycle
* Cross-slice coordination — selecting a subreddit clears stale search results via a dispatched action from a sibling slice

### 2. Recursive Comment Parsing
* Reddit's comment API returns an arbitrarily deep nested tree (replies can have replies, indefinitely)
* Handled with a self-calling recursive mapping function rather than a fixed-depth loop

### 3. Routing & Dynamic Data Fetching
* `useParams` reads the post ID directly from the URL
* `useEffect` triggers a fetch keyed to that ID, with TypeScript-safe handling for the `string | undefined` param type

---

## ⚠️ API Status: Mock Data

This project uses Reddit's public, unauthenticated `.json` endpoints as specified in the project brief. During development, these endpoints returned `403 Forbidden` errors both locally and when deployed (via a Netlify serverless proxy), even with correct headers and a valid User-Agent.

**Root cause:** Reddit actively blocks requests from cloud/serverless IP ranges (AWS, Netlify, Vercel, etc.) regardless of headers — a known limitation also reported by other Codecademy students working through this same project. Reliable live data requires a registered Reddit OAuth app (client ID + secret), which is outside this project's brief and approval timeline.

**What's real in this build:**
* All Redux slices (`popular`, `feed`, `searchbar`, `postDetails`) contain fully written, correct fetch thunks targeting Reddit's real endpoint patterns (`/r/{subreddit}.json`, `/comments/{id}.json`, `/search.json`)
* A working Netlify serverless proxy exists to solve the CORS portion of the problem
* Mock data is used as the active data source so the full UI/UX can be demonstrated reliably regardless of Reddit's request-blocking policy

The real-fetch thunks are preserved in the codebase (commented where mocked) as evidence of the complete data-fetching implementation.

---

## ⚙️ Setup & Usage

1. Clone the repository:
```
git clone https://github.com/emdrarguelles/Portfolio.git
```
2. Navigate to the project folder and install dependencies:
```
cd "Portfolio/Reddit Client"
npm install
```
3. Run the dev server:
```
npm run dev
```

---

## 📈 Future Improvements

* Register a Reddit OAuth app and wire up authenticated fetches for live data
* Re-enable real-time subreddit data once OAuth credentials are available
* Add infinite scroll / pagination to the feed
* Add loading skeletons instead of plain "Loading..." text
* Clear stale search results automatically when the search input is emptied

---

## 👤 Author

Ed Arguelles
* GitHub: https://github.com/emdrarguelles
* LinkedIn: https://www.linkedin.com/in/edmarcusarguelles/