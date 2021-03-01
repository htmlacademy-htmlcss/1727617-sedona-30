const button = document.querySelector('.search-hotel__button');
const modal = document.querySelector('.search-modal');
const arrivalDate = modal.querySelector('[name=arrival-date]');
const departureDate = modal.querySelector('[name=departure-date]');
const adultAmount = modal.querySelector('[name=adult-amount]');
const childrenAmount = modal.querySelector('[name=children-amount]');
const form = modal.querySelector('form');
const countPlus = modal.querySelectorAll('.plus');
const countMinus = modal.querySelectorAll('.minus');
let isStorageSupport = true;
let storageAdult = '';
let storageChildren = '';

try {
    storageAdult = localStorage.getItem('adultAmount');
    storageChildren = localStorage.getItem('childrenAmount');
} catch (err) {
    isStorageSupport = false;
}

modal.classList.add('hide-modal');

button.addEventListener('click', function () {
    modal.classList.toggle('hide-modal');
    modal.classList.remove('modal-error');
    arrivalDate.focus();
    if (storageAdult) {
        adultAmount.value = storageAdult;
    }
    if (storageChildren) {
        childrenAmount.value = storageChildren;
    } 
});

form.addEventListener('submit', function (evt) {
    if (!arrivalDate.value || !departureDate.value || !adultAmount.value || !childrenAmount.value || adultAmount.value==0 && childrenAmount.value==0) {
        evt.preventDefault();
        modal.classList.remove('modal-error');
        modal.offsetWidth = modal.offsetWidth;
        modal.classList.add('modal-error');
    } else {
        if (isStorageSupport) {
            localStorage.setItem('adultAmount', adultAmount.value);
            localStorage.setItem('childrenAmount', childrenAmount.value);
        }
    }
});

for (let i = 0; i < countPlus.length; i++) {
    countPlus[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        let input = this.parentNode.querySelector("input");
        let value = parseInt(input.value) + 1;
        if (value > 0) {
            input.value = value;
        } else {
            input.value = 1;
        }
    });
}

for (let i = 0; i < countMinus.length; i++) {
    countMinus[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        let input = this.parentNode.querySelector("input");
        let value = parseInt(input.value) - 1;
        if (value > 0) {
            input.value = value;
        } else {
            input.value = 0;
        }
    });
}



