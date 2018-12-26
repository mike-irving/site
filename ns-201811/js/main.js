/**@preserve
 * 
 * Nissan 美好在這禮 main.js
 * 
 * @version 20181129
 * 
 */

var main = window.main || {};


// --------------------------------------------
// Layout & utilities
// --------------------------------------------

// console for <= IE8
;(function(){for(var a,e=function(){},b="assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeline timelineEnd timeStamp trace warn".split(" "),c=b.length,d=window.console=window.console||{};c--;)a=b[c],d[a]||(d[a]=e)})();

// Enable FastClick
if('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
}

/** Device detection & helper class
 */
main.ua = navigator.userAgent.toLowerCase();
main.IE = (navigator.appName == 'Microsoft Internet Explorer'&&/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)!=null)?parseFloat(RegExp.$1):99; // IE6~10 detection, non-IE browser gets 99
if(main.IE <= 9) document.documentElement.className += ' lte-ie9';
if(main.IE <= 8) document.documentElement.className += ' lte-ie8';
main.is_m = (function(){
	var ua = navigator.userAgent||navigator.vendor||window.opera;
	return window.mobi || /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4));
})();
document.documentElement.className += (main.is_m?' mobile':' no-mobile');

main.hasTouchEvent = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
document.documentElement.className += (main.hasTouchEvent?' touchevent':' no-touchevent');

document.documentElement.className += (!('opacity' in document.body.style)?' no-opacity':'');


/** Prompt webview user
 */
// For mobile (tablet) app user (showing warn bar and using manual login flow )
//main.isWebviewUser = Device.line /*|| Device.iosMessenger*/ || Device.iosChrome;
/*
if(isWebviewUser) {
	document.getElementById('webviewWarnBar').innerHTML = '<nobr><i>!</i>建議使用' +(Device.ios?'Safari':Device.android?'Chrome':'手機內建')+ '瀏覽器重新開啟</nobr> <nobr>以利活動參與</nobr>';
	document.getElementById('webviewWarnBar').style.display = 'block';
}
*/

/** Dimension helpers
 */
main.getPageY = function() {
	// Most browser has pageYOffset except IE-
	// to support legacy IEs in qurickmode or wrong doctype
	return window.pageYOffset || ((('clientHeight' in document.documentElement))?document.documentElement:document.body).scrollTop;
};

main.getWinH = function() {
	var h = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||$(window).height();
	// Try to fix iOS new facebook app webview wrong body height @20170807
	/*if(main.is_m && /iphone|ipod|ipad/.test(main.ua) && (/messengerforios/.test(main.ua) || /fban|fbav/.test(main.ua))) {
		h -= 108;
	}*/
	return h;
};

main.getWinW = function() {
	return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||$(window).width();
};

main.getBodyH = function(){
	var h = Math.max(400, main.getWinH()
						    //- $('#header').outerHeight()
							//- parseFloat( $('.mastbody-inner').css('padding-top'))
							//- parseFloat( $('.mastbody-inner').css('padding-bottom'))
							//- parseFloat( $('.mastbody-inner').css('margin-top'))
							//- parseFloat( $('.mastbody-inner').css('margin-bottom'))
					);
	return h;
};

main.getHeaderH = function() {
	return main.isHeaderLayout('pc')?85:48;
};

main.getURLParam = function(name, url) {
	var search = !!url ? url.substr(url.lastIndexOf('?')) : location.search;
	return ( RegExp(name + '=' + '([^&;]+?)(&|#|;|$)').exec( search )||[,null] )[1];
};

main.emptyURLParam = function(value, url) {
	// @require history.replaceState support
	var u = url||location.href, u2;
	if(!RegExp(value).test(u) || !/=/.test(u) || typeof history.replaceState == 'undefined') {
		return;
	}
	u2 = u.replace(value, value.split('=')[0]+'=');
	history.replaceState({}, document.title, u2);
};

main.openShareWin = function(url, target) {
	var left = parseInt((window.screen.availWidth - 550) / 2),
		top = parseInt((window.screen.availHeight - 420) / 2 * .6);
	return window.open(url, target, 'width=550,height=420,left='+left+',top='+top/*+',location=yes,resizable=yes,scrollbars=yes,dependent=yes'*/);
};

function getYoutubeVid(url) {
	var re = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
	var match = url.match(re);
	return (match&&match[1].length==11)? match[1] : false;
};

