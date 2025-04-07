import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function FinancialCalculator() {
  const [price, setPrice] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0); // Now assumed to be in years
  const [downPayment, setDownPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculate = () => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12; // Convert years to months
    const loanAmount = price - downPayment;

    // Handle invalid loan amount
    if (loanAmount <= 0) {
      setMonthlyPayment(0);
      return;
    }

    const payment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    setMonthlyPayment(payment);
  };

  return (
    <div className="p-3 rounded-xl bg-white shadow-md border border-slate-300 mt-3">
      <h2 className="font-bold text-xl my-1">Financial Calculator</h2>
      <div className="flex justify-between gap-5">
        <div>
          <label htmlFor="price">Price $</label>
          <input type="number" name="price" className="w-full border border-gray-400 rounded-xl p-1" onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="interest-rate">Interest Rate %</label>
          <input type="number" name="interest-rate" className="w-full border border-gray-400 rounded-xl p-1" onChange={(e) => setInterestRate(Number(e.target.value))} />
        </div>
      </div>
      <div className="flex justify-between gap-5 mt-5">
        <div>
          <label htmlFor="loan-term">Loan Term (Years)</label> {/* Updated label */}
          <input type="number" name="loan-term" className="w-full border border-gray-400 rounded-xl p-1" onChange={(e) => setLoanTerm(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="down-payment">Down Payment $</label>
          <input type="number" name="down-payment" className="w-full border border-gray-400 rounded-xl p-1" onChange={(e) => setDownPayment(Number(e.target.value))} />
        </div>
      </div>
      <h2 className="mt-4 text-xl">
        Monthly Payment: ${monthlyPayment.toFixed(2)} {/* Display formatted value */}
      </h2>
      <Button className="w-full text-md p-1 text-center mt-3 bg-green-500 rounded-xl" size="md" onClick={calculate}>
        Calculate Loan
      </Button>
    </div>
  );
}

export default FinancialCalculator;
