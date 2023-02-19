import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { HeroesRoutes } from '../heroes/routes/HeroesRoutes';
import { PrivateRoute } from '../router/PrivateRoute';
import { PublicRoute } from '../router/PublicRoute';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
