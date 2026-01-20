import{a as m,S as b,i as n}from"./assets/vendor-BkVuWn-o.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();m.defaults.baseURL="https://pixabay.com/api/";const w="54217574-1b59999edbea9c550fa507ae7",v=15;async function y(r,s){return(await m.get("",{params:{key:w,q:r,page:s,per_page:v,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const q=new b(".gallery a",{captionsData:"alt",captionDelay:250});function h(r){const s=document.querySelector(".gallery"),t=r.map(a=>`
    <li class="photo-card">
      <a href="${a.largeImageURL}">
        <img src="${a.webformatURL}" alt="${a.tags}" loading="lazy">
      </a>
      <div class="info">
  <p class="info-item">
    <span class="label">Likes</span>
    <span class="value">${a.likes}</span>
  </p>
  <p class="info-item">
    <span class="label">Views</span>
    <span class="value">${a.views}</span>
  </p>
  <p class="info-item">
    <span class="label">Comments</span>
    <span class="value">${a.comments}</span>
  </p>
  <p class="info-item">
    <span class="label">Downloads</span>
    <span class="value">${a.downloads}</span>
  </p>
</div>
    </li>
  `).join("");s.insertAdjacentHTML("beforeend",t),q.refresh()}const S=document.querySelector(".gallery");function $(){S.innerHTML=""}function g(){document.querySelector(".loader").classList.remove("is-hidden")}function i(){document.querySelector(".loader").classList.add("is-hidden")}function B(){document.querySelector(".buttonload").classList.remove("is-hidden")}function d(){document.querySelector(".buttonload").classList.add("is-hidden")}const f=document.querySelector(".form"),E=document.querySelector(".buttonload");let L="",p=1,c=0,l=0;d();E.addEventListener("click",async()=>{p+=1,g();try{const r=await y(L,p);h(r.hits),l+=r.hits.length;const t=document.querySelector(".gallery").firstElementChild;if(t){const a=t.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}l>=c&&(d(),n.info({message:"Більше зображень немає."}))}catch{n.error({message:"Помилка завантаження"})}finally{i()}});f.addEventListener("submit",async r=>{r.preventDefault();const s=r.currentTarget.searchtext.value.trim();if(s===""){n.warning({message:"Введіть слово для пошуку!"});return}L=s,p=1,l=0,$(),g(),d();try{const t=await y(s);if(c=t.totalHits,t.hits.length===0){i(),n.warning({message:"Нічого не знайдено. Спробуйте інший запит."});return}setTimeout(()=>{h(t.hits),i(),n.success({message:`Знайдено ${c} зображень`}),l=t.hits.length,l<c?B():d()},2e3)}catch{i(),n.error({message:"Помилка сервера. Спробуйте пізніше"})}f.reset()});
//# sourceMappingURL=index.js.map