/**
 * Google Analytics wrapper
 * @version 20151102
 * ex:  <a data-ev="product,watercolor,watercolor">...</a>
 */
var gatracking = {
	debug: false,
	pv: function(page) {
		gatracking.debug && console.log('GA pv=> ', page);
		if(!window.ga || !page) return;
		//ga('send', 'pageview', page);
	},
	ev: function(category, action, label) {
		gatracking.debug && console.log('GA ev=> ', category, action, label);
		if(!window.ga || !category) return;
		//ga('send', 'event', category, action||'click', label||category);
	}
};




/** Disable dragging of a ghost image
 */
$.fn.undraggable = function() {
	return this.each(function(){
		$(this).attr('draggable', false).css('user-select','none');
	});
};
$(function(){
	$('img').undraggable();
});

/** Avoid touchmove event propagating from scrollable child (overflow:scroll) to window.
 * Support touch device only
 * and can't be tested on Chrome developer simulator.
 * 
 * @see https://github.com/lazd/iNoBounce
 * @version 20160609
 */
$.fn.blockTouchmovePropagation = function(exclude) {
	return this.each(function(){
		this.wonb = {};
		$(this)
			.off('touchstart.wonb touchmove.wonb')
			.on('touchstart.wonb', function(e) {
				this.wonb.startY = e.originalEvent.touches ? e.originalEvent.touches[0].screenY : e.originalEvent.screenY;
			})
			.on('touchmove.wonb', function(e) {
				if(exclude!=undefined && $(exclude).find(e.target)[0]) {
					return true;
				}
				if( this.scrollHeight > this.offsetHeight ) {
					this.wonb.currY = e.originalEvent.touches ? e.originalEvent.touches[0].screenY : e.originalEvent.screenY;
					this.wonb.atTop = (this.wonb.startY <= this.wonb.currY && this.scrollTop === 0);
					this.wonb.atBottom = (this.wonb.startY >= this.wonb.currY && this.scrollHeight - this.scrollTop === /*this.offsetHeight*/$(this).innerHeight());
	
					if(this.wonb.atTop || this.wonb.atBottom) { e.preventDefault(); }
				}
				else { e.preventDefault(); }
			});
	});
};

$.fn.getPageInview = function() {
	var dist = [], thres = main.getWinH()*.9, target;
	
	this.each(function(){
		dist.push({
			el: $(this),
			value: Math.abs($(this).offset().top - main.getPageY())
		});
	});
	dist.sort(function(a,b){
		if (a.value < b.value) return -1; if (a.value > b.value) return 1; return 0;
	});
	/*
	if(dist[0].value < thres) {
		target = dist[0].el;	
	} else {
		target = null;
	}*/
	target = dist[0].el;	
	return target;
};

main.scrollTo = (function(anchor) {
	function _init() {
		$(document).on('click', '[data-scrollTo]', function(e) {
			scrollTo( $(this).attr( 'href') );
			e.preventDefault();
		});
	}
	function scrollTo(target, opts) {
		// Backtop
		if(target == '#') {
			$.scrollTo(0, {axis:'y', duration: 366, easing:'easeInOutCirc' });
			return;
		}
		
		// Scroll to element
		var el = $(target);
		if(!el[0]) return;
		
		var dist = Math.abs(el.offset().top - main.getPageY()),
			opts = $.extend({
						offset: -1 * main.getHeaderH(),
						duration: Math.round(Math.max( 500, dist*.3 ))
					}, opts||{});
		
		// @20170926 Chrome 61 body doesn't scroll
		// https://stackoverflow.com/questions/45061901/chrome-61-body-doesnt-scroll
		// Solved by change jquery scrollTo plugins version to 2.1.2
		$.scrollTo(el, {
			offset: opts.offset,
			axis: 'y',
			duration: opts.duration,
			easing:'easeInOutQuad'
		});
	};
	$(_init);
	return scrollTo;
})();

/**
 * Header layout helper
 */
