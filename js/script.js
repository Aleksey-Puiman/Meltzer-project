"use strict"

// --- Логика работы бургер-меню ---
let hiddenMenu = document.querySelector(".hidden-menu");
let buttonsHiddenMenu = document.querySelectorAll(".header__menu");
let hiddenMenuOverlay = document.querySelector(".hidden-menu__overlay");
let hiddenMenuLink = document.querySelectorAll(".hidden-menu__link");
function openMenu() {
    hiddenMenu.classList.add("active");
    hiddenMenuOverlay.classList.add("active");
    buttonsHiddenMenu.forEach(element => {
        element.classList.add("active");
    });
}

function closeMenu() {
    hiddenMenu.classList.remove("active");
    hiddenMenuOverlay.classList.remove("active");
    buttonsHiddenMenu.forEach(element => {
        element.classList.remove("active");
    });
}

buttonsHiddenMenu.forEach(element => {
    element.addEventListener("click", function (e) {
        if (hiddenMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        };
    });
});
hiddenMenuLink.forEach(element => {
    element.addEventListener("click", function (e) {
        if (hiddenMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        };
    });
});
if (hiddenMenuOverlay) {
    hiddenMenuOverlay.addEventListener("click", closeMenu);
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && hiddenMenu.classList.contains('active')) {
        closeMenu();
    }
});

// --- Логика "прилипания" шапки при скролле ---
let header = document.querySelector('header');
let scrollVh = 50;
let scrollClass = 'header__fixed';

let checkScroll = () => {
    // Текущая позиция прокрутки
    const scrollY = window.scrollY;

    // Вычисляем порог в пикселях (50% от высоты видимой области)
    const thresholdPx = window.innerHeight * (scrollVh / 100);

    // Используем classList.toggle для добавления/удаления класса
    // Второй аргумент (boolean): true - добавить класс, false - удалить
    header.classList.toggle(scrollClass, scrollY >= thresholdPx);
};

// Добавляем слушатель события прокрутки на всё окно
window.addEventListener('scroll', checkScroll);

// Вызовем функцию один раз при загрузке, чтобы установить правильное состояние
// на случай, если страница загрузилась уже прокрученной ниже порога
checkScroll();

// --- Логика открытия модальных окон с формами ---
let formCatalogButton = document.querySelector("#form-catalog-call");
let formRequestButton = document.querySelector("#form-request-call");
let callForms = document.querySelectorAll(".popup__call-form");
let catalogForm = document.querySelector("#form-catalog");
let requestForm = document.querySelector("#form-request");

formCatalogButton.addEventListener("click", function () {
    catalogForm.classList.add("active");
});

formRequestButton.addEventListener("click", function () {
    requestForm.classList.add("active");
});

callForms.forEach(form => {
    let overlay = form.querySelector(".popup__overlay");
    let closeButton = form.querySelector(".popup__button-close");

    overlay.addEventListener("click", function () {
        form.classList.remove("active");
    });
    overlay.addEventListener("click", function () {
        closeButton.classList.remove("active");
    });
});

// --- База данных и логика для попапов "Продукты" ---
let ProductsData = [
    {
        id: 'product-pods',
        title: 'Подоконники',
        description: `<p>Подоконники из натурального камня – это не только выразительная деталь в дизайне интерьера, но и функциональный элемент, который способен выдержать разные нагрузки.</p>
        <p>Натуральный камень – живой материал, обладающий характерным рисунком: не существует двух одинаковых слэбов. Каждое изделие уникально и неповторимо.</p>`,
    },
    {
        id: 'product-table-tops',
        title: 'Столешницы',
        description: `<p>Столешницы из камня – одно из самых востребованных изделий. Это всегда произведение искусства. Богатство цветовой палитры сделает интерьер вашей кухни неповторимым.</p>
        <p>Самыми подходящими натуральными материалами являются гранит и кварцит, благодаря своей прочности, износостойкости и простоте в уходе.</p> 
        <p>Также часто используются мрамор и травертин, они не заменимы за счёт своей богатой цветовой палитре.</p>`,
    },
    {
        id: 'product-bar-counters',
        title: 'Барные стойки',
        description: `<p>Барная стойка – это центр интерьера ресторана, бара или кафе, а также кухни частного помещения. Она не является альтернативой кухонным столешницам, а выполняет собственную функцию.</p>
        <p>Барная стойка из камня не просто обладает прочностью, но и выполняет эстетическую роль.</p> 
        <p>Наши специалисты знают, как создать барную стойку по индивидуальному запросу.</p>`,
    },
    {
        id: 'product-bathroom-products',
        title: 'Изделия для ванной комнаты',
        description: `<p>Каменные изделия для ванной комнаты придают интерьеру неповторимый стиль и на протяжении долго времени радуют глаз владельцев и гостей помещения.</p>`,
    },
    {
        id: 'product-wall-panels',
        title: 'Стеновые панели',
        description: `<p>Наша компания изготавливает стеновые панели из разных пород натурального камня по проектам любой сложности: формам и размерам.</p>
        <p>Специалисты Meltzer помогут вам подобрать породы камня в соответствии с проектом и общей концепцией помещения. Если у Вас нет собственного проекта, мы разработаем его с учётом Ваших пожеланий.</p>`,
    },
    {
        id: 'product-reception-areas',
        title: 'Зоны ресепшн',
        description: `<p>Наша компания изготавливает Зоны ресепшн из разных пород натурального камня по проектам любой сложности: формам и размерам.</p>
        <p>Специалисты Meltzer помогут вам подобрать породы камня в соответствии с проектом и общей концепцией помещения. Если у Вас нет собственного проекта, мы разработаем его с учётом Ваших пожеланий.</p>`,
    },
    {
        id: 'product-fireplaces',
        title: 'Камины',
        description: `<p>Наша компания изготавливает камины из разных пород натурального камня по проектам любой сложности: формам и размерам.</p>
        <p>Специалисты Meltzer помогут вам подобрать породы камня в соответствии с проектом и общей концепцией помещения. Если у Вас нет собственного проекта, мы разработаем его с учётом Ваших пожеланий.</p>`,
    },
    {
        id: 'product-stairs',
        title: 'Лестницы',
        description: `<p>Каменные лестницы – нестареющая классика помещений самого разного предназначения.</p>
        <p>Наша команда реализует полный цикл работы: от проектирования до производства и монтажа.</p>`,
    },
    {
        id: 'product-mosaic',
        title: 'Мозаика',
        description: `<p>Каменная мозаика – незаменимый отделочный материал для создания акцентов в дизайне интерьера или монолитной выкладке всей площади.</p>
        <p>Самой впечатляющей с эстетической точки зрения является мозаика из натурального камня.</p>`,
    },
];

