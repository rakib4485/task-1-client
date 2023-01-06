import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import EditForm from './components/Form/EditForm';
import Form from './components/Form/Form';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Main from './layout/Main';
import Register from './layout/Register';
import PrivateRoutes from './PrivateRoute/PrivateRoutes';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Form></Form>
        },
        {
          path: '/edit',
          element: <PrivateRoutes><EditForm></EditForm></PrivateRoutes>
        },
        
      ]
    },
    {
      path: '/login',
      element: <Register></Register>,
      children: [
        {
          path: '/login',
          element: <Login></Login>
        }
      ]
    },
    {
      path: '/signup',
      element: <Register></Register>,
      children: [
        {
          path: '/signup',
          element: <Signup></Signup>
        }
      ]
    },
  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
