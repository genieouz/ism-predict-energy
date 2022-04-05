import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly http: HttpClient) {}
  inprocess;
  result
  title = 'energy-predict-front';
  sample = {"Property_Size_F": 2328,
  "UsageType_F": 491,
  "BuildingType": 4,
  "PrimaryPropertyType": 12,
  "PropertyName": 1038,
  "LargestPropertyUseType": 28,
  "OSEBuildingID": 2232,
  "Latitude": 721,
  "Longitude": 2010,
  "YearBuilt": 88,
  "ENERGYSTARScore": 67,
  "SiteEnergyUse(kBtu)": 2907};
  keys = Object.keys(this.sample);

  ngOnInit(): void {
    this['data'] = {};
      this.keys.map(k => {
        this['data'][k] = "";
      });
  }

  change($event) {
    let value = $event.target.value;
    value = JSON.parse(value);
    this['data'] = value;
  }

  predict() {
    this.result = null;
    this.inprocess = true;
    this.http.post(environment.api_url, this['data']).subscribe(
      (data: any) => {
        this.inprocess = false;
        this.result = data.result;
      },
      (error) => {
        this.inprocess = false;
      }
    );
  }
  to_str(value) {
    return JSON.stringify(value);
  }
}
