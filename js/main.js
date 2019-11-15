'use strict';

var COUNT_OF_ADS = 8;
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomElem = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var createSentence = function (index) {
  var locationX = getRandomNumber(MIN_X, MAX_X);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);

  var sentence = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png',
    },
    offer: {
      title: null,
      address: locationX + ' ,' + locationY,
      price: null,
      type: getRandomElem(HOTEL_TYPES),
      rooms: null,
      guests: null,
      checkin: getRandomElem(CHECKIN_CHECKOUT_TIME),
      checkout: getRandomElem(CHECKIN_CHECKOUT_TIME),
      features: getRandomElem(HOTEL_FEATURES),
      description: null,
      photos: getRandomElem(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    }
  };
  return sentence;
};

var renderSentence = function(index) {
  var adElem = adTemplate.cloneNode(true);
  adElem.style.left = createSentence().location.x + 'px';
  adElem.style.top = createSentence().location.y + 'px';
  adElem.querySelector('img').src = createSentence(index).author.avatar;
  adElem.querySelector('img').alt = createSentence().offer.title;

  return adElem;
}

var showSentence = function() {
  var mapPinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 1; i <= COUNT_OF_ADS; i++) {
    fragment.appendChild(renderSentence(i));
  }
  mapPinsList.appendChild(fragment);
};

showSentence();
