const { render, screen } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
import { AuthContext } from '../../auth';
import { AppRouter } from '../../router/AppRouter';

describe('Tests in AppRouter.jsx', () => {
  test('should print login if is not authenticated', () => {
    const contextValue = {
      logged: false,
    };
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText('Login').length).toBe(2);
  });
  test('should print marvel if is authenticated', () => {
    const contextValue = {
      logged: true,
      user: { id: 'RICKYPAPI', name: 'Dante' },
    };
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText('Spider Man')).toBeTruthy();
  });
});
