<canvas id="ctx" width="1300" height="600" style="border:1px solid #000000;"></canvas>
//Just above, we establish the properties of the background on which the game will be playing. We give it a name (ctx), we set the width and the height in millimeters, and we set the border one pixel large, in black.

<script>


var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial'; 

var HEIGHT = 600;
var WIDTH = 1300;
var timeWhenGameStarted = Date.now(); //this returns the time in milliseconds.

var frameCount = 0; 
var score =0;
var ctx,gameTimer;
var timer = 20000;
//All these variables we be used to set the stage of our game, the background, the basic gameplay mechanics, and the font of the text that will be appearing in our game.



//These next variables give us all the information we will need to work on our player; the HP gauge, the color, the size, the name the player will be given, etc. 
var player ={
	x:50,
	spdX:30,
	y:50,
	spdY:5,
	name:'P',
	HP: '10',
	width:20,
	height:20,
	color:'blue',
	atkSpd:0,
	AttackCounter:0,

}

var BulletList = {};
var UpgradeList ={};
var enemyList = {};
var HealthList = {};
var PenaltyList = {};
//These are just Arrays that we will calling upon later in our code. Something of note that needs mentioning: the term 'enemy.x' is equivalent to saying 'enemy['x']'.



document.onmousemove = function (mouse){
		var mousex = mouse.clientX -8;//same thing as below.
		var mousey = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
		
		if(mousex<player.width/2)//this whole code prevents the player from leaving the screen.
			mousex=player.width/2;
		if(mousex>WIDTH-player.width/2)
			mousex=WIDTH - player.width/2;
		if(mousey<player.height/2)
			mousey=player.height/2;
		if(mousey>HEIGHT - player.height/2)
			mousey=HEIGHT - player.height/2;	
			
		player.x = mousex;
		player.y = mousey;
}
//The function above has a simple purpose: it links the player to the mouse of the computer. In other words, the player controls the his movements with the mouse.
//It also sets the boundaries that prevent the player and the gameobjects from leaving the screen.


document.onclick = function(mouse){ //At click, the player shoots.
	if(player.AttackCounter>25){
		randomlyGenerateBullet();
		player.AttackCounter=0;
	
	}}
//This function has been deactivated - the AttackCounter has been sent to 0.


getDistanceBetweenEntity = function (entity1, entity2){// this returns the distance between the player/enemy.
		var vx = entity1.x - entity2.x;
		var vy = entity1.y - entity2.y;
		return Math.sqrt(vx*vx+vy*vy);		
}


testCollisionEntity = function (entity1, entity2){//are they colliding?
			var rect1 = {
			
			x:entity1.x-entity1.width/2,
			y:entity1.y-entity1.height/2,
			width:entity1.width,
			height:entity1.height, 
			}
			
			
			var rect2 = {
			
			x:entity2.x-entity2.width/2,
			y:entity2.y-entity2.height/2,
			width:entity2.width,
			height:entity2.height, 
			}
			return testCollisionRectRect(rect1, rect2);
			}
			

Enemy = function (id, x, y, spdX, spdY, width, height){

var enemy2 ={
	x:x,
	spdX:spdX,
	y:y,
	spdY:spdY,
	name:'E2',
	id:id,
	width:width,
	height:height,
	color:'red',
};
enemyList [id] = enemy2;

}
//Just like for the player, we need to set all the variables necessary for the enemies. We do so here. Note that most of the variables are similar to the ones the Player has. This is done intentionally here in order to avoid confusion. Keep in mind, this is not a recommended method - this could cause most scripts in C# and C++ to crash.




Penalty = function (id, x, y, spdX, spdY, width, height, category, color){

var Penalty ={
	x:x,
	spdX:spdX,
	y:y,
	spdY:spdY,
	id:id,
	width:width,
	height:height,
	color:color,
	category:category,
};
PenaltyList [id] = Penalty;

}


randomlyGeneratePenalty = function (){
		
			var x=Math.random() *WIDTH;//This returns a number between 0 and 1.
			var y= Math.random() *HEIGHT;
			var height= 15;//Thanks to the operation, the number will be between 20 and 40
			var width= 15;
			var id=Math.random();//There are two penalties that have been programmed in this game. This variable makes it so they they will appear randomly.
			var spdX=5;
			var spdY=5;
			
			Penalty(id, x, y, spdX, spdY, width, height);
			
			if(Math.random() <0.5){ //Basically, the MAth.Random will calculate a random number between 0 and 1. So we place a condition: either a blue or a grey penalty will appear.
					var category = 'score';
					var color = 'Blue';
			}else{
					var category = 'atkSpd';
					var color = 'Grey';
					
			}
			Penalty(id, x, y, spdX, spdY, width, height, category, color);
			
			}

Upgrade = function (id, x, y, spdX, spdY, width, height, category, color){

var Upgrade ={
	x:x,
	spdX:spdX,
	y:y,
	spdY:spdY,
	id:id,
	width:width,
	height:height,
	color:color,
	category:category,
};
UpgradeList [id] = Upgrade;

}


randomlyGenerateUpgrade = function (){
		
			var x=Math.random() *WIDTH;//This returns a number between 0 and 1.
			var y= Math.random() *HEIGHT;
			var height= 15;//Thanks to the operation, the number will be between 20 and 40
			var width= 15;
			var id=Math.random();
			var spdX=0;
			var spdY=0;
			
			Upgrade(id, x, y, spdX, spdY, width, height);
			
			if(Math.random() <0.3){
					var category = 'score';
					var color = 'Green';
			}else if (Math.random() <0.6){
					var category = 'atkSpd';
					var color = 'Purple';
			
			}else{
					var category = 'HP';
					var color = 'Yellow';
			
			
			}
			
			Upgrade(id, x, y, spdX, spdY, width, height, category, color);
			
			}

	
