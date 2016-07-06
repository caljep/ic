
var Jimp = require('jimp');
var easyimg = require('easyimage');
var fs = require('fs');
// you need ghostscript 'gs'!

// easyimg.convert({
// 	src: 'm.pdf', 
// 	dst: 'm.jpg', 
// 	quality: 100
// }).then(function(err, stdout, stderr)  {
// 	if (err) throw err
// 	console.log("converted");
// });

//this is green
var removeColor = [176, 194, 154];
//this is purple
var purple = [109, 50, 118];

/**
 * [nearColor description]
 * @param  {[type]} colorToRemove [description]
 * @param  {[type]} thisColor     [description]
 * @param  {[type]} range         [description]
 * @return {[type]}               [description]
 */
function nearColor(colorToRemove, thisColor, range) {
	var red = Math.abs(colorToRemove[0] - thisColor[0]),
		isInRange = false;
	if (red <= range) {
		var blue = Math.abs(colorToRemove[1] - thisColor[1])
		if (blue <= range) {
			var green = Math.abs(colorToRemove[2] - thisColor[2])
			if (green <= range) {
				isInRange = true;
			}
		}
	}
	return isInRange
}

Jimp.read('m.jpg').then(function (image) {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
		    // x, y is the position of this pixel on the image
		    // idx is the position start position of this rgba tuple in the bitmap Buffer
		    // this is the image
		    // var removeAlpha = nearColor(removeColor, this.bitmap.data.slice(idx, idx + 3), 35)
		    // if (removeAlpha) {
			   //  this.bitmap.data[idx + 3] = 0
		    // }

		    var removeAlpha = nearColor(purple, this.bitmap.data.slice(idx, idx + 3), 35)
		    if (!removeAlpha) {
			    this.bitmap.data[idx + 3] = 0
		    }
		})
        .write("removeGreen.jpg"); // save

}).catch(function (err) {
    console.error(err);
});

// var tesseract = require('node-tesseract')
// tesseract.process('./removeGreen.jpg', function(err, text) {
// 	if(err) {
// 		console.error(err);
// 	} else {
// 		console.log(text);
// 	}
// })
