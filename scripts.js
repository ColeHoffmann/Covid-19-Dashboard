/* The beginning of a covid-19 dashboard  */
const app = document.getElementById('root')

const website = "https://api.covidtracking.com/v1/states/current.json";
const method = "GET"

const cardsContainer = document.createElement('div');
cardsContainer.setAttribute('class', 'container')
app.appendChild(cardsContainer)

const title = document.createElement('h1');
title.textContent = ("Covid Data Per State.");
app.appendChild(title);

//creating a varuable for the XMLHttpRequest so we can access the api
var request = new XMLHttpRequest(); 
request.open(method, website, true);
request.onload = function(){ 
    
    //Make sure the call was successful
    if (request.status >= 200 && request.status < 400){ 
        var data = JSON.parse(this.response);
        
        data.forEach(element => {
            console.log(element.state);
        

             //Create a div as a card. 
             const stateCard = document.createElement('div');
                stateCard.setAttribute('class', 'card');
               
                if (element.deathConfirmed > 8000){
                        stateCard.setAttribute('state', 'bad');
                } else if (element.deathConfirmed > 4000){
                        stateCard.setAttribute('state', 'medium');
                } else { 
                        stateCard.setAttribute('state', 'fine');
                }



                //Create the header using the state name
                const h1 = document.createElement('h1');
                h1.textContent = element.state;
        
                 //now to create the data to display. we will display death counts. 
                const p = document.createElement('p');
                p.textContent = `Covid Confirmed Deaths: ${element.deathConfirmed}. This is an increase of ${element.deathIncrease} from yesterday.`
                
                const p2 = document.createElement('p');
              //TODO  p2.textContent = 

                cardsContainer.appendChild(stateCard);
                stateCard.appendChild(h1);
                stateCard.appendChild(p);
                stateCard.appendChild(p2);
                console.log("Card has been appended.")
            });
    } else{ 

        console.log("API Call was unsuccessful.");

    }


}

request.send()