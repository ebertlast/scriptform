import { Directive, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare var $: any;
@Directive({
  selector: '[href]',
  host: {
    '(click)': 'doNothing($event)'
  }
})
export class MyLinkDirective {

  @Input() href: string;

  public doNothing(event) {
    if (environment.production) {
      if (this.href.length === 0 || this.href === '#') {
        if ($('#' + event.target.id).hasClass('dropdown-toggle')) {
          // if ($('#' + event.target.id + ' > ul').hasClass('nav-show')) {
          if ($('#' + event.target.id).parent().hasClass('open')) {
            // $('#' + event.target.id).parent().removeClass('open');
            // $('#' + event.target.id + ' > ul').removeClass('nav-hide').addClass('nav-show');
            // var initialHeight = $('#' + event.target.id).scrollHeight;
            $('#' + event.target.id)
              .css({
                // display: 'none',
                // overflow: '',
                // height: '',
                // 'transition-property': '',
                // 'transition-duration': ''
              })
              .removeClass('nav-show').addClass('nav-hide')
              .parent().removeClass('open');

          } else {
            // $('#' + event.target.id).parent().addClass('open');
            // $('#' + event.target.id + ' > ul').removeClass('nav-show').addClass('nav-hide');
            $('#' + event.target.id)
              .css({
                // height: 0,
                overflow: 'hidden',
                display: 'block'
              })
              .removeClass('nav-hide').addClass('nav-show')// only for window < @grid-float-breakpoint and .navbar-collapse.menu-min
              .parent().addClass('open');

          }
          // }
        }
        event.preventDefault();
      }
    } else {
      // console.log("Hola");
    }
  }









  constructor() { }


}
