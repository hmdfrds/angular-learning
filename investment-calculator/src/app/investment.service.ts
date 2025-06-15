import { Injectable, signal } from "@angular/core";
import { UserInput } from "./user-input/user-input.model";
import { InvestmentResult } from "./investment-results/investment-result.model";

@Injectable({ providedIn: 'root' })
export class InvestmentService {
    results = signal<InvestmentResult[] | undefined>(undefined);

    calculateInvestment(input: UserInput) {
        let annualData = [];
        let investmentValue = input.initialInvestment;
        for (let i = 0; i < input.duration; i++) {
            const year = i + 1;
            const interestEarnedInYear = investmentValue * (input.expectedReturn / 100);
            investmentValue += interestEarnedInYear + input.annualInvestment;
            const totalInterest =
                investmentValue - input.annualInvestment * year - input.initialInvestment;
            annualData.push({
                year: year,
                interest: interestEarnedInYear,
                valueEndOfYear: investmentValue,
                annualInvestment: input.annualInvestment,
                totalInterest: totalInterest,
                totalAmountInvested: input.initialInvestment + input.annualInvestment * year,
            });
        }
        this.results.set(annualData);
    }
}