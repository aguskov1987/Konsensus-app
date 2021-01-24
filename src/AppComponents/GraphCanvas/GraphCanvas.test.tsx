import React from 'react';
import { screen } from '@testing-library/react';
import GraphCanvas from "./GraphCanvas";
import {render} from "../../AppState/TestUtils";
import {AppState} from "../../AppState/AppState";
import 'jest-canvas-mock';

test('renders learn react link', () => {
    const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ];

    render(<GraphCanvas elements={elements}/>, {initialState: new AppState()});
    const linkElement = screen.getByText(/Node 2/i);
    expect(linkElement).toBeInTheDocument();
});