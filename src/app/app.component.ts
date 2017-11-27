import { Component, OnInit } from '@angular/core';
import { AuthService } from './modulos/seguridad/servicios/auth.service';
declare var ion: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  segSupervisarSesion = 60 * 5 * 1000;
  constructor(private _authService: AuthService){}
  ngOnInit() {
    ion.sound({
      sounds: [
        {
          name: "button_tiny"
        },
        {
          name: "computer_error"
        },
        {
          name: "glass"
        },
        {
          name: "water_droplet"
        },
        {
          name: "snap"
        },
        {
          name: "branch_break"
        }
        // {
        //   name: "notify_sound",
        //   volume: 0.2
        // },
        // {
        //   name: "alert_sound",
        //   volume: 0.3,
        //   preload: false
        // }
      ],
      volume: 0.5,
      path: "assets/components/ion.sound/sounds/",
      preload: true
    });

    this.supervisarSesion();
  }

  private supervisarSesion() {
    console.log("Supervisar Sesión " + Date());
    this._authService.SupervisarSesion();
    const _me = this;
    setTimeout(function () {
      _me.supervisarSesion();
    }, _me.segSupervisarSesion);
  }
}
