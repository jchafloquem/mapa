import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GeoViewMap2dService } from '../../../services/geo-view-map2d.service';
import { InfoCoordenadasComponent } from "../../components/info-coordenadas/info-coordenadas.component";

@Component({
  selector: 'app-map2d',
  standalone: true,
  imports: [InfoCoordenadasComponent],
  templateUrl: './map2d.component.html',
  styleUrl: './map2d.component.scss',
})
export default class Map2dComponent implements OnInit, OnDestroy {
  @ViewChild('mapView', { static: true }) private mapViewEl!: ElementRef;

  public _geoViewMap2dService = inject(GeoViewMap2dService);

  ngOnInit(): void {
    this._geoViewMap2dService.iniciarMapa(this.mapViewEl).then(() => {
      console.log('Mapa Cargado')
    })
  }

  ngOnDestroy(): void {
    if(this._geoViewMap2dService.mapa){
      this._geoViewMap2dService.mapa.destroy();
    }
  }
}
