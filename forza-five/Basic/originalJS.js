const vol = "1.0.1",
    lvl = "Basic",
    nameMod = "Forza Five";

// Настройки скрипта для отображения оборотов
const rpmSettings = {
    max: 8000, // макс обороты
    idle: {
        min: 600,
        max: 900,
    }, // обороты в простое [мин, макс]
    koefLoad: 80, // коеффициент нагрузки
};

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
        name: "RPM",
        id: "rpm",
        filePath: "additional-scripts/rpm.js",
        enabled: true,
        is_hidden: true,
    },
    {
        name: "Video",
        id: "video_adder",
        filePath: "additional-scripts/video.js",
        enabled: true,
        is_hidden: true,
    },
    {
        name: "colorReplacerInDialog",
        id: "colorReplacerInDialog",
        filePath: "additional-scripts/rscd.js",
        enabled: true,
        is_hidden: true,
    },
];

window.replaceDialogColors = {
    include: {
        "*": "{808080}",
    },
    exclude: ["{33AA33}", "{FF9900}", "{FF0000}"],
};

window.videoSrc = "media/login-sborka.webm";

const oneasHud = {
    getScale() {
        const { clientWidth, clientHeight } = document.documentElement;
        return (clientWidth + clientHeight) / (1920 + 1080);
    },
    wantedAlwaysShowClass: "",
    hud: {
        data: {
            hudEl: null,
            hud_topEl: null,
            hud_bottomEl: null,
            moneyEl: null,
            hpEl: {
                value: null,
            },
            armourEl: {
                value: null,
            },
            hungerEl: {
                value: null,
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
                value: null,
            },
            weaponEl: {
                wrapper: null,
                ammoEl: null,
                nameEl: null,
            },
            server: {
                wrapper: null,
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
            this.data.hpEl.value = hudEl.querySelector(".ONEAS-param__health .ONEAS-param__amount");
            this.data.armourEl.value = hudEl.querySelector(".ONEAS-param__armour .ONEAS-param__amount");
            this.data.hungerEl.value = hudEl.querySelector(".ONEAS-param__hunger .ONEAS-param__amount");
            [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector(".ONEAS-param__breath"), hudEl.querySelector(".ONEAS-param__breath .ONEAS-param__amount")];
            [this.data.freezeEl.wrapper, this.data.freezeEl.value] = [hudEl.querySelector(".ONEAS-param__freeze"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-param__amount")];
            [this.data.wanted.wrapper, this.data.wanted.value] = [hudEl.querySelector(".ONEAS-wanted"), hudEl.querySelector(".ONEAS-wanted__amount")];
            this.data.weaponEl.ammoEl = hudEl.querySelector(".ONEAS-weapon__ammo").children;
            this.data.weaponEl.wrapper = hudEl.querySelector(".ONEAS-weapon__ammo");
            this.data.weaponEl.nameEl = hudEl.querySelector("#ONEAS-name__title");
            this.data.server.wrapper = hudEl.querySelector(".ONEAS-logo");
            this.data.server.value = hudEl.querySelector("#logo-t2");
            this.data.bonusEl = hudEl.querySelector(".ONEAS-logo__bonus");
            this.data.greenZoneEl = hudEl.querySelector(".ONEAS-green-zone");

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
                if (value == 0) document.querySelector(".ONEAS-weapon").style.opacity = "0";
                else document.querySelector(".ONEAS-weapon").style.opacity = "1";

                if (value == 1) this.data.weaponEl.nameEl.innerText = "Кастет"; /*БК*/
                else if (value == 2) this.data.weaponEl.nameEl.innerText = "Коса"; /*БК*/
                else if (value == 3) this.data.weaponEl.nameEl.innerText = "Полицейская дубинка"; /*БН*/
                /*БК*/ else if (value == 4) this.data.weaponEl.nameEl.innerText = "Нож"; /*БК*/
                else if (value == 5) this.data.weaponEl.nameEl.innerText = "Бита"; /*БН*/
                /*БК*/ else if (value == 6) this.data.weaponEl.nameEl.innerText = "Лопата"; /*БН*/
                /*БК*/ else if (value == 7) this.data.weaponEl.nameEl.innerText = "Кий"; /*БН*/
                /*БК*/ else if (value == 8) this.data.weaponEl.nameEl.innerText = "Мачета"; /*БК*/
                else if (value == 9) this.data.weaponEl.nameEl.innerText = "Бензопила"; /*БН*/
                /*БК*/ else if ((value == 10) | (value == 11) | (value == 12) | (value == 13)) this.data.weaponEl.nameEl.innerText = "Игрушка для взрослых"; /*БН*/
                /*БК*/ else if (value == 14) this.data.weaponEl.nameEl.innerText = "Цветы"; /*БН*/
                /*БК*/ else if (value == 15) this.data.weaponEl.nameEl.innerText = "Топор"; /*БК*/
                else if (value == 16) this.data.weaponEl.nameEl.innerText = "Граната"; /*1*/
                /*БК*/ else if (value == 17) this.data.weaponEl.nameEl.innerText = "Дымовая граната"; /*1*/
                /*БК*/ else if (value == 18) this.data.weaponEl.nameEl.innerText = "Коктейль Молотова"; /*1*/
                /*БК*/ else if (value == 22) this.data.weaponEl.nameEl.innerText = "Пистолет Макарова";
                else if (value == 23) this.data.weaponEl.nameEl.innerText = "Пистолет с глушителем";
                else if (value == 24) this.data.weaponEl.nameEl.innerText = "Desert Eagle";
                else if (value == 25) this.data.weaponEl.nameEl.innerText = "Дробовик";
                else if (value == 26) this.data.weaponEl.nameEl.innerText = "Обрез";
                else if (value == 27) this.data.weaponEl.nameEl.innerText = "Тактический дробовик";
                else if (value == 28) this.data.weaponEl.nameEl.innerText = "Micro-Uzi";
                else if (value == 29) this.data.weaponEl.nameEl.innerText = "MP5";
                else if (value == 30) this.data.weaponEl.nameEl.innerText = "AK-47";
                else if (value == 31) this.data.weaponEl.nameEl.innerText = "М4";
                else if (value == 32) this.data.weaponEl.nameEl.innerText = "Тес-9";
                else if (value == 33) this.data.weaponEl.nameEl.innerText = "Винтовка";
                else if (value == 34) this.data.weaponEl.nameEl.innerText = "СВД";
                else if (value == 35) this.data.weaponEl.nameEl.innerText = "РПГ"; /*1*/
                /*БК*/ else if (value == 36) this.data.weaponEl.nameEl.innerText = "Bazooka"; /*БК*/
                else if (value == 37) this.data.weaponEl.nameEl.innerText = "Огнемёт"; /*БК*/
                else if (value == 38) this.data.weaponEl.nameEl.innerText = "Миниган"; /*БК*/
                else if (value == 39) this.data.weaponEl.nameEl.innerText = "С4"; /*1*/
                /*БК*/ else if (value == 40) this.data.weaponEl.nameEl.innerText = "Кнопка детонатора"; /*0*/
                /*БН*/
                /*БК*/ else if (value == 41) this.data.weaponEl.nameEl.innerText = "Баллончик"; /*БН*/
                /*БК*/ else if (value == 42) this.data.weaponEl.nameEl.innerText = "Огнетушитель"; /*БН*/
                /*БК*/ else if (value == 43) this.data.weaponEl.nameEl.innerText = "Фотоаппарат"; /*БН*/
                /*БК*/ else if (value == 46) this.data.weaponEl.nameEl.innerText = "Парашют"; /*0*/
                /*БН*/
                /*БК*/ else this.data.weaponEl.nameEl.innerText = "Пусто";
            }

            if (prop === "weapon" && value >= 16) {
                this.data.weaponEl.ammoEl[0].style.display = "";
                this.data.weaponEl.ammoEl[1].style.display = "";
                this.data.weaponEl.wrapper.style.display = "";
            }

            if (prop === "weapon" && value < 16) {
                this.data.weaponEl.ammoEl[0].style.display = "none";
                this.data.weaponEl.ammoEl[1].style.display = "none";
                this.data.weaponEl.wrapper.style.display = "none";
            }

            if (prop == "showGreenZoneTab") {
                this.data.greenZoneEl.style.opacity = "1";
            }

            if (prop == "hideGreenZoneTab") {
                this.data.greenZoneEl.style.opacity = "0";
            }

            if (prop == "health") {
                this.data.hpEl.value.innerText = value;
            }

            if (prop == "armour") {
                this.data.armourEl.value.innerText = value;
            }

            if (prop == "hunger") {
                this.data.hungerEl.value.innerText = value;
            }

            if (prop == "breath") {
                if (value < 100) this.data.breathEl.wrapper.style.opacity = "1";
                else this.data.breathEl.wrapper.style.opacity = "0";

                this.data.breathEl.value.innerText = value;
            }

            if (prop == "money") {
                if (value > 999999999) value = 999999999;

                this.data.moneyEl.innerHTML = value.toLocaleString("DE");
            }

            if (prop == "wanted") {
                if (value === 0 && oneasHud.wantedAlwaysShowClass.length === 0) {
                    this.data.wanted.wrapper.style.display = "none";
                    return;
                }

                this.data.wanted.wrapper.style.display = "";

                this.data.wanted.value.innerText = value;
            }

            if (prop == "ammoInClip") {
                this.data.weaponEl.ammoEl[0].innerText = value;
            }

            if (prop == "totalAmmo") {
                this.data.weaponEl.ammoEl[2].innerText = value;
            }

            if (prop == "setServer") {
                const numLength = 2;
                const num = value;
                const zero = "0".repeat(numLength - num.toString().length);

                this.data.server.value.innerText = `${zero}${num}`;

                if (value > 0 && this.data.server.wrapper.style.display == "none") this.data.server.wrapper.style.display = "";

                if (value <= 0) this.data.server.wrapper.style.display = "none";
            }

            if (prop == "setBonus") {
                if (value <= 1) this.data.bonusEl.style.display = "none";
                else this.data.bonusEl.style.display = "";

                this.data.bonusEl.innerText = `x${value}`;
            }

            if (prop === "isShowFreeze" && value) {
                this.data.freezeEl.wrapper.style.opacity = "1";
            }

            if (prop === "isShowFreeze" && !value) {
                this.data.freezeEl.wrapper.style.opacity = "0";
            }

            if (prop == "freeze") {
                this.data.freezeEl.value.innerText = value;
            }
        },
        init() {
            const hudHtml = `
            <div class="ONEAS-hud__bottom">
                <div class="ONEAS-radar-border">
                    <div class="ONEAS-radar__images">
                        <img src="images/hud/radar-border.svg" alt="">
                    </div>
                    <div class="ONEAS-green-zone">
                        <span class="ONEAS-green-zone__text">safe zone</span>
                    </div>
                </div>
                <div class="ONEAS-params">
                    <div class="ONEAS-param__armour ONEAS-param">
                        <img class="ONEAS-param__icon" src="images/hud/icon-bron.svg">
                        <div class="ONEAS-params__text">
                            <span class="ONEAS-param__amount">50</span>
                            <span>%</span>
                        </div>
                    </div>
                    <div class="ONEAS-param__hunger ONEAS-param">
                        <img class="ONEAS-param__icon" src="images/hud/icon-eat.svg">
                        <div class="ONEAS-params__text">
                            <span class="ONEAS-param__amount">50</span>
                            <span>%</span>
                        </div>
                    </div>
                    <div class="ONEAS-param__health ONEAS-param">
                        <img class="ONEAS-param__icon" src="images/hud/icon-hp.svg">
                        <div class="ONEAS-params__text">
                            <span class="ONEAS-param__amount">50</span>
                            <span>%</span>
                        </div>
                    </div>
                    <div class="ONEAS-param__breath ONEAS-param">
                        <img class="ONEAS-param__icon" src="images/hud/icon-breath.svg">
                        <div class="ONEAS-params__text">
                            <span class="ONEAS-param__amount">50</span>
                            <span>%</span>
                        </div>
                    </div>
                    <div class="ONEAS-param__freeze ONEAS-param">
                        <img class="ONEAS-param__icon" src="images/hud/icon-freeze.svg">
                        <div class="ONEAS-params__text">
                            <span class="ONEAS-param__amount">50</span>
                            <span>%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ONEAS-hud__top">
                <div class="ONEAS-hud__info">
                    <div class="ONEAS-logo">
                        <div class="ONEAS-logo__data">
                            <img class="ONEAS-logo__icons" src="images/hud/icon-radmir.svg" alt="">
                            <div class="ONEAS-data__text">
                                <span id="logo-t1">Server</span>
                                <span id="logo-t2">02</span>
                            </div>
                        </div>
                        <div class="ONEAS-logo__bonus">x3</div>
                    </div>
                    <div class="ONEAS-wanted ${oneasHud.wantedAlwaysShowClass}">
                        <img class="ONEAS-logo__icons" src="images/hud/icon-star.svg" alt="">
                        <div class="ONEAS-data__text">
                            <span class="ONEAS-wanted__amount">1</span>
                            <span>Уровень</span>
                        </div>
                    </div>
                    <div class="ONEAS-cash">
                        <img class="ONEAS-logo__icons" src="images/hud/icon-money.svg" alt="">
                        <span id="ONEAS-cash__value" class="ONEAS-data__text">999.999.999</span>
                    </div>
                </div>
                <div class="ONEAS-weapon">
                    <span id="ONEAS-name__title">Desert Eagle</span> 
                    <div class="ONEAS-weapon__ammo">
                        <span id="ONEAS-ammo__in-clip">7</span>                    
                        <span>/</span>
                        <span id="ONEAS-ammo__total">93</span> 
                    </div>
                </div>
            </div>`;
            const hudEl = jsLoader.hudInfo.addNewHud(hudHtml, "ONEAS-hud", (prop, value) => void this.onInfoChange(prop, value));

            this.createHud(hudEl);

            interface("Hud").setBonus(interface("Hud").bonus);
            interface("Hud").setServer(interface("Hud").server);
            interface("Hud").info.health = interface("Hud").info.health;
            interface("Hud").info.armour = interface("Hud").info.armour;
            interface("Hud").info.hunger = interface("Hud").info.hunger;
            interface("Hud").info.breath = interface("Hud").info.breath;
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
            wash: {
                dashArray: 271,
                dashOffset: 271,
            },
            fuel: {
                dashArray: 271,
                dashOffset: 271,
            },
        },
        data: {
            speedometerEl: null,
            speed: {
                barEl: null,
                valueEl: null,
                zeroEl: null,
            },
            fuel: {
                wrapperEl: null,
                barEl: null,
                valueEl: null,
            },
            wash: {
                wrapperEl: null,
                barEl: null,
                valueEl: null,
            },
            tachometer: {
                wrapper: null,
                //rpmEl: null,
                gearEl: null,
                barEl: null,
            },
            mileageEl: null,
            paramsEls: [],
        },
        onChangeInfo(prop, value) {
            if (prop === "wash") {
                isNaN(value * 100) ? (value = 0) : value;

                this.setWash(+value);
            } else if (prop === "show" && +value == 1) {
                this.show();
            } else if (prop === "show" && +value == 0) {
                this.hide();
            } else if (prop === "speed") {
                this.setSpeed(value);
            } else if (prop === "fuel") {
                this.setFuel(value);
            } else if (prop === "mileage") {
                this.setMileage(value);
            }

            // // params
            else if (prop == "rem") {
                this.data.paramsEls[2].classList.toggle("ONEAS-speedometer-param--active", +value);
            } else if (prop == "doors") {
                this.data.paramsEls[3].classList.toggle("ONEAS-speedometer-param--active", +value);
            } else if (prop == "temperature") {
                this.data.paramsEls[0].classList.toggle("ONEAS-speedometer-param--active", +value);
            } else if (prop == "lights") {
                this.data.paramsEls[1].classList.toggle("ONEAS-speedometer-param--active", +value);
            } else if (prop === "tachometer") {
                this.setGear(value.gear);
                this.setTachometer(value.rpm, value.maxRpm);
            }
        },
        show() {
            this.data.speedometerEl.style.opacity = "1";
        },
        hide() {
            this.data.speedometerEl.style.opacity = "0";
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

            this.data.tachometer.barEl.style.transform = `rotate(${(rpm / maxRpm) * (490 - 230) + 230}deg)`;
        },
        setMileage(km) {
            this.data.mileageEl.innerText = km;
        },
        setSpeed(speed) {
            const digits = speed.toString().padStart(3, "0").split("");
            const spans = document.querySelectorAll('[id^="speed__value-"]');

            spans.forEach((span, index) => {
                span.textContent = digits[index];

                if (+digits[index] === 0 && (index === 0 || (speed < 100 && index === 1))) {
                    span.style.opacity = 0.2;
                } else {
                    span.style.opacity = 1;
                }
            });

            if (speed > 0) this.data.speed.valueEl[2].style.opacity = "1";
            else this.data.speed.valueEl[2].style.opacity = "0.2";
        },
        //setDamage(floatDamage) {
        //  const multiplier = this.barsValues.damage.dashArray + floatDamage * this.barsValues.damage.dashArray;
        //  this.data.damage.barEl.style.strokeDashoffset = multiplier;
        //},
        setWash(floatWash) {
            this.data.wash.wrapperEl.classList.toggle("ONEAS-speedometer-danger", floatWash >= 0.75);

            const multiplier = -(this.barsValues.wash.dashArray + floatWash * this.barsValues.wash.dashArray);

            this.data.wash.barEl.style.strokeDashoffset = multiplier;

            this.data.wash.valueEl.innerText = Math.floor(floatWash * 100);
        },
        setFuel(fuel) {
            this.data.fuel.wrapperEl.classList.toggle("ONEAS-speedometer-danger", fuel <= 15);

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
            this.data.speed.zeroEl = speedometerEl.querySelector("#speed__value-1");
            //this.data.speed.valueEl = speedometerEl.querySelector("#speed__value-2");
            this.data.speed.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-speed__value").children;
            //this.data.speed.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-speed__value");
            //this.data.speed.barEl = speedometerEl.querySelector(".ONEAS-speedometer-speed__arrow");

            // FUEL
            this.data.fuel.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__fuel");
            this.data.fuel.valueEl = speedometerEl.querySelector(".ONEAS-fuel__value");
            this.data.fuel.barEl = speedometerEl.querySelector(".ONEAS-bars__fuel");
            this.data.fuel.textEl = speedometerEl.querySelector(".ONEAS-fuel__text");

            // WASH
            this.data.wash.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__wash");
            this.data.wash.barEl = speedometerEl.querySelector(".ONEAS-bars__wash");
            this.data.wash.valueEl = speedometerEl.querySelector(".ONEAS-wash__value");

            // DAMAGE
            //this.data.damage.barEl = speedometerEl.querySelector(".ONEAS-bars__damage");

            // MILEAGE
            this.data.mileageEl = speedometerEl.querySelector(".ONEAS-mileage__value");

            // PARAMS
            this.data.paramsEls = speedometerEl.querySelector(".ONEAS-speedometer-params").children;

            // TACHOMETER
            //this.data.tachometer.bgEl = speedometerEl.querySelector('.ONEAS-speedometer-bg');
            this.data.tachometer.barEl = speedometerEl.querySelector(".ONEAS-speedometer-speed__arrow");
            this.data.tachometer.wrapper = speedometerEl.querySelector(".ONEAS-speedometer__tachometer");
            this.data.tachometer.gearEl = this.data.tachometer.wrapper.querySelector("#ONEAS-tachometer-gear");
            // this.data.tachometer.rpmEl = this.data.tachometer.wrapper.querySelector('#ONEAS-tachometer-rpm');

            // TURNS

            this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale()})`;
        },
        init() {
            const text = `<img src="images/speed/bg-speed.png" alt="" class="ONEAS-speedometer-bg">
            <img class="ONEAS-speedometer-speed__arrow" src="images/speed/arrow.png" alt="" srcset=""> 
            <div class="ONEAS-speedometer-speed__value">            
               <span id="speed__value-1">0</span>
               <span id="speed__value-2">7</span>
               <span id="speed__value-3">5</span>
            </div>
            <span class="ONEAS-speedometer-speed__text">km/h</span>
            <div class="ONEAS-speedometer__params">
                 <div class="ONEAS-speedometer-params">
                      <div class="ONEAS-spedometer-param__key">
                      <svg width="27" height="10" viewBox="0 0 27 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_422_124)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5511 9.59084C24.2028 9.59084 26.3524 7.62972 26.3524 5.21064C26.3524 2.79157 24.2028 0.830444 21.5511 0.830444C19.6753 0.830444 18.0502 1.81207 17.2603 3.24298L17.2832 3.26389L16.7497 5.45399L16.3803 3.26389L2.34557 3.26389L0.745117 4.48061L3.13226 6.4402L4.47952 5.21064L6.07997 6.67071H6.61346L7.68045 5.69733L8.7474 6.67071H9.81435L10.8814 5.69733L11.9483 6.67071H12.4818L14.0823 5.21064L15.6827 6.67071L17.0227 6.67071C17.6823 8.372 19.4609 9.59084 21.5511 9.59084ZM23.685 6.18402C24.2743 6.18402 24.752 5.74822 24.752 5.21064C24.752 4.67306 24.2743 4.23727 23.685 4.23727C23.0957 4.23727 22.618 4.67306 22.618 5.21064C22.618 5.74822 23.0957 6.18402 23.685 6.18402Z" fill="white"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_422_124">
                      <rect width="25.6073" height="8.76039" fill="white" transform="translate(0.745117 0.8302)"/>
                      </clipPath>
                      </defs>
                      </svg>                      
                      </div>
                      <div class="ONEAS-spedometer-param__lights">
                      <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_422_136)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.79981 0.484759C7.70804 2.38388 6.17954 7.44821 8.79981 12.5125C9.38749 12.59 10.0615 12.6474 10.7837 12.6706C9.62466 10.5369 8.31241 7.03779 9.27467 4.39158C9.49036 6.65515 10.4796 11.1235 12.763 12.6435C16.6027 12.409 20.8098 11.0368 20.8098 6.81517C20.8098 0.991192 12.8032 0.168239 8.79981 0.484759Z" fill="white"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.189941 10.7566L6.50444 10.8003C6.38845 10.3949 6.29151 9.99232 6.2119 9.59366L0.189941 9.47145L0.189941 10.7566ZM0.189941 8.30554L6.03127 8.47627C5.9784 8.05065 5.94421 7.63114 5.92642 7.21922L0.189941 7.0204L0.189941 8.30554ZM0.189941 5.85452L5.91861 6.05545C5.93184 5.60645 5.96339 5.16913 6.01 4.74574L0.189941 4.56934L0.189941 5.85452ZM0.189941 3.40347L6.18938 3.53171C6.27902 3.04944 6.38636 2.59141 6.50535 2.16172L0.189941 2.11829L0.189941 3.40347Z" fill="white"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_422_136">
                      <rect width="20.1852" height="12.2553" fill="white" transform="translate(0.624512 0.425537)"/>
                      </clipPath>
                      </defs>
                      </svg>                      
                      </div>
                      <div class="ONEAS-spedometer-param__rem">
                      <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_422_129)">
                      <path d="M13.0032 10.6941L14.1906 11.4075L12.9196 11.7299L11.4405 11.2032L8.79446 11.4235L10.6769 10.3824L12.4198 11.0676L13.0032 10.6941Z" fill="white"/>
                      <path d="M27.5184 11.4508L27.3163 17.0558L21.828 17.0643L22.0302 11.4593L27.5184 11.4508Z" fill="white"/>
                      <path d="M7.76003 11.4816L8.65555 17.0849L3.16731 17.0934L3.36944 11.4884L7.76003 11.4816Z" fill="white"/>
                      <path d="M14.346 11.4712L14.1438 17.0762L12.792 16.5179L11.3997 17.0805L8.65563 17.0848L8.85776 11.4798L11.6019 11.4755L12.9537 12.0338L14.346 11.4712Z" fill="white"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8072 17.6243L22.0901 9.77733L16.6019 9.78586L16.2785 18.7538L21.7668 18.7454L21.8072 17.6243ZM21.8072 17.6243L17.4166 17.6311L17.6591 10.9051L20.9521 10.9L21.8072 17.6243Z" fill="white"/>
                      <path d="M22.9763 10.5319L22.3446 9.7903L22.4968 11.3299L27.4692 11.4214L22.9763 10.5319Z" fill="white"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_422_129">
                      <rect width="23.3934" height="17.3779" fill="white" transform="translate(9.7915 0.799805) rotate(31)"/>
                      </clipPath>
                      </defs>
                      </svg>                      
                      </div>
                      <div class="ONEAS-spedometer-param__doors">
                      <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_422_126)">
                      <path d="M6.10401 6.35729C5.71374 3.84491 6.8936 1.80923 9.21344 1.51177C11.5152 1.21662 13.235 1.90968 13.6514 4.3895L13.8303 9.30418L11.8232 9.78477L11.6457 5.46189L11.6372 5.40704C11.454 4.22821 10.8505 3.55827 9.55711 3.72412C8.26367 3.88997 7.97203 4.91545 8.15515 6.09428L8.342 8.95889L14.4867 9.09924L16.5736 10.0144L5.28437 9.62221L5.77257 19.2621L4.45361 18.4988L3.9654 8.85894L6.24255 8.91094L6.10401 6.35729Z" fill="white"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.77237 19.2616L6.16348 10.1306L16.5734 10.0139L16.8387 18.9401L5.77237 19.2616ZM12.4301 14.0494C12.6762 14.8379 12.288 15.6605 11.5629 15.8869C10.8378 16.1133 10.0504 15.6577 9.80428 14.8693C9.55812 14.0808 9.94636 13.2581 10.6714 13.0318C11.3966 12.8054 12.1839 13.261 12.4301 14.0494Z" fill="white"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_422_126">
                      <rect width="14.0978" height="19.2917" fill="white" transform="translate(0.0249023 4.31409) rotate(-17.3392)"/>
                      </clipPath>
                      </defs>
                      </svg>   
                      </div>
                 </div>
            </div>
            <div class="ONEAS-speedometer__tachometer">
               <div id="ONEAS-tachometer-gear">4</div>
            </div>
            <div class="ONEAS-speedometer__bars">
                 <div class="ONEAS-speedometer__fuel">
                    <div class="ONEAS-speedometer-fuel__icon">                     
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.91113 3.08276H14.7788V13.1743H15.2316C16.7321 13.1743 17.9486 14.3038 17.9486 15.6971C17.9486 16.1616 18.3541 16.5381 18.8542 16.5381C19.3544 16.5381 19.7599 16.1616 19.7599 15.6971V8.47688L16.4026 5.35937L17.6833 4.17009L21.5711 7.78021V15.6971C21.5711 17.0904 20.3547 18.22 18.8542 18.22C17.3537 18.22 16.1373 17.0904 16.1373 15.6971C16.1373 15.2327 15.7318 14.8562 15.2316 14.8562H14.7788V19.9018H3.91113V3.08276ZM5.72242 4.76467H12.9675V9.81038H5.72242V4.76467Z" fill="white"/>
                        </svg>
                    </div>
                    <div class="ONEAS-fuel__data">
                        <div class="ONEAS-fuel__value">182</div>
                        <div class="ONEAS-fuel__text">л</div>
                    </div>
                      <div class="ONEAS-speedometer-bars">
                        <svg class="ONEAS-bars__fuel ONEAS-speedometer--bars" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.8238 206.016C20.8576 188.964 11.0944 167.978 7.69133 145.546C4.28827 123.114 7.38809 100.177 16.6234 79.4534C25.8586 58.7295 40.8421 41.0881 59.7978 28.6201C78.7534 16.1521 100.886 9.38044 123.573 9.10766" stroke="white" stroke-width="6.19817"/>
                        </svg>
                        <svg class="ONEAS-bars-bg__fuel ONEAS-speedometer--bars-bg" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.8238 206.016C20.8576 188.964 11.0944 167.978 7.69133 145.546C4.28827 123.114 7.38809 100.177 16.6234 79.4534C25.8586 58.7295 40.8421 41.0881 59.7978 28.6201C78.7534 16.1521 100.886 9.38044 123.573 9.10766" stroke="white" stroke-opacity="0.25" stroke-width="6.19817"/>
                        </svg>
                      </div>
                 </div>
                 <div class="ONEAS-speedometer__wash">
                      <div class="ONEAS-speedometer-bars">
                            <svg class="ONEAS-bars__wash ONEAS-speedometer--bars" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M214.177 206.015C229.143 188.962 238.906 167.976 242.309 145.545C245.712 123.113 242.612 100.176 233.376 79.4519C224.14 58.7282 209.157 41.087 190.201 28.6192C171.245 16.1515 149.112 9.38011 126.425 9.10764" stroke="white" stroke-width="6.19817"/>
                            </svg>
                            <svg class="ONEAS-bars-bg__wash ONEAS-speedometer--bars-bg" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M214.177 206.015C229.143 188.962 238.906 167.976 242.309 145.545C245.712 123.113 242.612 100.176 233.376 79.4519C224.14 58.7282 209.157 41.087 190.201 28.6192C171.245 16.1515 149.112 9.38011 126.425 9.10764" stroke="white" stroke-opacity="0.25" stroke-width="6.19817"/>
                            </svg>
                      </div>                      
                      <div class="ONEAS-speedometer-wash__icon">
                         <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7465 14.6807L13.936 4.93384L8.12558 14.6807C6.82537 16.8618 7.30619 19.5183 9.3151 21.2529C11.8672 23.4564 16.0049 23.4565 18.557 21.2529C20.5659 19.5183 21.0467 16.8618 19.7465 14.6807ZM12.631 19.9382C13.2427 19.5436 13.1292 18.5006 12.3776 17.6086C11.626 16.7165 10.5208 16.3132 9.90915 16.7079C9.29746 17.1024 9.41089 18.1455 10.1625 19.0376C10.9141 19.9295 12.0193 20.3328 12.631 19.9382Z" fill="white"/>
                         </svg>                               
                      </div>
                      <div class="ONEAS-wash__data">
                      <div class="ONEAS-wash__value">10</div>
                      <div class="ONEAS-wash__text">%</div>
                  </div>
                 </div>
            </div>
            <div class="ONEAS-speedometer__mileage">
                <span class="ONEAS-mileage__value">009899</span>
                <span class="ONEAS-mileage__text">км</span>
            </div>`;
            const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, "ONEAS-speedometer", (prop, value) => this.onChangeInfo(prop, value));

            this.create(speedometerEl);

            interface("Hud").speedometer.show = 0;
        },
    },
    menuSettings: {
        defaultData: {
            showNumbers: "show-speedometer-numbers", // является дефолтным значением (класс css)
        },

        data: {
            showNumbers: "",
        },

        loadConfig() {
            let menuSettings = localStorage.getItem("menuSettings");

            if (menuSettings === null) {
                menuSettings = this.defaultData;
                this.saveConfig(this.defaultData);
            }

            if (typeof menuSettings === "string") menuSettings = JSON.parse(menuSettings);

            this.data = { ...this.data, ...menuSettings };
        },

        saveConfig(data) {
            localStorage.setItem("menuSettings", JSON.stringify(data));
        },

        setNumbersVisibility() {
            this.addClassList("show-speedometer-numbers");

            // если текущее значение true, то есть показываются цифры
            // будем скрывать
            if (this.data.showNumbers.length === 0) this.removeClassList("show-speedometer-numbers");
        },

        getReversedValue(variable, firstValue, secondValue) {
            if (variable === firstValue) return secondValue;

            return firstValue;
        },

        addMenuOption() {
            jsLoader.mainMenu.addNewOption(1, "[Сборка] Отображение пробега и процентов в спидометре", {
                initialVar: () => this.data.showNumbers.length > 0,
                callback: () => {
                    // после каждого клика на свитч срабатывает функция callback

                    this.data.showNumbers = this.getReversedValue(this.data.showNumbers, this.defaultData.showNumbers, "");

                    this.setNumbersVisibility();
                },
            });
        },

        init() {
            this.loadConfig();

            this.setNumbersVisibility();

            this.addMenuOption();
        },
    },
    init() {
        this.hud.init();
        this.speedometer.init();
        this.menuSettings.init();
        jsLoader.showAddedScript(`HUD ${nameMod}`, "info");
    },
};

oneasHud.init();
