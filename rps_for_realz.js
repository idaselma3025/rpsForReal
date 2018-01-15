// Initialize Firebase
var config = {
  apiKey: "AIzaSyDW8qt12Jha2eUYqLJmgqgufXJvJPZXP4I",
  authDomain: "rpsforrealz.firebaseapp.com",
  databaseURL: "https://rpsforrealz.firebaseio.com",
  projectId: "rpsforrealz",
  storageBucket: "",
  messagingSenderId: "543564205334"
};
firebase.initializeApp(config);

var database = firebase.database();

var name;

var playerConnected=database.ref(".info/connected");

var playerRef=database.ref("players");

var playerData = {
  name:name,
  losses:0,
  wins:0
}

var removeData ={};

var key1 = 1;
var key2 = 2;

var newPlayerKey=playerRef.push().key;

var updates = {};

var hasPlayer1;

$("#add-player").on("click",function(){
    name=$("#name-input").val().trim();
    updates["/players/" + newPlayerKey] = playerData;
    playerData.name=name;
    return database.ref().update(updates);
})

playerConnected.on("value",function(snapshot){
  if(snapshot.val()){
  updates["/players/"+newPlayerKey]=removeData;
  return database.ref().onDisconnect().update(updates);
}
})

database.ref("players").orderByChild("name").limitToLast(2).on("child_added",function(snapshot){
  var player = snapshot.val().name;
  var key = snapshot.key;
    console.log(player + key);
});
