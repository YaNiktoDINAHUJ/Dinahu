const bankMoney={isStartedUpdateMoney:!1,openInventoryByScript:!1,$wrapper:null,$value:null,$cashSymbol:null,closeInventory(){this.openInventoryByScript=!1,window.sendClientEventHandle(0,"OnInventoryDisplayChange")},async openInventory(){await this.canUpdateParams()&&(this.openInventoryByScript=!0,window.sendClientEventHandle(0,"OnInventoryDisplayChange"))},async startUpdateMoney(){this.isStartedUpdateMoney||(await this.canUpdateParams()?(this.isStartedUpdateMoney=!0,this.openInventory(),window.setDeltaTimer(window.deltaTimerTypes.INTERVAL,102,3e4,"bankMoney.openInventory()")):setTimeout((()=>this.startUpdateMoney()),250))},waitPlayerSpawn(){const e=setInterval((()=>{jsLoader.socket.sendEvent("isSpawned",(({data:t})=>{const[n,a]=t.split("|");if("isSpawned"===n&&"0"!==a)return this.startUpdateMoney(),void clearInterval(e)}))}),500)},canUpdateParams:()=>new Promise((e=>{jsLoader.socket.sendEvent("isGtaActive",(t=>{const[n,a]=t.data.split("|");if("isGtaActive"===n){const t="1"==a,n={hudShow:1==+window.interface("Hud").info.show||2==+window.interface("Hud").info.show,dialogHidden:!window.IsDialogOpened(),gameFocused:t,authHidden:!window.getInterfaceStatus("Auth"),loadingHidden:!window.getInterfaceStatus("Loading"),inventoryHidden:!window.getInterfaceStatus("Inventory")},s=Object.values(n).every((e=>1==e));e(s)}}))})),setHooks(){jsLoader.utils.openInterfaceOptions.setListenerToOpenInterface("Inventory",(e=>{const t=JSON.parse(e[1])[0][6];if(this.openInventoryByScript)return this.setBankMoney(t),setTimeout((()=>this.closeInventory()),100),!1;this.setBankMoney(t)}))},getElHandles(){this.$wrapper=document.querySelector(bankMoneySettings.$wrapper),this.$value=document.querySelector(bankMoneySettings.$value),this.$cashSymbol=document.querySelector(bankMoneySettings.$cashSymbol)},setInitialValues(){this.$cashSymbol.textContent=bankMoneySettings.cashSymbol,this.$value.textContent=0},showBankMoney(){this.$wrapper.style.display="block"},setBankMoney(e){this.$value.textContent=bankMoneySettings.format(+e)},init(){this.setHooks(),this.waitPlayerSpawn(),this.getElHandles(),this.setInitialValues(),this.showBankMoney()}};bankMoney.init();