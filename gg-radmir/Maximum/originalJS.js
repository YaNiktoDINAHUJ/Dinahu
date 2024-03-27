const vol = "1.0.1",
    lvl = "Maximum",
    nameMod = "GG Radmir";

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
        name: "Время на экране",
        id: "Screen_Time",
        filePath: "additional-scripts/screenTime.js",
        enabled: true,
        is_hidden: false,
    },
];

const OneasHudTimeParams = {
    dateSettings: {
        showDate: true, // показывать дату
        format: "0", // формат даты (0: ДД.ММ.ГГГГ, 1: ДД.ММ.ГГ, 2: ДД-ММ-ГГГГ, 3: ДД/ММ/ГГ)
    },
    timeSettings: {
        showTime: true, // показывать время
        showHours: true, // показывать часы
        showMinutes: true, // показывать минуты
        showSeconds: true, // показывать секунды
        showMs: false, // показывать мс
    },
    timeSelector: "#ONEAS-time_text",
    dateSelector: "#ONEAS-data_text",
    wrapperSelector: ".ONEAS-hud__bottom-right",
};

// const bankMoneySettings = {
//     $wrapper: ".ONEAS-bankcash", // селектор для враппера
//     $value: "#ONEAS-bankcash__value", // селектор для элемента, в котором хранится значение денег
//     $cashSymbol: "#ONEAS-bankcash__text", // селектор, где хранится значок денег (Р, $)
//     cashSymbol: "$", // значок для денег
//     format: (money) => money.toLocaleString("ja-JP"), // функция для форматирования денег
// };

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
            hud_bottomRightEl: null,
            moneyEl: null,
            moneyBankEl: null,
            hpEl: {
                wrapper: null,
                progress: null,
                value: null,
            },
            armourEl: {
                wrapper: null,
                progress: null,
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
                els: [],
            },
            weaponEl: {
                wrapper: null,
                ammoEl: null,
                nameEl: null,
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
            this.data.hud_topEl = hudEl.querySelector(".ONEAS-hud__top");
            this.data.hud_bottomEl = hudEl.querySelector(".ONEAS-hud__bottom");
            this.data.hud_bottomRightEl = hudEl.querySelector(".ONEAS-hud__bottom-right");
            this.data.moneyEl = hudEl.querySelector("#ONEAS-cash__value");
            this.data.moneyBankEl = hudEl.querySelector("#ONEAS-bankcash__value");
            [this.data.hpEl.wrapper, this.data.hpEl.progress, this.data.hpEl.value] = [hudEl.querySelector(".ONEAS-params-2 .ONEAS-param__health"), hudEl.querySelector(".ONEAS-param__health .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__health .ONEAS-param__amount")];
            [this.data.armourEl.wrapper, this.data.armourEl.progress, this.data.armourEl.value] = [hudEl.querySelector(".ONEAS-params .ONEAS-param__armour"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-param__amount")];
            this.data.hungerEl.value = hudEl.querySelector(".ONEAS-param__hunger .ONEAS-param__amount");
            [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector(".ONEAS-param__breath"), hudEl.querySelector(".ONEAS-param__breath .ONEAS-param__amount")];
            [this.data.freezeEl.wrapper, this.data.freezeEl.value] = [hudEl.querySelector(".ONEAS-param__freeze"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-param__amount")];
            [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector(".ONEAS-wanted__row"), hudEl.querySelector(".ONEAS-wanted__row").children];
            this.data.weaponEl.wrapper = hudEl.querySelector(".ONEAS-weapon__ammo");
            this.data.weaponEl.ammoEl = hudEl.querySelector(".ONEAS-weapon__ammo").children;
            this.data.weaponEl.nameEl = hudEl.querySelector("#ONEAS-weapon__name");
            this.data.server.wrapper = hudEl.querySelector(".ONEAS-logo");
            this.data.server.image = hudEl.querySelector(".ONEAS-logo__image");
            this.data.bonusEl = hudEl.querySelector(".ONEAS-logo__bonus");
            this.data.greenZoneEl = hudEl.querySelector(".ONEAS-green-zone");

            this.data.hud_topEl.style.transform = `scale(${oneasHud.getScale()})`;
            this.data.hud_bottomEl.style.transform = `scale(${oneasHud.getScale()})`;
            this.data.hud_bottomRightEl.style.transform = `scale(${oneasHud.getScale()})`;
        },
        onInfoChange(prop, value) {
            if ((prop == "show" || prop == "showBars") && +value >= 1) {
                this.data.hudEl.style.display = "";
            }

            if ((prop == "show" || prop == "showBars") && +value === 0) {
                this.data.hudEl.style.display = "none";
            }

            if (prop == "weapon") {
                if (value == 0) this.data.weaponEl.nameEl.style.opacity = "0";
                else this.data.weaponEl.nameEl.style.opacity = "1";

                if (value == 1) this.data.weaponEl.nameEl.innerText = "Кастет";
                else if (value == 2) this.data.weaponEl.nameEl.innerText = "Коса";
                else if (value == 3) this.data.weaponEl.nameEl.innerText = "Полицейская дубинка";
                else if (value == 4) this.data.weaponEl.nameEl.innerText = "Нож";
                else if (value == 5) this.data.weaponEl.nameEl.innerText = "Бита";
                else if (value == 6) this.data.weaponEl.nameEl.innerText = "Лопата";
                else if (value == 7) this.data.weaponEl.nameEl.innerText = "Кий";
                else if (value == 8) this.data.weaponEl.nameEl.innerText = "Мачета";
                else if (value == 9) this.data.weaponEl.nameEl.innerText = "Бензопила";
                else if ((value == 10) | (value == 11) | (value == 12) | (value == 13)) this.data.weaponEl.nameEl.innerText = "Игрушка для взрослых"; /*БН*/
                /*БК*/ else if (value == 14) this.data.weaponEl.nameEl.innerText = "Цветы";
                else if (value == 15) this.data.weaponEl.nameEl.innerText = "Топор";
                else if (value == 16) this.data.weaponEl.nameEl.innerText = "Граната";
                else if (value == 17) this.data.weaponEl.nameEl.innerText = "Дымовая граната";
                else if (value == 18) this.data.weaponEl.nameEl.innerText = "Коктейль Молотова";
                else if (value == 22) this.data.weaponEl.nameEl.innerText = "Пистолет Макарова";
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
                else if (value == 35) this.data.weaponEl.nameEl.innerText = "РПГ";
                else if (value == 36) this.data.weaponEl.nameEl.innerText = "Bazooka";
                else if (value == 37) this.data.weaponEl.nameEl.innerText = "Огнемёт";
                else if (value == 38) this.data.weaponEl.nameEl.innerText = "Миниган";
                else if (value == 39) this.data.weaponEl.nameEl.innerText = "С4";
                else if (value == 40) this.data.weaponEl.nameEl.innerText = "Кнопка детонатора";
                else if (value == 41) this.data.weaponEl.nameEl.innerText = "Баллончик";
                else if (value == 42) this.data.weaponEl.nameEl.innerText = "Огнетушитель";
                else if (value == 43) this.data.weaponEl.nameEl.innerText = "Фотоаппарат";
                else if (value == 46) this.data.weaponEl.nameEl.innerText = "Парашют";

                /*Отображение счетчиков патронов*/
                if ((value < 16) | (value == 40) | (value == 46)) (this.data.weaponEl.ammoEl[1].style.opacity = "0"), (this.data.weaponEl.ammoEl[2].style.opacity = "0");
                else (this.data.weaponEl.ammoEl[1].style.opacity = "1"), (this.data.weaponEl.ammoEl[2].style.opacity = "1");

                /*Отображение картинки патрона*/
                if (22 <= value && value <= 34) this.data.weaponEl.ammoEl[0].style.opacity = "1";
                else this.data.weaponEl.ammoEl[0].style.opacity = "0";
            }
            /*
      if (prop === 'weapon' && value >= 16) {
        this.data.weaponEl.ammoEl[0].style.display = '';
        this.data.weaponEl.ammoEl[1].style.display = '';
      }

      if (prop === 'weapon' && value < 16) {
        this.data.weaponEl.ammoEl[0].style.display = 'none';
        this.data.weaponEl.ammoEl[1].style.display = 'none';
      }*/

            if (prop == "showGreenZoneTab") {
                this.data.greenZoneEl.style.opacity = "1";
            }

            if (prop == "hideGreenZoneTab") {
                this.data.greenZoneEl.style.opacity = "0";
            }

            if (prop == "health") {
                this.data.hpEl.wrapper.classList.toggle("ONEAS-hud-danger", value <= 20);

                this.data.hpEl.progress.style.width = `${value}%`;
                this.data.hpEl.value.innerText = value;
            }

            if (prop == "armour") {
                if (value > 0) (this.data.armourEl.wrapper.style.display = ""), (this.data.armourEl.progress.style.width = `${value}%`);
                else (this.data.armourEl.wrapper.style.display = "none"), (this.data.armourEl.progress.style.width = `0%`);

                //this.data.armourEl.progress.style.width = `${value}%`;
                this.data.armourEl.value.innerText = value;
            }

            if (prop == "hunger") {
                this.data.hungerEl.value.innerText = value;
            }

            if (prop == "breath") {
                if (value < 100) this.data.breathEl.wrapper.style.display = "";
                else this.data.breathEl.wrapper.style.display = "none";

                this.data.breathEl.value.innerText = value;
            }

            if (prop == "money") {
                this.data.moneyEl.innerHTML = value.toLocaleString("ja-JP");
            }

            if (prop == "wanted") {
                if (value === 0 && oneasHud.wantedAlwaysShowClass.length === 0) {
                    this.data.wanted.wrapper.style.opacity = "0";
                    return;
                }

                this.data.wanted.wrapper.style.opacity = "1";

                for (let i = 0; i < 6; i += 1) {
                    if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
                        this.data.wanted.els[i].src = "images/hud/inactive.png";
                        this.data.wanted.els[i].classList.remove("ONEAS-wanted__active");
                        this.data.wanted.els[i].classList.add("ONEAS-wanted__inactive");
                    } else {
                        this.data.wanted.els[i].src = "images/hud/active.png";
                        this.data.wanted.els[i].classList.remove("ONEAS-wanted__inactive");
                        this.data.wanted.els[i].classList.add("ONEAS-wanted__active");
                    }
                }
            }

            if (prop == "ammoInClip") {
                this.data.weaponEl.ammoEl[1].innerText = value;
            }

            if (prop == "totalAmmo") {
                this.data.weaponEl.ammoEl[2].innerText = value;
            }

            if (prop == "setServer") {
                this.data.server.image.src = `images/logo/${value}.svg`;

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
<div class="ONEAS-logo">
    <span id="logo-t1">radmir</span>
    <span id="logo-t2">.online</span>
    <img class="ONEAS-logo__image" src="images/logo/12.svg">
    <img class="ONEAS-logo__bonus" src="images/hud/bonus-3.png">
</div>
<div class="ONEAS-params"> 
    <div class="ONEAS-param__health ONEAS-param">
        <img class="ONEAS-param__icon" src="images/hud/health.svg">
        <span class="ONEAS-param__amount">50</span>
    </div>
    <div class="ONEAS-param__hunger ONEAS-param">
        <img class="ONEAS-param__icon" src="images/hud/hunger.svg">
        <span class="ONEAS-param__amount">50</span>
    </div>
    <div class="ONEAS-param__armour ONEAS-param">
        <img class="ONEAS-param__icon" src="images/hud/armour.svg">
        <span class="ONEAS-param__amount">50</span>
    </div>
    <div style="display: none" class="ONEAS-param__breath ONEAS-param">
        <img class="ONEAS-param__icon" src="images/hud/breath.svg">
        <span class="ONEAS-param__amount">50</span>
    </div>
    <div style="display: none" class="ONEAS-param__freeze ONEAS-param">
        <img class="ONEAS-param__icon" src="images/hud/freeze.svg">
        <span class="ONEAS-param__amount">50</span>
    </div>
</div>
<div class="ONEAS-green-zone">
    <img class="ONEAS-green-zone__image" src="images/hud/green_zone.png">
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
<div class="ONEAS-cash">
    <span id="ONEAS-cash__text">$</span>
    <span id="ONEAS-cash__value">999999999</span>
</div>
<div class="ONEAS-bankcash">
    <img class="ONEAS-bankcash__images" src="images/hud/bankcash.svg">
    <span id="ONEAS-bankcash__text">$</span>
    <span id="ONEAS-bankcash__value">1999</span>
</div>
<div class="ONEAS-weapon">
    <span id="ONEAS-weapon__name">Desert Eagle</span>
    <div class="ONEAS-weapon__ammo">
        <img class="ONEAS-ammo__icon" src="images/hud/patron.png">
        <span id="ONEAS-ammo__in-clip">10</span>
        <span id="ONEAS-ammo__total">100</span> 
    </div>
</div>
</div>
<div class="ONEAS-hud__bottom">
<div class="ONEAS-radar-border">
    <img class="ONEAS-radar__images" src="images/hud/radar.png">
</div>
<div class="ONEAS-params-2"> 
    <div class="ONEAS-param__health ONEAS-param-2">
        <div class="ONEAS-param__progress">
            <div class="ONEAS-progress__value"></div>
        </div>
    </div>
    <div class="ONEAS-param__armour ONEAS-param-2">
        <div class="ONEAS-param__progress">
            <div class="ONEAS-progress__value"></div>
        </div>
    </div>
</div>
</div>
<div class="ONEAS-hud__bottom-right">
<div class="ONEAS-time">
    <span id="ONEAS-time_text">23:22</span>
    <img class="ONEAS-time__images" src="images/hud/time_icon.svg">
</div>
<div class="ONEAS-data">
    <span id="ONEAS-data_text">18.05.2023</span>
    <img class="ONEAS-data__images" src="images/hud/data_icon.svg">
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
            speed: {
                dashArray: 594,
                dashOffset: 594,
            },
            wash: {
                dashArray: 140,
                dashOffset: 140,
            },
            fuel: {
                dashArray: 140,
                dashOffset: 140,
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
                valueEl: null,
                textEl: null,
                barEl: null,
                wrapperEl: null,
            },
            wash: {
                barEl: null,
                valueEl: null,
                wrapperEl: null,
            } /*
            damage: {
              barEl: null,
            }*/,
            tachometer: {
                wrapper: null,
                rpmEl: null,
                gearEl: null,
                //barEl: null,
            },
            mileageEl: null,
            paramsEls: [],
        },
        onChangeInfo(prop, value) {
            try {
                /*if (prop === 'damage') {
          isNaN(value * 100) ? (value = 0) : value;

          this.setDamage(+value);
        }
*/
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

                if (prop === "mileage") {
                    this.setMileage(value);
                }

                if (prop === "speed") {
                    this.setSpeed(value);
                }

                if (prop === "fuel") {
                    this.setFuel(value);
                }

                // // params
                if (prop == "rem") {
                    this.data.paramsEls[0].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "doors") {
                    this.data.paramsEls[2].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "temperature") {
                    this.data.paramsEls[1].classList.toggle("ONEAS-speedometer-param--active", +value);
                }
                if (prop == "lights") {
                    this.data.paramsEls[3].classList.toggle("ONEAS-speedometer-param--active", +value);
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
            this.data.speedometerEl.style.display = "";
            document.querySelector(".ONEAS-hud__bottom-right").style.right = "15vw";
        },
        hide() {
            this.data.speedometerEl.style.display = "none";
            document.querySelector(".ONEAS-hud__bottom-right").style.right = "0.9vw";
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
            //this.data.speed.valueEl.innerText = speed;

            const speedLength = 3;
            const speedValue = speed;
            const zero = "0".repeat(speedLength - speedValue.toString().length);

            this.data.speed.valueEl.innerText = `${speedValue}`;
            this.data.speed.zeroEl.innerText = `${zero}`;

            if (speed > maxSpeed) speed = maxSpeed;

            const multiplier = this.barsValues.speed.dashArray - (speed / maxSpeed) * this.barsValues.speed.dashArray;

            this.data.speed.barEl.style.strokeDashoffset = multiplier;
        },
        /*setDamage(floatDamage) {
      const multiplier = this.barsValues.damage.dashArray + floatDamage * this.barsValues.damage.dashArray;

      this.data.damage.barEl.style.strokeDashoffset = multiplier;
    },*/
        setWash(floatWash) {
            this.data.wash.wrapperEl.classList.toggle("ONEAS-speedometer-danger", floatWash >= 0.75);

            const multiplier = this.barsValues.wash.dashArray - floatWash * this.barsValues.wash.dashArray;

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
            this.data.speed.valueEl = speedometerEl.querySelector("#speed__value-2");
            this.data.speed.barEl = speedometerEl.querySelector(".ONEAS-speed__bar-active");

            // FUEL
            this.data.fuel.valueEl = speedometerEl.querySelector(".ONEAS-fuel__value");
            this.data.fuel.textEl = speedometerEl.querySelector(".ONEAS-fuel__text");
            this.data.fuel.barEl = speedometerEl.querySelector(".ONEAS-fuel__bar-active");
            this.data.fuel.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__fuel");

            // WASH
            this.data.wash.barEl = speedometerEl.querySelector(".ONEAS-wash__bar-active");
            this.data.wash.valueEl = speedometerEl.querySelector(".ONEAS-wash__value");
            this.data.wash.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__wash");

            // DAMAGE
            //this.data.damage.barEl = speedometerEl.querySelector('.ONEAS-bars__damage');

            // MILEAGE
            this.data.mileageEl = speedometerEl.querySelector(".ONEAS-speed__mil");

            // PARAMS
            this.data.paramsEls = speedometerEl.querySelector(".ONEAS-speedometer__params").children;

            // TACHOMETER
            //this.data.tachometer.bgEl = speedometerEl.querySelector('.ONEAS-speedometer-bg');
            //this.data.tachometer.barEl = speedometerEl.querySelector(".ONEAS-tachometer__arrow");
            this.data.tachometer.wrapper = speedometerEl.querySelector(".ONEAS-speedometer__tachometer");
            this.data.tachometer.gearEl = this.data.tachometer.wrapper.querySelector("#ONEAS-tachometer-gear");
            this.data.tachometer.rpmEl = this.data.tachometer.wrapper.querySelector('#ONEAS-tachometer-rpm');

            // TURNS

            this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale()})`;
        },
        init() {
            const text = `
            <div style="display: none" class="ONEAS-speedometer__tachometer">
            <div id="ONEAS-tachometer-gear">d4</div>
            <div id="ONEAS-tachometer-rpm">1000</div></div>
      <div class="ONEAS-speed__line-top">
      <div class="ONEAS-speedometer__wash">
          <div class="ONEAS-percent__text">
              <div class="ONEAS-wash__value">100</div>
              <div class="ONEAS-wash__text">%</div>
          </div>
          <div class="ONEAS-wash__bars">
              <svg class="ONEAS-wash__bar-active" width="75" height="232" viewBox="0 0 75 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M45.3639 185.917C34.6074 165.268 28.689 142.443 28.0566 119.169C27.4242 95.8955 32.0944 72.7828 41.7137 51.5805" stroke="white" stroke-opacity="1" stroke-width="13"/>
                  </svg>
              <svg class="ONEAS-wash__bar-bg" width="75" height="232" viewBox="0 0 75 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M45.3639 185.917C34.6074 165.268 28.689 142.443 28.0566 119.169C27.4242 95.8955 32.0944 72.7828 41.7137 51.5805" stroke="white" stroke-opacity="0.5" stroke-width="8"/>
                  </svg>
          </div>
          <svg class="wash__icon icon__speed-percent" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1189 8.88734C17.5096 8.27139 15.6817 8.88841 14.8013 10.3448L13.2396 12.9281C13.0386 13.2606 12.7821 13.5577 12.4807 13.807L11.3012 14.783C10.1296 15.7524 9.73168 17.3523 10.3168 18.741L10.6787 19.5997C10.9436 20.2283 11.0132 20.9195 10.8789 21.5867L10.6513 22.7171C10.062 25.6437 13.2807 27.8772 15.9031 26.3614L17.5735 25.396C18.3746 24.933 19.3614 24.9026 20.1906 25.3152C22.0022 26.2167 24.1471 24.9272 24.1471 22.9365V21.7774C24.1471 20.9927 24.4258 20.2325 24.9354 19.6272L26.0438 18.3105C27.0012 17.1733 27.1167 15.5662 26.3313 14.3088L24.7664 11.8035C24.3646 11.1601 23.7588 10.6632 23.0417 10.3888L19.1189 8.88734ZM17.6862 15.475C18.5297 15.475 19.2135 14.796 19.2135 13.9584C19.2135 13.1207 18.5297 12.4417 17.6862 12.4417C16.8427 12.4417 16.1589 13.1207 16.1589 13.9584C16.1589 14.796 16.8427 15.475 17.6862 15.475ZM22.268 18.5084C22.268 18.9272 21.9261 19.2667 21.5043 19.2667C21.0827 19.2667 20.7408 18.9272 20.7408 18.5084C20.7408 18.0895 21.0827 17.7501 21.5043 17.7501C21.9261 17.7501 22.268 18.0895 22.268 18.5084ZM15.3953 23.0584C16.6605 23.0584 17.6862 22.0399 17.6862 20.7833C17.6862 19.5269 16.6605 18.5084 15.3953 18.5084C14.13 18.5084 13.1044 19.5269 13.1044 20.7833C13.1044 22.0399 14.13 23.0584 15.3953 23.0584Z" fill="white"/>
              </svg>
      </div>
      <div class="ONEAS-speedometer__speed">
          <div class="ONEAS-speed__bars">
          <svg class="ONEAS-speed__bar-active" width="283" height="276" viewBox="0 0 283 276" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M52.9045 239.095C35.2831 221.474 23.2828 199.023 18.4211 174.581C13.5593 150.14 16.0545 124.805 25.5912 101.782C35.1278 78.7584 51.2776 59.0799 71.9982 45.2348C92.7187 31.3898 117.08 24 142 24C166.92 24 191.281 31.3898 212.002 45.2348C232.722 59.0799 248.872 78.7584 258.409 101.782C267.945 124.805 270.441 150.14 265.579 174.581C260.717 199.023 248.717 221.474 231.095 239.095" stroke="#FCE834" stroke-opacity="1" stroke-width="13"/>
              </svg>
              <svg class="ONEAS-speed__bar-bg" width="283" height="276" viewBox="0 0 283 276" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M52.9045 239.095C35.2831 221.474 23.2828 199.023 18.4211 174.581C13.5593 150.14 16.0545 124.805 25.5912 101.782C35.1278 78.7584 51.2776 59.0799 71.9982 45.2348C92.7187 31.3898 117.08 24 142 24C166.92 24 191.281 31.3898 212.002 45.2348C232.722 59.0799 248.872 78.7584 258.409 101.782C267.945 124.805 270.441 150.14 265.579 174.581C260.717 199.023 248.717 221.474 231.095 239.095" stroke="white" stroke-opacity="0.5" stroke-width="8"/>
                  </svg>
</div>
<div class="ONEAS-speedometer__speed-data">
  <div class="ONEAS-speed__value">
  <span id="speed__value-1">0</span>
  <span id="speed__value-2">99</span>
  </div>
<span class="ONEAS-speed__text">км/ч</span>
<span class="ONEAS-speed__text ONEAS-speed__mil">000258</span>
</div>          
      </div>
      <div class="ONEAS-speedometer__fuel">
          <div class="ONEAS-percent__text"> 
              <div class="ONEAS-fuel__value">100</div>
              <div class="ONEAS-fuel__text">%</div>
          </div>
          <div class="ONEAS-fuel__bars">
              <svg class="ONEAS-fuel__bar-active" width="75" height="232" viewBox="0 0 75 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.633 185.923C38.3888 165.278 44.3081 142.457 44.9429 119.186C45.5778 95.9158 40.9116 72.8059 31.2974 51.6049" stroke="#8CD522" stroke-opacity="1" stroke-width="13"/>
                  </svg>
                  <svg class="ONEAS-fuel__bar-bg" width="75" height="232" viewBox="0 0 75 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27.633 185.923C38.3888 165.278 44.3081 142.457 44.9429 119.186C45.5778 95.9158 40.9116 72.8059 31.2974 51.6049" stroke="white" stroke-opacity="0.5" stroke-width="8"/>
                      </svg>
          </div>
          <svg class="fuel__icon icon__speed-percent" width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5525 8.52592C11.5377 8.53556 11.5031 8.54356 11.4755 8.54372C11.4022 8.54412 11.0721 8.6594 10.912 8.74052C10.7635 8.81577 10.5337 8.97992 10.416 9.09489C10.2576 9.24954 10.0494 9.56132 9.97612 9.75362C9.8972 9.96064 9.88438 9.99659 9.86767 10.0576C9.81569 10.2476 9.81307 10.6172 9.80651 18.7022L9.7998 26.9594H14.8967H19.9935V23.1497C19.9935 19.7103 19.9962 19.3372 20.0216 19.3116C20.0462 19.2868 20.1362 19.2833 20.7414 19.2836C21.146 19.2837 21.4442 19.2909 21.4599 19.301C21.4835 19.3159 21.4882 19.633 21.4982 21.8999C21.5053 23.4763 21.517 24.5519 21.5284 24.662C21.5536 24.9056 21.589 25.0759 21.6455 25.225C21.6615 25.2672 21.6868 25.3347 21.7017 25.375C21.834 25.732 22.2041 26.1994 22.5726 26.4747C22.849 26.6811 23.2505 26.8509 23.6596 26.9344C23.7414 26.9511 24.3656 26.9509 24.4465 26.9342C24.6333 26.8955 24.8235 26.8447 24.9025 26.8122C25.3144 26.6429 25.5495 26.4934 25.8064 26.2373C26.1038 25.9409 26.2991 25.6594 26.4042 25.3754C26.4192 25.3348 26.4445 25.2672 26.4604 25.225C26.5126 25.0867 26.5597 24.8811 26.5792 24.707C26.6072 24.4565 26.6064 14.5558 26.5784 14.3461C26.5347 14.0194 26.4676 13.8054 26.3096 13.4877C26.2183 13.3042 26.0541 13.0518 25.9653 12.9586C25.9512 12.9438 25.9034 12.8872 25.8592 12.833C25.815 12.7787 24.9559 11.905 23.9501 10.8914C22.756 9.68807 22.109 9.04852 22.0859 9.04852C22.0377 9.04852 21.0307 10.063 21.0307 10.1116C21.0307 10.1345 21.3953 10.5146 22.059 11.1837C22.7254 11.8554 23.0873 12.2328 23.0873 12.2559C23.0873 12.2821 23.0577 12.3053 22.9756 12.3435C22.9141 12.372 22.8155 12.425 22.7565 12.4612C22.5955 12.5598 22.261 12.8299 22.1971 12.9128C22.1661 12.9529 22.1158 13.0141 22.0852 13.0487C21.8453 13.321 21.6465 13.7456 21.5581 14.1749C21.5437 14.2443 21.5114 14.5881 21.5114 14.6704C21.5114 14.764 21.5451 15.0999 21.5638 15.193C21.5797 15.2719 21.67 15.5424 21.7413 15.7245C21.786 15.8386 21.9374 16.086 22.0555 16.2381C22.3045 16.5585 22.7469 16.9014 23.065 17.0205C23.1068 17.0361 23.1752 17.0621 23.217 17.0781C23.6349 17.238 24.2235 17.2636 24.679 17.1416C24.8478 17.0964 24.9078 17.0771 24.969 17.0484C25.0083 17.03 25.023 17.0301 25.045 17.0485C25.0694 17.0689 25.0724 17.4744 25.0724 20.7886C25.0724 24.9331 25.0827 24.5973 24.9471 24.8692C24.8293 25.1055 24.6213 25.2827 24.3662 25.3642C24.0259 25.4728 23.6363 25.3929 23.381 25.1622C23.2454 25.0396 23.1004 24.7947 23.0647 24.628C23.0512 24.5649 23.0414 23.7417 23.0337 22.0132C23.0256 20.2042 23.0165 19.465 23.0017 19.4004C22.9662 19.2458 22.95 19.1882 22.9047 19.0551C22.75 18.6 22.2454 18.0655 21.8198 17.9055C21.7792 17.8903 21.7118 17.8647 21.6701 17.8486C21.448 17.7632 21.3122 17.7483 20.6432 17.7359C20.3071 17.7297 20.0255 17.7179 20.0173 17.7097C20.0091 17.7014 19.9977 16.0391 19.992 14.0158C19.9846 11.4201 19.9756 10.305 19.9615 10.2288C19.8986 9.88916 19.777 9.60304 19.5839 9.34066C19.3771 9.05962 19.1684 8.8859 18.8351 8.71719C18.6361 8.61652 18.5425 8.58457 18.2946 8.5326C18.196 8.51195 11.5839 8.50539 11.5525 8.52592ZM17.9267 10.5904C17.952 10.6159 17.9548 10.8702 17.9548 13.1208C17.9548 15.3714 17.952 15.6257 17.9267 15.6512C17.9013 15.6767 17.6018 15.6795 14.8967 15.6795C12.1916 15.6795 11.8921 15.6767 11.8667 15.6512C11.8415 15.6257 11.8386 15.3714 11.8386 13.1208C11.8386 10.8702 11.8415 10.6159 11.8667 10.5904C11.8921 10.5649 12.1916 10.5621 14.8967 10.5621C17.6018 10.5621 17.9013 10.5649 17.9267 10.5904ZM24.1762 13.6421C24.2117 13.6513 24.289 13.6693 24.348 13.6821C24.5423 13.7242 24.849 13.9745 24.9517 14.1749C25.0087 14.286 25.0713 14.541 25.0719 14.6645C25.0732 14.9493 24.9083 15.2894 24.6894 15.4531C24.2869 15.754 23.8195 15.7544 23.4182 15.4541C23.2559 15.3328 23.1419 15.1503 23.0768 14.9082C23.0236 14.7101 23.0238 14.5941 23.0776 14.3938C23.1268 14.2105 23.1964 14.0944 23.3493 13.9404C23.4899 13.7987 23.6316 13.7094 23.7598 13.6816C23.8178 13.669 23.8894 13.652 23.9189 13.6439C23.994 13.6231 24.1 13.6224 24.1762 13.6421Z" fill="#8CD522"/>
              </svg>
              
              
      </div>
  </div>
  <div class="ONEAS-speed__line-bottom">
      <div class="ONEAS-speedometer__params">
          <svg class="icon__rem icon__speed-params" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="1">
              <g clip-path="url(#clip0_246_46)">
              <path d="M16.939 18.1422H18.3879L17.422 19.116L15.812 19.4406L13.5581 21.0638L14.6851 19.116L16.617 18.7915L16.939 18.1422Z" fill="#ffffff80"/>
              <path d="M30.3608 11.0007L33.1994 16.1354L28.2829 19.0999L25.4443 13.9652L30.3608 11.0007Z" fill="#ffffff80"/>
              <path d="M12.6617 21.6735L16.4836 26.2152L11.5671 29.1797L8.72852 24.0451L12.6617 21.6735Z" fill="#ffffff80"/>
              <path d="M18.5615 18.1156L21.4 23.2503L19.8871 23.478L18.9418 24.7326L16.4836 26.2148L13.645 21.0802L16.1033 19.5978L17.6162 19.3702L18.5615 18.1156Z" fill="#ffffff80"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5667 19.6135L24.5928 12.4249L19.6763 15.3895L24.2179 23.6049L29.1344 20.6404L28.5667 19.6135ZM28.5667 19.6135L24.6334 21.9851L21.2272 15.8235L24.1771 14.0448L28.5667 19.6135Z" fill="#ffffff80"/>
              <path d="M25.794 12.6238L24.8281 12.2992L25.794 13.5977L30.3019 11.0007L25.794 12.6238Z" fill="#ffffff80"/>
              </g>
              </g>
              <defs>
              <clipPath id="clip0_246_46">
              <rect width="25.6" height="20.8" fill="white" transform="translate(8 9.59998)"/>
              </clipPath>
              </defs>
              </svg>

              <svg class="icon__key icon__speed-params ONEAS-speedometer-param--active" width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="1">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M30.7378 19.8729C33.1401 18.4859 34.0617 15.585 32.7964 13.3935C31.5311 11.202 28.558 10.5497 26.1557 11.9366C24.4564 12.9177 23.4977 14.657 23.5305 16.3664L23.5621 16.3734L24.2244 18.6365L22.7442 16.8456L10.0298 24.1864L9.21631 26.1257L12.4038 26.6523L12.9812 24.8337L15.1948 25.3193L15.6781 25.0403L16.1356 23.6005L17.6113 23.9242L18.5778 23.3662L19.0354 21.9263L20.5111 22.2501L20.9944 21.971L21.6806 19.8112L23.8941 20.2968L25.1081 19.596C26.5954 20.7922 28.8442 20.9661 30.7378 19.8729ZM30.889 15.6704C31.4229 15.3622 31.6277 14.7176 31.3465 14.2306C31.0653 13.7436 30.4047 13.5986 29.8708 13.9068C29.337 14.215 29.1322 14.8597 29.4133 15.3467C29.6945 15.8337 30.3553 15.9786 30.889 15.6704Z" fill="#ffffff80"/>
                  </g>
                  </svg>

                  <svg class="icon__doors icon__speed-params" width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="1">
                      <path d="M22.9529 14.1275C24.9452 12.3655 27.404 12.2554 28.9756 14.1304C30.535 15.9909 30.8955 17.8968 28.9467 19.6634L24.7195 22.5954L23.1631 21.0991L26.8699 18.5024L26.9134 18.4639C27.8483 17.6372 28.0976 16.7275 27.2212 15.682C26.3451 14.6366 25.2772 14.9586 24.3425 15.7854L21.9252 17.5671L25.2705 23.0578L25.6425 25.4122L19.6149 15.2488L11.401 21.1207L11.3286 19.5283L19.5425 13.6563L20.7822 15.6911L22.9529 14.1275Z" fill="#ffffff80"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4014 21.1209L19.6635 16.3107L25.6429 25.4125L17.9318 30.6853L11.4014 21.1209ZM19.75 24.0417C19.1946 24.7037 18.2509 24.8262 17.6422 24.3153C17.0335 23.8046 16.9903 22.8541 17.5457 22.1921C18.1011 21.5302 19.0447 21.4077 19.6534 21.9185C20.2622 22.4293 20.3054 23.3798 19.75 24.0417Z" fill="#ffffff80"/>
                      </g>
                      </svg>

                      <svg class="icon__lights icon__speed-params" width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g opacity="1">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5728 15.5953C15.577 17.8868 16.8411 23.2742 21.8637 26.4915C22.4366 26.2544 23.0772 25.9539 23.7436 25.5971C21.5777 24.2704 18.5587 21.7868 18.0463 18.8862C19.4257 20.824 22.659 24.3545 25.5225 24.5373C28.8783 22.3165 31.9721 18.873 29.7639 15.0485C26.7179 9.77242 19.034 13.2147 15.5728 15.5953Z" fill="#ffffff80"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1456 29.4039L18.8889 26.1407C18.5718 25.8341 18.2734 25.52 17.9928 25.2005L12.4734 28.2396L13.1456 29.4039ZM11.8636 27.1834L17.2447 24.2828C16.9742 23.9249 16.7238 23.5627 16.4922 23.1988L11.1914 26.0191L11.8636 27.1834ZM10.5816 24.9629L15.8765 22.1486C15.6536 21.735 15.4535 21.3223 15.2742 20.9143L9.90943 23.7986L10.5816 24.9629ZM9.29963 22.7424L14.8018 19.7207C14.6307 19.2369 14.4884 18.7658 14.3714 18.3143L8.62744 21.5782L9.29963 22.7424Z" fill="#ffffff80" fill-opacity="0.85"/>
                          </g>
                          </svg>
                          
                      
                  
              
      </div>
      <div class="ONEAS-speedometer__params-button">
          <div class="button-param">SHIFT</div>
          <div class="button-param">L.CTRL</div>
          <div class="button-param">R.CTRL</div>
          <div class="button-param">ALT</div>
      </div>
  </div>`;
            const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, "ONEAS-speedometer", (prop, value) => this.onChangeInfo(prop, value));

            this.create(speedometerEl);

            //interface('Hud').speedometer.tachometer.show = 0;
            interface("Hud").speedometer.show = 0;
        },
    },
    colorChanger: {
        data: {
            defaultColor: "dialog-1",
            color: "",
            prevColor: "",
        },

        loadConfig() {
            const color = localStorage.getItem("hud-color");

            if (color === null) {
                this.data.color = this.data.defaultColor;
                this.saveConfig(this.data.defaultColor);
                return;
            }

            this.data.color = color;
        },

        saveConfig(color) {
            localStorage.setItem("hud-color", color);
        },

        applyHudColor(color) {
            document.body.classList.add(color);
        },

        removeHudColor(color) {
            document.body.classList.remove(color);
        },

        changeHudColor(color) {
            if (this.data.prevColor) this.removeHudColor(this.data.prevColor);

            this.applyHudColor(color);

            this.data.prevColor = color;

            if (color === this.data.color) return;

            this.data.color = color;
            this.saveConfig(color);
        },

        addMenuOption() {
            jsLoader.mainMenu.addNewOption(3, "Диалоговые окна", {
                data: [
                    {
                        id: "dialog-1",
                        value: "Вариант 1",
                    },
                    {
                        id: "dialog-2",
                        value: "Вариант 2",
                    },
                ],
                selectedId: this.data.color,
                callback: ({ id }) => {
                    this.changeHudColor(id);
                },
            });
        },

        init() {
            this.loadConfig();

            this.changeHudColor(this.data.color);

            this.addMenuOption();
        },
    },
    init() {
        this.hud.init();
        this.speedometer.init();
        this.colorChanger.init();

        jsLoader.showAddedScript(`HUD ${nameMod}`, "info");
    },
};

oneasHud.init();
