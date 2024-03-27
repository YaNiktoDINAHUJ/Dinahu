const OneasHudTime = {
  data: { updateTimeInterval: 1e3, $time: null, $date: null, intervalId: -1 },
  settings: {
    defaultData: {
      updateTimeInterval: 10,
      useServerTime: !0,
      dateSettings: OneasHudTimeParams.dateSettings,
      timeSettings: OneasHudTimeParams.timeSettings,
    },
    data: {},
    menuOptions: {
      ms: "[Время] Частота обновления времени",
      serverTime: "[Время] Показывать серверное время",
      timeSettings: {
        showTime: "[Время] Показывать время",
        showHours: "[Время] Показывать часы",
        showMinutes: "[Время] Показывать минуты",
        showSeconds: "[Время] Показывать секунды",
        showMs: "[Время] Показывать миллисекунды",
      },
      dateSettings: {
        showDate: "[Время] Показывать дату",
        format: "[Время] Формат даты",
        formats: [
          { id: "0", value: "ДД.ММ.ГГГГ" },
          { id: "1", value: "ДД.ММ.ГГ" },
          { id: "2", value: "ДД-ММ-ГГГГ" },
          { id: "3", value: "ДД/ММ/ГГ" },
        ],
      },
    },
    checkConfig(t, e) {
      let i = !1;
      for (let a in e) void 0 === t[a] && ((t[a] = e[a]), (i = !0));
      return i;
    },
    load() {
      const t = localStorage.getItem("oneas-hud-time-settings");
      if (!t) return (this.data = this.defaultData), void this.save();
      (this.data = JSON.parse(t)),
        this.checkConfig(this.data, this.defaultData) && this.save();
    },
    save() {
      localStorage.setItem(
        "oneas-hud-time-settings",
        JSON.stringify(this.data)
      );
    },
    addInMenu() {
      OneasHudTimeParams.timeSettings.showTime &&
        jsLoader.mainMenu.addNewOption(
          1,
          this.menuOptions.timeSettings.showTime,
          {
            initialVar: () => this.data.timeSettings.showTime,
            callback: () => {
              this.data.timeSettings.showTime =
                !this.data.timeSettings.showTime;
            },
          }
        ),
        OneasHudTimeParams.timeSettings.showMs &&
          (jsLoader.mainMenu.addNewOption(0, this.menuOptions.ms, {
            value: () => this.data.updateTimeInterval,
            min: 1,
            max: 100,
            step: 1,
            rangeText: "мс",
            callback: (t) => {
              (this.data.updateTimeInterval = +t),
                (OneasHudTime.data.updateTimeInterval = +t);
            },
          }),
          jsLoader.mainMenu.addNewOption(
            1,
            this.menuOptions.timeSettings.showMs,
            {
              initialVar: () => this.data.timeSettings.showMs,
              callback: () => {
                this.data.timeSettings.showMs = !this.data.timeSettings.showMs;
              },
            }
          )),
        OneasHudTimeParams.timeSettings.showHours &&
          jsLoader.mainMenu.addNewOption(
            1,
            this.menuOptions.timeSettings.showHours,
            {
              initialVar: () => this.data.timeSettings.showHours,
              callback: () => {
                this.data.timeSettings.showHours =
                  !this.data.timeSettings.showHours;
              },
            }
          ),
        OneasHudTimeParams.timeSettings.showMinutes &&
          jsLoader.mainMenu.addNewOption(
            1,
            this.menuOptions.timeSettings.showMinutes,
            {
              initialVar: () => this.data.timeSettings.showMinutes,
              callback: () => {
                this.data.timeSettings.showMinutes =
                  !this.data.timeSettings.showMinutes;
              },
            }
          ),
        OneasHudTimeParams.timeSettings.showSeconds &&
          jsLoader.mainMenu.addNewOption(
            1,
            this.menuOptions.timeSettings.showSeconds,
            {
              initialVar: () => this.data.timeSettings.showSeconds,
              callback: () => {
                this.data.timeSettings.showSeconds =
                  !this.data.timeSettings.showSeconds;
              },
            }
          ),
        OneasHudTimeParams.dateSettings.showDate &&
          (jsLoader.mainMenu.addNewOption(
            3,
            this.menuOptions.dateSettings.format,
            {
              data: this.menuOptions.dateSettings.formats,
              selectedId: this.data.dateSettings.format,
              callback: (t) => {
                this.data.dateSettings.format = t.id;
              },
            }
          ),
          jsLoader.mainMenu.addNewOption(
            1,
            this.menuOptions.dateSettings.showDate,
            {
              initialVar: () => this.data.dateSettings.showDate,
              callback: () => {
                this.data.dateSettings.showDate =
                  !this.data.dateSettings.showDate;
              },
            }
          )),
        jsLoader.mainMenu.addNewOption(1, this.menuOptions.serverTime, {
          initialVar: () => this.data.useServerTime,
          callback: () => {
            this.data.useServerTime = !this.data.useServerTime;
          },
        }),
        (window.onMainMenuClose = () => {
          this.data.timeSettings.showMs && this.data.timeSettings.showTime
            ? (OneasHudTime.data.updateTimeInterval =
                this.data.updateTimeInterval)
            : (OneasHudTime.data.updateTimeInterval = 1e3),
            this.save(),
            OneasHudTime.startRefreshTime();
        });
    },
  },
  updateTime(t) {
    this.data.$time.style.display =
      this.settings.data.timeSettings.showTime &&
      OneasHudTimeParams.timeSettings.showTime
        ? ""
        : "none";
    let e = [],
      [i, a, s] = t.toLocaleTimeString("RU-ru").split(":");
    const n =
      "" +
      (OneasHudTimeParams.timeSettings.showMs &&
      this.settings.data.timeSettings.showMs
        ? "." + t.getMilliseconds()
        : "");
    OneasHudTime.settings.data.useServerTime &&
      ([i, a, s] = t
        .toLocaleTimeString("RU-ru", { timeZone: "Europe/Moscow" })
        .split(":")),
      OneasHudTimeParams.timeSettings.showHours &&
        this.settings.data.timeSettings.showHours &&
        e.push(i),
      OneasHudTimeParams.timeSettings.showMinutes &&
        this.settings.data.timeSettings.showMinutes &&
        e.push(a),
      OneasHudTimeParams.timeSettings.showSeconds &&
        this.settings.data.timeSettings.showSeconds &&
        e.push(s),
      (this.data.$time.textContent = e.join(":") + n);
  },
  updateDate(t) {
    this.data.$date.style.display =
      this.settings.data.dateSettings.showDate &&
      OneasHudTimeParams.dateSettings.showDate
        ? ""
        : "none";
    let e = {},
      i = "";
    switch (this.settings.data.dateSettings.format) {
      case "0":
        (e = { year: "numeric", month: "2-digit", day: "2-digit" }), (i = ".");
        break;
      case "1":
        (e = { year: "2-digit", month: "2-digit", day: "2-digit" }), (i = ".");
        break;
      case "2":
        (e = { year: "numeric", month: "2-digit", day: "2-digit" }), (i = "-");
        break;
      case "3":
        (e = { year: "2-digit", month: "2-digit", day: "2-digit" }), (i = "/");
    }
    OneasHudTime.settings.data.useServerTime && (e.timeZone = "Europe/Moscow");
    const a = new Intl.DateTimeFormat("RU-ru", e).format(t).split(".").join(i);
    this.data.$date.textContent = a;
  },
  startRefreshTime() {
    -1 !== this.data.intervalId && clearInterval(this.data.intervalId);
    let t = new Date();
    this.updateDate(t),
      this.updateTime(t),
      (this.data.intervalId = setInterval(() => {
        (t = new Date()), this.updateDate(t), this.updateTime(t);
      }, this.data.updateTimeInterval));
  },
  init() {
    this.settings.load(),
      this.settings.addInMenu(),
      OneasHudTimeParams.timeSettings.showMs &&
        this.settings.data.timeSettings.showMs &&
        (this.data.updateTimeInterval = this.settings.data.updateTimeInterval),
      (this.data.$date = document.querySelector(
        OneasHudTimeParams.dateSelector
      )),
      (this.data.$time = document.querySelector(
        OneasHudTimeParams.timeSelector
      ));
    const t = document.querySelector(OneasHudTimeParams.wrapperSelector);
    this.data.$date &&
      this.data.$time &&
      t &&
      ((t.style.display = "flex"), this.startRefreshTime());
  },
};
OneasHudTime.init();
