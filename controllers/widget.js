var args = $.args;
var childrenReady = false;

init($.args);
function init(args) {
	var exclude = ['id', 'children', 'DEBUG', 'paddingBottom'];
	$.container.applyProperties(_.omit(args, exclude));
	
	args.children && _.each(args.children, function(child) {
		$.container.add(child);
	});
}

exports.unload = function() {
	args.children = null;
};

// function containerReady(e) {
// 	args.DEBUG && Ti.API.info("com.imobicloud.bottomsheet: containerReady");
// 	this.removeEventListener('postlayout', containerReady);
// 	$.container.visible = false;
// 	$.container.height = '100%';
// }

/*
params = {
	actions: [{ icon: '', title: '', divider: false }],
	title: 'Select type',
	onClick: function(e) { e.index }
}
*/
exports.show = function(params) {
	args.DEBUG && Ti.API.info("com.imobicloud.bottomsheet: show " + JSON.stringify( params ));

	if (params.actions) {
		if (args.children) {
			$.container.remove(args.children);
			args.children = null;
			childrenReady = false;
		}
		
		var wrapper = $.UI.create('ScrollView', { classes: 'wrapper' });
			wrapper.addEventListener('postlayout', wrapperReady);

		if (params.title) {
			wrapper.add( $.UI.create('Label', { classes: 'title', text: params.title }) );
		} else {
			wrapper.add( $.UI.create('View', { classes: 'spacer' }) );
		}
		
		for (var i = 0, ii = params.actions.length; i < ii; i++) {
			var action = params.actions[i];
			
			if (action.divider) {
				wrapper.add( $.UI.create('View', { classes: 'divider' }) );
			}
			
			var button = $.UI.create('View', { classes: 'button', index: i });
				button.addEventListener('click', params.onClick);
				button.add( $.UI.create('ImageView', { classes: 'button-icon', image: action.icon }) );
				button.add( $.UI.create('Label', { classes: 'button-title', text: action.title }) );
			wrapper.add(button);
		}
		
		wrapper.add( $.UI.create('View', { classes: 'spacer', height: args.paddingBottom ? 22 : 8 }) );

		$.container.add(wrapper);
		
		args.children = wrapper;
	} else if (args.children) {
		if (childrenReady) {
			toggleBottomSheet(true);
		} else {
			args.children.opacity = 0.1;
			args.children.addEventListener('postlayout', wrapperReady);
		}
	}
};

function wrapperReady(e) {
	this.removeEventListener('postlayout', wrapperReady);
	childrenReady = true;
	
	var children = args.children;
	children.bottom = - children.rect.height + 1;
	
	toggleBottomSheet(true);
}

function toggleBottomSheet(visible) {
	args.DEBUG && Ti.API.info("com.imobicloud.bottomsheet: toggleBottomSheet " + visible);
	
	var children = args.children;
	if (visible === true) {
		$.container.visible = true;
		children.animate({ bottom: 0, duration: 300, opacity: 1 });
	} else if ($.container) {
		children.animate({ bottom: - children.rect.height, duration: 300 }, function() {
			$.container.visible = false;
		});
	}
}
