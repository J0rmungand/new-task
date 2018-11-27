'use strict';

function $(elem) {
	return document.querySelector(elem);
}

function $extendObj(_def, addons) {
	if (typeof addons !== "undefined") {
		for (var prop in _def) {
			if (addons[prop] != undefined) {
				_def[prop] = addons[prop];
			}
		}
	}
}


function createGalleryElement(element, nameClass) {
	if (typeof nameClass == "undefined") {
		return document.createElement(element);
	} else {
		element = document.createElement(element);
		element.className = nameClass;
		return element;
	}
}

function append(parent, element) {
	return parent.appendChild(element);
}

function clearContentBySelector(element) {
	return document.querySelector(element).innerHTML = '';
}

function openModal() {
	var overlay = $('.product-image-overlay');
	return overlay.style.display = 'block';
}

function closeModal() {
	var overlay = $('.product-image-overlay');
	return overlay.style.display = 'none';
}

function getSrc() {
	var large = $('.large');
	large.src = this.dataset.largeSrc;
}

function clickIn(element, func) {
	return element.addEventListener('click', func);
}

var gallery_plugin = (function () {

	var getAlbum = function (settings) {
		var _ = this;
		_.def = {
			target: $('.albumBody'),
			arrowLeft: $('.albumPrev'),
			arrowRight: $('.albumNext'),
			currentAlbum: '1'
		}

		$extendObj(_.def, settings);
		_.init();
	}
	getAlbum.prototype.init = function () {
		var _ = this;
		$('.spinner').style.display = "block";
			_.def.target.innerHTML = "";
			setTimeout(function () {
				_.album();
				$('.spinner').style.display = "none";
			}, 1000);
		_.initArrows();
	}
	getAlbum.prototype.album = function () {
		var _ = this;
		_.def.target.innerHTML = "";
		fetch('https://jsonplaceholder.typicode.com/albums/' + _.def.currentAlbum + '/photos')
			.then(response => response.json())
			.then(function (data) {
				var photos = data;

				return photos.forEach(function (photo) {
					var div = createGalleryElement('div', 'albumItem'),
						a = createGalleryElement('a'),
						large = $('.large'),
						close = $('.product-image-overlay-close'),
						img = createGalleryElement('img');



					a.className = 'small';
					a.href = '#';
					a.dataset.largeSrc = photo.url;
					img.src = photo.thumbnailUrl;
					img.alt = photo.title;

					clickIn(a, openModal);
					clickIn(a, getSrc);
					clickIn(close, closeModal);

					append(_.def.target, div);
					append(div, a);
					append(a, img);

				})
			})

		fetch('https://jsonplaceholder.typicode.com/albums/' + _.def.currentAlbum)
			.then(response => response.json())
			.then(function (album) {
				var span = createGalleryElement('span'),
					div = createGalleryElement('div', 'albumTtile');

				span.innerHTML = album.title;

				append(_.def.target, div);
				append(div, span);
			})

			.catch(function (error) {
				console.log(error);
			});
	}

	getAlbum.prototype.initArrows = function () {
		var _ = this;
		_.def.arrowRight.addEventListener('click', function () {
			_.def.currentAlbum++;

			if (_.def.currentAlbum > 100) {
				_.def.currentAlbum = 1;
			}
			$('.spinner').style.display = "block";
			_.def.target.innerHTML = "";
			setTimeout(function () {
				_.album();
				$('.spinner').style.display = "none";
			}, 1000);
		}, false);

		_.def.arrowLeft.addEventListener('click', function () {
			_.def.currentAlbum--;

			if (_.def.currentAlbum < 1) {
				_.def.currentAlbum = 100;
			}
			$('.spinner').style.display = "block";
			_.def.target.innerHTML = "";
			setTimeout(function () {
				_.album();
				$('.spinner').style.display = "none";
			}, 1000);
		}, false);
	}


	return getAlbum;
})();

//Инициализация альбома 

var gallery = new gallery_plugin({
	target: $('.albumBody'),
	arrowLeft: $('.albumPrev'),
	arrowRight: $('.albumNext'),
	currentAlbum: '2'
});
