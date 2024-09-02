import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './pages/Products';
import Tables from './pages/Tables';
import './index.css'
import Statistic from './pages/Statistic.jsx';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/tables',
    element: <Tables />
  },
  {
    path: '/stats',
    element: <Statistic />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
