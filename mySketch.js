//////////////// CAT ADVENTURE - a simple interpretation of the famous Mario video game
//////////////// CREATED BY LUISA ANJOS


////P5.PLAY LIBRARY MUST BE ENABLED 
////P5.SOUND LIBRARY MUST BE ENABLED 

///////////////////////////////////////////GLOBAL

// game control
var stage = 2; // kepps track of which function to run

// player
var p1X = 400; // p1 for player 1
var p1Y = 375;
var pWidth = 70;
var pHeight = 100;

// boxes (platforms to jump on)
var b1X = 200; // b1 for box 1
var b1Y = 300;
var b2X = 600; // b2 for box 2
var b2Y = 300;
var b3X = 500; // b3 for box 3
var b3Y = 150;
var bWidth = 200;
var bHeight = 40;

// coins
var c1X = 600; // c1 for coin 1
var c1Y = 410;
var c2X = 600;
var c2Y = 250;
var c3X = 500;
var c3Y = 100;
var c4X = 200;
var c4Y = 250;
var cWidth = 50
var cHeight = 50;

// villains
var v1X = 200; // v1 for villain 1
var v1Y = 400;
var v2X = 550; // v2 for villain 2
var v2Y = 100;
var v3X = 550; 
var v3Y = 400;
var v4X = 550; 
var v4Y = 250;
var vWidth = 70;
var vHeight = 70;
// moving villanis
var v1position = 200; // center positions
var v1Speed = 2; // how fast the villains move
var v1Direction = 1; // 1 is right and -1 is left
var v1Distance = 300; // how far the villains can go

var v2position = 550;
var v2Speed = 2;
var v2Direction = 1; 
var v2Distance = 50; 

var v3position = 500;
var v3Speed = 5;
var v3Direction = -1; 
var v3Distance = 400; 

var v4position = 550;
var v4Speed = 2;
var v4Direction = 1; 
var v4Distance = 50; 

// counters
var score = 0;
var lives = 2;
var totalTime; // total time of program running
var spashTime; // amount of time on splashscreen
var gameTime; // amount of time in game only
var timeLimit = 15; // total time of the game in case you don't die first

// gravity
var jump = false; //are we jumping?
var direction = 1; // the force of gravity in the Y direction
var velocity = 2; // the speed of the player
var jumpPower = 15; // energy of player's jump
var fallingSpeed = 2; // falling speed = velocity
var minHeight = 395; // ground limit
var maxHeight = 50; // height of the sky
var jumpCounter = 0; // keeps track of the number of jumps

// multimedia
var cat; // player
var platform; 
var landscape; // can't use "background" because ir alredy existes
var jumpSound;
var marioFont;
var coin;
var coinSound;
var villain;
var lifeLostSound;

///////////////////////////////////////////setup
function setup(){
	createCanvas(800, 500);
	rectMode(CENTER);
	textAlign(CENTER);
	imageMode(CENTER);

}// close setup

///////////////////////////////////////////draw
function draw(){

// call functions
	keyPressed();
	keyTyped();
	gravity();
	totalTime = millis(); // start timer
	
	if(stage == 0){
		splash();
	} // close splash
	
	if(stage == 1){
		game();
	} // close game
	
	if(stage == 2){
		winScreen();
	} // close win screen
	
	if(stage == 3){
		loseScreen();
	} // close lose screen
	
	if(mouseIsPressed == true){
		stage = 1;
	}
	
}// close draw

///////////////////////////////////////////splash
function splash(){
	
//timer
	splashTime = totalTime; // begin splashscreen timer
	
//same apperance of the game
	background (150,230,240); // skyblue
	image(landscape, width/2, height/2, width, height);
	
// title
	textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(100);
	text('CAT ADVENTURES!', width/2, 120);
	textSize(40);
	text("by: LUISA ANJOS", width/2, 170);
	
// instructions
	strokeWeight(5);
	textSize(25);
	text('how to play:', width/2, 240);
	text('press space to jump', width/2, 270);
	text('use arrows keys to move right and left', width/2, 290);
	text('watch out for villains', width/2, 310);
	text('obtain all cat coins before time runs out to win', width/2, 330);
	
	textSize(40);
	text('click anywhere to start the game', width/2, 490);

// image
	image(cat, p1X, p1Y, pWidth, pHeight);
	
	
}// close splash


