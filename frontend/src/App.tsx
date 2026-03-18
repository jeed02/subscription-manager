import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import SubscriptionsPage from "./pages/SubscriptionsPage.tsx";
import AnalyticsPage from "./pages/AnalyticsPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";



function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/subscriptions"
                element={
                    <ProtectedRoute>
                        <SubscriptionsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <AnalyticsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
      </BrowserRouter>
  )
}

export default App
