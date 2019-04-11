const Applet = imports.ui.applet;
const Util   = imports.misc.util;
const GLib   = imports.gi.GLib;
const St     = imports.gi.St;
const Mainloop = imports.mainloop;
const Lang   = imports.lang;

function MyApplet(orientation, panel_height, instance_id) {
  this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
  __proto__: Applet.IconApplet.prototype,

  _init: function(orientation, panel_height, instance_id) {
    Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id );
    this.set_applet_icon_name("weather-clear-symbolic");
    this.set_applet_tooltip("Toggle Brightness");
  },

  on_applet_clicked: function () {
    let brightness = 10;
    let cmd = "echo 10 > /sys/class/backlight/intel_backlight/brightness";
    let cmd2 = "cat /sys/class/backlight/intel_backlight/brightness";

    let out = GLib.spawn_sync( null, [ "bash", "-c", cmd2 ], null, GLib.SpawnFlags.SEARCH_PATH, null );

    if ( out[1].toString() == "10\n" ) {
      cmd = "echo 138 > /sys/class/backlight/intel_backlight/brightness";
      this.set_applet_icon_name("weather-clear-symbolic");
    }
    else {
      this.set_applet_icon_name("weather-clear-night-symbolic");
    }

    GLib.spawn_async( null, [ "bash", "-c", cmd ], null, GLib.SpawnFlags.SEARCH_PATH, null );
  }
};

function main(metadata, orientation, panel_height, instance_id) {
  return new MyApplet(orientation, panel_height, instance_id);
}