main.isHeaderLayout = (function(state) {
	function _init(){
		$(window).on('resize orientationchange load', _update);
		_update();
		setTimeout(_update, 31);
	}
	function _update() {
		if(main.getWinW()<=960 && !check('mb')) {
			$('html').removeClass('header-pc').addClass('header-mb');
			$(window).trigger('headerLayout', ['mb']);
		}
		if(main.getWinW()>960 && check('mb')) {
			$('html').removeClass('header-mb').addClass('header-pc');
			$(window).trigger('headerLayout', ['pc']);
		}
	}
	function check(state) {
		return $('html').hasClass('header-'+state);
	}
	$(_init);
	return check;
})();

/**
 * Fixed header
 */
main.updateHeaderState = (function() {
	function _init(){
		$(window).on('scroll resize orientationchange load touchmove', update);
		update();
		setTimeout(update, 31);
	}
	function update() {
		if(!$('#header')[0]) return;
		var thres = main.getHeaderH(),
			y = main.getPageY();
		$('html').toggleClass('header-fixed', y >= thres);
		$('html').toggleClass('leave-top', y >= main.getWinH()*.5 );
	}
	$(_init);
	return update;
})();

main.updateBodyH = (function() {
	function _init() {
		$(window).on('resize.updateBodyH orientationchange load', update);
		$('body').imagesLoaded(update);
		setTimeout(update,1111);
		update();
	}
	function update() {
		var h = main.getBodyH();
		$('#wrap').css('min-height', h);
	}
	$(_init);
	return update;
})();

/**
 * Update responsive image
 */
/*
main.updateRespImg = (function() {
	function _init(){
		$(window).on('resize orientationchange', update);
		update();
		setTimeout(update, 31);
	}
	function update() {
		$('[data-respimg]').each(function(){
			var curr = $(this).attr('src'),
				base = $(this).attr('data-respimg'),
				s_pc = base,
				s_mb = base.substr(0, base.lastIndexOf('.')) + '-m' + base.substr(base.lastIndexOf('.'));
			
			if(base != '' && main.getWinW()<=640 && curr != s_mb) {
				$(this).attr('src', s_mb);
			}
			else if(base != '' && main.getWinW()>640 && curr != s_pc) {
				$(this).attr('src', s_pc);
			}
		});
	}
	$(_init);
	return update;
})();
*/

main.resizeWith = (function(fn){
	var fns = [];
	function _init() {
		$(window).on('resize orientationchange', _render);
		_render();
		setTimeout(_render, 11);
		setTimeout(_render, 1111);
	}
	function _render(fn) {
		$.each(fns, function(index, fn){
			fn();
		});
	}
	function resizeWith(fn) {
		if($.isFunction(fn)) {
			fns.push(fn);
		}
	}
	$(_init);
	return resizeWith;
})();

main.scrollWith = (function(fn){
	var fns = [];
	function _init() {
		$(window).on('scroll resize orientationchange touchmove touchstart', _render);
		_render();
		setTimeout(_render, 11);
		setTimeout(_render, 1111);
	}
	function _render(fn) {
		$.each(fns, function(index, fn){
			fn();
		});
	}
	function scrollWith(fn) {
		if($.isFunction(fn)) {
			fns.push(fn);
		}
	}
	$(_init);
	return scrollWith;
})();

$.fn.mid = function(limit){
	var py = main.getPageY(),
		ph = main.getWinH(),
		h = this.height(),
		t = this.offset().top,
		d;
	
	d = ((t + h) - py)/(ph + h)*limit*2 - limit;
	d = Math.round(d*1000)*.001;
	d = Math.max(-1*limit,Math.min(limit,d));
	return d;
};

$.fn.isInView = function(){
	if(!$(this)[0]) { return false; } //@20181124
	var py = main.getPageY(),
		ph = main.getWinH(),
		//sect = $(this.filter('.sect')[0] || this.parents('.sect')[0]),
		sect = $(this), // @20180225 
		t = sect.offset().top,
		h = sect.height();
	return (py > t - ph && py < t + h);
};

/** Popout lightbox
 * by binding on <a data-popout href="#idname"></a>
 *
 * @version 20181123
 * @param type: 'inline' | 'ajax'
 * @param target: element id
 */
