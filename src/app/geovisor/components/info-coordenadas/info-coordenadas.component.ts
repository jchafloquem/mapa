import { Component, inject } from '@angular/core';
import { GeoViewMap2dService } from '../../../services/geo-view-map2d.service';

@Component({
  selector: 'app-info-coordenadas',
  standalone: true,
  imports: [],
  templateUrl: './info-coordenadas.component.html',
  styleUrl: './info-coordenadas.component.scss'
})
export class InfoCoordenadasComponent {
  public _geoviewmap2d = inject(GeoViewMap2dService);
  constructor() {}

}
