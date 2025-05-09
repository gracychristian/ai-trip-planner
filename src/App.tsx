import { Suspense, lazy } from "react";
import { AppProvider } from "./layouts/AppProvider";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Chat = lazy(() => import("./components/chatAI/ChatComponent"));

const App = () => {
  return (
    <GoogleOAuthProvider clientId="64452379505-rnbncurr5jfbea2imjg3i14q1t8vjn98.apps.googleusercontent.com">
    <AppProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="chat.ai" element={<Chat />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
