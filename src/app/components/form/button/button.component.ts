import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public color: string = 'primary';

  @Output()
  public click: EventEmitter<void> = new EventEmitter<void>();

  public handleClick(): void {
    this.click.emit();
  }
}
