(()=>{
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const oldOpen=window.openProject;
if(typeof oldOpen!=='function')return;
window.openProject=function(id){
 oldOpen(id);
 const area=document.querySelector('#pc .edit-area');
 if(!area||document.getElementById('deleteProject'))return;
 const projectId=typeof viewId==='string'&&UUID.test(viewId)?viewId:id;
 const b=document.createElement('button');
 b.id='deleteProject';b.type='button';b.className='edit';b.textContent='Delete Project';
 b.style.cssText='margin:14px 6px 0;color:#9c3027';b.dataset.projectId=projectId;
 b.onclick=async()=>{
  const pin=prompt('Enter the 4-digit edit PIN to delete this project:');
  if(pin===null)return;
  const v=pin.trim();
  if(!/^\d{4}$/.test(v)){toast('error','Invalid PIN','Enter exactly 4 digits.');return}
  if(!confirm('Delete this project permanently?'))return;
  b.disabled=true;b.textContent='Deleting...';
  try{
   await callApi({action:'delete',id:b.dataset.projectId,pin:v});
   projects=projects.filter(p=>p.id!==b.dataset.projectId);
   closePage();render();
   toast('success','Project deleted','The project and its uploaded media were deleted.');
  }catch(e){b.disabled=false;b.textContent='Delete Project';toast('error','Could not delete project',e.message||'Something went wrong.')}
 };
 area.appendChild(b);
};
})();
