import { Component } from '@angular/core';
import { capabilitiesService as CapabilitiesService } from '../services/capabilities.service';
import { Observable } from 'rxjs';
import { capability } from '../interfaces/capability';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Challeng-Map-App';
  readonly capability$: Observable<capability>;
  selectedLayersUpdated: string[] = [];
  constructor(private readonly capabilitiesService: CapabilitiesService) {
    this.capability$ = this.capabilitiesService.get();
  }
  updateSelectedLayers(selectedLayersNames: string[]) {
    this.selectedLayersUpdated = selectedLayersNames;
  }
}
