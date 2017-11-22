<!doctype html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		
		<!--- <link rel="stylesheet" href="style.css"> --->
		<style type="text/css">
			body {background-color:transparent;position:fixed;top:0px;left:0px;width:100%;height:100%;margin:0px;}
			.classImage {position:absolute;border-radius:30px;}
			* {cursor: none;}
			
		</style>
    
    /*this piece of code simply sets the size of the canvas in which the game will appear in. In this case, the canvas will be covering the entire internet page, will have a transparent background, allowing the image PNG or JPEG to appear without any kind of interference.*/
		
	<!--- <script src="script.js"></script> --->
		<script language="JavaScript">
		
			var maxVitesse=500;//The speed of the mouse. The amount of pixels the mouse can move per second.
			var maxIncVitesse=500;
			var coefRebondBordProjectile=0.8;//blue ball bounces off the side. If the number is 1,  the speed accelerates.
			var coefRebondBordEnnemis=0.5;//The Enemies. 
			var nbImg=2+11; //This represents the number of interactive objects that will appear in our game. In this case: 11 enemies, 1 player, and the Ball.
		
		
			var windowSizeX,windowSizeY;//Here, we will set the size of our screen.
			var img_background,img_player,img_SsEnergie,img_Energie,img_Ennemie;//This Variable will set all the sprites that will be used in our game.
			var obj=new Array();
			var nbVie=3;//The number of lives we have is applied here. In this game, the player will start with 3 lives.
			var Ennemie=0;
		        var timer = 50000;//The time the player has to defeat all the enemies.
			var frameCount = 0; 
			var ctx,gameTimer;

/*Here, several things are put forward. The language <script language="JavaScript"> allows the program to know that the following codes will be programmed in Javascript. We then add all the variables that will be appearing in the game. In this case, we type the speed of the gameobjects, the score, the number and the timers.*/ 
		

function start() //The function start() serves the purpose of setting up the entire game, so the player has the possibility to play without risking encountering a bug in the middle of the playthrough.
			{
				var i;
				
				windowSizeX=document.getElementById('idBody').clientWidth;
				windowSizeY=document.getElementById('idBody').clientHeight;//size of the screen.
				document.getElementById('idBody').innerHTML="<canvas id='mon_canvas' width='"+windowSizeX+"' height='"+windowSizeY+"'></canvas>";
				//This first three lines are easy to understand: we confirm the size of the canvas on which the game we are playing will appear in.We give this canvas a name (in this case 'mon_canvas'), so we can call upon it later on in our codes.
				
				var elmt=document.getElementById("mon_canvas");
				ctx=elmt.getContext("2d"); //Grab the canvas and the object.
				
				
				
				//From here on out, we will be searching for all the sprites that we shall be using for our game.
				img_background=new Image();
				img_background.src='dyson-sphere-artist-21.jpg';
				img_background.onload=function()
				//Up here, we call upon the background of the screen, and then search in our folder for the desired image. Since the image is located in the same folder as the script, all we need to type in the source is the name of the image : 'dyson-sphere-artist-21.jpg'
				//This process is identical to all the other gameobjects that will appear in the game.
				{
					img_player=new Image();
					img_player.src='medfighter.png'; 
					img_player.onload=function()
					{
						img_SsEnergie=new Image(); 
						img_SsEnergie.src='bll.png';
						img_SsEnergie.onload=function()
						{
							img_Energie=new Image();
							img_Energie.src='ss.png';
							img_Energie.onload=function()
							{
								img_Ennemie=new Image();
								img_Ennemie.src='ufo.png';
								
								img_Ennemie.onload=function()
								{
									for(i=0;i<nbImg;i++)
									{
										//obj[i]=createObj((Math.random()*windowSizeX),(Math.random()*windowSizeY));
										obj[i]=createObj(windowSizeX/2,windowSizeY/2);
										
										//Now that we have all the images we needed, we must create the appropriate amount of enemies in our scene. In order to get the appropriate number, we use the 'for' loop. This will continue to spawn one more enemy until we have 11 enemies in our scene.
									}
									obj[0].draw=gerePlayer;
									obj[0].incAngle=25;
									obj[0].image=img_player;
									obj[0].sensX=obj[0].sensY=0;
									obj[0].x=mousePosX;
									obj[0].y=mousePosY;
									
									obj[1].draw=gereProjectile;
									obj[1].image=img_SsEnergie;
									
									gameTimer=window.setInterval(boucle,10);
									
									
								};
							};
						};
					};
				};
				
			}
		
		