let popupProductsTrigger = document.querySelectorAll(".block__flex-child");
let popupProductTemplate = document.getElementById('popup-product');

popupProductsTrigger.forEach(element => {
    element.addEventListener("click", function (event) {
        let trigger = this;
        let productId = trigger.dataset.id;

        let itemData = ProductsData.find(item => item.id === productId);
        if (!itemData) {
            console.error(`Данные для элемента с ID "${portfolioId}" не найдены.`);
            return;
        }

        let popupClone = popupProductTemplate.content.cloneNode(true);

        popupClone.querySelector(".popup__title").textContent = itemData.title;
        popupClone.querySelector(".popup__description").innerHTML = itemData.description;

        document.body.appendChild(popupClone);

        let newPopupElement = document.body.lastElementChild;
        console.log(newPopupElement)
        let closeButton = newPopupElement.querySelector('.popup__button-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                newPopupElement.remove();
            });
        };
        if (newPopupElement && newPopupElement.classList.contains('popup__overlay')) {
            newPopupElement.addEventListener('click', (e) => {
                if (e.target === newPopupElement) {
                    newPopupElement.remove();
                }
            });
        }
    });
});

// --- База данных и логика для попапов "Образцы камня" ---
let stonesData = [
    {
        id: 'stone-Agate',
        title: 'Агат',
        description: '<p>Агат — потрясающие эстетические и декоративные свойства агата обеспечивают широкое применение камня в облицовке любых поверхностей. Агат прекрасно сочетается в интерьере с деревом и металлом, стеклом и пластиком, он прочен и устойчив к царапинам.</p>',
        images: ['img/stones/Agate.png', 'img/stones/Agate_stone.png'],
    },
    {
        id: 'stone-Granite',
        title: 'Гранит',
        description: '<p>Гранит – красивый и прочный природный камень, который является идеальным выбором для создания стильных интерьеров и экстерьеров. Его уникальные текстуры и оттенки делают каждую поверхность уникальной и неповторимой. Благодаря своей прочности и стойкости к внешним воздействиям, гранит является идеальным материалом для полов, столешниц, фасадов и других элементов декора.</p>',
        images: ['img/stones/Granite.jpg', 'img/stones/Granite_stone.png'],
    },
    {
        id: 'stone-Artificial-rock',
        title: 'Искусственный камень',
        description: '<p>Искусственный камень — считается идеальным материалом для отделки. Он сохраняет в себе преимущества натурального камня, за ним легко ухаживать: он не впитывает влагу и отличается повышенной прочностью.</p>',
        images: ['img/stones/Artificial-rock.jpg', 'img/stones/Artificial-rock_stone.png'],
    },
    {
        id: 'stone-Quartz-agglomerate',
        title: 'Кварцевый агломерат',
        description: '<p>Кварцевый агломерат – это инновационный материал, используемый в строительстве и дизайне интерьера. Он состоит из натурального кварца, смешанного с смолой и пигментами, что делает его прочным, стойким к царапинам и пятнам, а также гигиеничным. Данный камень не впитывает влагу и не требует ухода, он не токсичный и безвредный – все это выделяет его на фоне полностью натуральных минералов. Кварцевые агломераты отличаются широкой палитрой цветов и текстур, которые позволяют создавать уникальные и стильные интерьеры.</p>',
        images: ['img/stones/Quartz-agglomerate.jpg', 'img/stones/Quartz-agglomerate_stone.png'],
    },
    {
        id: 'stone-Quartzite',
        title: 'Кварцит',
        description: '<p>Кварцит — это метаморфическая порода горного камня, образованная при превращении кварца под воздействием высоких температур и давления. Он обладает высокой прочностью и износостойкостью, поэтому широко используется в строительстве и отделке. Кварцит имеет красивую текстуру и разнообразные оттенки, что делает его популярным материалом для создания декоративных элементов и плитки. Также он часто используется в производстве столешниц, подоконников и фасадов.</p>',
        images: ['img/stones/Quartzite.jpg', 'img/stones/Quartzite_stone.png'],
    },
    {
        id: 'stone-Labradorite',
        title: 'Лабрадорит',
        description: '<p>Лабрадорит – завораживающий драгоценный камень, известный своей переливающейся игрой цветов. Неудивительно, что лабрадорит с его великолепными оттенками от синего и зеленого до желтого и оранжевого пользуется большим спросом среди ценителей роскошных и премиальных интерьеров.</p>',
        images: ['img/stones/Labradorite.jpg', 'img/stones/Labradorite_stone.png'],
    },
    {
        id: 'stone-Marble',
        title: 'Мрамор',
        description: '<p>Мрамор – своей вечной элегантностью и красотой очаровывал людей на протяжении веков. Этот натуральный камень, отличающийся уникальными узорами и текстурами, использовался в искусстве, архитектуре и дизайне для придания роскоши любому пространству. Возможности использования мрамора безграничны: от полов и стен до мебели и аксессуаров. Он идеально подходит для создания стильного и изысканного облика вашего дома или офиса.</p>',
        images: ['img/stones/Marble.jpg', 'img/stones/Marble_stone.png'],
    },
    {
        id: 'stone-Onyx',
        title: 'Оникс',
        description: '<p>Оникс – это удивительный минерал, который привлекает внимание своими плоскопараллельными окрашенными слоями и уникальными узорами. Чаще всего оникс имеет коричневый цвет с белыми и черными узорами. Однако можно также встретить красно-коричневые, коричнево-желтые, медовые, белые с желтоватыми или розоватыми прослоями. Комбинация этих цветов создает прекрасные и уникальные узоры, делая каждый камень уникальным произведением природы.</p>',
        images: ['img/stones/Onyx.jpg', 'img/stones/Onyx_stone.png'],
    },
    {
        id: 'stone-Slate',
        title: 'Сланец',
        description: '<p>Сланец – представляет собой осадочную горную породу, образовавшуюся в результате скопления ила и органических веществ. Он имеет слоистую структуру и часто встречается в районах древних озер и океанов. Сланец широко используется в строительстве, как для облицовки домов, так и создания неповторимых рельефов на стенах в интерьере.</p>',
        images: ['img/stones/Slate.jpg', 'img/stones/Slate_stone.png'],
    },
    {
        id: 'stone-Supstone',
        title: 'Соупстоун',
        description: '<p>Соупстоун – это натуральный минерал, который получил свое название из-за своей нежной и гладкой текстуры, наподобие мыла. Мыльный камень не только прекрасно выглядит, но и обладает функциональными свойствами. Он служит отличным материалом для облицовки стен, производства раковин и столешниц.</p>',
        images: ['img/stones/Supstone.jpg', 'img/stones/Supstone_stone.png'],
    },
    {
        id: 'stone-Travertine',
        title: 'Травертин',
        description: '<p>Травертин – это потрясающая осадочная порода образована минеральными источниками, оставляющими после себя уникальные узоры и цвета. От пола до столешницы травертин придает элегантность и спокойную роскошь любому пространству.</p>',
        images: ['img/stones/Travertine.jpg', 'img/stones/Travertine_stone.png'],
    },
];

