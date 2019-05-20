//src/utils/resizeFile.js

const maxWidth = 1980;

/**
 *
 * @param file
 * @func callback
 */
export  function  resizeFile(file, callback) {

       // Load the image
       var reader = new FileReader();
       reader.onload = function (readerEvent) {
           var image = new Image();
           image.onload = function (imageEvent) {

               // Resize the image
               var canvas = document.createElement('canvas'),
                   max_size = maxWidth,
                   width = image.width,
                   height = image.height;
               if (width > height) {
                   if (width > max_size) {
                       height *= max_size / width;
                       width = max_size;
                   }
               } else {
                   if (height > max_size) {
                       width *= max_size / height;
                       height = max_size;
                   }
               }
               canvas.width = width;
               canvas.height = height;
               canvas.getContext('2d').drawImage(image, 0, 0, width, height);
               var dataUrl = canvas.toDataURL(file.type);

                // Convert to file object:
                urltoFile(dataUrl, file.name, file.type)
                .then(function(file){
                  file.blob = dataUrl
                  callback(file);
                })
           }
           image.src = readerEvent.target.result;
       }

       reader.readAsDataURL(file)
}


//return a promise that resolves with a File instance
async function urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
    );
}
