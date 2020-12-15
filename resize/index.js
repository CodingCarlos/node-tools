const sharp = require('sharp');
const fs = require('fs');

/**
 *	Creamos una imagen thumbnail de 200x200
 *	@param origPath {String} Ruta del archivo a crear
 *	@param destPath {String} Ruta del archivo a crear
 *	@return {Promise} Promesa con la ruta del thumbnail
 */
function createThumbnail(origPath, destPath) {
	return sharp(origPath)
		.resize(200,200) 
		.jpeg({quality : 50})
		.toFile(destPath)
		.then(() => {
			console.log('¡Thumbnail creado!');
			return destPath;
		});
}

console.log('Vamos a por las imágenes...');

// Una sóla imagen
// createThumbnail(__dirname + '/image/avatar.jpg', __dirname + '/image/thumb.jpg');

// Todas las de un directorio
const directory = `${__dirname}/images`;

fs.readdir(directory, function (err, files) {
	if (err) {
		console.error('Error leyendo el directorio', err);
		return;
	}
	// console.log(files);

	// Creamos el directorio para los thumbs
	const thumbDir = `${directory}/thumb`;
	fs.mkdirSync(thumbDir);

	const thumbnails = [];
	files.forEach((file) => {
		thumbnails.push(createThumbnail(`${directory}/${file}`, `${thumbDir}/${file}`));
	});

	Promise.all(thumbnails)
		.then(() => {
			console.log('¡Todos los archivos creados!');
		})
		.catch((e) => {
			console.error('Vaya, ha habido un problema', e);
		});
});
