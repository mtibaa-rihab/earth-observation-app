import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './container/app.component';
import {MapComponent} from './components/map/map.component';
import { AppGeoLayersComponent } from './components/app-geo-layers/app-geo-layers.component'
import { capabilitiesService } from './services/capabilities.service';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AppGeoLayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [capabilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
