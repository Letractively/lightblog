;(function($){var _remove=$.fn.remove,isFF2=$.browser.mozilla&&(parseFloat($.browser.version)<1.9);$.ui={version:"1.6rc5",plugin:{add:function(module,option,set){var proto=$.ui[module].prototype;for(var i in set){proto.plugins[i]=proto.plugins[i]||[];proto.plugins[i].push([option,set[i]]);}},call:function(instance,name,args){var set=instance.plugins[name];if(!set){return;}
for(var i=0;i<set.length;i++){if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args);}}}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);},cssCache:{},css:function(name){if($.ui.cssCache[name]){return $.ui.cssCache[name];}
var tmp=$('<div class="ui-gen"></div>').addClass(name).css({position:'absolute',top:'-5000px',left:'-5000px',display:'block'}).appendTo('body');$.ui.cssCache[name]=!!((!(/auto|default/).test(tmp.css('cursor'))||(/^[1-9]/).test(tmp.css('height'))||(/^[1-9]/).test(tmp.css('width'))||!(/none/).test(tmp.css('backgroundImage'))||!(/transparent|rgba\(0, 0, 0, 0\)/).test(tmp.css('backgroundColor'))));try{$('body').get(0).removeChild(tmp.get(0));}catch(e){}
return $.ui.cssCache[name];},hasScroll:function(el,a){if($(el).css('overflow')=='hidden'){return false;}
var scroll=(a&&a=='left')?'scrollLeft':'scrollTop',has=false;if(el[scroll]>0){return true;}
el[scroll]=1;has=(el[scroll]>0);el[scroll]=0;return has;},isOverAxis:function(x,reference,size){return(x>reference)&&(x<(reference+size));},isOver:function(y,x,top,left,height,width){return $.ui.isOverAxis(y,top,height)&&$.ui.isOverAxis(x,left,width);},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};if(isFF2){var attr=$.attr,removeAttr=$.fn.removeAttr,ariaNS="http://www.w3.org/2005/07/aaa",ariaState=/^aria-/,ariaRole=/^wairole:/;$.attr=function(elem,name,value){var set=value!==undefined;return(name=='role'?(set?attr.call(this,elem,name,"wairole:"+value):(attr.apply(this,arguments)||"").replace(ariaRole,"")):(ariaState.test(name)?(set?elem.setAttributeNS(ariaNS,name.replace(ariaState,"aaa:"),value):attr.call(this,elem,name.replace(ariaState,"aaa:"))):attr.apply(this,arguments)));};$.fn.removeAttr=function(name){return(ariaState.test(name)?this.each(function(){this.removeAttributeNS(ariaNS,name.replace(ariaState,""));}):removeAttr.call(this,name));};}
$.fn.extend({remove:function(){$("*",this).add(this).each(function(){$(this).triggerHandler("remove");});return _remove.apply(this,arguments);},enableSelection:function(){return this.attr('unselectable','off').css('MozUserSelect','').unbind('selectstart.ui');},disableSelection:function(){return this.attr('unselectable','on').css('MozUserSelect','none').bind('selectstart.ui',function(){return false;});},scrollParent:function(){var scrollParent;if(($.browser.msie&&(/(static|relative)/).test(this.css('position')))||(/absolute/).test(this.css('position'))){scrollParent=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test($.curCSS(this,'position',1))&&(/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));}).eq(0);}else{scrollParent=this.parents().filter(function(){return(/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));}).eq(0);}
return(/fixed/).test(this.css('position'))||!scrollParent.length?$(document):scrollParent;}});$.extend($.expr[':'],{data:function(elem,i,match){return!!$.data(elem,match[3]);},tabbable:function(elem){var nodeName=elem.nodeName.toLowerCase();function isVisible(element){return!($(element).is(':hidden')||$(element).parents(':hidden').length);}
return(elem.tabIndex>=0&&(('a'==nodeName&&elem.href)||(/input|select|textarea|button/.test(nodeName)&&'hidden'!=elem.type&&!elem.disabled))&&isVisible(elem));}});function getter(namespace,plugin,method,args){function getMethods(type){var methods=$[namespace][plugin][type]||[];return(typeof methods=='string'?methods.split(/,?\s+/):methods);}
var methods=getMethods('getter');if(args.length==1&&typeof args[0]=='string'){methods=methods.concat(getMethods('getterSetter'));}
return($.inArray(method,methods)!=-1);}
$.widget=function(name,prototype){var namespace=name.split(".")[0];name=name.split(".")[1];$.fn[name]=function(options){var isMethodCall=(typeof options=='string'),args=Array.prototype.slice.call(arguments,1);if(isMethodCall&&options.substring(0,1)=='_'){return this;}
if(isMethodCall&&getter(namespace,name,options,args)){var instance=$.data(this[0],name);return(instance?instance[options].apply(instance,args):undefined);}
return this.each(function(){var instance=$.data(this,name);(!instance&&!isMethodCall&&$.data(this,name,new $[namespace][name](this,options)));(instance&&isMethodCall&&$.isFunction(instance[options])&&instance[options].apply(instance,args));});};$[namespace]=$[namespace]||{};$[namespace][name]=function(element,options){var self=this;this.namespace=namespace;this.widgetName=name;this.widgetEventPrefix=$[namespace][name].eventPrefix||name;this.widgetBaseClass=namespace+'-'+name;this.options=$.extend({},$.widget.defaults,$[namespace][name].defaults,$.metadata&&$.metadata.get(element)[name],options);this.element=$(element).bind('setData.'+name,function(event,key,value){if(event.target==element){return self._setData(key,value);}}).bind('getData.'+name,function(event,key){if(event.target==element){return self._getData(key);}}).bind('remove',function(){return self.destroy();});this._init();};$[namespace][name].prototype=$.extend({},$.widget.prototype,prototype);$[namespace][name].getterSetter='option';};$.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+'-disabled'+' '+this.namespace+'-state-disabled').removeAttr('aria-disabled');},option:function(key,value){var options=key,self=this;if(typeof key=="string"){if(value===undefined){return this._getData(key);}
options={};options[key]=value;}
$.each(options,function(key,value){self._setData(key,value);});},_getData:function(key){return this.options[key];},_setData:function(key,value){this.options[key]=value;if(key=='disabled'){this.element
[value?'addClass':'removeClass'](this.widgetBaseClass+'-disabled'+' '+
this.namespace+'-state-disabled').attr("aria-disabled",value);}},enable:function(){this._setData('disabled',false);},disable:function(){this._setData('disabled',true);},_trigger:function(type,event,data){var callback=this.options[type],eventName=(type==this.widgetEventPrefix?type:this.widgetEventPrefix+type);event=$.Event(event);event.type=eventName;this.element.trigger(event,data);return!($.isFunction(callback)&&callback.call(this.element[0],event,data)===false||event.isDefaultPrevented());}};$.widget.defaults={disabled:false};$.ui.mouse={_mouseInit:function(){var self=this;this.element.bind('mousedown.'+this.widgetName,function(event){return self._mouseDown(event);}).bind('click.'+this.widgetName,function(event){if(self._preventClickEvent){self._preventClickEvent=false;return false;}});if($.browser.msie){this._mouseUnselectable=this.element.attr('unselectable');this.element.attr('unselectable','on');}
this.started=false;},_mouseDestroy:function(){this.element.unbind('.'+this.widgetName);($.browser.msie&&this.element.attr('unselectable',this._mouseUnselectable));},_mouseDown:function(event){(this._mouseStarted&&this._mouseUp(event));this._mouseDownEvent=event;var self=this,btnIsLeft=(event.which==1),elIsCancel=(typeof this.options.cancel=="string"?$(event.target).parents().add(event.target).filter(this.options.cancel).length:false);if(!btnIsLeft||elIsCancel||!this._mouseCapture(event)){return true;}
this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){self.mouseDelayMet=true;},this.options.delay);}
if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){this._mouseStarted=(this._mouseStart(event)!==false);if(!this._mouseStarted){event.preventDefault();return true;}}
this._mouseMoveDelegate=function(event){return self._mouseMove(event);};this._mouseUpDelegate=function(event){return self._mouseUp(event);};$(document).bind('mousemove.'+this.widgetName,this._mouseMoveDelegate).bind('mouseup.'+this.widgetName,this._mouseUpDelegate);($.browser.safari||event.preventDefault());return true;},_mouseMove:function(event){if($.browser.msie&&!event.button){return this._mouseUp(event);}
if(this._mouseStarted){this._mouseDrag(event);return event.preventDefault();}
if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,event)!==false);(this._mouseStarted?this._mouseDrag(event):this._mouseUp(event));}
return!this._mouseStarted;},_mouseUp:function(event){$(document).unbind('mousemove.'+this.widgetName,this._mouseMoveDelegate).unbind('mouseup.'+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=true;this._mouseStop(event);}
return false;},_mouseDistanceMet:function(event){return(Math.max(Math.abs(this._mouseDownEvent.pageX-event.pageX),Math.abs(this._mouseDownEvent.pageY-event.pageY))>=this.options.distance);},_mouseDelayMet:function(event){return this.mouseDelayMet;},_mouseStart:function(event){},_mouseDrag:function(event){},_mouseStop:function(event){},_mouseCapture:function(event){return true;}};$.ui.mouse.defaults={cancel:null,distance:1,delay:0};})(jQuery);(function($){$.widget("ui.tabs",{_init:function(){this._tabify(true);},destroy:function(){var o=this.options;this.list.unbind('.tabs').removeClass(o.navClass).removeData('tabs');this.$tabs.each(function(){var href=$.data(this,'href.tabs');if(href)
this.href=href;var $this=$(this).unbind('.tabs');$.each(['href','load','cache'],function(i,prefix){$this.removeData(prefix+'.tabs');});});this.$lis.unbind('.tabs').add(this.$panels).each(function(){if($.data(this,'destroy.tabs'))
$(this).remove();else
$(this).removeClass([o.tabClass,o.selectedClass,o.deselectableClass,o.disabledClass,o.panelClass,o.hideClass].join(' '));});if(o.cookie)
this._cookie(null,o.cookie);},_setData:function(key,value){if((/^selected/).test(key))
this.select(value);else{this.options[key]=value;this._tabify();}},length:function(){return this.$tabs.length;},_tabId:function(a){return a.title&&a.title.replace(/\s/g,'_').replace(/[^A-Za-z0-9\-_:\.]/g,'')||this.options.idPrefix+$.data(a);},_sanitizeSelector:function(hash){return hash.replace(/:/g,'\\:');},_cookie:function(){var cookie=this.cookie||(this.cookie='ui-tabs-'+$.data(this.list[0]));return $.cookie.apply(null,[cookie].concat($.makeArray(arguments)));},_tabify:function(init){this.list=this.element.is('div')?this.element.children('ul:first, ol:first').eq(0):this.element;this.$lis=$('li:has(a[href])',this.list);this.$tabs=this.$lis.map(function(){return $('a',this)[0];});this.$panels=$([]);var self=this,o=this.options;this.$tabs.each(function(i,a){if(a.hash&&a.hash.replace('#',''))
self.$panels=self.$panels.add(self._sanitizeSelector(a.hash));else if($(a).attr('href')!='#'){$.data(a,'href.tabs',a.href);$.data(a,'load.tabs',a.href);var id=self._tabId(a);a.href='#'+id;var $panel=$('#'+id);if(!$panel.length){$panel=$(o.panelTemplate).attr('id',id).addClass(o.panelClass).insertAfter(self.$panels[i-1]||self.list);$panel.data('destroy.tabs',true);}
self.$panels=self.$panels.add($panel);}
else
o.disabled.push(i+1);});if(init){if(this.element.is('div')){this.element.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all');}
this.list.addClass(o.navClass);this.$lis.addClass(o.tabClass);this.$panels.addClass(o.panelClass);if(o.selected===undefined){if(location.hash){this.$tabs.each(function(i,a){if(a.hash==location.hash){o.selected=i;return false;}});}
else if(o.cookie){var index=parseInt(self._cookie(),10);if(index&&self.$tabs[index])o.selected=index;}
else if(self.$lis.filter('.'+o.selectedClass).length)
o.selected=self.$lis.index(self.$lis.filter('.'+o.selectedClass)[0]);}
o.selected=o.selected===null||o.selected!==undefined?o.selected:0;o.disabled=$.unique(o.disabled.concat($.map(this.$lis.filter('.'+o.disabledClass),function(n,i){return self.$lis.index(n);}))).sort();if($.inArray(o.selected,o.disabled)!=-1)
o.disabled.splice($.inArray(o.selected,o.disabled),1);this.$panels.addClass(o.hideClass);this.$lis.removeClass(o.selectedClass);if(o.selected!==null&&this.$tabs.length){this.$panels.eq(o.selected).removeClass(o.hideClass);var classes=[o.selectedClass];if(o.deselectable)classes.push(o.deselectableClass);this.$lis.eq(o.selected).addClass(classes.join(' '));var onShow=function(){self._trigger('show',null,self.ui(self.$tabs[o.selected],self.$panels[o.selected]));};if($.data(this.$tabs[o.selected],'load.tabs'))
this.load(o.selected,onShow);else onShow();}
var handleState=function(state,el){if(el.is(':not(.'+o.disabledClass+')'))el.toggleClass('ui-state-'+state);};this.$lis.bind('mouseover.tabs mouseout.tabs',function(){handleState('hover',$(this));});this.$tabs.bind('focus.tabs blur.tabs',function(){handleState('focus',$(this).parents('li:first'));});$(window).bind('unload',function(){self.$lis.add(self.$tabs).unbind('.tabs');self.$lis=self.$tabs=self.$panels=null;});}
else
o.selected=this.$lis.index(this.$lis.filter('.'+o.selectedClass)[0]);if(o.cookie)this._cookie(o.selected,o.cookie);for(var i=0,li;li=this.$lis[i];i++)
$(li)[$.inArray(i,o.disabled)!=-1&&!$(li).hasClass(o.selectedClass)?'addClass':'removeClass'](o.disabledClass);if(o.cache===false)this.$tabs.removeData('cache.tabs');var hideFx,showFx;if(o.fx){if(o.fx.constructor==Array){hideFx=o.fx[0];showFx=o.fx[1];}
else hideFx=showFx=o.fx;}
function resetStyle($el,fx){$el.css({display:''});if($.browser.msie&&fx.opacity)$el[0].style.removeAttribute('filter');}
var showTab=showFx?function(clicked,$show){$show.animate(showFx,showFx.duration||'normal',function(){$show.removeClass(o.hideClass);resetStyle($show,showFx);self._trigger('show',null,self.ui(clicked,$show[0]));});}:function(clicked,$show){$show.removeClass(o.hideClass);self._trigger('show',null,self.ui(clicked,$show[0]));};var hideTab=hideFx?function(clicked,$hide,$show){$hide.animate(hideFx,hideFx.duration||'normal',function(){$hide.addClass(o.hideClass);resetStyle($hide,hideFx);if($show)showTab(clicked,$show,$hide);});}:function(clicked,$hide,$show){$hide.addClass(o.hideClass);if($show)showTab(clicked,$show);};function switchTab(clicked,$li,$hide,$show){var classes=[o.selectedClass];if(o.deselectable)classes.push(o.deselectableClass);$li.removeClass('ui-state-default').addClass(classes.join(' ')).siblings().removeClass(classes.join(' ')).addClass('ui-state-default');hideTab(clicked,$hide,$show);}
this.$tabs.unbind('.tabs').bind(o.event+'.tabs',function(){var $li=$(this).parents('li:eq(0)'),$hide=self.$panels.filter(':visible'),$show=$(self._sanitizeSelector(this.hash));if(($li.hasClass('ui-state-active')&&!o.deselectable)||$li.hasClass(o.disabledClass)||$(this).hasClass(o.loadingClass)||self._trigger('select',null,self.ui(this,$show[0]))===false){this.blur();return false;}
o.selected=self.$tabs.index(this);if(o.deselectable){if($li.hasClass('ui-state-active')){self.options.selected=null;$li.removeClass([o.selectedClass,o.deselectableClass].join(' ')).addClass('ui-state-default');self.$panels.stop();hideTab(this,$hide);this.blur();return false;}else if(!$hide.length){self.$panels.stop();var a=this;self.load(self.$tabs.index(this),function(){$li.addClass([o.selectedClass,o.deselectableClass].join(' ')).removeClass('ui-state-default');showTab(a,$show);});this.blur();return false;}}
if(o.cookie)self._cookie(o.selected,o.cookie);self.$panels.stop();if($show.length){var a=this;self.load(self.$tabs.index(this),$hide.length?function(){switchTab(a,$li,$hide,$show);}:function(){$li.addClass(o.selectedClass).removeClass('ui-state-default');showTab(a,$show);});}else
throw'jQuery UI Tabs: Mismatching fragment identifier.';if($.browser.msie)this.blur();return false;});if(o.event!='click')this.$tabs.bind('click.tabs',function(){return false;});},add:function(url,label,index){if(index==undefined)
index=this.$tabs.length;var o=this.options;var $li=$(o.tabTemplate.replace(/#\{href\}/g,url).replace(/#\{label\}/g,label));$li.addClass(o.tabClass).data('destroy.tabs',true);var id=url.indexOf('#')==0?url.replace('#',''):this._tabId($('a:first-child',$li)[0]);var $panel=$('#'+id);if(!$panel.length){$panel=$(o.panelTemplate).attr('id',id).addClass(o.hideClass).data('destroy.tabs',true);}
$panel.addClass(o.panelClass);if(index>=this.$lis.length){$li.appendTo(this.list);$panel.appendTo(this.list[0].parentNode);}
else{$li.insertBefore(this.$lis[index]);$panel.insertBefore(this.$panels[index]);}
o.disabled=$.map(o.disabled,function(n,i){return n>=index?++n:n});this._tabify();if(this.$tabs.length==1){$li.addClass(o.selectedClass);$panel.removeClass(o.hideClass);var href=$.data(this.$tabs[0],'load.tabs');if(href)this.load(index,href);}
this._trigger('add',null,this.ui(this.$tabs[index],this.$panels[index]));},remove:function(index){var o=this.options,$li=this.$lis.eq(index).remove(),$panel=this.$panels.eq(index).remove();if($li.hasClass(o.selectedClass)&&this.$tabs.length>1)
this.select(index+(index+1<this.$tabs.length?1:-1));o.disabled=$.map($.grep(o.disabled,function(n,i){return n!=index;}),function(n,i){return n>=index?--n:n});this._tabify();this._trigger('remove',null,this.ui($li.find('a')[0],$panel[0]));},enable:function(index){var o=this.options;if($.inArray(index,o.disabled)==-1)
return;var $li=this.$lis.eq(index).removeClass(o.disabledClass);if($.browser.safari){$li.css('display','inline-block');setTimeout(function(){$li.css('display','block');},0);}
o.disabled=$.grep(o.disabled,function(n,i){return n!=index;});this._trigger('enable',null,this.ui(this.$tabs[index],this.$panels[index]));},disable:function(index){var self=this,o=this.options;if(index!=o.selected){this.$lis.eq(index).addClass(o.disabledClass);o.disabled.push(index);o.disabled.sort();this._trigger('disable',null,this.ui(this.$tabs[index],this.$panels[index]));}},select:function(index){if(typeof index=='string')
index=this.$tabs.index(this.$tabs.filter('[href$='+index+']')[0]);this.$tabs.eq(index).trigger(this.options.event+'.tabs');},load:function(index,callback){var self=this,o=this.options,$a=this.$tabs.eq(index),a=$a[0],bypassCache=callback==undefined||callback===false,url=$a.data('load.tabs');callback=callback||function(){};if(!url||!bypassCache&&$.data(a,'cache.tabs')){callback();return;}
var inner=function(parent){var $parent=$(parent),$inner=$parent.find('*:last');return $inner.length&&$inner.is(':not(img)')&&$inner||$parent;};var cleanup=function(){self.$tabs.filter('.'+o.loadingClass).removeClass(o.loadingClass).each(function(){if(o.spinner)
inner(this).parent().html(inner(this).data('label.tabs'));});self.xhr=null;};if(o.spinner){var label=inner(a).html();inner(a).wrapInner('<em></em>').find('em').data('label.tabs',label).html(o.spinner);}
var ajaxOptions=$.extend({},o.ajaxOptions,{url:url,success:function(r,s){$(self._sanitizeSelector(a.hash)).html(r);cleanup();if(o.cache)
$.data(a,'cache.tabs',true);self._trigger('load',null,self.ui(self.$tabs[index],self.$panels[index]));try{o.ajaxOptions.success(r,s);}
catch(er){}
callback();}});if(this.xhr){this.xhr.abort();cleanup();}
$a.addClass(o.loadingClass);self.xhr=$.ajax(ajaxOptions);},url:function(index,url){this.$tabs.eq(index).removeData('cache.tabs').data('load.tabs',url);},ui:function(tab,panel){return{options:this.options,tab:tab,panel:panel,index:this.$tabs.index(tab)};}});$.extend($.ui.tabs,{version:'1.6rc5',getter:'length',defaults:{ajaxOptions:null,cache:false,cookie:null,deselectable:false,deselectableClass:'ui-tabs-deselectable',disabled:[],disabledClass:'ui-state-disabled',event:'click',fx:null,hideClass:'ui-tabs-hide',idPrefix:'ui-tabs-',loadingClass:'ui-tabs-loading',navClass:'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all',tabClass:'ui-state-default ui-corner-top',panelClass:'ui-tabs-panel ui-widget-content ui-corner-bottom',panelTemplate:'<div></div>',selectedClass:'ui-tabs-selected ui-state-active',spinner:'Loading&#8230;',tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});$.extend($.ui.tabs.prototype,{rotation:null,rotate:function(ms,continuing){continuing=continuing||false;var self=this,t=this.options.selected;function start(){self.rotation=setInterval(function(){t=++t<self.$tabs.length?t:0;self.select(t);},ms);}
function stop(event){if(!event||event.clientX){clearInterval(self.rotation);}}
if(ms){start();if(!continuing)
this.$tabs.bind(this.options.event+'.tabs',stop);else
this.$tabs.bind(this.options.event+'.tabs',function(){stop();t=self.options.selected;start();});}
else{stop();this.$tabs.unbind(this.options.event+'.tabs',stop);}}});})(jQuery);(function($){$.widget("ui.progressbar",{_init:function(){var self=this,options=this.options;this.element.addClass("ui-progressbar"
+" ui-widget"
+" ui-widget-content"
+" ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});this.valueDiv=$('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);this._refreshValue();},destroy:function(){this.element.removeClass("ui-progressbar"
+" ui-widget"
+" ui-widget-content"
+" ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");this.valueDiv.remove();$.widget.prototype.destroy.apply(this,arguments);},value:function(newValue){arguments.length&&this._setData("value",newValue);return this._value();},_setData:function(key,value){switch(key){case'value':this.options.value=value;this._refreshValue();this._trigger('change',null,{});break;}
$.widget.prototype._setData.apply(this,arguments);},_value:function(){var val=this.options.value;if(val<this._valueMin())val=this._valueMin();if(val>this._valueMax())val=this._valueMax();return val;},_valueMin:function(){var valueMin=0;return valueMin;},_valueMax:function(){var valueMax=100;return valueMax;},_refreshValue:function(){var value=this.value();this.valueDiv[value==this._valueMax()?'addClass':'removeClass']("ui-corner-right");this.valueDiv.width(value+'%');this.element.attr("aria-valuenow",value);}});$.extend($.ui.progressbar,{version:"1.6rc5",defaults:{value:0}});})(jQuery);