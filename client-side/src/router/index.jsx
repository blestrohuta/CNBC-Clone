import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import LandingPage from "../views/LandingPage";
import DetailPage from "../views/DetailPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/detail/:postId",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
