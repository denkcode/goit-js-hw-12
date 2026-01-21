import{a as f,S as w,i as n}from"./assets/vendor-BkVuWn-o.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();f.defaults.baseURL="https://pixabay.com/api/";const v="54217574-1b59999edbea9c550fa507ae7",q=15;async function m(r,t){return(await f.get("",{params:{key:v,q:r,page:t,per_page:q,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const S=new w(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const t=document.querySelector(".gallery"),s=r.map(a=>`
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
  `).join("");t.insertAdjacentHTML("beforeend",s),S.refresh()}const $=document.querySelector(".gallery");function B(){$.innerHTML=""}function h(){document.querySelector(".loader").classList.remove("is-hidden")}function g(){document.querySelector(".loader").classList.add("is-hidden")}function L(){document.querySelector(".buttonload").classList.remove("is-hidden")}function u(){document.querySelector(".buttonload").classList.add("is-hidden")}const p=document.querySelector(".form"),E=document.querySelector(".buttonload");let b="",d=1,i=0,l=0;u();E.addEventListener("click",async()=>{d+=1,h(),u();try{const r=await m(b,d);y(r.hits),l+=r.hits.length;const s=document.querySelector(".gallery").firstElementChild;if(s){const a=s.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}l<i?L():n.info({message:"Більше зображень немає."})}catch{n.error({message:"Помилка завантаження"})}finally{g()}});p.addEventListener("submit",async r=>{r.preventDefault();const t=r.currentTarget.searchtext.value.trim();if(!t){n.warning({message:"Введіть слово для пошуку!"});return}b=t,d=1,l=0,B(),u(),h();try{const s=await m(t);if(i=s.totalHits,s.hits.length===0){n.warning({message:"Нічого не знайдено. Спробуйте інший запит."});return}y(s.hits),n.success({message:`Знайдено ${i} зображень`}),l=s.hits.length,l<i?L():n.info({message:"Більше зображень немає."})}catch{n.error({message:"Помилка сервера. Спробуйте пізніше"})}finally{g()}p.reset()});
//# sourceMappingURL=index.js.map
