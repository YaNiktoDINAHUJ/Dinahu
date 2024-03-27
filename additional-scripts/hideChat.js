const hideChat = {
  setHook() {
    App.components.Inventory.open = new Proxy(App.components.Inventory.open, {
      set: (target, props, value) => (
        "status" === props &&
          !0 === value &&
          (window.interface("Hud").setChatStatus(!1),
          (document.getElementsByClassName(
            "ONEAS-speedometer"
          )[0].style.opacity = "0")),
        "status" === props &&
          !1 === value &&
          (window.interface("Hud").setChatStatus(!0),
          (document.getElementsByClassName(
            "ONEAS-speedometer"
          )[0].style.opacity = "0")),
        Reflect.set(target, props, value)
      ),
    });
  },
  init() {
    this.setHook();
  },
};
hideChat.init();
