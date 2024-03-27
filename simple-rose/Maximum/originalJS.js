const vol = '1.1',
  lvl = 'Maximum',
  nameMod = 'Pacific Noise';

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
        progress: null,
      },
      wanted: {
        wrapper: null,
        els: [],
      },
      weaponEl: {
        ammoEl: null,
        icon: null,
        nameEl: null,
        textElW: null,
      },
      server: {
        wrapper: null,
        value: null,
        image: null,
      },
      freezeEl: {
        wrapper: null,
        value: null,
      },
      bonusEl: null,
      greenZoneEl: null,
    },
    createHud(hudEl) {
      this.data.hudEl = hudEl;
      this.data.hud_topEl = hudEl.querySelector('.ONEAS-hud__top');
      this.data.hud_bottomEl = hudEl.querySelector('.ONEAS-hud__bottom');
      this.data.moneyEl = hudEl.querySelector('#ONEAS-cash__value');
      this.data.hpEl.value = hudEl.querySelector('.ONEAS-param__health .ONEAS-param__amount');
      [this.data.armourEl.wrapper, this.data.armourEl.value] = [hudEl.querySelector('.ONEAS-param__armour'), hudEl.querySelector('.ONEAS-param__armour .ONEAS-param__amount')];
      this.data.hungerEl.value = hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__amount');
      [this.data.breathEl.wrapper, this.data.breathEl.value] = [hudEl.querySelector('.ONEAS-param__breath'), hudEl.querySelector('.ONEAS-param__breath .ONEAS-param__amount')];
      [this.data.freezeEl.wrapper, this.data.freezeEl.value] = [hudEl.querySelector('.ONEAS-param__freeze'), hudEl.querySelector('.ONEAS-param__freeze .ONEAS-param__amount')];
      [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector('.ONEAS-wanted'), hudEl.querySelector('.ONEAS-wanted__row').children];
      this.data.server.wrapper = hudEl.querySelector('.ONEAS-logo');
      this.data.server.value = hudEl.querySelector('#logo-t2');
      //this.data.server.image = this.data.server.wrapper.children[0]
      this.data.bonusEl = hudEl.querySelector('.ONEAS-logo__bonus');
      this.data.greenZoneEl = hudEl.querySelector('.ONEAS-green-zone');
      this.data.weaponEl.icon = hudEl.querySelector('.ONEAS-weapon__icon');
      this.data.weaponEl.nameEl = hudEl.querySelector('.ONEAS-weapon__name').children;
      //this.data.weaponEl.nameEl = hudEl.querySelector('#ONEAS-name__title');
      //this.data.weaponEl.textElW = hudEl.querySelector('#ONEAS-name__text');
      this.data.weaponEl.ammoEl = hudEl.querySelector('.ONEAS-weapon__ammo').children;

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

        if (value == 0) (document.querySelector('.ONEAS-weapon__desc').style.opacity = '0'), (document.querySelector('.ONEAS-weapon').style.width = '0'), (document.querySelector('.ONEAS-weapon').style.opacity = '0');
        else
          (document.querySelector('.ONEAS-weapon').style.width = ''),
            (document.querySelector('.ONEAS-weapon').style.opacity = ''),
            setTimeout(() => {
              document.querySelector('.ONEAS-weapon__desc').style.opacity = '1';
            }, 300);

        if (value == 1) this.data.weaponEl.nameEl[1].innerText = 'Кастет'; /*БК*/
        else if (value == 2) this.data.weaponEl.nameEl[1].innerText = 'Коса'; /*БК*/
        else if (value == 3) this.data.weaponEl.nameEl[1].innerText = 'Полицейская дубинка'; /*БН*//*БК*/
        else if (value == 4) this.data.weaponEl.nameEl[1].innerText = 'Нож'; /*БК*/
        else if (value == 5) this.data.weaponEl.nameEl[1].innerText = 'Бита'; /*БН*//*БК*/
        else if (value == 6) this.data.weaponEl.nameEl[1].innerText = 'Лопата'; /*БН*//*БК*/
        else if (value == 7) this.data.weaponEl.nameEl[1].innerText = 'Кий'; /*БН*//*БК*/
        else if (value == 8) this.data.weaponEl.nameEl[1].innerText = 'Мачета'; /*БК*/
        else if (value == 9) this.data.weaponEl.nameEl[1].innerText = 'Бензопила'; /*БН*//*БК*/
        else if ((value == 10) | (value == 11) | (value == 12) | (value == 13)) this.data.weaponEl.nameEl[1].innerText = 'Игрушка для взрослых'; /*БН*//*БК*/
        else if (value == 14) this.data.weaponEl.nameEl[1].innerText = 'Цветы'; /*БН*//*БК*/
        else if (value == 15) this.data.weaponEl.nameEl[1].innerText = 'Топор'; /*БК*/
        else if (value == 16) this.data.weaponEl.nameEl[1].innerText = 'Граната'; /*1*//*БК*/
        else if (value == 17) this.data.weaponEl.nameEl[1].innerText = 'Дымовая граната'; /*1*//*БК*/
        else if (value == 18) this.data.weaponEl.nameEl[1].innerText = 'Коктейль Молотова'; /*1*//*БК*/
        else if (value == 22) this.data.weaponEl.nameEl[1].innerText = 'Пистолет Макарова';
        else if (value == 23) this.data.weaponEl.nameEl[1].innerText = 'Пистолет с глушителем';
        else if (value == 24) this.data.weaponEl.nameEl[1].innerText = 'Desert Eagle';
        else if (value == 25) this.data.weaponEl.nameEl[1].innerText = 'Дробовик';
        else if (value == 26) this.data.weaponEl.nameEl[1].innerText = 'Обрез';
        else if (value == 27) this.data.weaponEl.nameEl[1].innerText = 'Тактический дробовик';
        else if (value == 28) this.data.weaponEl.nameEl[1].innerText = 'Micro-Uzi';
        else if (value == 29) this.data.weaponEl.nameEl[1].innerText = 'MP5';
        else if (value == 30) this.data.weaponEl.nameEl[1].innerText = 'AK-47';
        else if (value == 31) this.data.weaponEl.nameEl[1].innerText = 'М4';
        else if (value == 32) this.data.weaponEl.nameEl[1].innerText = 'Тес-9';
        else if (value == 33) this.data.weaponEl.nameEl[1].innerText = 'Винтовка';
        else if (value == 34) this.data.weaponEl.nameEl[1].innerText = 'СВД';
        else if (value == 35) this.data.weaponEl.nameEl[1].innerText = 'РПГ'; /*1*//*БК*/
        else if (value == 36) this.data.weaponEl.nameEl[1].innerText = 'Bazooka'; /*БК*/
        else if (value == 37) this.data.weaponEl.nameEl[1].innerText = 'Огнемёт'; /*БК*/
        else if (value == 38) this.data.weaponEl.nameEl[1].innerText = 'Миниган'; /*БК*/
        else if (value == 39) this.data.weaponEl.nameEl[1].innerText = 'С4'; /*1*//*БК*/
        else if (value == 40) this.data.weaponEl.nameEl[1].innerText = 'Кнопка детонатора'; /*0*//*БН*//*БК*/
        else if (value == 41) this.data.weaponEl.nameEl[1].innerText = 'Баллончик'; /*БН*//*БК*/
        else if (value == 42) this.data.weaponEl.nameEl[1].innerText = 'Огнетушитель'; /*БН*//*БК*/
        else if (value == 43) this.data.weaponEl.nameEl[1].innerText = 'Фотоаппарат'; /*БН*//*БК*/
        else if (value == 46) this.data.weaponEl.nameEl[1].innerText = 'Парашют'; /*0*/ /*БН*//*БК*/
        else this.data.weaponEl.nameEl[1].innerText = 'Пусто';

        /*if ((value == 3) | (value == 5) | (value == 6) | (value == 7) | (value == 9) | (value == 10) | (value == 11) | (value == 12) | (value == 13) | (value == 14) | (value == 40) | (value == 41) | (value == 42) | (value == 43) | (value == 46)) (this.data.weaponEl.nameEl[0].style.display = 'none'), (this.data.weaponEl.ammoEl[0].style.display = 'none');
        else (this.data.weaponEl.nameEl[0].style.display = ''), (this.data.weaponEl.ammoEl[0].style.display = '');*/

        /*Отображение картинки патрона*/
        if ((22 <= value && value <= 34)) (this.data.weaponEl.ammoEl[0].style.display = '');
        else (this.data.weaponEl.ammoEl[0].style.display = 'none');

        /*Отображение надписи Оружие*/
        if ((15 <= value && value <= 39) | (value == 1) | (value == 2) | (value == 4) | (value == 8)) (this.data.weaponEl.nameEl[0].style.display = '');
        else (this.data.weaponEl.nameEl[0].style.display = 'none');
        
        /*Отображение счетчиков патронов*/
        if ((value < 16) | (value == 40) | (value == 46)) (this.data.weaponEl.ammoEl[2].style.display = 'none'), (this.data.weaponEl.ammoEl[1].style.display = 'none');
        else if ((value == 16) | (value == 17) | (value == 18) | (value == 35) | (value == 39)) (this.data.weaponEl.ammoEl[2].style.display = ''), (this.data.weaponEl.ammoEl[1].style.display = 'none');
        else (this.data.weaponEl.ammoEl[2].style.display = ''), (this.data.weaponEl.ammoEl[1].style.display = '');
      }
