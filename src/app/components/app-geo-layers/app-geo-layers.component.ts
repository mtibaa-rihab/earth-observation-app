import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { capability } from 'src/app/interfaces/capability';

@Component({
  selector: 'app-geo-layers',
  templateUrl: './app-geo-layers.component.html',
  styleUrls: ['./app-geo-layers.component.css'],
})
export class AppGeoLayersComponent implements OnInit {
  @Input() capability: capability;
  @Output() selectedLayers = new EventEmitter<string[]>();
  constructor() {}

  ngOnInit(): void {}
  selectLayer(name) {
    let selectedLayer = this.capability.layers.find((x) => x.name === name);
    selectedLayer.selected = !selectedLayer.selected;
    this.selectedLayers.emit(
      this.capability.layers.filter((x) => x.selected).map((x) => x.name)
    );
  }
}
