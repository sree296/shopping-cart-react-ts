import { render, screen } from "@testing-library/react";
import Skills from "./Skills";

describe('Skills', () => {
    const skills = ['HTML','CSS', 'JS'];

    test('should render component without crash', () => {
        render(<Skills skills={skills} />);
        const listElement = screen.getByRole('list');
        expect(listElement).toBeInTheDocument();
    });

    test('should render list of skills', () => {
        render(<Skills skills={skills} />);
        const listElemts = screen.getAllByRole('listitem');
        expect(listElemts).toHaveLength(skills.length);
    })
});
