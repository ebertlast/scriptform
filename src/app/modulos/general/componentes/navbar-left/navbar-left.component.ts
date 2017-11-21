import { Component, OnInit } from '@angular/core';
declare var ace: any;
@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.css']
})
export class NavbarLeftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    try { ace.settings.loadState('sidebar') } catch (e) { }
  }

}
