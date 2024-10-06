import{r as j,u as g,j as e,L as N,B as h,A as v}from"./index-DFCu50re.js";const f=({selectedCat:t,setSelectedCat:l})=>{var x,u;const[r,n]=j.useState({name:""}),[i,c]=j.useState(!0);let{token:d,getCategory:s}=g();(x=t==null?void 0:t.cat)!=null&&x.name&&i&&(n({name:(u=t==null?void 0:t.cat)==null?void 0:u.name}),c(!1));let a=p=>{let{name:b,value:m}=p.target;n(y=>({...y,[b]:m}))},o=async p=>{var b;p.preventDefault();try{let m=await fetch(`https://mernecom-server.onrender.com/category/update-category/${(b=t==null?void 0:t.cat)==null?void 0:b._id}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify(r)}),y=await m.json();m.ok?(h.success(y.msg),n({name:""}),s(),l({}),c(!0)):h.error(y.msg)}catch(m){console.log({msg:"update category",error:m})}};return e.jsx(N,{title:"Category list",children:e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("div",{}),e.jsx("div",{className:"modal fade",id:"updateCategory",tabIndex:-1,"aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",id:"exampleModalLabel",children:"Edite category"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("form",{onSubmit:o,className:"",children:[e.jsx("input",{onChange:a,className:" form-control m-2",type:"text",name:"name",value:r==null?void 0:r.name,placeholder:"Enter category name"}),e.jsx("button",{className:" btn btn-primary text-white fs-5 w-50 ms-2 btn-outline-success",type:"submit","data-bs-dismiss":"modal",children:"Update Category"})]})})]})})})]})})})},w=()=>{const[t,l]=j.useState({name:""});let{token:r,getCategory:n}=g(),i=d=>{let{name:s,value:a}=d.target;l(o=>({...o,[s]:a}))},c=async d=>{d.preventDefault();try{let s=await fetch("https://mernecom-server.onrender.com/category/create-category",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(t)}),a=await s.json();s.ok?(h.success(a.msg),l({name:""}),n()):h.error(a.msg)}catch(s){console.log({msg:"create category",error:s})}};return e.jsxs("div",{className:" mb-3",children:[e.jsx("div",{className:" px-3",children:e.jsx("h3",{children:"Create new category"})}),e.jsxs("form",{onSubmit:c,className:" w-50",children:[e.jsx("input",{onChange:i,className:" form-control m-2 text-capitalize",type:"text",name:"name",value:t.name,placeholder:"Enter category name"}),e.jsx("button",{className:" btn btn-primary text-white fs-5 w-50 ms-2 btn-outline-success",type:"submit",children:"Create Category"})]}),e.jsx("hr",{})]})},C=({deleteCategory:t,delId:l})=>e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("div",{}),e.jsx("div",{className:"modal fade",id:"deleteCategory",tabIndex:-1,"aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",id:"exampleModalLabel",children:"Delete confirmation"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("h3",{children:"Do you want to delete this?"})}),e.jsxs("div",{className:"modal-footer d-flex justify-content-evenly",children:[e.jsx("button",{type:"button",className:"btn btn-secondary w-25","data-bs-dismiss":"modal",children:"NO"}),e.jsx("button",{onClick:()=>t(l),type:"button",className:"btn btn-primary w-25","data-bs-dismiss":"modal",children:"YES"})]})]})})})]})}),D=()=>{let{category:t,token:l,getCategory:r}=g();const[n,i]=j.useState({}),[c,d]=j.useState("");let s=async(a,o)=>{let x=await fetch(`https://mernecom-server.onrender.com/category/delete-category/${a}`,{method:"DELETE",headers:{Authorization:`Bearer ${l}`}}),u=await x.json();x.ok?(r(),h.success(`${o} is deleted successfully`)):h.success(u.msg)};return e.jsx(N,{title:"category",children:e.jsxs("div",{className:"row ",children:[e.jsx("div",{className:"col-md-3 p-2",children:e.jsx("div",{className:"card p-2",children:e.jsx(v,{})})}),e.jsx("div",{className:" col-md-9 p-2",children:e.jsxs("div",{className:" card p-2",children:[e.jsx("div",{children:e.jsx(w,{})}),e.jsxs("div",{children:[e.jsxs("h3",{children:["Category List (",t.length,") "]}),e.jsxs("div",{className:" border",children:[e.jsxs("table",{className:"table table-hover",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"SL"}),e.jsx("th",{scope:"col",children:"Name"}),e.jsx("th",{scope:"col",children:"Update"}),e.jsx("th",{scope:"col",children:"Delete"}),e.jsx("th",{scope:"col",children:"Updated Time"})]})}),e.jsx("tbody",{className:" text-capitalize",children:t.length>0&&t.map((a,o)=>e.jsxs("tr",{children:[e.jsx("td",{children:o+1}),e.jsx("td",{children:a.name}),e.jsx("td",{children:e.jsx("button",{onClick:()=>i({cat:a}),type:"button",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#updateCategory",children:"Update"})}),e.jsx("td",{children:e.jsx("button",{onClick:()=>d(a._id),type:"button",className:"btn btn-danger","data-bs-toggle":"modal","data-bs-target":"#deleteCategory",children:"Delete"})}),e.jsx("td",{children:new Date(a.updatedAt).toLocaleString()})]},a._id))})]}),e.jsx(f,{selectedCat:n,setSelectedCat:i})]}),e.jsx(C,{deleteCategory:s,delId:c})]})]})})]})})};export{D as default};
