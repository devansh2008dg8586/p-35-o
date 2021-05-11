var dog,sadDog,happyDog,dataBase
var foodS,foodStock
var fedTime,lastFed
var feed,addFood
var foodObj

function preload(){
sadDog=loadImage("images/Dog.png")
happyDog=loadImage("images/dogimg1.png")
}
function setup(){
dataBase=fireBase.dataBase();
createCanvas(1000,400)

foodObj = new Food();

foodStock=dataBase.ref('Food')
foodStock.on("value",readStock)

dog=createSprite(800,200,150,150)
dog.addImage(sadDog)
dog.scale=0.15  

feed=createButton("feedTheDog")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood=createButton("AddFood")
addFood.position(800,95)
addFood.mousePressed(addFoods)

}
function draw(){
background(46,139,87)
foodObj.display();

fedTime=dataBase.ref('fedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("lastFed:"+lastFed%12+"pm",350,30)

}else if(lastFed==0){
  text("lastFed:12 AM",350,30)
}else{
text("lastFed:"+lastFed+"Am",350,30)
}

darwSprites();

}
function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)

}
function feedDog(){
dog.addImage(happyDog)

if(foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(foodObj).getFoodStock()
}else{
  foodObj.updateFoodStock(foodObj).getFoodStock()
}
dataBase.ref('/').update({
  food:foodObj.getFoodStock()

})
function addFood(){
  foodS++
  dataBase.ref('/').update({
    Food:foodS
  })
}
}