///////////////////////////////////////////game
function game(){
	
//apperance of the game
	background (150,230,240); // skyblue
	image(landscape, width/2, height/2, width, height);
	
// window frame
	noFill();
	stroke(0);
	strokeWeight(15);
	rect(width/2, height/2, width, height);
	
// draw box
	stroke(0);
	strokeWeight(5);
	fill(255,120,0); // dark oreange
	//rect(b1X, b1Y, bWidth, bHeight);
	image(platform, b1X, b1Y, bWidth, bHeight)
	image(platform, b2X, b2Y, bWidth, bHeight)
	image(platform, b3X, b3Y, bWidth, bHeight)
	
// draw player
	stroke(0);
	fill(150, 0, 170); //purple
	//rect(p1X, p1Y, pWidth, pHeight);
	image(cat, p1X, p1Y, pWidth, pHeight);
	
// cloditions with boxes
		// box 1
	if(p1X >= b1X-bWidth/2 && p1X <= b1X+bWidth/2 && p1Y+bHeight >= b1Y-bHeight/2 && p1Y+bHeight<= b1Y+bHeight/2 && jump == false){
		p1Y = p1Y; // don't fall
		velocity = 0; // no speed because we aren't falling
		jumpCounter = 0; // allow us to jump again
	}// close on box 1	
	
		// box 2
	if(p1X >= b2X-bWidth/2 && p1X <= b2X+bWidth/2 && p1Y+bHeight >= b2Y-bHeight/2 && p1Y+bHeight<= b2Y+bHeight/2 && jump == false){
		p1Y = p1Y; // don't fall
		velocity = 0; // no speed because we aren't falling
		jumpCounter = 0; // allow us to jump again
	}// close on box 2	
	
		// box 3
	if(p1X >= b3X-bWidth/2 && p1X <= b3X+bWidth/2 && p1Y+bHeight >= b3Y-bHeight/2 && p1Y+bHeight<= b3Y+bHeight/2 && jump == false){
		p1Y = p1Y; // don't fall
		velocity = 0; // no speed because we aren't falling
		jumpCounter = 0; // allow us to jump again
	}// close on box 3
	
// coins
		// coin 1
	image(coin, c1X, c1Y, cWidth, cHeight);
	if(p1X >= c1X-cWidth/2 && p1X <= c1X+cWidth/2 && p1Y >= c1Y-cHeight/2 && p1Y <= c1Y+cHeight/2){
		score += 1;
		c1X = -10000 // move coin off screen
		coinSound.play ();
	} // close hit the coin 1
	
		// coin 2
	image(coin, c2X, c2Y, cWidth, cHeight);
	if(p1X >= c2X-cWidth/2 && p1X <= c2X+cWidth/2 && p1Y >= c2Y-cHeight/2 && p1Y <= c2Y+cHeight/2){
		score += 1;
		c2X = -10000 // move coin off screen
		coinSound.play ();
	} // close hit the coin 2
	
		// coin 3
	image(coin, c3X, c3Y, cWidth, cHeight);
	if(p1X >= c3X-cWidth/2 && p1X <= c3X+cWidth/2 && p1Y >= c3Y-cHeight/2 && p1Y <= c3Y+cHeight/2){
		score += 1;
		c3X = -10000 // move coin off screen
		coinSound.play ();
	} // close hit the coin 2
	
		// coin 4
	image(coin, c4X, c4Y, cWidth, cHeight);
	if(p1X >= c4X-cWidth/2 && p1X <= c4X+cWidth/2 && p1Y >= c4Y-cHeight/2 && p1Y <= c4Y+cHeight/2){
		score += 1;
		c4X = -10000 // move coin off screen
		coinSound.play ();
	} // close hit the coin 2
	
// villains
		// villain 1
	image(villain, v1X, v1Y, vWidth, vHeight);
				// collision with the villain
	if(p1X >= v1X-vWidth/2 && p1X <= v1X+vWidth/2 && p1Y >= v1Y-vHeight/2 && p1Y <= v1Y+vHeight/2){
		lives -= 1; // loose life
		p1X = 435; // player's X position reset
		p1Y = 375; // player's Y position reset
		lifeLostSound.play ();
	} // close hit the villain 1
	
		// villain 2
	image(villain, v2X, v2Y, vWidth, vHeight);
				// collision with the villain
	if(p1X >= v2X-vWidth/2 && p1X <= v2X+vWidth/2 && p1Y >= v2Y-vHeight/2 && p1Y <= v2Y+vHeight/2){
		lives -= 1; // loose life
		p1X = 435; // player's X position reset
		p1Y = 375; // player's Y position reset
		lifeLostSound.play ();
	} // close hit the villain 1
	
		// villain 3
	image(villain, v3X, v3Y, vWidth, vHeight);
				// collision with the villain
	if(p1X >= v3X-vWidth/2 && p1X <= v3X+vWidth/2 && p1Y >= v3Y-vHeight/2 && p1Y <= v3Y+vHeight/2){
		lives -= 1; // loose life
		p1X = 435; // player's X position reset
		p1Y = 375; // player's Y position reset
		lifeLostSound.play ();
	} // close hit the villain 1
	
	// villain 4
	image(villain, v4X, v4Y, vWidth, vHeight);
				// collision with the villain
	if(p1X >= v4X-vWidth/2 && p1X <= v4X+vWidth/2 && p1Y >= v4Y-vHeight/2 && p1Y <= v4Y+vHeight/2){
		lives -= 1; // loose life
		p1X = 435; // player's X position reset
		p1Y = 375; // player's Y position reset
		lifeLostSound.play ();
	} // close hit the villain 1
	
		// moving villain 1
	v1X = v1X + (v1Speed * v1Direction);
		// change direction
	if(v1X >= v1position+v1Distance || v1X <= v1position-v1Distance){
		// exceed distance allowance
		v1Direction = v1Direction * -1;
	} // close v1 direction change
	
		// moving villain 2 and change position
	v2X = v2X + (v2Speed * v2Direction);
	if(v2X >= v2position+v2Distance || v2X <= v2position-v2Distance){
		// exceed distance allowance
		v2Direction = v2Direction * -1;
	} // close v2 direction change
	
	// moving villain 3 and change position
	v3X = v3X + (v3Speed * v3Direction);
	if(v3X >= v3position+v3Distance || v3X <= v3position-v3Distance){
		// exceed distance allowance
		v3Direction = v3Direction * -1;
	} // close v3 direction change
	
	// moving villain 4 and change position
	v4X = v4X + (v4Speed * v4Direction);
	if(v4X >= v4position+v4Distance || v4X <= v4position-v4Distance){
		// exceed distance allowance
		v4Direction = v4Direction * -1;
	} // close v4 direction change
	
// scoreboard
	textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(5);
	textSize(30);
	text('points:', 50, 50);
	text(score, 100, 50);
	
// lives
	textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(5);
	textSize(30);
	text('lives:', 160, 50);
	text(lives, 210, 50);
	
// timer
	splashTime = splashTime; // stop counting time on splash
	gameTime = int((totalTime - splashTime)/1000) // convert to seconds and integer
	
	textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(5);
	textSize(30);
	text('time remaining:', 600, 50);
	text(timeLimit - gameTime, 700, 50); // display countdown timer
	
}// close game

