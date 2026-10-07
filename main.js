const {app,BrowserWindow,BrowserView,ipcMain}=require("electron");const path=require("path");
let win,view;
function create(){win=new BrowserWindow({width:1500,height:950,backgroundColor:"#090b10",webPreferences:{preload:path.join(__dirname,"preload.js"),contextIsolation:true,sandbox:true,nodeIntegration:false}});win.loadFile("index.html");view=new BrowserView({webPreferences:{contextIsolation:true,sandbox:true,nodeIntegration:false}});win.addBrowserView(view);view.setBounds({x:0,y:112,width:1500,height:838});view.setAutoResize({width:true,height:true});view.webContents.loadURL("https://www.google.com");}
ipcMain.handle("navigate",(_,u)=>{u=/^https?:\/\//i.test(u)?u:"https://www.google.com/search?q="+encodeURIComponent(u);view.webContents.loadURL(u)});
ipcMain.handle("back",()=>view.webContents.goBack());ipcMain.handle("forward",()=>view.webContents.goForward());ipcMain.handle("reload",()=>view.webContents.reload());
ipcMain.handle("devtools",()=>view.webContents.openDevTools({mode:"detach"}));
ipcMain.handle("page",async()=>{try{return{ok:true,title:await view.webContents.getTitle(),url:view.webContents.getURL(),text:await view.webContents.executeJavaScript(`(()=>{let x=document.body.cloneNode(true);x.querySelectorAll("script,style,noscript,svg,nav,footer,header,aside").forEach(e=>e.remove());return (x.innerText||"").replace(/\\s+/g," ").trim().slice(0,50000)})()`,true)}}catch(e){return{ok:false,error:e.message}}});
app.whenReady().then(create);app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit()});
