import { Component, OnInit } from '@angular/core';
import {
  Dog,
  ExampleUtility,
  VERY_IMPORTANT_INFO,
} from '@toranjas/albedo/namespace1';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    const util = new ExampleUtility();

    console.log('HomeComponent INIT', util.getHello());

    const spike: Dog = {
      name: 'Spike',
      tag: 'ES42332',
      breed: 'Labrador',
      dob: new Date(2012, 5, 23),
    };

    console.log(spike, VERY_IMPORTANT_INFO);
  }
}