let popupStoneTrigger = document.querySelectorAll(".tab-stone__page");
console.log(popupStoneTrigger);
let popupStonesTemplate = document.getElementById('popup-stones');

popupStoneTrigger.forEach(element => {
    element.addEventListener("click", function (event) {
        let trigger = this;
        console.log(trigger);
        let StonesId = trigger.dataset.id;
        console.log(StonesId);
        let itemData = stonesData.find(item => item.id === StonesId);
        if (!itemData) {
            console.error(`Данные для элемента с ID "${StonesId}" не найдены.`);
            return;
        }

        let popupClone = popupStonesTemplate.content.cloneNode(true);

        popupClone.querySelector(".popup__title").textContent = itemData.title;
        popupClone.querySelector(".popup__description").innerHTML = itemData.description;
        popupClone.querySelector(".popup__image_first").src = itemData.images[0];
        popupClone.querySelector(".popup__image_second").src = itemData.images[1];
        document.body.appendChild(popupClone);

        let newPopupElement = document.body.lastElementChild;
        console.log(newPopupElement)
        let closeButton = newPopupElement.querySelector('.popup__button-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                newPopupElement.remove();
            });
        };
        if (newPopupElement && newPopupElement.classList.contains('popup__overlay')) {
            newPopupElement.addEventListener('click', (e) => {
                if (e.target === newPopupElement) {
                    newPopupElement.remove();
                    console.log(e.target);
                } else {
                    console.log(e.target);
                }
            });
        }
    });
});


// --- Логика работы табов (переключателей) для секции "Образцы камня" ---
let tabLinks = document.querySelector(".tab-stones__names");
let tabPages = document.querySelectorAll(".tab-stone__page");

tabLinks.addEventListener("click", function (e) {
    if (!e.target.classList.contains('tab-stone__name')) return;
    let targetPanel = document.getElementById(e.target.dataset.target);
    tabLinks.querySelectorAll(".tab-stone__name").forEach(tab => tab.classList.remove("active"));
    tabPages.forEach(page => page.classList.remove("active"));

    e.target.classList.add("active");
    targetPanel.classList.add("active");
});



// --- Логика анимации счетчиков при появлении в зоне видимости ---
document.addEventListener("DOMContentLoaded", function () {
    // Находим все счетчики на странице
    const counters = document.querySelectorAll('.counter');

    // Если счетчиков нет, ничего не делаем
    if (!counters.length) {
        return;
    }

    // --- Твоя функция анимации ---
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // --- Функция, которая будет запускать анимацию для ОДНОГО счетчика ---
    function startCounterAnimation(counterElement) {
        // Получаем данные из атрибутов
        // Добавляем || 0 на случай, если атрибут не задан или некорректен
        const endCount = parseInt(counterElement.dataset.count, 10) || 0;
        const totalDuration = parseInt(counterElement.dataset.duration, 10) || 2000; // 2 секунды по умолчанию

        // Проверяем, не анимировался ли уже (чтобы не запускать повторно)
        if (counterElement.dataset.animated === 'true') {
            return;
        }

        let startTime = null;
        let animationFrame = null; // Переменная для requestAnimationFrame

        // Функция обновления значения счетчика (взята из твоего кода)
        function updateCounter(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;

            if (elapsed < totalDuration) { // Используем < вместо <= для более точной остановки
                const progress = elapsed / totalDuration;
                const easedProgress = easeInOutQuad(progress);
                // Math.round вместо Math.ceil может дать более плавный результат для целых чисел
                counterElement.textContent = Math.round(endCount * easedProgress);
                // Запрашиваем следующий кадр
                animationFrame = requestAnimationFrame(updateCounter);
            } else {
                // Анимация завершена - ставим точное конечное значение
                counterElement.textContent = endCount;
                // Помечаем элемент как анимированный
                counterElement.dataset.animated = 'true';
                // Отменять animationFrame здесь не обязательно, так как рекурсия прервалась
            }
        }

        // Запускаем анимацию
        animationFrame = requestAnimationFrame(updateCounter);
    }

    // --- Настройка и запуск Intersection Observer ---

    // Функция обратного вызова для Observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Если элемент вошел в видимую область
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                // Запускаем анимацию для этого элемента
                startCounterAnimation(counterElement);
                // Отключаем наблюдение за этим элементом, чтобы анимация не запускалась повторно
                observer.unobserve(counterElement);
            }
            // Здесь можно добавить логику для сброса, если элемент ушел с экрана (если нужно)
            // else {
            //   // Например, сбросить счетчик на 0 и убрать флаг анимации
            //   // const counterElement = entry.target;
            //   // counterElement.textContent = '0';
            //   // delete counterElement.dataset.animated;
            //   // И снова начать наблюдение observer.observe(counterElement);
            // }
        });
    };

    // Опции для Observer (сработает, когда хотя бы 10% элемента видно)
    const observerOptions = {
        root: null, // Относительно viewport
        threshold: 0.1 // Можешь поменять это значение (от 0 до 1)
    };

    // Создаем экземпляр Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Начинаем наблюдение за каждым счетчиком
    counters.forEach(counter => {
        // Устанавливаем начальное значение (например, 0)
        counter.textContent = '0';
        // Сбрасываем флаг анимации на всякий случай
        delete counter.dataset.animated;
        // Начинаем наблюдение
        observer.observe(counter);
    });

}); // Конец обработчика DOMContentLoaded

