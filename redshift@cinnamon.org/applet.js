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
    this.set_applet_icon_name("software-update-available-symbolic");
    this.set_applet_tooltip("Toggle Red Shift");
  },

  on_applet_clicked: function () {
    let cmd = "cat /dev/shm/redshift";
    let cmd2 = "cat /dev/shm/redshift";
    let redshiftOn = "redshift -ov -l 36:-119 -t 5700:3600 -m vidmode";
    let redshiftOff = "redshift -x"

    let out = GLib.spawn_sync( null, [ "bash", "-c", cmd2 ], null, GLib.SpawnFlags.SEARCH_PATH, null );

    if ( out[1].toString() == "1\n" ) {
      this.set_applet_icon_name("software-update-available-symbolic");
      GLib.spawn_async( null, [ "bash", "-c", redshiftOff ], null, GLib.SpawnFlags.SEARCH_PATH, null );
      GLib.spawn_async( null, [ "bash", "-c", "echo 0 > /dev/shm/redshift" ], null, GLib.SpawnFlags.SEARCH_PATH, null );
    }
    else {
      this.set_applet_icon_name("software-update-urgent-symbolic");
      GLib.spawn_async( null, [ "bash", "-c", redshiftOn ], null, GLib.SpawnFlags.SEARCH_PATH, null );
      GLib.spawn_async( null, [ "bash", "-c", "echo 1 > /dev/shm/redshift" ], null, GLib.SpawnFlags.SEARCH_PATH, null );
    }
  }
};

function main(metadata, orientation, panel_height, instance_id) {
  return new MyApplet(orientation, panel_height, instance_id);
}
