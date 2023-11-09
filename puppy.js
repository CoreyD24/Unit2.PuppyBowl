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
    renderPlayerDetails(playerDetails.player);
};



//adds breed, status, and image on blank main
const renderPlayerDetails = (breedDetails) => {
    const html = `
    <h2 style="font-size: xx-large; text-shadow: 1px 1px 4px grey">${breedDetails.name}</h2>
    <h3>Breed: ${breedDetails.breed}</h3>
    <h4>Status: ${breedDetails.status.toUpperCase()}</h4>
    <h4>Team: ${breedDetails.team.name}</h4>
    <button>Go Back</button>
    <br><br>
    <img id="image" src="${breedDetails.imageUrl}" style="max-width:800px; max-height: 800px; cursor: zoom-in;">`;
    main.innerHTML = html


    const image = document.getElementById(`image`)
    image.addEventListener(`click`, (event) =>{
        zoomIn();
    })
    
    const zoomIn = () => {
        const currWidth = image.clientWidth
        image.style.width = (currWidth+300+`px`)
        const currHeight = image.clientHeight
        image.style.height = (currHeight+300+`px`)
    }


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
    ${playerNames.join(``)} 
    <br>
    <form>Enter Player Details to Add to Team</form>
    <input id=name type="text" name=name placeholder=Stella> Name</input>
    <br>
    <input id=breed type="text" name=breed placeholder=Australian-Cattle-Dog/Blue-Tick-Mix> Breed</input>
    <br>
    <input id=imgurl type="url" name=image placeholder=https://dog.ceo/api/breeds/image/random> Image URL</input>
    <br>
    <input id=imgfile type="file" name=file></input>
    <br>
    <input id=submit type="submit" name=submit></input>`
    
    main.innerHTML= html;

    //adding click event listeners to each name item in a list
    const eachName = document.querySelectorAll(`li`);
    eachName.forEach((event) => {
        event.setAttribute(`style`, `font-size: 20px; font-family: 'Courier New', Courier, monospace;`)
        event.addEventListener (`mousemove`, () => {
            event.style.cursor = (`pointer`)
            event.style.fontSize = (`x-large`)
            event.style.fontWeight = (`bold`)
        })
        event.addEventListener (`mouseout`, () => {
            event.style.fontSize = (`20px`)
            event.style.fontWeight = (`normal`)
        })
        event.addEventListener (`click`, (event) => {
            //runs function to recall details
            getPlayerDetails(event.target.id)
        })
        
    })
    const submit = document.getElementById(`submit`);
    submit.addEventListener (`click`, (event) => {
            event.preventDefault();
            alert(`Your Submission Has Been Received`)
        });
};

getAllPlayers();

