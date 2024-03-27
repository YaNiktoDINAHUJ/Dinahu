const vol = "1.2.1",
    lvl = "Basic",
    nameMod = "OLD Style";

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
    wantedAlwaysShowClass: "",
    hud: {
        data: {
            hudEl: null,
            hud_baseEl: null,
            radarBorderEl: null,
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
            },
            server: {
                wrapper: null,
                image: null,
            },
            bonusEl: null,
            greenZoneEl: null,
        },
        createHud(hudEl) {
            try {
                this.data.hudEl = hudEl;
                this.data.hud_baseEl = hudEl.querySelector(".ONEAS-hud-base");
                this.data.moneyEl = hudEl.querySelector("#ONEAS-cash__value");
                this.data.radarBorderEl = hudEl.querySelector(".ONEAS-hud__radar-border");
                [this.data.hpEl.progress, this.data.hpEl.value] = [hudEl.querySelector(".ONEAS-param__health .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__health .ONEAS-param__amount")];
                [this.data.armourEl.wrapper, this.data.armourEl.progress, this.data.armourEl.value] = [hudEl.querySelector(".ONEAS-param__armour"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__armour .ONEAS-param__amount")];
                [this.data.hungerEl.progress, this.data.hungerEl.value] = [hudEl.querySelector(".ONEAS-param__hunger .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__hunger .ONEAS-param__amount")];
                [this.data.breathEl.wrapper, this.data.breathEl.progress, this.data.breathEl.value] = [hudEl.querySelector(".ONEAS-param__breath"), hudEl.querySelector(".ONEAS-param__breath .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__breath .ONEAS-param__amount")];
                [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector(".ONEAS-hud__wanted"), hudEl.querySelector(".ONEAS-wanted__row").children];
                this.data.weaponEl.ammoEl = hudEl.querySelector(".ONEAS-weapon__ammo").children;
                this.data.server.wrapper = hudEl.querySelector(".ONEAS-hud__logo");
                this.data.server.image = this.data.server.wrapper.children[0];
                this.data.bonusEl = hudEl.querySelector(".ONEAS-logo__bonus");
                this.data.greenZoneEl = hudEl.querySelector(".ONEAS-hud__green-zone");
                this.data.weaponEl.icon = hudEl.querySelector(".ONEAS-weapon__icon");
                [this.data.freezeEl.wrapper, this.data.freezeEl.progress, this.data.freezeEl.value] = [hudEl.querySelector(".ONEAS-param__freeze"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-progress__value"), hudEl.querySelector(".ONEAS-param__freeze .ONEAS-param__amount")];

                this.data.hud_baseEl.style.transform = `scale(${oneasHud.getScale()})`;
                this.data.greenZoneEl.style.transform = `scale(${oneasHud.getScale()})`;
                this.data.radarBorderEl.style.transform = `scale(${oneasHud.getScale()})`;

                jsLoader.log.makeLog("HUD", "[hud info createHud] created!");
            } catch (error) {
                jsLoader.log.makeLog("HUD", "[hud info createHud] Error! ", error);
            }

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
        onInfoChange(prop, value) {
            try {
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

                    this.data.breathEl.value.innerText = value;
                    this.data.breathEl.progress.style.width = `${value}%`;
                }

                if (prop == "money") {
                    //  const moneyLength = 8;
                    // const money = value;
                    //  const zero = '0'.repeat(moneyLength - money.toString().length);

                    // this.data.moneyEl.innerHTML = `${zero}${money}`
                    // this.data.moneyEl.innerHTML = value;
                    if (interface("Hud").info.money > 99999999 && value > 99999999) return;

                    value = value > 99999999 ? 99999999 : value;

                    this.data.moneyEl.innerHTML = value;
                }

                if (prop == "wanted") {
                    if (value === 0 && oneasHud.wantedAlwaysShowClass.length === 0) {
                        this.data.wanted.wrapper.style.display = "none";
                        return;
                    }

                    this.data.wanted.wrapper.style.display = "";

                    for (let i = 0; i < 6; i += 1) {
                        if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
                            this.data.wanted.els[i].src = "images/hud/wanted_inactive.png";
                            this.data.wanted.els[i].className = "ONEAS-wanted__inactive";
                        } else {
                            this.data.wanted.els[i].src = "images/hud/wanted_active.png";
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
                    this.data.freezeEl.value.innerText = value;
                    this.data.freezeEl.progress.style.width = `${value}%`;
                }
            } catch (error) {
                jsLoader.log.makeLog("HUD", `[hud info onChangeInfo] Error! prop = ${prop}, value = ${value}`, error);
            }
        },
        init() {
            const hudHtml = `
                         <div class="ONEAS-hud-base"> 
                         <div class="ONEAS-hud__logo"> 
                         <img src="images/logo/3.png" class="ONEAS-logo__image">
                         <div class="ONEAS-logo__bonus">x2</div>
                         </div>
                         <div class="ONEAS-hud__weapon"> 
                         <img src="images/weapon/24.png" alt="" class="ONEAS-weapon__icon">
                         <div class="ONEAS-weapon__ammo"> 
                         <span id="ONEAS-ammo__in-clip">15</span>
                         <span id="ONEAS-ammo__total">100</span> </div>
                         </div>
                         <div class="ONEAS-hud__params">
                         <div class="ONEAS-param__health ONEAS-param"> 
                           <div class="ONEAS-param__progress">
                             <div class="ONEAS-progress__value"> </div>
                           </div> <span class="ONEAS-param__amount">50</span> </div>
          
                         <div class="ONEAS-param__armour ONEAS-param"> 
                           <div class="ONEAS-param__progress">
                             <div class="ONEAS-progress__value"> </div>
                           </div><span class="ONEAS-param__amount">25</span> </div>
          
                         <div class="ONEAS-param__hunger ONEAS-param">
                           <div class="ONEAS-param__progress">
                             <div class="ONEAS-progress__value">  </div>
                           </div><span class="ONEAS-param__amount">100</span> </div>

                           <div style="display: none" class="ONEAS-param__breath ONEAS-param">
                           <div class="ONEAS-param__progress">
                             <div class="ONEAS-progress__value"></div>
                           </div><span class="ONEAS-param__amount">50</span></div>                     

                           <div style="display: none" class="ONEAS-param__freeze ONEAS-param">
                           <div class="ONEAS-param__progress">
                             <div class="ONEAS-progress__value">  </div>
                           </div><span class="ONEAS-param__amount">100</span> </div>
                       </div>
                         <div class="ONEAS-hud__cash"> 
                         <div id="ONEAS-cash__value">10000</div>
                         </div>
                         <div class="ONEAS-hud__wanted ${oneasHud.wantedAlwaysShowClass}">
                         <div class="ONEAS-wanted__row"> 
                         <img src="images/hud/wanted_inactive.svg" alt="" class="ONEAS-wanted__inactive"> 
                         <img src="images/hud/wanted_inactive.svg" alt="" class="ONEAS-wanted__inactive"> 
                         <img src="images/hud/wanted_inactive.svg" alt="" class="ONEAS-wanted__inactive"> 
                         <img src="images/hud/wanted_active.svg" alt="" class="ONEAS-wanted__active"> 
                         <img src="images/hud/wanted_active.svg" alt="" class="ONEAS-wanted__active"> 
                         <img src="images/hud/wanted_active.svg" alt="" class="ONEAS-wanted__active"> </div>
                         </div>
                         </div>
                         <div class="ONEAS-hud__green-zone"> 
                         <svg class="ONEAS-green-zone__image" width="123" height="52" viewBox="0 0 123 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33.2759 12.7871H24.0138V21.3556H33.2759V17.888H28.4883V16.3778H35.2447V20.2035C35.2447 21.2923 35.0471 22.0305 34.6518 22.4183C34.264 22.8061 33.5369 23 32.4705 23H24.8192C23.7528 23 23.022 22.8061 22.6268 22.4183C22.239 22.0305 22.0451 21.2923 22.0451 20.2035V13.9728C22.0451 12.8841 22.239 12.1458 22.6268 11.758C23.022 11.3702 23.7528 11.1763 24.8192 11.1763H32.4705C33.5071 11.1763 34.2267 11.3665 34.6294 11.7468C35.0396 12.1197 35.2447 12.8169 35.2447 13.8386V14.1294L33.2759 14.521V12.7871ZM38.1781 23V11.1763H47.7087C48.5812 11.1763 49.215 11.3553 49.6103 11.7132C50.013 12.0712 50.2143 12.6566 50.2143 13.4695V16.1094C50.2143 16.9222 50.013 17.5076 49.6103 17.8656C49.215 18.2161 48.5812 18.3913 47.7087 18.3913H45.9748L51.3777 23H48.4469L43.6369 18.3913H40.158V23H38.1781ZM46.9368 12.7088H40.158V16.8588H46.9368C47.3992 16.8588 47.7273 16.7768 47.9212 16.6127C48.1151 16.4487 48.212 16.128 48.212 15.6507V13.9281C48.212 13.4583 48.1114 13.1376 47.91 12.9661C47.7161 12.7946 47.3917 12.7088 46.9368 12.7088ZM52.8793 23V11.1763H64.2667V12.7647H54.8592V16.0534H60.6089V17.6195H54.8592V21.378H64.3562V23H52.8793ZM66.3053 23V11.1763H77.6927V12.7647H68.2852V16.0534H74.0349V17.6195H68.2852V21.378H77.7822V23H66.3053ZM79.7313 23V11.1763H80.9729L89.8211 19.0849C90.2164 19.4354 90.6638 19.9313 91.1634 20.5726C91.0441 19.8418 90.9845 18.8723 90.9845 17.6642V11.1763H92.7966V23H91.6892L82.5949 14.7782C82.5651 14.7484 82.4942 14.685 82.3824 14.5881C82.2705 14.4911 82.1847 14.4128 82.1251 14.3532C82.0729 14.2935 81.9983 14.2152 81.9014 14.1183C81.8119 14.0138 81.7261 13.9094 81.6441 13.805C81.5621 13.6932 81.4838 13.5739 81.4092 13.4471C81.4987 14.1481 81.5434 15.0094 81.5434 16.0311V23H79.7313Z" fill="white" fill-opacity="0.6"/>
          <path d="M33.2759 12.7871H33.4759V12.5871H33.2759V12.7871ZM24.0138 12.7871V12.5871H23.8138V12.7871H24.0138ZM24.0138 21.3556H23.8138V21.5556H24.0138V21.3556ZM33.2759 21.3556V21.5556H33.4759V21.3556H33.2759ZM33.2759 17.888H33.4759V17.688H33.2759V17.888ZM28.4883 17.888H28.2883V18.088H28.4883V17.888ZM28.4883 16.3778V16.1778H28.2883V16.3778H28.4883ZM35.2447 16.3778H35.4447V16.1778H35.2447V16.3778ZM34.6518 22.4183L34.5117 22.2756L34.5104 22.2769L34.6518 22.4183ZM22.6268 22.4183L22.4853 22.5598L22.4867 22.5611L22.6268 22.4183ZM22.6268 11.758L22.4867 11.6152L22.4854 11.6166L22.6268 11.758ZM34.6294 11.7468L34.4921 11.8922L34.4949 11.8948L34.6294 11.7468ZM35.2447 14.1294L35.2837 14.3256L35.4447 14.2936V14.1294H35.2447ZM33.2759 14.521H33.0759V14.7646L33.3149 14.7171L33.2759 14.521ZM33.2759 12.5871H24.0138V12.9871H33.2759V12.5871ZM23.8138 12.7871V21.3556H24.2138V12.7871H23.8138ZM24.0138 21.5556H33.2759V21.1556H24.0138V21.5556ZM33.4759 21.3556V17.888H33.0759V21.3556H33.4759ZM33.2759 17.688H28.4883V18.088H33.2759V17.688ZM28.6883 17.888V16.3778H28.2883V17.888H28.6883ZM28.4883 16.5778H35.2447V16.1778H28.4883V16.5778ZM35.0447 16.3778V20.2035H35.4447V16.3778H35.0447ZM35.0447 20.2035C35.0447 21.2841 34.8452 21.9484 34.5117 22.2756L34.7919 22.5611C35.2489 22.1127 35.4447 21.3004 35.4447 20.2035H35.0447ZM34.5104 22.2769C34.1827 22.6046 33.528 22.8 32.4705 22.8V23.2C33.5459 23.2 34.3454 23.0076 34.7932 22.5597L34.5104 22.2769ZM32.4705 22.8H24.8192V23.2H32.4705V22.8ZM24.8192 22.8C23.7625 22.8 23.1025 22.6049 22.7668 22.2756L22.4867 22.5611C22.9416 23.0074 23.7432 23.2 24.8192 23.2V22.8ZM22.7682 22.2769C22.441 21.9497 22.2451 21.2847 22.2451 20.2035H21.8451C21.8451 21.2998 22.037 22.1113 22.4854 22.5597L22.7682 22.2769ZM22.2451 20.2035V13.9728H21.8451V20.2035H22.2451ZM22.2451 13.9728C22.2451 12.8916 22.441 12.2266 22.7682 11.8994L22.4854 11.6166C22.037 12.065 21.8451 12.8765 21.8451 13.9728H22.2451ZM22.7668 11.9008C23.1025 11.5715 23.7625 11.3763 24.8192 11.3763V10.9763C23.7432 10.9763 22.9416 11.169 22.4867 11.6152L22.7668 11.9008ZM24.8192 11.3763H32.4705V10.9763H24.8192V11.3763ZM32.4705 11.3763C33.4956 11.3763 34.1478 11.567 34.4921 11.8922L34.7668 11.6014C34.3057 11.166 33.5186 10.9763 32.4705 10.9763V11.3763ZM34.4949 11.8948C34.8394 12.208 35.0447 12.8298 35.0447 13.8386H35.4447C35.4447 12.8041 35.2397 12.0313 34.764 11.5988L34.4949 11.8948ZM35.0447 13.8386V14.1294H35.4447V13.8386H35.0447ZM35.2057 13.9333L33.2369 14.3248L33.3149 14.7171L35.2837 14.3256L35.2057 13.9333ZM33.4759 14.521V12.7871H33.0759V14.521H33.4759ZM38.1781 23H37.9781V23.2H38.1781V23ZM38.1781 11.1763V10.9763H37.9781V11.1763H38.1781ZM49.6103 11.7132L49.476 11.8615L49.4774 11.8627L49.6103 11.7132ZM49.6103 17.8656L49.743 18.0152L49.7432 18.0151L49.6103 17.8656ZM45.9748 18.3913V18.1913H45.4322L45.845 18.5435L45.9748 18.3913ZM51.3777 23V23.2H51.9203L51.5075 22.8478L51.3777 23ZM48.4469 23L48.3086 23.1444L48.3666 23.2H48.4469V23ZM43.6369 18.3913L43.7753 18.2469L43.7173 18.1913H43.6369V18.3913ZM40.158 18.3913V18.1913H39.958V18.3913H40.158ZM40.158 23V23.2H40.358V23H40.158ZM40.158 12.7088V12.5088H39.958V12.7088H40.158ZM40.158 16.8588H39.958V17.0588H40.158V16.8588ZM47.91 12.9661L47.7775 13.1159L47.7803 13.1183L47.91 12.9661ZM38.3781 23V11.1763H37.9781V23H38.3781ZM38.1781 11.3763H47.7087V10.9763H38.1781V11.3763ZM47.7087 11.3763C48.5612 11.3763 49.1348 11.5525 49.476 11.8615L49.7445 11.565C49.2953 11.1581 48.6011 10.9763 47.7087 10.9763V11.3763ZM49.4774 11.8627C49.8196 12.1669 50.0143 12.6845 50.0143 13.4695H50.4143C50.4143 12.6287 50.2064 11.9755 49.7432 11.5638L49.4774 11.8627ZM50.0143 13.4695V16.1094H50.4143V13.4695H50.0143ZM50.0143 16.1094C50.0143 16.8943 49.8196 17.4119 49.4774 17.7161L49.7432 18.0151C50.2064 17.6033 50.4143 16.9502 50.4143 16.1094H50.0143ZM49.4776 17.716C49.1363 18.0186 48.562 18.1913 47.7087 18.1913V18.5913C48.6003 18.5913 49.2938 18.4136 49.743 18.0152L49.4776 17.716ZM47.7087 18.1913H45.9748V18.5913H47.7087V18.1913ZM45.845 18.5435L51.2479 23.1522L51.5075 22.8478L46.1046 18.2392L45.845 18.5435ZM51.3777 22.8H48.4469V23.2H51.3777V22.8ZM48.5853 22.8556L43.7753 18.2469L43.4986 18.5357L48.3086 23.1444L48.5853 22.8556ZM43.6369 18.1913H40.158V18.5913H43.6369V18.1913ZM39.958 18.3913V23H40.358V18.3913H39.958ZM40.158 22.8H38.1781V23.2H40.158V22.8ZM46.9368 12.5088H40.158V12.9088H46.9368V12.5088ZM39.958 12.7088V16.8588H40.358V12.7088H39.958ZM40.158 17.0588H46.9368V16.6588H40.158V17.0588ZM46.9368 17.0588C47.412 17.0588 47.8007 16.9767 48.0504 16.7654L47.792 16.4601C47.6539 16.577 47.3863 16.6588 46.9368 16.6588V17.0588ZM48.0504 16.7654C48.3159 16.5408 48.412 16.1394 48.412 15.6507H48.012C48.012 16.1167 47.9143 16.3566 47.792 16.4601L48.0504 16.7654ZM48.412 15.6507V13.9281H48.012V15.6507H48.412ZM48.412 13.9281C48.412 13.4425 48.3103 13.0444 48.0397 12.8138L47.7803 13.1183C47.9124 13.2309 48.012 13.474 48.012 13.9281H48.412ZM48.0425 12.8163C47.793 12.5955 47.407 12.5088 46.9368 12.5088V12.9088C47.3764 12.9088 47.6392 12.9936 47.7775 13.1159L48.0425 12.8163ZM52.8793 23H52.6793V23.2H52.8793V23ZM52.8793 11.1763V10.9763H52.6793V11.1763H52.8793ZM64.2667 11.1763H64.4667V10.9763H64.2667V11.1763ZM64.2667 12.7647V12.9647H64.4667V12.7647H64.2667ZM54.8592 12.7647V12.5647H54.6592V12.7647H54.8592ZM54.8592 16.0534H54.6592V16.2534H54.8592V16.0534ZM60.6089 16.0534H60.8089V15.8534H60.6089V16.0534ZM60.6089 17.6195V17.8195H60.8089V17.6195H60.6089ZM54.8592 17.6195V17.4195H54.6592V17.6195H54.8592ZM54.8592 21.378H54.6592V21.578H54.8592V21.378ZM64.3562 21.378H64.5562V21.178H64.3562V21.378ZM64.3562 23V23.2H64.5562V23H64.3562ZM53.0793 23V11.1763H52.6793V23H53.0793ZM52.8793 11.3763H64.2667V10.9763H52.8793V11.3763ZM64.0667 11.1763V12.7647H64.4667V11.1763H64.0667ZM64.2667 12.5647H54.8592V12.9647H64.2667V12.5647ZM54.6592 12.7647V16.0534H55.0592V12.7647H54.6592ZM54.8592 16.2534H60.6089V15.8534H54.8592V16.2534ZM60.4089 16.0534V17.6195H60.8089V16.0534H60.4089ZM60.6089 17.4195H54.8592V17.8195H60.6089V17.4195ZM54.6592 17.6195V21.378H55.0592V17.6195H54.6592ZM54.8592 21.578H64.3562V21.178H54.8592V21.578ZM64.1562 21.378V23H64.5562V21.378H64.1562ZM64.3562 22.8H52.8793V23.2H64.3562V22.8ZM66.3053 23H66.1053V23.2H66.3053V23ZM66.3053 11.1763V10.9763H66.1053V11.1763H66.3053ZM77.6927 11.1763H77.8927V10.9763H77.6927V11.1763ZM77.6927 12.7647V12.9647H77.8927V12.7647H77.6927ZM68.2852 12.7647V12.5647H68.0852V12.7647H68.2852ZM68.2852 16.0534H68.0852V16.2534H68.2852V16.0534ZM74.0349 16.0534H74.2349V15.8534H74.0349V16.0534ZM74.0349 17.6195V17.8195H74.2349V17.6195H74.0349ZM68.2852 17.6195V17.4195H68.0852V17.6195H68.2852ZM68.2852 21.378H68.0852V21.578H68.2852V21.378ZM77.7822 21.378H77.9822V21.178H77.7822V21.378ZM77.7822 23V23.2H77.9822V23H77.7822ZM66.5053 23V11.1763H66.1053V23H66.5053ZM66.3053 11.3763H77.6927V10.9763H66.3053V11.3763ZM77.4927 11.1763V12.7647H77.8927V11.1763H77.4927ZM77.6927 12.5647H68.2852V12.9647H77.6927V12.5647ZM68.0852 12.7647V16.0534H68.4852V12.7647H68.0852ZM68.2852 16.2534H74.0349V15.8534H68.2852V16.2534ZM73.8349 16.0534V17.6195H74.2349V16.0534H73.8349ZM74.0349 17.4195H68.2852V17.8195H74.0349V17.4195ZM68.0852 17.6195V21.378H68.4852V17.6195H68.0852ZM68.2852 21.578H77.7822V21.178H68.2852V21.578ZM77.5822 21.378V23H77.9822V21.378H77.5822ZM77.7822 22.8H66.3053V23.2H77.7822V22.8ZM79.7313 23H79.5313V23.2H79.7313V23ZM79.7313 11.1763V10.9763H79.5313V11.1763H79.7313ZM80.9729 11.1763L81.1062 11.0272L81.0493 10.9763H80.9729V11.1763ZM89.8211 19.0849L89.6878 19.234L89.6884 19.2345L89.8211 19.0849ZM91.1634 20.5726L91.0057 20.6955L91.3608 20.5404L91.1634 20.5726ZM90.9845 11.1763V10.9763H90.7845V11.1763H90.9845ZM92.7966 11.1763H92.9966V10.9763H92.7966V11.1763ZM92.7966 23V23.2H92.9966V23H92.7966ZM91.6892 23L91.5551 23.1484L91.6122 23.2H91.6892V23ZM82.5949 14.7782L82.4533 14.9198L82.4608 14.9266L82.5949 14.7782ZM82.1251 14.3532L81.9742 14.4852L81.9837 14.4946L82.1251 14.3532ZM81.9014 14.1183L81.7495 14.2484L81.7545 14.2542L81.7599 14.2597L81.9014 14.1183ZM81.6441 13.805L81.4827 13.9234L81.4868 13.9286L81.6441 13.805ZM81.4092 13.4471L81.5816 13.3457L81.2108 13.4724L81.4092 13.4471ZM81.5434 23V23.2H81.7434V23H81.5434ZM79.9313 23V11.1763H79.5313V23H79.9313ZM79.7313 11.3763H80.9729V10.9763H79.7313V11.3763ZM80.8396 11.3254L89.6878 19.234L89.9544 18.9358L81.1062 11.0272L80.8396 11.3254ZM89.6884 19.2345C90.071 19.5738 90.51 20.0593 91.0057 20.6955L91.3212 20.4497C90.8176 19.8033 90.3617 19.297 89.9538 18.9352L89.6884 19.2345ZM91.3608 20.5404C91.244 19.8247 91.1845 18.8674 91.1845 17.6642H90.7845C90.7845 18.8773 90.8443 19.8588 90.9661 20.6048L91.3608 20.5404ZM91.1845 17.6642V11.1763H90.7845V17.6642H91.1845ZM90.9845 11.3763H92.7966V10.9763H90.9845V11.3763ZM92.5966 11.1763V23H92.9966V11.1763H92.5966ZM92.7966 22.8H91.6892V23.2H92.7966V22.8ZM91.8233 22.8516L82.729 14.6299L82.4608 14.9266L91.5551 23.1484L91.8233 22.8516ZM82.7363 14.6368C82.7004 14.6009 82.6237 14.5326 82.5134 14.4369L82.2514 14.7392C82.3648 14.8375 82.4297 14.8959 82.4535 14.9197L82.7363 14.6368ZM82.5134 14.4369C82.4028 14.3412 82.3212 14.2664 82.2665 14.2117L81.9837 14.4946C82.0483 14.5592 82.1382 14.6411 82.2514 14.7392L82.5134 14.4369ZM82.2756 14.2215C82.2191 14.1569 82.141 14.075 82.0428 13.9768L81.7599 14.2597C81.8557 14.3554 81.9266 14.4301 81.9746 14.4849L82.2756 14.2215ZM82.0532 13.9881C81.9655 13.8858 81.8816 13.7836 81.8014 13.6815L81.4868 13.9286C81.5707 14.0353 81.6582 14.1419 81.7495 14.2484L82.0532 13.9881ZM81.8054 13.6868C81.7276 13.5807 81.6529 13.467 81.5816 13.3457L81.2368 13.5485C81.3146 13.6807 81.3966 13.8057 81.4828 13.9233L81.8054 13.6868ZM81.2108 13.4724C81.2989 14.1622 81.3434 15.0145 81.3434 16.0311H81.7434C81.7434 15.0043 81.6985 14.1339 81.6076 13.4218L81.2108 13.4724ZM81.3434 16.0311V23H81.7434V16.0311H81.3434ZM81.5434 22.8H79.7313V23.2H81.5434V22.8Z" fill="white" fill-opacity="0.5"/>
          <path d="M31.5101 45V44.1946L40.2688 34.7871H32.2708V33.1763H43.4233V33.8475L34.508 43.3556H43.4233V45H31.5101ZM45.5236 35.9728C45.5236 34.8841 45.7175 34.1458 46.1053 33.758C46.5005 33.3702 47.2313 33.1763 48.2977 33.1763H56.4748C57.5412 33.1763 58.2645 33.3702 58.6449 33.758C59.0327 34.1458 59.2265 34.8841 59.2265 35.9728V42.2035C59.2265 43.2923 59.0327 44.0305 58.6449 44.4183C58.2645 44.8061 57.5412 45 56.4748 45H48.2977C47.2313 45 46.5005 44.8061 46.1053 44.4183C45.7175 44.0305 45.5236 43.2923 45.5236 42.2035V35.9728ZM47.4923 43.3556H57.2802V34.7871H47.4923V43.3556ZM62.2329 45V33.1763H63.4746L72.3228 41.0849C72.718 41.4354 73.1654 41.9313 73.6651 42.5726C73.5458 41.8418 73.4861 40.8723 73.4861 39.6642V33.1763H75.2983V45H74.1908L65.0965 36.7782C65.0667 36.7484 64.9959 36.685 64.884 36.5881C64.7722 36.4911 64.6864 36.4128 64.6267 36.3532C64.5745 36.2935 64.5 36.2152 64.403 36.1183C64.3135 36.0138 64.2278 35.9094 64.1457 35.805C64.0637 35.6932 63.9854 35.5739 63.9108 35.4471C64.0003 36.1481 64.0451 37.0094 64.0451 38.0311V45H62.2329ZM78.45 45V33.1763H89.8375V34.7647H80.43V38.0534H86.1796V39.6195H80.43V43.378H89.927V45H78.45Z" fill="white" fill-opacity="0.6"/>
          <path d="M31.5101 45H31.3101V45.2H31.5101V45ZM31.5101 44.1946L31.3637 44.0583L31.3101 44.1159V44.1946H31.5101ZM40.2688 34.7871L40.4152 34.9234L40.7283 34.5871H40.2688V34.7871ZM32.2708 34.7871H32.0708V34.9871H32.2708V34.7871ZM32.2708 33.1763V32.9763H32.0708V33.1763H32.2708ZM43.4233 33.1763H43.6233V32.9763H43.4233V33.1763ZM43.4233 33.8475L43.5692 33.9843L43.6233 33.9266V33.8475H43.4233ZM34.508 43.3556L34.3621 43.2188L34.0463 43.5556H34.508V43.3556ZM43.4233 43.3556H43.6233V43.1556H43.4233V43.3556ZM43.4233 45V45.2H43.6233V45H43.4233ZM31.7101 45V44.1946H31.3101V45H31.7101ZM31.6565 44.3309L40.4152 34.9234L40.1224 34.6508L31.3637 44.0583L31.6565 44.3309ZM40.2688 34.5871H32.2708V34.9871H40.2688V34.5871ZM32.4708 34.7871V33.1763H32.0708V34.7871H32.4708ZM32.2708 33.3763H43.4233V32.9763H32.2708V33.3763ZM43.2233 33.1763V33.8475H43.6233V33.1763H43.2233ZM43.2774 33.7107L34.3621 43.2188L34.6539 43.4924L43.5692 33.9843L43.2774 33.7107ZM34.508 43.5556H43.4233V43.1556H34.508V43.5556ZM43.2233 43.3556V45H43.6233V43.3556H43.2233ZM43.4233 44.8H31.5101V45.2H43.4233V44.8ZM46.1053 33.758L45.9652 33.6152L45.9638 33.6166L46.1053 33.758ZM58.6449 33.758L58.5021 33.898L58.5034 33.8994L58.6449 33.758ZM58.6449 44.4183L58.5034 44.2769L58.5021 44.2783L58.6449 44.4183ZM46.1053 44.4183L45.9638 44.5598L45.9652 44.5611L46.1053 44.4183ZM47.4923 43.3556H47.2923V43.5556H47.4923V43.3556ZM57.2802 43.3556V43.5556H57.4802V43.3556H57.2802ZM57.2802 34.7871H57.4802V34.5871H57.2802V34.7871ZM47.4923 34.7871V34.5871H47.2923V34.7871H47.4923ZM45.7236 35.9728C45.7236 34.8916 45.9195 34.2266 46.2467 33.8994L45.9638 33.6166C45.5155 34.065 45.3236 34.8765 45.3236 35.9728H45.7236ZM46.2453 33.9008C46.581 33.5715 47.241 33.3763 48.2977 33.3763V32.9763C47.2217 32.9763 46.4201 33.169 45.9652 33.6152L46.2453 33.9008ZM48.2977 33.3763H56.4748V32.9763H48.2977V33.3763ZM56.4748 33.3763C57.5329 33.3763 58.1823 33.572 58.5021 33.898L58.7877 33.6179C58.3468 33.1684 57.5494 32.9763 56.4748 32.9763V33.3763ZM58.5034 33.8994C58.8306 34.2266 59.0265 34.8916 59.0265 35.9728H59.4265C59.4265 34.8765 59.2347 34.065 58.7863 33.6166L58.5034 33.8994ZM59.0265 35.9728V42.2035H59.4265V35.9728H59.0265ZM59.0265 42.2035C59.0265 43.2847 58.8306 43.9497 58.5034 44.2769L58.7863 44.5597C59.2347 44.1113 59.4265 43.2998 59.4265 42.2035H59.0265ZM58.5021 44.2783C58.1823 44.6043 57.5329 44.8 56.4748 44.8V45.2C57.5494 45.2 58.3468 45.0079 58.7877 44.5584L58.5021 44.2783ZM56.4748 44.8H48.2977V45.2H56.4748V44.8ZM48.2977 44.8C47.241 44.8 46.581 44.6049 46.2453 44.2756L45.9652 44.5611C46.4201 45.0074 47.2217 45.2 48.2977 45.2V44.8ZM46.2467 44.2769C45.9195 43.9497 45.7236 43.2847 45.7236 42.2035H45.3236C45.3236 43.2998 45.5155 44.1113 45.9638 44.5597L46.2467 44.2769ZM45.7236 42.2035V35.9728H45.3236V42.2035H45.7236ZM47.4923 43.5556H57.2802V43.1556H47.4923V43.5556ZM57.4802 43.3556V34.7871H57.0802V43.3556H57.4802ZM57.2802 34.5871H47.4923V34.9871H57.2802V34.5871ZM47.2923 34.7871V43.3556H47.6923V34.7871H47.2923ZM62.2329 45H62.0329V45.2H62.2329V45ZM62.2329 33.1763V32.9763H62.0329V33.1763H62.2329ZM63.4746 33.1763L63.6078 33.0272L63.5509 32.9763H63.4746V33.1763ZM72.3228 41.0849L72.1895 41.234L72.1901 41.2345L72.3228 41.0849ZM73.6651 42.5726L73.5073 42.6955L73.8625 42.5404L73.6651 42.5726ZM73.4861 33.1763V32.9763H73.2861V33.1763H73.4861ZM75.2983 33.1763H75.4983V32.9763H75.2983V33.1763ZM75.2983 45V45.2H75.4983V45H75.2983ZM74.1908 45L74.0567 45.1484L74.1138 45.2H74.1908V45ZM65.0965 36.7782L64.9549 36.9198L64.9624 36.9266L65.0965 36.7782ZM64.6267 36.3532L64.4759 36.4852L64.4853 36.4946L64.6267 36.3532ZM64.403 36.1183L64.2512 36.2484L64.2562 36.2542L64.2616 36.2597L64.403 36.1183ZM64.1457 35.805L63.9844 35.9234L63.9885 35.9286L64.1457 35.805ZM63.9108 35.4471L64.0832 35.3457L63.7124 35.4724L63.9108 35.4471ZM64.0451 45V45.2H64.2451V45H64.0451ZM62.4329 45V33.1763H62.0329V45H62.4329ZM62.2329 33.3763H63.4746V32.9763H62.2329V33.3763ZM63.3413 33.3254L72.1895 41.234L72.456 40.9358L63.6078 33.0272L63.3413 33.3254ZM72.1901 41.2345C72.5726 41.5738 73.0116 42.0593 73.5073 42.6955L73.8229 42.4497C73.3192 41.8033 72.8634 41.297 72.4555 40.9352L72.1901 41.2345ZM73.8625 42.5404C73.7456 41.8247 73.6861 40.8674 73.6861 39.6642H73.2861C73.2861 40.8773 73.3459 41.8588 73.4677 42.6048L73.8625 42.5404ZM73.6861 39.6642V33.1763H73.2861V39.6642H73.6861ZM73.4861 33.3763H75.2983V32.9763H73.4861V33.3763ZM75.0983 33.1763V45H75.4983V33.1763H75.0983ZM75.2983 44.8H74.1908V45.2H75.2983V44.8ZM74.325 44.8516L65.2307 36.6299L64.9624 36.9266L74.0567 45.1484L74.325 44.8516ZM65.238 36.6368C65.2021 36.6009 65.1253 36.5326 65.015 36.4369L64.753 36.7392C64.8664 36.8375 64.9314 36.8959 64.9551 36.9197L65.238 36.6368ZM65.015 36.4369C64.9045 36.3412 64.8229 36.2664 64.7682 36.2117L64.4853 36.4946C64.5499 36.5592 64.6398 36.6411 64.753 36.7392L65.015 36.4369ZM64.7772 36.2215C64.7208 36.1569 64.6426 36.075 64.5444 35.9768L64.2616 36.2597C64.3573 36.3554 64.4283 36.4301 64.4762 36.4849L64.7772 36.2215ZM64.5549 35.9881C64.4672 35.8858 64.3832 35.7836 64.303 35.6815L63.9885 35.9286C64.0723 36.0353 64.1599 36.1419 64.2512 36.2484L64.5549 35.9881ZM64.307 35.6868C64.2292 35.5807 64.1546 35.467 64.0832 35.3457L63.7384 35.5485C63.8162 35.6807 63.8982 35.8057 63.9845 35.9233L64.307 35.6868ZM63.7124 35.4724C63.8005 36.1622 63.8451 37.0145 63.8451 38.0311H64.2451C64.2451 37.0043 64.2001 36.1339 64.1092 35.4218L63.7124 35.4724ZM63.8451 38.0311V45H64.2451V38.0311H63.8451ZM64.0451 44.8H62.2329V45.2H64.0451V44.8ZM78.45 45H78.25V45.2H78.45V45ZM78.45 33.1763V32.9763H78.25V33.1763H78.45ZM89.8375 33.1763H90.0375V32.9763H89.8375V33.1763ZM89.8375 34.7647V34.9647H90.0375V34.7647H89.8375ZM80.43 34.7647V34.5647H80.23V34.7647H80.43ZM80.43 38.0534H80.23V38.2534H80.43V38.0534ZM86.1796 38.0534H86.3796V37.8534H86.1796V38.0534ZM86.1796 39.6195V39.8195H86.3796V39.6195H86.1796ZM80.43 39.6195V39.4195H80.23V39.6195H80.43ZM80.43 43.378H80.23V43.578H80.43V43.378ZM89.927 43.378H90.127V43.178H89.927V43.378ZM89.927 45V45.2H90.127V45H89.927ZM78.65 45V33.1763H78.25V45H78.65ZM78.45 33.3763H89.8375V32.9763H78.45V33.3763ZM89.6375 33.1763V34.7647H90.0375V33.1763H89.6375ZM89.8375 34.5647H80.43V34.9647H89.8375V34.5647ZM80.23 34.7647V38.0534H80.63V34.7647H80.23ZM80.43 38.2534H86.1796V37.8534H80.43V38.2534ZM85.9796 38.0534V39.6195H86.3796V38.0534H85.9796ZM86.1796 39.4195H80.43V39.8195H86.1796V39.4195ZM80.23 39.6195V43.378H80.63V39.6195H80.23ZM80.43 43.578H89.927V43.178H80.43V43.578ZM89.727 43.378V45H90.127V43.378H89.727ZM89.927 44.8H78.45V45.2H89.927V44.8Z" fill="white" fill-opacity="0.5"/>
          <rect width="123" height="52" fill="black" fill-opacity="0.2"/>
          </svg>
          
                         </div><div class="ONEAS-hud__radar-border"><img src="images/hud/border.png" class="ONEAS-radar__images"></div>
          `;
            const hudEl = jsLoader.hudInfo.addNewHud(hudHtml, "ONEAS-hud", (prop, value) => void this.onInfoChange(prop, value));

            hudEl.style.display = "none";

            this.createHud(hudEl);

            jsLoader.log.makeLog("HUD", "[hud info init] Hud inited!");
        },
    },
    speedometer: {
        barsValues: {
            speed: {
                dashArray: 444,
                dashOffset: 444,
            },
            //fuel: {
            //    dashArray: 171,
            //    dashOffset: 0,
            //},
            //wash: {
            //    dashArray: 103,
            //    dashOffset: 103,
            //},
            //damage: {
            //    dashArray: 103,
            //    dashOffset: 103,
            //},
            tachometer: {                
                dashArray: 444,
                dashOffset: 444,
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
            },
            wash: {
                valueEl: null,
                wrapperEl: null,
            },
            damage: {
                valueEl: null,
            },
            tachometer: {
                wrapper: null,
                //rpmEl: null,
                gearEl: null,
                barEl: null,
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
                    this.data.paramsEls[2].classList.toggle("ONEAS-spedometer-param--active", +value);
                }
                if (prop == "doors") {
                    this.data.paramsEls[3].classList.toggle("ONEAS-spedometer-param--active", +value);
                }
                if (prop == "temperature") {
                    this.data.paramsEls[1].classList.toggle("ONEAS-spedometer-param--active", +value);
                }
                if (prop == "lights") {
                    this.data.paramsEls[0].classList.toggle("ONEAS-spedometer-param--active", +value);
                }
                if (prop === "tachometer-show") {
                    const display = +value >= 1 ? "" : "0";
    
                    this.data.tachometer.wrapper.style.opacity = display;
                }
                if (prop === "tachometer") {
                    this.setGear(value.gear);
                    this.setTachometer(value.rpm, value.maxRpm);
                }
            } catch (error) {
                jsLoader.log.makeLog("HUD", `[speedometer onInfoChange] Error! prop = ${prop}, value = ${value}`, error);
            }
        },
        show() {
            this.data.speedometerEl.style.display = ''
            document.querySelector(".ONEAS-hud__green-zone").style.bottom = "25vh";
            //document.querySelector('.ONEAS-speedometer__progress-bar').style.bottom = '660px'//'61vh'
            //this.data.speedometerEl.style.bottom = "2.5vh";
            //this.data.speedometerEl.style.opacity = '1';
        },
        hide() {
            this.data.speedometerEl.style.display = 'none'
            document.querySelector(".ONEAS-hud__green-zone").style.bottom = "5vh";
            //document.querySelector('.ONEAS-speedometer__progress-bar').style.bottom = '10px'//'18vh'
            //this.data.speedometerEl.style.bottom = "-700px";
            //this.data.speedometerEl.style.opacity = '0';
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

            const multiplier = this.barsValues.tachometer.dashArray - (rpm / maxRpm) * this.barsValues.tachometer.dashArray;

            this.data.tachometer.barEl.style.strokeDashoffset = multiplier;
        },
        setMileage(km) {
            // const htmlValues = this.getBigSizeValue(km);
            //   this.data.mileageEl.innerHTML = htmlValues;
            this.data.mileageEl.innerText = km;
        },
        setSpeed(speed) {
            const maxSpeed = 360; //interface('Hud').speedometer.maxSpeed;
            this.data.speed.valueEl.innerText = speed;

            if (speed > maxSpeed) speed = maxSpeed;

            const multiplier = this.barsValues.speed.dashArray - (speed / maxSpeed) * this.barsValues.speed.dashArray;

            this.data.speed.barEl.style.strokeDashoffset = multiplier;
            //this.data.speed.barEl.style.transform = `rotate(${deg}deg) scale(-1)`;
        },
        setDamage(floatDamage) {
            //this.data.damage.valueEl.innerText = Math.round(floatDamage * 100);
            this.data.damage.valueEl.innerText = Math.floor(floatDamage * 100);
        },
        setWash(floatWash) {
            this.data.wash.valueEl.innerText = Math.floor(floatWash * 100);
        },
        setFuel(fuel) {
            //const maxFuel = window.interface("Hud").speedometer.maxFuel;

            this.data.fuel.valueEl.innerText = fuel;

            if (interface("Hud").speedometer.isElectro) this.data.fuel.textEl.innerText = "%";
            else this.data.fuel.textEl.innerText = "л";

            //if (fuel > maxFuel) fuel = maxFuel;

            //const dashOffset = this.barsValues.fuel.dashArray - (fuel / maxFuel) * this.barsValues.fuel.dashArray;

            //this.data.fuel.barEl.style.strokeDashoffset = dashOffset;
        },
        create(speedometerEl) {
            try {
                this.data.speedometerEl = speedometerEl;

                // SPEED
                this.data.speed.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-speed__value");
                this.data.speed.barEl = speedometerEl.querySelector(".ONEAS-speedometer-speed__bar");

                // FUEL
                this.data.fuel.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-fuel__value");
                //this.data.fuel.barEl = speedometerEl.querySelector(".ONEAS-speedometer-fuel__bar");
                this.data.fuel.textEl = speedometerEl.querySelector(".ONEAS-speedometer-fuel__text");

                // WASH
                this.data.wash.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-wash__value");
                //this.data.wash.barEl = speedometerEl.querySelector(".ONEAS-speedometer-wash__bar");
                this.data.wash.wrapperEl = speedometerEl.querySelector(".ONEAS-speedometer__wash");

                // DAMAGE
                //this.data.damage.progress = speedometerEl.querySelector(".ONEAS-damage-bar__value");
                this.data.damage.valueEl = speedometerEl.querySelector(".ONEAS-speedometer-damage__value");

                // MILEAGE
                this.data.mileageEl = speedometerEl.querySelector(".ONEAS-speedometer-mileage__value");

                // PARAMS
                this.data.paramsEls = speedometerEl.querySelector(".ONEAS-speedometer__params").children;

                // TURNS
                this.data.turnsEls = speedometerEl.querySelector(".ONEAS-speedometer__turns").children;

                // TACHOMETER
                //this.data.tachometer.bgEl = speedometerEl.querySelector('.ONEAS-speedometer-bg');
                this.data.tachometer.barEl = speedometerEl.querySelector(".ONEAS-tachometer__bar");
                this.data.tachometer.wrapper = speedometerEl.querySelector(".ONEAS-speedometer__tachometer");
                this.data.tachometer.gearEl = this.data.tachometer.wrapper.querySelector("#ONEAS-tachometer-gear");
                // this.data.tachometer.rpmEl = this.data.tachometer.wrapper.querySelector('#ONEAS-tachometer-rpm');

                this.data.speedometerEl.style.transform = `scale(${oneasHud.getScale()})`;

                jsLoader.log.makeLog("HUD", "[speedometer create] Success!");
            } catch (error) {
                jsLoader.log.makeLog("HUD", "[speedometer create] Error!", error);
            }
        },
        init() {
            const text = `
            
            <div style="opacity: 0" class="ONEAS-speedometer__tachometer">
            
            <svg class="ONEAS-tachometer__bar" width="168" height="168" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1092_50)">
            <path d="M85.3696 154.435C76.1112 154.636 66.9038 153.012 58.2731 149.654C49.6424 146.297 41.7575 141.273 35.0685 134.868C28.3796 128.464 23.0176 120.805 19.2886 112.328C15.5597 103.851 13.5369 94.7232 13.3357 85.4648C13.1346 76.2063 14.7589 66.9989 18.1161 58.3682C21.4733 49.7376 26.4976 41.8526 32.902 35.1637C39.3065 28.4747 46.9657 23.1127 55.4424 19.3838C63.9191 15.6549 73.0472 13.6321 82.3057 13.4309C91.5641 13.2297 100.772 14.8541 109.402 18.2113C118.033 21.5685 125.918 26.5927 132.607 32.9972C139.296 39.4016 144.658 47.0609 148.387 55.5375C152.116 64.0142 154.138 73.1424 154.34 82.4008C154.541 91.6593 152.916 100.867 149.559 109.497C146.202 118.128 141.178 126.013 134.773 132.702C128.369 139.391 120.71 144.753 112.233 148.482C103.756 152.211 94.628 154.234 85.3696 154.435L85.3696 154.435Z" stroke="url(#paint0_linear_1092_50)" stroke-width="6"/>
            </g>
            <defs>
            <filter id="filter0_d_1092_50" x="0.319092" y="0.414062" width="167.037" height="167.037" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.913725 0 0 0 0 0.396078 0 0 0 0 0.105882 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1092_50"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1092_50" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_1092_50" x1="160.968" y1="46.8548" x2="84.3941" y2="157.452" gradientUnits="userSpaceOnUse">
            <stop offset="0.04" stop-color="#E9651B"/>
            <stop offset="1" stop-color="#F5BE09"/>
            </linearGradient>
            </defs>
            </svg>
    <div class="ONEAS-tachometer__data">
        <div id="ONEAS-tachometer-gear">3</div>
    </div>
</div>
<img class="ONEAS-speedometer-bg" src="images/speed/back.png" alt="" srcset="">
                    <div class="ONEAS-speedometer__speed">
                      <svg class="ONEAS-speedometer-speed__bar" width="168" height="168" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_d_1092_50)">
                      <path d="M85.3696 154.435C76.1112 154.636 66.9038 153.012 58.2731 149.654C49.6424 146.297 41.7575 141.273 35.0685 134.868C28.3796 128.464 23.0176 120.805 19.2886 112.328C15.5597 103.851 13.5369 94.7232 13.3357 85.4648C13.1346 76.2063 14.7589 66.9989 18.1161 58.3682C21.4733 49.7376 26.4976 41.8526 32.902 35.1637C39.3065 28.4747 46.9657 23.1127 55.4424 19.3838C63.9191 15.6549 73.0472 13.6321 82.3057 13.4309C91.5641 13.2297 100.772 14.8541 109.402 18.2113C118.033 21.5685 125.918 26.5927 132.607 32.9972C139.296 39.4016 144.658 47.0609 148.387 55.5375C152.116 64.0142 154.138 73.1424 154.34 82.4008C154.541 91.6593 152.916 100.867 149.559 109.497C146.202 118.128 141.178 126.013 134.773 132.702C128.369 139.391 120.71 144.753 112.233 148.482C103.756 152.211 94.628 154.234 85.3696 154.435L85.3696 154.435Z" stroke="url(#paint0_linear_1092_50)" stroke-width="6"/>
                      </g>
                      <defs>
                      <filter id="filter0_d_1092_50" x="0.319092" y="0.414062" width="167.037" height="167.037" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset/>
                      <feGaussianBlur stdDeviation="5"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0.913725 0 0 0 0 0.396078 0 0 0 0 0.105882 0 0 0 1 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1092_50"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1092_50" result="shape"/>
                      </filter>
                      <linearGradient id="paint0_linear_1092_50" x1="160.968" y1="46.8548" x2="84.3941" y2="157.452" gradientUnits="userSpaceOnUse">
                      <stop offset="0.04" stop-color="#E9651B"/>
                      <stop offset="1" stop-color="#F5BE09"/>
                      </linearGradient>
                      </defs>
                      </svg>
                      <div class="ONEAS-speedometer-speed__data"> <span class="ONEAS-speedometer-speed__value">0</span>  </div>
                    </div><div class="ONEAS-speedometer__line-top">
                    <div class="ONEAS-speedometer__mileage"><span class="ONEAS-speedometer-mileage__value">000000</span><span class="ONEAS-speedometer-mileage__text">км</span></div>
                    <div class="ONEAS-speedometer__turns">
                      <div class="ONEAS-speedometer-turn__left"></div>
                      <div class="ONEAS-speedometer-turn__right"></div>
                    </div></div>
                    <div class="ONEAS-speedometer__params">
                      <div class="ONEAS-spedometer-param__lights ONEAS-spedometer-param--active"> </div>
                      <div class="ONEAS-spedometer-param__key ONEAS-spedometer-param--active"> </div>
                      <div class="ONEAS-spedometer-param__rem ONEAS-spedometer-param--active"> </div>
                      <div class="ONEAS-spedometer-param__doors ONEAS-spedometer-param--active"> </div>
                    </div>
                    <div class="ONEAS-speedometer__proc-group">
                    <div class="ONEAS-speedometer__fuel">
                    <div class="ONEAS-speedometer-fuel__data ONEAS-speedometer-data">
                      <div class="ONEAS-speedometer-fuel__icon"></div>
                      <div class="ONEAS-speedometer-data__text">
                      <div class="ONEAS-speedometer-fuel__value">50</div>
                      <div class="ONEAS-speedometer-fuel__text ONEAS-speedometer-data__text">%</div></div>
                    </div>
                  </div>
                  <div class="ONEAS-speedometer__wash">
                    <div class="ONEAS-speedometer-data">
                      <div class="ONEAS-speedometer-wash__icon"></div>
                      <div class="ONEAS-speedometer-data__text">
                      <div class="ONEAS-speedometer-wash__value">50</div>
                      <div class="ONEAS-speedometer-wash__text ONEAS-speedometer-data__text">%</div></div>
                    </div>
                  </div>
                  <div class="ONEAS-speedometer__damage">
                    <div class="ONEAS-speedometer-data">
                      <div class="ONEAS-speedometer-damage__icon"></div>
                      <div class="ONEAS-speedometer-data__text">
                      <div class="ONEAS-speedometer-damage__value">12</div>
                      <div class="ONEAS-speedometer-damage__text ONEAS-speedometer-data__text">%</div></div>
                    </div>
                  </div></div>`;
            const speedometerEl = jsLoader.hudInfo.addNewSpeedometer(text, "ONEAS-speedometer", (prop, value) => this.onChangeInfo(prop, value));

            this.create(speedometerEl);

            interface("Hud").speedometer.show = 0;
        },
    },
    init() {
        this.hud.init();
        this.speedometer.init();
        jsLoader.showAddedScript(`HUD ${nameMod}`, "info");
    },
};

oneasHud.init();
