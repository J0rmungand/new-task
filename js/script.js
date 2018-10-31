var currentAlbum = 1;


document.querySelector('.albumNext').addEventListener('click', getNextAlbum);
document.querySelector('.albumPrev').addEventListener('click', getPrevAlbum);

function createGalleryElement(element) {
	return document.createElement(element);
}

function append(parent, element) {
	return parent.appendChild(element);
}

function clearContentBySelector (element1, element2) {
	return document.querySelector(element1).innerHTML = '', 
		   document.querySelector(element2).innerHTML = '';
}

function getAlbum() {
	fetch('https://jsonplaceholder.typicode.com/albums/' + currentAlbum + '/photos')
	.then((response) => response.json())
	.then(function (data) {
		var photos = data;
		var span = createGalleryElement('span');
		
		return photos.forEach(function (photo) {
			var div = createGalleryElement('div'),
				a = createGalleryElement('a'),
				img = createGalleryElement('img');

			span.innerHTML = 'Альбом № ' + photo.albumId;
			div.className = 'albumItem';
			a.href = photo.url;
			a.dataset.fancybox = 'gallery';
			img.src = photo.thumbnailUrl;
			img.alt = photo.title;

			append(document.querySelector('.albumTtile'), span);
			append(document.querySelector('.albumBody'), div);
			append(div, a);
			append(a, img);

		})
	})

	.catch (function (error) {
		console.log(error);
	});
}

function getNextAlbum(){
	currentAlbum++;
	if (currentAlbum == 100) {
		currentAlbum = 100;
	} 
	clearContentBySelector('.albumBody', '.albumTtile');
	getAlbum();
}


function getPrevAlbum(){
	currentAlbum--;
	if (currentAlbum == 0) {
		currentAlbum = 1;
	} 
	clearContentBySelector('.albumBody', '.albumTtile');
	getAlbum();
}

getAlbum();
