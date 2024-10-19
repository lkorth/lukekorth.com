/*!
  * PhotoSwipe Dynamic Caption plugin 1.2.7 - https://photoswipe.com
  * (c) 2022 Dmytro Semenov
  */
const t={captionContent:".pswp-caption-content",type:"auto",horizontalEdgeThreshold:20,mobileCaptionOverlapRatio:.3,mobileLayoutBreakpoint:600,verticallyCenterImage:!1};class i{constructor(i,e){this.options={...t,...e},this.lightbox=i,this.lightbox.on("init",(()=>{this.pswp=this.lightbox.pswp,this.initCaption()}))}initCaption(){const{pswp:t}=this;t.on("change",(()=>{this.showCaption(this.pswp.currSlide)})),t.on("calcSlideSize",(t=>this.onCalcSlideSize(t))),t.on("slideDestroy",(t=>{t.slide.dynamicCaption&&(t.slide.dynamicCaption.element&&t.slide.dynamicCaption.element.remove(),delete t.slide.dynamicCaption)})),t.on("zoomPanUpdate",(({slide:i})=>{if(t.opener.isOpen&&i.dynamicCaption){if(i.currZoomLevel>i.zoomLevels.initial?this.hideCaption(i):this.showCaption(i),i.dynamicCaption.element){let t=0;if(i.currZoomLevel<=i.zoomLevels.initial){const e=i.pan.y-i.bounds.center.y;Math.abs(e)>1&&(t=e)}this.setCaptionYOffset(i.dynamicCaption.element,t)}this.adjustPanArea(i,i.currZoomLevel)}})),t.on("beforeZoomTo",(i=>{this.adjustPanArea(t.currSlide,i.destZoomLevel)})),t.on("tapAction",(t=>{t.originalEvent.target.closest(".pswp__dynamic-caption")&&t.preventDefault()}))}adjustPanArea(t,i){t.dynamicCaption&&t.dynamicCaption.adjustedPanAreaSize&&(i>t.zoomLevels.initial?(t.panAreaSize.x=t.dynamicCaption.originalPanAreaSize.x,t.panAreaSize.y=t.dynamicCaption.originalPanAreaSize.y):(t.panAreaSize.x=t.dynamicCaption.adjustedPanAreaSize.x,t.panAreaSize.y=t.dynamicCaption.adjustedPanAreaSize.y))}useMobileLayout(){const{mobileLayoutBreakpoint:t}=this.options;return"function"==typeof t?t.call(this):"number"==typeof t&&window.innerWidth<t}hideCaption(t){if(t.dynamicCaption&&!t.dynamicCaption.hidden){const i=t.dynamicCaption.element;if(!i)return;t.dynamicCaption.hidden=!0,i.classList.add("pswp__dynamic-caption--faded"),t.captionFadeTimeout&&clearTimeout(t.captionFadeTimeout),t.captionFadeTimeout=setTimeout((()=>{i.style.visibility="hidden",delete t.captionFadeTimeout}),400)}}setCaptionYOffset(t,i){t.style.transform=`translateY(${i}px)`}showCaption(t){if(t.dynamicCaption&&t.dynamicCaption.hidden){const i=t.dynamicCaption.element;if(!i)return;t.dynamicCaption.hidden=!1,i.style.visibility="visible",clearTimeout(t.captionFadeTimeout),t.captionFadeTimeout=setTimeout((()=>{i.classList.remove("pswp__dynamic-caption--faded"),delete t.captionFadeTimeout}),50)}}setCaptionPosition(t,i,e){const s=i<=this.options.horizontalEdgeThreshold;t.classList[s?"add":"remove"]("pswp__dynamic-caption--on-hor-edge"),t.style.left=i+"px",t.style.top=e+"px"}setCaptionWidth(t,i){i?t.style.width=i+"px":t.style.removeProperty("width")}setCaptionType(t,i){const e=t.dataset.pswpCaptionType;i!==e&&(t.classList.add("pswp__dynamic-caption--"+i),t.classList.remove("pswp__dynamic-caption--"+e),t.dataset.pswpCaptionType=i)}updateCaptionPosition(t){if(!t.dynamicCaption||!t.dynamicCaption.type||!t.dynamicCaption.element)return;if("mobile"===t.dynamicCaption.type)return this.setCaptionType(t.dynamicCaption.element,t.dynamicCaption.type),t.dynamicCaption.element.style.removeProperty("left"),t.dynamicCaption.element.style.removeProperty("top"),void this.setCaptionWidth(t.dynamicCaption.element,!1);const i=t.zoomLevels.initial,e=Math.ceil(t.width*i),s=Math.ceil(t.height*i);this.setCaptionType(t.dynamicCaption.element,t.dynamicCaption.type),"aside"===t.dynamicCaption.type?(this.setCaptionPosition(t.dynamicCaption.element,t.bounds.center.x+e,t.bounds.center.y),this.setCaptionWidth(t.dynamicCaption.element,!1)):"below"===t.dynamicCaption.type&&(this.setCaptionPosition(t.dynamicCaption.element,t.bounds.center.x,t.bounds.center.y+s),this.setCaptionWidth(t.dynamicCaption.element,e))}onCalcSlideSize(t){const{slide:i}=t;let e,s;if(!i.dynamicCaption){i.dynamicCaption={element:void 0,type:!1,hidden:!1};const t=this.getCaptionHTML(i);if(!t)return;i.dynamicCaption.element=document.createElement("div"),i.dynamicCaption.element.className="pswp__dynamic-caption pswp__hide-on-close",i.dynamicCaption.element.innerHTML=t,this.pswp.dispatch("dynamicCaptionUpdateHTML",{captionElement:i.dynamicCaption.element,slide:i}),i.holderElement.appendChild(i.dynamicCaption.element)}if(!i.dynamicCaption.element)return;this.storeOriginalPanAreaSize(i),i.bounds.update(i.zoomLevels.initial),this.useMobileLayout()?(i.dynamicCaption.type="mobile",s=!0):"auto"===this.options.type?i.bounds.center.x>i.bounds.center.y?i.dynamicCaption.type="aside":i.dynamicCaption.type="below":i.dynamicCaption.type=this.options.type;const o=Math.ceil(i.width*i.zoomLevels.initial),n=Math.ceil(i.height*i.zoomLevels.initial);if(this.setCaptionType(i.dynamicCaption.element,i.dynamicCaption.type),"aside"===i.dynamicCaption.type){this.setCaptionWidth(i.dynamicCaption.element,!1),e=this.measureCaptionSize(i.dynamicCaption.element,t.slide);const s=e.x,n=o+i.bounds.center.x;i.panAreaSize.x-n<=s&&(i.panAreaSize.x-=s,this.recalculateZoomLevelAndBounds(i))}else if("below"===i.dynamicCaption.type||s){this.setCaptionWidth(i.dynamicCaption.element,s?this.pswp.viewportSize.x:o),e=this.measureCaptionSize(i.dynamicCaption.element,t.slide);const a=e.y;if(this.options.verticallyCenterImage)i.panAreaSize.y-=a,this.recalculateZoomLevelAndBounds(i);else{const t=n+i.bounds.center.y,e=i.panAreaSize.y-t,o=i.panAreaSize.y;if(e<=a){i.panAreaSize.y-=Math.min(2*(a-e),a),this.recalculateZoomLevelAndBounds(i);const t=i.panAreaSize.x*this.options.mobileCaptionOverlapRatio/2;s&&i.bounds.center.x>t&&(i.panAreaSize.y=o,this.recalculateZoomLevelAndBounds(i))}}}this.storeAdjustedPanAreaSize(i),this.updateCaptionPosition(i)}measureCaptionSize(t,i){const e=t.getBoundingClientRect();return this.pswp.dispatch("dynamicCaptionMeasureSize",{captionEl:t,slide:i,captionSize:{x:e.width,y:e.height}}).captionSize}recalculateZoomLevelAndBounds(t){t.zoomLevels.update(t.width,t.height,t.panAreaSize),t.bounds.update(t.zoomLevels.initial)}storeAdjustedPanAreaSize(t){t.dynamicCaption&&(t.dynamicCaption.adjustedPanAreaSize||(t.dynamicCaption.adjustedPanAreaSize={}),t.dynamicCaption.adjustedPanAreaSize.x=t.panAreaSize.x,t.dynamicCaption.adjustedPanAreaSize.y=t.panAreaSize.y)}storeOriginalPanAreaSize(t){t.dynamicCaption&&(t.dynamicCaption.originalPanAreaSize||(t.dynamicCaption.originalPanAreaSize={}),t.dynamicCaption.originalPanAreaSize.x=t.panAreaSize.x,t.dynamicCaption.originalPanAreaSize.y=t.panAreaSize.y)}getCaptionHTML(t){if("function"==typeof this.options.captionContent)return this.options.captionContent.call(this,t);const i=t.data.element;let e="";if(i){const t=i.querySelector(this.options.captionContent);if(t)e=t.innerHTML;else{const t=i.querySelector("img");t&&(e=t.getAttribute("alt"))}}return e}}export{i as default};
