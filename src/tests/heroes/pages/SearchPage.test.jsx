import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en SearchPage.jsx', () => {
  test('should print default values', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  test('should print Batman and the input with query value', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search?q=Batman']}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('Batman');
    const img = screen.getByRole('img');
    expect(img.src).toBe('http://localhost/heroes/dc-batman.jpg');
    const alertPrimary = screen.getByTestId('alertPrimary');
    expect(alertPrimary.style.display).toBe('none');
    const alertDanger = screen.getByTestId('alertDanger');
    expect(alertDanger.style.display).toBe('none');
  });
  test('should print error if dont found heroe', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search?q=Batman123']}>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Not hero with')).toBeTruthy();
  });
  test('should call navigate to new screen', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search?q=Batman123']}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: 'Spider' } });
    fireEvent.submit(input);
    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=spider');
  });
});
