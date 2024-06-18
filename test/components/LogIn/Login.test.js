import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LogIn from '../../../src/components/LogIn/LogIn.jsx';

const renderWithRouter = (ui, { route = '/login' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('LogIn component', () => {
  test('renders login form', () => {
    renderWithRouter(<LogIn />);
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('handles input changes', () => {
    renderWithRouter(<LogIn />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('submits the form and logs in the user successfully', async () => {
    renderWithRouter(<LogIn />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('You have successfully logged in!')).toBeInTheDocument();
    });
  });

  test('displays an error message if login fails', async () => {
    // Mock a failed login scenario by modifying the fetch call in the component
    // For simplicity, you can simulate a failed fetch by rejecting the Promise

    renderWithRouter(<LogIn />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'wrongpassword');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Login failed. Please try again!')).toBeInTheDocument();
    });
  });

  test('redirects to the home page after successful login', async () => {
    render(
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<div>Home Page</div>} />
      </Routes>
    );

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
  });
});
