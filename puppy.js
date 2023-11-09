//request data from API
//render data on front end that allows user to 
    //view player roster
    //observe player details
    //add players [optional]


//varibale to shorten API URL usage
const apiBaseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-SF/players`

const state = {
    allPlayers: [],
};


//gets all player data and stores it into array state.allPlayers
const getAllPlayers = async() => {
    try {
        const data = await fetch (apiBaseURL);
        const response = await data.json();
        state.allPlayers = response.data;
        renderAllPlayers(state.allPlayers.players)
        //renderPlayerDetails();
    } catch (error) {
        console.log(error)
    };
};

getAllPlayers()

//triggering event listener adds all breeds, not the one selected.
const renderPlayerDetails = () => {
    //retrieves breed, status, and image URL
    const breeds = state.allPlayers.players.map((singlePlayer) => {
        return `<li id=${singlePlayer.id}> ${singlePlayer.breed}</li>`
    })
    const main = document.querySelector(`main`)
    const listedBreed = document.createElement('ul')
    main.replaceChildren(listedBreed);
    listedBreed.innerHTML = breeds.join(` `);
}


//plan to put all names on main page in list format appended to newly created UL
const renderAllPlayers = () => {
    const playerNames = state.allPlayers.players.map((singlePlayer) => {
        return `<li id=${singlePlayer.id}>${singlePlayer.name}</li>`
    });
    const main = document.querySelector(`main`);
    const listedNames = document.createElement(`ul`)
    main.appendChild(listedNames);
    listedNames.innerHTML= playerNames.join(` `);
    
    //adding click event listeners to each name item in a list
    const eachName = document.querySelectorAll(`li`);
    eachName.forEach((event) => {
        event.addEventListener (`click`, (event) => {
            //runs function to recall details
            renderPlayerDetails()
            console.log(`clicked`);
            
        })
    })
};