// --- Логика фильтрации проектов в секции "Портфолио" ---
document.addEventListener('DOMContentLoaded', () => {
    const filtersContainer = document.querySelector('.portfolio__filters-menu');
    const allFilters = filtersContainer.querySelectorAll('[data-filter]'); // Получаем ВСЕ фильтры
    const subFilterContainers = filtersContainer.querySelectorAll('.filters-menu__optional-filters-container');
    const projects = document.querySelectorAll('.portfolio__project[data-category]'); // Получаем все проекты с data-category

    // Определяем, какие категории относятся к коммерческим и частным
    const commercialCategories = ['apart-hotel', 'restaurant', 'office', 'mall'];
    const privateCategories = ['apartment', 'house'];

    if (!filtersContainer || !allFilters.length || !projects.length) {
        console.warn('Не найдены необходимые элементы для фильтра портфолио.');
        return;
    }

    filtersContainer.addEventListener('click', (event) => {
        const clickedFilter = event.target.closest('[data-filter]'); // Ищем ближайший родитель с data-filter

        if (!clickedFilter) {
            return; // Клик был не по фильтру
        }

        const filterValue = clickedFilter.dataset.filter;
        const controlledSubMenuId = clickedFilter.dataset.controls;

        // 1. Обновление активного класса для фильтров
        allFilters.forEach(f => f.classList.remove('filter-active'));
        clickedFilter.classList.add('filter-active');

        // Если кликнули на под-фильтр, подсветить и его родителя (Коммерческие/Частные)
        const parentFilter = clickedFilter.closest('.filters-menu__optional-filters-container');
        if (parentFilter) {
            const parentFilterId = parentFilter.id;
            const controllingFilter = filtersContainer.querySelector(`[data-controls="${parentFilterId}"]`);
            if (controllingFilter) {
                controllingFilter.classList.add('filter-active'); // Добавляем активность и родителю
            }
        }


        // 2. Управление видимостью подменю
        if (clickedFilter.classList.contains('filters-menu__filter')) {
            // Если кликнули на основной фильтр, ТОГДА управляем подменю:
            subFilterContainers.forEach(container => {
                // Сначала скрываем все
                container.style.display = 'none';
                // Показываем нужное, если кликнули на родительский фильтр ("Коммерческие" или "Частные")
                if (controlledSubMenuId && container.id === controlledSubMenuId) {
                    container.style.display = 'block'; // Или 'flex', 'grid'
                }
            });
        }


        // 3. Фильтрация проектов
        projects.forEach(project => {
            const projectCategory = project.dataset.category;
            let shouldShow = false;

            if (filterValue === 'all') {
                shouldShow = true;
            } else if (filterValue === 'commercial') {
                shouldShow = commercialCategories.includes(projectCategory);
            } else if (filterValue === 'private') {
                shouldShow = privateCategories.includes(projectCategory);
            } else {
                // Если кликнули на конкретную подкатегорию
                shouldShow = projectCategory === filterValue;
            }

            // Показываем или скрываем проект
            // Лучше использовать классы для скрытия/показа, но для простоты пока display
            project.style.display = shouldShow ? 'block' : 'none'; // Или 'flex', 'grid' вместо 'block'
        });
    });
});


// Слайдер Swiper Этапов работ после портфолио
const stepsWorksSliderElement = document.querySelector('.steps-works__slider');
const paginationContainer = stepsWorksSliderElement.querySelector('.swiper-pagination'); // Находим контейнер пагинации
// Функция для обновления прогресс-бара
const updateProgressBar = (swiperInstance) => {
    if (!paginationContainer) return;

    // Находим активный буллит. Используем realIndex для корректной работы с loop: true
    const activeIndex = swiperInstance.realIndex;
    // Получаем ВСЕ буллиты (они могли перерисоваться)
    const bullets = paginationContainer.querySelectorAll('.swiper-pagination-bullet');

    if (bullets.length > activeIndex) {
        const activeBullet = bullets[activeIndex];

        // Вычисляем позицию центра активного буллита
        const bulletOffsetLeft = activeBullet.offsetLeft; // Позиция левого края буллита отн. родителя (контейнера)
        const bulletWidth = activeBullet.offsetWidth; // Ширина буллита
        const bulletCenter = bulletOffsetLeft + bulletWidth / 2; // Позиция центра буллита

        // Получаем ширину контейнера пагинации
        const containerWidth = paginationContainer.offsetWidth;

        // Рассчитываем процентное значение ширины для прогресс-бара
        let newWidthPercent = 0;
        if (containerWidth > 0) { // Избегаем деления на ноль
            newWidthPercent = (bulletCenter / containerWidth) * 100;
        }

        // Ограничиваем значение (на всякий случай, хотя должно быть в пределах)
        newWidthPercent = Math.max(0, Math.min(newWidthPercent, 100));

        // Устанавливаем CSS-переменную
        // Важно: используем paginationContainer, т.к. переменная задана для него (или его родителя)
        paginationContainer.style.setProperty('--pseudo-width', newWidthPercent + '%');

        //console.log(`Active Index: ${activeIndex}, Bullet Center: ${bulletCenter}px, Container Width: ${containerWidth}px, New Width: ${newWidthPercent.toFixed(2)}%`);
    }
};


// --- Инициализация и настройка слайдера "Этапы работ" (Swiper.js) ---
const stepsWorksSlider = new Swiper(stepsWorksSliderElement, {
    // Optional parameters
    loop: true, // Важно использовать swiper.realIndex ниже, если loop: true
    spaceBetween: 30,
    autoHeight: true,
    // If we need pagination
    pagination: {
        el: paginationContainer, // Передаем найденный элемент
        clickable: true,
        renderBullet: function (index, className) {
            let arr = ['Заявка', 'Расчет КП', 'Договор', 'Замер', 'Изготовление', 'Доставка', 'Установка'];
            return '<div ' + 'data-num="' + '0' + (index + 1) + '"' + 'class="' + className + '">'
                + '<p>' + (arr[index]) + '</p>' + '<div class="swiper-pagination-dott"></div>' + '</div>';
        },
    },

    // --- Обработчики событий Swiper для обновления прогресс-бара ---
    on: {
        // Вызываем при инициализации Swiper
        init: function (swiper) {
            // Небольшая задержка, чтобы убедиться, что DOM пагинации точно готов
            setTimeout(() => updateProgressBar(swiper), 0);
        },
        // Вызываем при смене слайда (включая клики по пагинации, перетаскивание и т.д.)
        slideChange: function (swiper) {
            updateProgressBar(swiper);
        },
        // Вызываем при изменении размера окна (важно для адаптивности!)
        resize: function (swiper) {
            updateProgressBar(swiper);
        }
    }
});