function createObj(px,py) //This will add several options when adding the enemies. For example, this set the angles they must appear in.
			{
				return {	x:			px, 
							sensX:		4-(Math.random()*8),
							y:			py, 
							sensY:		4-(Math.random()*8),
							angle:		0,
							incAngle:	2-(Math.random()*4),	
							draw:		gereEnnemis,
							image:		img_Ennemie,
						};
			}
		
		
		
		
		
		//Now that we have our sprites set and the additional settings established, we can focus of the gameplay.
		//Underneath is how the enemies will react when they collide with each other, or the walls.

			var gereEnnemis=function()
			{
				this.x+=this.sensX;
				this.y+=this.sensY;
				this.angle+=this.incAngle;
				if(this.angle>360) this.angle-=360;
				if(collisionBord(this))
				{
					this.sensX*=coefRebondBordEnnemis;
					this.sensY*=coefRebondBordEnnemis;
				}

				//Whenever the enemies collide with each other, the following code will run.
				//It will calculate the angles and the speeds at which they collide, and then it will allow them to bounce off at credible speeds and angles. This will give the player a chance to try and predict the trajectory of the enemies and try to adapt his strategy to their movements. 
				var i;
				for(i=2;i<obj.length;i++)
				{
					if(this!=obj[i])
					{
						if(calculCollision(this,obj[i]))
						{
							if(obj.length<nbImg)
							{
								//obj.push(createObj(this.x,this.y));
								//obj[obj.length-1].sensX=-this.sensX;
								//obj[obj.length-1].sensY=-this.sensY;
							}
						}
					}
				}
				drawObj(this);//this creates the gameobject with all the abilities mentioned in the function.
			}
			
			
				var gerePlayer=function()
				//In this function, we will create the player. 
			{
				var vx=mousePosX-this.x;
				var vy=mousePosY-this.y;
				if(vx>maxIncVitesse) vx=maxIncVitesse; else if(vx<-maxIncVitesse) vx=-maxIncVitesse;
				if(vy>maxIncVitesse) vy=maxIncVitesse; else if(vy<-maxIncVitesse) vy=-maxIncVitesse;
				this.sensX=vx;
				this.sensY=vy;
				if(this.sensX>maxVitesse) this.sensX=maxVitesse; else if(this.sensX<-maxVitesse) this.sensX=-maxVitesse; 
				if(this.sensY>maxVitesse) this.sensY=maxVitesse; else if(this.sensY<-maxVitesse) this.sensY=-maxVitesse; 
				this.x+=this.sensX;
				this.y+=this.sensY;
				//This block of code tells us that the player will be controlled by the movement of the mouse, while setting up certain boundaries: the player cannot leave the borders of the canvas, and cannot exceed a top and minimum speed.
				
				
				// Right now, we call upon out array, and look for the projectile that we will be using as a weapon. We then call upon the caluclatecollision function to determine the collision data.
				if(calculCollision(this,obj[1]))
				{
					obj[1].image=img_Energie;
				}
				// Here, we do the same for the enemeies.
				var i;
				for(i=2;i<obj.length;i++)
				{
					if(calculCollision(this,obj[i]))
					{
					//this code below represents the amount of life we have; We simply call the variable and then set up a simple defeat condition .
					nbVie--;
					if(nbVie<=0){
					      window.clearInterval(gameTimer);
						  alert("GAME OVER")
						  document.location.reload();
						  }
					
						this.incAngle-=5;//if the player is hit, his rotation will decrease.
						if(this.incAngle<=0)
						{
							 window.clearInterval(gameTimer);
						}
					}
				}
				drawObj(this);
			}
			
			//This time, we are going to spawn the projectile that we will be using to destroy our enemies.
		var gereProjectile=function()
			{
				this.x+=this.sensX;
				this.y+=this.sensY;
				this.angle+=this.incAngle;
				if(this.angle>360) this.angle-=360;
				//this piece of code simply allows the projectile to spin on itself. 
				
				if(collisionBord(this))
				{
					this.image=img_SsEnergie;
					this.sensX*=coefRebondBordProjectile;
					this.sensY*=coefRebondBordProjectile;
				}
				//This is what will happen to the projectile when it makes contact with an enemy.
				for(i=2;i<obj.length;i++)
				{
					if(calculCollision(this,obj[i]))
					{
						if(this.image==img_Energie)
						{
							this.image=img_SsEnergie;
							obj.splice(i,1);
						}
					}
				}
				drawObj(this);
			}
			
			
	
