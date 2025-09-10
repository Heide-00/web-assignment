import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">JSONPlaceholder Viewer</h1>
      <div className="space-y-2">
        <Link to="/users" className="block text-blue-600 hover:underline">Go to User List</Link>
        <Link to="/posts" className="block text-blue-600 hover:underline">Go to Post List</Link>
      </div>
    </div>
  );
}

