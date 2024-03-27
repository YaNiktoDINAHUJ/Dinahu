const vol = "1.3.1",
    lvl = "Basic",
    nameMod = "Hasel Online";

const defaultAdditionalScripts = [
    {
        name: "Old Info Card",
        id: "oldInfoCard",
        filePath: "additional-scripts/oldInfoCard.js",
        enabled: true,
        is_hidden: false,
    },
    {
        name: "About_Game",
        id: "aboutGame",
        filePath: "additional-scripts/aboutGame.js",
        enabled: true,
        is_hidden: true,
    },
    {
        name: "Hide_Chat",
        id: "hideChat",
        filePath: "additional-scripts/hideChat.js",
        enabled: true,
        is_hidden: true,
    },
    {
        name: "Rak-net-info",
        id: "raknet",
        filePath: "additional-scripts/rak-net-info.js",
        enabled: true,
        is_hidden: true,
    },
    {
        name: "radar-pos",
        id: "radar-pos",
        filePath: "additional-scripts/radar-position.js",
        enabled: true,
        is_hidden: true,
    },
];

// // Настройка радара
window.radarPosParams = {
    title: "Расположение радара", // название настройки в /mn
    items: [
        {
            callback() {
                jsLoader.socket.sendEvent("setRadarX|24.5", () => {});
                jsLoader.socket.sendEvent("setRadarY|104", () => {});
                document.body.classList.remove("radar-up");
                document.body.classList.add("radar-down");
            },
            value: "Радар снизу",
            id: "item-1",
        },
        {
            callback() {
                // колбек выполняется после выбора опции. Делай тут что хочешь
                jsLoader.socket.sendEvent("setRadarX|24.5", () => {});
                jsLoader.socket.sendEvent("setRadarY|390.9", () => {});
                document.body.classList.remove("radar-down");
                document.body.classList.add("radar-up");
            },
            value: "Радар сверху",
            id: "item-2",
        },
    ],
    defaultData: {
        selectedId: "item-2", // выбор по умолчанию
    },
};

// Отображение ид и онлайна
window.rakInfoParams = {
    playerId: {
        selector: ".ONEAS-server__id",
    },
    serverOnline: {
        selector: ".ONEAS-server__online",
        refreshTime: 100, // ms
    },
};