main.popout = (function(){
	var tpl = 	'<div id="popoutLoading"></div>'+
				'<div id="popout" class="popout">'+
					'<div class="popout-overlay"></div>'+
					'<div class="popout-inner">'+
						//'<div class="popout-closebar"><div class="popout-close" data-closepopout><span><i></i><b></b></span></div></div>'+
						'<div class="popout-content"></div>'+
					'</div>'+
				'</div>',
		popoutContainer,
		afterClose,
		pageY;
		
		
	function init() {
		$(tpl).appendTo('body');
	
		popoutContainer = $('#popout .popout-content');
		
		$(document).on('click', '[data-closepopout]', function(){
			close();
		});
		$(document).on('keydown.closepopout', function(e){
			if(e.keyCode == 27) { close(); }
		});
		$('#popout').blockTouchmovePropagation(); 
	}
	
	function open(opts) {
		var opts = opts || {};
		if(opts.type == undefined || opts.target==undefined) { return; }
	
	
		if(main.popout.isOpen()) {
			//console.log('immediately close popout #'+ $('#popout .popout-content').children().attr('id'));
			close({
				duration: 0,
				afterClose: function(){
					open(opts);
				}
			});
			return;
		}
		
		$('#popout').removeClass().addClass('popout ' + (opts.classes || '')); // @modified 20170721
		
		// @added 20171126
		$('#popout').off('click.closepopout').on('click.closepopout', function(e){
			if(opts.clickClose == true) {
				//console.log(e.target);
				if(!$(opts.target).is(e.target) && $(opts.target).find(e.target).length==0) {
					close();
				}
			}
		});
		
		afterClose = opts.afterClose;
		
		// pause any page animation
		// ...
		
		// Fix body scroll-to-top issue
		pageY = main.getPageY();
		$('#wrap').css('margin-top', -pageY);
		
		switch(opts.type) {
			case 'inline':
				if(!$(opts.target)[0]) {
					close();
					return true;
				}
				$('#popout').addClass('type-inline');
				$(opts.target).after('<div id="'+ opts.target.replace('#','') +'-placeholder"></div>');
				$(opts.target)./*clone().*/css('display','block').appendTo(popoutContainer);
				show();
				break;
			
			
			case 'ajax':
				$('#popout').addClass('type-ajax');
				$('#popoutLoading').show();
				popoutContainer
					.load( opts.target +' #popout-ajaxContent', function(response, status, xhr) {
						//console.log(response, xhr, status);
						if(status == 'error') {
							close();
						}
						else {
							show();
						}
						$('#popoutLoading').hide();
					});
				break;
			
			
			case 'iframe':
				$('#popout').addClass('type-iframe');
				$('#popoutLoading').show();
				$('<iframe class="popout-iframe" vspace="0" hspace="0" src="'+ opts.target
				  +'" frameborder="0" scrolling="auto" allowtransparency="true" style="width:100%;height:100%"></iframe>')
					.appendTo(popoutContainer)
					.load(function(){
						$('#popoutLoading').hide();
					})
				show();
				break;
		}
		function show() {
			$('html').addClass('popout-open');
			
			popoutContainer.fadeTo(0,0);
			$('#popout').show();
			popoutContainer.delay(100).fadeTo(main.is_m?0:200, 1, function() { 
				$('#popout').scrollTop(0);
			});
			
			popoutContainer.add('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">').imagesLoaded(position);
			setTimeout(position, 100);
			
			
			!!$.isFunction(opts.afterOpen) && opts.afterOpen();
			//console.log('popout '+ opts.target + ' afterOpen');
		}
	}
	
	function position() {
		var h = Math.max(main.is_m?0:50, (main.getWinH() - popoutContainer.height())*.5);
		popoutContainer.css('padding-top', h).css('padding-bottom', h);
	}
	
	function close(opts) {
		
		var opts = opts || {};
		
		$('#popout').fadeOut(opts.duration==undefined?0:opts.duration, function(){
			
			if($('#popout').hasClass('type-inline')) {
				var target = popoutContainer.children();
				target.css('display','none');
				target.insertBefore('#'+target[0].id+'-placeholder');
				$('#'+target[0].id+'-placeholder').remove();
			}
			
			//$('#popout, #popoutLoading').remove();
			popoutContainer.empty();
			
			$('html').removeClass('popout-open');
			
			// Fix body scroll-to-top issue
			$('#wrap').css('margin-top', '');
			$('html, body').scrollTop(pageY);
			
			
			// Resume any page animation
			// ...
			
			// Update page
			//Main.scrollingWith();
			
			//console.log('afterClose',afterClose);
			$.isFunction(afterClose) && afterClose();
			afterClose = null;
			$.isFunction(opts.afterClose) && opts.afterClose();
		});
		$('#popoutLoading').hide();
	}

	$(init);
	return {
		open: open, close: close, position: position,
		isOpen: function() {
			return $('html').hasClass('popout-open');
		}
	}
})();

