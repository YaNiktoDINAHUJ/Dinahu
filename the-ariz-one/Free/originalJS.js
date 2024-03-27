const vol = '1.0.0',
  lvl = 'Free',
  nameMod = 'THE ARIZ ONE';

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
  },
  {
      name: "Video",
      id: "video_adder",
      filePath: "additional-scripts/video.js",
      enabled: true,
      is_hidden: true,
  },
];


window.videoSrc = "media/bg-video.webm";

const oneasHud = {
  getScale() {
    const { clientWidth, clientHeight } = document.documentElement;
    return (clientWidth + clientHeight) / (1920 + 1080);
  },
  wantedAlwaysShowClass: '',
  hud: {
    barsValues: {
      health: {
        dashArray: 141,
        dashOffset: 141,
      },
      armour: {
        dashArray: 141,
        dashOffset: 141,
      },
      hunger: {
        dashArray: 141,
        dashOffset: 141,
      },
    },
    data: {
      hudEl: null,
      hud_topEl: null,
      hud_btEl: null,
      moneyEl: null,
      hpEl: {
        value: null,
        barEl: null,
      },
      armourEl: {
        value: null,
        barEl: null,
      },
      hungerEl: {
        value: null,
        barEl: null,
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
      this.data.server.wrapper = hudEl.querySelector('.ONEAS-logo');
      this.data.server.image = this.data.server.wrapper.children[0];
      this.data.bonusEl = hudEl.querySelector('.ONEAS-logo__bonus');
      [this.data.hpEl.barEl, this.data.hpEl.value] = [hudEl.querySelector('.ONEAS-param__health .ONEAS-param__bar'), hudEl.querySelector('.ONEAS-param__health .ONEAS-param__amount')];
      [this.data.armourEl.barEl, this.data.armourEl.value] = [hudEl.querySelector('.ONEAS-param__armour .ONEAS-param__bar'), hudEl.querySelector('.ONEAS-param__armour .ONEAS-param__amount')];
      [this.data.hungerEl.barEl, this.data.hungerEl.value] = [hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__bar'), hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__amount')];
      [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector('.ONEAS-param__breath'), hudEl.querySelector('.ONEAS-param__breath .ONEAS-param__amount')];
      [this.data.freezeEl.wrapper, this.data.freezeEl.value] = [hudEl.querySelector('.ONEAS-param__freeze'), hudEl.querySelector('.ONEAS-param__freeze .ONEAS-param__amount')];
      this.data.weaponEl.icon = hudEl.querySelector('.ONEAS-weapon__icon');
      this.data.weaponEl.ammoEl = hudEl.querySelector('.ONEAS-weapon__ammo').children;  
      this.data.moneyEl = hudEl.querySelector('#ONEAS-cash__value');   
      [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector('.ONEAS-wanted'), hudEl.querySelector('.ONEAS-wanted__row').children];
      this.data.greenZoneEl = hudEl.querySelector('.ONEAS-green-zone');
      
      
      this.data.hud_btEl.style.transform = `scale(${oneasHud.getScale()})`;
      this.data.hud_topEl.style.transform = `scale(${oneasHud.getScale()})`;
    },
    onInfoChange(prop, value) {

      // когда сервер присылает, чтобы худ был хелуинским
      if (prop === "setHelloween") {
      document.body.classList.toggle("oneas-helloween", value);
      }
      
      // когда сервер присылает, чтобы худ был пасха
      if (prop === "setEaster") {
      document.body.classList.toggle("oneas-easter", value);
      }
      
      // когда сервер присылает, чтобы худ был новогодним
      if (prop === "setNewYear") {
      document.body.classList.toggle("oneas-new-year", value);
      }

  
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
        document.querySelector('.ONEAS-radar-border').style.display = 'none';
      }

      if (prop == 'hideGreenZoneTab') {
        this.data.greenZoneEl.style.display = 'none';
        document.querySelector('.ONEAS-radar-border').style.display = '';
      }

      if (prop == 'health') {
        const maxValue = 100;
        if (value > maxValue) value = maxValue;

        const multiplier = this.barsValues.health.dashArray - (value / maxValue) * this.barsValues.health.dashArray;

        this.data.hpEl.barEl.style.strokeDashoffset = multiplier;

        this.data.hpEl.value.innerText = value;
      }

      if (prop == 'armour') {
        const maxValue = 100;
        if (value > maxValue) value = maxValue;

        const multiplier = this.barsValues.armour.dashArray - (value / maxValue) * this.barsValues.armour.dashArray;

        this.data.armourEl.barEl.style.strokeDashoffset = multiplier;

        this.data.armourEl.value.innerText = value;
      }

      if (prop == 'hunger') {
        const maxValue = 100;
        if (value > maxValue) value = maxValue;

        const multiplier = this.barsValues.hunger.dashArray - (value / maxValue) * this.barsValues.hunger.dashArray;

        this.data.hungerEl.barEl.style.strokeDashoffset = multiplier;

        this.data.hungerEl.value.innerText = value;
      }

      if (prop == 'breath') {
        if (value < 100) this.data.breathEl.wrapper.style.display = '';
        else this.data.breathEl.wrapper.style.display = 'none';

        this.data.breathEl.value.innerText = `${value}%`;
      }

      if (prop == 'money') {
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
              this.data.wanted.els[i].src = 'images/hud/inactive.svg';
              this.data.wanted.els[i].classList.remove('ONEAS-wanted__active');
              this.data.wanted.els[i].classList.add('ONEAS-wanted__inactive');
            } else {
              this.data.wanted.els[i].src = 'images/hud/active.svg';
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
        document.querySelector('.ONEAS-logo__image').dataset.server = value;
        //this.data.server.image.dataset.server = value;

        //this.data.server.image.src = `images/logo/${value}.png`;

        if (value > 0 && this.data.server.wrapper.style.display == 'none') this.data.server.wrapper.style.display = '';

        if (value <= 0) this.data.server.wrapper.style.display = 'none';
      }

      if (prop == 'setBonus') {
        if (value <= 1) this.data.bonusEl.style.display = 'none';
        else this.data.bonusEl.style.display = '';
  
        this.data.bonusEl.src = `images/hud/bonus-${value}.svg`;
      }

      if (prop === "isShowFreeze" && value) {
        this.data.freezeEl.wrapper.style.display = '';
      }

      if (prop === "isShowFreeze" && !value) {
        this.data.freezeEl.wrapper.style.display = 'none';
      }

      if (prop == 'freeze') {        
        this.data.freezeEl.value.innerText = `${value}%`;
      }
    },
    init() {
      const hudHtml = `
      <div class="ONEAS-hud__top">
        <div class="ONEAS-logo">   
          <div class="ONEAS-logo__image" data-server="1"></div>  
          <img class="ONEAS-logo__bonus" src="images/hud/bonus-3.svg">
        </div>
        <div class="ONEAS-params_block">
          <div class="ONEAS-params">
            <div class="ONEAS-param__health ONEAS-param">
              <span class="ONEAS-param__amount">50</span>
              <svg class="ONEAS-param__bar-health ONEAS-param__bar" width="50" height="50" viewBox="0 0 50 50" fill="none"
                xmlns="http://www.w3.org/2000/svg" style="stroke-dashoffset: 24.75;">
                <path
                  d="M25 2.5C27.9547 2.5 30.8806 3.08198 33.6104 4.21271C36.3402 5.34344 38.8206 7.00078 40.9099 9.0901C42.9992 11.1794 44.6566 13.6598 45.7873 16.3896C46.918 19.1194 47.5 22.0453 47.5 25C47.5 27.9547 46.918 30.8806 45.7873 33.6104C44.6566 36.3402 42.9992 38.8206 40.9099 40.9099C38.8206 42.9992 36.3402 44.6566 33.6104 45.7873C30.8805 46.918 27.9547 47.5 25 47.5C22.0453 47.5 19.1194 46.918 16.3896 45.7873C13.6598 44.6566 11.1794 42.9992 9.0901 40.9099C7.00078 38.8206 5.34344 36.3402 4.21271 33.6104C3.08198 30.8805 2.5 27.9547 2.5 25C2.5 22.0453 3.08198 19.1194 4.21271 16.3896C5.34344 13.6598 7.00078 11.1794 9.0901 9.09009C11.1794 7.00078 13.6598 5.34344 16.3896 4.21271C19.1195 3.08198 22.0453 2.5 25 2.5L25 2.5Z"
                  stroke="#EC263D" stroke-opacity="0.9" stroke-width="5"></path>
              </svg>
            </div>
            <div class="ONEAS-param__armour ONEAS-param">
              <span class="ONEAS-param__amount">50</span>
              <svg class="ONEAS-param__bar-armour ONEAS-param__bar" width="50" height="50" viewBox="0 0 50 50" fill="none"
                xmlns="http://www.w3.org/2000/svg" style="stroke-dashoffset: 24.75;">
                <path
                  d="M25 2.5C27.9547 2.5 30.8806 3.08198 33.6104 4.21271C36.3402 5.34344 38.8206 7.00078 40.9099 9.0901C42.9992 11.1794 44.6566 13.6598 45.7873 16.3896C46.918 19.1194 47.5 22.0453 47.5 25C47.5 27.9547 46.918 30.8806 45.7873 33.6104C44.6566 36.3402 42.9992 38.8206 40.9099 40.9099C38.8206 42.9992 36.3402 44.6566 33.6104 45.7873C30.8805 46.918 27.9547 47.5 25 47.5C22.0453 47.5 19.1194 46.918 16.3896 45.7873C13.6598 44.6566 11.1794 42.9992 9.0901 40.9099C7.00078 38.8206 5.34344 36.3402 4.21271 33.6104C3.08198 30.8805 2.5 27.9547 2.5 25C2.5 22.0453 3.08198 19.1194 4.21271 16.3896C5.34344 13.6598 7.00078 11.1794 9.0901 9.09009C11.1794 7.00078 13.6598 5.34344 16.3896 4.21271C19.1195 3.08198 22.0453 2.5 25 2.5L25 2.5Z"
                  stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="5"></path>
              </svg>
            </div>
            <div class="ONEAS-param__hunger ONEAS-param">
              <span class="ONEAS-param__amount">50</span>
              <svg class="ONEAS-param__bar-hunger ONEAS-param__bar" width="50" height="50" viewBox="0 0 50 50" fill="none"
                xmlns="http://www.w3.org/2000/svg" style="stroke-dashoffset: 24.75;">
                <path
                  d="M25 2.5C27.9547 2.5 30.8806 3.08198 33.6104 4.21271C36.3402 5.34344 38.8206 7.00078 40.9099 9.0901C42.9992 11.1794 44.6566 13.6598 45.7873 16.3896C46.918 19.1194 47.5 22.0453 47.5 25C47.5 27.9547 46.918 30.8806 45.7873 33.6104C44.6566 36.3402 42.9992 38.8206 40.9099 40.9099C38.8206 42.9992 36.3402 44.6566 33.6104 45.7873C30.8805 46.918 27.9547 47.5 25 47.5C22.0453 47.5 19.1194 46.918 16.3896 45.7873C13.6598 44.6566 11.1794 42.9992 9.0901 40.9099C7.00078 38.8206 5.34344 36.3402 4.21271 33.6104C3.08198 30.8805 2.5 27.9547 2.5 25C2.5 22.0453 3.08198 19.1194 4.21271 16.3896C5.34344 13.6598 7.00078 11.1794 9.0901 9.09009C11.1794 7.00078 13.6598 5.34344 16.3896 4.21271C19.1195 3.08198 22.0453 2.5 25 2.5L25 2.5Z"
                  stroke="#ED8A35" stroke-opacity="0.9" stroke-width="5"></path>
              </svg>
            </div>
          </div>
          <div class="ONEAS-weapon">
            <img class="ONEAS-weapon__icon" src="images/weapon/24.png">
            <div class="ONEAS-weapon__ammo">
              <span id="ONEAS-ammo__in-clip">10</span>
              <span id="ONEAS-ammo__total">100</span>
            </div>
          </div>
        </div>
        <div class="ONEAS-cash">
          <img class="ONEAS-cash__icon" alt="" src="images/hud/cash.svg">
          <span id="ONEAS-cash__value">999,999,999</span>
        </div>
        <div class="ONEAS-wanted ${oneasHud.wantedAlwaysShowClass}">
          <div class="ONEAS-wanted__row">
            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.svg">
            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.svg">
            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.svg">
            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.svg">
            <img class="ONEAS-wanted__inactive" alt="" src="images/hud/inactive.svg">
            <img class="ONEAS-wanted__active" alt="" src="images/hud/active.svg">
          </div>
        </div>
      </div>
      <div class="ONEAS-hud__bottom">
        <div class="ONEAS-radar">
          <div class="ONEAS-radar-border">
            <img class="ONEAS-radar__images" src="images/hud/radar.png">
          </div>
          <div class="ONEAS-green-zone">
            <img class="ONEAS-green-zone__image" src="images/hud/green_zone.png">
          </div>
        </div>
        <div class="ONEAS-params-2">
          <div style="display: none" class="ONEAS-param__breath">
            <img class="ONEAS-param__icon" src="images/hud/breath.svg">
            <span id="ONEAS-param__breath-text">Уровень кислорода</span>
            <span class="ONEAS-param__amount">50</span>
          </div>
          <div style="display: none" class="ONEAS-param__freeze">
            <img class="ONEAS-param__icon" src="images/hud/freeze.svg">
            <span id="ONEAS-param__freeze-text">Вы замерзли на</span>
            <span class="ONEAS-param__amount">50</span>
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
      valueEl: null,
      barEl: null,
      arrowEl: null,
    },
    fuel: {
      valueEl: null,
      barEl: null,
      textEl: null,
      wrapperEl: null,
    },
    wash: {
      valueEl: null,
      barEl: null,
      wrapperEl: null,
    },
    //damage: {
    //  barEl: null,
    //},
    tachometer: {
        wrapper: null,
        rpmEl: null,
        gearEl: null,
        //barEl: null,
    },
    mileageEl: null,
    //turnsEls: [],
    paramsEls: [],
  },
  onChangeInfo(prop, value) {
    try {
      //if (prop === 'damage') {
      //  isNaN(value * 100) ? (value = 0) : value;
//
      //  this.setDamage(+value);
      //}

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

      // // params
      if (prop == 'rem') {
        this.data.paramsEls[0].classList.toggle('ONEAS-speedometer-param--active', +value);
      }
      if (prop == 'doors') {
        this.data.paramsEls[2].classList.toggle('ONEAS-speedometer-param--active', +value);
      }
      if (prop == 'temperature') {
        this.data.paramsEls[1].classList.toggle('ONEAS-speedometer-param--active', +value);
      }
      if (prop == 'lights') {
        this.data.paramsEls[3].classList.toggle('ONEAS-speedometer-param--active', +value);
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
    this.data.speedometerEl.style.display = ''
  },
  hide() {
    this.data.speedometerEl.style.display = 'none'
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
    // прогресс бар

    const multiplier = this.barsValues.speed.dashArray - (speed / maxSpeed) * this.barsValues.speed.dashArray;

    this.data.speed.barEl.style.strokeDashoffset = multiplier;

    // стрелка    
    const deg = (speed / maxSpeed) * 268;

    this.data.speed.arrowEl.style.transform = `translateX(-50%) rotate(${deg - 133.5}deg)`;
  },
  //setDamage(floatDamage) {
  //  const multiplier = this.barsValues.damage.dashArray - floatDamage * this.barsValues.damage.dashArray;
//
  //  this.data.damage.barEl.style.strokeDashoffset = multiplier;
  //},
  setWash(floatWash) {
    this.data.wash.wrapperEl.classList.toggle('ONEAS-speedometer-danger', floatWash >= 0.75);

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
    this.data.speed.barEl = speedometerEl.querySelector('.ONEAS-speed__bar-active');
    this.data.speed.arrowEl = speedometerEl.querySelector('.ONEAS-speedometer-speed__arrow');
    this.data.speed.valueEl = speedometerEl.querySelector('.ONEAS-speed__value');

    // FUEL
    this.data.fuel.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__fuel');
    this.data.fuel.barEl = speedometerEl.querySelector('.ONEAS-fuel__bar-active');
    this.data.fuel.valueEl = speedometerEl.querySelector('.ONEAS-fuel__value');
    this.data.fuel.textEl = speedometerEl.querySelector('.ONEAS-fuel__text');

    // WASH
    this.data.wash.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__wash');
    this.data.wash.barEl = speedometerEl.querySelector('.ONEAS-wash__bar-active');
    this.data.wash.valueEl = speedometerEl.querySelector('.ONEAS-wash__value');

    // DAMAGE
    //this.data.damage.barEl = speedometerEl.querySelector('.ONEAS-damage-bar');

    // MILEAGE
    this.data.mileageEl = speedometerEl.querySelector('.ONEAS-mileage__value');

    // PARAMS
    this.data.paramsEls = speedometerEl.querySelector('.ONEAS-speedometer__params').children;

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
      <div style="display: none" class="ONEAS-speedometer__tachometer ONEAS-tachometer-glow">
        <div id="ONEAS-tachometer-gear">d4</div>
        <div id="ONEAS-tachometer-rpm">1000</div>
      </div>
      <div class="ONEAS-speed__line-top">
        <div class="ONEAS-speedometer__wash">
          <img class="wash__icon icon__speed-percent" alt="" src="images/speed/wash.svg">
          <div class="ONEAS-wash__bars ONEAS-percent__data">
            <svg class="ONEAS-wash__bar-active" width="25" height="139" viewBox="0 0 25 139" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.3639 136.917C10.609 116.271 4.69072 93.4497 4.05691 70.1793C3.42309 46.9089 8.09031 23.7992 17.7054 2.59868" stroke="#ED8A35" stroke-width="8"/>
              </svg>
              <svg class="ONEAS-wash__bar-bg" width="25" height="139" viewBox="0 0 25 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3639 136.917C10.6074 116.268 4.68903 93.4431 4.05663 70.1693C3.42424 46.8955 8.09441 23.7828 17.7137 2.58048" stroke="white" stroke-opacity="0.1" stroke-width="8"/>
                </svg>                                                                                      
          </div>
          <div class="ONEAS-percent__text">
            <div class="ONEAS-wash__value">27</div>
            <div class="ONEAS-wash__text">%</div>
          </div>
        </div>
        <div class="ONEAS-speedometer__speed">
          <img class="ONEAS-speedometer-speed__arrow" src="images/speed/arrow.svg" alt="" srcset="">
          <div class="ONEAS-speed__bars">
            <svg class="ONEAS-speed__bar-active" width="258" height="220" viewBox="0 0 258 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.9045 218.095C22.2831 200.474 10.2828 178.023 5.42105 153.581C0.559317 129.14 3.05454 103.805 12.5912 80.7819C22.1278 57.7584 38.2776 38.0799 58.9982 24.2348C79.7187 10.3898 104.08 3 129 3C153.92 3 178.281 10.3898 199.002 24.2348C219.722 38.0799 235.872 57.7584 245.409 80.7819C254.945 103.805 257.441 129.14 252.579 153.581C247.717 178.023 235.717 200.474 218.095 218.095" stroke="white" stroke-width="5"/>
              </svg>
              <svg class="ONEAS-speed__bar-bg" width="258" height="220" viewBox="0 0 258 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.9045 218.095C22.2831 200.474 10.2828 178.023 5.42105 153.581C0.559317 129.14 3.05454 103.805 12.5912 80.7819C22.1278 57.7584 38.2776 38.0799 58.9982 24.2348C79.7187 10.3898 104.08 3 129 3C153.92 3 178.281 10.3898 199.002 24.2348C219.722 38.0799 235.872 57.7584 245.409 80.7819C254.945 103.805 257.441 129.14 252.579 153.581C247.717 178.023 235.717 200.474 218.095 218.095" stroke="white" stroke-opacity="0.1" stroke-width="5"/>
                </svg>                                            
          </div>
          <div class="ONEAS-speedometer__speed-data">
            <span class="ONEAS-speed__value">236</span>
            <span class="ONEAS-speed__text">км/ч</span>
            <span class="ONEAS-mileage__value">000000</span>
          </div>
        </div>
        <div class="ONEAS-speedometer__fuel">
          <img class="fuel__icon icon__speed-percent" alt="" src="images/speed/fuel.svg">
          <div class="ONEAS-fuel__bars ONEAS-percent__data">
            <svg class="ONEAS-fuel__bar-active" width="25" height="139" viewBox="0 0 25 139" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.63297 136.923C14.3888 116.278 20.3081 93.4566 20.9429 70.1862C21.5778 46.9158 16.9116 23.8059 7.29741 2.60493" stroke="#72C864" stroke-width="8"/>
              </svg>
              <svg class="ONEAS-fuel__bar-bg" width="25" height="139" viewBox="0 0 25 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.63297 136.923C14.3888 116.278 20.3081 93.4566 20.9429 70.1862C21.5778 46.9158 16.9116 23.8059 7.29741 2.60493" stroke="white" stroke-opacity="0.1" stroke-width="8"/>
                </svg>                                                  
          </div>
          <div class="ONEAS-percent__text">
            <div class="ONEAS-fuel__value">58</div>
            <div class="ONEAS-fuel__text">л</div>
          </div>
        </div>
      </div>
      <div class="ONEAS-speed__line-bottom">
        <div class="ONEAS-speedometer__params">
          <img class="icon__rem icon__speed-params" alt="" src="images/speed/rem.svg">
          <img class="icon__key icon__speed-params" alt="" src="images/speed/key.svg">
          <img class="icon__doors icon__speed-params" alt="" src="images/speed/doors.svg">
          <img class="icon__lights icon__speed-params" alt="" src="images/speed/lights.svg">
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