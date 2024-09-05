import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatOptionModule,
    MatLabel
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() label: string = 'Select Option';
  @Input() options: { value: string; label: string }[] = [];
  @Input() showUserOption: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  public handleChange(event: string): void {
    this.valueChange.emit(event);
  }
}
