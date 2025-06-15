import { Component, EventEmitter, inject, output, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserInput } from './user-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  investmentService = inject(InvestmentService);
  userInput = signal<UserInput>({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0
  });


  onSubmit() {
    this.investmentService.calculateInvestment(this.userInput());
    this.userInput.set({ initialInvestment: 0, annualInvestment: 0, expectedReturn: 0, duration: 0 });
  }

}
