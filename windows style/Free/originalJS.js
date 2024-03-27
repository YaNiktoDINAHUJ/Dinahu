const vol = '2.0.1',
  lvl = 'Free',
  nameMod = 'Windows Style';

const defaultAdditionalScripts = [
  {
    name: 'About_Game',
    id: 'aboutGame',
    filePath: 'additional-scripts/aboutGame.js',
    enabled: true,
    is_hidden: true,
  },
];

const oneasHud = {
  getScale() {
    const { clientWidth, clientHeight } = document.documentElement;
    return (clientWidth + clientHeight) / (1920 + 1080);
  },
  wantedAlwaysShowClass: '',
  hud: {
    data: {
      hudEl: null,
      hud_topEl: null,
      hud_botREl: null,
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
        progress: null,
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
        value: null,
        image: null,
      },
      bonusEl: null,
      greenZoneEl: null,
    },
    createHud(hudEl) {
      this.data.hudEl = hudEl;
      this.data.hud_topEl = hudEl.querySelector('.ONEAS-hud__top');
      this.data.hud_botREl = hudEl.querySelector('.ONEAS-hud__bottom-right');
      this.data.hud_bottomEl = hudEl.querySelector('.ONEAS-hud__bottom');
      this.data.greenZoneEl = hudEl.querySelector('.ONEAS-radar__green-zone');
      this.data.server.wrapper = hudEl.querySelector('.ONEAS-info__logo');
      this.data.server.value = hudEl.querySelector('.ONEAS-logo__title-2');
      this.data.bonusEl = hudEl.querySelector('.ONEAS-logo__bonus');
      [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector('.ONEAS-info__wanted'), hudEl.querySelector('.ONEAS-wanted__row').children];
      this.data.hpEl.value = hudEl.querySelector('.ONEAS-param__health .ONEAS-param__amount');
      this.data.armourEl.value = hudEl.querySelector('.ONEAS-param__armour .ONEAS-param__amount');
      this.data.hungerEl.value = hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__amount');
      [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector('.ONEAS-param__breath'), hudEl.querySelector('.ONEAS-param__breath .ONEAS-param__amount')];
      [this.data.freezeEl.wrapper, this.data.freezeEl.value] = [hudEl.querySelector('.ONEAS-param__freeze'), hudEl.querySelector('.ONEAS-param__freeze .ONEAS-param__amount')];
      this.data.weaponEl.icon = hudEl.querySelector('.ONEAS-weapon__icon');
      this.data.weaponEl.ammoEl = hudEl.querySelector('.ONEAS-weapon__ammo').children;
      this.data.moneyEl = hudEl.querySelector('#ONEAS-cash__value');

      this.data.hud_topEl.style.transform = `scale(${oneasHud.getScale()})`;
      this.data.hud_bottomEl.style.transform = `scale(${oneasHud.getScale()})`;
      this.data.hud_botREl.style.transform = `scale(${oneasHud.getScale()})`;
    },
    onInfoChange(prop, value) {
      if ((prop == 'show' || prop == 'showBars') && +value >= 1) {
        this.data.hudEl.style.display = '';
      }

      if ((prop == 'show' || prop == 'showBars') && +value === 0) {
        this.data.hudEl.style.display = 'none';
      }

      if (prop == 'weapon') {
        this.data.weaponEl.icon.src = `images/weapon/${value}.png`;
      }

      if (prop === 'weapon' && value >= 16) {
        this.data.weaponEl.ammoEl[0].style.display = '';
        this.data.weaponEl.ammoEl[1].style.display = '';
        //document.querySelector('.ONEAS-weapon__ammo').style.height = '50px';
        // document.querySelector('.ONEAS-hud__top').style['grid-template-rows'] = '56px 140px 48px 45px'
      }

      if (prop === 'weapon' && value < 16) {
        this.data.weaponEl.ammoEl[0].style.display = 'none';
        this.data.weaponEl.ammoEl[1].style.display = 'none';
        // document.querySelector('.ONEAS-weapon__ammo').style.height = '0';
        // document.querySelector('.ONEAS-hud__top').style['grid-template-rows'] = '56px 97px 48px 45px'
      }

      if (prop == 'showGreenZoneTab') {
        this.data.greenZoneEl.style.display = '';
      }

      if (prop == 'hideGreenZoneTab') {
        this.data.greenZoneEl.style.display = 'none';
      }

      if (prop == 'health') {
        this.data.hpEl.value.innerText = value;
      }

      if (prop == 'armour') {
        this.data.armourEl.value.innerText = value;
      }

      if (prop == 'hunger') {
        this.data.hungerEl.value.innerText = value;
      }

      if (prop == 'breath') {
        if (value < 100) this.data.breathEl.wrapper.style.display = '';
        else this.data.breathEl.wrapper.style.display = 'none';

        this.data.breathEl.value.innerText = value;
      }

      if (prop == 'money') {
        //if (value > 999999999) value = 999999999;

        this.data.moneyEl.innerHTML = value.toLocaleString('DE');
      }

      if (prop == 'wanted') {
        if (value === 0 && oneasHud.wantedAlwaysShowClass.length === 0) {
          this.data.wanted.wrapper.style.display = 'none';
          //document.querySelector('.ONEAS-hud__wanted').style.right = '-700px'
          return;
        }

        this.data.wanted.wrapper.style.display = '';
        // document.querySelector('.ONEAS-hud__wanted').style.right = '0'

        for (let i = 0; i < 6; i += 1) {
          if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
            this.data.wanted.els[i].src = 'images/hud/wanted_inactive.svg';
            this.data.wanted.els[i].className = 'ONEAS-wanted__inactive';
          } else {
            this.data.wanted.els[i].src = 'images/hud/wanted_active.svg';
            this.data.wanted.els[i].className = 'ONEAS-wanted__active';
          }
        }
      }

      if (prop == 'ammoInClip') {
        this.data.weaponEl.ammoEl[0].innerText = value;
      }

      if (prop == 'totalAmmo') {
        this.data.weaponEl.ammoEl[1].innerText = value;
      }

      if (prop == 'setServer') {
        const servLength = 2;
        const serv = value;
        const zero = '0'.repeat(servLength - serv.toString().length);

        //this.data.moneyEl.innerHTML = `${zero}${serv}`
        // this.data.server.image.src = `images/logo/${value}.png`;
        this.data.server.value.innerText = `${zero}${serv}`;

        if (value > 0 && this.data.server.wrapper.style.display == 'none') this.data.server.wrapper.style.display = '';

        if (value <= 0) this.data.server.wrapper.style.display = 'none';
      }

      if (prop == 'setBonus') {
        if (value <= 1) this.data.bonusEl.style.display = 'none';
        else this.data.bonusEl.style.display = '';

        this.data.bonusEl.innerText = `x${value}`;
      }

      if (prop === "isShowFreeze" && value) {
        this.data.freezeEl.wrapper.style.display = '';
      }

      if (prop === "isShowFreeze" && !value) {
        this.data.freezeEl.wrapper.style.display = 'none';
      }

      if (prop == 'freeze') {
        this.data.freezeEl.value.innerText = value;
      }
    },
    init() {
      const hudHtml = `
                       <div class="ONEAS-hud__bottom">
                       <div class="ONEAS-radar">
                           <div class="ONEAS-radar__green-zone">
                             <div class="ONEAS-radar__green-zone-text">Безопасная зона</div>
                           </div>
                           <div class="ONEAS-radar__border">
                             <img src="images/hud/radar_border.png" class="ONEAS-radar__border-images">
                           </div>
                       </div>   
                       <div class="ONEAS-info"> 
                         <div class="ONEAS-info__logo">
                             <div class="ONEAS-logo__title">
                               <span class="ONEAS-logo__title-1">server</span><span class="ONEAS-logo__title-2">02</span>
                             </div>
                           <div class="ONEAS-logo__bonus">x2</div>
                         </div>
                         <div class="ONEAS-info__wanted ${oneasHud.wantedAlwaysShowClass}">
                           <div class="ONEAS-wanted__row">
                             <img src="images/hud/wanted_inactive.svg" alt="" class="ONEAS-wanted__inactive"> 
                             <img src="images/hud/wanted_inactive.svg" alt="" class="ONEAS-wanted__inactive"> 
                             <img src="images/hud/wanted_inactive.svg" alt="" class="ONEAS-wanted__inactive"> 
                             <img src="images/hud/wanted_active.svg" alt="" class="ONEAS-wanted__active"> 
                             <img src="images/hud/wanted_active.svg" alt="" class="ONEAS-wanted__active"> 
                             <img src="images/hud/wanted_active.svg" alt="" class="ONEAS-wanted__active"></div>
                         </div>
                         <div class="ONEAS-info__params">
                           <div class="ONEAS-param__health ONEAS-param"><img src="images/hud/health.svg" alt="" class="ONEAS-param__icon"><span
                               class="ONEAS-param__amount">50</span></div>
                           <div class="ONEAS-param__armour ONEAS-param"><img src="images/hud/armour.svg" alt="" class="ONEAS-param__icon"><span
                               class="ONEAS-param__amount">0</span></div>
                           <div class="ONEAS-param__hunger ONEAS-param"><img src="images/hud/hunger.svg" alt="" class="ONEAS-param__icon"><span
                               class="ONEAS-param__amount">0</span></div>
                           <div class="ONEAS-param__breath ONEAS-param"><img src="images/hud/breath.svg" alt="" class="ONEAS-param__icon"><span
                               class="ONEAS-param__amount">0</span></div>
                           <div style="display: none" class="ONEAS-param__freeze ONEAS-param"><img src="images/hud/freeze.svg" alt="" class="ONEAS-param__icon"><span
                               class="ONEAS-param__amount">0</span></div>
                         </div>
                       </div>   
                   </div>
                   <div class="ONEAS-hud__top">
                     <div class="ONEAS-weapon">
                       <img src="images/weapon/0.png" alt="" class="ONEAS-weapon__icon">
                       <div class="ONEAS-weapon__ammo">
                         <span id="ONEAS-ammo__in-clip">1</span>
                         <span id="ONEAS-ammo__total">1</span>
                       </div>
                     </div>
                   </div>
                   <div class="ONEAS-hud__bottom-right">
                     <div class="ONEAS-cash">
                       <div id="ONEAS-cash__text">i</div>
                       <div id="ONEAS-cash__value">0</div>
                     </div>
                   </div>`;
      const hudEl = jsLoader.hudInfo.addNewHud(hudHtml, 'ONEAS-hud', (prop, value) => void this.onInfoChange(prop, value));

      this.createHud(hudEl);

      interface('Hud').setBonus(interface('Hud').bonus);
      interface('Hud').setServer(interface('Hud').server);
      interface('Hud').info.health = interface('Hud').info.health;
      interface('Hud').info.armour = interface('Hud').info.armour;
      interface('Hud').info.hunger = interface('Hud').info.hunger;
      interface('Hud').info.breath = interface('Hud').info.breath;
      interface('Hud').info.ammoInClip = interface('Hud').info.ammoInClip;
      interface('Hud').info.totalAmmo = interface('Hud').info.totalAmmo;
      interface('Hud').info.money = interface('Hud').info.money;
      interface('Hud').info.wanted = 0;
      interface('Hud').info.weapon = interface('Hud').info.weapon;
      interface('Hud').info.show = 0;
      interface('Hud').hideGreenZoneTab();
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
        if (prop === 'damage') {
          isNaN(value * 100) ? (value = 0) : value;

          this.setDamage(+value);
        }

        if (prop === 'wash') {
          isNaN(value * 100) ? (value = 0) : value;

          this.setWash(+value);
        }

        if (prop === 'show' && +value == 1) {
          this.show();
        }

        if (prop === 'show' && +value == 0) {
          this.hide();
        }

        if (prop === 'speed') {
          this.setSpeed(value);
        }

        if (prop === 'mileage') {
          this.setMileage(value);
        }

        if (prop === 'fuel') {
          this.setFuel(value);
        }

        // // turns
        if (prop == 'left') {
          this.data.turnsEls[0].classList.toggle('ONEAS-speedometer-turn--active', +value);
        }

        if (prop == 'right') {
          this.data.turnsEls[1].classList.toggle('ONEAS-speedometer-turn--active', +value);
        }

        // // params
        if (prop == 'rem') {
          this.data.paramsEls[2].classList.toggle('ONEAS-speedometer-param--active', +value);
        }
        if (prop == 'doors') {
          this.data.paramsEls[3].classList.toggle('ONEAS-speedometer-param--active', +value);
        }
        if (prop == 'temperature') {
          this.data.paramsEls[0].classList.toggle('ONEAS-speedometer-param--active', +value);
        }
        if (prop == 'lights') {
          this.data.paramsEls[1].classList.toggle('ONEAS-speedometer-param--active', +value);
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
      this.data.speedometerEl.style.bottom = '3vh';
      document.querySelector('.ONEAS-hud__bottom-right').style.bottom = '11vh';
    },
    hide() {
      this.data.speedometerEl.style.bottom = '-700px';
      document.querySelector('.ONEAS-hud__bottom-right').style.bottom = '4.9vh';
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
      const maxSpeed = interface('Hud').speedometer.maxSpeed;
      this.data.speed.valueEl.innerText = speed;

      if (speed > maxSpeed) speed = maxSpeed;

      //const multiplier = this.barsValues.speed.dashArray - ((speed / maxSpeed) * this.barsValues.speed.dashArray);

      //this.data.speed.barEl.style.strokeDashoffset = multiplier;
    },
    //setDamage(floatDamage) {
    //     this.data.damage.valueEl.innerText = Math.floor(floatDamage * 100);
    //},
    setWash(floatWash) {
      this.data.wash.wrapperEl.classList.toggle('ONEAS-speedometer-danger', floatWash >= 0.75);

      this.data.wash.valueEl.innerText = Math.floor(floatWash * 100);
    },
    setFuel(fuel) {
      this.data.fuel.wrapperEl.classList.toggle('ONEAS-speedometer-danger', fuel <= 15);

      const maxFuel = window.interface('Hud').speedometer.maxFuel;

      this.data.fuel.valueEl.innerText = fuel;

      if (interface('Hud').speedometer.isElectro) this.data.fuel.textEl.innerText = '%';
      else this.data.fuel.textEl.innerText = 'л';

      if (fuel > maxFuel) fuel = maxFuel;

      //const dashOffset = this.barsValues.fuel.dashArray - (fuel / maxFuel) * this.barsValues.fuel.dashArray;

      //this.data.fuel.barEl.style.strokeDashoffset = dashOffset;
    },
    create(speedometerEl) {
      this.data.speedometerEl = speedometerEl;

      // SPEED
      this.data.speed.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-speed__value');
      //this.data.speed.barEl = speedometerEl.querySelector('.ONEAS-speedometer-speed__bar');

      // FUEL
      this.data.fuel.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__fuel');
      this.data.fuel.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__value');
      //this.data.fuel.barEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__bar');
      this.data.fuel.textEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__text');

      // WASH
      this.data.wash.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-wash__value');
      //this.data.wash.barEl = speedometerEl.querySelector('.ONEAS-speedometer-wash__bar');
      this.data.wash.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__wash');

      // DAMAGE
      //this.data.damage.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-damage__value');
      //this.data.damage.barEl = speedometerEl.querySelector('.ONEAS-speedometer-damage__bar');

      // MILEAGE
      this.data.mileageEl = speedometerEl.querySelector('.ONEAS-speedometer-mileage__value');

      // PARAMS
      this.data.paramsEls = speedometerEl.querySelector('.ONEAS-speedometer-params').children;

      // TURNS
      this.data.turnsEls = speedometerEl.querySelector('.ONEAS-speedometer__turns').children;

      // TACHOMETER
      //this.data.tachometer.bgEl = speedometerEl.querySelector('.ONEAS-speedometer-bg');
      //this.data.tachometer.barEl = speedometerEl.querySelector(".ONEAS-tachometer__arrow");
      this.data.tachometer.wrapper = speedometerEl.querySelector(".ONEAS-speedometer__tachometer");
      this.data.tachometer.gearEl = this.data.tachometer.wrapper.querySelector("#ONEAS-tachometer-gear");
      this.data.tachometer.rpmEl = this.data.tachometer.wrapper.querySelector('#ONEAS-tachometer-rpm .ONEAS-tachometer-value');

      this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale()})`;
    },
    init() {
      const text = `
      <div style="display: none" class="ONEAS-speedometer__tachometer">
          <div class="ONEAS-tachometer-bg">
              <div id="ONEAS-tachometer-gear">d4</div>            
              <div id="ONEAS-tachometer-rpm">
                   <div class="ONEAS-tachometer-value">1000</div>
                   <div class="ONEAS-tachometer-text">rpm</div>
              </div>
          </div>
      </div>
                       <div class="ONEAS-speedometer__block-left">
   <div class="ONEAS-speedometer__speed">
     <div class="ONEAS-speedometer-speed__data">
       <span class="ONEAS-speedometer-speed__value">0</span>
       <span class="ONEAS-speedometer-speed__text">km/h</span>
     </div>
   </div>
 </div>
 <div class="ONEAS-speedometer__block-right">
   <div class="ONEAS-speedometer__line-top">
     <div class="ONEAS-speedometer__turns">
       <div class="ONEAS-speedometer-turn__left ONEAS-turn__img">
         <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="img_turn"><path d="M14.8618 0L0 12.5L14.8618 25V15.3869L25 15.3869L14.8618 9.61339L14.8618 0Z" fill="#F4F1E1"></path></svg>
       </div>
       <div class="ONEAS-speedometer-turn__right ONEAS-turn__img">
         <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="img_turn"><path d="M10.1382 0L25 12.5L10.1382 25V15.3869L0 15.3869L10.1382 9.61339L10.1382 0Z" fill="#F4F1E1"></path></svg>
       </div>
     </div>
     <div class="ONEAS-speedometer__mileage">
       <span class="ONEAS-speedometer-mileage__value">000000</span>
     </div>
   </div>
   <div class="ONEAS-speedometer__line-med">
     <div class="ONEAS-speedometer__params">
       <div class="ONEAS-speedometer-params">
         <div class="ONEAS-spedometer-param__key ONEAS-speedometer-param--active"><svg width="38" height="13" viewBox="0 0 38 13" fill="none"
             xmlns="http://www.w3.org/2000/svg" class="" style="width:38px">
             <path fill-rule="evenodd" clip-rule="evenodd"
               d="M30.875 13C34.8101 13 38 10.0898 38 6.5C38 2.91022 34.8101 0 30.875 0C28.0914 0 25.6799 1.45669 24.5077 3.58008L24.5417 3.61111L23.75 6.86111L23.2019 3.61111H2.375L0 5.41667L3.5424 8.3246L5.54167 6.5L7.91667 8.66667H8.70833L10.2917 7.22222L11.875 8.66667H13.4583L15.0417 7.22222L16.625 8.66667H17.4167L19.7917 6.5L22.1667 8.66667H24.1551C25.1339 11.1913 27.7733 13 30.875 13ZM34.0417 7.94444C34.9161 7.94444 35.625 7.29774 35.625 6.5C35.625 5.70225 34.9161 5.05556 34.0417 5.05556C33.1672 5.05556 32.4583 5.70225 32.4583 6.5C32.4583 7.29774 33.1672 7.94444 34.0417 7.94444Z"
               fill="#F8F6ED"></path>
           </svg></div>
         <div class="ONEAS-spedometer-param__lights ONEAS-speedometer-param--active"><svg width="28" height="17" viewBox="0 0 28 17" fill="none"
             xmlns="http://www.w3.org/2000/svg" class="disabled" style="width:28px">
             <path fill-rule="evenodd" clip-rule="evenodd"
               d="M11.3409 0.0806263C9.82644 2.71501 7.70617 9.74003 11.3409 16.765C12.1561 16.8725 13.091 16.9521 14.0929 16.9843C12.4851 14.0246 10.6648 9.17071 11.9996 5.5C12.2988 8.63993 13.6711 14.8382 16.8385 16.9467C22.1648 16.6214 28.0007 14.718 28.0007 8.8619C28.0007 0.783128 16.8942 -0.358437 11.3409 0.0806263Z"
               fill="#F8F6ED"></path>
             <path fill-rule="evenodd" clip-rule="evenodd"
               d="M0 16.5796L8.15634 14.3903C7.99544 13.8279 7.86097 13.2695 7.75054 12.7165L0 14.7969V16.5796ZM0 13.1796L7.49998 11.1665C7.42664 10.5761 7.37921 9.99418 7.35454 9.42278L0 11.3969V13.1796ZM0 9.77965L7.3437 7.80844C7.36205 7.18561 7.40582 6.57898 7.47047 5.99167L0 7.9969V9.77965ZM0 6.37965L7.71931 4.30762C7.84365 3.63864 7.99254 3.00327 8.1576 2.40723L0 4.5969V6.37965Z"
               fill="#F8F6ED" fill-opacity="0.85"></path>
           </svg></div>
         <div class="ONEAS-spedometer-param__rem"><svg width="35" height="26" viewBox="0 0 35 26" fill="none"
             xmlns="http://www.w3.org/2000/svg" class="" style="width:35px">
             <path
               d="M11.7434 10.2143H13.8158L12.4342 11.6071L10.1316 12.0714L6.90789 14.3929L8.51974 11.6071L11.2829 11.1429L11.7434 10.2143Z"
               fill="white"></path>
             <path d="M30.9402 0L35 7.34393L27.9681 11.5839L23.9083 4.24002L30.9402 0Z" fill="white"></path>
             <path d="M5.62548 15.2641L11.0917 21.76L4.05984 26L0 18.6561L5.62548 15.2641Z" fill="white"></path>
             <path
               d="M14.0637 10.176L18.1235 17.52L15.9596 17.8456L14.6076 19.64L11.0917 21.76L7.03185 14.4161L10.5478 12.296L12.7117 11.9704L14.0637 10.176Z"
               fill="white"></path>
             <path fill-rule="evenodd" clip-rule="evenodd"
               d="M28.3741 12.3183L22.6903 2.03684L15.6585 6.27686L22.1542 18.0271L29.1861 13.7871L28.3741 12.3183ZM28.3741 12.3183L22.7486 15.7103L17.8768 6.89764L22.0959 4.35363L28.3741 12.3183Z"
               fill="white"></path>
             <path d="M24.4079 2.32143L23.0263 1.85714L24.4079 3.71429L30.8553 0L24.4079 2.32143Z" fill="white"></path>
           </svg></div>
         <div class="ONEAS-spedometer-param__doors"><svg width="19" height="26" viewBox="0 0 19 26" fill="none"
             xmlns="http://www.w3.org/2000/svg" class="" style="width:19px">
             <path
               d="M7 5.07031C7.50705 1.68141 9.84258 -0.463552 12.9465 0.0855578C16.0262 0.630379 17.9604 2.21279 17.5 5.57028L15.7561 11.9648L12.981 11.7769L14.4889 6.14426L14.5 6.07028C14.7379 4.48018 14.2306 3.37592 12.5 3.06976C10.7694 2.7636 9.98231 3.96572 9.7444 5.55582L8.83418 9.31615L16.6829 11.9648L19 13.9804L4.63415 8.94136L1.39024 21.539L0 20.0273L3.2439 7.42965L6.15253 8.41119L7 5.07031Z"
               fill="#F8F6ED"></path>
             <path fill-rule="evenodd" clip-rule="evenodd"
               d="M1.39024 21.539L5.56098 9.94918L19 13.9804L15.7561 25.5703L1.39024 21.539ZM12.0488 17.5078C12.0488 18.621 11.2189 19.5234 10.1951 19.5234C9.17137 19.5234 8.34146 18.621 8.34146 17.5078C8.34146 16.3946 9.17137 15.4922 10.1951 15.4922C11.2189 15.4922 12.0488 16.3946 12.0488 17.5078Z"
               fill="#F8F6ED"></path>
           </svg></div>
       </div>
     </div>
   </div>
   <div class="ONEAS-speedometer__line-bot">
     <div class="ONEAS-speedometer__fuel">
       <div class="ONEAS-speedometer-fuel__data ONEAS-speedometer-data">
         <div class="ONEAS-speedometer-fuel__icon">
           <svg class="ONEAS-fuel__icon ONEAS-speedometer-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M1.32999 1.60001H8.30846V8.08006H8.5992C9.56272 8.08006 10.3438 8.80533 10.3438 9.70006C10.3438 9.9983 10.6042 10.2401 10.9254 10.2401C11.2465 10.2401 11.5069 9.9983 11.5069 9.70006V5.06372L9.35109 3.06188L10.1735 2.29821L12.67 4.61637V9.70006C12.67 10.5947 11.8889 11.3201 10.9254 11.3201C9.96183 11.3201 9.18078 10.5947 9.18078 9.70006C9.18078 9.40182 8.92039 9.16006 8.5992 9.16006H8.30846V12.4H1.32999V1.60001ZM2.49307 2.68001H7.14535V5.92001H2.49307V2.68001Z" fill="#F2EFDC"/>
             </svg>
             
         </div>
         <div class="ONEAS-speedometer-fuel__value ONEAS-speedometer-proc__data">0</div>
         <div class="ONEAS-speedometer-fuel__text ONEAS-speedometer-data__text">%</div>
       </div>
     </div>
     <div class="ONEAS-speedometer__wash">
       <div class="ONEAS-speedometer-data">
         <div class="ONEAS-speedometer-wash__icon">
           <svg class="ONEAS-wash__icon ONEAS-speedometer-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7416 7.48572L6.99449 1.20001L3.24736 7.48572C2.40886 8.89229 2.71893 10.6054 4.01447 11.7241C5.66029 13.1451 8.32869 13.1451 9.97449 11.7241C11.2701 10.6054 11.5801 8.89229 10.7416 7.48572ZM6.15286 10.8763C6.54733 10.6218 6.47418 9.94916 5.98947 9.37387C5.50476 8.79858 4.79204 8.5385 4.39757 8.79301C4.00309 9.04747 4.07624 9.72012 4.56095 10.2954C5.04566 10.8706 5.75838 11.1307 6.15286 10.8763Z" fill="#F2EFDC"/>
             </svg>            
         </div>
         <div class="ONEAS-speedometer-wash__value ONEAS-speedometer-proc__data">0</div>
         <div class="ONEAS-speedometer-wash__text ONEAS-speedometer-data__text">%</div>
       </div>
     </div>
     </div>
 </div>`;
      const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, 'ONEAS-speedometer', (prop, value) => this.onChangeInfo(prop, value));

      this.create(speedometerEl);
    },
  },
  init() {
    this.hud.init();
    this.speedometer.init();
    jsLoader.showAddedScript(`HUD ${nameMod}`, 'info');
  },
};

oneasHud.init();
