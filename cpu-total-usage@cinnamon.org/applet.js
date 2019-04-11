const Applet = imports.ui.applet;
const Util   = imports.misc.util;
const GLib   = imports.gi.GLib;
const St     = imports.gi.St;
const Mainloop = imports.mainloop;
const PopupMenu = imports.ui.popupMenu;
const Lang   = imports.lang;

function MyApplet(orientation, panel_height, instance_id) {
  this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
  __proto__: Applet.TextApplet.prototype,

  _init: function(orientation, panel_height, instance_id) {
    Applet.TextApplet.prototype._init.call(this, orientation, panel_height, instance_id );
    this.menuManager = new PopupMenu.PopupMenuManager(this);
    this.menu = new Applet.AppletPopupMenu(this, orientation);
    this.menuManager.addMenu( this.menu );

    this.autoupdate();
    this.set_applet_tooltip(_("Cpu Total Usage"));
  },
  autoupdate: function () {
    let timeoutSec = 3;
    let cmdDir = "/home/mint/Drive/my_utilities/applets/";
    let cmd = cmdDir + "read_file.sh /dev/shm/cpu_usage";
    let cmd2 = "cat <(" + cmdDir + "cpu_usage.sh) > /dev/shm/cpu_usage";
    let cmd3 = "/home/mint/Drive/my_utilities/utilities/procCpu.sh";

    let out = GLib.spawn_sync( null, [ "bash", "-c", cmd ], null, GLib.SpawnFlags.SEARCH_PATH, null );
    let out3 = GLib.spawn_sync( null, [ "bash", "-c", cmd3 ], null, GLib.SpawnFlags.SEARCH_PATH, null );

    GLib.spawn_async( null, [ "bash", "-c", cmd2 ], null, GLib.SpawnFlags.SEARCH_PATH, null );

    appletLabelText = out[0] ? out[1].toString() : _("");
    popupMenuText = out3[0] ? out3[1].toString() : _("");

    this.set_applet_label( "CPU:  " + appletLabelText.trimRight() );

    this.menu.removeAll();

    let item = new PopupMenu.PopupMenuItem(_(popupMenuText))
    item.connect("active", Lang.bind(this,this.menu.close));
    this.menu.addMenuItem( item );

    this.timeoutId = Mainloop.timeout_add( timeoutSec * 1000, Lang.bind( this, this.autoupdate ) );
  },
  on_applet_clicked: function (event) {
    this.menu.toggle();
  },
  on_applet_removed_from_panel: function() {
    if ( this.timeoutId ) {
      Mainloop.source_remove( this.timeoutId );
    }
  }
};

function main(metadata, orientation, panel_height, instance_id) {
  return new MyApplet(orientation, panel_height, instance_id);
}
