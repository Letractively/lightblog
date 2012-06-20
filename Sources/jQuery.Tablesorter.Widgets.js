/*! tableSorter 2.3 widgets - updated 6/5/2012
 *
 * jQuery UI Theme
 * Column Styles
 * Column Filters
 * Sticky Header
 * Column Resizing
 * Save Sort
 *
 */
 
(function(a){
a.tablesorter.storage=function(n,l,f){var j,g,h=false,m={},c=n.id||a(".tablesorter").index(a(n)),b=window.location.pathname;try{h=!!(localStorage.getItem)}catch(i){}if(a.parseJSON){if(h){m=a.parseJSON(localStorage[l])||{}}else{g=document.cookie.split(/[;\s|=]/);j=a.inArray(l,g)+1;m=(j!==0)?a.parseJSON(g[j])||{}:{}}}if(f&&JSON&&JSON.hasOwnProperty("stringify")){if(m[b]&&m[b][c]){m[b][c]=f}else{if(m[b]){m[b][c]=f}else{m[b]={};m[b][c]=f}}if(h){localStorage[l]=JSON.stringify(m)}else{j=new Date();j.setTime(j.getTime()+(31536000000));document.cookie=l+"="+(JSON.stringify(m)).replace(/\"/g,'"')+"; expires="+j.toGMTString()+"; path=/"}}else{return(m&&m.hasOwnProperty(b)&&m[b].hasOwnProperty(c))?m[b][c]:{}}};
a.tablesorter.addWidget({id:"columns",format:function(v){var e,o,d,m,f,u,t,j,h,g,r=v.config,s=a(v).children("tbody:not(."+r.cssInfoBlock+")"),q=r.sortList,p=q.length,n=["primary","secondary","tertiary"];n=(r.widgetColumns&&r.widgetColumns.hasOwnProperty("css"))?r.widgetColumns.css||n:(r.widgetOptions&&r.widgetOptions.hasOwnProperty("columns"))?r.widgetOptions.columns||n:n;u=n.length-1;t=n.join(" ");if(r.debug){f=new Date()}for(h=0;h<s.length;h++){e=a(s[h]);o=e.addClass("tablesorter-hidden").children("tr");g=o.length;o.each(function(){m=a(this);if(this.style.display!=="none"){d=m.children().removeClass(t);if(q&&q[0]){d.eq(q[0][0]).addClass(n[0]);if(p>1){for(j=1;j<p;j++){d.eq(q[j][0]).addClass(n[j]||n[u])}}}}});e.removeClass("tablesorter-hidden")}if(r.debug){a.tablesorter.benchmark("Applying Columns widget",f)}}});
a.tablesorter.addWidget({id:"filter",format:function(K){if(!a(K).hasClass("hasFilters")){var G,F,E,C,f,w,Q,A,z,y,p,B,h,D,o,O,g,J,M=K.config,e=M.widgetOptions,u=e.filter_cssFilter||"tablesorter-filter",H=a(K).addClass("hasFilters"),N=H.children("tbody:not(."+M.cssInfoBlock+")"),s=M.parsers.length,m='<tr class="'+u+'">',P=/^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/,L=new RegExp(M.cssChildRow),n,q,d=function(){if(M.debug){n=new Date()}w=H.find("thead").eq(0).children("tr").find("select."+u+", input."+u).map(function(){return a(this).val()||""}).get();f=w.join("");for(E=0;E<N.length;E++){o=a(N[E]);O=o.addClass("tablesorter-hidden").children("tr");C=O.length;for(F=0;F<C;F++){if(L.test(O[F].className)){continue}if(f===""){O[F].style.display=""}else{A=true;h=O.eq(F).nextUntil("tr:not(."+M.cssChildRow+")");y=(h.length&&(e&&e.hasOwnProperty("filter_childRows")&&typeof e.filter_childRows!=="undefined"?e.filter_childRows:true))?h.text():"";g=O.eq(F).children("td");for(G=0;G<s;G++){p=a.trim(g.eq(G).text());B=e.filter_ignoreCase?p.toLocaleLowerCase():p;if(w[G]!==""){z=A;Q=e.filter_ignoreCase?w[G].toLocaleLowerCase():w[G];if(e.filter_functions&&e.filter_functions[G]){if(e.filter_functions[G]===true){z=e.filter_ignoreCase?Q===B:w[G]===p}else{if(typeof e.filter_functions[G]==="function"){z=e.filter_functions[G](p,M.cache[E].normalized[F][G],w[G],G)}else{if(typeof e.filter_functions[G][w[G]]==="function"){z=e.filter_functions[G][w[G]](p,M.cache[E].normalized[F][G],w[G],G)}}}}else{if(P.test(Q)){J=P.exec(Q);try{z=new RegExp(J[1],J[2]).test(B)}catch(b){z=false}}else{if(/[\"|\']$/.test(Q)&&B===Q.replace(/(\"|\')/g,"")){A=(A)?true:false}else{if(/[\?|\*]/.test(Q)){z=new RegExp(Q.replace(/\?/g,"\\S{1}").replace(/\*/g,"\\S*")).test(B)}else{p=(B+y).indexOf(Q);if((!e.filter_startsWith&&p>=0)||(e.filter_startsWith&&p===0)){A=(A)?true:false}else{A=false}}}}}A=(z)?(A?true:false):false}}O[F].style.display=(A?"":"none");if(h.length){h[A?"show":"hide"]()}}}o.removeClass("tablesorter-hidden")}if(M.debug){a.tablesorter.benchmark("Completed filter widget search",n)}H.trigger("applyWidgets")},I=function(b){var j,c=[];b=parseInt(b,10);j='<option value="">'+(a(M.headerList[b]).attr("data-placeholder")||"")+"</option>";for(E=0;E<N.length;E++){C=M.cache[E].row.length;for(F=0;F<C;F++){y=M.cache[E].row[F][0].cells[b];c.push(M.supportsTextContent?y.textContent:a(y).text())}}c=c.getUnique(true);for(E=0;E<c.length;E++){j+='<option value="'+c[E]+'">'+c[E]+"</option>"}H.find("thead").find("select."+u+'[data-col="'+b+'"]').append(j)};if(M.debug){n=new Date()}for(G=0;G<s;G++){D=(e.filter_functions&&e.filter_functions[G]&&typeof e.filter_functions[G]!=="function")||a(M.headerList[G]).hasClass("filter-select");m+="<td>";if(D){m+='<select data-col="'+G+'" class="'+u}else{m+='<input type="search" placeholder="'+(a(M.headerList[G]).attr("data-placeholder")||"")+'" data-col="'+G+'" class="'+u}if(a.tablesorter.getData){m+=a.tablesorter.getData(M.headerList[G],M.headers[G],"filter")==="false"?' disabled" disabled':'"'}else{m+=((M.headers[G]&&M.headers[G].hasOwnProperty("filter")&&M.headers[G].filter===false)||a(M.headerList[G]).hasClass("filter-false"))?' disabled" disabled':'"'}m+=(D?"></select>":">")+"</td>"}H.bind("addRows updateCell update appendCache",function(){d()}).find("thead").eq(0).append(m+="</tr>").find("input."+u).bind("keyup search",function(c,b){if((c.which<32&&c.which!==8)||(c.which>=37&&c.which<=40)){return}if(b===false){d();return}clearTimeout(q);q=setTimeout(function(){d()},e.filter_searchDelay||300)});if(e.filter_functions){for(G in e.filter_functions){y=a(M.headerList[G]);m="";if(typeof G==="string"&&e.filter_functions[G]===true&&!y.hasClass("filter-false")){I(G)}else{if(typeof G==="string"&&!y.hasClass("filter-false")){for(F in e.filter_functions[G]){if(typeof F==="string"){m+=m===""?"<option>"+(y.attr("data-placeholder")||"")+"</option>":"";m+="<option>"+F+"</option>"}}H.find("thead").find("select."+u+'[data-col="'+G+'"]').append(m)}}}}for(G=0;G<M.headerList.length;G++){y=a(M.headerList[G]);if(y.hasClass("filter-select")&&!y.hasClass("filter-false")&&!(e.filter_functions&&e.filter_functions[G]===true)){I(G)}}H.find("select."+u).bind("change",function(){d()});if(M.debug){a.tablesorter.benchmark("Applying Filter widget",n)}}}});
a.tablesorter.addWidget({id:"stickyHeaders",format:function(n){if(a(n).hasClass("hasStickyHeaders")){return}var m=a(n).addClass("hasStickyHeaders"),j=n.config.widgetOptions,g=a(window),e=a(n).children("thead"),d=e.children("tr:not(.sticky-false)").children(),f=j.stickyHeaders||"tablesorter-stickyHeader",c=".tablesorter-header-inner",h=d.eq(0),i=m.find("tfoot"),k=e.find("tr.tablesorter-header:not(.sticky-false)").clone().removeClass("tablesorter-header").addClass(f).css({width:e.outerWidth(true),position:"fixed",left:h.offset().left,margin:0,top:0,visibility:"hidden",zIndex:10}),l=k.children(),b="";m.bind("sortEnd",function(r,p){var q=a(p).find("thead tr"),o=q.filter("."+f).children();q.filter(":not(."+f+")").children().each(function(s){o.eq(s).attr("class",a(this).attr("class"))})}).bind("pagerComplete",function(){g.resize()});d.each(function(p){var o=a(this);l.eq(p).bind("mouseup",function(q){o.trigger(q,true)}).bind("mousedown",function(){this.onselectstart=function(){return false};return false}).find(c).width(o.find(c).width())});e.prepend(k);g.scroll(function(){var q=h.offset(),o=g.scrollTop(),r=m.height()-(h.height()+(i.height()||0)),p=(o>q.top)&&(o<q.top+r)?"visible":"hidden";k.css({left:q.left-g.scrollLeft(),visibility:p});if(p!==b){g.resize();b=p}}).resize(function(){var o=0;k.css({left:h.offset().left-g.scrollLeft(),width:e.outerWidth()}).each(function(p){a(this).css("top",o);o+=e.find("tr").eq(p).outerHeight()});l.find(c).each(function(p){a(this).width(d.eq(p).find(c).width())})})}});
a.tablesorter.addWidget({id:"resizable",format:function(k){if(a(k).hasClass("hasResizable")){return}a(k).addClass("hasResizable");var e,l,i=k.config,g=a(i.headerList).filter(":gt(0)"),f=0,d=null,b=null,h=function(){f=0;d=b=null;a(window).trigger("resize")};l=(a.tablesorter.storage)?a.tablesorter.storage(k,"tablesorter-resizable"):"";if(l){for(e in l){if(!isNaN(e)&&e<i.headerList.length){a(i.headerList[e]).width(l[e])}}}g.each(function(){a(this).append('<div class="tablesorter-resizer" style="cursor:w-resize;position:absolute;height:100%;width:20px;left:-20px;top:0;z-index:1;"></div>').wrapInner('<div style="position:relative;height:100%;width:100%"></div>')}).bind("mousemove",function(j){if(f===0||!d){return}var c=j.pageX-f;if(d.width()<-c||(b&&b.width()<=c)){return}b.width(b.width()+c);f=j.pageX}).bind("mouseup",function(){if(l&&a.tablesorter.storage&&d){l[b.index()]=b.width();a.tablesorter.storage(k,"tablesorter-resizable",l)}h();return false}).find(".tablesorter-resizer").bind("mousedown",function(c){d=a(c.target).closest("th");b=d.prev();f=c.pageX;return false});a(k).find("thead").bind("mouseup mouseleave",function(){h()})}});
a.tablesorter.addWidget({id:"saveSort",init:function(d,b,c){c.format(d,true)},format:function(e,g){var d,f,h=e.config,b={sortList:h.sortList};if(h.debug){f=new Date()}if(a(e).hasClass("hasSaveSort")){if(e.hasInitialized&&a.tablesorter.storage){a.tablesorter.storage(e,"tablesorter-savesort",b);if(h.debug){a.tablesorter.benchmark("saveSort widget: Saving last sort: "+h.sortList,f)}}}else{a(e).addClass("hasSaveSort");b="";if(a.tablesorter.storage){d=a.tablesorter.storage(e,"tablesorter-savesort");b=(d&&d.hasOwnProperty("sortList")&&a.isArray(d.sortList))?d.sortList:"";if(h.debug){a.tablesorter.benchmark("saveSort: Last sort loaded: "+b,f)}}if(g&&b&&b.length>0){h.sortList=b}else{if(e.hasInitialized&&b&&b.length>0){a(e).trigger("sorton",[b])}}}}})
})(jQuery);
Array.prototype.getUnique=function(g){var k,d=[],h={},f,e=0,b=this.length;for(f=0;f<b;++f){k=this[f];if(!h[k]){h[k]={};d[e++]=k}}return(g)?d.sort():d};