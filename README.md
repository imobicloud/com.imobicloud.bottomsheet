# Titanium UI - Bottom sheets

https://material.io/guidelines/components/bottom-sheets.html

====

View
	
	<Widget id="bottomsheet" class="bottomsheet" src="com.imobicloud.bottomsheet"/>
    
Styles

	".bottomsheet": { DEBUG: false }
	".bottomsheet[if=Alloy.Globals.UI.IsIPhoneX]": { paddingBottom: 22 }
    
Controller

	$.bottomsheet.show({
		actions: [
			{ 
				icon: '/images/step/add/copy.png', 
				title: L('step_type_copy'), 
				divider: false 
			},
			{ 
				icon: '/images/step/add/cut.png', 
				title: L('step_type_cut'), 
				divider: true 
			}
		],
		title: 'Select type',
		onClick: function(e) {
			Ti.API.error("TODO: bottomsheet click " + e.index);
		}
	});
	
	// call me when window closed
	$.bottomsheet.unload();
	
Changes log:
- 13/11/2017:
	First commit
	
