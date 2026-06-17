import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Feed from '../features/Feed/Feed';
import Posts from '../features/Posts/Posts';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Feed />} />
      <Route path="feed/:postId" element={<Posts />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}


export default App;