(()=>{
const API='https://wqbjnczynqaahtwpyvrp.supabase.co/functions/v1/project-api';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let currentId=null;
function getId(){return currentId}
function addButton(){
 const area=document.querySelector('#pc .edit-area');
 if(!area)return;
 let b=area.querySelector('#deleteProject');
 if(!b){
  b=document.createElement('button');
  b.id='deleteProject'; b.type='button'; b.textContent='Delete Project';
  b.style.cssText='margin:14px 6px 0;padding:8px 12px;border:1px solid #c58b86;background:#fff;color:#9c3027;border-radius:3px;font-weight:750;cursor:pointer';
  b.onclick=async()=>{
   const id=getId();
   if(!UUID.test(id||'')){alert('Could not identify this project.');return}
   const pin=prompt('Enter the 4-digit edit PIN to delete this project:');
   if(pin===null)return;
   if(!/^\\d{4}$/.test(pin.trim())){alert('PIN must be exactly 4 digits.');return}
   if(!confirm('Delete this project permanently?'))return;
   b.disabled=true;b.textContent='Deleting...';
   try{
    const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',id,pin:pin.trim()})});
    let j={};try{j=await r.json()}catch{}
    if(!r.ok)throw new Error(j.error||'Could not delete project');
    location.href='/';
   }catch(e){b.disabled=false;b.textContent='Delete Project';alert(e.message||'Could not delete project.')}};
  area.appendChild(b);
 }
 b.dataset.projectId=currentId||'';
}
document.addEventListener('click',e=>{
 const el=e.target.closest&&e.target.closest('[data-id]');
 if(!el)return;
 const id=el.getAttribute('data-id');
 if(UUID.test(id||''))currentId=id;
});
new MutationObserver(addButton).observe(document.documentElement,{subtree:true,childList:true});
setInterval(addButton,500);
})();
