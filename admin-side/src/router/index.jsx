import { createBrowserRouter, redirect } from "react-router-dom";
import AddCategoryPage from "../views/AddCategoryPage";
import AddPostPage from "../views/AddPostPage";
import CategoriesPage from "../views/CategoriesPage";
import DashboardPage from "../views/DashboardPage";
import DeleteCategoryPage from "../views/DeleteCategoryPage";
import DeletePostPage from "../views/DeletePostPage";
import EditCategoryPage from "../views/EditCategoryPage";
import EditPostPage from "../views/EditPostPage";
import App from "../App.jsx";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (!token) throw redirect("/login");
      return null;
    },
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/posts/add",
        element: <AddPostPage />,
      },
      {
        path: "/posts/edit/:postId",
        element: <EditPostPage />,
      },
      {
        path: "/posts/delete/:postId",
        element: <DeletePostPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/add",
        element: <AddCategoryPage />,
      },
      {
        path: "/categories/edit/:categoryId",
        element: <EditCategoryPage />,
      },
      {
        path: "/categories/delete/:categoryId",
        element: <DeleteCategoryPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/login",
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (token) throw redirect("/");
      return null;
    },
    element: <LoginPage />,
  },
]);

export default router;
