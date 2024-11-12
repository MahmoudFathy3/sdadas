import "@styles/global.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import store from "./store/store";
import axios from "axios";
import { UserData } from "./utils/UserData";

const user = UserData();

if (user?.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