function calculCollision(obj1,obj2) //This function is extremely important: this will measure the angles and the speed at which the gameobjects collide at, and then, it will cause them to bounce off each other at appropriate speeds and directions. 
			{
				var dx,dy,dst;
				
				var vitessesX=obj1.sensX-obj2.sensX;
				var vitessesY=obj1.sensY-obj2.sensY;
				dx=obj1.x-obj2.x;
				dy=obj1.y-obj2.y;
				var scalaireAB=(vitessesX*dx)+(vitessesY*dy);
				if(scalaireAB>0)
				{
					return false; // les deux balls s'éloignent.
				}

				
				dx=obj1.x-obj2.x;//this allows you to calculate the angles/speeds of the collisions, and sends them flying back.
				dy=obj1.y-obj2.y;
				dst=Math.sqrt((dx*dx)+(dy*dy));
				if(dst<(obj1.image.width+obj2.image.width)/2)
				{
					var VabNormalizedX=(dx/dst);
					var VabNormalizedY=(dy/dst);

					var VabNormalizedScalaireA=((VabNormalizedX*obj1.sensX)+(VabNormalizedY*obj1.sensY));
					var VabNormalizedScalaireB=((VabNormalizedX*obj2.sensX)+(VabNormalizedY*obj2.sensY));

					var VaScalairizedX=(VabNormalizedX*VabNormalizedScalaireA);
					var VaScalairizedY=(VabNormalizedY*VabNormalizedScalaireA);
					var VbScalairizedX=(VabNormalizedX*VabNormalizedScalaireB);
					var VbScalairizedY=(VabNormalizedY*VabNormalizedScalaireB);

					var resX=VbScalairizedX-VaScalairizedX;
					var resY=VbScalairizedY-VaScalairizedY;

					obj1.sensX=obj1.sensX+resX;
					obj1.sensY=obj1.sensY+resY;
					obj2.sensX=obj2.sensX-resX;
					obj2.sensY=obj2.sensY-resY;
					// on sort coute que coute de la collision
					dx=obj1.x-obj2.x;
					dy=obj1.y-obj2.y;
					dst=Math.sqrt((dx*dx)+(dy*dy));
					while(dst<(obj1.image.width+obj2.image.width)/2)
					{
						obj1.x+=obj1.sensX;
						obj1.y+=obj1.sensY;
						obj2.x+=obj2.sensX;
						obj2.y+=obj2.sensY;
						
						dx=obj1.x-obj2.x;
						dy=obj1.y-obj2.y;
						dst=Math.sqrt((dx*dx)+(dy*dy));
					}

					return true;
				}
				return false;
			}
			
			function collisionBord(obj) //This does the exact same thing as the previous function, but this is when the gameobjects collide with the edges of the canvas.
			{
				var collision=false;
				
				if(obj.x>windowSizeX-(obj.image.width/2))
				{
					obj.x=windowSizeX-(obj.image.width/2);
					if(obj.sensX>0) obj.sensX*=-1;
					collision=true;
				}
				if(obj.x<(obj.image.width/2))
				{
					obj.x=(obj.image.width/2);
					if(obj.sensX<0) obj.sensX*=-1;
					collision=true;
				}
				if(obj.y>windowSizeY-(obj.image.height/2))
				{
					obj.y=windowSizeY-(obj.image.height/2);
					if(obj.sensY>0) obj.sensY*=-1;
					collision=true;
				}
				if(obj.y<(obj.image.height/2))
				{
					obj.y=(obj.image.height/2);
					if(obj.sensY<0) obj.sensY*=-1;
					collision=true;
				}
				return collision;
			}
			
	
	function drawObj(obj)//This function tells the computer how the gameobjects should be created. 
			{
				//ctx.drawImage(image,obj.x,obj.y);
				ctx.save();
				ctx.translate(obj.x,obj.y);
				ctx.rotate(obj.angle*(Math.PI/720));
				ctx.drawImage(obj.image,-obj.image.width/2,-obj.image.height/2);
				ctx.restore();
			}




			function boucle()
			{
			

				var i,x,y;
				
								
				//ctx.clearRect(0,0,windowSizeX,windowSizeY);
				for(x=0;x<windowSizeX;x+=img_background.width)
					for(y=0;y<windowSizeY;y+=img_background.height)
					ctx.drawImage(img_background,x,y);//this will put the background the same size as the computer screen.
					for(i=0;i<obj.length;i++) obj[i].draw();

				var score=i-2;

						ctx.fillStyle = "blue";
						ctx.font = "bold 20px  Bertram";
						ctx.fillText("Mouse : "+mousePosX+","+mousePosY,0,20);
						
				
				ctx.fillStyle = "red";
				ctx.font = "bold 25px Bertram";//this could be used to add a score.
				ctx.fillText("Enemies :"+score,0,50);
						  	if(obj.length == 2){
									window.clearInterval(gameTimer);
									alert("Victory!")
									document.location.reload();
						  }
				
				ctx.fillStyle = "LightGreen";
				ctx.font = "bold 25px Bertram";//this is the amount of HP the PLayer has left.
				ctx.fillText("HP : " +nbVie ,0,80);
				
				timer-=10;
				ctx.fillStyle = "Yellow";
				ctx.font = "bold 25px Bertram";
				ctx.fillText(timer/1000, windowSizeX/2.25, 50);
				if(timer <0){
					      window.clearInterval(gameTimer);
						  alert("GAME OVER")
						  document.location.reload();
						  }
						  
					

			}
			var mousePosX=-1,mousePosY=-1;
			function cursormove(event)
			{
				mousePosX=event.pageX;
				mousePosY=event.pageY;//this takes the position of the mouse, and reveals it ot the player.
			}
		
		</script>
		
	</head>
	<body id="idBody" onload="start();" onmousemove="cursormove(event);">
	</body>
</html>
