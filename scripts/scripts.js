const cardsData = [
    {
        id: 1,
        title: 'Книга',
        text: 'Отличный подарок для любителей книг',
        image: './assets/images/book.png',
        like: false,
        buy: false,
    },
    {
        id: 2,
        title: 'Настольные игры',
        text: 'Отличный подарок для любителей настольных игр',
        image: './assets/images/board-games.png',
        like: false,
        buy: false,
    },
    {
        id: 3,
        title: 'Подарочный сертификат',
        text: 'Неплохой подарок если не знаете что нравиться получателю',
        image: './assets/images/gift-certificate.png',
        like: false,
        buy: false,
    }
]
const body = document.body;
const cardTemplate = body.querySelector('template').content;
const cardContainer = body.querySelector('.card__list');
const buttonAllDelete = body.querySelector('.button-all-delete');
const inputTitle = body.querySelector('.input__title');
const inputText = body.querySelector('.input__text');
const inputImage = body.querySelector('.input__img');
const buttonAdd = body.querySelector('.button-add');
const errorMessege = body.querySelector('.error__message');

const sortCardsAlphabetically = () => {
    cardsData.sort((a, b) => a.title.localeCompare(b.title));
};

const createCard = (cardData, index) => {
    const cardClone = cardTemplate.cloneNode(true);

    const cardItem = cardClone.querySelector('.card__item');
    cardItem.querySelector('.card__title').textContent = cardData.title;
    cardItem.querySelector('.card__text').textContent = cardData.text;
    cardItem.querySelector('.card__image').src = cardData.image;

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

const DeleteButton = (cardItem,) => {
    const buttonDelete = cardItem.querySelector('.card__button-delete');

    buttonDelete.addEventListener('click', () => {
        cardItem.remove();
        const cardId = cardsData.findIndex(card => card.id === cardId);
        if (cardId !== -1) {
            cardsData.splice(cardId, 1);
        }
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

sortCardsAlphabetically();
cardsData.forEach((cardData, id) => {
    createCard(cardData, id);
});

const checkError = () => {
    const title = inputTitle.value.trim();
    const text = inputText.value.trim();
    const image = inputImage.value.trim();

    if (title && text && image) {
        errorMessege.textContent = '';
    }
};

inputTitle.addEventListener('input', () => {
    handleInputLimit(inputTitle);
    checkError();
});

inputText.addEventListener('input', () => {
    handleInputLimit(inputText);
    checkError();
});

inputImage.addEventListener('input', () => {
    checkError();
});

buttonAdd.addEventListener('click', () => {
    const title = inputTitle.value.trim();
    const text = inputText.value.trim();
    const image = inputImage.value.trim();

    if (title && text && image) {
        const newCardData = {
            id: cardsData.length + 1,
            title,
            text,
            image,
            like: false,
            buy: false,
        };

        cardsData.push(newCardData);
        sortCardsAlphabetically();
        cardContainer.innerHTML = '';
        cardsData.forEach((cardData, id) => {
            createCard(cardData, id);
        });
        inputTitle.value = '';
        inputText.value = '';
        inputImage.value = '';
        console.log(cardsData);
    } else {
       errorMessege.textContent = 'Нужно заполнить все поля' ;
    }
});

buttonAllDelete.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    cardsData.length = 0;
});
const inputLimit = (inputElement) => {
    const maxLength = 100;
    const currentLength = inputElement.value.length;

    if (currentLength >= maxLength) {
        inputElement.style.borderColor = 'red';
        inputElement.style.color = 'red';
    } else {
        inputElement.style.borderColor = '';
        inputElement.style.color = '';
    }
};

inputTitle.addEventListener('input', () => {
    inputLimit(inputTitle);
});

inputText.addEventListener('input', () => {
    inputLimit(inputText);
});

inputTitle.addEventListener('keydown', (event) => {
    if (inputTitle.value.length >= 100 && event.key !== 'Backspace' && event.key !== 'Delete') {
        event.preventDefault();
    }
});

inputText.addEventListener('keydown', (event) => {
    if (inputText.value.length >= 100 && event.key !== 'Backspace' && event.key !== 'Delete') {
        event.preventDefault();
    }
});
