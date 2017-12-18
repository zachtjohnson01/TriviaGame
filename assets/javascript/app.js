$(document).ready(function() {
    function ajaxcall () {
        //Query trivia api and store values in an array object
        var queryURL = "https://opentdb.com/api.php?amount=10";
        var questions = [];
        var i;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            for (i=0;i<10;i++) {
                var category = response.results[i].category;
                var question = response.results[i].question;
                var anscorrect = response.results[i].correct_answer;
                var answers = response.results[i].incorrect_answers;
                var difficulty = response.results[i].difficulty;
                //Append the correct answer to the incorrect answers to create answers group
                response.results[i].incorrect_answers.push(anscorrect);
                questions.push({
                    "question":question,
                    "anscorrect":anscorrect,
                    "answers":shuffle(answers),
                    "category":category,
                    "difficulty":difficulty,
                });
            };
            
            //Fisher-Yates (aka Knuth) Shuffle algorithm
            //https://bost.ocks.org/mike/shuffle/
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                };
                return array;
            };
        });
        return questions;
    };
        
        var questionnum = 0;
        var intervalId;
        var questioninterval;
        var number = 15;
        var nextquestiontimernumber = 3;
        var answercorrect;
        var answerselection;
        var amtcorrect = 0;
        var amtincorrect = 0;
        var HTMLcontainer;
        var HTMLheading;
        var HTMLfullcolumn;
        var HTMLrow;
        var HTMLparagragh;
        var questioncount = 1;
        var selectanswer = "on";
        var answerlen;
        var questions = ajaxcall();

        console.log(questions);

        function generateHTML() {
                var rownum = 1;
                var paragraphnum = 10;
                var columnnum = 1;

                HTMLcontainer = $("div.container");
                HTMLheading = "<div class='row heading'></div>";
                HTMLfullcolumn = "<div class='col-md-12'>";
                HTMLrow = "<div class='row'>";
                HTMLparagragh = "<p>";

                //Generate rows
                for (i=0; i<rownum; i++) {
                    HTMLcontainer.append(HTMLrow);
                }

                //Generate columns
                for (j=0; j<columnnum; j++) {
                    $("div.row").append(HTMLfullcolumn);
                };

                //Generate paragraph elements and assign classes
                for (k=0; k<paragraphnum; k++) {
                    $("div.row").children().append("<p>");
                    $("p").eq(0).addClass("heading jumbotron text-center").html("<h1>Trivia - Categories</h1>");
                    $("p").eq(1).addClass("timer");
                    $("p").eq(2).addClass("category");
                    $("p").eq(3).addClass("difficulty");
                    $("p").eq(4).addClass("question");
                    $("p").eq(5).addClass("ans ans1");
                    $("p").eq(6).addClass("ans ans2");
                    $("p").eq(7).addClass("ans ans3");
                    $("p").eq(8).addClass("ans ans4");
                    $("p").eq(9).addClass("score");
                };

                //Generate and place buttons
                $("p").eq(0).after("<button>");
                $("p").eq(9).after("<button>");
                $("p").eq(9).after("<button>");
                $("button").attr("type","button");
                $("button").eq(0).addClass("startbutton btn btn-default center-block").html("Start");
                $("button").eq(1).addClass("nextquestion").html("Next Question");
                $("button").eq(2).addClass("restartgame btn btn-default center-block").html("Restart Game");
        }

        function showHTML() {
            $(".container").html(generateHTML);
            //Hide the next question and restart button to start the game
            $("div.container button.nextquestion").hide();
            $("div.container button.restartgame").hide();
        }

        
        function run() {
            stop();
            intervalId = setInterval(decrement,1000);
        };
        
        function decrement() {
            number --;
            $("p.timer").html("<p>"+number+"</p>");
            if (number <=5 && number > 0) {
                $("p.timer").effect("bounce")
            } else if (number <= 0) {
                stop();
                $("p.timer").html("<p>Time is up</p>");
                $("p.correct").html(answercorrect+" correct answer");
                // $("button.nextquestion").show();
                nextquestiontimer();
                amtincorrect ++;
                $("p.score").html("Correct: "+amtcorrect+" Incorrect: "+amtincorrect);
                $(".correct").addClass("correctcolor");
            };
        }
        
        function stop() {
            clearInterval(intervalId);
        };
        
        function resettimer () {
            number = 15;
            $("p.timer").html(15);
        };
        
        function nextquestiontimer() {
            stopnextquestiontimer();
            questioninterval = setInterval(decrement2,1000);
        }

        function decrement2() {
            nextquestiontimernumber --;
            if (nextquestiontimernumber <= 0) {
                stopnextquestiontimer(); 
                resetnextquestiontimer();   
                questionnum ++;
                questioncount++;
                //Make answers selectable
                selectanswer = "on";
                displayquestion();
                $("div.container button.nextquestion").hide();
                // $("p.timer").html("<p>Time is up</p>");
                // $("p.correct").html(answercorrect+" correct answer");
                // $("button.nextquestion").show();
                // amtincorrect ++;
                // $("p.score").html("Correct: "+amtcorrect+" Incorrect: "+amtincorrect);
            };
        }

        function stopnextquestiontimer() {
            clearInterval(questioninterval);
        }

        function resetnextquestiontimer() {
            nextquestiontimernumber = 3;
        }

        //Display question and answer options, restart the timer
        function displayquestion() {
            $("p.correct").removeClass("correct");
            $("p.selection").removeClass("selection");
            $(".correctcolor").removeClass("correctcolor");
            $("p.ans").show();
            resettimer();
            run();
            answercorrect = ""
            options = ""

            //Insert the category into the category paragraph
            $("p.category").html("Category: "+questions[questionnum].category);
            
            //Insert the difficulty into the difficulty paragraph
            $("p.difficulty").html("Difficulty: "+questions[questionnum].difficulty);

            //Display Score
            $("p.score").html("Correct: "+amtcorrect+" Incorrect: "+amtincorrect);

            //Insert the question into the question row
            $("p.question").html(questions[questionnum].question);
            answerlen = questions[questionnum].answers.length;
            //Insert answers one through four into ans1 through ans4 rows
            for (i=0;i<answerlen; i++) {
                var ansnum = i+1;
                var options = questions[questionnum].answers[i];
                $("p.ans"+ansnum).html("");
                $("p.ans"+ansnum).html(options);
                if (questions[questionnum].answers[i] === questions[questionnum].anscorrect){
                    answercorrect = questions[questionnum].anscorrect;
                    $("p.ans"+ansnum).addClass("correct");
                };
            };
            if (answerlen === 2) {
                $(".ans3").hide();
                $(".ans4").hide();
            }
        };

        //Initialize HTML
        showHTML();
        
        //Press start to play and call question function
        $("body").on("click",".startbutton",function() {
            //Hide start button after clicking
            $("button.startbutton").hide();
            //Show 15 seconds on the countdown clock
            $("p.timer").html("15");
            //Make answers selectable
            selectanswer = "on"
            //Call question function to see first question
            displayquestion();
        });

        //Return next question button after selecting an answer
        $("body").on("click","p.ans",function() {
            // $("p.selection").html("");
            if (selectanswer === "on") {
                $(this).removeClass("selection");
                $(this).addClass("selection");
                $(".correct").addClass("correctcolor");
                answerselection = $(this).text();
                if (answerselection === answercorrect && questions.length !== questioncount) {
                    amtcorrect ++;
                    // $("button.nextquestion").show();
                    stop();
                    nextquestiontimer();
                } else if (answerselection === answercorrect && questions.length === questioncount) {
                    amtcorrect++;
                    $("p.score").html("Correct: "+amtcorrect+" Incorrect: "+amtincorrect);
                    // $("button.nextquestion").hide();
                    $("button.restartgame").show();
                    stop();
                } else if (answerselection !== answercorrect && questions.length !== questioncount) {
                    amtincorrect ++;
                    // $("button.nextquestion").show();
                    //Display 'incorrect' next to selected answer
                    $("p.selection").html(answerselection+" incorrect");
                    stop();
                    nextquestiontimer();
                } else if (answerselection !== answercorrect && questions.length === questioncount) {
                    amtincorrect ++;
                    $("p.score").html("Correct: "+amtcorrect+" Incorrect: "+amtincorrect);
                    // $("button.nextquestion").hide();
                    $("button.restartgame").show();
                    //Display 'incorrect' next to selected answer
                    $("p.selection").html(answerselection+" incorrect");
                    stop();
                };
            }
            //Turn off ability to select answer
            selectanswer = "off";
            //Display 'correct' next to correct answer
            $("p.correct").html(answercorrect+" correct");
            //Display Score of Correct and Incorrect
            $("p.score").html("Correct: "+amtcorrect+" Incorrect: "+amtincorrect);
        });

        // $("body").on("click","button.nextquestion", function() {
        //     questionnum ++;
        //     questioncount++;
        //     //Reset countdown clock display to 15 seconds
        //     $("p.timer").html("15");
        //     //Make answers selectable
        //     selectanswer = "on";
        //     displayquestion();
        //     $("div.container button.nextquestion").hide();
        // });

        $("body").on("click","button.restartgame", function() {
            //Remove HTML to allow showHTML() function to rewrite
            $(".container").children().remove();
            //Call restartGame() function to reset variables and rewrite HTML
            restartGame();

        });
        function restartGame () {
            questionnum = 0;
            questioncount = 1;
            number = 15;
            answercorrect = 0;
            answerselection = "";
            amtcorrect = 0;
            amtincorrect = 0;
            var selectanswer = "on";
            questions = ajaxcall();
            showHTML();
        };
}) 