const swiperNumberSlide = document.querySelector('.swiper__number-slide');
const bullets = paginationContainer.querySelectorAll('.swiper-pagination-bullet');

bullets.forEach(bullet => {
    bullet.addEventListener('click', function () {
        swiperNumberSlide.innerHTML = bullet.dataset.num;
    });
});



// --- Инициализация слайдера "Отзывы" (Swiper.js) ---
const reviews__slider = new Swiper('.reviews__slider', {
    loop: true,

    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        769: {
            slidesPerView: 2,
        }
    }
});

// --- База данных и логика для попапов с деталями проектов "Портфолио" ---
let projects = [
    {
        id: 'bio-my-bio',
        images: ['img/projects/Bio-My-bio (1).png', 'img/projects/Bio-My-bio (6).png', 'img/projects/Bio-My-bio (2).png', 'img/projects/Bio-My-bio (3).png', 'img/projects/Bio-My-bio (4).png', 'img/projects/Bio-My-bio (5).png',],
        textSlide1: `<div>
            <h3>Ресторан BIO MY BIO</h3>
            <span>150 м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>BIO MY BIO от Матильды Шнуровой - это не просто кафе о полезной еде, это проект, посвященный растущей осознанности. Философия "Лучше легче!" прослеживается здесь во всем - начиная с ингредиентов в тарелке и заканчивая элементами интерьера и упаковкой из экологичных перерабатываемых материалов.</p>
                </div>
                <div class="flex-child">
                    <p>г. Санкт-Петербург, Вознесеснский про-т, д. 6, литера А</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Команда Meltzer Group создала настоящий арт-объект, который представляет собой кубы из органического стекла в матовой пленке и аквариум, изготовленный из паттерна. Грандиозная ручная работа, выполненная четырьмя специалистами.</p></div>`,
    },
    {
        id: 'NaviSpace',
        images: ['img/projects/NaviSpace (1).png', 'img/projects/NaviSpace (4).png', 'img/projects/NaviSpace (5).png', 'img/projects/NaviSpace (2).png', 'img/projects/NaviSpace (3).png',],
        textSlide1: `<div>
            <h3>Навигационное пространство NaviSpace</h3>
            <span>416 м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Продемонстрировать инновации и возможность гибких Agile-решений удалось с помощью полной перепланировки пространства, с отказом от кабинетной системы в пользу открытых гибких трансформируемых зон. Так, при входе, сопровождаемом отдельной гардеробной с доступом по СКУД, открывается проходная зона кафе с кухней и барной стойкой. Это пространство, которым могут пользоваться все сотрудники компании, где можно поработать, сделать кофе-брейк, провести встречу и корпоративные мероприятия, организовать конференцию, презентацию или обучение.</p>
                </div>
                <div class="flex-child">
                    <p>Санкт-Петербург, Малый пр-т В.О., 54, к.5</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>«Пространство, где мы создаем будущее» - такой вектор определила для себя компания. Архитекторы создали навигационное пространство, взаимодействующее с пользователями на языке Na'vi – языке Пандоры, который переводится как «народ, общность».</p></div>`,
        textSlide3: `<div><p>Мебель требовалось подобрать максимально подходящую пространству по стилистике и характеристикам. Многие индивидуальные решения в корпусной мебели и рабочие «коконы» в зоне коворкинга реализованы компанией Meltzer Group. А также реализованы звукоизоляционные решения, которые позволили не только обеспечить концентрацию сотрудников, но и необходимую уединенность для рабочих звонков</p></div>`,
    },
    {
        id: 'Zoom',
        images: ['img/projects/Zoom-Hotel (1).png', 'img/projects/Zoom-Hotel (5).png', 'img/projects/Zoom-Hotel (4).png', 'img/projects/Zoom-Hotel (2).png', 'img/projects/Zoom-Hotel (3).png',],
        textSlide1: `<div>
            <h3>Апарт-отель Best Western Zoom Hotel</h3>
            <span>750м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Zoom — гостиничный комплекс, расположенный в Приморском районе непосредственно на берегу Черной речки и оснащенный развитой инфраструктурой.</p>
                    <p>В рамках данного проекта мы разработали и произвели мебель для зоны отдыха на первом этаже, а также для 270 номеров апарт-отеля, выполненных в скандинавском стиле с отделкой из натуральных материалов.</p>
                </div>
                <div class="flex-child">
                    <p>г. Санкт-Петербург, ул. Матроса Железняка, д.2, стр.1</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Особый интерес к интерьеру вызывают цифры, обозначающие этажи. Эти элементы мы изготовили из хрупких панелей, обладающих уникальной фактурой. Каждая деталь панели клеилась на специальный элемент, установленный в нише.</p></div>`,
        textSlide3: `<div><p>На фото инсталляция из металлокаркаса, обшитая композитной панелью в цвет дерева, со светодиодным врезным профилем. Буквы «Z» и «M» облицованы оргстеклом.</p>
        <p>Параметрическая скамья склеивается из трех листов ДСП, внешние части в декоре Дуб Сонома. Без видимых крепежей на лицевых частях изделия, при монтаже мы обеспечили максимальное примыкание со стеной в рамках существующей геометрии стен.</p>
        </div>`,
    },
    {
        id: 'Wine-House',
        images: ['img/projects/Wine-House (1).png', 'img/projects/Wine-House (5).png', 'img/projects/Wine-House (4).png', 'img/projects/Wine-House (2).png', 'img/projects/Wine-House (3).png',],
        textSlide1: `<div>
            <h3>ЖК Wine House</h3>
            <span>70 м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Двухуровневые апартаменты в центре Москвы расположены в историческом здании 19 века. Монохромный интерьер с деликатным выбором текстур. В отделке использованы три основных материала: светло-бежевый керамогранит, натуральный травертин и тонированный дуб.</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Стены в ванной комнате выполнены из натурального камня травертина</p></div>`,
        textSlide3: `<div><p>Самым сложным элементом этого проекта является винтовая лестница. Главной задачей, стоящей перед командой Meltzer, было отсутствие видимых соединений и крепежных элементов на лестнице, поэтому все элементы привозились и сваривались на месте, а затем покрывались автомобильной краской, защищались и покрывались лаком</p>
        <p>Это эксклюзивный и трудоемкий процесс, который требовал даже пересчета нагрузок на перекрытия и множества профессиональных усилий: столярных, архитектурных, организационных и технических, а также плавность линий, систему доводчиков.</p>
        </div>`,
    },
    {
        id: 'Cloud-Nine',
        images: ['img/projects/Cloud-Nine (1).png', 'img/projects/Cloud-Nine (2).png', 'img/projects/Cloud-Nine (3).png', 'img/projects/Cloud-Nine (4).png',],
        textSlide1: `<div>
            <h3>ЖК Cloud Nine</h3>
            <span>159 м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Наша команда уделяла большое внимание каждой детали, чтобы создать пространство, которое будет объединять стиль и функциональность. В этом проекте мы акцентировали внимание на разнообразие материалов: латунь, шпон, камень и гипс.</p>
                    <p>В этом проекте присутствует единый акцент: латунь, шпон, камень и гипс. Светлый дуб, скругленные углы, островная кухня из натурального камня, окна, подчеркнутые деревянными откосами - это позволило создать пространство максимально чистым и воздушным.</p>
                </div>
            </div>
        </div>`,
    },
    {
        id: 'Diamond-Club',
        images: ['img/projects/Diamond-Club (1).png', 'img/projects/Diamond-Club (2).png', 'img/projects/Diamond-Club (3).png', 'img/projects/Diamond-Club (4).png',],
        textSlide1: `<div>
            <h3>Diamond Club «Газпром арена»</h3>
            <span>1.700 м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Закрытый премиальный ресторан Diamond Club — совместный проект с футбольным клубом «Зенит» для VIP-болельщиков на 300 посадочных мест. Накануне Кубка России по футболу перед компанией Meltzer Group стояла задача не просто реализовать качественный проект, но и сделать это оперативно, чтобы успеть к запланированному открытию Diamond Club.</p>
                </div>
                <div class="flex-child">
                    <p>г. Санкт-Петербург, Футбольная аллея, 1 ст1</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>В работе использовались исключительно экологичные и натуральные материалы, соответствующие требованиям пожарной безопасности. Для сохранения эстетичного внешнего вида элементы декора выполнялись из алюминия, а сверху покрывались шпоном.</p></div>`,
        textSlide3: `<div><p>Также была разработана схема декоративного освещения с сохранением концепции управления светом под дизайнерские потребности. Точечные светильники выполнены из латуни и светодиодного неона.</p>
        </div>`,
    },
    {
        id: 'NОК',
        images: ['img/projects/NОК (1).png', 'img/projects/NОК (6).png', 'img/projects/NОК (2).png', 'img/projects/NОК (3).png', 'img/projects/NОК (4).png', 'img/projects/NОК (5).png',],
        textSlide1: `<div>
            <h3>Ресторан NОК</h3>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Ресторан NOK находится в отеле GAMMA, для которого компания Meltzer Group выполняла проектирование номеров. После открытия отеля было принято решение расширить зону ресторана и реализовать редизайн.</p>
                </div>
                <div class="flex-child">
                    <p>Санкт-Петербург, набережная Обводного канала, 130</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Компания Meltzer Group произвела замену части предметов мебели, поменяла существующую обвивку на более износостойкую и профессиональную. Примечательной частью проекта стала облицовка стен ресторана гранитными плитами, рисунок на которых выполнялся вручную по задумке архитектора. Ресторан оценили международные премии PUBLIC SPACE AWARD и ADD Awards.</p></div>`,
    },
    {
        id: 'Ratusha-Page',
        images: ['img/projects/Ratusha-Page (1).png', 'img/projects/Ratusha-Page (2).png', 'img/projects/Ratusha-Page (4).png', 'img/projects/Ratusha-Page (3).png',],
        textSlide1: `<div>
            <h3>Коворкинг Ratusha Page</h3>
            <span>750м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Из заброшенной советской прачечной мы создали коворкинг. Задачей проекта было организовать современный коворкинг в центральном районе Санкт-Петербурга, в административно-деловом квартале «Малая ратуша»</p>
                    <p>Открытые рабочие места вдоль окон для обеспечения наилучшей инсоляции. По центру – общественные зоны: лаунжи, кофе и принт-поинты (для организации спонтанных коммуникаций между потенциальными коллегами). Благодаря высоте потолков мы увеличили количество рабочих мест: создали двухэтажные сервисные офисы.</p>
                </div>
                <div class="flex-child">
                    <p>Санкт-Петербург, Кирочная улица, 67</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Стены декорированы яркими наклейками, имитирующими корешки книг. Это современне направление в интерьере называется бук-арт. В PAGE оно создает ощущение гигантской библиотеки прямо внутри пространства, что еще больше настраивает на работу</p>`,
    },
    {
        id: 'Cottage-village-Repino',
        images: ['img/projects/Cottage village-Repino (2).png', 'img/projects/Cottage village-Repino (1).png', 'img/projects/Cottage village-Repino (7).png', 'img/projects/Cottage village-Repino (6).png', 'img/projects/Cottage village-Repino (3).png', 'img/projects/Cottage village-Repino (4).png', 'img/projects/Cottage village-Repino (5).png',],
        textSlide1: `<div>
            <h3>Коттеджный поселок Репино</h3>
            <span>360 м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Частный дом площадью 360 м.кв. на берегу Финского залива. Комплексная работа команды Meltzer включала разработку интерьера, корпусной мебели, металлических и латунных изделий, лестничных маршей с стеклянным ограждением.</p>
                    <p>Всего, для воссоздания проекта в идентичности к визуализациям было подготовлено более 60-ти образцов материалов, различных выкрасов, облицовок, а также отдельных фрагментов изделий. Как результат, мы достигли максимального эффекта однородности готового интерьера с исходной картинкой.</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Одной из задач являлось исключение лишнего шума в мастер-спальне и детских комнатах, пространство должно было выглядеть завершенным и лаконичным - без визуального шума.</p>
        <p>Данного эффекта удалось достичь благодаря интегрированию в корпус шкафов фурнитуры задвижной системы фасадов HAWA Folding Concepta. Уникальный образец среди аналогов, включающий в себя скрытую систему монтажа, плавность линий, систему доводчиков.</p></div>`,
        textSlide3: `<div><p>В процессе работ, по задумке архитекторов, был воссоздан эффект скалистого среза на полотне настенного натурального камня. Эти работы выполнялись вручную, по месту, специальными мастерами с помощью киянки и кирки.</p></div>`,
        textSlide4: `<div><p>В детской комнате командой Meltzer был не только создан «парящий» игровой домик с различными элементами корпусной мебели для хранения и удобства данного помещения. Результату предшествовал тяжелый кропотливый процесс конструкторской команды над разработкой каркаса «второго света», где главным было то, чтобы было безопасно при нахождении в нем детей.</p></div>`,
    },
    {
        id: 'Cottage-village-Gruzino',
        images: ['img/projects/Cottage village-Gruzino (1).png', 'img/projects/Cottage village-Gruzino (8).png', 'img/projects/Cottage village-Gruzino (2).png', 'img/projects/Cottage village-Gruzino (3).png', 'img/projects/Cottage village-Gruzino (4).png', 'img/projects/Cottage village-Gruzino (5).png', 'img/projects/Cottage village-Gruzino (6).png', 'img/projects/Cottage village-Gruzino (7).png',],
        textSlide1: `<div>
            <h3>Коттеджный поселок Грузино</h3>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Компания Meltzer совместно с дизайнерами, разработали и создали элементы интерьера для загородного дома. Все изделия сделаны из натуральных материалов, которые подверглись обработке для улучшения долговечности.</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>На фото встроенный шкаф с раздвижными дверями из шпона и МДФ. Механизм Slido Classic VF. B детской мы использовали МДФ покрытый эмалью. Фурнитура Hettich.</p></div>`,
    },
    {
        id: 'Putilov-Avenir',
        images: ['img/projects/Putilov-AVENIR (1).png', 'img/projects/Putilov-AVENIR (6).png', 'img/projects/Putilov-AVENIR (2).png', 'img/projects/Putilov-AVENIR (3).png', 'img/projects/Putilov-AVENIR (4).png', 'img/projects/Putilov-AVENIR (5).png',],
        textSlide1: `<div>
            <h3>Апарт-отель Putilov AVENIR</h3>
            <span>336 апартаментов</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Putilov AVENIR — один из объектов сети апарт-отелей AVENIR, находящийся на одной из самых оживленных магистралей Северной столицы — проспекте Стачек.</p>
                </div>
                <div class="flex-child">
                    <p>г. Санкт-Петербург, пр. Стачек, д. 64</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>По авторскому дизайн проекту произвели стойку регистрации из массива дуба со сложной радиусной фразировкой, и акрилового камня, идеально повторяющего форму.</p></div>`,
    },
    {
        id: 'Sosnovka',
        images: ['img/projects/Sosnovka (1).png', 'img/projects/Sosnovka (7).png', 'img/projects/Sosnovka (2).png', 'img/projects/Sosnovka (3).png', 'img/projects/Sosnovka (4).png', 'img/projects/Sosnovka (5).png', 'img/projects/Sosnovka (6).png',],
        textSlide1: `<div>
            <h3>ЖК Сосновка</h3>
            <span>50 м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Основной фокус в данном проекте направлен на безопасность и функциональность детской комнаты, а также удобство кухни-гостиной.</p>
                    <p>Красивый дизайн дома или квартиры визитная карточка владельца. Именно по ней можно судить о хорошем вкусе хозяина. Островная часть в тончайшей керамике, собранная на металло-каркасе, придает визуальную легкость самой главной центральной части помещения.</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Кухня-гостиная с индивидуальной тонировкой шпона дуба под мореный Венге и обилие натурального белого камня с золотыми пролесками придает пространству неповторимый стиль и уют.</p>
        <p>Подвесная консоль с выдвижными ящиками Blum, дополняется настенными панно в шпоне дуба, с текстурой по диагонали, чередующийся с керамическими плитами.</p></div>`,
    },
    {
        id: 'Neva-Towers',
        images: ['img/projects/Neva-Towers (1).png', 'img/projects/Neva-Towers (5).png', 'img/projects/Neva-Towers (6).png', 'img/projects/Neva-Towers (2).png', 'img/projects/Neva-Towers (3).png', 'img/projects/Neva-Towers (4).png',],
        textSlide1: `<div>
            <h3>ЖК Neva Towers</h3>
            <div class="flex-container">
                <div class="flex-child">
                    <p>По дизайн-проекту команда Meltzer создала встроенную мебель, шкафы с подсветкой, диваны, предметы интерьера и осветительные элементы для пяти апартаментов. Светлые оттенки использовались для визуального расширения пространства.</p>
                </div>
            </div>
        </div>`,
    },
    {
        id: 'Kirovsky-Avenir',
        images: ['img/projects/Kirovsky-AVENIR (1).png', 'img/projects/Kirovsky-AVENIR (5).png', 'img/projects/Kirovsky-AVENIR (4).png', 'img/projects/Kirovsky-AVENIR (2).png', 'img/projects/Kirovsky-AVENIR (3).png',],
        textSlide1: `<div>
            <h3>Апарт-отель Kirovsky AVENIR</h3>
            <span>473 апартамента</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Отель в Кировском районе, среднего ценового сегмента, предлагает жилье с полным набором услуг, аналогичных гостиничным.</p>
                </div>
                <div class="flex-child">
                    <p>Санкт-Петербург, ул. Кронштадтская, д. 9, к.2</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Зона ресепшн в отеле - это альфа и омега отельного обслуживания, ведь именно с них начинается и ими же заканчивается знакомство клиента с отелем. Именно поэтому внешний вид стойки регистрации отеля занимает важное место в общем интерьере.</p>
        <p>По индивидуальному дизайну выполнили барную стойку из массива дуба, элементы мебели из шпона, кашпо из металла с перфорацией и LED подсветкой.</p></div>`,
    },
    {
        id: 'Yard-Residence',
        images: ['img/projects/Yard-Residence (1).png', 'img/projects/Yard-Residence (3).png', 'img/projects/Yard-Residence (2).png', 'img/projects/Yard-Residence (4).png', 'img/projects/Yard-Residence (5).png',],
        textSlide1: `<div>
            <h3>Апарт-отель Yard Residence</h3>
            <span>22.000 м2 / 486 апартаментов</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Yard Residence - это стильный 4-звездочный комплекс бизнес-класса в центре Санкт-Петербурга. Команда Meltzer Group укомплектовала мебелью и текстилем все номера. Интерьер номеров был выполнен в разных цветовых решениях, которые придают уникальности и выглядят органично благодаря грамотному зонированию.</p>
                </div>
                <div class="flex-child">
                    <p>Санкт-Петербург, Херсонская ул., 43</p>
                </div>
            </div>
        </div>`,
    },
    {
        id: 'Russian-Seasons',
        images: ['img/projects/Russian-Seasons (1).png', 'img/projects/Russian-Seasons (5).png', 'img/projects/Russian-Seasons (2).png', 'img/projects/Russian-Seasons (3).png', 'img/projects/Russian-Seasons (4).png',],
        textSlide1: `<div>
            <h3>ЖК Русские сезоны</h3>
            <span>84 м2</span>
            <div class="flex-container">
                <div class="flex-child">
                    <p>Команда Meltzer Group по авторскому дизайн-проекту изготовила предметы интерьера для уютной лаунж-студии с внутренней отделкой натуральными материалами.</p>
                </div>
            </div>
        </div>`,
        textSlide2: `<div><p>Особенностью проекта стал остров, выполненный из массива дуба с облицовкой из дубового шпона, который имеет мультифункциональные способности.</p></div>`,
    },
];


