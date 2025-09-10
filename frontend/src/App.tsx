import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/HomePage';
import UserList from 'src/components/UserList';
import PostList from 'src/components/PostList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
