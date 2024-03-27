(() => {
  "use strict";
  const e = JSON.parse('{"u2":"rak-net-info"}');
  function n(e) {
    (async function () {
      return new Promise((e, n) => {
        jsLoader.socket.sendEvent("getPlayerId", ({ data: r }) => {
          const [t, o] = r.split("|");
          "getPlayerId" === t ? e(+o) : n(new Error("Cannot get player id"));
        });
      });
    })()
      .then((n) => (e.textContent = n))
      .catch((e) => console.error(e));
  }
  !(function () {
    const r = document.querySelector(
        window.rakInfoParams.serverOnline.selector
      ),
      t = document.querySelector(window.rakInfoParams.playerId.selector);
    null !== r && null !== t
      ? (n(t),
        jsLoader.utils.openInterfaceOptions.addListenerToOpenInterface({
          callBack: () => {
            n(t);
          },
          notShow: !1,
          forInterface: "Authorization",
        }),
        setInterval(() => {
          requestAnimationFrame(() => {
            return (
              (e = r),
              void (async function () {
                return new Promise((e, n) => {
                  jsLoader.socket.sendEvent(
                    "getServerOnline",
                    ({ data: r }) => {
                      const [t, o] = r.split("|");
                      "getServerOnline" === t
                        ? e(+o)
                        : n(new Error("Cannot get server online"));
                    }
                  );
                });
              })()
                .then((n) => (e.textContent = n))
                .catch((e) => console.error(e))
            );
            var e;
          });
        }, window.rakInfoParams.serverOnline.refreshTime))
      : console.error(`[${e.u2}] Not all elements are accessable`);
  })();
})();
