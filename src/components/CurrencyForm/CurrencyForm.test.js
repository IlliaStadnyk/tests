import {render, screen, cleanup} from "@testing-library/react";
import CurrencyForm from "./CurrencyForm";
import userEvent from "@testing-library/user-event";

const testCases = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
];

describe('Component CurrencyForm', () => {
    it('should renders without crashing', () => {
        render(<CurrencyForm action={()=>{}}/>);
    })
    // it('should run action callback with proper data on form submit', () => {
    //     const action = jest.fn();
    //
    //     // render component
    //     render(<CurrencyForm action={action} />);
    //
    //     // find “convert” button
    //     const submitButton = screen.getByText('Convert');
    //
    //     // find fields elems
    //     const amountField = screen.getByTestId('amount');
    //     const fromField = screen.getByTestId('selectFrom');
    //     const toField = screen.getByTestId('selectTo');
    //
    //     // set test values to fields
    //     userEvent.type(amountField, '100');
    //     userEvent.selectOptions(fromField, 'PLN');
    //     userEvent.selectOptions(toField, 'USD');
    //
    //     // simulate user click on "convert" button
    //     userEvent.click(submitButton);
    //
    //     // check if action callback was called once and with proper argument
    //     expect(action).toHaveBeenCalledTimes(1);
    //     expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
    // });
    for (const testCase of testCases) {
        it(`should call action callback with correct data: ${testCase.amount} ${testCase.from} → ${testCase.to}`, () => {
            const action = jest.fn();

            render(<CurrencyForm action={action} />);

            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('selectFrom');
            const toField = screen.getByTestId('selectTo');
            const submitButton = screen.getByText('Convert');

            userEvent.clear(amountField);
            userEvent.type(amountField, testCase.amount);
            userEvent.selectOptions(fromField, testCase.from);
            userEvent.selectOptions(toField, testCase.to);

            userEvent.click(submitButton);

            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith({
                amount: parseFloat(testCase.amount),
                from: testCase.from,
                to: testCase.to,
            });

            cleanup();
        });
    }
})