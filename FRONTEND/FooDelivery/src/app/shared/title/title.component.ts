import {booleanAttribute, Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-title',
  imports: [],
  template: `

    <span>
      {{ title }}
    </span>

  `,
  styles: ``
})
export class TitleComponent {

  @Input({ required: true }) title: string = '';
}
