var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
	if(!started){
		$("#level-title").text("Level "+level);
		nextSequence();
		started = true;
	}
});

// detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function(){
	var userChosenColour = $(this).attr("id");
	userClickPattern.push(userChosenColour);
	// console.log("userClickPattern");

	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel){
	if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
		console.log("success");
		if (userClickPattern.length === gamePattern.length) {
			setTimeout(function(){
				nextSequence();
			}, 1000);
		}
	} else{
		console.log("wrong");
		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		
		startOver();
	}
}

// determine next sequence
function nextSequence(){
	userClickPattern = [];

	// update header display
	level++;
	$("#level-title").text("Level "+level);

	var randomNumber = Math.floor(Math.random() * 4);

	// random chose colour
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	// make flash to button chosen
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);
}

function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}

// play sounds depends on button color
function playSound(name){
	// add sound to each button
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

// animate pressed button
function animatePress(currentColour){
	$("#"+currentColour).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColour).removeClass("pressed")
	}, 100);
}