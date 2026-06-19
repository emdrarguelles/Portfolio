import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Feed from '../features/Feed/Feed';
import PostDetail from '../features/PostDetail/PostDetail';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Outlet />
        <Sidebar />
      </div>
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Feed />} />
      <Route path="post/:postId" element={<PostDetail />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}


export default App;