/////////////////////////////////////////// win screen
function winScreen(){

	image(landscape, width/2, height/2, width, height);

	textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(200);
	text('you win =]', width/2, height/2);
	
} // close you win function

/////////////////////////////////////////// lose screen
function loseScreen(){
	
	image(landscape, width/2, height/2, width, height);

	textFont(marioFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(200);
	text('you lose =[', width/2, height/2);
	
} // close you lose function



///////////////////////////////////////////gravity
function gravity(){
	
	if(p1Y >= minHeight && jump == false){
		//STOP falling, because we are on the ground
		p1Y = p1Y;
		jumpCounter = 0; //reset jumpCounter when landing
	}// close on ground
	else{
		p1Y = p1Y + (direction*velocity); // code that makes gravity work
	}// else fall
	
	if(jump == true){
		if(p1Y <= maxHeight || jumpCounter>= jumpPower){
			if(p1Y >= minHeight){
				p1Y = minHeight;
			}// close at minHeight already
			else{
				velocity = fallingSpeed; //fall ar maximum
			}// close not at minHeight
			
		}//close at max
		else{
			jumpSound.play(); 
			velocity = -jumpPower; // - menas up on the Y axis (jumping)
			jumpCounter += 1; // add to jumpCounter
		}// close jumping not at max
		
	}// close jump
	else{
		velocity = fallingSpeed;
	}
	
}// close gravity


/////////////////////////////////////////// keys
//keypressed
function keyPressed(){
	if(kb.pressing('ArrowLeft')){
		p1X -= 5
	}// close left
	
	if(kb.pressing('ArrowRight')){
		p1X += 5
	}// close right
} //  close key pressed

function keyTyped(){
	if (kb.pressing(' ')) {
		jump = true; //jump
	}// close a pressed
	else{
		jump = false; //don't jump
	}
}//close keytyped


/////////////////////////////////////////// preload
function preload(){
	cat = loadImage('cat_player1.png');
	platform = loadImage('cat_game_bickts.png');
	landscape = loadImage('cat_game_background.png');
	jumpSound = loadSound('jump_sound.mp3');
	marioFont = loadFont('smbfont.ttf');
	coin = loadImage('cat_coin.png');
	coinSound = loadSound('coin_pickup.mp3');
	villain = loadImage('mouse_vilan.png');
	lifeLostSound = loadSound('life_lost.mp3');
	
}// close preload


