const $=x=>document.getElementById(x);let allowed=false;
$("back").onclick=()=>window.aura.back();$("forward").onclick=()=>window.aura.forward();$("reload").onclick=()=>window.aura.reload();
function nav(){let u=$("address").value.trim();if(u)window.aura.navigate(u)}$("go").onclick=nav;$("address").onkeydown=e=>e.key==="Enter"&&nav();
$("ai").onclick=()=>$("side").classList.toggle("open");$("close").onclick=()=>$("side").classList.remove("open");$("menu").onclick=()=>$("menuPanel").classList.toggle("open");$("dt").onclick=()=>window.aura.devtools();
$("allow").onclick=()=>{allowed=true;$("status").textContent="Aura AI can read this page.";$("allow").textContent="Allowed";$("allow").disabled=true;$("sum").disabled=false};
$("sum").disabled=true;
function add(t){let d=document.createElement("div");d.className="msg";d.textContent=t;$("chat").appendChild(d);$("chat").scrollTop=$("chat").scrollHeight}
$("sum").onclick=async()=>{if(!allowed)return;let p=await window.aura.page();if(!p.ok)return add("I couldn't read this page: "+p.error);let words=(p.text||"").split(/\s+/).filter(Boolean);add("Summary of "+(p.title||"this page")+":\n\n"+words.slice(0,120).join(" ")+(words.length>120?"…":"")+"\n\nThis extracted page text is ready to send to Gemini, Hugging Face, or a local AI model.")};
$("ask").onclick=async()=>{let q=$("q").value.trim();if(!q)return;if(!allowed)return add("Please allow page access first.");$("q").value="";add("You: "+q);let p=await window.aura.page();add("Aura AI has the current page content available. Connect your chosen AI provider here to answer using that content.")};
