var page = require('webpage').create(),
    system = require('system'),
	fs = require('fs'),
	address1,
	address2,
	format, 
	filename1,
	filename2,
	reportname,
	reportstream,
	reportexists;

if (system.args.length !== 8) {
    console.log('Usage: compare.js Domain1 Domain2 URLPath outputPath format width height');
    phantom.exit(1);
} else {    
	address1 = system.args[1] + system.args[3];
    address2 = system.args[2] + system.args[3];
    
	format = system.args[5];
    
	page.viewportSize = { width: system.args[6], height: system.args[7] }; 
	
	filename1 = system.args[4] + encodeURIComponent(system.args[3]) + "/" + page.viewportSize.width + "x" + page.viewportSize.height + "/" + encodeURIComponent(system.args[1] + system.args[3]) + "." + format;
	filename2 = system.args[4] + encodeURIComponent(system.args[3]) + "/" + page.viewportSize.width + "x" + page.viewportSize.height + "/" + encodeURIComponent(system.args[2] + system.args[3]) + "." + format;
	
	reportname = system.args[4] + "comparison_report.csv";
	reportexists = fs.exists(reportname);
	reportstream = fs.open(reportname, "a");
	//if the report doesn't exist, add the header
	if(!reportexists){
		reportstream.writeLine("URL1,URL2,WIDTH,HEIGHT,PASSED");
	}
	
	console.log("comparing " + address1 + " with " + address2);
	console.log(page.viewportSize.width + "x" + page.viewportSize.height);
	
	getPage(address1, filename1, function(result1) {
		getPage(address2, filename2, function(result2) {
			var same = result1 === result2;
			reportstream.writeLine(address1 + "," + address2 + "," + page.viewportSize.width + "," + page.viewportSize.height + "," + same);
			reportstream.close();
			if(!same){
				console.log("difference detected!")
				phantom.exit(3);				
			} else {
				//cleanup and exit
				console.log("no difference detected");
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