/**
 * Navbar
 * @version 20170614
 */
main.nav = (function(){
	var menu, overlay, toggle;
	
	function _init() {
		menu = $('#navMenu');
		if(!menu[0]) return;
		
		overlay = $('#navOverlay');
		toggle = $('#navToggle');
		
		$('.btn', menu).not('[href^="ja"], [href="#"]').on('click', function(){
			close();
		});
		
		
		// Responsive update
		// ----------------------------------------------
		
		$(window).on('headerLayout', function(e, state){
			$('.mainitem', menu).removeClass('active');
			if(state == 'pc') {
				close();
			}
		});
		
		// Handle menu toggle (mb)
		// ----------------------------------------------
		menu.blockTouchmovePropagation();
		overlay.blockTouchmovePropagation();
		overlay.on('click', function(){
			close();
		});
		toggle.on('click', function(){
			toggleOpen();
		});
		
		
		// Submenu
		// ----------------------------------------------
		$('.btn[data-submenu]', menu).on('click', function(e){
			var o = $(this);
			o.toggleClass('on');
			o.next('.submenu').slideToggle(200,'easeOutQuart');
			
			
			// Click anywhere to close submenu
			if(main.isHeaderLayout('pc') && o.hasClass('on')) {
				e.stopPropagation();
				$(document).off('click.sm').one('click.sm', function(){
					o.trigger('click');
				});
			}
		});
	}
	
	
	// ----------------------------------------------
	function toggleOpen() {
		if(!isOpen()) {
			open();
		} else {
			close();
		}
	}
	function open() {
		if(isOpen()) { return; }
		
		menu.removeClass('out').addClass('in');
		overlay.removeClass('out').addClass('in');
		$('html').addClass('nav-open');
		
		//setTimeout(function(){ menu.scrollTop(0); }, 30);
	}
	function close() {
		if(!isOpen()) { return; }
		
		menu.removeClass('in').addClass('out');
		overlay.removeClass('in').addClass('out');
		
		$('html').removeClass('nav-open');
		setTimeout(function(){
			menu.removeClass('out');
			overlay.removeClass('out');
		}, 400);
	}
	function isOpen() {
		return $('html').hasClass('nav-open');
	}
	
	
	$(_init);
	return {
		toggle: toggle, open: open, close: close, isOpen: isOpen
	}
})();


main.initBacktop = function() {
	main.scrollWith(function(){
		var y = main.getPageY() + main.getWinH()/* - $('#footer').height() - $('#backtop').height()*/,
			threshold = $('#footer').offset().top;
		//console.log(y, threshold);
		$('#backtop').toggleClass('fixed-bottom', y >= threshold);
	});
};











