import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  tiles = [
    {
      label: 'House Keeping',
      iconName: 'woman'
    },
    {
      label: 'Cooking',
      iconName: 'fast-food'
    },
    {
      label: 'Baby & Differently Abled care',
      iconName: 'egg'
    },
    {
      label: 'Elderly & Health Care',
      iconName: 'skull'
    },
    {
      label: 'Pet Grooming & Walking',
      iconName: 'walk'
    },
  ];

  constructor() {}

}
