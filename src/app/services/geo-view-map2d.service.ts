import { ElementRef, Injectable } from '@angular/core';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

@Injectable({
  providedIn: 'root',
})
export class GeoViewMap2dService {
  public map = new Map({ basemap: 'satellite' });
  private viewMap!: MapView;

  constructor() {}

  iniciarMapa(container: ElementRef): Promise<MapView> {
    const viewMap = new MapView({
      container: container.nativeElement,
      map: this.map,
      zoom: 6,
      center: [-76.015152, -9.189967],
      constraints: {
        maxZoom: 23,
        minZoom: 5,
        snapToZoom: false,
      },
      padding: { top: 0 },
      ui: { components: [] },
    });
    return viewMap.when(() => {
      //*Incluir servicios de capas
    });
  }

  getMapView(): MapView | null {
    return this.viewMap;
  }
  getdestroyMapView(): void {
    if (this.viewMap) {
      this.viewMap.destroy();
    }
  }
}
