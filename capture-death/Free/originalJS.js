const vol = '1.0.1',
  lvl = 'Free',
  nameMod = 'Capture Death';

const defaultAdditionalScripts = [
  {
    name: 'Old Info Card',
    id: 'oldInfoCard',
    filePath: 'additional-scripts/oldInfoCard.js',
    enabled: true,
    is_hidden: false,
  },
  {
    name: 'About_Game',
    id: 'aboutGame',
    filePath: 'additional-scripts/aboutGame.js',
    enabled: true,
    is_hidden: true,
  }
];

const oneasHud = {
  getScale() {
    const { clientWidth, clientHeight } = document.documentElement;
    return (clientWidth + clientHeight) / (1920 + 1080);
  },
  wantedAlwaysShowClass: '.ONEAS-hud__wanted--always-show',
  hud: {
    data: {
      hudEl: null,
      hud_topEl: null,
      hud_btEl: null,
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
      this.data.hud_topEl = hudEl.querySelector('.ONEAS-hud__top');
      this.data.hud_btEl = hudEl.querySelector('.ONEAS-hud__bottom');
      this.data.moneyEl = hudEl.querySelector('#ONEAS-cash__value');
      this.data.hpEl.value = hudEl.querySelector('.ONEAS-param__health .ONEAS-param__amount');
      this.data.hungerEl.value = hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__amount');
      [this.data.armourEl.wrapper, this.data.armourEl.value] = [hudEl.querySelector('.ONEAS-param__armour'), hudEl.querySelector('.ONEAS-param__armour .ONEAS-param__amount')];      
      [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector('.ONEAS-param__breath'), hudEl.querySelector('.ONEAS-param__breath .ONEAS-param__amount')];
      [this.data.freezeEl.wrapper, this.data.freezeEl.value] = [hudEl.querySelector('.ONEAS-param__freeze'), hudEl.querySelector('.ONEAS-param__freeze .ONEAS-param__amount')];
      [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector('.ONEAS-wanted'), hudEl.querySelector('.ONEAS-wanted__row').children];
      this.data.weaponEl.ammoEl = hudEl.querySelector('.ONEAS-weapon__ammo').children;
      this.data.weaponEl.icon = hudEl.querySelector('.ONEAS-weapon__icon');
      this.data.server.wrapper = hudEl.querySelector('.ONEAS-logo');
      this.data.server.image = this.data.server.wrapper.children[0];
      this.data.bonusEl = hudEl.querySelector('.ONEAS-logo__bonus');
      this.data.greenZoneEl = hudEl.querySelector('.ONEAS-green-zone');
      
      
      this.data.hud_btEl.style.transform = `scale(${oneasHud.getScale()})`;
      this.data.hud_topEl.style.transform = `scale(${oneasHud.getScale()})`;
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
      }

      if (prop === 'weapon' && value < 16) {
        this.data.weaponEl.ammoEl[0].style.display = 'none';
        this.data.weaponEl.ammoEl[1].style.display = 'none';
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
          return;
        }

        this.data.wanted.wrapper.style.display = '';

        for (let i = 0; i < 6; i += 1) {
            if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
              this.data.wanted.els[i].src = 'images/hud/inactive.png';
              this.data.wanted.els[i].classList.remove('ONEAS-wanted__active');
              this.data.wanted.els[i].classList.add('ONEAS-wanted__inactive');
            } else {
              this.data.wanted.els[i].src = 'images/hud/active.png';
              this.data.wanted.els[i].classList.remove('ONEAS-wanted__inactive');
              this.data.wanted.els[i].classList.add('ONEAS-wanted__active');
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
        this.data.server.image.src = `images/logo/${value}.png`;

        if (value > 0 && this.data.server.wrapper.style.display == 'none') this.data.server.wrapper.style.display = '';

        if (value <= 0) this.data.server.wrapper.style.display = 'none';
      }

      if (prop == 'setBonus') {
        if (value <= 1) this.data.bonusEl.style.display = 'none';
        else this.data.bonusEl.style.display = '';
  
        this.data.bonusEl.src = `images/hud/bonus-${value}.png`;
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
<div class="ONEAS-hud__top">
    <div>
        <div class="ONEAS-hud__info">
            <div class="ONEAS-cash">
                <span id="ONEAS-cash__text">$</span>
                <span id="ONEAS-cash__value">0</span>
            </div>
            <div class="ONEAS-params"> 
                <div class="ONEAS-param__health ONEAS-param">
                    <img class="ONEAS-param__icon" src="images/hud/health.png">
                    <span class="ONEAS-param__amount">0</span>
                </div>
                <div class="ONEAS-param__hunger ONEAS-param">
                    <img class="ONEAS-param__icon" src="images/hud/hunger.png">
                    <span class="ONEAS-param__amount">0</span>
                </div>
                <div style="display: none" class="ONEAS-param__armour ONEAS-param">
                    <img class="ONEAS-param__icon" src="images/hud/armour.png">
                    <span class="ONEAS-param__amount">0</span>
                </div>
                <div style="display: none" class="ONEAS-param__breath ONEAS-param">
                    <img class="ONEAS-param__icon" src="images/hud/breath.png">
                    <span class="ONEAS-param__amount">0</span>
                </div>
                <div style="display: none" class="ONEAS-param__freeze ONEAS-param">
                    <img class="ONEAS-param__icon" src="images/hud/freeze.png">
                    <span class="ONEAS-param__amount">0</span>
                </div>
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
        <div class="ONEAS-weapon">
            <img class="ONEAS-weapon__icon" src="images/weapon/24.png">
            <div class="ONEAS-weapon__ammo">
                <span id="ONEAS-ammo__in-clip">0</span>
                <span id="ONEAS-ammo__total">0</span> 
            </div>
        </div>
    </div>
    <div class="ONEAS-logo">
        <img class="ONEAS-logo__image" src="images/logo/12.png">
        <img class="ONEAS-logo__bonus" src="images/hud/bonus-3.png">
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
      const hudEl = jsLoader.hudInfo.addNewHud(hudHtml, 'ONEAS-hud', (prop, value) => void this.onInfoChange(prop, value));

      this.createHud(hudEl);

      interface('Hud').setBonus(interface('Hud').bonus);
      interface('Hud').setServer(interface('Hud').server);
      interface('Hud').info.health = interface('Hud').info.health;
      interface('Hud').info.armour = interface('Hud').info.armour;
      interface('Hud').info.hunger = interface('Hud').info.hunger;
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
      dashArray: 400,
      dashOffset: 400,
    },
    fuel: {
      dashArray: 171,
      dashOffset: 0,
    },
    wash: {
      dashArray: 185,
      dashOffset: 185,
    },
    damage: {
      dashArray: 185,
      dashOffset: 185,
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
        this.data.paramsEls[2].classList.toggle('ONEAS-spedometer-param--active', +value);
      }
      if (prop == 'doors') {
        this.data.paramsEls[3].classList.toggle('ONEAS-spedometer-param--active', +value);
      }
      if (prop == 'temperature') {
        this.data.paramsEls[1].classList.toggle('ONEAS-spedometer-param--active', +value);
      }
      if (prop == 'lights') {
        this.data.paramsEls[0].classList.toggle('ONEAS-spedometer-param--active', +value);
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
    //this.data.speedometerEl.style.display = ''
    // document.querySelector('.ONEAS-hud__green-zone').style.bottom = '25vh'
    //document.querySelector('.ONEAS-speedometer__progress-bar').style.bottom = '660px'//'61vh'
    this.data.speedometerEl.style.bottom = '4vh';
    //this.data.speedometerEl.style.opasity = '1';
  },
  hide() {
    //this.data.speedometerEl.style.display = 'none'
    // document.querySelector('.ONEAS-hud__green-zone').style.bottom = '5vh'
    //document.querySelector('.ONEAS-speedometer__progress-bar').style.bottom = '10px'//'18vh'
    this.data.speedometerEl.style.bottom = '-700px';
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
    const maxSpeed = interface('Hud').speedometer.maxSpeed;
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
    this.data.wash.wrapperEl.classList.toggle('ONEAS-speedometer-danger', floatWash >= 0.75);

    const multiplier = this.barsValues.wash.dashArray - floatWash * this.barsValues.wash.dashArray;

    //this.data.wash.valueEl.innerText = Math.round(floatWash * 100);

    this.data.wash.barEl.style.strokeDashoffset = multiplier;
  },
  setFuel(fuel) {
    this.data.fuel.wrapperEl.classList.toggle('ONEAS-speedometer-danger', fuel <= 15);

    const maxFuel = window.interface('Hud').speedometer.maxFuel;

    this.data.fuel.valueEl.innerText = fuel;

    if (interface('Hud').speedometer.isElectro) this.data.fuel.textEl.innerText = '%';
    else this.data.fuel.textEl.innerText = 'л';

    if (fuel > maxFuel) fuel = maxFuel;

    const dashOffset = this.barsValues.fuel.dashArray - (fuel / maxFuel) * this.barsValues.fuel.dashArray;

    this.data.fuel.barEl.style.strokeDashoffset = dashOffset;
  },
  create(speedometerEl) {
    this.data.speedometerEl = speedometerEl;

    // SPEED
    this.data.speed.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-speed__value');
    this.data.speed.barEl = speedometerEl.querySelector('.ONEAS-speedometer-speed__bar');

    // FUEL
    this.data.fuel.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__value');
    this.data.fuel.barEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__bar');
    this.data.fuel.textEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__text');
    this.data.fuel.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__fuel');

    // WASH
    this.data.wash.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-wash__value');
    this.data.wash.barEl = speedometerEl.querySelector('.ONEAS-speedometer-wash__bar');
    this.data.wash.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__wash');

    // DAMAGE
    this.data.damage.valueEl = speedometerEl.querySelector('.ONEAS-speedometer-damage__value');
    this.data.damage.barEl = speedometerEl.querySelector('.ONEAS-speedometer-damage__bar');

    // MILEAGE
    this.data.mileageEl = speedometerEl.querySelector('.ONEAS-speedometer-mileage__value');

    // PARAMS
    this.data.paramsEls = speedometerEl.querySelector('.ONEAS-speedometer__params').children;

    // TURNS
    this.data.turnsEls = speedometerEl.querySelector('.ONEAS-speedometer__turns').children;

    // TACHOMETER
    //this.data.tachometer.bgEl = speedometerEl.querySelector('.ONEAS-speedometer-bg');
    //this.data.tachometer.barEl = speedometerEl.querySelector(".ONEAS-tachometer__arrow");
    this.data.tachometer.wrapper = speedometerEl.querySelector(".ONEAS-speedometer__tachometer");
    this.data.tachometer.gearEl = this.data.tachometer.wrapper.querySelector("#ONEAS-tachometer-gear .ONEAS-tachometer-value");
    this.data.tachometer.rpmEl = this.data.tachometer.wrapper.querySelector('#ONEAS-tachometer-rpm .ONEAS-tachometer-value');



    this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale()})`;
  },
  init() {
    const text = `
    <div style="display: none" class="ONEAS-speedometer__tachometer">
      <div id="ONEAS-tachometer-gear">
           <div class="ONEAS-tachometer-text">Передача:</div>
           <div class="ONEAS-tachometer-value">d4</div>
      </div>
      <div id="ONEAS-tachometer-rpm">
           <div class="ONEAS-tachometer-text">Обороты:</div>
           <div class="ONEAS-tachometer-value">1000</div>
      </div>
    </div>
<img class="ONEAS-speedometer-bg" src="images/speed/back.png" alt="" srcset="">
    <div class="ONEAS-speedometer__speed">
      <svg class="ONEAS-speedometer-speed__bar" width="159" height="147" viewBox="0 0 159 147" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M37.8181 144.837C23.7136 135.839 12.8996 122.518 6.99216 106.865C1.0847 91.2128 0.400993 74.0689 5.04322 57.9956C9.68544 41.9224 19.4043 27.7829 32.7474 17.6902C46.0905 7.5976 62.3413 2.09374 79.0713 2.00119C95.8012 1.90864 112.112 7.23237 125.566 17.1768C139.02 27.1212 148.895 41.1523 153.714 57.1732C158.534 73.1941 158.04 90.3446 152.306 106.061C146.572 121.778 135.906 135.218 121.902 144.371" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg class="ONEAS-speedometer-speed__bar-bg" width="159" height="147" viewBox="0 0 159 147" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M37.8181 144.837C23.7136 135.839 12.8996 122.518 6.99216 106.865C1.0847 91.2128 0.400993 74.0689 5.04322 57.9956C9.68544 41.9224 19.4043 27.7829 32.7474 17.6902C46.0905 7.5976 62.3413 2.09374 79.0713 2.00119C95.8012 1.90864 112.112 7.23237 125.566 17.1768C139.02 27.1212 148.895 41.1523 153.714 57.1732C158.534 73.1941 158.04 90.3446 152.306 106.061C146.572 121.778 135.906 135.218 121.902 144.371" stroke="black" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="ONEAS-speedometer-speed__data"><span class="ONEAS-speedometer-speed__value">0</span><span class="ONEAS-speedometer-speed__text">км/ч</span></div>
    </div>
    <div class="ONEAS-speedometer__speed-params">
      <div class="ONEAS-speedometer__mileage"><span class="ONEAS-speedometer-mileage__value">000000</span></div>
      <div class="ONEAS-speedometer__turns">
        <div class="ONEAS-speedometer-turn__left"></div>
        <div class="ONEAS-speedometer-turn__right"></div>
      </div>
    </div>
    <div class="ONEAS-speedometer__params">
      <div class="ONEAS-spedometer-param__lights ONEAS-spedometer-param--active"></div>
      <div class="ONEAS-spedometer-param__key ONEAS-spedometer-param--active"></div>
      <div class="ONEAS-spedometer-param__rem ONEAS-spedometer-param--active"></div>
      <div class="ONEAS-spedometer-param__doors ONEAS-spedometer-param--active"></div>
    </div>
    <div class="ONEAS-speedometer__fuel">
      <div class="ONEAS-speedometer-fuel__icon"></div>
      <div class="ONEAS-speedometer-data__text">
        <div class="ONEAS-speedometer-fuel__value">50</div>
        <div class="ONEAS-speedometer-fuel__text ONEAS-speedometer-data__text">%</div>
      </div>
    </div>
    <div class="ONEAS-speedometer__wash">
      <div class="ONEAS-speedometer-wash__icon"></div>
      <div class="ONEAS-speedometer-data__wash">
        <svg class="ONEAS-speedometer-wash__bar" width="111" height="121" viewBox="0 0 111 121" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M105.56 2.07677C109.747 16.9547 110.118 32.6478 106.639 47.7071C103.16 62.7664 95.9438 76.7066 85.6554 88.2406C75.367 99.7747 62.3386 108.531 47.773 113.701C33.2074 118.871 17.574 120.287 2.31623 117.821" stroke="white" stroke-width="4" stroke-linecap="round" />
        </svg>
        <svg class="ONEAS-speedometer-wash__bar-bg" width="111" height="121" viewBox="0 0 111 121" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M105.56 2.07677C109.747 16.9547 110.118 32.6478 106.639 47.7071C103.16 62.7664 95.9438 76.7066 85.6554 88.2406C75.367 99.7747 62.3386 108.531 47.773 113.701C33.2074 118.871 17.574 120.287 2.31623 117.821" stroke="black" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />
        </svg>
      </div>
    </div>
    <div class="ONEAS-speedometer__damage">
      <div class="ONEAS-speedometer-damage__icon"></div>
      <div class="ONEAS-speedometer-data__damage">
        <svg class="ONEAS-speedometer-damage__bar" width="161" height="48" viewBox="0 0 161 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.93307 45.3214C11.111 32.2062 22.4612 21.3628 35.936 13.7921C49.4108 6.22137 64.5757 2.16748 80.0308 2.00465C95.4858 1.84183 110.733 5.57533 124.364 12.8605C137.995 20.1456 149.572 30.7475 158.024 43.6875" stroke="white" stroke-width="4" stroke-linecap="round" />
        </svg>
        <svg class="ONEAS-speedometer-damage__bar-bg" width="161" height="48" viewBox="0 0 161 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.93307 45.3214C11.111 32.2062 22.4612 21.3628 35.936 13.7921C49.4108 6.22137 64.5757 2.16748 80.0308 2.00465C95.4858 1.84183 110.733 5.57533 124.364 12.8605C137.995 20.1456 149.572 30.7475 158.024 43.6875" stroke="black" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />
        </svg>
      </div>
    </div>`;
    const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, 'ONEAS-speedometer', (prop, value) => this.onChangeInfo(prop, value));

    this.create(speedometerEl);

    interface('Hud').speedometer.show = 0;
  },
},
init() {
  this.hud.init();
  this.speedometer.init();
  jsLoader.showAddedScript(`HUD ${nameMod}`, 'info');
},
};

oneasHud.init();