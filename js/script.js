
var currentAlbum = 1;

document.querySelector('.albumNext').addEventListener('click', getNextAlbum);
document.querySelector('.albumPrev').addEventListener('click', getPrevAlbum);

function createGalleryElement (element,nameClass) {
	if(typeof nameClass == "undefined") {
		return document.createElement(element);
	} else {
		element = document.createElement(element);
		element.className=nameClass;
		return element;	
	}
}

function append (parent, element) {
	return parent.appendChild(element);
}

function clearContentBySelector (element) {
	return document.querySelector(element).innerHTML = '';
}

function openModal () {
    var overlay = document.querySelector('.product-image-overlay');
    return overlay.style.display='block';
}

function closeModal () {
	var overlay = document.querySelector('.product-image-overlay');
    return overlay.style.display='none';
}

function getSrc () {
	large = document.querySelector('.large');
	large.src = this.dataset.largeSrc;
}

function clickIn (element, func) {
	return element.addEventListener('click', func);
}

function getAlbum () {
	fetch('https://jsonplaceholder.typicode.com/albums/' + currentAlbum + '/photos')
	.then(response => response.json())
	.then(function (data) {
		var photos = data;
		
		return photos.forEach(function (photo) {
			var div = createGalleryElement('div', 'albumItem'),
				a = createGalleryElement('a'),
				large = document.querySelector('.large'),
				close = document.querySelector('.product-image-overlay-close'),
				img = createGalleryElement('img');
				


			a.className = 'small';
			a.href = '#';
			a.dataset.largeSrc = photo.url;
			img.src = photo.thumbnailUrl;
			img.alt = photo.title;

			clickIn(a, openModal);
			clickIn(a, getSrc);
			clickIn(close, closeModal);

			append(document.querySelector('.albumBody'), div);
			append(div, a);
			append(a, img);
			
		})
	})

	fetch('https://jsonplaceholder.typicode.com/albums/' + currentAlbum)
	.then(response => response.json())
	.then(function (album) {
		var span = createGalleryElement('span'),
			div = createGalleryElement('div', 'albumTtile');

		span.innerHTML = album.title;

		append(document.querySelector('.albumBody'), div);
		append(div, span);
	})

	.catch (function (error) {
		console.log(error);
	});
}

function getNextAlbum () {
	currentAlbum++;
	if (currentAlbum > 100) {
		currentAlbum = 1;
	} 
	clearContentBySelector('.albumBody');
	getAlbum();
}


function getPrevAlbum () {
	currentAlbum--;
	if (currentAlbum < 1) {
		currentAlbum = 100;
	} 
	clearContentBySelector('.albumBody');
	getAlbum();
}

getAlbum();







