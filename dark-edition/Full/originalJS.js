const vol = "1.0",
    lvl = "Full",
    nameMod = "Dark Edition";

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
];

const oneasHud = {
    getScale() {
        const { clientWidth, clientHeight } = document.documentElement;
        return (clientWidth + clientHeight) / (1920 + 1080);
    },
    hud: {
        data: {
            hudEl: null,
            hud_topEl: null,
            hud_bottomEl: null,
            moneyEl: null,
            hpEl: {
                value: null,
                progress: null,
            },
            armourEl: {
                value: null,
                wrapper: null,
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
            },
            wanted: {
                wrapper: null,
                els: [],
            },
            weaponEl: {
                ammoEl: null,
                icon: null,
            },
            server: {
                wrapper: null,
                image: null,
                value: null,
            },
            bonusEl: null,
            greenZoneEl: null,
        },
        createHud(hudEl) {
            this.data.hudEl = hudEl;
            this.data.hud_topEl = hudEl.querySelector(".ONEAS-hud__top");
            this.data.hud_bottomEl = hudEl.querySelector(".ONEAS-hud__bottom");
            this.data.moneyEl = hudEl.querySelector("#ONEAS-cash__value");
            [this.data.hpEl.progress, this.data.hpEl.value] = [hudEl.querySelector('.ONEAS-param__health .ONEAS-progress__value'), hudEl.querySelector('.ONEAS-param__health .ONEAS-param__amount')];
            [this.data.armourEl.wrapper, this.data.armourEl.value] = [hudEl.querySelector(".ONEAS-param__armour"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-param__amount")];
            [this.data.hungerEl.progress, this.data.hungerEl.value] = [hudEl.querySelector('.ONEAS-param__hunger .ONEAS-progress__value'), hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__amount')];
            [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector(".ONEAS-param__breath"), hudEl.querySelector(".ONEAS-param__breath .ONEAS-param__amount")];
            [this.data.freezeEl.wrapper, this.data.freezeEl.value] = [hudEl.querySelector(".ONEAS-param__freeze"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-param__amount")];
            [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector(".ONEAS-wanted"), hudEl.querySelector(".ONEAS-wanted__row").children];
            this.data.weaponEl.ammoEl = hudEl.querySelector(".ONEAS-weapon__ammo").children;
            this.data.server.wrapper = hudEl.querySelector(".ONEAS-logo");
            this.data.server.value = hudEl.querySelector("#logo-t1");
            //this.data.server.image = this.data.server.wrapper.children[0];
            this.data.bonusEl = hudEl.querySelector(".ONEAS-logo__bonus");
            this.data.greenZoneEl = hudEl.querySelector(".ONEAS-green-zone");
            this.data.weaponEl.icon = hudEl.querySelector(".ONEAS-weapon__icon");
            
            this.data.hud_topEl.style.transform = `scale(${oneasHud.getScale()})`;
            this.data.hud_bottomEl.style.transform = `scale(${oneasHud.getScale()})`;
        },
        onInfoChange(prop, value) {
            if ((prop == "show" || prop == "showBars") && +value >= 1) {
                this.data.hudEl.style.display = "";
            }

            if ((prop == "show" || prop == "showBars") && +value === 0) {
                this.data.hudEl.style.display = "none";
            }

            if (prop == "weapon") {
                this.data.weaponEl.icon.src = `images/weapon/${value}.png`;
            }

            if (prop === "weapon" && value >= 16) {
                this.data.weaponEl.ammoEl[0].style.display = "";
                this.data.weaponEl.ammoEl[1].style.display = "";
            }

            if (prop === "weapon" && value < 16) {
                this.data.weaponEl.ammoEl[0].style.display = "none";
                this.data.weaponEl.ammoEl[1].style.display = "none";
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
                if (value > 0) this.data.armourEl.wrapper.style.display = "";
                else this.data.armourEl.wrapper.style.display = "none";

                this.data.armourEl.value.innerText = value;
            }

            if (prop == "hunger") {
                this.data.hungerEl.progress.style.width = `${value}%`;
                this.data.hungerEl.value.innerText = value;
            }

            if (prop == "breath") {
                if (value < 100) this.data.breathEl.wrapper.style.display = "";
                else this.data.breathEl.wrapper.style.display = "none";

                this.data.breathEl.value.innerText = value;
            }

            if (prop == "money") {
                this.data.moneyEl.innerHTML = value.toLocaleString("DE");
            }

            if (prop == "wanted") {
                this.data.wanted.wrapper.style.display = "";

                for (let i = 0; i < 6; i += 1) {
                    if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
                        this.data.wanted.els[i].src = "images/hud/inactive.png";
                        this.data.wanted.els[i].className = "ONEAS-wanted__inactive";
                    } else {
                        this.data.wanted.els[i].src = "images/hud/active.png";
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
                const numLength = 2;
                const num = value;
                const zero = "0".repeat(numLength - num.toString().length);

                // this.data.server.image.src = `images/logo/${value}.png`;
                this.data.server.value.innerText = `${zero}${num}`;

                if (value > 0 && this.data.server.wrapper.style.display == "none") this.data.server.wrapper.style.display = "";

                if (value <= 0) this.data.server.wrapper.style.display = "none";
            }

            if (prop == "setBonus") {
                if (value <= 1) this.data.bonusEl.style.opacity = "0";
                else this.data.bonusEl.style.opacity = "1";

                this.data.bonusEl.src = `images/hud/bonus-${value}.png`;
            }

            if (prop === "isShowFreeze" && value) {
              this.data.freezeEl.wrapper.style.display = '';
            }
      
            if (prop === "isShowFreeze" && !value) {
              this.data.freezeEl.wrapper.style.display = 'none';
            }

            if (prop == "freeze") {
                this.data.freezeEl.value.innerText = value;
            }
        },
        init() {
            const hudHtml = `
            <div class="ONEAS-hud__top">
                <div class="ONEAS-hud__elements">
                    <div class="ONEAS-params">
                        <div class="ONEAS-param__health ONEAS-param">
                            <img class="ONEAS-param__icon" src="images/hud/health.png" style="
                            width: 25px;
                            margin-left: 5px;
                            margin-top: 7px;
                        ">
                            <div class="ONEAS-param__progress">
                                <div class="ONEAS-progress__value" style="width: 50%;"></div>
                            </div><span class="ONEAS-param__amount">50</span>
                        </div>
                        <div class="ONEAS-param__hunger ONEAS-param">
                            <img class="ONEAS-param__icon" src="images/hud/hunger.png" style="
                            width: 25px;
                            margin-left: 5px;
                            margin-top: 3px;
                        ">
                            <div class="ONEAS-param__progress">
                                <div class="ONEAS-progress__value" style="width: 50%;"></div>
                            </div><span class="ONEAS-param__amount">50</span>
                        </div>
                    </div>
                    <div class="ONEAS-cash">
                        <span id="ONEAS-cash__text">$</span>
                        <span id="ONEAS-cash__value">999.999.999</span>
                    </div>
                    <div class="ONEAS-wanted ${oneasHud.wantedAlwaysShowClass}">
                        <div class="ONEAS-wanted__row">
                            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.png">
                            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.png">
                            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.png">
                            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.png">
                            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.png">
                            <img class="ONEAS-wanted__active" alt="" src="images/hud/active.png">
                        </div>
                    </div>
                </div>
                <div class="ONEAS-hud__elements-2">
                    <div class="ONEAS-weapon">
                        <img class="ONEAS-weapon__icon" src="images/weapon/24.png">
                        <div class="ONEAS-weapon__ammo">
                            <span id="ONEAS-ammo__in-clip">10</span>
                            <span id="ONEAS-ammo__total">100</span>
                        </div>
                    </div>
                    <div class="ONEAS-logo">
                        <div class="ONEAS-logo__text">
                            <span id="logo-t1">12</span>
                            <span id="logo-t2">СЕРВЕР</span>
                        </div>
                        <img class="ONEAS-logo__bonus" src="images/hud/bonus-3.png">
                    </div>
                </div>
                <div class="ONEAS-hud__elements-3">
                    <div class="ONEAS-params-2">
                        <div style="display: none" class="ONEAS-param__armour ONEAS-param">
                            <img class="ONEAS-param__icon" src="images/hud/armour.png">
                            <span class="ONEAS-param__amount">50</span>
                        </div>
                        <div style="display: none" class="ONEAS-param__breath ONEAS-param">
                            <img class="ONEAS-param__icon" src="images/hud/breath.png">
                            <span class="ONEAS-param__amount">50</span>
                        </div>
                        <div style="display: none" class="ONEAS-param__freeze ONEAS-param">
                            <img class="ONEAS-param__icon" src="images/hud/freeze.png">
                            <span class="ONEAS-param__amount">50</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ONEAS-hud__bottom">
                <div class="ONEAS-radar-border">
                    <img class="ONEAS-radar__images" src="images/hud/radar.png">
                </div>
                <div class="ONEAS-green-zone">
                    <img class="ONEAS-green-zone__image" src="images/hud/green_zone.png">
                </div>
            </div>`;
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
            },
            fuel: {
                valueEl: null,
                wrapperEl: null,
            },
            wash: {
                valueEl: null,
                wrapperEl: null,
            },
            tachometer: {
                wrapper: null,
                rpmEl: null,
                gearEl: null,
            },
            mileageEl: null,
            turnsEls: [],
            paramsEls: [],
        },
        onChangeInfo(prop, value) {
            try {
                //if (prop === "damage") {
                //    isNaN(value * 100) ? (value = 0) : value;

                //    this.setDamage(+value);
                //}

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
                if (prop == "left") {
                    this.data.turnsEls[0].classList.toggle("ONEAS-speedometer-turn--active", +value);
                }

                if (prop == "right") {
                    this.data.turnsEls[1].classList.toggle("ONEAS-speedometer-turn--active", +value);
                }

                // // params
                if (prop == "rem") {
                    this.data.paramsEls[1].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "doors") {
                    this.data.paramsEls[3].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "temperature") {
                    this.data.paramsEls[0].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "lights") {
                    this.data.paramsEls[2].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop === "tachometer-show") {
                    const display = +value >= 1 ? "" : "none";
        
                    this.data.tachometer.wrapper.style.display = display;
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
            this.data.speedometerEl.style.display = "flex";
        },
        hide() {
            this.data.speedometerEl.style.display = "none";
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

        },
        setWash(floatWash) {
            this.data.wash.wrapperEl.classList.toggle("ONEAS-speedometer-danger", floatWash >= 0.75);

            this.data.wash.valueEl.innerText = Math.floor(floatWash * 100);
        },
        setFuel(fuel) {
            this.data.fuel.wrapperEl.classList.toggle("ONEAS-speedometer-danger", fuel <= 15);

            const maxFuel = window.interface("Hud").speedometer.maxFuel;

            this.data.fuel.valueEl.innerText = fuel;

            if (interface("Hud").speedometer.isElectro) this.data.fuel.textEl.innerText = "%";
            else this.data.fuel.textEl.innerText = "л";

            if (fuel > maxFuel) fuel = maxFuel;
        },
        create(speedometerEl) {
            this.data.speedometerEl = speedometerEl;

            // SPEED
            this.data.speed.valueEl = speedometerEl.querySelector(".ONEAS-speed__value");

            // FUEL
            this.data.fuel.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__fuel");
            this.data.fuel.valueEl = speedometerEl.querySelector(".ONEAS-fuel__value");
            this.data.fuel.textEl = speedometerEl.querySelector(".ONEAS-fuel__text");

            // WASH
            this.data.wash.valueEl = speedometerEl.querySelector(".ONEAS-wash__value");
            this.data.wash.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__wash");

            // MILEAGE
            this.data.mileageEl = speedometerEl.querySelector(".ONEAS-mileage__value");

            // PARAMS
            this.data.paramsEls = speedometerEl.querySelector(".ONEAS-speedometer__params").children;

            // TURNS
            this.data.turnsEls = speedometerEl.querySelector(".ONEAS-speedometer__turns").children;

            // TACHOMETER
            //this.data.tachometer.bgEl = speedometerEl.querySelector('.ONEAS-speedometer-bg');
            //this.data.tachometer.barEl = speedometerEl.querySelector(".ONEAS-tachometer__arrow");
            this.data.tachometer.wrapper = speedometerEl.querySelector(".ONEAS-speedometer__tachometer");
            this.data.tachometer.gearEl = this.data.tachometer.wrapper.querySelector("#ONEAS-tachometer-gear");
            this.data.tachometer.rpmEl = this.data.tachometer.wrapper.querySelector('#ONEAS-tachometer-rpm');
      

            this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale()})`;
        },
        init() {
            const text = `
            <div style="display: none" class="ONEAS-speedometer__tachometer">
                <div id="ONEAS-tachometer-gear">d4</div>
                <div id="ONEAS-tachometer-rpm">1000</div>
            </div>
            <div class="ONEAS-speed__elements-1">
                <div class="ONEAS-speedometer__turns">
                    <div class="turn__left">
                        <img class="turn__images" alt="" src="images/speed/turn-left.svg">
                    </div>
                    <div class="turn__right">
                        <img class="turn__images" alt="" src="images/speed/turn-right.svg">
                    </div>
                </div>
                <div class="ONEAS-speedometer__mileage">
                    <span class="ONEAS-mileage__value">000000</span>
                </div>
            </div>
            <div class="ONEAS-speed__elements-2">
                <div class="ONEAS-speedometer__speed">
                    <span class="ONEAS-speed__value">236</span>
                    <span class="ONEAS-speed__text">км/ч</span>
                </div>
            </div>
            <div class="ONEAS-speed__elements-3">
            <div class="ONEAS-speedometer__top">
                <div class="ONEAS-speedometer__fuel">
                    <img class="fuel__icon" alt="" src="images/speed/fuel.svg">
                    <div class="ONEAS-fuel__value">58</div>
                    <div class="ONEAS-fuel__text">л</div>
                </div>
                <div class="ONEAS-speedometer__wash">
                    <img class="wash__icon" alt="" src="images/speed/wash.svg">
                    <div class="ONEAS-wash__value">27</div>
                    <div class="ONEAS-wash__text">%</div>
                </div>
            </div>
            <div class="ONEAS-speedometer__params">
                <img class="icon__key icon__speed-params" alt="" src="images/speed/key.svg">
                <img class="icon__rem icon__speed-params" alt="" src="images/speed/rem.svg">
                <img class="icon__lights icon__speed-params" alt="" src="images/speed/lights.svg">
                <img class="icon__doors icon__speed-params" alt="" src="images/speed/doors.svg">
            </div>
        </div>`;
            const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, "ONEAS-speedometer", (prop, value) => this.onChangeInfo(prop, value));

            this.create(speedometerEl);

            interface('Hud').speedometer.show = 0;
        },
    },
    init() {
        this.hud.init();
        this.speedometer.init();
        jsLoader.showAddedScript(`HUD ${nameMod}`, "info");
    },
};

oneasHud.init();
