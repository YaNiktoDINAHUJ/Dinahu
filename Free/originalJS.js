const vol = '1.0.1',
  lvl = 'Free',
  nameMod = 'Nalomal Drova';

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
    name: 'Время на экране',
    id: 'Screen_Time',
    filePath: 'additional-scripts/screenTime.js',
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
    timeSelector: ".ONEAS-time",
    dateSelector: ".ONEAS-date",
    wrapperSelector: ".ONEAS-timer",
};

const oneasHud = {
  getScale() {
    const { clientWidth, clientHeight } = document.documentElement;
    return (clientWidth + clientHeight) / (1920 + 1080);
  },
  wantedAlwaysShowClass: '.ONEAS-hud__wanted--always-show',
  hud: {
    barsValues: {
      hunger: {
        dashArray: 141,
        dashOffset: 141,
      },
      breath: {
        dashArray: 141,
        dashOffset: 141,
      },
      freeze: {
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
        progress: null,
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
        icon: null,
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
      this.data.hud_topEl = hudEl.querySelector('.ONEAS-hud__top');
      this.data.hud_btEl = hudEl.querySelector('.ONEAS-hud__bottom');
      this.data.moneyEl = hudEl.querySelector('#ONEAS-cash__value');
      [this.data.hpEl.progress, this.data.hpEl.value] = [hudEl.querySelector('.ONEAS-param__health .ONEAS-progress__value'), hudEl.querySelector('.ONEAS-param__health .ONEAS-param__amount')];
      [this.data.armourEl.wrapper, this.data.armourEl.progress, this.data.armourEl.value] = [hudEl.querySelector('.ONEAS-param__armour'), hudEl.querySelector('.ONEAS-param__armour .ONEAS-progress__value'), hudEl.querySelector('.ONEAS-param__armour .ONEAS-param__amount')];
      [this.data.hungerEl.progress, this.data.hungerEl.value] = [hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__bar'), hudEl.querySelector('.ONEAS-param__hunger .ONEAS-param__amount')];
      [this.data.breathEl.wrapper, this.data.breathEl.progress, this.data.breathEl.value] = [hudEl.querySelector('.ONEAS-param__breath'), hudEl.querySelector('.ONEAS-param__breath .ONEAS-param__bar'), hudEl.querySelector('.ONEAS-param__breath .ONEAS-param__amount')];
      [this.data.freezeEl.wrapper, this.data.freezeEl.progress, this.data.freezeEl.value] = [hudEl.querySelector('.ONEAS-param__freeze'), hudEl.querySelector('.ONEAS-param__freeze .ONEAS-param__bar'), hudEl.querySelector('.ONEAS-param__freeze .ONEAS-param__amount')];
      [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector('.ONEAS-wanted'), hudEl.querySelector('.ONEAS-wanted__row').children];
      this.data.weaponEl.ammoEl = hudEl.querySelector('.ONEAS-weapon__ammo').children;
      this.data.weaponEl.icon = hudEl.querySelector('.ONEAS-weapon__icon');
      this.data.weaponEl.nameEl = hudEl.querySelector('.ONEAS-weapon-name');
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

        if (value == 0) (this.data.weaponEl.nameEl.style.color = 'transparent'), (this.data.weaponEl.nameEl.style.opacity = '0'),
        setTimeout(() => {
            this.data.weaponEl.nameEl.style.border = '2px solid transparent';
            this.data.weaponEl.nameEl.style.padding = '1.2vh 0';
            this.data.weaponEl.nameEl.style.width = '0';
            this.data.weaponEl.icon.style.width = '0';
            //this.data.weaponEl.icon.style.transition = '';
        }, 500);
        else
        (this.data.weaponEl.nameEl.style.border = ''), (this.data.weaponEl.nameEl.style.width = ''), (this.data.weaponEl.nameEl.style.padding = ''), (this.data.weaponEl.nameEl.style.color = ''),
            setTimeout(() => {
                this.data.weaponEl.icon.style.width = '';
               // this.data.weaponEl.icon.style.transition = '0.35s';
                this.data.weaponEl.nameEl.style.opacity = '1';
            }, 300);

        if (value == 1) this.data.weaponEl.nameEl.innerText = 'Кастет'; 
        else if (value == 2) this.data.weaponEl.nameEl.innerText = 'Коса';
        else if (value == 3) this.data.weaponEl.nameEl.innerText = 'Полицейская дубинка';
        else if (value == 4) this.data.weaponEl.nameEl.innerText = 'Нож'; 
        else if (value == 5) this.data.weaponEl.nameEl.innerText = 'Бита'; 
        else if (value == 6) this.data.weaponEl.nameEl.innerText = 'Лопата'; 
        else if (value == 7) this.data.weaponEl.nameEl.innerText = 'Кий'; 
        else if (value == 8) this.data.weaponEl.nameEl.innerText = 'Мачета'; 
        else if (value == 9) this.data.weaponEl.nameEl.innerText = 'Бензопила'; 
        else if ((value == 10) | (value == 11) | (value == 12) | (value == 13)) this.data.weaponEl.nameEl.innerText = 'Игрушка для взрослых'; /*БН*//*БК*/
        else if (value == 14) this.data.weaponEl.nameEl.innerText = 'Цветы'; 
        else if (value == 15) this.data.weaponEl.nameEl.innerText = 'Топор'; 
        else if (value == 16) this.data.weaponEl.nameEl.innerText = 'Граната'; 
        else if (value == 17) this.data.weaponEl.nameEl.innerText = 'Дымовая граната'; 
        else if (value == 18) this.data.weaponEl.nameEl.innerText = 'Коктейль Молотова'; 
        else if (value == 22) this.data.weaponEl.nameEl.innerText = 'Пистолет Макарова';
        else if (value == 23) this.data.weaponEl.nameEl.innerText = 'Пистолет с глушителем';
        else if (value == 24) this.data.weaponEl.nameEl.innerText = 'Desert Eagle';
        else if (value == 25) this.data.weaponEl.nameEl.innerText = 'Дробовик';
        else if (value == 26) this.data.weaponEl.nameEl.innerText = 'Обрез';
        else if (value == 27) this.data.weaponEl.nameEl.innerText = 'Тактический дробовик';
        else if (value == 28) this.data.weaponEl.nameEl.innerText = 'Micro-Uzi';
        else if (value == 29) this.data.weaponEl.nameEl.innerText = 'MP5';
        else if (value == 30) this.data.weaponEl.nameEl.innerText = 'AK-47';
        else if (value == 31) this.data.weaponEl.nameEl.innerText = 'М4';
        else if (value == 32) this.data.weaponEl.nameEl.innerText = 'Тес-9';
        else if (value == 33) this.data.weaponEl.nameEl.innerText = 'Винтовка';
        else if (value == 34) this.data.weaponEl.nameEl.innerText = 'СВД';
        else if (value == 35) this.data.weaponEl.nameEl.innerText = 'РПГ'; 
        else if (value == 36) this.data.weaponEl.nameEl.innerText = 'Bazooka'; 
        else if (value == 37) this.data.weaponEl.nameEl.innerText = 'Огнемёт'; 
        else if (value == 38) this.data.weaponEl.nameEl.innerText = 'Миниган'; 
        else if (value == 39) this.data.weaponEl.nameEl.innerText = 'С4'; 
        else if (value == 40) this.data.weaponEl.nameEl.innerText = 'Кнопка детонатора'; 
        else if (value == 41) this.data.weaponEl.nameEl.innerText = 'Баллончик'; 
        else if (value == 42) this.data.weaponEl.nameEl.innerText = 'Огнетушитель'; 
        else if (value == 43) this.data.weaponEl.nameEl.innerText = 'Фотоаппарат'; 
        else if (value == 46) this.data.weaponEl.nameEl.innerText = 'Парашют'; 


        /*Отображение счетчиков патронов*/
        if ((value < 16) | (value == 40) | (value == 46)) (this.data.weaponEl.ammoEl[1].style.opacity = '0'), (this.data.weaponEl.ammoEl[0].style.opacity = '0');
        else setTimeout(() => {
            this.data.weaponEl.ammoEl[1].style.opacity = '1';
            this.data.weaponEl.ammoEl[0].style.opacity = '1';
        }, 300);
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

      if (prop == 'showGreenZoneTab') {
        this.data.greenZoneEl.style.display = '';
      }

      if (prop == 'hideGreenZoneTab') {
        this.data.greenZoneEl.style.display = 'none';
      }

      if (prop == 'health') {
        this.data.hpEl.progress.style.width = `${value}%`;
        this.data.hpEl.value.innerText = value;
      }

      if (prop == 'armour') {
        if (value > 0) this.data.armourEl.wrapper.style.opacity = '1';
        else this.data.armourEl.wrapper.style.opacity = '0';
        
        this.data.armourEl.progress.style.width = `${value}%`;
        this.data.armourEl.value.innerText = value;
      }

      if (prop == 'hunger') {
        const maxValue = 100;
        if (value > maxValue) value = maxValue;

        const multiplier = this.barsValues.hunger.dashArray - (value / maxValue) * this.barsValues.hunger.dashArray;

        this.data.hungerEl.progress.style.strokeDashoffset = multiplier;

        this.data.hungerEl.value.innerText = value;
      }

      if (prop == 'breath') {
        if (value < 100) this.data.breathEl.wrapper.style.display = '';
        else this.data.breathEl.wrapper.style.display = 'none';
        
        const maxValue = 100;
        if (value > maxValue) value = maxValue;

        const multiplier = this.barsValues.breath.dashArray - (value / maxValue) * this.barsValues.hunger.dashArray;

        this.data.breathEl.progress.style.strokeDashoffset = multiplier;

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
              this.data.wanted.els[i].src = 'images/hud/wanted_inactive.svg';
              this.data.wanted.els[i].classList.remove('ONEAS-wanted__active');
              this.data.wanted.els[i].classList.add('ONEAS-wanted__inactive');
            } else {
              this.data.wanted.els[i].src = 'images/hud/wanted_active.svg';
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
  
        this.data.bonusEl.src = `images/hud/bonus_${value}.svg`;
      }

      if (prop === "isShowFreeze" && value) {
        this.data.freezeEl.wrapper.style.display = '';
      }

      if (prop === "isShowFreeze" && !value) {
        this.data.freezeEl.wrapper.style.display = 'none';
      }

      if (prop == 'freeze') {        
        const maxValue = 100;
        if (value > maxValue) value = maxValue;

        const multiplier = this.barsValues.freeze.dashArray - (value / maxValue) * this.barsValues.hunger.dashArray;

        this.data.freezeEl.progress.style.strokeDashoffset = multiplier;

        this.data.freezeEl.value.innerText = value;
      }
    },
    init() {
      const hudHtml = `
      <div class="ONEAS-hud__top">
          <div class="ONEAS-info-1">
              <div class="ONEAS-timer">
                  <div class="ONEAS-timer__text">
                      <span class="ONEAS-time">12:12:12</span>
                      <span class="ONEAS-date">30.05.2023</span>
                  </div>
                  <img src="images/hud/icon_timer.svg" class="ONEAS-data_icon">
              </div>
              <div class="ONEAS-wanted ${oneasHud.wantedAlwaysShowClass}">
                  <div class="ONEAS-wanted__row">
                      <img class="ONEAS-wanted__inactive" alt="" src="images/hud/wanted_inactive.svg">
                      <img class="ONEAS-wanted__inactive" alt="" src="images/hud/wanted_inactive.svg">
                      <img class="ONEAS-wanted__inactive" alt="" src="images/hud/wanted_inactive.svg">
                      <img class="ONEAS-wanted__active" alt="" src="images/hud/wanted_active.svg">
                      <img class="ONEAS-wanted__active" alt="" src="images/hud/wanted_active.svg">
                      <img class="ONEAS-wanted__active" alt="" src="images/hud/wanted_active.svg">
                  </div>
              </div>
          </div>
          <div class="ONEAS-info-2">
              <div class="ONEAS-logo">
                  <img class="ONEAS-logo__image" src="images/logo/1.png">
                  <img class="ONEAS-logo__bonus" src="images/hud/bonus_3.svg">
              </div>
              <div class="ONEAS-params">
                  <div class="ONEAS-param__armour">
                      <div class="ONEAS-param__progress">
                          <div class="ONEAS-progress__value"></div>
                      </div>
                      <span class="ONEAS-param__amount">50</span>
                  </div>
                  <div class="ONEAS-param__health">
                      <div class="ONEAS-param__progress">
                          <div class="ONEAS-progress__value"></div>
                      </div>
                      <span class="ONEAS-param__amount">50</span>
                  </div>
              </div>
              <div class="ONEAS-cash">
                  <span id="ONEAS-cash__value">999.999.999</span>
                  <span id="ONEAS-cash__text">₽</span>
                  <img  class="ONEAS-cash__icon" alt="" src="images/hud/icon_cash.svg">
              </div>
              <div class="ONEAS-weapon">
                  <img class="ONEAS-weapon__icon" src="images/weapon/24.png">
                  <div class="ONEAS-weapon-name">Desert Eagle</div>
                  <div class="ONEAS-weapon__ammo">
                      <span id="ONEAS-ammo__in-clip">999</span>
                      <span id="ONEAS-ammo__total">299</span> 
                  </div>
              </div>
          </div>
      </div>
      <div class="ONEAS-hud__bottom">
          <div class="ONEAS-radar">
              <div class="ONEAS-radar-border">
                  <img class="ONEAS-radar__images" src="images/hud/radar_border.svg">
              </div>
              <div class="ONEAS-green-zone">
                  <img class="ONEAS-green-zone__image" src="images/hud/green_zone.svg">
                  <div class="ONEAS-green-zone__text">
                      <span>Зеленая</span>
                      <span>Зона</span>
                  </div>
              </div>
          </div>
          <div class="ONEAS-params-2">
              <div class="ONEAS-param__hunger ONEAS-param">
                  <span class="ONEAS-param__amount">0</span>
                  <img class="ONEAS-param__icon" src="images/hud/icon_hunger.svg">
                  <svg class="ONEAS-param__bar" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25 2.5C27.9547 2.5 30.8806 3.08198 33.6104 4.21271C36.3402 5.34344 38.8206 7.00078 40.9099 9.0901C42.9992 11.1794 44.6566 13.6598 45.7873 16.3896C46.918 19.1194 47.5 22.0453 47.5 25C47.5 27.9547 46.918 30.8806 45.7873 33.6104C44.6566 36.3402 42.9992 38.8206 40.9099 40.9099C38.8206 42.9992 36.3402 44.6566 33.6104 45.7873C30.8805 46.918 27.9547 47.5 25 47.5C22.0453 47.5 19.1194 46.918 16.3896 45.7873C13.6598 44.6566 11.1794 42.9992 9.0901 40.9099C7.00078 38.8206 5.34344 36.3402 4.21271 33.6104C3.08198 30.8805 2.5 27.9547 2.5 25C2.5 22.0453 3.08198 19.1194 4.21271 16.3896C5.34344 13.6598 7.00078 11.1794 9.0901 9.09009C11.1794 7.00078 13.6598 5.34344 16.3896 4.21271C19.1195 3.08198 22.0453 2.5 25 2.5L25 2.5Z" stroke="#FE892C" stroke-opacity="0.9" stroke-width="5"/>
                  </svg>
              </div>
              <div style="display: none" class="ONEAS-param__breath ONEAS-param">
                  <span class="ONEAS-param__amount">0</span>
                  <img class="ONEAS-param__icon" src="images/hud/icon_breath.svg">
                  <svg class="ONEAS-param__bar" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25 2.5C27.9547 2.5 30.8806 3.08198 33.6104 4.21271C36.3402 5.34344 38.8206 7.00078 40.9099 9.0901C42.9992 11.1794 44.6566 13.6598 45.7873 16.3896C46.918 19.1194 47.5 22.0453 47.5 25C47.5 27.9547 46.918 30.8806 45.7873 33.6104C44.6566 36.3402 42.9992 38.8206 40.9099 40.9099C38.8206 42.9992 36.3402 44.6566 33.6104 45.7873C30.8805 46.918 27.9547 47.5 25 47.5C22.0453 47.5 19.1194 46.918 16.3896 45.7873C13.6598 44.6566 11.1794 42.9992 9.0901 40.9099C7.00078 38.8206 5.34344 36.3402 4.21271 33.6104C3.08198 30.8805 2.5 27.9547 2.5 25C2.5 22.0453 3.08198 19.1194 4.21271 16.3896C5.34344 13.6598 7.00078 11.1794 9.0901 9.09009C11.1794 7.00078 13.6598 5.34344 16.3896 4.21271C19.1195 3.08198 22.0453 2.5 25 2.5L25 2.5Z" stroke="#13A2E8" stroke-opacity="0.9" stroke-width="5"/>
                  </svg>                    
              </div>
              <div style="display: none" class="ONEAS-param__freeze ONEAS-param">
                  <span class="ONEAS-param__amount">0</span>
                  <img class="ONEAS-param__icon" src="images/hud/icon_freeze.svg">
                  <svg class="ONEAS-param__bar" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25 2.5C27.9547 2.5 30.8806 3.08198 33.6104 4.21271C36.3402 5.34344 38.8206 7.00078 40.9099 9.0901C42.9992 11.1794 44.6566 13.6598 45.7873 16.3896C46.918 19.1194 47.5 22.0453 47.5 25C47.5 27.9547 46.918 30.8806 45.7873 33.6104C44.6566 36.3402 42.9992 38.8206 40.9099 40.9099C38.8206 42.9992 36.3402 44.6566 33.6104 45.7873C30.8805 46.918 27.9547 47.5 25 47.5C22.0453 47.5 19.1194 46.918 16.3896 45.7873C13.6598 44.6566 11.1794 42.9992 9.0901 40.9099C7.00078 38.8206 5.34344 36.3402 4.21271 33.6104C3.08198 30.8805 2.5 27.9547 2.5 25C2.5 22.0453 3.08198 19.1194 4.21271 16.3896C5.34344 13.6598 7.00078 11.1794 9.0901 9.09009C11.1794 7.00078 13.6598 5.34344 16.3896 4.21271C19.1195 3.08198 22.0453 2.5 25 2.5L25 2.5Z" stroke="#134FE8" stroke-opacity="0.9" stroke-width="5"/>
                  </svg>                    
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
      dashArray: 306,
      dashOffset: 306,
    },
    wash: {
      dashArray: 118,
      dashOffset: 118,
    },
    damage: {
      dashArray: 118,
      dashOffset: 118,
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
      wrapperEl: null,
    },
    wash: {
      barEl: null,
      wrapperEl: null,
    },
    damage: {
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

      // // params
      if (prop == 'rem') {
        this.data.paramsEls[0].classList.toggle('ONEAS-spedometer-param--active', +value);
      }
      if (prop == 'doors') {
        this.data.paramsEls[3].classList.toggle('ONEAS-spedometer-param--active', +value);
      }
      if (prop == 'temperature') {
        this.data.paramsEls[1].classList.toggle('ONEAS-spedometer-param--active', +value);
      }
      if (prop == 'lights') {
        this.data.paramsEls[2].classList.toggle('ONEAS-spedometer-param--active', +value);
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

    const multiplier = this.barsValues.speed.dashArray - (speed / maxSpeed) * this.barsValues.speed.dashArray;

    this.data.speed.barEl.style.strokeDashoffset = multiplier;
  },
  setDamage(floatDamage) {
    const multiplier = this.barsValues.damage.dashArray - floatDamage * this.barsValues.damage.dashArray;

    this.data.damage.barEl.style.strokeDashoffset = multiplier;
  },
  setWash(floatWash) {
    this.data.wash.wrapperEl.classList.toggle('ONEAS-speedometer-danger', floatWash >= 0.75);

    const multiplier = this.barsValues.wash.dashArray - floatWash * this.barsValues.wash.dashArray;

    this.data.wash.barEl.style.strokeDashoffset = multiplier;
  },
  setFuel(fuel) {
    this.data.fuel.wrapperEl.classList.toggle('ONEAS-speedometer-danger', fuel <= 15);

    this.data.fuel.valueEl.innerText = fuel;

    if (interface('Hud').speedometer.isElectro) this.data.fuel.textEl.innerText = '%';
    else this.data.fuel.textEl.innerText = 'L';
  },
  create(speedometerEl) {
    this.data.speedometerEl = speedometerEl;

    // SPEED
    this.data.speed.valueEl = speedometerEl.querySelector('.ONEAS-speed__value');
    this.data.speed.barEl = speedometerEl.querySelector('.ONEAS-speed-bar');

    // FUEL
    this.data.fuel.valueEl = speedometerEl.querySelector('.ONEAS-fuel__value');
    this.data.fuel.textEl = speedometerEl.querySelector('.ONEAS-fuel__text');
    this.data.fuel.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__fuel');

    // WASH
    this.data.wash.barEl = speedometerEl.querySelector('.ONEAS-wash-bar');
    this.data.wash.wrapperEl = speedometerEl.querySelector('.ONEAS-speedometer__wash');

    // DAMAGE
    this.data.damage.barEl = speedometerEl.querySelector('.ONEAS-damage-bar');

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
    <div style="display: none" class="ONEAS-speedometer__tachometer">
        <div id="ONEAS-tachometer-gear">d4</div>
        <div id="ONEAS-tachometer-rpm">1000</div>
    </div>
    <div class="ONEAS-speedometer-left">
        <div class="ONEAS-speedometer__params">
            <img class="icon__rem icon__speed-params" alt="" src="images/speed/rem.svg">
            <img class="icon__key icon__speed-params ONEAS-spedometer-param--active" alt="" src="images/speed/key.svg">
            <img class="icon__lights icon__speed-params ONEAS-spedometer-param--active" alt="" src="images/speed/lights.svg">
            <img class="icon__doors icon__speed-params" alt="" src="images/speed/doors.svg">
        </div>
        <div class="ONEAS-speedometer__fuel">
            <img class="fuel__icon" alt="" src="images/speed/fuel.svg">
            <div class="ONEAS-fuel__value">58</div>
            <div class="ONEAS-fuel__text">L</div>
        </div>
    </div>
    <div class="ONEAS-speedometer-right">
        <div class="ONEAS-speedometer__speed">
            <span class="ONEAS-speed__value">246</span>
            <span class="ONEAS-speed__text">KM/H</span>
            <div class="ONEAS-speedometer__mileage">
                <span class="ONEAS-mileage__value">000000</span>
            </div>
        </div>
        <div class="ONEAS-speed-bars">
            <svg class="ONEAS-speed-bar" width="210" height="211" viewBox="0 0 210 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.0036 177.725C16.4993 159.751 5.61777 135.348 4.6133 109.571C3.60883 83.7942 12.5584 58.6186 29.608 39.2596C46.6576 19.9005 70.5006 7.84168 96.1979 5.58108C121.895 3.32047 147.477 11.0313 167.645 27.1164" stroke="#14A2E7" stroke-width="9" stroke-linecap="round"/>
            </svg>
            <svg class="ONEAS-speed-bar_bg" width="210" height="211" viewBox="0 0 210 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.0036 177.725C16.4993 159.751 5.61777 135.348 4.6133 109.571C3.60883 83.7942 12.5584 58.6186 29.608 39.2596C46.6576 19.9005 70.5006 7.84168 96.1979 5.58108C121.895 3.32047 147.477 11.0313 167.645 27.1164" stroke="#000000" stroke-opacity="0.5" stroke-width="9" stroke-linecap="round"/>
            </svg>                   
        </div>
        <div class="ONEAS-speedometer__wash">
            <img class="wash__icon" alt="" src="images/speed/wash.svg">
            <div class="ONEAS-wash-bars">
                <svg class="ONEAS-wash-bar" width="210" height="211" viewBox="0 0 210 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M157.405 191.374C140.617 201.637 121.186 206.745 101.522 206.063C81.8581 205.381 62.8271 198.94 46.7909 187.54" stroke="#0074AC" stroke-width="9" stroke-linecap="round"/>
                </svg>
                <svg class="ONEAS-wash-bar-bg" width="210" height="211" viewBox="0 0 210 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M157.405 191.374C140.617 201.637 121.186 206.745 101.522 206.063C81.8581 205.381 62.8271 198.94 46.7909 187.54" stroke="#000000" stroke-opacity="0.5" stroke-width="9" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
        <div class="ONEAS-speedometer__damage">
            <img class="damage__icon" alt="" src="images/speed/damage.svg">
            <div class="ONEAS-damage-bars">
                <svg class="ONEAS-damage-bar" width="210" height="211" viewBox="0 0 210 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M191.661 54.8223C201.616 71.7937 206.369 91.3148 205.329 110.963C204.289 130.611 197.503 149.522 185.812 165.348" stroke="#0074AC" stroke-width="9" stroke-linecap="round"/>
                </svg>
                <svg class="ONEAS-damage-bar-bg" width="210" height="211" viewBox="0 0 210 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M191.661 54.8223C201.616 71.7937 206.369 91.3148 205.329 110.963C204.289 130.611 197.503 149.522 185.812 165.348" stroke="#000000" stroke-opacity="0.5" stroke-width="9" stroke-linecap="round"/>
                </svg>
            </div>
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