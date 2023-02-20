var index_correct;

var pokemon_image = document.querySelector(".image")

function set_game(){

    var options = Array(4);

    // Getting four different pokémon ID
    for(var i = 0; i < 4; i++){
        var randint = Math.floor(Math.random() * 151) + 1
        options[i] = randint
    }

    // Getting the index of the right answer
    index_correct = Math.floor(Math.random() * 4)

    // Getting data from POKEAPI
    fetch(`https://pokeapi.co/api/v2/pokemon/${options[index_correct]}`)
    .then(response => response.json())
    .then(function set_correct(pokemon_data){

        // Getting the image
        pokemon_image.src = pokemon_data["sprites"]["other"]["official-artwork"]["front_default"]

        //Building the button
        const rgt_btn = document.querySelector(`.label${index_correct}`)
        rgt_btn.innerHTML = pokemon_data["name"].toUpperCase()

        const btn_img = document.querySelector(`.sprite${index_correct}`)
        btn_img.src = pokemon_data["sprites"]["front_default"]        
    })

    for(var i = 0; i < 4; i++){

        const btn_label = document.querySelector(`.label${i}`)
        const btn_img = document.querySelector(`.sprite${i}`)

        if(i != index_correct){

            fetch(`https://pokeapi.co/api/v2/pokemon/${options[i]}`)
            .then(response => response.json())
            .then(function set_button(pokemon_data){

                //Building the button
                btn_label.innerHTML = pokemon_data["name"].toUpperCase()       
                btn_img.src = pokemon_data["sprites"]["front_default"]

            })
        }        
    }
}

function check_answer(id){

    //Getting the pressed button
    var act_btn = document.querySelector(`#${id}`)

    if(id == `btn${index_correct}`){

        //Reveals the image and alert correct answer
        pokemon_image.style.filter = "grayscale(0%) brightness(100%)"
        window.alert("You're right!")

        //Resetting the game
        for(var i = 0; i < 4; i++){
            document.querySelector(`#btn${i}`).style.backgroundColor = "#bde2cc"
        }
        pokemon_image.style.filter = ""

        set_game()
    }
    else{
        //Change the color button to indicate wrong answer
        act_btn.style.backgroundColor = "#f09f9f"
    } 
}

