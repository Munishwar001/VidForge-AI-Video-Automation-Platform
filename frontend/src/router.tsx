import { Route, Navigate, Routes } from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import { ProtectedRoute } from "./components/protected-route";
import { VideoGeneratorPage } from "./features/video-generator/video-generator.page";
import { ImageGeneratorPage } from "./features/image-generator/image-generator.page";
import { ProjectsPage } from "./features/projects/projects.page";
import { MediaLibraryPage } from "./features/media-library/media-library.page";
import { SettingsPage } from "./features/settings/settings.page";

export function  Router() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/videos"
                element={
                    <ProtectedRoute>
                        <VideoGeneratorPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/images"
                element={
                    <ProtectedRoute>
                        <ImageGeneratorPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/projects"
                element={
                    <ProtectedRoute>
                        <ProjectsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/media-library"
                element={
                    <ProtectedRoute>
                        <MediaLibraryPage />
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

            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    );
}
