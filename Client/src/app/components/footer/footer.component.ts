import { Component } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  readonly Dictionary = Dictionary;
}