document.addEventListener('DOMContentLoaded', () => { // Убедимся, что DOM готов

    // Находим все триггеры (карточки проектов)
    // Убедись, что у каждой карточки в HTML есть класс 'portfolio__project' и 'data-id'
    const portfolioTriggers = document.querySelectorAll('.portfolio__project[data-id]');
    const popupTemplate = document.getElementById('popup-portfolio-project');

    if (!portfolioTriggers.length || !popupTemplate) {
        console.error('Не найдены триггеры портфолио или шаблон попапа.');
        return;
    }

    portfolioTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const projectTrigger = this;
            const projectId = projectTrigger.dataset.id;

            // Находим данные для этого проекта
            const projectData = projects.find(item => item.id === projectId);

            if (!projectData) {
                console.error(`Данные для проекта с ID "${projectId}" не найдены.`);
                return;
            }

            // --- Создание и наполнение попапа ---

            const popupClone = popupTemplate.content.cloneNode(true);
            const swiperWrapper = popupClone.querySelector('.swiper-wrapper');

            if (!swiperWrapper) {
                console.error('Не найден .swiper-wrapper в шаблоне попапа.');
                return;
            }

            // Создаем слайды для Swiper
            projectData.images.forEach((imageUrl, index) => {
                // Создаем контейнер слайда
                const slide = document.createElement('div');
                slide.className = 'swiper-slide'; // Обязательный класс для Swiper

                // Создаем изображение
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Проект ${projectData.title || projectId} - изображение ${index + 1}`; // Добавляем alt
                const imageContainer = document.createElement('div');
                imageContainer.className = 'slide__image-container';
                imageContainer.appendChild(img)
                slide.appendChild(imageContainer);

                // Проверяем, есть ли дополнительный текст/HTML для этого слайда
                const textSlideKey = `textSlide${index + 1}`; // Формируем ключ: textSlide1, textSlide2, ...
                if (projectData[textSlideKey]) {
                    const textContainer = document.createElement('div');
                    textContainer.className = 'slide-additional-content'; // Добавь класс для стилизации, если нужно
                    textContainer.innerHTML = projectData[textSlideKey]; // Вставляем HTML из строки
                    slide.appendChild(textContainer); // Добавляем текст под картинкой
                }

                // Добавляем готовый слайд в обертку Swiper
                swiperWrapper.appendChild(slide);
            });

            // --- Добавление попапа в DOM ---
            document.body.appendChild(popupClone);
            const addedPopup = document.body.lastElementChild; // Получаем ссылку на добавленный попап

            // --- Инициализация Swiper ---
            let swiperInstance = null; // Переменная для хранения инстанса Swiper
            const swiperContainer = addedPopup.querySelector('.swiper'); // Находим контейнер Swiper ВНУТРИ добавленного попапа

            if (swiperContainer) {
                swiperInstance = new Swiper(swiperContainer, {
                    // Опции Swiper:
                    autoHeight: true,
                    slidesPerView: 1, // Показывать по одному слайду
                    spaceBetween: 30, // Расстояние между слайдами, если будет больше 1 slidesPerView
                    navigation: {
                        nextEl: addedPopup.querySelector('.swiper-button-next'), // Ищем кнопки ВНУТРИ этого попапа
                        prevEl: addedPopup.querySelector('.swiper-button-prev'),
                    },
                    // Можешь добавить другие опции: pagination, autoplay и т.д.
                });
            } else {
                console.error('Не найден контейнер .swiper для инициализации.');
            }


            // --- Обработчики закрытия ---
            const closeButton = addedPopup.querySelector('.popup__button-close');

            const closePopup = () => {
                // Важно! Уничтожаем Swiper перед удалением попапа
                if (swiperInstance) {
                    swiperInstance.destroy(true, true); // true, true - удалить стили и обработчики
                    swiperInstance = null; // Очищаем переменную
                }
                addedPopup.remove();
                // Снимаем слушатели с body/window, если они добавлялись (например, для Esc)
                document.removeEventListener('keydown', handleEscKey);
            };

            // Закрытие по кнопке
            if (closeButton) {
                closeButton.addEventListener('click', closePopup);
            }

            // Закрытие по клику на оверлей
            if (addedPopup.classList.contains('popup__overlay')) {
                addedPopup.addEventListener('click', (e) => {
                    if (e.target === addedPopup) {
                        closePopup();
                    }
                });
            }

            // (Опционально) Закрытие по клавише Esc
            const handleEscKey = (event) => {
                if (event.key === 'Escape') {
                    closePopup();
                }
            };
            document.addEventListener('keydown', handleEscKey);

        }); // Конец обработчика клика на триггер
    }); // Конец forEach для триггеров

}); // Конец DOMContentLoaded