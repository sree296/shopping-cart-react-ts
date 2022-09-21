import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';

test('Greet Should Render Correctly', () => {
    render(<Greet />);
    const txtElement = screen.getByText('Hello');
    expect(txtElement).toBeInTheDocument();
});

test('should render name', () => {
    render(<Greet name="Gattu" />);
    const txtElement = screen.getByText('Hello Gattu');
    expect(txtElement).toBeInTheDocument();
})

