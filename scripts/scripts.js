const cardsData = [
    {
        title: 'Книга',
        text: 'Отличный подарок для любителей книг',
        image: './assets/images/book.png',
        like: false,
        buy: false,
        delete: false,
        deleteall: false,
    },
    {
        title: 'Настольные игры',
        text: 'Отличный подарок для любителей настольных игр',
        image: '/assets/images/board-games.png',
        like: false,
        buy: false,
        delete: false,
        deleteall: false,
    },
    {
        title: 'Подарочный сертификат',
        text: 'Неплохой подарок если не знаете что нравиться получателю',
        image: '/assets/images/gift-certificate.png',
        like: false,
        buy: false,
        delete: false,
        deleteall: false,
    }
]
const body = document.querySelector('body');
const cardTemplate = body.querySelector('template').content;
const cardContainer = body.querySelector('.card__list');
const buttonAllDelete = body.querySelector('.button-all-delete');
const inputTitle = body.querySelector('.input__title');
const inputText = body.querySelector('.input__text');
const inputImage = body.querySelector('.input__img');
const buttonAdd = body.querySelector('.button-add');

const createCard = (cardData, index) => {
    const cardClone = cardTemplate.cloneNode(true);

    const cardItem = cardClone.querySelector('.card__item');
    cardItem.querySelector('.card__title').textContent = cardData.title;
    cardItem.querySelector('.card__text').textContent = cardData.text;
    cardItem.querySelector('.card__image').src = cardData.image;

    // Настройка кнопок
    LikeButton(cardItem, cardData, index);
    DeleteButton(cardItem, cardData, index);
    BuyButton(cardItem, cardData, index);

    cardContainer.appendChild(cardClone);
}
const LikeButton = (cardItem, cardData, index) => {
    const buttonLike = cardItem.querySelector('.card__button-like');

    if (cardData.like) {
        buttonLike.classList.add('active');
    }

    buttonLike.addEventListener('click', () => {
        cardsData[index].like = !cardsData[index].like;
        buttonLike.classList.toggle('active');
    });
}
const DeleteButton = (cardItem, cardData, index) => {
    const buttonDelete = cardItem.querySelector('.card__button-delete');

    buttonDelete.addEventListener('click', () => {
        cardItem.remove();
        cardsData.splice(index, 1);
    });
}
const BuyButton = (cardItem, cardData, index) => {
    const buttonBuy = cardItem.querySelector('.card__button-buy');
    const card = cardItem.querySelector('.card');

    if (cardData.buy) {
        buttonBuy.classList.add('active');
        card.classList.add('card-bought');
    }

    buttonBuy.addEventListener('click', () => {
        cardsData[index].buy = !cardsData[index].buy;
        buttonBuy.classList.toggle('active');
        card.classList.toggle('card-bought');
    });
}
cardsData.forEach((cardData, index) => {
    createCard(cardData, index);
});
buttonAdd.addEventListener('click', () => {
    const title = inputTitle.value.trim();
    const text = inputText.value.trim();
    const image = inputImage.value.trim();

    if (title && text && image) {
        const newCardData = {
            title,
            text,
            image,
            like: false,
            buy: false,
            delete: false,
            deleteall: false,
        };

        cardsData.push(newCardData);
        createCard(newCardData, cardsData.length - 1);
        inputTitle.value = '';
        inputText.value = '';
        inputImage.value = '';
        console.log(cardsData);
    } else {
        alert('Нужно заполнить все поля');
    }
});
buttonAllDelete.addEventListener('click', () => {
    [...cardContainer.children].forEach(child => {
        cardContainer.removeChild(child);
    });
    cardsData.length = 0;
    console.log(cardsData);
});