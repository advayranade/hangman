var app = new Vue({ // Vue instance initiated
    el: "#app",
    data: {
        word: "",
        guess_ready: document.getElementById("word").disabled,
        guess: "",
        guessCounter: 0
    },
    methods: {
        // Functions connected to HTML & DOM
        enterWordInput: function(e) {
            /* 
                Makes sure that enter pressed, on input, function still works
            */
            if(e.key == "Enter") {
                this.wordInput();
            }
        },
        enterGuessInput: function(e) {
             /* 
                Makes sure that enter pressed, on input, function still works
            */

            if(e.key == "Enter") {
                this.guessInput();
            } 
        },
        wordInput: function() {
             /* 
                Call: Called when form for initial word is submitted
                Steps:
                    1. Disables word form to make sure that word cannot be edited
                    2. Creates blanks for the word (string with "______" to show on DOM)
                
                * Called only once

            */
            document.getElementById("word").disabled = true;
            document.getElementById("guess_div").style.display = "block";
            for (var i = 0; i < document.querySelectorAll(".blanks").length; i++) {
                document.querySelectorAll(".blanks")[i].innerHTML = "";
            }
            this.createBlanks()
        },
        guessInput: function() {
            /* 
                Call: Called when form with user guess is submitted
                Steps:
                    1. Checks if guess amount given has already been used
                    2. Checks if guess is correct
                        2a. If guess is correct, presents letter on DOM
                        2b. If not, decrements guessCounter
                    3. Checks if user has won (By seeing if all letters have been guessed)

                
                * Called every time user guesses

            */
            
            winCheckArray = [];
            word_array = this.word.split(""); // Word --> Array with each letter as an item

            this.ifTooManyGuesses() // Checks if guess amount already used

            var guessSuccessful = false; // flag

            for(var i = 0; i < this.word.length; i++) {
                if(word_array[i] == (this.guess).toLowerCase()) {
                    // Checking if guess is correct
                    document.getElementById("blank_"+i.toString()).style.color="black";
                    document.getElementById("blank_"+i.toString()).style.textDecoration="none";
                    guessSuccessful = true;
                }
            }

            

             if(!guessSuccessful) { // Flag Checked
                this.guessCounter++;
            }

            for (var i = 0; i < word_array.length; i++) {
                if(document.getElementById("blank_"+i.toString()).style.color == "black") {
                        winCheckArray.push(i); // Random number pushed (array.length only needed)
                };
            }

            this.winCheck(winCheckArray)
            
            this.guess = "";
        },
        // Functions used inside JS
        createBlanks: function () {
            for(var i = 0; i < this.word.length; i++) {
                blank = document.createElement("span");
                blank.className = "blanks"
                word_array = this.word.split('');
                blank.id = "blank_"+i.toString();
                blank.innerHTML = word_array[i];
                document.getElementById("blanks").appendChild(blank);
                spacing = document.createElement("span")
                spacing.innerHTML = "         ";
                document.getElementById("blanks").appendChild(spacing);

            }
        },
        ifTooManyGuesses: function () {
            if(this.guessCounter === 10) {
                console.log("Sorry! You lost!");
                for(var i = 0; i < this.word.length; i++) {
                    document.getElementById("blank_"+i.toString()).style.color="black";
                    document.getElementById("blank_"+i.toString()).style.textDecoration="none";
                }
                lost_msg = document.createElement("h2")
                lost_msg.textContent = "Sorry! You lost!";
                lost_msg.style.color="red";
                lost_msg.id="lost"
                document.getElementById("app").appendChild(lost_msg);

            }
        },
        winCheck: function(winCheckArray) {
            if(winCheckArray.length == word_array.length) {
                win_msg = document.createElement("h2")
                win_msg .textContent = "Awesome! You won!";
                win_msg .style.color="green";
                // debugger;
                if (document.getElementById("lost") == null) {
                    document.getElementById("app").appendChild(win_msg);
                    document.getElementById("word").enabled;
                };
                
            } else {
                if (document.getElementById("guessCount") != null) {
                    document.getElementById("guessCount").textContent = (10-this.guessCounter).toString() + "/10 guesses remaining"
                } else {
                    guessCount = document.createElement("p");
                    guessCount.id = "guessCount";
                    guessCount.textContent = (10-this.guessCounter).toString() + "/10 guesses remaining";
                    document.getElementById("app").appendChild(guessCount);

                }
            }
        }
    }
});