import {
  Component,
  AfterViewInit,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import { capability } from 'src/app/interfaces/capability';
import 'leaflet-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnChanges, OnInit {
  @Input() capability: capability;
  @Input() selectedLayers: string[];
  map;

  constructor() {}
  ngOnInit(): void {
    this.map = L.map('map', {
      center: [50.6311634, 3.0599573],
      zoom: 8,
    });
    var featureGroup = L.featureGroup().addTo(this.map);
    let drwControlToAdd = new L.Control.Draw({
      edit: {
        featureGroup: featureGroup,
      },
    });
    drwControlToAdd.addTo(this.map);
  }
  ngOnChanges(): void {
    if (this.capability != null) {
      this.createMap();
    }
  }
  createMap() {
    const url = this.capability.url;
    if (this.selectedLayers.length !== 0) {
      const selectedLayersNames = this.selectedLayers.join(',');
      L.tileLayer
        .wms(url, {
          layers: selectedLayersNames,
        })
        .addTo(this.map);
    } else {
      L.tileLayer
        .wms(url, {
          layers: this.capability.layers[0].name,
        })
        .addTo(this.map);
    }


  }
}