// --------------------------------------------
// Section control
// @version 20170918 @modified for media remarketing code causing fail on first time hashchange 
// --------------------------------------------
	
	main.sectCtrl = {};
	main.sectCtrl.id = null;
	main.sectCtrl.menu = { top: 'top', offer: 'offer', gift: 'gift', drive: 'drive' };
	main.sectCtrl.visited = { top: 0, offer: 0, gift: 0, drive: 0 };
	
	main.sectCtrl.init = function() {
		$(window).hashchange(main.sectCtrl.onHashChange);
		main.sectCtrl.onHashChange();
		
		$(window).on('scroll touchend touchmove orientationchange resize', main.sectCtrl.onScrollPage);
		setTimeout(main.sectCtrl.onScrollPage,111);
	};
	
	main.sectCtrl.onHashChange = function(e) { // hashchange event
		var a = location.hash, re = new RegExp('^#\/(' + $.map(main.sectCtrl.menu, function(v,i){return [v];}).join('|') + ')$');
		//console.log('onHashChange() =>', a);
		if(re.test(a)) {
			main.sectCtrl.gotoPage(main.sectCtrl.menu[a.replace('#/','')]);
		} else if(a=='' || a=='#/' || a=='#') {
			main.sectCtrl.gotoPage('top');
		}
	};
	
	main.sectCtrl.setHash = function(id) { //for button usage
		location.hash = '#/'+main.sectCtrl.menu[id];
	};
	
	main.sectCtrl.gotoPage = function(id, force) { // internal usage
		if(main.sectCtrl.id == id && !force) { return; }
		
		!!main.isLocal && console.log('gotoPage id=>', id);
		
		//main.scrollTo('#'+id);
		main.normalizeScrollTo(id);
	};
	
	main.sectCtrl.onScrollPage = function() {
		var id = $('#'+$.map(main.sectCtrl.menu, function(v,i){return [v];}).join(',#')).getPageInview().attr('id');
		if(id != main.sectCtrl.id) {
			main.sectCtrl.setActivePage(id);
		}
	};
	
	
	main.sectCtrl.setActivePage = function(id) {
		main.sectCtrl.id = id;
		//console.log('\t\t\tsetActivePage id=>', id);
		
		var btn = $('#navMenu .list .btn[href="#/' + main.sectCtrl.menu[id] + '"]');
		btn.addClass('on');
		$('#navMenu .list .btn').not(btn).removeClass('on');
		
		main.sectCtrl.setHash(id);
		main.sectCtrl.readPage(id);
		
		if( main.sectCtrl.visited[id] == 0) {
			main.sectCtrl.visited[id] = 1;
		}
	};
	main.sectCtrl.readPage = function(id) {
		if(main.sectCtrl.id == id) {
			
			// Pageview tracking
			!!window.readPageId && clearTimeout(window.readPageId);
			window.readPageId = setTimeout(function() {
				var btn = $('#navMenu .list .btn[href="#/' + main.sectCtrl.menu[id] + '"]'),
					v = btn.find('img').attr('alt') || btn.find('b').text();
				!!v && gatracking.pv(v);
				//console.log('readPage', id);
			}, 1800);
			
			//console.log('main.sectCtrl.readPage id=>', id);
			
			// xxxxx (replayable)
			/*
			if(id == 'top' && main.sectCtrl.visited.top == 1 && !xxxxAnim.isActive()) {
				TweenMax.fromTo('#topWhite', .7, {autoAlpha:0}, {autoAlpha:1, onComplete:function(){
					xxxxAnim.play(0);
				}});
				log('readPage xxxxx replay');
			};
			*/
			
			// top
			if(id == 'top' && /*main.sectCtrl.visited.top == 0 &&*/ !$('html').hasClass('loading') && !main.is_m) {
				//main.topAnim.play();
			}
			// offer
			if(id == 'offer' && main.sectCtrl.visited.offer == 0 && !main.is_m) {
			}
			// drive
			if(id == 'drive' && main.sectCtrl.visited.drive == 0 && !main.is_m) {
			}
			
			// xxxx (menu btn on)
			/*
			if(id == 'xxxx' && $('#chaMenu .btn[data-cha="F"]').hasClass('on')) {
				chaTxtFAnim.play();
			}*/
			
			// #xxxx (pc only)
			/*
			if(id == 'xxxx' && !main.is_m && main.sectCtrl.visited.xxxx == 0) {
			}*/
		}
	}












// --------------------------------------------
// Site content
// --------------------------------------------

main.isLocal = /file:/.test(location.protocol) || /wowface/.test(location.host);


main.init = function() { 
	
	main.initBacktop();
	
	main.sectCtrl.init();
	
	// Load and start site
	main.loadSite();
	
	// Buttons & links event listeners
	main.addBtnListeners();
	
	// Initialize section animation
	main.initAnimations();
	
	if(!main.is_m) {
		/*main.resizeWith(function(){
			main.setTopHeight();
		});*/
	} else {
		//main.setTopHeight();
	}
};

main.loadSite = function() {
	var intv, imgLoaded = false, hold = 66;//666
	
	$('body').imagesLoaded(function(){
		imgLoaded = true;
		//console.log('HTML images loaded!');
	});
	checkLoaded();
	setTimeout(function(){ //防呆
		imgLoaded = true;
		//checkLoaded(); //buggy line
	}, 15000);
	
	function checkLoaded() { // Check all assets loaded
		clearTimeout(intv);
		if(/*other assets loaded... && */imgLoaded) {
			setTimeout(main.startSite, hold);
		} else {
			intv = setTimeout(checkLoaded, 31);
		}
	}
};

