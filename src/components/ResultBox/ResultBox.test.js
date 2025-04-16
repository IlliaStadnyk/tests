import ResultBox from './ResultBox';
import {cleanup, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

const testCasesPLNToUSD = [
    { amount: 100, expected: 'PLN 100.00 = $28.57' },
    { amount: 20, expected: 'PLN 20.00 = $5.71' },
    { amount: 200, expected: 'PLN 200.00 = $57.14' },
    { amount: 345, expected: 'PLN 345.00 = $98.57' },
];
const testCasesUSDToPLN = [
    { amount: 100, expected: '$100.00 = PLN 350.00' },
    { amount: 50, expected: '$50.00 = PLN 175.00' },
    { amount: 20, expected: '$20.00 = PLN 70.0' },
    { amount: 345, expected: '$345.00 = PLN 1,207.50' },
];

describe('Component ResultBox', () => {
    it('should renders without crashing' , () => {
        render(<ResultBox from="PLN" to="USD" amount={180} />);
    })
    it('should render without crashing PLN to USD' , () => {
        for (const { amount, expected } of testCasesPLNToUSD) {
            render(<ResultBox from="PLN" to="USD" amount={amount} />);
            const resultBox = screen.getByTestId('resultBox');
            expect(resultBox).toHaveTextContent(expected);
            cleanup()
        }
    })
    it('should render without crashing USD to PLN' , () => {
        for (const { amount, expected } of testCasesUSDToPLN) {
            render(<ResultBox from="USD" to="PLN" amount={amount} />);
            const resultBox = screen.getByTestId('resultBox');
            expect(resultBox).toHaveTextContent(expected);
            cleanup()
        }
    })
    it('should return the same value when from and to currencies are the same (PLN)', () => {
        render(<ResultBox from="PLN" to="PLN" amount={123} />);
        const resultBox = screen.getByTestId('resultBox');
        expect(resultBox).toHaveTextContent('PLN 123.00 = PLN 123.00');
    });

    it('should return the same value when from and to currencies are the same (USD)', () => {
        render(<ResultBox from="USD" to="USD" amount={456} />);
        const resultBox = screen.getByTestId('resultBox');
        expect(resultBox).toHaveTextContent('$456.00 = $456.00');
    });

});