const oneasHud = {
    getScale() {
        const { clientWidth, clientHeight } = document.documentElement;
        return (clientWidth + clientHeight) / (1920 + 1080);
    },
    wantedAlwaysShowClass: "",
    paramsPercentage: {
        data: {
            isValuesShow: false,
        },
        _addInMenu() {
            jsLoader.mainMenu.addNewOption(1, "[Сборка] Числовое значение индикаторов хп / брони / еды", {
                initialVar: () => this.data.isValuesShow,
                callback: () => {
                    this.setPercentageStatus(!this.data.isValuesShow);
                },
            });
        },
        _saveData() {
            localStorage.setItem("ONEAS-HUD-percentage", +this.data.isValuesShow);

            jsLoader.log.makeLog("ONEAS", `[savedata percentage] Saved data, percentage -> ${this.data.isValuesShow}`);
        },
        _loadData() {
            if (localStorage.getItem("ONEAS-HUD-percentage") == null) {
                jsLoader.log.makeLog("ONEAS", `[loaddata percentage] First time load data, percentage -> ${this.data.isValuesShow}`);

                this.data.isValuesShow = false;

                this._saveData();
                return;
            }

            this.data.isValuesShow = +localStorage.getItem("ONEAS-HUD-percentage");

            jsLoader.log.makeLog("ONEAS", `[loaddata percentage] Data loaded, percentage -> ${this.data.isValuesShow}`);
        },
        getPercentageStatus() {
            return +this.data.isValuesShow;
        },
        setPercentageStatus(newStatus) {
            this.data.isValuesShow = +newStatus;

            this._saveData();
        },
        init() {
            this._loadData();
            this._addInMenu();
        },
    },
    hud: {
        data: {
            hudEl: null,
            hud_baseEl: null,
            radarBorderEl: null,
            moneyEl: null,
            hpEl: {
                value: null,
                progress: null,
            },
            armourEl: {
                wrapper: null,
                value: null,
                progress: null,
            },
            hungerEl: {
                value: null,
                progress: null,
            },
            breathEl: {
                wrapper: null,
                value: null,
            },
            freezeEl: {
                wrapper: null,
                value: null,
                progress: null,
            },
            wanted: {
                wrapper: null,
                els: [],
            },
            weaponEl: {
                ammoEl: null,
                ammoBgEl: null,
                icon: null,
                bgEl: null,
            },
            server: {
                wrapper: null,
                image: null,
            },
            bonusEl: null,
            greenZoneEl: null,
        },
        createHud(hudEl) {
            this.data.hudEl = hudEl;
            this.data.hud_baseEl = hudEl.querySelector(".ONEAS-hud-base");
            this.data.moneyEl = hudEl.querySelector("#ONEAS-cash__value");
            this.data.radarBorderEl = hudEl.querySelector(".ONEAS-hud__radar-border");
            [this.data.hpEl.progress, this.data.hpEl.value] = [hudEl.querySelector(".ONEAS-param__health .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__health .ONEAS-param__amount")];
            [this.data.armourEl.wrapper, this.data.armourEl.progress, this.data.armourEl.value] = [hudEl.querySelector(".ONEAS-param__armour"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-param__amount")];
            [this.data.hungerEl.progress, this.data.hungerEl.value] = [hudEl.querySelector(".ONEAS-param__hunger .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__hunger .ONEAS-param__amount")];
            [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector(".ONEAS-param__breath"), hudEl.querySelector(".ONEAS-param__breath .ONEAS-param__amount-2")];
            [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector(".ONEAS-hud__wanted"), hudEl.querySelector(".ONEAS-wanted__row").children];
            this.data.weaponEl.ammoEl = hudEl.querySelector(".ONEAS-weapon__ammo").children;
            this.data.weaponEl.ammoBgEl = hudEl.querySelector(".ONEAS-weapon__ammo");
            this.data.server.wrapper = hudEl.querySelector(".ONEAS-hud__logo");
            this.data.server.image = this.data.server.wrapper;
            this.data.bonusEl = hudEl.querySelector(".ONEAS-logo__bonus");
            this.data.greenZoneEl = hudEl.querySelector(".ONEAS-hud__green-zone");
            this.data.weaponEl.icon = hudEl.querySelector(".ONEAS-weapon__icon");
            this.data.weaponEl.bgEl = hudEl.querySelector(".ONEAS-weapon__icon-bg");
            [this.data.freezeEl.wrapper, this.data.freezeEl.value, this.data.freezeEl.progress] = [hudEl.querySelector(".ONEAS-param__freeze"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-param__amount"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-progress__value")];

            this.data.hud_baseEl.style.transform = `scale(${oneasHud.getScale()})`;
            this.data.greenZoneEl.style.transform = `scale(${oneasHud.getScale()})`;
            this.data.radarBorderEl.style.transform = `scale(${oneasHud.getScale()})`;
        },
        onInfoChange(prop, value) {
            if ((prop == "show" || prop == "showBars") && +value >= 1) {
                this.data.hudEl.style.display = "";

                this.data.hudEl.classList.toggle("show-values", oneasHud.paramsPercentage.getPercentageStatus());
            }

            if ((prop == "show" || prop == "showBars") && +value === 0) {
                this.data.hudEl.style.display = "none";
            }

            if (prop == "weapon") {
                this.data.weaponEl.icon.src = `images/weapon/${value}.png`;

                if (value > 0) this.data.weaponEl.bgEl.style.background = "linear-gradient(25.55deg,#fff -43.18%,#fff0 59.14%)";
                else this.data.weaponEl.bgEl.style.background = "linear-gradient(25.55deg,#f8e901 -43.18%,#fff0 59.14%)";
            }

            if (prop === "weapon" && value >= 16) {
                this.data.weaponEl.ammoEl[0].style.display = "";
                this.data.weaponEl.ammoEl[1].style.display = "";
                this.data.weaponEl.ammoBgEl.style.display = "";
            }

            if (prop === "weapon" && value < 16) {
                this.data.weaponEl.ammoEl[0].style.display = "none";
                this.data.weaponEl.ammoEl[1].style.display = "none";
                this.data.weaponEl.ammoBgEl.style.display = "none";
            }

            if (prop == "showGreenZoneTab") {
                this.data.greenZoneEl.style.display = "";
            }

            if (prop == "hideGreenZoneTab") {
                this.data.greenZoneEl.style.display = "none";
            }

            if (prop == "health") {
                this.data.hpEl.progress.style.width = `${value}%`;
                this.data.hpEl.value.innerText = value;
            }

            if (prop == "armour") {
                if (value > 0) this.data.armourEl.wrapper.style.opacity = "1";
                else this.data.armourEl.wrapper.style.opacity = "0";

                this.data.armourEl.progress.style.width = `${value}%`;
                this.data.armourEl.value.innerText = value;
            }

            if (prop == "hunger") {
                this.data.hungerEl.progress.style.width = `${value}%`;
                this.data.hungerEl.value.innerText = value;
            }

            if (prop == "breath") {
                if (value < 100) (this.data.breathEl.wrapper.style.display = ""), (document.querySelector(".ONEAS-weapon__icon").style.opacity = "0.5");
                else (this.data.breathEl.wrapper.style.display = "none"), (document.querySelector(".ONEAS-weapon__icon").style.opacity = "1");

                this.data.breathEl.value.innerText = value;
            }

            if (prop == "money") {
                this.data.moneyEl.innerHTML = value.toLocaleString("RU");
            }

            if (prop == "wanted") {
                if (value === 0 && oneasHud.wantedAlwaysShowClass.length === 0) {
                    this.data.wanted.wrapper.style.opacity = "0";
                    return;
                }

                this.data.wanted.wrapper.style.opacity = "1";

                for (let i = 0; i < 6; i += 1) {
                    if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
                        this.data.wanted.els[i].src = "images/hud/wanted_inactive.png";
                        this.data.wanted.els[i].className = "ONEAS-wanted__inactive";
                    } else {
                        this.data.wanted.els[i].src = "images/hud/wanted_active.png";
                        this.data.wanted.els[i].className = "ONEAS-wanted__active";
                    }
                }
            }

            if (prop == "ammoInClip") {
                this.data.weaponEl.ammoEl[0].innerText = value;
            }

            if (prop == "totalAmmo") {
                this.data.weaponEl.ammoEl[1].innerText = value;
            }

            if (prop == "setServer") {
                this.data.server.image.innerText = `${value}`;

                if (value > 0 && this.data.server.wrapper.style.display == "none") this.data.server.wrapper.style.display = "";

                if (value <= 0) this.data.server.wrapper.style.display = "none";
            }

            if (prop == "setBonus") {
                if (value <= 1) this.data.bonusEl.style.display = "none";
                else this.data.bonusEl.style.display = "";

                this.data.bonusEl.innerText = `x${value}`;
            }

            if (prop === "isShowFreeze" && value) {
              document.querySelector(".ONEAS-hud__info").style.top = "16px";
              this.data.freezeEl.wrapper.style.display = '';
            }
      
            if (prop === "isShowFreeze" && !value) {
              this.data.freezeEl.wrapper.style.display = 'none';
              document.querySelector(".ONEAS-hud__info").style.top = "3px";
            }

            if (prop == "freeze") {
                this.data.freezeEl.progress.style.width = `${value}%`;
                this.data.freezeEl.value.innerText = value;
            }
        },
        init() {
            const hudHtml = `
            <div class="ONEAS-hud-base">
                <div class="ONEAS-hud__info">
                  <div class="hud-mobile__info-server-data__data">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 16C18.4853 16 20.5 13.9853 20.5 11.5C20.5 9.01472 18.4853 7 16 7C13.5147 7 11.5 9.01472 11.5 11.5C11.5 13.9853 13.5147 16 16 16Z" fill="#F8F6ED"></path>
                        <path d="M16 16C13.6131 16 11.3239 16.9482 9.63604 18.636C7.94821 20.3239 7 22.6131 7 25H10.7456C11.0367 23.1583 11.6952 21.2636 12.7939 20C12.3202 21.06 11.8264 23.0047 12.1338 25L20.2432 25C20.5505 23.0047 20.0567 21.06 19.583 20C20.6818 21.2636 21.3403 23.1583 21.6314 25H25C25 22.6131 24.0518 20.3239 22.364 18.636C20.6761 16.9482 18.3869 16 16 16Z" fill="#F8F6ED"></path>
                        <path d="M5.9375 13C5.9375 14.7788 7.0804 16.2863 8.66089 16.8062C9.30183 16.2321 10.0036 15.739 10.7503 15.3335C9.9641 14.2588 9.5 12.9336 9.5 11.5C9.5 10.6148 9.67694 9.77098 9.99737 9.00189C9.95673 9.00063 9.91594 9 9.875 9C7.70037 9 5.9375 10.7909 5.9375 13Z" fill="#F8F6ED"></path>
                        <path d="M4.94757 25C4.9645 24.8912 4.98356 24.783 5.00477 24.6758C5.08725 21.876 6.23548 19.2082 8.22183 17.2218L8.27781 17.1662C6.78461 17.4804 5.40106 18.2312 4.30654 19.3432C2.82971 20.8434 2 22.8783 2 25H4.94757Z" fill="#F8F6ED"></path>
                        <path d="M22.0026 9.00189C22.0433 9.00063 22.0841 9 22.125 9C24.2996 9 26.0625 10.7909 26.0625 13C26.0625 14.7788 24.9196 16.2863 23.3391 16.8062C22.6982 16.2321 21.9964 15.739 21.2497 15.3335C22.0359 14.2588 22.5 12.9336 22.5 11.5C22.5 10.6148 22.3231 9.77098 22.0026 9.00189Z" fill="#F8F6ED"></path>
                        <path d="M27.6935 19.3432C26.5989 18.2312 25.2154 17.4804 23.7222 17.1662L23.7782 17.2218C25.7645 19.2082 26.9127 21.876 26.9952 24.6758C27.0164 24.783 27.0355 24.8912 27.0524 25H30C30 22.8783 29.1703 20.8434 27.6935 19.3432Z" fill="#F8F6ED"></path></svg>
                      <div class="text"><div class="value ONEAS-server__online">995</div> в сети </div>
                      <div class="text"><div class="value ONEAS-server__id">520</div> ID </div>
                  </div>
                  <svg class="ONEAS-info__line" width="284" height="34" viewBox="0 0 284 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M283.88 0.777344C261.142 5.30055 240.23 16.3942 223.734 32.6844L0.5 32.5" stroke="#F8F6ED" stroke-opacity="0.25" />
                  </svg>
                  <div class="ONEAS-hud__params">
                    <div class="ONEAS-param__armour ONEAS-param">
                      <span class="ONEAS-param__amount">100</span>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="ONEAS-param__icon">
                        <path d="M10.0571 0C9.0704 2.73767 7.77925 5.59819 6.40294 7.07776C8.67437 5.6427 12.3236 2.84888 14.2741 0H16C14.4122 2.41084 9.80034 8.36844 6.52474 10C9.01195 9.48383 13.0785 8.26413 15.9087 6.45981C15.2427 11.8167 12.4211 16.7195 8.03045 20C2.97515 16.2229 0 10.2952 0 4V0H10.0571Z" fill="white"></path>
                      </svg>
                      <div class="ONEAS-armour__progress">
                        <div class="ONEAS-param__progress">
                          <div class="ONEAS-progress__value"></div>
                        </div>
                        <svg class="ONEAS-param__progress-bg" width="253" height="18" viewBox="0 0 253 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M240.97 17H3L22.732 1H250.598C245.41 8.5 243.06 13 240.97 17Z" stroke="white" stroke-opacity="0.25" />
                          <path opacity="0.45" d="M239 13H15L24.5 5H244C241.12 8.75 239.968 11 239 13Z" fill="url(#paint0_linear_1235_143)" />
                          <defs>
                            <linearGradient id="paint0_linear_1235_143" x1="-56.9999" y1="5" x2="244" y2="5" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#0D73FD" />
                              <stop offset="1" stop-color="#69A9FF" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div class="ONEAS-param__health ONEAS-param">
                      <span class="ONEAS-param__amount">100</span>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="ONEAS-param__icon">
                        <path d="M6.75 0H11.25V18H6.75V0Z" fill="white"></path>
                        <path d="M18 6.75V11.25L0 11.25L1.96701e-07 6.75L18 6.75Z" fill="white"></path>
                      </svg>
                      <div class="ONEAS-health__progress">
                        <div class="ONEAS-param__progress">
                          <div class="ONEAS-progress__value"></div>
                        </div>
                        <svg class="ONEAS-param__progress-bg" width="264" height="33" viewBox="0 0 264 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M261.75 1H22.5L2 16.5L22.5 32H253.419C255.3 17.8 259.04 7.5 261.75 1Z" stroke="white" stroke-opacity="0.25" />
                          <path opacity="0.45" d="M257 5H23L8 16.5L23 28H250.939C252.759 17.4645 254.378 9.82258 257 5Z" fill="url(#paint0_linear_1235_146)" />
                          <defs>
                            <linearGradient id="paint0_linear_1235_146" x1="-64" y1="5" x2="257.5" y2="5" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#39C83F" />
                              <stop offset="1" stop-color="#68EA6A" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div class="ONEAS-param__hunger ONEAS-param">
                      <span class="ONEAS-param__amount">100</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="ONEAS-param__icon">
                        <path d="M17.1879 12.1727C13.9568 15.4037 9.2421 15.9276 6.65724 13.3428C4.07239 10.7579 4.59625 6.04317 7.82732 2.8121C11.0584 -0.41896 15.7731 -0.94282 18.358 1.64203C20.9428 4.22688 20.419 8.94162 17.1879 12.1727Z" fill="white"></path>
                        <path d="M3.93107 13.7288L2.82481 14.835C2.17857 14.1888 1.13088 14.1888 0.484669 14.835C-0.161543 15.4813 -0.16157 16.5289 0.48467 17.1752C1.13091 17.8214 2.1786 17.8214 2.82481 17.1752C2.1786 17.8214 2.17858 18.8691 2.82481 19.5153C3.47105 20.1616 4.51875 20.1615 5.16496 19.5153C5.81117 18.8691 5.8112 17.8214 5.16496 17.1752L7.78953 14.5506C6.3844 14.4769 5.05885 14.203 3.93107 13.7288Z" fill="white"></path>
                      </svg>
                      <div class="ONEAS-hunger__progress">
                        <div class="ONEAS-param__progress">
                          <div class="ONEAS-progress__value"></div>
                        </div>
                        <svg class="ONEAS-param__progress-bg" width="230" height="18" viewBox="0 0 230 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M228.75 1H2.5L21.5 17H228.75C228.75 17 228.5 12.5 228.5 9C228.5 5.5 228.75 1 228.75 1Z" stroke="white" stroke-opacity="0.25" />
                          <path opacity="0.45" d="M225 5H14.5L24 13H225C225 13 224.764 10.75 224.764 9C224.764 7.25 225 5 225 5Z" fill="url(#paint0_linear_1235_149)" />
                          <defs>
                            <linearGradient id="paint0_linear_1235_149" x1="-57.4999" y1="5" x2="224.999" y2="5" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#FEB102" />
                              <stop offset="1" stop-color="#FECA50" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div style="display: none" class="ONEAS-param__freeze ONEAS-param">
                      <span class="ONEAS-param__amount">100</span>
                      <svg class="ONEAS-param__icon" width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.38448 6.8748V4.83463M9.38448 1.39185V4.83463M9.38448 4.83463L11.5522 2.79446M9.38448 4.83463L7.2168 2.79446" stroke="white" stroke-width="1.85578" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.38448 13.1232V15.1634M9.38448 18.6062V15.1634M9.38448 15.1634L11.5522 17.2036M9.38448 15.1634L7.2168 17.2036" stroke="white" stroke-width="1.85578" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.966 8.74107L13.6791 7.63304M16.5699 5.76324L13.6791 7.63304M13.6791 7.63304L16.5694 8.34513M13.6791 7.63304L14.2149 4.70489" stroke="white" stroke-width="1.85578" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.9058 11.6644L13.6531 12.7176M16.6017 14.4949L13.6531 12.7176M13.6531 12.7176L14.2814 15.6273M13.6531 12.7176L16.5194 11.9143" stroke="white" stroke-width="1.85578" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.36601 8.74107L4.65295 7.63304M1.76217 5.76324L4.65295 7.63304M4.65295 7.63304L1.76262 8.34513M4.65295 7.63304L4.11718 4.70489" stroke="white" stroke-width="1.85578" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.42426 11.6644L4.67697 12.7176M1.72842 14.4949L4.67697 12.7176M4.67697 12.7176L4.04872 15.6273M4.67697 12.7176L1.81064 11.9143" stroke="white" stroke-width="1.85578" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.9355 8.5333L9.38531 7.00317L6.58008 8.5333V11.7211L9.38531 13.2512L11.9355 11.7211V8.5333Z" stroke="white" stroke-width="1.85578" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="ONEAS-freeze__progress">
                        <div class="ONEAS-param__progress">
                          <div class="ONEAS-progress__value"></div>
                        </div>
                        <svg class="ONEAS-param__progress-bg" width="210" height="18" viewBox="0 0 210 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M204.55 1H2.2832L19.631 17H207.85C207.85 17 206.621 12.3373 205.97 9.2C205.325 6.08757 204.55 1 204.55 1Z" stroke="white" stroke-opacity="0.25" />
                          <path opacity="0.45" d="M201.363 5H13L21.6078 13H203C203 13 202.39 10.6687 202.067 9.1C201.747 7.54378 201.363 5 201.363 5Z" fill="url(#paint0_linear_1787_129)" />
                          <defs>
                            <linearGradient id="paint0_linear_1787_129" x1="-51.181" y1="7" x2="200.64" y2="7" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#77C7D9" />
                              <stop offset="1" stop-color="#37BFDB" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="ONEAS-hud__cash">
                    <div id="ONEAS-cash__value">10000</div>
                  </div>
                  <div class="ONEAS-hud__wanted ${oneasHud.wantedAlwaysShowClass}">
                    <div class="ONEAS-wanted__row"><img src="images/hud/wanted_inactive.png" alt="" id="ONEAS-wanted-1" class="ONEAS-wanted__inactive"> <img src="images/hud/wanted_inactive.png" alt="" id="ONEAS-wanted-2" class="ONEAS-wanted__inactive"> <img src="images/hud/wanted_inactive.png" alt="" id="ONEAS-wanted-3" class="ONEAS-wanted__inactive"> <img src="images/hud/wanted_active.png" alt="" id="ONEAS-wanted-4" class="ONEAS-wanted__active"> <img src="images/hud/wanted_active.png" alt="" id="ONEAS-wanted-5" class="ONEAS-wanted__active"> <img src="images/hud/wanted_active.png" alt="" id="ONEAS-wanted-6" class="ONEAS-wanted__active"></div>
                  </div>
                </div>
                <div class="ONEAS-hud__weapon">
                  <div style="display: none" class="ONEAS-param__breath ONEAS-param">
                      <svg class="ONEAS-param__icon" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.91596 11.8319C9.18326 11.8319 11.8319 9.18326 11.8319 5.91596C11.8319 2.64867 9.18326 0 5.91596 0C2.64867 0 0 2.64867 0 5.91596C0 9.18326 2.64867 11.8319 5.91596 11.8319ZM4.19199 4.63441C4.87268 4.63441 5.42448 4.08261 5.42448 3.40192C5.42448 2.72123 4.87268 2.16943 4.19199 2.16943C3.5113 2.16943 2.9595 2.72123 2.9595 3.40192C2.9595 4.08261 3.5113 4.63441 4.19199 4.63441Z" fill="white"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.84366 18.9805C5.4228 18.9805 6.70295 17.7004 6.70295 16.1212C6.70295 14.5421 5.4228 13.262 3.84366 13.262C2.26452 13.262 0.984375 14.5421 0.984375 16.1212C0.984375 17.7004 2.26452 18.9805 3.84366 18.9805ZM3.05899 15.9812C3.38798 15.9812 3.65468 15.7145 3.65468 15.3856C3.65468 15.0566 3.38798 14.7899 3.05899 14.7899C2.73001 14.7899 2.46331 15.0566 2.46331 15.3856C2.46331 15.7145 2.73001 15.9812 3.05899 15.9812Z" fill="white"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5599 7.69182C12.7275 7.09624 12.8171 6.46802 12.8171 5.81888C12.8171 5.75603 12.8162 5.69337 12.8146 5.63092C12.9129 5.6244 13.0122 5.62109 13.1122 5.62109C15.5626 5.62109 17.5491 7.60759 17.5491 10.0581C17.5491 12.5085 15.5626 14.495 13.1122 14.495C11.3368 14.495 9.80499 13.4523 9.0957 11.9459C10.1106 11.418 10.9777 10.6454 11.619 9.70624C11.8451 9.98131 12.1879 10.1567 12.5717 10.1567C13.2524 10.1567 13.8042 9.60494 13.8042 8.92426C13.8042 8.24357 13.2524 7.69176 12.5717 7.69176C12.5678 7.69176 12.5639 7.69178 12.5599 7.69182Z" fill="white"></path>
                      </svg>
                      <span class="ONEAS-param__amount-2">100</span>
                  </div>
                  <img src="images/weapon/24.png" alt="" class="ONEAS-weapon__icon">
                  <span class="ONEAS-weapon__icon-bg"></span>
                  <div class="ONEAS-hud__logo"></div>
                  <div class="ONEAS-logo__bonus">
                    <div class="ONEAS-bonus__value">x2</div>
                  </div>
                  <div class="ONEAS-weapon__ammo"><span id="ONEAS-ammo__in-clip">15</span><span id="ONEAS-ammo__total">100</span></div>
                </div>
              </div>
              <div class="ONEAS-hud__green-zone"><img src="images/hud/zone.svg" alt="" class="ONEAS-green-zone__image"></div>
              <div class="ONEAS-hud__radar-border"><img src="images/hud/border.png" class="ONEAS-radar__images"></div>`;
            const hudEl = jsLoader.hudInfo.addNewHud(hudHtml, "ONEAS-hud", (prop, value) => void this.onInfoChange(prop, value));

            this.createHud(hudEl);

            interface("Hud").setBonus(interface("Hud").bonus);
            interface("Hud").setServer(interface("Hud").server);
            interface("Hud").info.health = interface("Hud").info.health;
            interface("Hud").info.armour = interface("Hud").info.armour;
            interface("Hud").info.hunger = interface("Hud").info.hunger;
            interface("Hud").info.ammoInClip = interface("Hud").info.ammoInClip;
            interface("Hud").info.totalAmmo = interface("Hud").info.totalAmmo;
            interface("Hud").info.money = interface("Hud").info.money;
            interface("Hud").info.wanted = 0;
            interface("Hud").info.weapon = interface("Hud").info.weapon;
            interface("Hud").info.show = 0;
            interface("Hud").hideGreenZoneTab();
        },
    },
    speedometer: {
        barsValues: {
            speed: {
                dashArray: 345,
                dashOffset: 345,
            },
            fuel: {
                dashArray: 171,
                dashOffset: 0,
            },
            wash: {
                dashArray: 103,
                dashOffset: 103,
            },
            damage: {
                dashArray: 103,
                dashOffset: 103,
            },
        },
        data: {
            speedometerEl: null,
            speed: {
                valueEl: null,
                barEl: null,
            },
            fuel: {
                //progress: null,
                valueEl: null,
                barEl: null,
                wrapperEl: null,
            },
            wash: {
                valueEl: null,
                barEl: null,
                wrapperEl: null,
            },
            damage: {
                valueEl: null,
                barEl: null,
            },
            tachometer: {
                wrapper: null,
                rpmEl: null,
                gearEl: null,
                //barEl: null,
            },
            mileageEl: null,
            turnsEls: [],
            paramsEls: [],
        },
        onChangeInfo(prop, value) {
            try {
                // if (prop === 'damage') {
                //       isNaN(value * 100) ? value = 0 : value;

                //      this.setDamage(+value);
                //  }

                if (prop === "wash") {
                    isNaN(value * 100) ? (value = 0) : value;

                    this.setWash(+value);
                }

                if (prop === "show" && +value == 1) {
                    this.show();
                }

                if (prop === "show" && +value == 0) {
                    this.hide();
                }

                if (prop === "speed") {
                    this.setSpeed(value);
                }

                if (prop === "mileage") {
                    this.setMileage(value);
                }

                if (prop === "fuel") {
                    this.setFuel(value);
                }

                // // turns
                //  if (prop == 'left') {
                //       this.data.turnsEls[0].classList.toggle('ONEAS-speedometer-turn--active', +value);
                //   }

                //   if (prop == 'right') {
                //        this.data.turnsEls[1].classList.toggle('ONEAS-speedometer-turn--active', +value);
                //   }

                // // params
                if (prop == "rem") {
                    this.data.paramsEls[2].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "doors") {
                    this.data.paramsEls[1].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "temperature") {
                    this.data.paramsEls[0].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "lights") {
                    this.data.paramsEls[3].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop === "tachometer-show") {
                    const display = +value >= 1 ? "" : "none";
        
                    this.data.tachometer.wrapper.style.display = display;

                    
                    if (value >= 1) (document.querySelector('.ONEAS-speedometer-params').style.height = '65%'), (document.querySelector('.ONEAS-speedometer-params').style.transform = 'scale(0.8)');
                    else (document.querySelector('.ONEAS-speedometer-params').style.height = '100%'), (document.querySelector('.ONEAS-speedometer-params').style.transform = 'scale(1)');

                }
                if (prop === "tachometer") {
                    this.setGear(value.gear);
                    this.setTachometer(value.rpm, value.maxRpm);
                }
            } catch (error) {
                console.error(error);
            }
        },
        show() {
            this.data.speedometerEl.style.bottom = "-2.2vh";
        },
        hide() {
            this.data.speedometerEl.style.bottom = "-700px";
        },
        setGear(value) {
          this.data.tachometer.gearEl.innerText = value;
        },
        setTachometer(rpm, maxRpm) {
            // если включен тахометр радмировский, то применять эффекты
              if (window.interface("Hud").speedometer.tachometer.show) {
                  this.data.tachometer.wrapper.classList.toggle("ONEAS-tachometer-glow", rpm / maxRpm > 0.5);
              } else {
                  this.data.tachometer.wrapper.classList.toggle("ONEAS-tachometer-glow", false);
              }
    
            if (rpm > maxRpm) rpm = maxRpm;
    
            this.data.tachometer.rpmEl.innerText = rpm;
    
            //this.data.tachometer.barEl.style.transform = `rotate(${(rpm / maxRpm) * (507 - 180) + 180}deg)`;
        },
        setMileage(km) {
            this.data.mileageEl.innerText = km;
        },
        setSpeed(speed) {
            const maxSpeed = interface("Hud").speedometer.maxSpeed;
            this.data.speed.valueEl.innerText = speed;

            if (speed > maxSpeed) speed = maxSpeed;

            const multiplier = this.barsValues.speed.dashArray - (speed / maxSpeed) * this.barsValues.speed.dashArray;

            this.data.speed.barEl.style.strokeDashoffset = multiplier;
        },
        setDamage(floatDamage) {},
        setWash(floatWash) {
            this.data.wash.wrapperEl.classList.toggle("ONEAS-speedometer-danger", floatWash >= 0.75);

            if (floatWash >= 0.75) document.querySelector(".ONEAS-danger-image-1").style.opacity = "1";
            else document.querySelector(".ONEAS-danger-image-1").style.opacity = "0";

            floatWash = 1 - floatWash;

            const multiplier = this.barsValues.wash.dashArray + floatWash * this.barsValues.wash.dashArray;

            this.data.wash.valueEl.innerText = Math.round(floatWash * 100);

            this.data.wash.barEl.style.strokeDashoffset = multiplier;
        },
        setFuel(fuel) {
            this.data.fuel.wrapperEl.classList.toggle("ONEAS-speedometer-danger", fuel <= 15);

            if (fuel <= 15) document.querySelector(".ONEAS-danger-image").style.opacity = "1";
            else document.querySelector(".ONEAS-danger-image").style.opacity = "0";

            const maxFuel = window.interface("Hud").speedometer.maxFuel;

            this.data.fuel.valueEl.innerText = fuel;

            if (interface("Hud").speedometer.isElectro) this.data.fuel.textEl.innerText = "%";
            else this.data.fuel.textEl.innerText = "л";

            if (fuel > maxFuel) fuel = maxFuel;

            const dashOffset = this.barsValues.fuel.dashArray - (fuel / maxFuel) * this.barsValues.fuel.dashArray;

            this.data.fuel.barEl.style.strokeDashoffset = dashOffset;
        },
        create(speedometerEl) {
            this.data.speedometerEl = speedometerEl;

            // SPEED
            this.data.speed.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-speed__value");
            this.data.speed.barEl = speedometerEl.querySelector(".ONEAS-speedometer-speed__bar");

            // FUEL
            this.data.fuel.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-fuel__value");
            this.data.fuel.barEl = speedometerEl.querySelector(".ONEAS-speedometer-fuel__bar");
            this.data.fuel.textEl = speedometerEl.querySelector(".ONEAS-speedometer-fuel__text");
            this.data.fuel.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__fuel");

            // WASH
            this.data.wash.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-wash__value");
            this.data.wash.barEl = speedometerEl.querySelector(".ONEAS-speedometer-wash__bar");
            this.data.wash.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__wash");

            // DAMAGE
            this.data.damage.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-damage__value");
            this.data.damage.barEl = speedometerEl.querySelector(".ONEAS-speedometer-damage__bar");

            // MILEAGE
            this.data.mileageEl = speedometerEl.querySelector(".ONEAS-speedometer-mileage__value");

            // PARAMS
            this.data.paramsEls = speedometerEl.querySelector(".ONEAS-speedometer-params").children;

            // TURNS
            //this.data.turnsEls = speedometerEl.querySelector('.ONEAS-speedometer__turns').children;

      // TACHOMETER
      //this.data.tachometer.bgEl = speedometerEl.querySelector('.ONEAS-speedometer-bg');
      //this.data.tachometer.barEl = speedometerEl.querySelector(".ONEAS-tachometer__arrow");
      this.data.tachometer.wrapper = speedometerEl.querySelector(".ONEAS-speedometer__tachometer");
      this.data.tachometer.gearEl = this.data.tachometer.wrapper.querySelector("#ONEAS-tachometer-gear .ONEAS-tachometer-value");
      this.data.tachometer.rpmEl = this.data.tachometer.wrapper.querySelector('#ONEAS-tachometer-rpm .ONEAS-tachometer-value');

            this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale()}) translateX(-50%)`;
        },
        init() {
            const text = `<img class="ONEAS-speedometer-bg" src="images/speed/speed_bg.png" alt="" srcset="">
            <div class="ONEAS-speedometer__speed">
              <svg class="ONEAS-speedometer-speed__bar" width="224" height="145" viewBox="0 0 224 145" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.59124 143.86C0.0542383 117.402 5.72031 90.8034 18.8203 67.6758C31.9203 44.5482 51.8196 26.0117 75.817 14.5827C99.8143 3.15373 126.747 -0.614185 152.96 3.79046C179.172 8.19511 203.395 20.559 222.338 39.2036" stroke="#F2EFDC" stroke-width="4" />
              </svg>
              <svg width="247" height="154" viewBox="0 0 247 154" fill="none" xmlns="http://www.w3.org/2000/svg" class="bg">
                <g filter="url(#filter0_d_2786_96)">
                  <path d="M243.779 45.535L244.133 45.8885L244.473 45.5483L244.146 45.1953L243.779 45.535ZM141.805 277.5C65.4204 277.5 3.5 215.714 3.5 139.5H2.5C2.5 216.269 64.8702 278.5 141.805 278.5V277.5ZM3.5 139.5C3.5 63.2857 65.4204 1.5 141.805 1.5V0.5C64.8702 0.5 2.5 62.7314 2.5 139.5H3.5ZM243.426 45.1814L232.647 55.9602L233.354 56.6673L244.133 45.8885L243.426 45.1814ZM141.805 1.5C181.975 1.5 218.144 18.5868 243.413 45.8747L244.146 45.1953C218.697 17.7113 182.265 0.5 141.805 0.5V1.5Z" fill="#F2EFDC" fill-opacity="0.25"></path>
                </g>
                <g filter="url(#filter1_d_2786_96)">
                  <path d="M141.556 268C70.5564 268 13 210.469 13 139.5C13 68.5314 70.5564 11 141.556 11C176.215 11 207.671 24.7098 230.791 47" stroke="#F2EFDC" stroke-opacity="0.7" stroke-width="2" stroke-dasharray="1 8"></path>
                </g>
                <defs>
                  <filter id="filter0_d_2786_96" x="0.5" y="0.5" width="245.973" height="282" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dy="2"></feOffset>
                    <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2786_96"></feBlend>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2786_96" result="shape"></feBlend>
                  </filter>
                  <filter id="filter1_d_2786_96" x="10" y="10" width="223.484" height="263" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dy="2"></feOffset>
                    <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2786_96"></feBlend>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2786_96" result="shape"></feBlend>
                  </filter>
                </defs>
              </svg>
              <div class="ONEAS-speedometer-speed__data"><span class="ONEAS-speedometer-speed__value">0</span><span class="ONEAS-speedometer-speed__text">км/ч</span></div>
            </div>
            <div class="ONEAS-speedometer__mileage"><span class="ONEAS-speedometer-mileage__value">000000</span></div>
            <div class="ONEAS-speedometer__turns">
              <div class="ONEAS-speedometer-turn__left"></div>
              <div class="ONEAS-speedometer-turn__right"></div>
            </div>
            <div class="ONEAS-speedometer__params">
                <div style="display: none" class="ONEAS-speedometer__tachometer">
                    <div id="ONEAS-tachometer-gear">
                         <div class="ONEAS-tachometer-text">Передача:</div>
                         <div class="ONEAS-tachometer-value">d4</div>
                    </div>
                    <div id="ONEAS-tachometer-rpm">
                         <div class="ONEAS-tachometer-text">Обороты двигателя:</div>
                         <div class="ONEAS-tachometer-value">1000</div>
                    </div>
                </div>
              <div class="ONEAS-speedometer-params">
                <div class="ONEAS-spedometer-param__key">
                  <svg width="38" height="13" viewBox="0 0 38 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="" style="width:38px">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.875 13C34.8101 13 38 10.0898 38 6.5C38 2.91022 34.8101 0 30.875 0C28.0914 0 25.6799 1.45669 24.5077 3.58008L24.5417 3.61111L23.75 6.86111L23.2019 3.61111H2.375L0 5.41667L3.5424 8.3246L5.54167 6.5L7.91667 8.66667H8.70833L10.2917 7.22222L11.875 8.66667H13.4583L15.0417 7.22222L16.625 8.66667H17.4167L19.7917 6.5L22.1667 8.66667H24.1551C25.1339 11.1913 27.7733 13 30.875 13ZM34.0417 7.94444C34.9161 7.94444 35.625 7.29774 35.625 6.5C35.625 5.70225 34.9161 5.05556 34.0417 5.05556C33.1672 5.05556 32.4583 5.70225 32.4583 6.5C32.4583 7.29774 33.1672 7.94444 34.0417 7.94444Z" fill="#F8F6ED"></path>
                  </svg>
                </div>
                <div class="ONEAS-spedometer-param__doors">
                  <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="" style="width:19px">
                    <path d="M7 5.07031C7.50705 1.68141 9.84258 -0.463552 12.9465 0.0855578C16.0262 0.630379 17.9604 2.21279 17.5 5.57028L15.7561 11.9648L12.981 11.7769L14.4889 6.14426L14.5 6.07028C14.7379 4.48018 14.2306 3.37592 12.5 3.06976C10.7694 2.7636 9.98231 3.96572 9.7444 5.55582L8.83418 9.31615L16.6829 11.9648L19 13.9804L4.63415 8.94136L1.39024 21.539L0 20.0273L3.2439 7.42965L6.15253 8.41119L7 5.07031Z" fill="#F8F6ED"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.39024 21.539L5.56098 9.94918L19 13.9804L15.7561 25.5703L1.39024 21.539ZM12.0488 17.5078C12.0488 18.621 11.2189 19.5234 10.1951 19.5234C9.17137 19.5234 8.34146 18.621 8.34146 17.5078C8.34146 16.3946 9.17137 15.4922 10.1951 15.4922C11.2189 15.4922 12.0488 16.3946 12.0488 17.5078Z" fill="#F8F6ED"></path>
                  </svg>
                </div>
                <div class="ONEAS-spedometer-param__rem">
                  <svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="" style="width:35px">
                    <path d="M11.7434 10.2143H13.8158L12.4342 11.6071L10.1316 12.0714L6.90789 14.3929L8.51974 11.6071L11.2829 11.1429L11.7434 10.2143Z" fill="white"></path>
                    <path d="M30.9402 0L35 7.34393L27.9681 11.5839L23.9083 4.24002L30.9402 0Z" fill="white"></path>
                    <path d="M5.62548 15.2641L11.0917 21.76L4.05984 26L0 18.6561L5.62548 15.2641Z" fill="white"></path>
                    <path d="M14.0637 10.176L18.1235 17.52L15.9596 17.8456L14.6076 19.64L11.0917 21.76L7.03185 14.4161L10.5478 12.296L12.7117 11.9704L14.0637 10.176Z" fill="white"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.3741 12.3183L22.6903 2.03684L15.6585 6.27686L22.1542 18.0271L29.1861 13.7871L28.3741 12.3183ZM28.3741 12.3183L22.7486 15.7103L17.8768 6.89764L22.0959 4.35363L28.3741 12.3183Z" fill="white"></path>
                    <path d="M24.4079 2.32143L23.0263 1.85714L24.4079 3.71429L30.8553 0L24.4079 2.32143Z" fill="white"></path>
                  </svg>
                </div>
                <div class="ONEAS-spedometer-param__lights">
                  <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="disabled" style="width:28px">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3409 0.0806263C9.82644 2.71501 7.70617 9.74003 11.3409 16.765C12.1561 16.8725 13.091 16.9521 14.0929 16.9843C12.4851 14.0246 10.6648 9.17071 11.9996 5.5C12.2988 8.63993 13.6711 14.8382 16.8385 16.9467C22.1648 16.6214 28.0007 14.718 28.0007 8.8619C28.0007 0.783128 16.8942 -0.358437 11.3409 0.0806263Z" fill="#F8F6ED"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.5796L8.15634 14.3903C7.99544 13.8279 7.86097 13.2695 7.75054 12.7165L0 14.7969V16.5796ZM0 13.1796L7.49998 11.1665C7.42664 10.5761 7.37921 9.99418 7.35454 9.42278L0 11.3969V13.1796ZM0 9.77965L7.3437 7.80844C7.36205 7.18561 7.40582 6.57898 7.47047 5.99167L0 7.9969V9.77965ZM0 6.37965L7.71931 4.30762C7.84365 3.63864 7.99254 3.00327 8.1576 2.40723L0 4.5969V6.37965Z" fill="#F8F6ED" fill-opacity="0.85"></path>
                  </svg>
                </div>
              </div>
              <svg width="561" height="109" viewBox="0 0 561 109" fill="none" xmlns="http://www.w3.org/2000/svg" class="bg">
                <path d="M112.585 0.893731V0.393731L112.377 0.393731L112.231 0.540177L112.585 0.893731ZM448.52 0.893555L448.874 0.540002L448.727 0.393555H448.52V0.893555ZM1.0059 113.18L112.938 1.24728L112.231 0.540177L0.29879 112.472L1.0059 113.18ZM112.585 1.39373L394.499 1.39356V0.393559L112.585 0.393731V1.39373ZM560.806 112.472L448.874 0.540002L448.167 1.24711L560.099 113.179L560.806 112.472ZM448.52 0.393555L389.999 0.393555V1.39355L448.52 1.39355V0.393555Z" fill="#F2EFDC" fill-opacity="0.25"></path>
              </svg>
            </div>
            <div class="ONEAS-speedometer__fuel">
              <svg class="ONEAS-speedometer-fuel__bar" width="162" height="41" viewBox="0 0 162 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.83999 38.633C22.5853 18.5965 49.3838 5.99676 78.0478 2.80272C106.712 -0.391318 135.627 6.00028 160.274 20.9787" stroke="#F2EFDC" stroke-width="4" />
              </svg>
              <svg class="ONEAS-speedometer-fuel__bg" width="185" height="129" viewBox="0 0 185 129" fill="none" xmlns="http://www.w3.org/2000/svg" class="bg">
                <path d="M13.9882 47C37.1087 24.7098 68.5643 11 103.223 11C127.678 11 150.538 17.8251 170 29.6737" stroke="#F2EFDC" stroke-opacity="0.7" stroke-width="2" stroke-dasharray="1 8"></path>
                <path d="M11.7787 56.3137L1 45.535C26.3589 18.149 62.6594 1 102.974 1C133.163 1 161.101 10.6164 183.88 26.9468L82.3265 128.5" stroke="#F2EFDC" stroke-opacity="0.25"></path>
              </svg>
              <div class="ONEAS-speedometer-fuel__data ONEAS-speedometer-data"><img src="images/speed/danger.png" class="ONEAS-danger-image">
                <div class="ONEAS-speedometer-fuel__icon">
                  <svg data-v-0c96a3a3="" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H12.9231V12.0001H13.4615C15.2458 12.0001 16.6923 13.3432 16.6923 15.0001C16.6923 15.5524 17.1745 16.0001 17.7692 16.0001C18.364 16.0001 18.8462 15.5524 18.8462 15.0001V6.41429L14.8539 2.70718L16.3769 1.29297L21 5.58586V15.0001C21 16.6569 19.5535 18.0001 17.7692 18.0001C15.9849 18.0001 14.5385 16.6569 14.5385 15.0001C14.5385 14.4478 14.0563 14.0001 13.4615 14.0001H12.9231V20H0V0ZM2.15385 2H10.7692V8H2.15385V2Z" fill="#F2EFDC"></path>
                  </svg>
                </div>
                <div class="ONEAS-speedometer-fuel__value">50</div>
                <div class="ONEAS-speedometer-fuel__text ONEAS-speedometer-data__text">%</div>
              </div>
            </div>
            <div class="ONEAS-speedometer__wash">
              <svg class="ONEAS-speedometer-wash__bar" width="36" height="98" viewBox="0 0 36 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.43122 1.96918C14.1599 14.63 22.9815 29.7 28.2792 46.1255C33.5769 62.5509 35.2227 79.9353 33.1017 97.0631" stroke="#F2EFDC" stroke-width="4" />
              </svg>
              <svg class="ONEAS-speedometer-wash__bg" width="143" height="111" viewBox="0 0 143 111" fill="none" xmlns="http://www.w3.org/2000/svg" class="bg">
                <path d="M3.2235 225C74.2229 225 131.779 167.469 131.779 96.5C131.779 64.9335 120.392 36.0256 101.5 13.6562" stroke="#F2EFDC" stroke-opacity="0.7" stroke-width="2" stroke-dasharray="1 8"></path>
                <path d="M103.258 0.742188L103.619 0.396045L103.265 0.0276685L102.904 0.388634L103.258 0.742188ZM2.97377 235.5C79.909 235.5 142.279 173.269 142.279 96.5002H141.279C141.279 172.714 79.3588 234.5 2.97377 234.5V235.5ZM142.279 96.5002C142.279 59.2153 127.566 25.3584 103.619 0.396045L102.897 1.08833C126.673 25.8721 141.279 59.4838 141.279 96.5002H142.279ZM0.853554 103.854L103.611 1.09574L102.904 0.388634L0.146446 103.147L0.853554 103.854Z" fill="#F2EFDC" fill-opacity="0.25"></path>
              </svg>
              <div class="ONEAS-speedometer-data"><img src="images/speed/danger.png" class="ONEAS-danger-image-1">
                <div class="ONEAS-speedometer-wash__icon">
                  <svg data-v-0c96a3a3="" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5963 11.5238L7.72656 0L0.85682 11.5238C-0.680424 14.1025 -0.111952 17.2433 2.2632 19.2941C5.28053 21.8993 10.1726 21.8994 13.1899 19.2941C15.5651 17.2433 16.1335 14.1025 14.5963 11.5238ZM6.18358 17.7398C6.90678 17.2732 6.77267 16.0401 5.88403 14.9854C4.99539 13.9307 3.68874 13.4539 2.96554 13.9205C2.24234 14.387 2.37645 15.6202 3.26508 16.6749C4.15372 17.7295 5.46037 18.2063 6.18358 17.7398Z" fill="#F2EFDC"></path>
                  </svg>
                </div>
                <div class="ONEAS-speedometer-wash__value">50</div>
                <div class="ONEAS-speedometer-wash__text ONEAS-speedometer-data__text">%</div>
              </div>
            </div>
            <div class="ONEAS-speedometer__damage">
              <svg class="ONEAS-speedometer-damage__bar" width="257" height="257" viewBox="0 0 257 257" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M255 128.5C255 145.112 251.728 161.562 245.371 176.909C239.014 192.257 229.696 206.202 217.949 217.949C206.202 229.696 192.257 239.014 176.909 245.371C161.562 251.728 145.112 255 128.5 255C111.888 255 95.4382 251.728 80.0905 245.371C64.7429 239.014 50.7976 229.696 39.051 217.949C27.3044 206.202 17.9865 192.257 11.6292 176.909C5.27202 161.562 2 145.112 2 128.5C2 111.888 5.27202 95.4382 11.6292 80.0905C17.9865 64.7428 27.3044 50.7976 39.051 39.051C50.7976 27.3044 64.7429 17.9865 80.0906 11.6292C95.4382 5.27201 111.888 2 128.5 2C145.112 2 161.562 5.27202 176.909 11.6292C192.257 17.9865 206.202 27.3044 217.949 39.051C229.696 50.7976 239.014 64.7429 245.371 80.0906C251.728 95.4383 255 111.888 255 128.5L255 128.5Z" stroke="#F2EFDC" stroke-width="4" />
              </svg>
              <div class="ONEAS-speedometer-damage__icon"></div>
              <div class="ONEAS-speedometer-damage__value"></div>
              <div class="ONEAS-speedometer-damage__text"></div>
            </div>`;
            const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, "ONEAS-speedometer", (prop, value) => this.onChangeInfo(prop, value));

            this.create(speedometerEl);

            interface("Hud").speedometer.show = 0;
        },
    },
    init() {
        this.paramsPercentage.init();

        this.hud.init();
        this.speedometer.init();
        jsLoader.showAddedScript(`HUD ${nameMod}`, "info");
    },
};

oneasHud.init();