main.startSite = function() {
	if(!$('html').hasClass('loading')) return;
	$('html').removeClass('loading');
	
	!!main.isLocal && console.log('main.startSite');
	
	// Make top section full height
	/*
	if(main.is_m) {
		$('#top').css('height', main.getWinH() - (main.isHeaderLayout('pc')?60:48));
	}*/
	
	$('#loader').remove();
	
	main.topAnim.play();
	
	//console.log('main.startSite main.sectCtrl.id=>', main.sectCtrl.id);
	
	$(document).trigger('startSite');
};

main.normalizeScrollTo = function(s) {
	if(!main.is_m) {
		switch(s) {
			case 'offer':
			case 'gift':
			case 'drive':
				main.scrollTo('#'+s, {offset: 0}); 
				break;
			default:
				main.scrollTo('#'+s);
				break;
		}
	} else {
		switch(s) {
			case 'offer':
				main.scrollTo('#'+s/*, {offset: -main.getWinW()*.2}*/); 
				break;
			default:
				main.scrollTo('#'+s);
				break;
		}
	}
};

main.addBtnListeners = function() {
	
	// Nav menu
	$(document).on('click', '#navMenu [href^="#/"]', function(e){
		var s = $(this).attr('href').replace('#/','');
		main.normalizeScrollTo(s);
		e.preventDefault();
		gatracking.ev('[主選單]'+$(this).find('b').text());
	});
	
	// FB分享
	$(document).on('click', '.btn-fb, .btn-share', function(e){
		var url = $('[property="og:url"]').attr('content');
		main.openShareWin( 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), 'Share');
		gatracking.ev('[按鈕]FB分享');
		e.preventDefault();
	});
	
	// Other buttons
	$(document).on('click', '#rules .btn-toggle', function(e){
		$('#rules .list li.shy').removeClass('shy');
		$(this).hide();
	});
	
	$(document).on('click', '[data-youtube]', function(e){
		var vid = getYoutubeVid($(this).attr('href'));
		main.playVideo(vid);
		e.preventDefault();
	});
	
	$(document).on('click', '[data-gift]', function(e){
		var id = $(this).attr('data-gift');
		main.openGift(id);
		e.preventDefault();
	});
	
	$(document).on('click', '#ph .menu .btn', function(e){
		var id = $(this).attr('href');
		$(this).addClass('on').siblings().removeClass('on');
		$(id).fadeIn(555).siblings('.page').hide();
		e.preventDefault();
	});
};
	
main.openGift = function(id) {
	main.popout.open({
		target: '#'+id, type: 'inline', classes: 'fullpage popout-'+id,
		afterOpen: function() {},
		afterClose: function() {}
	});
};


// --------------------------------------------
// Section content
// --------------------------------------------

main.setTopHeight = function(){
	var h;
	if(!main.is_m) {
		//h = Math.min(740, Math.max(550, main.getWinH() - main.getHeaderH()));
	} else {
		h = main.getWinH() - main.getHeaderH();
		//$('#top').height(h);
		/*
		var real_h = $('#top').height();
		if(real_h > h) {
			$('#top .scroll').css('bottom', real_h - h + 10);
		}*/
	}
};


main.topAnim = new TimelineMax({paused:true});

