var page = require('webpage').create(),
    system = require('system'),
	fs = require('fs'),
	address1,
	address2,
	format, 
	filename1,
	filename2;

if (system.args.length !== 8) {
    console.log('Usage: compare.js Domain1 Domain2 URLPath outputPath format width height');
    phantom.exit(1);
} else {    
	address1 = system.args[1] + system.args[3];
    address2 = system.args[2] + system.args[3];
    format = system.args[5];
    page.viewportSize = { width: system.args[6], height: system.args[7] }; 
	filename1 = system.args[4] + encodeURIComponent(system.args[3]) + "/" + encodeURIComponent(system.args[1]) + "_" + page.viewportSize.width + "x" + page.viewportSize.height + "." + format;
	filename2 = system.args[4] + encodeURIComponent(system.args[3]) + "/" + encodeURIComponent(system.args[2]) + "_" + page.viewportSize.width + "x" + page.viewportSize.height + "." + format;

	console.log("comparing " + address1 + " with " + address2);
	console.log(page.viewportSize.width + "x" + page.viewportSize.height);
	
	getPage(address1, filename1, function(result1) {
		getPage(address2, filename2, function(result2) {
			if(result1 !== result2){
				console.log("difference detected!")
				phantom.exit(3);				
			} else {
				//cleanup and exit
				console.log("no difference detected");
				//fs.remove(filename1);
				//fs.remove(filename2);
				phantom.exit();
			}
		});
	});
}

function getPage(address, filename, complete) {

	var result;
	
	console.log("opening " + address);

	page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load ' + address1);
            phantom.exit(2);
        } else {
            window.setTimeout(function () {
                console.log("rendering " + filename);
				page.render(filename);
				complete(page.renderBase64(format));
            }, 200);
        }
    });	
}
