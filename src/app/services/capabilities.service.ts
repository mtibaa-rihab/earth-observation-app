import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { capability } from '../interfaces/capability';
import { Layer } from 'leaflet';
import { legende } from '../interfaces/legende';
import { layer } from '../interfaces/layer';

@Injectable()
export class capabilitiesService {
  constructor(private readonly http: HttpClient) {}

  private getCapabilitiesUrl() {
    return 'https://image.discomap.eea.europa.eu/arcgis/services/UrbanAtlas/UA_UrbanAtlas_2012/MapServer/WMSServer?service=WMS&request=GetCapabilities&version=1.3.0';
  }

  get(): Observable<capability> {
    const serviceUrl = this.getCapabilitiesUrl();
    return this.http.get(serviceUrl, { responseType: 'text' }).pipe(
      map((response) => this.mapResponseToCapabality(response)),
      catchError((httpError) => throwError(httpError))
    );
  }
  private mapResponseToCapabality(response: string): capability {
    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(response, 'application/xml');
    const getMapUrl = xmlDOM
      .getElementsByTagName('GetMap')[0]
      .getElementsByTagName('OnlineResource')[0]
      .getAttribute('xlink:href');
    const layers = xmlDOM
      .getElementsByTagName('Layer')[0]
      .getElementsByTagName('Layer');
    let capabilityLayers: layer[] = [];
    for (let index = 0; index < layers.length; index++) {
      const layer = layers[index];
      const layerName = layer.getElementsByTagName('Name')[0].textContent;
      const layerAbstract = layer.getElementsByTagName('Abstract')[0]
        .textContent;
      const layerLegend = layer.getElementsByTagName('LegendURL')[0];
      const legendWidth = layerLegend.getAttribute('width');
      const legendHeight = layerLegend.getAttribute('height');
      const legendURL = layerLegend
        .getElementsByTagName('OnlineResource')[0]
        .getAttribute('xlink:href');
      capabilityLayers.push({
        abstract: layerAbstract,
        name: layerName,
        selected: index == 0,
        legende: {
          height: legendHeight,
          width: legendWidth,
          url: legendURL,
        },
      });
    }
    const capability: capability = {
      layers: capabilityLayers,
      url: getMapUrl,
    };
    return capability;
  }
}