main.initAnimations = function() {
	
	if(!main.is_m) {
	
		// -----------------
		// #top
		// -----------------
		main.topAnim
			.add([
				TweenMax.to('#top .whiteout', 1, {delay:0, autoAlpha:0, ease:Power1.easeInOut}),
				TweenMax.from('#top .kv', 1.2, {scale:1.5, x:500,y:-50, alpha:.2, transformOrigin:'10% 15%', ease:Cubic.easeInOut}),

				TweenMax.from('#top .title', .7, {delay:.5, x: -70, autoAlpha:0, ease:Power2.easeOut}),
				TweenMax.from('#top .descr', .7, {delay:.7, x: -70, autoAlpha:0, ease:Power2.easeOut}),
				TweenMax.from('#top .video', .7, {delay:.85, x:-70, autoAlpha:0, ease:Power2.easeOut}),
				//TweenMax.from('#top .scroll', .5, {delay:1, y: -10, autoAlpha:0, ease:Power2.easeOut}),
				
				TweenMax.staggerFrom(['#top .s','#top .k','#top .x','#top .ph','#top .zw'], .75,
									 {delay:1, scale:.4, transformOrigin:'50% 100%', ease:Elastic.easeOut,
									  onStart:function(){$(this.target).css('visibility','visible');}}, .12)
			], '+=.3');/*
			.call(function(){
				TweenMax.to('#top .scroll', .6, {alpha:0,ease:Power1.easeInOut,yoyo:true,repeat:-1, repeatDelay:.5});
			});*/
		
		// -----------------
		// #gift
		// -----------------
		main.scrollWith(function(){
			if($('#gift1 .descr:not(.playdone)').isInView()) {
				$('#gift1 .descr').addClass('playdone');
				TweenMax.staggerFrom('#gift1 .text > *', .6, {delay:.5, y:30, autoAlpha:0, ease:Power2.easeOut}, .2);
			}
			if($('#gift2 .descr:not(.playdone)').isInView()) {
				$('#gift2 .descr').addClass('playdone');
				TweenMax.staggerFrom('#gift2 .text > *', .6, {delay:.3, y:30, autoAlpha:0, ease:Power2.easeOut}, .2);
			}
		});
		
		// -----------------
		// #offer
		// -----------------
		main.scrollWith(function(){
			if($('#offer .talent:not(.playdone)').isInView()) {
				$('#offer .talent').addClass('playdone');
				new TimelineMax()
					.add([
						TweenMax.staggerFrom('#offer .title, #offer .item.n1, #offer .item.n2', .5, {x:-100, autoAlpha:0, ease:Power2.easeOut, clearProps:'opacity,transform'}, .2),
						TweenMax.staggerFrom('#offer .item.n3, #offer .item.n4', .5, {delay:.8, x:100, autoAlpha:0, ease:Power2.easeOut, clearProps:'opacity,transform'}, .2)
					], '+=.5')
					.from('#offer .bubble', .6, {scale:0, transformOrigin:'100% 100%', onStart:function(){$(this.target).css('visibility','visible');}, ease:Back.easeOut}, '-=.3');
			}
			var mid = $('#offer .talent').mid(1);
			TweenMax.to('#offer .talent', .6, {y:mid*-80, ease:Power1.easeOut});
		});
		
		
		// -----------------
		// #drive
		// -----------------
		main.scrollWith(function(){
			if($('#drive .cars:not(.playdone)').isInView()) {
				$('#drive .cars').addClass('playdone');
				new TimelineMax().add([
					TweenMax.from('#drive .k', .4, {x:-200, ease:Cubic.easeOut,  onStart:function(){$(this.target).css('visibility','visible');}}),
					TweenMax.staggerFrom(['#drive .x', '#drive .s', '#drive .t'], .5, {scale:0, x:200, y:20, ease:Power2.easeOut,  onStart:function(){$(this.target).css('visibility','visible');}}, .1)
				], '+=.5');
			}
		});
	}
	else {
		// -----------------
		// #top
		// -----------------
		main.topAnim
			.add([
				TweenMax.to('#top .whiteout', 1, {autoAlpha:0, ease:Power1.easeInOut})
			], '+=.3')
			.add([
				//TweenMax.from('#top .title', .5, {y: 30, autoAlpha:0, ease:Power2.easeOut}),
				TweenMax.from('#top .descr', .5,  { delay:0, y: 30, autoAlpha:0, ease:Power2.easeOut}),
				TweenMax.from('#top .video', .5,  {delay:.2, y: 30, autoAlpha:0, ease:Power2.easeOut})
				//TweenMax.from('#top .scroll', .5, {delay:.4, y: -10, autoAlpha:0, ease:Power2.easeOut})
			], '-=.5')
			.call(function(){
				TweenMax.to('#top .scroll', .6, {alpha:0,ease:Power1.easeInOut,yoyo:true,repeat:-1, repeatDelay:.5});
			});
	}
};



main.playVideo = function(vid) {
	main.popout.open({
		target: '#playerBox', type: 'inline', /*classes: 'fullpage',*/
		afterOpen: function() {
			var u = 'https://www.youtube.com/embed/' + vid + '?rel=0&showinfo=0&autoplay=1&controls=1';
			$('#playerBox .player').append('<iframe width="1072" height="578" src="' + u + '" frameborder="0" allowfullscreen></iframe>');
		},
		afterClose: function() {
			$('#playerBox .player iframe').attr('src', 'about:blank').remove();
		}
	});
}

// --------------------------------------------

$(main.init);

