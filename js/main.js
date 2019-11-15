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

var createSentence = function(index) {
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

var card = function() {

  var renderCard = function(sentence) {
    var cardTemplate = document.querySelector('#card').content.cloneNode(true);
    var cardElem = cardTemplate.querySelector('.map__card');
    var popupTitle = cardElem.querySelector('.popup__title');
    var popupAddress = cardElem.querySelector('.popup__text--address');
    var popupPrice = cardElem.querySelector('.popup__text--price');
    var popupType = cardElem.querySelector('.popup__type');
    var popupCapacity = cardElem.querySelector('.popup__text--capacity');
    var popupTime = cardElem.querySelector('.popup__text--time');
    var popupFeatures = cardElem.querySelector('.popup__features');
    var popupDescription = cardElem.querySelector('.popup__description');
    var popupPhotos = cardElem.querySelector('.popup__photos');
    var popupAvatar = cardElem.querySelector('.popup__avatar');

    var getPopupType = function(type) {
      var houseTypes = {
        flat: 'Квартира',
        bungalo: 'Бунгало',
        house: 'Дом',
        palace: 'Дворец',
      };
      return houseTypes[type];
    };

    popupTitle.textContent = sentence.offer.title;
    popupAddress.textContent = sentence.offer.address;
    popupPrice.textContent = sentence.offer.price + '₽/ночь';
    popupType.textContent = getPopupType(sentence.offer.type);
    popupCapacity.textContent = sentence.offer.rooms + ' комнаты, для ' + sentence.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + sentence.offer.checkin + ' , выезд до ' + sentence.offer.checkout;
    popupFeatures.textContent = sentence.offer.features.join(', ');
    popupDescription.textContent = sentence.offer.description;
    popupAvatar.src = sentence.author.avatar;
    sentence.offer.photos.forEach(function(item) {
      popupPhotos.querySelector('img').src = item;
      if (item) {
        var hotelImage = popupPhotos.querySelector('img').cloneNode(true);
        hotelImage.src = item;
        popupPhotos.appendChild(hotelImage);
      }
    });
    return cardElem;
  };

  var putCardsInMap = function(ad) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    mapFiltersContainer.insertAdjacentElement('beforeBegin', renderCard(ad));
  };
  return putCardsInMap()
};
