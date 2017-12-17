$(document).ready(function() {

    var questions = [
        {
            "question": "What is the answer to question 1?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "correct",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "",
                }
            ]
        },
        {
            "question": "What is the answer to question 2?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "correct",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "",
                }
            ]
        },
        {
            "question": "What is the answer to question 3?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "correct",
                }
            ]
        },
        {
            "question": "What is the answer to question 4?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "correct",
                }
            ]
        },
        {
            "question": "What is the answer to question 5?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "correct",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "",
                }
            ]
        },
        {
            "question": "What is the answer to question 6?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "correct",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "",
                }
            ]
        },
        {
            "question": "What is the answer to question 7?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "correct",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "",
                }
            ]
        },
        {
            "question": "What is the answer to question 8?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "correct",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "",
                }
            ]
        },
        {
            "question": "What is the answer to question 9?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "correct",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "",
                }
            ]
        },
        {
            "question": "What is the answer to question 10?",
            "answers": [
                {
                    "answer": "answer1",
                    "iscorrect": "",
                },
                {
                    "answer": "answer2",
                    "iscorrect": "",
                },
                {
                    "answer": "answer3",
                    "iscorrect": "correct",
                },
                {
                    "answer": "answer4",
                    "iscorrect": "",
                }
            ]
        },
    ];

    var questionsleft = questions;
    var questionnum = 0;
    var intervalId;
    var number = 15;
    var answercorrect;
    var amtcorrect = 0;
    var amtincorrect = 0;


    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement,1000);
    };
    function decrement() {
        number --;
        $("div.container div.timer div").html("<p>"+number+"</p>");
        if (number <= 0) {
            stop();
            $("div.container div.timer div").html("<p>Time is up</p>");
            $("div.container div.row div.correct").html(answercorrect+" correct answer");
            $(".nextquestion").show();
            amtincorrect ++;
            $("div.container div.row p.amtincorrect").html("Correct: "+amtcorrect+" Incorrect: "+amtincorrect);
        };
    }
    function stop() {
        clearInterval(intervalId);
    };
    function resetnum () {
        number = 15;
        milliseconds = 1000;
    };

    //Hide the next question button to start the game
    $("div.container button.nextquestion").hide();


    //Press start to play and call question function
    $(".startbutton").on("click",function() {
        //Hide start button after clicking
        $("div.container div.startbutton").hide();
        $("div.container div.timer p").html("15");
        //Call question function to see first question
        question();
    });
    //Display question and answer options, restart the timer
    function question() {
        $("div.container div.row div.correct").removeClass("correct");
        resetnum();
        run();
        answercorrect = ""
        questions = ""
        iscorrect = ""
        //Insert the question into the question row
        $("div.container div.question div").html("<p>"+questionsleft[questionnum].question+"</p");
        //Insert answers one through four into ans1 through ans4 rows
        for (i=0;i<4; i++) {
            var ansnum = i+1;
            var questions = questionsleft[questionnum].answers[i].answer;
            var iscorrect = questionsleft[questionnum].answers[i].iscorrect;
            $("div.container div.row div.ans"+ansnum).html(questions);
            if (questionsleft[questionnum].answers[i].iscorrect){
                answercorrect = questionsleft[questionnum].answers[i].answer;
                $("div.container div.row div.ans"+ansnum).addClass("correct");
            }
        };
    };
    //Return next question button when selecting an answer
    $("div.container").on("click","div.ans",function() {
        $("div.container div.row div.selection").removeClass("selection");
        $(".nextquestion").show();
        stop();
        $("div.container div.timer p").html("15");
        $(this).addClass("selection");
        answerselection = $(this).text();

        if (answerselection === answercorrect) {
            $("div.container div.row div.correct").html(answercorrect+" correct");
            amtcorrect ++;
        } else {
            $("div.container div.row div.correct").html(answercorrect+" correct");
            $("div.container div.row div.selection").html(answerselection+" incorrect");
            amtincorrect ++
        }
        $("div.container div.row p.score").html("Correct: "+amtcorrect+" Incorrect: "+amtincorrect);
        console.log(answercorrect);
    });
    $("div.container").on("click","button.nextquestion", function() {
        questionnum ++;
        question();
        $("div.container button.nextquestion").hide();
    });
}) 