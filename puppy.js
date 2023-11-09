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
        //console.log(state.allPlayers.players)
        //renderAllPlayers(state.allPlayers.name)
    } catch (error) {
        console.log(error)
    };
};

getAllPlayers()


//plan to put all names on main page in list format appended to h2 
const renderAllPlayers = () => {
    const playerNames = state.allPlayers.map((singlePlayer) => {
        return `<li id${singlePlayer.id}>${singlePlayer.name}</li>`
    });
    console.log(singlePlayer);
}
renderAllPlayers()





// const h2 = document.querySelector(`h2`)
// const listNames = document.createElement(`li`)
// h2.appendChild(listNames)
// listNames.innerHTML=`<li id=${state.allPlayers.players}>${state.allPlayers.players}</li>`