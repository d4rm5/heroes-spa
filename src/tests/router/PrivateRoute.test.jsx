import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth';
import { PrivateRoute } from '../../router/PrivateRoute';

describe('Tests in PrivateRoute.jsx', () => {
  test('should print children if is authenticated', () => {
    Storage.prototype.setItem = jest.fn();
    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'dante',
      },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Ruta privada')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalled;
  });
});
