(()=>{const o=[];window.addDialogInQueue=new Proxy(window.addDialogInQueue,{apply(e,l,i){const n=JSON.parse(i[0])[1];let a=[];return"string"==typeof i[1]&&(a=i[1].match(/{......}/g)),null===a&&(a=[]),function(e,l,i=[]){const n={colors:{}};n.dialogType=l,i.forEach((o=>{n.colors[o]=""})),n.dialogContent=e,o.push(n)}(i,n,a),2!==n&&5!==n||function(o,e=[]){if(void 0!==window.replaceDialogColors)for(const l of Object.keys(window.replaceDialogColors.include))if("*"!==l)window.replaceDialogColors.exclude.includes(l)||(o[1]=o[1].replaceAll(l,window.replaceDialogColors.include[l]));else for(const i of e)window.replaceDialogColors.exclude.includes(i)||(o[1]=o[1].replaceAll(i,window.replaceDialogColors.include[l]))}(i,a),Reflect.apply(e,l,i)}}),jsLoader.chat.registerCommand("/writeDialogColors",(()=>{jsLoader.socket.sendEvent(`writeFile|cef/assets/dialogInfo.json|${JSON.stringify(o,null,4)}`,(()=>{})),jsLoader.utils.createGameText(2,"OK",1e3)}))})();