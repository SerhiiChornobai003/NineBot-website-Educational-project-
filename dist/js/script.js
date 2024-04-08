document.addEventListener("DOMContentLoaded", function() {
  // Початковий індекс активного елемента .advantages__item
  let activeIndex = 3;
  const wrapper = document.querySelector('.catalogue__wrapper');
  const items = document.querySelectorAll('.catalogue__wrapper-item');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentItem = 0;

  // Функція для зміни класів елементів .items
  function updateItemsClasses(activeIndex) {
    const items = document.querySelectorAll('.items');

    // Забираємо клас .show і додаємо .hidden у всі елементи .items
    items.forEach(function(item) {
      item.classList.remove('show');
      item.classList.add('hidden');
    });

    
    // Додаємо клас .show і забираємо .hidden лише для активного елемента .items
    items[activeIndex].classList.remove('hidden');
    items[activeIndex].classList.add('show');
  }

  // Функція для зміни класів при кліку на .advantages__item
  const advButtons = document.querySelectorAll('.advantages__item');
  const advTitles = document.querySelectorAll('.advantages__item-title');
  advButtons.forEach(function(item, index) {
    item.addEventListener('click', function() {
      const advTitle = advTitles[index];

      // Забираємо клас .active у всіх елементів .advantages__item
      advButtons.forEach(function(otherItem) {
        otherItem.classList.remove('active');
      });

      // Додаємо клас .active лише для обраного елемента .advantages__item
      item.classList.add('active');

      // Забираємо клас .active__text у всіх елементів .advantages__item-title
      advTitles.forEach(function(otherTitleElement) {
        otherTitleElement.classList.remove('active__text');
      });

      // Додаємо клас .active__text лише для обраного елемента .advantages__item-title
      advTitle.classList.add('active__text');

      // Оновлюємо індекс активного елемента та змінюємо класи елементів .items
      activeIndex = index;
      updateItemsClasses(activeIndex);
    });
  });

  function updateView() {
    items.forEach((item, index) => {
      item.style.transform = `translateX(-${currentItem * 100}%)`;
    });
    prevButton.style.visibility = currentItem === 0 ? 'hidden' : 'visible';
    nextButton.style.visibility = currentItem === items.length - 4 ? 'hidden' : 'visible';
  }
  
  prevButton.addEventListener('click', () => {
    if (currentItem > 0) {
      currentItem--;
      updateView();
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentItem < items.length - 4) {
      currentItem++;
      updateView();
    }
  });
  
  updateView();
});
