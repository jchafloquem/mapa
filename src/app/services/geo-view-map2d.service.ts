import { ElementRef, Injectable } from '@angular/core';

import * as projection from '@arcgis/core/geometry/projection';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion.js';
import Legend from '@arcgis/core/widgets/Legend.js';

@Injectable({
  providedIn: 'root',
})
export class GeoViewMap2dService {
  public mapa = new Map({ basemap: 'topo-vector' });
  private viewMap!: MapView;

  //*Variables de la funcion Coordenadas
  public view: any = null;
  public gcsLongitude = '--';
  public gcsLatitude = '--';
  public utmZone = '--';
  public utmEast = '--';
  public utmNorth = '--';
  public scale = '--';
  public legend!: Legend;
  constructor() {}

  iniciarMapa(mapViewEl: ElementRef): Promise<MapView> {
    const container = mapViewEl.nativeElement;

    const viewMap = new MapView({
      container: container,
      map: this.mapa,
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

    //*Funcion para visualizar la escala del Mapa 1/2
    viewMap.watch('scale', (scale: any) => {
      this.scale = this.formatScale(scale);
    });
    //Funcion de coordenadas
    const ccoordenadas = new CoordinateConversion({
      view: viewMap,
    });
    viewMap.on('pointer-move', (event: { x: any; y: any }) => {
      const point = this.view.toMap({ x: event.x, y: event.y });
      this.updateCoordinates(point.latitude, point.longitude);
    });
    this.view = viewMap;
    //*Fin de la funcion para visualizar la escala del Mapa 1/2
    return viewMap.when();
  }
  updateCoordinates(lat: number, lon: number): void {
    this.gcsLongitude = lon.toFixed(5);
    this.gcsLatitude = lat.toFixed(5);
    // Calculate UTM Zone
    const zoneNumber = Math.floor((lon + 180) / 6) + 1;
    const utmBand = this.getUtmBand(lat);
    this.utmZone = `${zoneNumber} ${utmBand}`;
    // Convert to UTM
    const pointUTM = new Point({
      latitude: lat,
      longitude: lon,
      spatialReference: SpatialReference.WGS84,
    });
    const utmWkid = lat >= 0 ? 32600 + zoneNumber : 32700 + zoneNumber; // WKID for UTM zone
    const projected = projection.project(
      pointUTM,
      new SpatialReference({ wkid: utmWkid })
    ) as Point;
    const utmPoint = projected as Point;
    this.utmEast = `${utmPoint.x.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} m`;
    this.utmNorth = `${utmPoint.y.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} m`;
    // Calculate UTM Zone
  }
  getUtmBand(latitude: number): string {
    const bands = 'CDEFGHJKLMNPQRSTUVWX'; // Bands from 80S to 84N
    const index = Math.floor((latitude + 80) / 8);
    return bands.charAt(index);
  }
  //*Funcion para visualizar la escala del Mapa 2/2
  formatScale(scale: number): string {
    return scale.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  //*Fin de la funcion para visualizar la escala del Mapa 2/2

  getMapView(): MapView | null {
    return this.viewMap;
  }
  getdestroyMapView(): void {
    if (this.viewMap) {
      this.viewMap.destroy();
    }
  }
}
