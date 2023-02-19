import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../auth';
import { PublicRoute } from '../../router/PublicRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Tests in <PublicRoute/>', () => {
  test('should print children if is not authenticated', () => {
    const contextValue = {
      logged: false,
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta pública</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Ruta pública')).toBeTruthy();
  });
  test('should navigate if is authenticated', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Dante',
        id: 'TETTINSON',
      },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta pública</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Página Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Página Marvel')).toBeTruthy();
  });
});
