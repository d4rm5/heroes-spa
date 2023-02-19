import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../../../ui/components/Navbar';
import { AuthContext } from '../../../auth/context/AuthContext';
import { MemoryRouter, useNavigate } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Tests in Navbar.jsx', () => {
  const contextValue = {
    logged: true,
    user: {
      name: 'Dante',
      id: 'ABC',
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks);

  test('should print username from context', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(contextValue.user.name)).toBeTruthy;
  });
  test('on click should call logout and navigate', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(logoutButton);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
