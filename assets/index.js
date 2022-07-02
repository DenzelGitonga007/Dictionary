const wrapper = document.querySelector(".wrapper"), //Holds the wrapper div.
  searchInput = wrapper.querySelector("input"), //Holds the input field.
  synonyms = wrapper.querySelector(".synonym .list span"), //Calls the wrapper and holds the child class list in the parent class synonym.
  volume = wrapper.querySelector(".word i"), //Holds the class word in the list and calls the i tag.
  removeIcon = wrapper.querySelector(".search span"), //Hold the span in the search class.
  infoText = wrapper.querySelector(".info-text"); //Hold the class info-text in the p-tag.

  // Additional variables
   phonetic = wrapper.querySelector(".details span");
   searchWord = wrapper.querySelector(".details p");

let exampleEl = document.querySelector(".example span"); //For the example class
let meaningEl = document.querySelector(".meaning span"); //For the meanings.
let audio;

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    // .then((result) => data(result, word));
    .then((jsonData) => // The jsonData hold the array to the meanings.
    {
      let meanings = jsonData[0].meanings[0].definitions
      searchWord.innerText = jsonData[0].word; //Changes the p tag in the details.
      phonetic.innerText = jsonData[0].phonetics[0].text; //Replaces the span details in the details.

      // To print out the definition, held by a variable "output".
      let output = meanings[0].definition;
      meaningEl.innerText = output;

      // The audio from the collected meaning is then saved  to the variable "audio".
      audio = new Audio(jsonData[0].phonetics[0].audio)

      // Onclick of the speaker icon, the audio reads the searched word
      volume.addEventListener('click', ()=>{audio.play()})

      // The synonyms.
      let synonymArr = jsonData[0].meanings[0].definitions[0].synonyms;
      // To print them
      console.log(synonymArr)
      if(synonymArr.length === 0) //If no synonym is found
      {
        synonyms.innerHTML = `<p>Sorry, the word ${jsonData[0].word} does not seem to be having a synonym</p>`
      } else {
        synonymArr.forEach(element => {
          synonyms.innerHTML = `<li>${element}</li>`
          console.log(synonyms)
          
        });
      }

      // Using an example in a sentence
      let fetchedExample = jsonData[0].meanings[0].definitions[0].example;
      console.log(fetchedExample)
      // The condition
      if(fetchedExample !== undefined) //if the example is not found
      {
        exampleEl.innerText = fetchedExample;
        console.log(fetchedExample)
      } else {
        exampleEl.innerText = `Sorry, no example for the word ${jsonData[0].word}`;
      }
      console.log()
    })
    .catch((error)=>{console.log(error)})
}

// To activate the search
searchInput.addEventListener('keydown', (e)=>{
  if(e.keyCode === 13){
    console.log(searchInput.value)
    //Call the API
    fetchApi(searchInput.value);
    wrapper.classList.add('active')
  }
})


