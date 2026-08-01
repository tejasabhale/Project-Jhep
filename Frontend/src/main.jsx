import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/common/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
        reverseOrder={false}
      />
      <App />
    </BrowserRouter>
  </AuthProvider>,
);