/*
      if (prop === 'weapon' && value >= 16) {
        this.data.weaponEl.ammoEl[2].style.display = '';
        this.data.weaponEl.ammoEl[0].style.display = '';
        this.data.weaponEl.ammoEl[1].style.display = '';
      }

      if (prop === 'weapon' && value < 16) {
        this.data.weaponEl.ammoEl[2].style.display = 'none';
        this.data.weaponEl.ammoEl[0].style.display = 'none';
        this.data.weaponEl.ammoEl[1].style.display = 'none';
      }*/

      if (prop == 'showGreenZoneTab') {
        //this.data.greenZoneEl.style.display = '';
        this.data.greenZoneEl.style.opacity = '';
        this.data.greenZoneEl.style.width = '';
        this.data.greenZoneEl.style.padding = '';
        setTimeout(() => {
          document.querySelector('.ONEAS-green-zone__image').style.opacity = '';
          document.querySelector('.ONEAS-green-zone__text').style.opacity = '';
          document.querySelector('.ONEAS-green-zone__text').style['font-size'] = '';
        }, 500);
      }

      if (prop == 'hideGreenZoneTab') {
        //this.data.greenZoneEl.style.display = 'none';
        this.data.greenZoneEl.style.opacity = '0';
        this.data.greenZoneEl.style.width = '0';
        this.data.greenZoneEl.style.padding = '0';
        document.querySelector('.ONEAS-green-zone__image').style.opacity = '0';
        document.querySelector('.ONEAS-green-zone__text').style.opacity = '0';
        document.querySelector('.ONEAS-green-zone__text').style['font-size'] = '0';
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

        for (let i = 0; i < 6; i += 1) {
          if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
            /*this.data.wanted.els[i].src = 'images/hud/wanted_inactive.svg';*/
            this.data.wanted.els[i].classList.remove('ONEAS-wanted__active');
            this.data.wanted.els[i].classList.add('ONEAS-wanted__inactive');
          } else {
            /*this.data.wanted.els[i].src = 'images/hud/wanted_active.svg';*/
            this.data.wanted.els[i].classList.remove('ONEAS-wanted__inactive');
            this.data.wanted.els[i].classList.add('ONEAS-wanted__active');
          }
        }
      }

      if (prop == 'ammoInClip') {
        this.data.weaponEl.ammoEl[1].innerText = value;
      }

      if (prop == 'totalAmmo') {
        this.data.weaponEl.ammoEl[2].innerText = value;
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
      <div class="ONEAS-hud__top">
      <div class="ONEAS-logo">
          <div class="ONEAS-logo__text">
              <span id="logo-t1">radmir rp |</span>
              <span id="logo-t2">07</span>
              <span id="logo-t3">server</span>
          </div>
          <div class="ONEAS-logo__bonus">x3</div>
      </div>
      <div class="ONEAS-weapon">
          <img class="ONEAS-weapon__icon" src="images/weapon/24.png">
          <div class="ONEAS-weapon__desc">
              <div class="ONEAS-weapon__name"> 
                  <span id="ONEAS-name__text">Оружие:</span>
                  <span id="ONEAS-name__title">Desert Eagle</span> 
              </div>
              <div class="ONEAS-weapon__ammo"> 
                  <img class="ONEAS-ammo__icon" src="images/hud/patron.png">
                  <span id="ONEAS-ammo__in-clip">1</span>
                  <span id="ONEAS-ammo__total">1</span> 
              </div>                
          </div>
      </div>
  </div>
  <div class="ONEAS-hud__bottom">
      <div class="ONEAS-radar">
          <div class="ONEAS-green-zone">
              <img class="ONEAS-green-zone__image" src="images/hud/green_zone.png">
              <div class="ONEAS-green-zone__text">
                  <div>Вы находитесь в безопасной зоне</div>
                  <div>Вам никто не помешает</div>
              </div>
          </div>
          <div class="ONEAS-radar-border">
              <img class="ONEAS-radar__images" src="images/hud/radar.png">
          </div>
      </div>
      <div class="ONEAS-hud-info">
          <div class="ONEAS-params">                
              <div class="ONEAS-param__health ONEAS-param">
                  <img class="ONEAS-param__icon" src="images/hud/icon-health.svg">
                  <div class="ONEAS-param__amount">50</div>
                 </div>                
              <div class="ONEAS-param__armour ONEAS-param">
                  <img class="ONEAS-param__icon" src="images/hud/icon-armour.svg">
                  <div class="ONEAS-param__amount">92</div>
              </div>
              <div class="ONEAS-param__hunger ONEAS-param">
                  <img class="ONEAS-param__icon" src="images/hud/icon-hunger.svg">
                  <div class="ONEAS-param__amount">38</div>
               </div>
              <div class="ONEAS-param__breath ONEAS-param">
                  <img class="ONEAS-param__icon" src="images/hud/icon-breath.svg">
                  <div class="ONEAS-param__amount">81</div>
              </div>
              <div class="ONEAS-param__freeze ONEAS-param">
                  <img class="ONEAS-param__icon" src="images/hud/icon-freeze.svg">
                  <div class="ONEAS-param__amount">13</div>
              </div>
          </div>
          <div class="ONEAS-cash"> 
              <div id="ONEAS-cash__text">q</div>
              <div id="ONEAS-cash__value">999.999.999</div>
          </div>            
          <div class="ONEAS-wanted ${oneasHud.wantedAlwaysShowClass}"> 
              <div class="ONEAS-wanted__row"> 
                  <div class="ONEAS-wanted__inactive"></div>
                  <div class="ONEAS-wanted__inactive"></div>
                  <div class="ONEAS-wanted__inactive"></div>
                  <div class="ONEAS-wanted__active"></div>
                  <div class="ONEAS-wanted__active"></div>
                  <div class="ONEAS-wanted__active"></div>
              </div>
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
          this.data.paramsEls[3].classList.toggle('ONEAS-speedometer-param--active', +value);
        }
        if (prop == 'doors') {
          this.data.paramsEls[2].classList.toggle('ONEAS-speedometer-param--active', +value);
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
      //this.data.speedometerEl.style.bottom = '40px';
      this.data.speedometerEl.style.opacity = '';
      this.data.speedometerEl.style.width = '';
      setTimeout(() => {
        document.querySelector('.ONEAS-speedometer__speed').style.opacity = '';
        document.querySelector('.ONEAS-speedometer__percent').style.opacity = '';
        document.querySelector('.ONEAS-speedometer-info').style.opacity = '';
      }, 300);
    },
    hide() {
      //this.data.speedometerEl.style.bottom = '-700px';
      document.querySelector('.ONEAS-speedometer__speed').style.opacity = '0';
      document.querySelector('.ONEAS-speedometer__percent').style.opacity = '0';
      document.querySelector('.ONEAS-speedometer-info').style.opacity = '0';
      setTimeout(() => {
        this.data.speedometerEl.style.width = '0';
        this.data.speedometerEl.style.opacity = '0';
      }, 300);
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
      this.data.speed.valueEl = speedometerEl.querySelector('.ONEAS-speed__value');
      //this.data.speed.barEl = speedometerEl.querySelector('.ONEAS-speedometer-speed__bar');

      // FUEL
      this.data.fuel.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__fuel');
      this.data.fuel.valueEl = speedometerEl.querySelector('.ONEAS-fuel__value');
      //this.data.fuel.barEl = speedometerEl.querySelector('.ONEAS-speedometer-fuel__bar');
      this.data.fuel.textEl = speedometerEl.querySelector('.ONEAS-fuel__text');

      // WASH
      this.data.wash.valueEl = speedometerEl.querySelector('.ONEAS-wash__value');
      //this.data.wash.barEl = speedometerEl.querySelector('.ONEAS-speedometer-wash__bar');
      this.data.wash.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__wash');

      // DAMAGE
      this.data.damage.valueEl = speedometerEl.querySelector('.ONEAS-damage__value');
      //this.data.damage.barEl = speedometerEl.querySelector('.ONEAS-speedometer-damage__bar');

      // MILEAGE
      this.data.mileageEl = speedometerEl.querySelector('.ONEAS-mileage__value');

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
             <div class="ONEAS-tachometer-value">2</div>
        </div>
        <div id="ONEAS-tachometer-rpm">
             <div class="ONEAS-tachometer-text">Обороты:</div>
             <div class="ONEAS-tachometer-value">2850</div>
        </div>
      </div>
      <div class="ONEAS-speedometer__speed">
      <span class="ONEAS-speed__value">236</span>
      <span class="ONEAS-speed__text">km/h</span>
  </div>
  <div class="ONEAS-speedometer__percent">
      <div class="ONEAS-speedometer__fuel ONEAS-percent__data">  
          <svg class="fuel__icon" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_414_73" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="3" y="1" width="14" height="15">
            <path d="M13.9428 1.94336H5.30598C4.05359 1.94336 3.03833 2.95862 3.03833 4.21101V13.4402C3.03833 14.6926 4.05359 15.7079 5.30598 15.7079H13.9428C15.1952 15.7079 16.2104 14.6926 16.2104 13.4402V4.21101C16.2104 2.95862 15.1952 1.94336 13.9428 1.94336Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_414_73)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.41168 1.95268C4.40012 1.95987 4.37297 1.96584 4.35137 1.96596C4.29394 1.96625 4.03526 2.05225 3.90982 2.11277C3.79343 2.1689 3.61338 2.29136 3.52113 2.37712C3.39703 2.49249 3.23391 2.72508 3.17648 2.86853C3.11464 3.02296 3.1046 3.04978 3.09151 3.09528C3.05077 3.237 3.04873 3.51277 3.04358 9.54404L3.03833 15.7038H7.03206H11.0257V12.8618C11.0257 10.2961 11.0279 10.0177 11.0477 9.99867C11.067 9.98017 11.1375 9.97757 11.6118 9.97775C11.9288 9.97786 12.1625 9.98324 12.1748 9.99071C12.1932 10.0019 12.1969 10.2384 12.2048 11.9295C12.2103 13.1054 12.2195 13.9079 12.2284 13.99C12.2482 14.1717 12.2759 14.2987 12.3202 14.41C12.3327 14.4414 12.3525 14.4918 12.3643 14.5219C12.4679 14.7882 12.7579 15.1369 13.0467 15.3422C13.2632 15.4962 13.5778 15.6229 13.8984 15.6852C13.9625 15.6976 14.4516 15.6975 14.515 15.685C14.6614 15.6562 14.8104 15.6182 14.8723 15.594C15.195 15.4677 15.3792 15.3562 15.5805 15.1652C15.8136 14.944 15.9666 14.734 16.049 14.5222C16.0608 14.4919 16.0806 14.4414 16.093 14.41C16.1339 14.3068 16.1708 14.1534 16.1861 14.0236C16.208 13.8367 16.2074 6.45089 16.1854 6.29445C16.1512 6.05075 16.0987 5.89109 15.9748 5.65408C15.9033 5.51724 15.7746 5.32895 15.7051 5.25943C15.694 5.24835 15.6566 5.20614 15.6219 5.16568C15.5873 5.1252 14.9141 4.47343 14.126 3.71731C13.1903 2.81963 12.6834 2.34253 12.6653 2.34253C12.6275 2.34253 11.8385 3.09934 11.8385 3.13558C11.8385 3.15269 12.1242 3.43623 12.6442 3.93535C13.1664 4.43641 13.45 4.71796 13.45 4.73522C13.45 4.75476 13.4267 4.77208 13.3624 4.80052C13.3142 4.82181 13.237 4.86133 13.1907 4.88832C13.0646 4.9619 12.8025 5.16337 12.7524 5.2252C12.7281 5.25513 12.6887 5.30077 12.6648 5.32664C12.4768 5.52972 12.321 5.84652 12.2517 6.16676C12.2405 6.21851 12.2151 6.47498 12.2151 6.53641C12.2151 6.60623 12.2415 6.85678 12.2562 6.92622C12.2686 6.98507 12.3394 7.18689 12.3953 7.32276C12.4303 7.40788 12.5489 7.59243 12.6415 7.70586C12.8365 7.94491 13.1832 8.20068 13.4325 8.28953C13.4652 8.3012 13.5188 8.32053 13.5516 8.33246C13.8791 8.4518 14.3402 8.47089 14.6971 8.37989C14.8294 8.34615 14.8765 8.33177 14.9244 8.31037C14.9552 8.29663 14.9667 8.29665 14.984 8.31042C15.0031 8.32564 15.0054 8.62813 15.0054 11.1005C15.0054 14.1922 15.0135 13.9417 14.9072 14.1445C14.8149 14.3208 14.6519 14.4531 14.4521 14.5138C14.1854 14.5948 13.8801 14.5352 13.6801 14.3631C13.5738 14.2717 13.4602 14.089 13.4323 13.9647C13.4217 13.9175 13.414 13.3035 13.4079 12.014C13.4016 10.6645 13.3945 10.1131 13.3829 10.0649C13.355 9.94955 13.3424 9.90662 13.3069 9.80734C13.1856 9.46785 12.7903 9.06905 12.4567 8.94974C12.425 8.93837 12.3722 8.91926 12.3395 8.90727C12.1655 8.84355 12.0591 8.83242 11.5349 8.82323C11.2715 8.8186 11.0508 8.80979 11.0444 8.80363C11.038 8.79745 11.0291 7.55743 11.0246 6.04804C11.0188 4.1117 11.0118 3.27988 11.0007 3.22298C10.9514 2.96964 10.8561 2.75619 10.7048 2.56047C10.5428 2.35081 10.3793 2.22122 10.1181 2.09536C9.96216 2.02026 9.88884 1.99643 9.69454 1.95766C9.61727 1.94226 4.43631 1.93737 4.41168 1.95268ZM9.40627 3.49277C9.42608 3.51178 9.4283 3.70151 9.4283 5.3804C9.4283 7.0593 9.42608 7.24905 9.40627 7.26805C9.38643 7.28709 9.15174 7.28916 7.03209 7.28916C4.91244 7.28916 4.67775 7.28709 4.6579 7.26805C4.6381 7.24905 4.63588 7.0593 4.63588 5.3804C4.63588 3.70151 4.6381 3.51178 4.6579 3.49277C4.67775 3.47374 4.91244 3.47165 7.03209 3.47165C9.15174 3.47165 9.38643 3.47374 9.40627 3.49277ZM14.3031 5.76928C14.331 5.77616 14.3916 5.78958 14.4378 5.79909C14.59 5.83049 14.8303 6.01726 14.9109 6.16676C14.9555 6.24964 15.0045 6.43987 15.005 6.53197C15.0061 6.74441 14.8768 6.99814 14.7053 7.12025C14.3899 7.34473 14.0236 7.34502 13.7092 7.12102C13.5821 7.03051 13.4927 6.89437 13.4417 6.71376C13.4001 6.56601 13.4002 6.4795 13.4423 6.33008C13.4809 6.19332 13.5354 6.10672 13.6552 5.9918C13.7654 5.88612 13.8764 5.81947 13.9769 5.79872C14.0223 5.78933 14.0785 5.77667 14.1016 5.7706C14.1604 5.75511 14.2434 5.75457 14.3031 5.76928Z" fill="white"/>
            </g>
            </svg>
          <div class="ONEAS-percent__text">
              <div class="ONEAS-fuel__value">58</div>            
              <div class="ONEAS-fuel__text">%</div>
          </div>
      </div>
      <div class="ONEAS-speedometer__wash ONEAS-percent__data">    
          <svg class="wash__icon" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3265 10.6137C14.3265 13.5877 12.3742 16.1175 9.23565 16.1175C6.09714 16.1175 4.5 13.5877 4.5 10.6137C4.5 8.82943 6.26865 5.72547 7.68364 3.52769C8.50863 2.24631 10.3178 2.24631 11.1428 3.52769C12.5578 5.72547 14.3265 8.82943 14.3265 10.6137Z" fill="white"/>
            </svg>
          <div class="ONEAS-percent__text">
            <div class="ONEAS-wash__value">27</div>           
            <div class="ONEAS-wash__text">%</div>
          </div>
      </div>
      <div class="ONEAS-speedometer__damage ONEAS-percent__data">      
          <svg class="damage__icon" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.35905 3.47095C6.29786 3.47095 3.81592 5.95289 3.81592 9.01408C3.81592 12.0753 6.29786 14.5572 9.35905 14.5572C12.4203 14.5572 14.9022 12.0753 14.9022 9.01408C14.9022 5.95289 12.4203 3.47095 9.35905 3.47095ZM9.35905 11.7857C7.82846 11.7857 6.58749 10.5447 6.58749 9.01408C6.58749 7.48349 7.82846 6.24252 9.35905 6.24252C10.8897 6.24252 12.1307 7.48349 12.1307 9.01408C12.1307 10.5447 10.8897 11.7857 9.35905 11.7857Z" fill="white"/>
            <path d="M10.119 4.16387C10.7726 4.16387 11.264 3.5676 11.1391 2.92595C11.0441 2.43767 10.6164 2.08521 10.119 2.08521H8.59899C8.10155 2.08521 7.67386 2.43767 7.57881 2.92595C7.4539 3.5676 7.9453 4.16387 8.59899 4.16387H10.119Z" fill="white"/>
            <path d="M8.59899 13.8643C7.9453 13.8643 7.4539 14.4605 7.57881 15.1022C7.67386 15.5905 8.10155 15.9429 8.59899 15.9429H10.119C10.6164 15.9429 11.0441 15.5905 11.1391 15.1022C11.264 14.4605 10.7726 13.8643 10.119 13.8643H8.59899Z" fill="white"/>
            <path d="M5.53839 5.93056C5.86523 5.36451 5.59467 4.64086 4.97664 4.42808C4.50615 4.2661 3.98685 4.4603 3.7381 4.89126L2.97809 6.20801C2.72943 6.63882 2.8209 7.18542 3.19628 7.51179C3.68948 7.94062 4.45138 7.81317 4.77818 7.24719L5.53839 5.93056Z" fill="white"/>
            <path d="M13.1796 12.0976C12.8527 12.6636 13.1233 13.3873 13.7413 13.6C14.2118 13.762 14.7311 13.5678 14.9799 13.1369L15.7399 11.8201C15.9885 11.3893 15.8971 10.8427 15.5217 10.5163C15.0285 10.0875 14.2666 10.215 13.9398 10.7809L13.1796 12.0976Z" fill="white"/>
            <path d="M4.77818 10.7809C4.45138 10.215 3.68948 10.0875 3.19628 10.5163C2.8209 10.8427 2.72943 11.3893 2.97809 11.8201L3.7381 13.1369C3.98685 13.5678 4.50615 13.762 4.97664 13.6C5.59467 13.3873 5.86523 12.6636 5.53839 12.0976L4.77818 10.7809Z" fill="white"/>
            <path d="M13.9398 7.24719C14.2666 7.81317 15.0285 7.94062 15.5217 7.51179C15.8971 7.18542 15.9885 6.63882 15.7399 6.20801L14.9799 4.89126C14.7311 4.4603 14.2118 4.2661 13.7413 4.42808C13.1233 4.64086 12.8527 5.36451 13.1796 5.93056L13.9398 7.24719Z" fill="white"/>
            </svg>
          <div class="ONEAS-percent__text">
              <div class="ONEAS-damage__value">2</div>           
              <div class="ONEAS-damage__text">%</div>
          </div>
      </div>    
  </div>    
  <div class="ONEAS-speedometer-info"> 
      <div class="ONEAS-speedometer__params">        
          <svg class="icon__params icon__key" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_414_38)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.90389 0.0698878C4.89871 0.0776017 4.87379 0.0839131 4.8485 0.0839131C4.79888 0.0839131 4.6029 0.140603 4.52488 0.177532C4.35804 0.256493 4.14486 0.418597 4.05781 0.532721C4.03722 0.559719 4.01121 0.590477 4.00001 0.601066C3.96973 0.629733 3.85223 0.853421 3.83151 0.92192C3.82158 0.954711 3.80634 1.0052 3.79764 1.03412C3.78685 1.06994 3.78321 2.06669 3.7862 4.15823L3.78833 5.65131C3.78958 6.52342 4.49692 7.22975 5.36904 7.22975H6.87723C6.91534 7.22975 6.94557 7.19766 6.94331 7.15962C6.93748 7.06131 6.91262 6.7474 6.90667 6.69679C6.90403 6.6743 6.92145 6.65446 6.94409 6.65417L7.44313 6.6477C7.74327 6.64382 7.98453 6.39941 7.98453 6.09925V6.04462V6.03574C7.98453 5.71032 7.72278 5.44542 7.39738 5.44153L6.89528 5.43554C6.84629 5.43495 6.80499 5.39884 6.79788 5.35037C6.79107 5.30409 6.77903 5.18417 6.7711 5.08389C6.76316 4.98361 6.74981 4.81952 6.74142 4.71924C6.73303 4.61896 6.71964 4.45803 6.71171 4.36159C6.6845 4.03166 6.67386 3.96176 6.64464 3.92081C6.60724 3.86841 6.47316 3.74594 6.40609 3.70291C6.37674 3.68409 6.34243 3.65862 6.32983 3.64631C6.31727 3.63402 6.28295 3.60878 6.25358 3.59021C6.22424 3.57167 6.18992 3.54642 6.17732 3.53411C6.16476 3.52182 6.13044 3.49657 6.10107 3.47801C6.07173 3.45946 6.03741 3.43422 6.02482 3.4219C6.01225 3.40962 5.97965 3.38521 5.95238 3.36768C5.92511 3.35018 5.90281 3.33009 5.90281 3.32305C5.90281 3.31601 6.03311 3.19018 6.19236 3.04345C6.39303 2.85851 6.49396 2.75472 6.52123 2.70525C6.5646 2.62656 6.56475 2.61391 6.52834 2.17718C6.51982 2.07498 6.50598 1.9093 6.49759 1.80902C6.4892 1.70874 6.47581 1.54622 6.46779 1.44787C6.4339 1.03158 6.41179 0.934557 6.30708 0.743099C6.22735 0.597265 6.17351 0.528752 6.04794 0.413282C5.93042 0.305189 5.84767 0.248359 5.7245 0.191164C5.61784 0.141627 5.42766 0.0839131 5.37108 0.0839131C5.3458 0.0839131 5.32085 0.0776017 5.31566 0.0698878C5.30315 0.0512483 4.91643 0.0512483 4.90389 0.0698878ZM2.65441 7.83982C2.64183 7.84731 2.59085 7.85354 2.54112 7.85368C2.49138 7.85379 2.42962 7.85974 2.40386 7.86689C2.01155 7.97578 1.92866 8.00793 1.73937 8.1247C1.67646 8.16349 1.62156 8.1992 1.61737 8.20405C1.61317 8.20891 1.58572 8.22829 1.55636 8.24711C1.48762 8.29123 1.3304 8.43581 1.28243 8.49903C1.26195 8.52604 1.24098 8.55129 1.23583 8.55513C1.20789 8.57606 1.1228 8.70761 1.04533 8.84966C0.941457 9.04018 0.935082 9.05682 0.881705 9.27743C0.869748 9.32688 0.864746 9.87075 0.864746 11.1217C0.864746 12.3728 0.869748 12.9166 0.881705 12.9661C0.918078 13.1164 0.927838 13.1503 0.950348 13.2045C0.963159 13.2353 0.987712 13.2943 1.0049 13.3354C1.03372 13.4044 1.18102 13.6442 1.20449 13.6603C1.2101 13.6642 1.23146 13.6894 1.25196 13.7164C1.31879 13.8044 1.56492 14.02 1.68047 14.0917C1.82851 14.1835 2.06909 14.2922 2.21214 14.3319C2.27505 14.3493 2.3476 14.3695 2.37336 14.3766C2.39912 14.3838 2.44847 14.3896 2.48303 14.3896C2.51758 14.3896 2.5501 14.3959 2.55528 14.4036C2.56151 14.4129 3.5261 14.4177 5.39954 14.4177C7.273 14.4177 8.23757 14.4129 8.24379 14.4036C8.24898 14.3959 8.28149 14.3896 8.31605 14.3896C8.35061 14.3896 8.39996 14.3838 8.42573 14.3766C8.45148 14.3695 8.52404 14.3493 8.58693 14.3319C8.72999 14.2922 8.97058 14.1835 9.1186 14.0917C9.23417 14.02 9.48029 13.8044 9.54712 13.7164C9.56762 13.6894 9.589 13.6642 9.59461 13.6603C9.61806 13.6442 9.76536 13.4044 9.79418 13.3354C9.879 13.1324 9.8722 13.1528 9.91737 12.9661C9.94132 12.8671 9.94132 9.37639 9.91737 9.27743C9.86903 9.0776 9.87696 9.09819 9.75572 8.85771C9.69862 8.74447 9.58994 8.57283 9.56414 8.55513C9.5585 8.55129 9.53714 8.52604 9.51665 8.49903C9.4687 8.43581 9.31146 8.29123 9.24271 8.24711C9.21337 8.22829 9.18592 8.20891 9.18171 8.20405C9.16487 8.18456 8.9402 8.0518 8.86419 8.01642C8.78254 7.97839 8.5554 7.90442 8.44205 7.87892C8.4085 7.87138 8.32615 7.85873 8.25904 7.85081C8.0947 7.83146 2.68624 7.82083 2.65441 7.83982ZM7.344 10.2241C7.344 10.5533 7.07713 10.8202 6.74793 10.8202H5.39954H4.03711C3.71502 10.8202 3.4533 10.5603 3.4511 10.2382C3.4489 9.91805 3.45041 9.64823 3.45445 9.63855C3.46029 9.62453 3.85754 9.62167 5.40289 9.6245L6.74793 9.62697C7.07731 9.62757 7.344 9.89476 7.344 10.2241ZM7.344 12.6224C7.344 12.9439 7.08341 13.2045 6.76196 13.2045H5.39954H4.02308C3.70874 13.2045 3.45329 12.9508 3.45108 12.6365C3.4489 12.3241 3.45041 12.0606 3.45445 12.0509C3.46029 12.0369 3.85699 12.034 5.40289 12.0368L6.76196 12.0393C7.08359 12.0399 7.344 12.3008 7.344 12.6224Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_414_38">
            <rect width="10" height="15" fill="white" transform="translate(0.5)"/>
            </clipPath>
            </defs>
            </svg>

          <svg class="icon__params icon__lights" width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_414_40)">
            <mask id="mask0_414_40" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="12">
            <path d="M15.8469 0.323486H2.9969C1.74451 0.323486 0.729248 1.33875 0.729248 2.59114V9.39404C0.729248 10.6464 1.74451 11.6617 2.9969 11.6617H15.8469C17.0993 11.6617 18.1145 10.6464 18.1145 9.39404V2.59114C18.1145 1.33875 17.0993 0.323486 15.8469 0.323486Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_414_40)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.89024 0.336005C5.88362 0.342743 5.80019 0.354167 5.70491 0.361387C5.60959 0.368607 5.4896 0.381858 5.43825 0.390835C5.38688 0.399813 5.2952 0.415097 5.23452 0.424781C5.01092 0.460467 4.46865 0.619823 4.25829 0.711668C4.22094 0.727986 4.1369 0.764516 4.07154 0.792862C3.63285 0.983096 3.19963 1.24755 2.80827 1.56397C2.58472 1.74474 2.11849 2.21793 1.94038 2.44481C1.62862 2.84201 1.36806 3.2817 1.18062 3.72695C1.15269 3.7933 1.1167 3.87859 1.10062 3.9165C1.01013 4.13 0.853118 4.68037 0.817957 4.9073C0.808416 4.96889 0.793339 5.06194 0.78446 5.11408C0.710844 5.54648 0.710844 6.40481 0.78446 6.83722C0.793339 6.88932 0.808433 6.98237 0.818025 7.04399C0.854035 7.27548 0.978992 7.70809 1.09176 7.99172C1.11249 8.04382 1.1401 8.11565 1.15312 8.15128C1.19006 8.25243 1.41025 8.69272 1.49556 8.83605C1.66795 9.12564 1.96524 9.53741 2.09272 9.66316C2.11675 9.68684 2.1707 9.74883 2.21264 9.80094C2.30756 9.91887 2.33381 9.94551 2.45021 10.0422C2.50155 10.0848 2.57027 10.1473 2.60296 10.181C2.74715 10.3298 3.13514 10.6205 3.43487 10.8043C3.57538 10.8905 4.07702 11.1485 4.17755 11.1864C4.21262 11.1996 4.28332 11.2276 4.3347 11.2486C4.61765 11.3644 5.05051 11.4867 5.34488 11.534C5.38223 11.54 5.45479 11.5521 5.50617 11.561C5.76976 11.6063 6.02528 11.6143 7.423 11.621C9.07969 11.6289 8.96075 11.6377 9.00818 11.5038C9.02268 11.4629 9.06509 11.3441 9.10244 11.2398C9.20855 10.9436 9.34557 10.5171 9.43742 10.1973C9.4821 10.0417 9.63188 9.43777 9.65106 9.33576C9.66088 9.28362 9.6751 9.20997 9.68271 9.17207C9.69032 9.13416 9.7056 9.05661 9.71667 8.99975C9.72774 8.94289 9.74373 8.86145 9.75225 8.81882C9.76077 8.77616 9.77595 8.69086 9.786 8.62928C9.79602 8.56766 9.81123 8.47461 9.81979 8.4225C9.87001 8.11589 9.92828 7.62903 9.95592 7.28523C10.0552 6.04892 10.0048 4.65883 9.81979 3.52878C9.81123 3.47666 9.79602 3.38361 9.786 3.32201C9.77595 3.26041 9.76077 3.17511 9.75225 3.13246C9.74373 3.08982 9.72774 3.0084 9.71667 2.95154C9.7056 2.89467 9.69032 2.81713 9.68271 2.77922C9.6751 2.74131 9.66088 2.66765 9.65106 2.61553C9.63184 2.51333 9.48203 1.9092 9.43742 1.75396C9.33718 1.40507 9.22068 1.04206 9.10852 0.728692C9.07117 0.624441 9.02818 0.504252 9.01293 0.461605C8.95912 0.311003 9.10743 0.323754 7.40863 0.323754C6.58015 0.323754 5.89689 0.329268 5.89024 0.336005ZM10.1445 0.344431C10.1333 0.355804 10.1241 0.375103 10.1241 0.387303C10.1241 0.39952 10.1923 0.620891 10.2756 0.87926C10.4614 1.45577 10.4707 1.4886 10.5963 2.01243C10.7053 2.46687 10.7621 2.72136 10.7788 2.83092C10.7845 2.86883 10.7963 2.93474 10.8048 2.97738C10.8134 3.02003 10.8286 3.10532 10.8386 3.16693C10.8487 3.22853 10.8639 3.32158 10.8724 3.3737C10.8867 3.46105 10.8961 3.52539 10.9402 3.83896C10.9772 4.10105 11.0104 4.44761 11.0427 4.9073C11.053 5.05418 11.0614 5.53494 11.0614 5.97565C11.0614 6.41632 11.053 6.89708 11.0427 7.04399C11.0104 7.50366 10.9772 7.85021 10.9402 8.11234C10.8961 8.42588 10.8867 8.49022 10.8724 8.57758C10.8639 8.62969 10.8491 8.72274 10.8395 8.78436C10.8299 8.84594 10.8184 8.91187 10.8141 8.93083C10.8097 8.94978 10.7973 9.01181 10.7864 9.06868C10.7755 9.12554 10.7601 9.20308 10.7523 9.24099C10.7445 9.2789 10.7291 9.35644 10.718 9.4133C10.6912 9.55136 10.5039 10.3297 10.461 10.4816C10.4423 10.548 10.3574 10.8182 10.2724 11.0821C10.154 11.4496 10.122 11.5685 10.1356 11.5904C10.1515 11.616 10.2208 11.6194 10.8169 11.6234L11.4805 11.6279L11.5727 11.5866C11.6839 11.5366 11.7958 11.4376 11.8397 11.3502C11.8982 11.2339 12.0925 10.6477 12.2218 10.1973C12.2665 10.0417 12.4163 9.43777 12.4354 9.33576C12.4453 9.28362 12.4595 9.20997 12.4671 9.17207C12.4747 9.13416 12.49 9.05661 12.501 8.99975C12.5121 8.94289 12.5281 8.86145 12.5366 8.81882C12.5452 8.77616 12.5603 8.69086 12.5704 8.62928C12.5804 8.56766 12.5956 8.47461 12.6042 8.4225C12.6544 8.11589 12.7127 7.62903 12.7403 7.28523C12.8396 6.04892 12.7892 4.65883 12.6042 3.52878C12.5956 3.47666 12.5804 3.38361 12.5704 3.32201C12.5603 3.26041 12.5452 3.17511 12.5366 3.13246C12.5281 3.08982 12.5121 3.0084 12.501 2.95154C12.49 2.89467 12.4747 2.81713 12.4671 2.77922C12.4595 2.74131 12.4453 2.66765 12.4354 2.61553C12.4162 2.51333 12.2664 1.9092 12.2218 1.75396C12.085 1.27805 11.9012 0.723402 11.8397 0.601024C11.7959 0.513764 11.6839 0.414666 11.5731 0.364937C11.4816 0.323823 11.4803 0.323754 10.8232 0.323754C10.3338 0.323754 10.1596 0.329061 10.1445 0.344431ZM13.5401 0.501943C13.4408 0.554706 13.3381 0.659317 13.2889 0.757796C13.2544 0.826859 13.2481 0.864648 13.2481 1.00115C13.2481 1.15936 13.2495 1.1649 13.3134 1.26533C13.3552 1.33091 13.4088 1.38736 13.462 1.42188C13.637 1.53534 13.5359 1.52942 15.3026 1.52969C16.8356 1.52993 16.9112 1.52849 16.9953 1.4973C17.1482 1.44059 17.2644 1.33203 17.3244 1.18998C17.3734 1.07399 17.3693 0.864665 17.316 0.758278C17.264 0.65463 17.1665 0.555705 17.0644 0.50296L16.9843 0.461605L15.2987 0.46238L13.6131 0.463155L13.5401 0.501943ZM14.2922 3.82214C14.1343 3.90158 14.0441 3.99587 13.9946 4.13331C13.9014 4.39191 14.0187 4.65897 14.2856 4.79623L14.3675 4.83838L16.0361 4.83824L17.7048 4.8381L17.8151 4.78217C17.9106 4.73375 17.9373 4.7088 18.0133 4.59707C18.1008 4.46839 18.1011 4.46735 18.1024 4.32895C18.1035 4.21447 18.0964 4.17507 18.0622 4.10494C17.9924 3.9622 17.8774 3.85278 17.7458 3.80398C17.6571 3.77107 17.6043 3.77003 16.0242 3.77048L14.3941 3.7709L14.2922 3.82214ZM14.2672 7.16551C14.116 7.25008 14.0479 7.32828 13.9933 7.47974C13.9461 7.61073 13.9515 7.71639 14.0118 7.84463C14.0724 7.97362 14.1822 8.08194 14.3109 8.13967L14.4036 8.18126H16.0289C17.6037 8.18126 17.6571 8.18019 17.7458 8.14732C17.8774 8.09848 17.9924 7.9891 18.0622 7.84632C18.0964 7.77622 18.1035 7.7368 18.1024 7.62231C18.1011 7.48391 18.1008 7.48287 18.0133 7.35423C17.9373 7.24246 17.9106 7.21751 17.8151 7.16913L17.7048 7.11316L16.0324 7.11337L14.3601 7.11354L14.2672 7.16551ZM13.6046 10.4543C13.4754 10.5044 13.3813 10.5794 13.3129 10.6868C13.2495 10.7863 13.2481 10.7921 13.2481 10.9501C13.2481 11.1365 13.2816 11.2256 13.3949 11.3406C13.4309 11.3771 13.4963 11.4255 13.5404 11.4483L13.6205 11.4897H15.3024H16.9843L17.0644 11.4483C17.1665 11.3956 17.264 11.2967 17.316 11.193C17.3693 11.0866 17.3734 10.8773 17.3244 10.7613C17.2644 10.6193 17.1482 10.5107 16.9953 10.454C16.9111 10.4228 16.8373 10.4214 15.2941 10.423C13.8115 10.4245 13.6748 10.427 13.6046 10.4543Z" fill="white"/>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_414_40">
            <rect width="18" height="12" fill="white" transform="translate(0.5)"/>
            </clipPath>
            </defs>
            </svg>
          
          <svg class="icon__params icon__doors ONEAS-speedometer-param--active" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_414_67)">
            <mask id="mask0_414_67" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
            <path d="M11.2589 0.811768H2.94416C1.69178 0.811768 0.676514 1.82703 0.676514 3.07942V11.3941C0.676514 12.6465 1.69178 13.6618 2.94416 13.6618H11.2589C12.5113 13.6618 13.5265 12.6465 13.5265 11.3941V3.07942C13.5265 1.82703 12.5113 0.811768 11.2589 0.811768Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_414_67)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.64868 0.823975C1.64211 0.830525 1.61417 0.839015 1.58656 0.842815C1.49628 0.855265 1.43705 0.873561 1.37051 0.909515C1.33451 0.92898 1.29896 0.944911 1.29152 0.944911C1.26393 0.944911 1.08457 1.08398 1.00909 1.16389C0.919859 1.25839 0.808766 1.42617 0.776441 1.51531C0.724565 1.65834 0.70189 1.74251 0.70189 1.7921C0.70189 1.8149 0.696243 1.83725 0.689341 1.84177C0.673116 1.85238 0.671836 13.3704 0.688062 13.3886C0.694248 13.3956 0.702267 13.4251 0.705855 13.4544C0.717613 13.55 0.734893 13.6127 0.768849 13.6831C0.787233 13.7212 0.802279 13.7589 0.802279 13.7668C0.802279 13.796 0.933624 13.9859 1.00909 14.0658C1.08457 14.1457 1.26393 14.2848 1.29152 14.2848C1.29896 14.2848 1.33451 14.3007 1.37051 14.3202C1.43705 14.3561 1.49628 14.3744 1.58656 14.3869C1.61417 14.3907 1.64213 14.3992 1.64868 14.4057C1.65565 14.4127 2.96288 14.4177 4.79942 14.4177H7.93821L8.0313 14.3641C8.1349 14.3044 8.16918 14.2585 8.26902 14.0456C8.34125 13.8916 8.5601 13.5164 8.59448 13.4876C8.59885 13.4839 8.61599 13.46 8.63258 13.4344C8.64916 13.4089 8.66611 13.385 8.67022 13.3813C8.67434 13.3776 8.69128 13.3537 8.70787 13.3281C8.72446 13.3026 8.7414 13.2787 8.74551 13.275C8.74963 13.2714 8.76667 13.2474 8.78336 13.2218C8.80007 13.1963 8.83385 13.1544 8.85845 13.1288C8.88304 13.1033 8.91708 13.0614 8.93407 13.0358C8.9743 12.9753 9.30352 12.6268 9.36039 12.5845C9.38456 12.5666 9.41844 12.5365 9.43568 12.5176C9.45295 12.4988 9.48683 12.469 9.51097 12.4513C9.53514 12.4337 9.56338 12.4097 9.57372 12.3981C9.58408 12.3864 9.61232 12.3625 9.63646 12.3449C9.66063 12.3274 9.68322 12.3094 9.68665 12.3051C9.69012 12.3007 9.7127 12.2828 9.73685 12.2652C9.76102 12.2476 9.7836 12.2295 9.78704 12.225C9.84032 12.1547 10.5688 11.7252 10.769 11.6461C11.0815 11.5226 11.3042 11.443 11.4184 11.4139C11.4715 11.4004 11.5503 11.38 11.6223 11.3609C11.7014 11.3399 11.791 11.3218 11.8827 11.3083C11.9276 11.3016 12.001 11.2896 12.0458 11.2816C12.202 11.2536 12.4061 11.2404 12.8238 11.2313L13.2442 11.2222L13.3335 11.1717C13.4173 11.1242 13.4258 11.1151 13.4746 11.02L13.5266 10.9188V8.94872C13.5266 7.64968 13.5223 6.97586 13.514 6.97044C13.5071 6.96592 13.5015 6.94421 13.5015 6.92218C13.5015 6.87288 13.4498 6.7072 13.4055 6.61427C13.3743 6.5489 13.305 6.43341 13.2884 6.41904C13.2841 6.41539 13.2669 6.39153 13.25 6.36605C13.21 6.30546 8.33829 1.1472 8.28109 1.10483C8.257 1.087 8.23448 1.06874 8.23102 1.06425C8.21744 1.04661 8.1084 0.973225 8.04666 0.940221C7.95889 0.893292 7.80241 0.838617 7.75586 0.838617C7.73505 0.838617 7.71452 0.832638 7.71026 0.82533C7.70024 0.808177 1.66582 0.806822 1.64868 0.823975ZM7.3392 2.42265C7.36384 2.43155 7.40892 2.45641 7.43936 2.47789C7.52484 2.53824 11.9273 7.20572 11.9572 7.26766C12.0053 7.36768 12.0204 7.43425 12.0206 7.54859C12.0209 7.77136 11.9254 7.9338 11.7572 7.99665C11.7227 8.00954 10.7276 8.0131 7.09731 8.01326L2.48134 8.01344L2.38309 7.95934C2.28697 7.90638 2.28373 7.90295 2.23373 7.80117L2.18262 7.69717V5.2109V2.72467L2.22611 2.63322C2.27085 2.53916 2.29804 2.51172 2.4131 2.44455L2.47751 2.40693L4.88595 2.40669C6.74725 2.40651 7.30456 2.41013 7.3392 2.42265ZM2.94133 3.22026C2.93804 3.22941 2.93681 4.13074 2.93858 5.22323L2.94181 7.2096L6.87891 7.21294C10.3783 7.21592 10.8161 7.21406 10.8161 7.19628C10.8161 7.18528 9.97178 6.28245 8.93994 5.18996L7.06385 3.20366H5.00559C3.37051 3.20366 2.94606 3.20707 2.94133 3.22026ZM4.99379 9.68856C5.09007 9.74157 5.09308 9.74479 5.14357 9.84754L5.1951 9.95238L5.19023 10.295C5.18757 10.4834 5.17926 10.6675 5.17178 10.704C5.13057 10.9056 5.09958 11.0051 5.03691 11.137C4.99455 11.2263 4.92535 11.3449 4.90588 11.3617C4.90164 11.3654 4.88437 11.3893 4.86751 11.4148C4.81337 11.497 4.63586 11.6753 4.54034 11.7435C4.38451 11.8549 4.21747 11.9352 4.05863 11.9752C3.91479 12.0114 3.86739 12.0167 3.68844 12.0167C3.50953 12.0167 3.46212 12.0114 3.31826 11.9752C2.91317 11.8732 2.53679 11.5507 2.34005 11.137C2.27737 11.0053 2.24636 10.9058 2.20511 10.704C2.19763 10.6675 2.18933 10.4838 2.18666 10.296L2.18182 9.95434L2.22571 9.86205C2.27087 9.76708 2.29783 9.73982 2.4131 9.67253L2.47751 9.6349L3.68654 9.63467L4.89556 9.63443L4.99379 9.68856ZM2.944 10.4404C2.93178 10.4533 2.9336 10.5227 2.94739 10.5702C2.95392 10.5926 2.9683 10.6445 2.97934 10.6854C3.03952 10.9083 3.23825 11.1187 3.44877 11.1825C3.48741 11.1942 3.53638 11.2094 3.55759 11.2163C3.60733 11.2325 3.76958 11.2325 3.81932 11.2163C3.84051 11.2094 3.88947 11.1942 3.92815 11.1825C4.13856 11.1188 4.33685 10.9089 4.39774 10.6854C4.40888 10.6445 4.42376 10.5899 4.43079 10.5641C4.43782 10.5383 4.44166 10.4994 4.43932 10.4777L4.43508 10.4383L3.69379 10.4348C3.28606 10.433 2.94866 10.4355 2.944 10.4404Z" fill="white"/>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_414_67">
            <rect width="14" height="14" fill="white" transform="translate(0.5)"/>
            </clipPath>
            </defs>
            </svg>
          
          <svg class="icon__params icon__rem ONEAS-speedometer-param--active" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_414_46" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="0" width="16" height="16">
            <path d="M14.1236 0.811768H3.54133C2.28894 0.811768 1.27368 1.82703 1.27368 3.07942V13.6617C1.27368 14.9141 2.28894 15.9294 3.54133 15.9294H14.1236C15.376 15.9294 16.3913 14.9141 16.3913 13.6617V3.07942C16.3913 1.82703 15.376 0.811768 14.1236 0.811768Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_414_46)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0005 4.93653L14.6212 5.31584C14.4635 5.47379 14.2536 5.56075 14.0304 5.56075C13.8073 5.56075 13.5974 5.47379 13.4397 5.31584L10.9833 2.8593C10.8254 2.70159 10.7387 2.49169 10.7387 2.26852C10.7387 2.04535 10.8254 1.83542 10.9833 1.67771L11.3624 1.29867L11.3171 1.25335C11.1056 1.04185 10.7627 1.04185 10.5512 1.25335L7.40985 4.39473C7.30821 4.49637 7.25122 4.63415 7.25122 4.77766C7.25122 4.92121 7.30821 5.05899 7.40985 5.16062L11.1386 8.88913C11.3501 9.10042 11.6929 9.10042 11.9044 8.88913L15.0458 5.74772C15.1474 5.64608 15.2044 5.5083 15.2044 5.36476C15.2044 5.22127 15.1474 5.08346 15.0458 4.98183L15.0005 4.93653Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53725 7.25599C7.06712 6.78634 6.24744 6.78633 5.77731 7.25647L4.2961 8.73764L4.06423 8.50577C3.96259 8.40413 3.82478 8.34714 3.68127 8.34714C3.53773 8.34714 3.39994 8.40413 3.29831 8.50577L1.68936 10.1149C1.4779 10.3264 1.4779 10.6693 1.68936 10.8808L1.73469 10.9259L2.13915 10.5214C2.4546 10.2056 3.00531 10.2056 3.3207 10.5214L5.77704 12.9778C6.10274 13.3035 6.10274 13.8336 5.77704 14.1593L5.37257 14.5638L5.41811 14.6093C5.62963 14.8208 5.97253 14.8208 6.184 14.6093L7.79294 13.0004C8.00441 12.7889 8.00441 12.446 7.79294 12.2345L7.5608 12.0024L9.04224 10.521C9.27732 10.2859 9.40685 9.97328 9.40685 9.6409C9.40685 9.30852 9.27732 8.99586 9.04224 8.76081L7.53725 7.25599ZM6.96159 10.613L5.68553 9.33694L6.65763 8.36502L7.93375 9.6409L6.96159 10.613Z" fill="white"/>
            <path d="M1.27368 12.7128L3.58558 15.0251L5.04225 13.5684L2.7302 11.2563L1.27368 12.7128Z" fill="white"/>
            <path d="M15.4873 3.12409L13.1748 0.812012L11.7183 2.2685L14.0304 4.58082L15.4873 3.12409Z" fill="white"/>
            </g>
            </svg>
      </div>
      <div class="ONEAS-speedometer__mileage">
          <span class="ONEAS-mileage__value">276564</span>
          <span class="ONEAS-mileage__text">км</span>
      </div>
      <div style="display: none" class="ONEAS-speedometer__turns">           
          <div class="turn__left">
            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_414_55)">
              <path d="M1.43934 10.9393C0.853553 11.5251 0.853553 12.4749 1.43934 13.0607L10.9853 22.6066C11.5711 23.1924 12.5208 23.1924 13.1066 22.6066C13.6924 22.0208 13.6924 21.0711 13.1066 20.4853L4.62132 12L13.1066 3.51476C13.6924 2.92897 13.6924 1.97922 13.1066 1.39344C12.5208 0.807655 11.5711 0.807655 10.9853 1.39344L1.43934 10.9393ZM29.5 10.5H2.5V13.5H29.5V10.5Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_414_55">
              <rect width="29" height="24" fill="white" transform="translate(0.5)"/>
              </clipPath>
              </defs>
            </svg>
          </div>
          <div class="turn__right">
            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_414_55)">
              <path d="M1.43934 10.9393C0.853553 11.5251 0.853553 12.4749 1.43934 13.0607L10.9853 22.6066C11.5711 23.1924 12.5208 23.1924 13.1066 22.6066C13.6924 22.0208 13.6924 21.0711 13.1066 20.4853L4.62132 12L13.1066 3.51476C13.6924 2.92897 13.6924 1.97922 13.1066 1.39344C12.5208 0.807655 11.5711 0.807655 10.9853 1.39344L1.43934 10.9393ZM29.5 10.5H2.5V13.5H29.5V10.5Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_414_55">
              <rect width="29" height="24" fill="white" transform="translate(0.5)"/>
              </clipPath>
              </defs>
            </svg>
          </div>
      </div>
  </div>`;
      const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, 'ONEAS-speedometer', (prop, value) => this.onChangeInfo(prop, value));

      this.create(speedometerEl);

      interface('Hud').speedometer.show = 0;
    },
  },
  colorChanger: {
    data: {
      defaultColor: 'first-color',
      color: '',
      prevColor: '',
    },

    loadConfig() {
      const color = localStorage.getItem('hud-color');

      if (color === null) {
        this.data.color = this.data.defaultColor;
        this.saveConfig(this.data.defaultColor);
        return;
      }

      this.data.color = color;
    },

    saveConfig(color) {
      localStorage.setItem('hud-color', color);
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
      jsLoader.mainMenu.addNewOption(3, 'Цвет интерфейсов', {
        data: [
          {
            id: 'first-color',
            value: 'Viva Magenta',
          },
          {
            id: 'second-color',
            value: 'Белый',
          },
          {
            id: 'third-color',
            value: 'Чёрный',
          },
          {
            id: 'fourth-color',
            value: 'Синий',
          },
          {
            id: 'fifth-color',
            value: 'Золотой',
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

    jsLoader.showAddedScript(`HUD ${nameMod}`, 'info');
  },
};

oneasHud.init();
