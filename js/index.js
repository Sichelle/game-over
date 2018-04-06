const memoryGame = () => {

  // let imgs = []

  fetch("https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json")
    .then(res => res.json())
    .then(hero => {


      const heros = [

        {
          'name': `${hero[23].name}`,
          'img': `${hero[23].images.sm}`,
        },

        {
          'name': `${hero[41].name}`,
          'img': `${hero[41].images.sm}`,
        },

        {
          'name': `${hero[52].name}`,
          'img': `${hero[52].images.sm}`,
        },

        {
          'name': `${hero[111].name}`,
          'img': `${hero[111].images.sm}`,
        },

        {
          'name': `${hero[154].name}`,
          'img': `${hero[154].images.sm}`,
        },

        {
          'name': `${hero[289].name}`,
          'img': `${hero[289].images.sm}`,
        },

        {
          'name': `${hero[30].name}`,
          'img': `${hero[30].images.sm}`,
        },

        {
          'name': `${hero[40].name}`,
          'img': `${hero[40].images.sm}`,
        },

        {
          'name': `${hero[167].name}`,
          'img': `${hero[167].images.sm}`,
        },

      ]

    // creation des paires + randomization
      let gameGrid = heros.concat(heros)
      gameGrid.sort(() => 0.5 - Math.random());

      const game = document.querySelector('#game')

      const grid = document.createElement('section')
      grid.setAttribute('class', 'grid')
      game.appendChild(grid);

      gameGrid.map(item => {

        const card = document.createElement('div');
         card.classList.add('card');
         card.dataset.name = item.name;

         // Create front of card
         const front = document.createElement('div');
         front.classList.add('front');

         // Create back of card, which contains
         const back = document.createElement('div');
         back.classList.add('back');
         back.style.backgroundImage = `url(${item.img})`;

         // Append card to grid, and front and back to each card
         grid.appendChild(card);
         card.appendChild(front);
         card.appendChild(back);
       });

      //init de la selection par paire

      let count = 0
      let firstGuess = ''
      let secondGuess = ''
      let delay = 1000;
      let previousTarget = null

      //la fonction pour match les cartes 
      const match = () => {
       const selected = document.querySelectorAll('.selected');
       selected.forEach(card => {
         card.classList.add('match');
       });
     }

     //la fonction pour reset (lancée à chaque match)
     const reset = () => {
       firstGuess = ''
       secondGuess = ''
       count = 0
       //suppression du style des matchées
       const selected = document.querySelectorAll('.selected')
       selected.forEach(card => {
         card.classList.remove('selected')
         // card.style.borderColor = "transparent"
       })

     }

     //matchage via event click
      grid.addEventListener('click', (event) => {

        //empecher double click sur une carte + cliquer hors des divs
        let clicked = event.target;
        if (clicked.nodeName === 'SECTION' || clicked === previousTarget) {
          return;
        }

        //selection max 2 cartes
        if (count < 2) {
          count++;
          //stockage data-name dans var pour 1er click
          if (count === 1) {

            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
          } else { //stockage data-name dans var pour 2eme click
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
          }

          // verifie que les deux var possèdent qqchose
          if (firstGuess !== '' && secondGuess !== '') {
            // comparaison des data-name
            if (firstGuess === secondGuess) {
              setTimeout(match, delay)
              setTimeout(reset, delay)
            }
            else {
              setTimeout(reset, delay)
            }
          }

          previousTarget = clicked;

        }

       })
      console.log(heros)

    })

}

memoryGame()