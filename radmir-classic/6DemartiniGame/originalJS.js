const vol = "1.0.1",
    lvl = "Demartini Game",
    nameMod = "Radmir Classic";

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
        name: "PageSize",
        id: "pagesize",
        filePath: "additional-scripts/pageSize.js",
        enabled: true,
        is_hidden: true,
    },
];

const oneasHud = {
    getScale() {
        const { clientWidth, clientHeight } = document.documentElement;
        return (clientWidth + clientHeight) / (1920 + 1080);
    },
    wantedAlwaysShowClass: "",
    hud: {
        data: {
            hudEl: null,
            hud_baseEl: null,
            hud_btEl: null,
            moneyEl: null,
            hpEl: {
                value: null,
                progress: null,
            },
            armourEl: {
                value: null,
                progress: null,
                wrapper: null,
            },
            hungerEl: {
                value: null,
                progress: null,
            },
            freezeEl: {
                wrapper: null,
                value: null,
                progress: null,
            },
            breathEl: {
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
                icon: null,
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
            this.data.hud_baseEl = hudEl.querySelector(".ONEAS-hud-info");
            this.data.moneyEl = hudEl.querySelector("#ONEAS-cash__value");
            this.data.hud_btEl = hudEl.querySelector(".ONEAS-hud-bottom");
            [this.data.hpEl.progress, this.data.hpEl.value] = [hudEl.querySelector(".ONEAS-param__health .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__health .ONEAS-param__amount")];
            [this.data.armourEl.wrapper, this.data.armourEl.progress, this.data.armourEl.value] = [hudEl.querySelector(".ONEAS-param__armour"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-param__amount")];
            [this.data.breathEl.wrapper, this.data.breathEl.progress, this.data.breathEl.value] = [hudEl.querySelector(".ONEAS-param__breath"), hudEl.querySelector(".ONEAS-param__breath .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__breath .ONEAS-param__amount")];
            [this.data.hungerEl.progress, this.data.hungerEl.value] = [hudEl.querySelector(".ONEAS-param__hunger .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__hunger .ONEAS-param__amount")];
            [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector(".ONEAS-wanted"), hudEl.querySelector(".ONEAS-wanted__row").children];
            this.data.weaponEl.ammoEl = hudEl.querySelector(".ONEAS-weapon__ammo").children;
            this.data.server.wrapper = hudEl.querySelector(".ONEAS-logo");
            this.data.server.image = this.data.server.wrapper.children[0];
            this.data.bonusEl = hudEl.querySelector(".ONEAS-logo__bonus");
            this.data.greenZoneEl = hudEl.querySelector(".ONEAS-green-zone");
            this.data.weaponEl.icon = hudEl.querySelector(".ONEAS-weapon__icon");
            [this.data.freezeEl.wrapper, this.data.freezeEl.value, this.data.freezeEl.progress] = [hudEl.querySelector(".ONEAS-param__freeze"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-param__amount"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-progress__value")];

            this.data.server.wrapper.style.transform = `scale(${oneasHud.getScale()})`;
            this.data.hud_baseEl.style.transform = `scale(${oneasHud.getScale()})`;
            this.data.hud_btEl.style.transform = `scale(${oneasHud.getScale()})`;
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

                if ((value == 0) | (value == 24) | (value == 25) | (value == 31)) (document.querySelector(".ONEAS-weapon__icon").style.top = "87px"), (document.querySelector(".ONEAS-weapon__icon").style.right = "21px");
                else (document.querySelector(".ONEAS-weapon__icon").style.top = ""), (document.querySelector(".ONEAS-weapon__icon").style.right = "");
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

                this.data.armourEl.progress.style.width = `${value}%`;
                this.data.armourEl.value.innerText = value;
            }

            if (prop == "hunger") {
                this.data.hungerEl.progress.style.width = `${value}%`;
                this.data.hungerEl.value.innerText = value;
            }

            if (prop == "breath") {
                if (value < 100) this.data.breathEl.wrapper.style.display = "";
                else this.data.breathEl.wrapper.style.display = "none";

                this.data.breathEl.progress.style.width = `${value}%`;
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
                this.data.server.image.src = `images/logo/${value}.png`;

                if (value > 0 && this.data.server.wrapper.style.display == "none") this.data.server.wrapper.style.display = "";

                if (value <= 0) this.data.server.wrapper.style.display = "none";
            }

            if (prop == "setBonus") {
                if (value <= 1) this.data.bonusEl.style.display = "none";
                else this.data.bonusEl.style.display = "";

                this.data.bonusEl.innerText = `x${value}`;
            }

            if (prop === "isShowFreeze" && value) {
              this.data.freezeEl.wrapper.style.display = '';
            }
      
            if (prop === "isShowFreeze" && !value) {
              this.data.freezeEl.wrapper.style.display = 'none';
            }

            if (prop == "freeze") {
                this.data.freezeEl.progress.style.width = `${value}%`;
                this.data.freezeEl.value.innerText = value;
            }
        },
        init() {
            const hudHtml = `
      <div class="ONEAS-logo"> 
          <img src="images/logo/1.png" class="ONEAS-logo__image">
          <div class="ONEAS-logo__bonus">x2</div>
        </div>
        
        <div class="ONEAS-hud-info">
          <div class="ONEAS-weapon"> <img src="images/hud/weapon_back.png" alt="" class="ONEAS-weapon__back"> <img src="images/weapon/0.png" alt="" class="ONEAS-weapon__icon">
            <div class="ONEAS-weapon__ammo"> <span id="ONEAS-ammo__in-clip">1</span> <span id="ONEAS-ammo__total">1</span> </div>
          </div>
          <div class="ONEAS-cash"> <img src="images/hud/cash.png" alt="" class="ONEAS-cash__icon">
            <div id="ONEAS-cash__value">10000</div>
          </div>
          <div class="ONEAS-params">
              <div class="ONEAS-param__health ONEAS-param"> <img src="images/hud/health.png" alt="" class="ONEAS-param__icon">
                <div class="ONEAS-param__progress">
                  <div class="ONEAS-progress__value"> <img src="images/hud/circle.png" alt="" class="ONEAS-param__circle"> </div>
                </div> <span class="ONEAS-param__amount">50</span> </div>
      
              <div class="ONEAS-param__armour ONEAS-param"> <img src="images/hud/armour.png" alt="" class="ONEAS-param__icon">
                <div class="ONEAS-param__progress">
                  <div class="ONEAS-progress__value"> <img src="images/hud/circle.png" alt="" class="ONEAS-param__circle"> </div>
                </div><span class="ONEAS-param__amount">0</span> </div>
      
              <div class="ONEAS-param__hunger ONEAS-param"> <img src="images/hud/hunger.png" alt="" class="ONEAS-param__icon">
                <div class="ONEAS-param__progress">
                  <div class="ONEAS-progress__value"> <img src="images/hud/circle.png" alt="" class="ONEAS-param__circle"> </div>
                </div><span class="ONEAS-param__amount">0</span> </div>
                
              <div style="display: none" class="ONEAS-param__freeze ONEAS-param"> <img src="images/hud/freeze.png"" alt="" class="ONEAS-param__icon">
                <div class="ONEAS-param__progress">
                  <div class="ONEAS-progress__value"> <img src="images/hud/circle.png" alt="" class="ONEAS-param__circle"> </div>
                </div><span class="ONEAS-param__amount">20</span> </div>
          
              <div style="display: none" class="ONEAS-param__breath ONEAS-param"> <img src="images/hud/breath.png" alt="" class="ONEAS-param__icon">
                  <div class="ONEAS-param__progress">
                    <div class="ONEAS-progress__value"> <img src="images/hud/circle.png" alt="" class="ONEAS-param__circle"> </div>
                  </div><span class="ONEAS-param__amount">70</span> </div>
          </div>
          <div class="ONEAS-wanted ${oneasHud.wantedAlwaysShowClass}"> <img src="images/hud/wanted_back.png" alt="" class="ONEAS-wanted__back">
            <div class="ONEAS-wanted__row"> <img src="images/hud/active.png" alt="" class="ONEAS-wanted__inactive"> <img src="images/hud/active.png" alt="" class="ONEAS-wanted__inactive"> <img src="images/hud/active.png" alt="" class="ONEAS-wanted__inactive"> <img src="images/hud/active.png" alt="" class="ONEAS-wanted__active"> <img src="images/hud/active.png" alt="" class="ONEAS-wanted__active"> <img src="images/hud/active.png" alt="" class="ONEAS-wanted__active"> </div>
          </div>
        </div>
      
      <div class="ONEAS-hud-bottom">
        <div class="ONEAS-green-zone"> <img src="images/hud/zone.png" alt="" class="ONEAS-green-zone__image">
          <div class="ONEAS-green-zone__text">
            <div>Безопасная зона</div>
            <div>Вы находитесь в безопасной зоне.</div>
          </div>
        </div>
        <div class="ONEAS-radar-border"><img src="images/hud/border.png" class="ONEAS-radar__images"></div>
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
                dashArray: 504,
                dashOffset: 504,
            },
            fuel: {
                dashArray: 171,
                dashOffset: 0,
            },
            wash: {
                dashArray: 172,
                dashOffset: 172,
            },
            damage: {
                dashArray: 172,
                dashOffset: 172,
            },
        },
        data: {
            speedometerEl: null,
            speed: {
                valueEl: null,
                barEl: null,
            },
            fuel: {
                progress: null,
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
                if (prop === "damage") {
                    isNaN(value * 100) ? (value = 0) : value;

                    this.setDamage(+value);
                }

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
                    this.data.paramsEls[3].classList.toggle("ONEAS-spedometer-param--active", +value);
                }
                if (prop == "doors") {
                    this.data.paramsEls[2].classList.toggle("ONEAS-spedometer-param--active", +value);
                }
                if (prop == "temperature") {
                    this.data.paramsEls[0].classList.toggle("ONEAS-spedometer-param--active", +value);
                }
                if (prop == "lights") {
                    this.data.paramsEls[1].classList.toggle("ONEAS-spedometer-param--active", +value);
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
            // document.querySelector('.ONEAS-hud__green-zone').style.bottom = '25vh'
            //document.querySelector('.ONEAS-speedometer__progress-bar').style.bottom = '660px'//'61vh'
            //this.data.speedometerEl.style.bottom = '4vh';
            //this.data.speedometerEl.style.opasity = '1';
        },
        hide() {
            this.data.speedometerEl.style.display = "none";
            // document.querySelector('.ONEAS-hud__green-zone').style.bottom = '5vh'
            //document.querySelector('.ONEAS-speedometer__progress-bar').style.bottom = '10px'//'18vh'
            //this.data.speedometerEl.style.bottom = '-700px';
            //this.data.speedometerEl.style.opasity = '0';
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
            // const htmlValues = this.getBigSizeValue(km);
            //   this.data.mileageEl.innerHTML = htmlValues;
            this.data.mileageEl.innerText = km;
        },
        setSpeed(speed) {
            const maxSpeed = interface("Hud").speedometer.maxSpeed;
            this.data.speed.valueEl.innerText = speed;

            if (speed > maxSpeed) speed = maxSpeed;

            const multiplier = this.barsValues.speed.dashArray - (speed / maxSpeed) * this.barsValues.speed.dashArray;

            this.data.speed.barEl.style.strokeDashoffset = multiplier;
            //this.data.speed.barEl.style.transform = `rotate(${deg}deg) scale(-1)`;
        },
        setDamage(floatDamage) {
            const multiplier = this.barsValues.damage.dashArray - floatDamage * this.barsValues.damage.dashArray;

            //this.data.damage.valueEl.innerText = Math.round(floatDamage * 100);

            this.data.damage.barEl.style.strokeDashoffset = multiplier;
        },
        setWash(floatWash) {
            this.data.wash.wrapperEl.classList.toggle("ONEAS-speedometer-danger", floatWash >= 0.75);

            const multiplier = this.barsValues.wash.dashArray - floatWash * this.barsValues.wash.dashArray;

            //this.data.wash.valueEl.innerText = Math.round(floatWash * 100);

            this.data.wash.barEl.style.strokeDashoffset = multiplier;
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
            this.data.speed.valueEl = speedometerEl.querySelector(".ONEAS-speed__value");
            this.data.speed.barEl = speedometerEl.querySelector(".ONEAS-speed__bar");

            // FUEL
            this.data.fuel.valueEl = speedometerEl.querySelector(".ONEAS-fuel__value");
            //this.data.fuel.barEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__bar');
            this.data.fuel.textEl = speedometerEl.querySelector(".ONEAS-fuel__text");
            this.data.fuel.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__fuel");

            // WASH
            //this.data.wash.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-wash__value');
            this.data.wash.barEl = speedometerEl.querySelector(".ONEAS-wash__bar");
            this.data.wash.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__wash");

            // DAMAGE
            //this.data.damage.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-damage__value');
            this.data.damage.barEl = speedometerEl.querySelector(".ONEAS-damage__bar");

            // MILEAGE
            this.data.mileageEl = speedometerEl.querySelector(".ONEAS-speed__mileage");

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
      

            this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale() + 0.2})`;
        },
        init() {
            const text = `
            <div style="display: none" class="ONEAS-speedometer__tachometer">
                    <div id="ONEAS-tachometer-gear">d4</div>
                    <div id="ONEAS-tachometer-rpm">1000</div>
                </div>
                <div class="ONEAS-speedometer__params">
      <img src="images/speed/temperature.ff0342b4.svg" alt="" class="icon__params icon__key">
      <img src="images/speed/lights.b80a81e1.svg" alt="" class="icon__params icon__lights">
      <img src="images/speed/doors.0d81e32e.svg" alt="" class="icon__params icon__doors ONEAS-spedometer-param--active">
      <img src="images/speed/rem.8c1c949b.svg" alt="" class="icon__params icon__rem ONEAS-spedometer-param--active">
      <div class="ONEAS-speedometer__fuel">
        <img class="fuel__icon" src="images/speed/fuel.b29d3d45.svg" alt="">
        <div class="ONEAS-fuel__value ONEAS-speedometer-fuel__data">50</div>
        <div class="ONEAS-fuel__text ONEAS-speedometer-fuel__data">%</div>
      </div>
    </div>
    
    <div class="ONEAS-speedometer__main">
      <img src="images/speed/play.031947a7.png" alt="" class="ONEAS-speedometer-bg">
      <div class="ONEAS-speedometer__damage">           
      <img src="images/speed/damage.2ad5b799.svg" alt="" class="main-icon damage__icon">                  
      </div>
              
      <div class="ONEAS-speedometer__speed">
        <div class="ONEAS-speed__data">
          <div class="ONEAS-speed__value">228</div>
          <div class="ONEAS-speed__text">км/ч</div>
          <div class="ONEAS-speed__mileage">000340</div>
          <div class="ONEAS-speedometer__turns">
            <img src="images/speed/turn.90c133f9.svg" alt="" class="turn__left">
            <img src="images/speed/turn.90c133f9.svg" alt="" class="turn__right">
          </div>
        </div>
        <svg class="ONEAS-speed__bar" width="249" height="249" viewBox="0 0 249 249" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M77.1398 208.853C58.8077 198.269 44.4618 181.954 36.31 162.418C28.1581 142.883 26.6521 121.21 32.0237 100.735C37.3953 80.2594 49.3467 62.1168 66.0388 49.099C82.7309 36.0812 103.238 28.9096 124.405 28.6879C145.572 28.4662 166.225 35.2068 183.187 47.8722C200.148 60.5376 212.476 78.4259 218.276 98.7841C224.075 119.142 223.023 140.842 215.282 160.544C207.541 180.246 193.54 196.858 175.433 207.824" stroke="url(#paint0_linear_2353_2)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <defs>
            <linearGradient id="paint0_linear_2353_2" x1="27.3633" y1="27.1826" x2="223.47" y2="27.1826" gradientUnits="userSpaceOnUse">
              <stop offset="0.05" stop-color="#F5BE09" />
              <stop offset="1" stop-color="#E9651B" />
            </linearGradient>
          </defs>
        </svg>
        <svg class="ONEAS-speed__bar-bg" width="249" height="249" viewBox="0 0 249 249" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M77.1398 208.853C58.8077 198.269 44.4618 181.954 36.31 162.418C28.1581 142.883 26.6521 121.21 32.0237 100.735C37.3953 80.2594 49.3467 62.1168 66.0388 49.099C82.7309 36.0812 103.238 28.9096 124.405 28.6879C145.572 28.4662 166.225 35.2068 183.187 47.8722C200.148 60.5376 212.476 78.4259 218.276 98.7841C224.075 119.142 223.023 140.842 215.282 160.544C207.541 180.246 193.54 196.858 175.433 207.824" stroke="black" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg class="ONEAS-speed__bar-line" width="249" height="249" viewBox="0 0 249 249" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.8535 124.767H57.2046" stroke="white" stroke-width="2.49998" />
          <path d="M124.66 56.8145V27.4634" stroke="white" stroke-width="2.49998" />
          <path d="M51.5567 61.6441L75.2256 75.0704" stroke="white" stroke-width="2.49998" />
          <path d="M222.928 124.767H192.579" stroke="white" stroke-width="2.49998" />
          <path d="M180.046 77.1422L197.761 59.8974" stroke="white" stroke-width="2.49998" />
        </svg>
          <svg class="ONEAS-damage__bar" width="278" height="278" viewBox="0 0 278 278" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.7773 139.778C31.7773 125.543 34.5911 111.45 40.0569 98.3067C45.5227 85.1637 53.5326 73.2308 63.6261 63.1943C73.7196 53.1577 85.6976 45.2153 98.8712 39.824C112.045 34.4326 126.154 31.6986 140.388 31.7791" stroke="url(#paint0_linear_2071_131)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
              <linearGradient id="paint0_linear_2071_131" x1="30.2773" y1="30.2773" x2="249.278" y2="30.2773" gradientUnits="userSpaceOnUse">
                <stop offset="0.05" stop-color="#F5BE09" />
                <stop offset="1" stop-color="#E9651B" />
              </linearGradient>
            </defs>
          </svg>         
          <svg class="ONEAS-damage__bar-bg" width="278" height="278" viewBox="0 0 278 278" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.7773 139.778C31.7773 125.541 34.5922 111.444 40.0601 98.299C45.5279 85.1539 53.5408 73.2196 63.6379 63.1826C73.7349 53.1456 85.7167 45.204 98.8942 39.8146C112.072 34.4252 126.185 31.6944 140.421 31.7793" stroke="black" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>  
          <svg class="ONEAS-wash__bar" width="278" height="278" viewBox="0 0 278 278" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M247.778 139.77C247.779 154.033 244.955 168.154 239.469 181.32C233.982 194.485 225.943 206.434 215.814 216.475C205.685 226.517 193.668 234.452 180.455 239.824C167.243 245.196 153.097 247.898 138.835 247.774" stroke="url(#paint0_linear_2071_136)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
              <linearGradient id="paint0_linear_2071_136" x1="30.2773" y1="30.2773" x2="249.278" y2="30.2773" gradientUnits="userSpaceOnUse">
                <stop offset="0.05" stop-color="#F5BE09" />
                <stop offset="1" stop-color="#E9651B" />
              </linearGradient>
            </defs>
          </svg>         
          <svg class="ONEAS-wash__bar-bg" width="278" height="278" viewBox="0 0 278 278" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M247.778 139.778C247.778 154.039 244.953 168.159 239.467 181.324C233.981 194.488 225.942 206.435 215.814 216.475C205.686 226.516 193.669 234.451 180.458 239.823C167.247 245.195 153.103 247.897 138.842 247.774" stroke="black" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>   
      </div>

      <div class="ONEAS-speedometer__wash">
        <img src="images/speed/wash.59b5a8da.svg" alt="" class="main-icon wash__icon">             
      </div>         
    </div>`;
            const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, "ONEAS-speedometer", (prop, value) => this.onChangeInfo(prop, value));

            this.create(speedometerEl);
            interface("Hud").speedometer.show = 0;
        },
    },
    init() {
        this.hud.init();
        this.speedometer.init();

        jsLoader.showAddedScript(`HUD ${lvl}`, "info");
    },
};

oneasHud.init();
