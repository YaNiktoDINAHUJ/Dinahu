const vol = '1.0.1',
  lvl = 'Free',
  nameMod = 'Happy New Year';

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
      hud_bottomEl: null,
      hud_radarEL: null,
      moneyEl: null,
      hpEl: {
        value: null,
      },
      armourEl: {
        wrapper: null,
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
      this.data.hud_topEl = hudEl.querySelector('.ONEAS-hud__top');
      this.data.hud_bottomEl = hudEl.querySelector('.ONEAS-hud__bottom');
      this.data.hud_radarEL = hudEl.querySelector('.ONEAS-hud__radar-border');
      this.data.moneyEl = hudEl.querySelector('#ONEAS-cash__value');
      this.data.hpEl.value = hudEl.querySelector('.ONEAS-param__health .ONEAS-param__amount');
      [this.data.armourEl.wrapper, this.data.armourEl.value] = [hudEl.querySelector('.ONEAS-param__armour'), hudEl.querySelector('.ONEAS-param__armour .ONEAS-param__amount')];
      this.data.hungerEl.value = hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__amount');
      [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector('.ONEAS-param__breath'), hudEl.querySelector('.ONEAS-param__breath .ONEAS-param__amount')];
      [this.data.freezeEl.wrapper, this.data.freezeEl.value] = [hudEl.querySelector('.ONEAS-param__freeze'), hudEl.querySelector('.ONEAS-param__freeze .ONEAS-param__amount')];
      [this.data.wanted.wrapper, this.data.wanted.value] = [hudEl.querySelector('.ONEAS-hud__wanted'), hudEl.querySelector('.ONEAS-wanted__amount')];
      this.data.weaponEl.ammoEl = hudEl.querySelector('.ONEAS-weapon__ammo').children;
      this.data.weaponEl.wrapper = hudEl.querySelector('.ONEAS-weapon__ammo');
      this.data.server.wrapper = hudEl.querySelector('.ONEAS-hud__logo');
      this.data.server.image = this.data.server.wrapper.children[0];
      this.data.bonusEl = hudEl.querySelector('.ONEAS-logo__bonus');
      //this.data.bonusEl.image = hudEl.querySelector('.ONEAS-bonus__image');
      this.data.greenZoneEl = hudEl.querySelector('.ONEAS-hud__green-zone');
      this.data.weaponEl.icon = hudEl.querySelector('.ONEAS-weapon__icon');

      this.data.hud_radarEL.style.transform = `scale(${oneasHud.getScale()})`;
      this.data.greenZoneEl.style.transform = `scale(${oneasHud.getScale()})`;
      this.data.hud_topEl.style.transform = `scale(${oneasHud.getScale()})`;
      this.data.hud_bottomEl.style.transform = `scale(${oneasHud.getScale()})`;
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
        this.data.weaponEl.wrapper.style.opacity = '1';
        //document.querySelector('.ONEAS-weapon__ammo').style.height = '50px';
        // document.querySelector('.ONEAS-hud__top').style['grid-template-rows'] = '56px 140px 48px 45px'
      }

      if (prop === 'weapon' && value < 16) {
        this.data.weaponEl.ammoEl[0].style.display = 'none';
        this.data.weaponEl.ammoEl[1].style.display = 'none';
        this.data.weaponEl.wrapper.style.opacity = '0';
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
        if (value > 0) this.data.armourEl.wrapper.style.display = '';
        else this.data.armourEl.wrapper.style.display = 'none';

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
        if (value > 999999999) value = 999999999;

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
        this.data.wanted.value.innerText = value;

        //for (let i = 0; i < 6; i += 1) {
        //     if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
        //          this.data.wanted.els[i].src = 'images/hud/wanted_inactive.png';
        //          this.data.wanted.els[i].className = 'ONEAS-wanted__inactive'
        //     }
        //     else {
        //          this.data.wanted.els[i].src = 'images/hud/wanted_active.png';
        //          this.data.wanted.els[i].className = 'ONEAS-wanted__active'
        //     }
        //}
      }

      if (prop == 'ammoInClip') {
        this.data.weaponEl.ammoEl[0].innerText = value;
      }

      if (prop == 'totalAmmo') {
        this.data.weaponEl.ammoEl[1].innerText = value;
      }

      if (prop == 'setServer') {
        this.data.server.image.src = `images/logo/${value}.png`;
        //this.data.server.value.innerText = value;

        if (value > 0 && this.data.server.wrapper.style.display == 'none') this.data.server.wrapper.style.display = '';

        if (value <= 0) this.data.server.wrapper.style.display = 'none';
      }

      if (prop == 'setBonus') {
        if (value <= 1) this.data.bonusEl.style.display = 'none';
        else this.data.bonusEl.style.display = '';

        //this.data.bonusEl.image.src = `images/hud/bonus_${value}.png`;
        this.data.bonusEl.children[0].src = `images/hud/bonus_${value}.png`;

        //this.data.bonusEl.innerText = `x${value}`;
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
    <div class="ONEAS-hud__params">
      <div class="ONEAS-param__health ONEAS-param">
        <img src="images/hud/icon_health.png" alt="" class="ONEAS-param__icon">
        <span class="ONEAS-param__amount">50</span>
      </div>
      <div class="ONEAS-param__armour ONEAS-param"><img src="images/hud/icon_armour.png" alt="" class="ONEAS-param__icon"><span class="ONEAS-param__amount">0</span></div>
      <div class="ONEAS-param__hunger ONEAS-param"><img src="images/hud/icon_hunger.png" alt="" class="ONEAS-param__icon"><span class="ONEAS-param__amount">0</span></div>
      <div class="ONEAS-param__breath ONEAS-param"><img src="images/hud/icon_lungs.png" alt="" class="ONEAS-param__icon"><span class="ONEAS-param__amount">0</span></div>
      <div style="display: none" class="ONEAS-param__freeze ONEAS-param"><img src="images/hud/icon_freeze.png" alt="" class="ONEAS-param__icon"><span class="ONEAS-param__amount">0</span></div>
    </div>
    <div class="ONEAS-hud__wanted ${oneasHud.wantedAlwaysShowClass}">
        <img src="images/hud/icon_star.png" alt="" class="ONEAS-wanted__icon">
        <span class="ONEAS-wanted__amount">4</span>
    </div>
    <div class="ONEAS-hud__cash">
      <img src="images/hud/icon_money.png" alt="" class="ONEAS-cash__icon">
      <div id="ONEAS-cash__value">0</div>
    </div>
  </div>
  
  <div class="ONEAS-hud__green-zone">
      <img src="images/hud/zz.png" alt="" class="ONEAS-green-zone__image">
  </div>
  
  <div class="ONEAS-hud__radar-border">
    <img src="images/hud/border_radar.png" class="ONEAS-radar__images">
    <div id="garland1">
        <img src='images/hud/garland1_light_4.png' id="image_1" />
        <img src='images/hud/garland1_light_3.png' id="image_2" />
        <img src='images/hud/garland1_light_2.png' id="image_3" />
        <img src='images/hud/garland1_light_1.png' id="image_4" />
    </div></div>
  
  <div class="ONEAS-hud__top">
    <div class="ONEAS-hud__logo">
      <img src="images/logo/3.png" class="ONEAS-logo__image">
      <div class="ONEAS-logo__bonus">
        <img src="images/hud/bonus_3.png" class="ONEAS-bonus__image">
      </div>
    </div>
    <div class="ONEAS-hud__weapon">
        <div id="garland2">
            <img src='images/hud/garland2_light_1.png' id="image_1" />
            <img src='images/hud/garland2_light_2.png' id="image_2" />
            <img src='images/hud/garland2_light_3.png' id="image_3" />
            <img src='images/hud/garland2_light_4.png' id="image_4" />
  
        </div>
      <img src="images/weapon/0.png" alt="" class="ONEAS-weapon__icon">
      <div class="ONEAS-weapon__ammo">
        <span id="ONEAS-ammo__in-clip">1</span>
        <span id="ONEAS-ammo__total">1</span>
      </div>
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

        // if (prop === 'mileage') {
        //      this.setMileage(value);
        // }

        if (prop === 'fuel') {
          this.setFuel(value);
        }

        // // turns
        // if (prop == 'left') {
        //      this.data.turnsEls[0].classList.toggle('ONEAS-speedometer-turn--active', +value);
        // }
        //
        // if (prop == 'right') {
        //      this.data.turnsEls[1].classList.toggle('ONEAS-speedometer-turn--active', +value);
        // }

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

            if (value == 1) {
                document.querySelector(".ONEAS-speedometer__procents").style.display = `none`;
            } else {
                document.querySelector(".ONEAS-speedometer__procents").style.display = ``;
            }
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
      this.data.speedometerEl.style.bottom = '35px';
      document.querySelector('.ONEAS-hud__bottom').style.bottom = '18vh';
    },
    hide() {
      this.data.speedometerEl.style.bottom = '-700px';
      document.querySelector('.ONEAS-hud__bottom').style.bottom = '4.5vh';
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
      this.data.speed.valueEl.innerText = speed;
    },
    setDamage(floatDamage) {
      this.data.damage.valueEl.innerText = Math.floor(floatDamage * 100);
    },
    setWash(floatWash) {
      this.data.wash.wrapperEl.classList.toggle('ONEAS-speedometer-danger', floatWash >= 0.75);

      this.data.wash.valueEl.innerText = Math.floor(floatWash * 100);
    },
    setFuel(fuel) {
      this.data.fuel.wrapperEl.classList.toggle('ONEAS-speedometer-danger', fuel <= 15);

      this.data.fuel.valueEl.innerText = fuel;

      if (interface('Hud').speedometer.isElectro) this.data.fuel.textEl.innerText = '%';
      else this.data.fuel.textEl.innerText = 'л';
    },
    create(speedometerEl) {
      this.data.speedometerEl = speedometerEl;

      // SPEED
      this.data.speed.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-speed__value');
      this.data.speed.barEl = speedometerEl.querySelector('.ONEAS-speedometer-speed__bar');

      // FUEL
      this.data.fuel.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__fuel');
      this.data.fuel.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__value');
      this.data.fuel.barEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__bar');
      this.data.fuel.textEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__text');

      // WASH
      this.data.wash.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-wash__value');
      this.data.wash.barEl = speedometerEl.querySelector('.ONEAS-speedometer-wash__bar');
      this.data.wash.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__wash');

      // DAMAGE
      this.data.damage.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-damage__value');
      this.data.damage.barEl = speedometerEl.querySelector('.ONEAS-speedometer-damage__bar');

      // MILEAGE
      //this.data.mileageEl = speedometerEl.querySelector('.ONEAS-speedometer-mileage__value');

      // PARAMS
      this.data.paramsEls = speedometerEl.querySelector('.ONEAS-speedometer-params').children;

      // TURNS
      //this.data.turnsEls = speedometerEl.querySelector('.ONEAS-speedometer__turns').children;

      // TACHOMETER
      //this.data.tachometer.bgEl = speedometerEl.querySelector('.ONEAS-speedometer-bg');
      //this.data.tachometer.barEl = speedometerEl.querySelector(".ONEAS-tachometer__arrow");
      this.data.tachometer.wrapper = speedometerEl.querySelector(".ONEAS-speedometer__tachometer");
      this.data.tachometer.gearEl = this.data.tachometer.wrapper.querySelector("#ONEAS-tachometer-gear");
      this.data.tachometer.rpmEl = this.data.tachometer.wrapper.querySelector('#ONEAS-tachometer-rpm .ONEAS-tachometer-value');

      this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale()}) translateX(-50%)`;
    },
    init() {
      const text = `
                    <div class="ONEAS-speedometer__params">
            <div class="ONEAS-speedometer-params">
              <div class="ONEAS-spedometer-param__key">
                <svg width="38" height="13" viewBox="0 0 38 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="" style="width:38px">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M30.875 13C34.8101 13 38 10.0898 38 6.5C38 2.91022 34.8101 0 30.875 0C28.0914 0 25.6799 1.45669 24.5077 3.58008L24.5417 3.61111L23.75 6.86111L23.2019 3.61111H2.375L0 5.41667L3.5424 8.3246L5.54167 6.5L7.91667 8.66667H8.70833L10.2917 7.22222L11.875 8.66667H13.4583L15.0417 7.22222L16.625 8.66667H17.4167L19.7917 6.5L22.1667 8.66667H24.1551C25.1339 11.1913 27.7733 13 30.875 13ZM34.0417 7.94444C34.9161 7.94444 35.625 7.29774 35.625 6.5C35.625 5.70225 34.9161 5.05556 34.0417 5.05556C33.1672 5.05556 32.4583 5.70225 32.4583 6.5C32.4583 7.29774 33.1672 7.94444 34.0417 7.94444Z" fill="#F8F6ED"></path>
                </svg>
              </div>
              <div class="ONEAS-spedometer-param__lights">
                <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="disabled" style="width:28px">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3409 0.0806263C9.82644 2.71501 7.70617 9.74003 11.3409 16.765C12.1561 16.8725 13.091 16.9521 14.0929 16.9843C12.4851 14.0246 10.6648 9.17071 11.9996 5.5C12.2988 8.63993 13.6711 14.8382 16.8385 16.9467C22.1648 16.6214 28.0007 14.718 28.0007 8.8619C28.0007 0.783128 16.8942 -0.358437 11.3409 0.0806263Z" fill="#F8F6ED"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.5796L8.15634 14.3903C7.99544 13.8279 7.86097 13.2695 7.75054 12.7165L0 14.7969V16.5796ZM0 13.1796L7.49998 11.1665C7.42664 10.5761 7.37921 9.99418 7.35454 9.42278L0 11.3969V13.1796ZM0 9.77965L7.3437 7.80844C7.36205 7.18561 7.40582 6.57898 7.47047 5.99167L0 7.9969V9.77965ZM0 6.37965L7.71931 4.30762C7.84365 3.63864 7.99254 3.00327 8.1576 2.40723L0 4.5969V6.37965Z" fill="#F8F6ED" fill-opacity="0.85"></path>
                </svg>
              </div>
              <div class="ONEAS-spedometer-param__rem">
                <svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="" style="width:32px">
                  <path d="M11.7434 10.2143H13.8158L12.4342 11.6071L10.1316 12.0714L6.90789 14.3929L8.51974 11.6071L11.2829 11.1429L11.7434 10.2143Z" fill="white"></path>
                  <path d="M30.9402 0L35 7.34393L27.9681 11.5839L23.9083 4.24002L30.9402 0Z" fill="white"></path>
                  <path d="M5.62548 15.2641L11.0917 21.76L4.05984 26L0 18.6561L5.62548 15.2641Z" fill="white"></path>
                  <path d="M14.0637 10.176L18.1235 17.52L15.9596 17.8456L14.6076 19.64L11.0917 21.76L7.03185 14.4161L10.5478 12.296L12.7117 11.9704L14.0637 10.176Z" fill="white"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M28.3741 12.3183L22.6903 2.03684L15.6585 6.27686L22.1542 18.0271L29.1861 13.7871L28.3741 12.3183ZM28.3741 12.3183L22.7486 15.7103L17.8768 6.89764L22.0959 4.35363L28.3741 12.3183Z" fill="white"></path>
                  <path d="M24.4079 2.32143L23.0263 1.85714L24.4079 3.71429L30.8553 0L24.4079 2.32143Z" fill="white"></path>
                </svg>
              </div>
              <div class="ONEAS-spedometer-param__doors">
                <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="" style="width:19px">
                  <path d="M7 5.07031C7.50705 1.68141 9.84258 -0.463552 12.9465 0.0855578C16.0262 0.630379 17.9604 2.21279 17.5 5.57028L15.7561 11.9648L12.981 11.7769L14.4889 6.14426L14.5 6.07028C14.7379 4.48018 14.2306 3.37592 12.5 3.06976C10.7694 2.7636 9.98231 3.96572 9.7444 5.55582L8.83418 9.31615L16.6829 11.9648L19 13.9804L4.63415 8.94136L1.39024 21.539L0 20.0273L3.2439 7.42965L6.15253 8.41119L7 5.07031Z" fill="#F8F6ED"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.39024 21.539L5.56098 9.94918L19 13.9804L15.7561 25.5703L1.39024 21.539ZM12.0488 17.5078C12.0488 18.621 11.2189 19.5234 10.1951 19.5234C9.17137 19.5234 8.34146 18.621 8.34146 17.5078C8.34146 16.3946 9.17137 15.4922 10.1951 15.4922C11.2189 15.4922 12.0488 16.3946 12.0488 17.5078Z" fill="#F8F6ED"></path>
                </svg>
              </div>
            </div>
        </div>
        <div class="ONEAS-speedometer__speed">
          <div class="ONEAS-speedometer-speed__data">
            <span class="ONEAS-speedometer-speed__value">0</span>
            <span class="ONEAS-speedometer-speed__text">км/ч</span></div>
        </div>

        <div style="display: none" class="ONEAS-speedometer__tachometer">
            <div id="ONEAS-tachometer-gear">d4</div>            
            <div id="ONEAS-tachometer-rpm">
                 <div class="ONEAS-tachometer-value">1000</div>
                 <div class="ONEAS-tachometer-text">rpm</div>
            </div>
        </div>
      <div class="ONEAS-speedometer__procents">
        <div class="ONEAS-speedometer__fuel">
          <div class="ONEAS-speedometer-fuel__data ONEAS-speedometer-data">
            <div class="ONEAS-speedometer-fuel__icon">
              <svg class="ONEAS-fuel__icon ONEAS-speedometer-icon" width="470" height="512" viewBox="0 0 470 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M49.003 0.346589C48.5905 0.614089 47.622 0.836089 46.851 0.840589C44.802 0.851589 35.572 4.05059 31.096 6.30159C26.943 8.38959 20.5185 12.9446 17.227 16.1346C12.799 20.4261 6.9785 29.0776 4.9295 34.4136C2.723 40.1581 2.3645 41.1556 1.8975 42.8481C0.444001 48.1196 0.371 58.3776 0.1875 282.723L0 511.848H142.502H285.003V406.134C285.003 310.697 285.079 300.343 285.788 299.634C286.476 298.946 288.992 298.849 305.913 298.856C317.225 298.86 325.564 299.06 326.003 299.338C326.661 299.754 326.792 308.551 327.074 371.455C327.27 415.197 327.598 445.045 327.916 448.098C328.621 454.859 329.611 459.584 331.191 463.723C331.638 464.892 332.345 466.765 332.763 467.885C336.46 477.79 346.81 490.761 357.112 498.399C364.838 504.127 376.064 508.839 387.503 511.155C389.79 511.618 407.242 511.614 409.503 511.149C414.727 510.077 420.044 508.665 422.253 507.764C433.768 503.067 440.341 498.918 447.524 491.812C455.84 483.586 461.299 475.775 464.239 467.895C464.659 466.769 465.366 464.892 465.81 463.723C467.268 459.885 468.586 454.179 469.131 449.348C469.914 442.398 469.892 167.667 469.108 161.848C467.886 152.783 466.012 146.844 461.593 138.028C459.042 132.938 454.449 125.934 451.968 123.348C451.572 122.936 450.237 121.366 449.001 119.861C447.764 118.355 423.745 94.1111 395.624 65.9856C362.238 32.5946 344.151 14.8481 343.505 14.8481C342.157 14.8481 314.003 42.9991 314.003 44.3471C314.003 44.9836 324.196 55.5306 342.753 74.0961C361.383 92.7341 371.503 103.207 371.503 103.849C371.503 104.576 370.674 105.22 368.378 106.278C366.659 107.07 363.903 108.54 362.253 109.544C357.753 112.281 348.399 119.775 346.612 122.075C345.747 123.188 344.339 124.886 343.485 125.848C336.777 133.402 331.219 145.186 328.746 157.098C328.346 159.023 327.441 168.563 327.441 170.848C327.441 173.445 328.383 182.765 328.906 185.348C329.35 187.537 331.876 195.044 333.87 200.098C335.119 203.264 339.351 210.129 342.654 214.348C349.615 223.24 361.984 232.754 370.878 236.059C372.046 236.493 373.959 237.212 375.128 237.656C386.813 242.095 403.268 242.805 416.003 239.42C420.722 238.165 422.402 237.63 424.113 236.834C425.211 236.323 425.621 236.324 426.238 236.836C426.92 237.402 427.003 248.654 427.003 340.619C427.003 455.622 427.291 446.303 423.5 453.848C420.206 460.406 414.391 465.324 407.259 467.583C397.744 470.597 386.852 468.381 379.713 461.979C375.921 458.578 371.867 451.782 370.871 447.157C370.493 445.404 370.22 422.563 370.003 374.598C369.776 324.401 369.522 303.891 369.108 302.098C368.115 297.807 367.663 296.21 366.398 292.517C362.071 279.889 347.964 265.055 336.063 260.617C334.93 260.194 333.046 259.483 331.878 259.037C325.67 256.667 321.873 256.253 303.169 255.911C293.772 255.739 285.897 255.411 285.669 255.182C285.44 254.952 285.121 208.827 284.961 152.682C284.754 80.6561 284.504 49.7146 284.109 47.5981C282.351 38.1746 278.95 30.2351 273.552 22.9546C267.769 15.1561 261.935 10.3356 252.615 5.65409C247.052 2.86059 244.436 1.97409 237.503 0.532089C234.746 -0.0409108 49.882 -0.222911 49.003 0.346589ZM227.217 57.6336C227.924 58.3406 228.003 65.3981 228.003 127.848C228.003 190.298 227.924 197.356 227.217 198.063C226.509 198.771 218.135 198.848 142.503 198.848C66.871 198.848 58.497 198.771 57.7885 198.063C57.082 197.356 57.003 190.298 57.003 127.848C57.003 65.3981 57.082 58.3406 57.7885 57.6336C58.497 56.9256 66.871 56.8481 142.503 56.8481C218.135 56.8481 226.509 56.9256 227.217 57.6336ZM401.945 142.313C402.939 142.569 405.101 143.068 406.749 143.422C412.181 144.59 420.756 151.537 423.629 157.098C425.221 160.181 426.971 167.257 426.988 170.683C427.026 178.585 422.414 188.023 416.294 192.565C405.042 200.915 391.972 200.926 380.753 192.594C376.217 189.227 373.028 184.163 371.209 177.445C369.722 171.949 369.727 168.731 371.23 163.173C372.607 158.086 374.551 154.865 378.827 150.59C382.757 146.659 386.719 144.18 390.305 143.408C391.926 143.059 393.928 142.588 394.753 142.362C396.853 141.786 399.815 141.766 401.945 142.313Z" fill="#f3f0dd" />
              </svg>
            </div>
            <div class="ONEAS-speedometer-fuel__value">50</div>
            <div class="ONEAS-speedometer-fuel__text ONEAS-speedometer-data__text">%</div>
          </div>
        </div>
        <div class="ONEAS-speedometer__wash">
          <div class="ONEAS-speedometer-data">
            <div class="ONEAS-speedometer-wash__icon">
              <svg class="ONEAS-wash__icon ONEAS-speedometer-icon" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.71686 0.256043C7.99259 -0.40852 6.0342 0.257197 5.09085 1.82856L3.41763 4.61569C3.20226 4.97443 2.92741 5.29499 2.60453 5.56402L1.34073 6.61699C0.0854676 7.66285 -0.340848 9.3891 0.286112 10.8874L0.673785 11.8138C0.95759 12.492 1.0322 13.2378 0.888266 13.9577L0.644417 15.1773C0.0130819 18.3348 3.4617 20.7446 6.27143 19.1092L8.06114 18.0676C8.91938 17.568 9.97667 17.5352 10.8651 17.9804C12.8061 18.9531 15.1042 17.5618 15.1042 15.414V14.1634C15.1042 13.3168 15.4028 12.4966 15.9488 11.8435L17.1364 10.4229C18.1622 9.19595 18.2859 7.46201 17.4444 6.10537L15.7678 3.40237C15.3373 2.70819 14.6882 2.1721 13.9199 1.87595L9.71686 0.256043ZM8.18183 7.36364C9.08557 7.36364 9.81819 6.63102 9.81819 5.72728C9.81819 4.82354 9.08557 4.09091 8.18183 4.09091C7.27809 4.09091 6.54546 4.82354 6.54546 5.72728C6.54546 6.63102 7.27809 7.36364 8.18183 7.36364ZM13.0909 10.6364C13.0909 11.0883 12.7246 11.4546 12.2727 11.4546C11.8209 11.4546 11.4546 11.0883 11.4546 10.6364C11.4546 10.1845 11.8209 9.81822 12.2727 9.81822C12.7246 9.81822 13.0909 10.1845 13.0909 10.6364ZM5.72728 15.5455C7.08289 15.5455 8.18183 14.4466 8.18183 13.0909C8.18183 11.7353 7.08289 10.6364 5.72728 10.6364C4.37167 10.6364 3.27273 11.7353 3.27273 13.0909C3.27273 14.4466 4.37167 15.5455 5.72728 15.5455Z" fill="#f3f0dd" />
              </svg>
            </div>
            <div class="ONEAS-speedometer-wash__value">50</div>
            <div class="ONEAS-speedometer-wash__text ONEAS-speedometer-data__text">%</div>
          </div>
        </div>
        <div class="ONEAS-speedometer__damage">
          <div class="ONEAS-speedometer-data">
            <div class="ONEAS-speedometer-damage__icon">
              <svg class="ONEAS-damage__icon ONEAS-speedometer-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4582 0.823823C13.283 0.602832 14.1307 1.09228 14.3517 1.91703L14.8475 3.76736C14.9536 4.16342 15.2127 4.5011 15.5678 4.70611L17.2267 5.66389C17.9662 6.09081 18.2195 7.03634 17.7926 7.77579L16.8348 9.43471C16.6298 9.78981 16.5743 10.2118 16.6804 10.6079L17.1762 12.4582C17.3972 13.2829 16.9077 14.1307 16.083 14.3517L14.2327 14.8475C13.8366 14.9536 13.4989 15.2127 13.2939 15.5678L12.3361 17.2267C11.9092 17.9662 10.9637 18.2195 10.2242 17.7926L8.56526 16.8348C8.21016 16.6298 7.78817 16.5742 7.39211 16.6804L5.54183 17.1762C4.71708 17.3971 3.86934 16.9077 3.64834 16.0829L3.15256 14.2327C3.04644 13.8366 2.78733 13.4989 2.43223 13.2939L0.77327 12.3361C0.0338183 11.9092 -0.219537 10.9637 0.207386 10.2242L1.16519 8.56524C1.3702 8.21015 1.42576 7.78815 1.31964 7.39209L0.823852 5.5418C0.60286 4.71705 1.0923 3.86931 1.91706 3.64832L3.76735 3.15253C4.16341 3.04641 4.50109 2.7873 4.7061 2.4322L5.66389 0.77327C6.09081 0.033818 7.03634 -0.219537 7.7758 0.207386L9.43472 1.16517C9.78982 1.37018 10.2118 1.42574 10.6079 1.31962L12.4582 0.823823ZM6.95756 12.5375C8.91129 13.6655 11.4095 12.9961 12.5375 11.0424C13.6655 9.08866 12.9961 6.59043 11.0424 5.46245C9.08863 4.33446 6.5904 5.00386 5.46242 6.95759C4.33443 8.91132 5.00383 11.4095 6.95756 12.5375Z" fill="#f3f0dd" />
              </svg>
            </div>
            <div class="ONEAS-speedometer-damage__value">12</div>
            <div class="ONEAS-speedometer-damage__text ONEAS-speedometer-data__text">%</div>
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
