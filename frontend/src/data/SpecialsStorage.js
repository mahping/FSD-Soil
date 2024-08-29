const SPECIALS_KEY = 'weeklySpecials';

function initWeeklySpecials() {
    if(localStorage.getItem(SPECIALS_KEY)===null) {
        const specials = [
            { id: 1, name: 'Tomato', price: '$7.27', image: 'tomato'},
            { id: 2, name: 'Banana', price: '$8.99', image: 'banana' },
            { id: 3, name: 'Cucumber', price: '$6.99', image: 'cucumber' },
            { id: 4, name: 'Orange', price: '$5.99', image: 'orange' },
            { id: 5, name: 'Capsicum', price: '$4.20', image: 'capsicum'},
            { id: 6, name: 'Strawberry', price: '$3.99', image: 'strawberry'},
        ];

        localStorage.setItem(SPECIALS_KEY, JSON.stringify(specials));
    }
}

export {
    initWeeklySpecials
}