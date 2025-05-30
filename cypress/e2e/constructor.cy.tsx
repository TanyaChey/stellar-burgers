const API_URL = 'https://norma.nomoreparties.space/api';

// Селекторы
const SELECTORS = {
  BUNS_SECTION: 'h2:contains("Булки")',
  FILLINGS_SECTION: 'h2:contains("Начинки")',
  CONSTRUCTOR_SECTION: 'section.pt-25.pb-10',
  MODAL_OVERLAY: 'div[class*="overlay"]',
  MODAL_TITLE: 'h2',
  ORDER_BUTTON: 'button:contains("Оформить заказ")',
  LOGIN_BUTTON: 'button:contains("Войти")',
  EMAIL_INPUT: 'input[name="email"]',
  PASSWORD_INPUT: 'input[name="password"]'
};

// Фикстуры
const FIXTURES = {
  INGREDIENTS: 'ingredients.json',
  ORDERS: 'orders.json',
  USER: 'user.json'
};

// Тестовые данные
const TEST_DATA = {
  ACCESS_TOKEN: 'testAccessToken',
  REFRESH_TOKEN: 'testRefreshToken',
  ORDER_RESPONSE: { order: { number: 12345 } }
};

Cypress.on('uncaught:exception', () => {
  return false; // подавляем ошибки React
});

beforeEach(() => {
  window.localStorage.setItem('refreshToken', TEST_DATA.REFRESH_TOKEN);
  cy.setCookie('accessToken', TEST_DATA.ACCESS_TOKEN);

  cy.fixture(FIXTURES.INGREDIENTS).then((response) => {
    cy.intercept('GET', `${API_URL}/ingredients`, {
      statusCode: 200,
      body: response,
    }).as('getIngredients');
  });

  cy.fixture(FIXTURES.ORDERS).then((response) => {
    cy.intercept('GET', `${API_URL}/orders/all`, {
      statusCode: 200,
      body: response,
    }).as('getOrders');
  });

  cy.fixture(FIXTURES.USER).then((response) => {
    cy.intercept('GET', `${API_URL}/auth/user`, {
      statusCode: 200,
      body: response.user,
    }).as('getUser');
  });

  cy.visit('/');
  cy.wait(['@getIngredients', '@getUser']);
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

describe('Проверка конструктора бургера', () => {
  const dragAndDropIngredient = (ingredient, target) => {
    ingredient.trigger('dragstart');
    target.trigger('drop');
    ingredient.trigger('dragend');
  };

  it('добавление булки и ингредиентов + открытие/закрытие модалки', () => {
    // Кликаем по первой булке
    cy.get(SELECTORS.BUNS_SECTION)
      .parent()
      .find('li')
      .first()
      .scrollIntoView()
      .click()
      .as('firstBun');

    // Проверяем, что URL изменился и содержит id ингредиента (модалка открылась)
    cy.url().should('match', /\/ingredients\/.+$/);

    // Проверяем, что в модалке есть название ингредиента (заголовок h2)
    cy.get(SELECTORS.MODAL_TITLE).should('exist').and('not.be.empty');

    // Закрываем модалку кликом по оверлею
    cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });

    // Найти конструктор бургера
    cy.get(SELECTORS.CONSTRUCTOR_SECTION).as('constructorSection');

    // Выполнить drag-n-drop: перетащить булку в конструктор
    dragAndDropIngredient(cy.get('@firstBun'), cy.get('@constructorSection'));

    // Проверяем, что в конструкторе появилась булка (по тексту "булка")
    cy.get('@constructorSection').should('contain.text', 'булка');

    // Теперь булка добавлена, кликаем по первой начинке
    cy.get(SELECTORS.FILLINGS_SECTION)
      .parent()
      .find('li')
      .first()
      .scrollIntoView()
      .click()
      .as('firstFilling');

    // Проверяем, что модалка с начинкой открылась
    cy.url().should('match', /\/ingredients\/.+$/);

    // Проверяем, что в модалке есть заголовок
    cy.get(SELECTORS.MODAL_TITLE).should('exist').and('not.be.empty');

    // Закрываем модалку кликом по оверлею
    cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });

    // Добавляем начинку через drag-n-drop
    dragAndDropIngredient(cy.get('@firstFilling'), cy.get('@constructorSection'));

    // Проверяем, что в конструкторе есть булка и начинка
    cy.get('@constructorSection').should('contain.text', 'булка');
    cy.get('@constructorSection').should('contain.text', 'Биокотлета из марсианской Магнолии');
  });

  it('оформляет заказ с булкой и начинкой', () => {
    cy.get(SELECTORS.BUNS_SECTION)
      .parent()
      .find('li')
      .first()
      .scrollIntoView()
      .as('firstBun');

    // Найти конструктор бургера
    cy.get(SELECTORS.CONSTRUCTOR_SECTION).as('constructorSection');

    // Выполнить drag-n-drop: перетащить булку в конструктор
    dragAndDropIngredient(cy.get('@firstBun'), cy.get('@constructorSection'));

    // Добавляем начинку
    cy.get(SELECTORS.FILLINGS_SECTION)
      .parent()
      .find('li')
      .first()
      .scrollIntoView()
      .as('firstFilling');

    dragAndDropIngredient(cy.get('@firstFilling'), cy.get('@constructorSection'));

    // Перехватываем запрос на создание заказа
    cy.intercept('POST', `${API_URL}/orders`, {
      statusCode: 200,
      body: TEST_DATA.ORDER_RESPONSE,
    }).as('createOrder');

    // Кликаем по кнопке "Оформить заказ"
    cy.get(SELECTORS.ORDER_BUTTON).click();

    // Проверяем, что появилась форма логина
    cy.url().should('include', '/login'); 

    // Вводим email и пароль
    cy.get(SELECTORS.EMAIL_INPUT).type('****'); // вставьте данные вашей почты
    cy.get(SELECTORS.PASSWORD_INPUT).type('****'); // вставьте свой пароль

    // Отправляем форму
    cy.get(SELECTORS.LOGIN_BUTTON).click();

    // Кликаем по кнопке "Оформить заказ"
    cy.get(SELECTORS.ORDER_BUTTON).click();
  });
});