Bullet = function (id, x, y, spdX, spdY, width, height){

var Bullet ={
	x:x,
	spdX:spdX,
	y:y,
	spdY:spdY,
	name:'E2',
	id:id,
	width:width,
	height:height,
	color:'Black',
	timer :0,
};
BulletList [id] = Bullet;

}


randomlyGenerateBullet = function (){
		
			var x=player.x;//This returns a number between 0 and 1.
			var y= player.y;
			var height= 10;//Thanks to the operation, the number will be between 10 and 40
			var width= 10;
			var id=Math.random();
			var angle = Math.random()*360;
			var spdX=Math.cos(angle/180*Math.PI)*5;
			var spdY=Math.sin(angle/180*Math.PI)*5;
			Bullet(id, x, y, spdX, spdY, width, height);
			
			}			
					
updateEntity = function  (something){//the something is a parameter. By using this, we can make sure the entire function is set to the variable.
			UpdateEntityPosition(something)
			drawEntity(something)
}

UpdateEntityPosition = function (something){
				something.x+=something.spdX;
		     	something.y+=something.spdY;
			

			
			if(something.x<0 || something.x>WIDTH){

				something.spdX = -something.spdX;
			}
	
			
			if(something.y<0 || something.y>HEIGHT){

				something.spdY = -something.spdY;
			}
}
				
testCollisionRectRect = function(rect1, rect2){//this makes sure that ALL the sides of the rectangles are colliding.
		return 		  rect1.x <= rect2.x+rect2.width
					&&rect2.x <= rect1.x+rect1.width
					&&rect1.y <= rect2.y+rect2.height
					&&rect2.y <= rect1.y+rect1.height;


}

drawEntity = function(something){
				ctx.save();
				ctx.fillStyle = something.color;
				ctx.fillRect(something.x -something.width/2 ,something.y -something.height/2 ,something.width, something.height);
				ctx.restore();
				
}


update = function (){ 
		ctx.clearRect(0,0,WIDTH,HEIGHT);
		score++;
		frameCount++;//everytime it's updated, a new enemy will be spawned.
	
			if(frameCount % 50 === 0) //After every 2 seconds
			randomlyGenerateEnemy();
			if(frameCount % 100 === 0)//after 3 seconds			
			randomlyGenerateUpgrade();
			if(frameCount % 100 === 0)//after 3 seconds			
			randomlyGeneratePenalty();
			
			
			player.AttackCounter += player.atkSpd;
	
	
	for(var key in BulletList){
			updateEntity(BulletList[key]);
			
			BulletList[key].timer++;
			if(BulletList[key].timer>100){
					delete BulletList[key];
					continue;
					//don't do the next loop, just move on.
			
			}
			
						
				
				
			

			for(var key2 in enemyList){//We We MUST put a double loop, since every bullet must be able to hit every enemy.
			var isColliding = testCollisionEntity(BulletList[key], enemyList[key2]);
					if(isColliding){
					delete BulletList[key];
					delete enemyList[key2];
					
					break;//This will force the loop to stop. This will prevent the bullet(even once removed) to keep destroying.
			}
	}
	}
	
	for(var point in UpgradeList){
			updateEntity(UpgradeList[point]);
			var isColliding = testCollisionEntity(player,UpgradeList[point]);
				if(isColliding){
					if(UpgradeList[point].category === 'score')
							score +=100;//this adds to the score.
					if(UpgradeList[point].category === 'atkSpd')
							player.atkSpd +=1;	

					if(UpgradeList[point].category === 'HP')
							player.HP +=5;	
					delete UpgradeList[point];
			}}
		
	for(var hello in PenaltyList){
			updateEntity(PenaltyList[hello]);
			var isColliding = testCollisionEntity(player,PenaltyList[hello]);
				if(isColliding){
					if(PenaltyList[hello].category === 'score')
							score -=200;//this adds to the score.
					if(PenaltyList[hello].category === 'atkSpd')
							player.atkSpd -=1;	

		
					delete PenaltyList[hello];
			}}
	
		
	
	
			for(var i in enemyList)
			{
			updateEntity(enemyList[i]);
			
			var isColliding = testCollisionEntity(player,enemyList[i]);
					if(isColliding){
							player.HP = player.HP -1;	
					}	
		}
		
		if (player.HP<=0)
							
							{
									var timeSurvived = Date.now() - timeWhenGameStarted;
									
									  window.clearInterval(gameTimer);
						  alert("GAME OVER!! You score is "+score+".")
						  document.location.reload();
						  }
									
										
								drawEntity(player);
								
								ctx.fillText(player.HP + "HP",0,30);
								ctx.fillText("Score: " + score,1000,30);
}
		
			
startNewGame = function (){
			
			player.HP = 10;
			timeWhenGameStarted=Date.now();
			frameCount = 0;
			enemyList = {};//this means remove all the enemies
			UpgradeList = {};
			BulletList = {};
			
			randomlyGenerateEnemy();
			randomlyGenerateEnemy();
			randomlyGenerateEnemy();
			
			}
			
			
randomlyGenerateEnemy = function (){
		
			var x=Math.random() *WIDTH;//This returns a number between 0 and 1.
			var y= Math.random() *HEIGHT;
			var height= 10 + Math.random()*30 ;//Thanks to the operation, the number will be between 10 and 40
			var width= 10 + Math.random()*30;
			var id=Math.random();
			var spdX=5+Math.random()*5;
			var spdY=5+Math.random()*5;
			Enemy(id, x, y, spdX, spdY, width, height);
			
			}
			
		
			
			startNewGame();
			setInterval (update, 40); //this will copy the Update function every milliseconds.

</script>
