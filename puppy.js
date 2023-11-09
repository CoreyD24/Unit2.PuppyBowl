//request data from API
//render data on front end that allows user to 
    //view player roster
    //observe player details
    //add players [optional]


//varibale to shorten API URL usage
const apiBaseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-SF/players`
const main = document.querySelector(`main`);

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
    } catch (error) {
        console.log(error)
    };
};



//triggering event listener, retrieves all breeds, not the one selected.
const getPlayerDetails = async(id) => {
    const data = await fetch (`${apiBaseURL}/${id}`);
    const response = await data.json();
    const playerDetails = response.data
    console.log(playerDetails.player)
    renderPlayerDetails(playerDetails.player);
};



//adds breed, status, and image on blank main
const renderPlayerDetails = (breedDetails) => {
   const html = `
   <h2>${breedDetails.name}</h2>
   <h3>Breed: ${breedDetails.breed}</h3>
   <h4>Status: ${breedDetails.status.toUpperCase()}</h4>
   <button>Go Back</button>
   <br><br>
   <img src="${breedDetails.imageUrl}">`;
   main.innerHTML = html

   const goBackButton = document.querySelector(`button`)
   goBackButton.addEventListener(`click`, (event) => {
        renderAllPlayers();
   })
};



//plan to put all names on main page in list format appended to newly created UL
const renderAllPlayers = () => {
    const playerNames = state.allPlayers.players.map((singlePlayer) => {
        return `<li id=${singlePlayer.id}>${singlePlayer.name}</li>`
    });
    const html = `
    <h2>Select A Puppy Player</h2>
    ${playerNames.join(``)} `
    main.innerHTML= html;
    
    //adding click event listeners to each name item in a list
    const eachName = document.querySelectorAll(`li`);
    eachName.forEach((event) => {
        event.addEventListener (`click`, (event) => {
            //runs function to recall details
            getPlayerDetails(event.target.id)
        })
    })
};

getAllPlayers();

