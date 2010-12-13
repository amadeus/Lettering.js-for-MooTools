/*
---
description:
	Lettering.js for MooTools
	Ported from the jQuery plugin Lettering.js
	https://github.com/davatron5000/Lettering.js
	http://daverupert.com

license:
	WTFPL license
	http://sam.zoy.org/wtfpl/

authors:
	- Dave Rupert
	- Amadeus Demarzi (http://amadeusamade.us)

requires:
	core/1.3: [Core/Element, Core/Array]

provides: [Element.lettering]
...
*/

(function(){

var injector = function(t, splitter, klass, after){
	var a = t.get('text').split(splitter), inject = '';

	if (!a.length) return;

	a.each(function(item, i) {
		inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after;
	});

	t.set('html', inject);
};

var methods = {
	init: function() {
		return injector(this, '', 'char', '');
	},

	words: function() {
		return injector(this, ' ', 'word', ' ');
	},

	lines : function() {
		return injector(this, /<br[^>]*>/gi, 'line', '');
	},

	custom: function(options) {
		options = options || {};
		return injector(this, options.split || '', 'group', options.after || '');
	}
};

Element.implement('lettering', function(method, options){
	if (method && methods[method])
		methods[method].apply(this, Array.from(options));
	else if (method === 'letters' || !method )
		methods.init.apply(this);

	return this;
});

})();