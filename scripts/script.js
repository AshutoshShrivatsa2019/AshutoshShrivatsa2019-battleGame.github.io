// (function () {

//   console.log("Hello World");

// })();

(function(){



const url = "https://raw.githubusercontent.com/AshutoshShrivatsa2019/hello-world/json/battles.json";
function getJSONData(url) {

  let httpReq = new XMLHttpRequest();
  httpReq.open("GET", url, false);
  httpReq.send();
  return httpReq.responseText;

  //     var xhr = new XMLHttpRequest();
  //     xhr.open("GET", url, true);
  //     xhr.onload = function (e) {
  //     if (xhr.readyState === 4) {
  //     if (xhr.status === 200) {
  //       console.log(xhr.responseText);
  //     } else {
  //       console.error(xhr.statusText);
  //     }
  //   }
  // };
  // xhr.onerror = function (e) {
  //   console.error(xhr.statusText);
  // };
  // xhr.send(null);

}

const jsonObj = JSON.parse(getJSONData(url));

console.log(jsonObj);

console.log(jsonObj.length);





///////////////////////////////////////////////////////////////////////////////////////////

var outputData =
{

  'most_active': {
    'attacker_king': '',
    'defender_king': '',
    'region': '',
    'name': ''
  },
  'attacker_outcome': {
    'win': '', // total win
    'loss': '' // total loss
  },
  'battle_type': [], // unique battle types
  'defender_size': {
    'average': '',
    'min': '',
    'max': ''
  }
};





/* Function for fetching most-active attacker,defender,name,region */


function getMostActive(array) {
  if (array.length == 0)
    return null;

  var modes = [];
  var modeMap = {}, maxCount = 1;

  for (var i = 0; i < array.length; i++) {
    var el = array[i];

    if (modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;

    if (modeMap[el] > maxCount) {
      modes = [el];
      maxCount = modeMap[el];
    }
    else if (modeMap[el] == maxCount) {
      modes.push(el);
      maxCount = modeMap[el];
    }
  }
  return modes;
}


/* Creating array of Battle-Type */

var arrBattleTypes;
arrBattleTypes = jsonObj.map(a => a.battle_type);

/*Finding unique Battle-Types from Above Array*/
var uniqueBattleTypes;

uniqueBattleTypes = arrBattleTypes.filter((item, pos) => {
  return arrBattleTypes.indexOf(item) == pos && item != "";
})


/*Function for counting numbe rof wins/losses*/
function countBattleOutcomes(array) {
  var counts = [];

  for (var i = 0; i < array.length; i++) {
    var num = array[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return counts;
}


/*Finding AVG size of Defender */
var avgDefenderSize = 0;

// avgDefenderSize=arrDefenderSize.reduce((a,b)=>{
//   return a+b;
// },0)/arrDefenderSize.length;

var arrAvgDefSize = jsonObj.filter(val => val.defender_size !== null).map(a => a.defender_size);
console.log(arrAvgDefSize);
avgDefenderSize = arrAvgDefSize.reduce((a, b) => {
  return a + b;
}, 0) / arrAvgDefSize.length;



/*1)Internally Populating Array of all Attackers/Defenders/Region/name and Paasing the Array to Function*/
var attacker_king = getMostActive(jsonObj.map((att) => att.attacker_king)).toString();
var defender_king = getMostActive(jsonObj.map((def) => def.defender_king)).toString();
var region = getMostActive(jsonObj.map((r) => r.region)).toString();
var name = getMostActive(jsonObj.map((n) => (n.name))).toString();

/*Finding Min/Max Size */
var minVal = jsonObj.filter((val) => val.defender_size !== null).map((m) => m.defender_size);
minVal = Math.min(...minVal);
// var min=Math.min(arrDefenderSize);
var max = Math.max(...jsonObj.filter((val) => val.defender_size !== null).map((m) => m.defender_size))


/*Populating O/P Object*/
var arrMostActive = {};
arrMostActive["attacker_king"] = attacker_king;
arrMostActive["defender_king"] = defender_king;
arrMostActive["region"] = region;
arrMostActive["name"] = name;

var arrAttackerOutcome = {};
arrAttackerOutcome["win"] = countBattleOutcomes(jsonObj.map((w => w.attacker_outcome))).win.toString();
arrAttackerOutcome["loss"] = countBattleOutcomes(jsonObj.map(l => l.attacker_outcome)).loss.toString();

var arrBattleType = uniqueBattleTypes.toString();

var arrDefenderSize = {};
arrDefenderSize["average"] = Math.round(avgDefenderSize).toString();
arrDefenderSize["min"] = minVal;
arrDefenderSize["max"] = max;


var myJSONobj = {};
myJSONobj["most_active"] = arrMostActive;
myJSONobj["attacker_outcome"] = arrAttackerOutcome;
myJSONobj["battle_type"] = arrBattleType;
myJSONobj["defender_size"] = arrDefenderSize;

console.log(JSON.stringify(myJSONobj));

console.log(JSON.stringify(myJSONobj.most_active.attacker_king));



outputData = myJSONobj;
console.log(outputData);

$("document").ready(function(){
  $("pre").text(JSON.stringify(outputData,null,'\t'));
  console.log(JSON.stringify(outputData,null,'\t'));
})


})();