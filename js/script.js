var currentAlbum = 1;

document.querySelector('.next').addEventListener('click', getNextAlbum);
document.querySelector('.prev').addEventListener('click', getPrevAlbum);

function createGalleryElement(element) {
	return document.createElement(element);
}

function append(parent, element) {
	return parent.appendChild(element);
}

function getAlbum() {
	fetch('https://jsonplaceholder.typicode.com/albums/' + currentAlbum + '/photos')
	.then((response) => response.json())
	.then(function (data) {
		var photos = data;
		return photos.forEach(function (photo) {
			var span = createGalleryElement('span'),
				div = createGalleryElement('div'),
				a = createGalleryElement('a'),
				img = createGalleryElement('img');

			//span.innerHTML = photo.albumId;
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
	document.querySelector('.albumBody').innerHTML = '';
	getAlbum();
}


function getPrevAlbum(){
	currentAlbum--;
	if (currentAlbum == 0) {
		currentAlbum = 1;
	} 
	document.querySelector('.albumBody').innerHTML = '';
	getAlbum();
}

getAlbum();
