const fs = require("fs");

function calcDmgRedList(array, options) {
  const armorTypes = {
    leather: {
      name: "Leather",
      armor: 6,
      dmgRed: 24,
    },
    golden: {
      name: "Golden",
      armor: 7,
      dmgRed: 28,
    },
    chain: {
      name: "Chain",
      armor: 8,
      dmgRed: 32,
    },
    iron: {
      name: "Iron",
      armor: 10,
      dmgRed: 40,
    },
    diamond: {
      name: "Diamond",
      armor: 12,
      dmgRed: 48,
    },
  };
  const EPFLvls = [
    { level: 0, dmgRed: 0 },
    { level: 1, dmgRed: 4 },
    { level: 2, dmgRed: 8 },
    { level: 3, dmgRed: 10.67 },
    { level: 4, dmgRed: 14 },
    { level: 5, dmgRed: 16.8 },
    { level: 6, dmgRed: 20 },
    { level: 7, dmgRed: 22.86 },
    { level: 8, dmgRed: 26 },
    { level: 9, dmgRed: 28.89 },
    { level: 10, dmgRed: 32 },
    { level: 11, dmgRed: 34.91 },
    { level: 12, dmgRed: 38 },
    { level: 13, dmgRed: 40.92 },
    { level: 14, dmgRed: 44 },
    { level: 15, dmgRed: 46.93 },
    { level: 16, dmgRed: 50 },
    { level: 17, dmgRed: 52.94 },
    { level: 18, dmgRed: 56 },
    { level: 19, dmgRed: 58.95 },
    { level: 20, dmgRed: 62 },
    { level: 21, dmgRed: 64.57 },
    { level: 22, dmgRed: 66.91 },
    { level: 23, dmgRed: 68.87 },
    { level: 24, dmgRed: 70.67 },
    { level: 25, dmgRed: 72.16 },
  ];
  const resistanceLvls = [
    { level: 0, dmgRed: 0 },
    { level: 1, dmgRed: 20 },
    { level: 2, dmgRed: 40 },
    { level: 3, dmgRed: 60 },
    { level: 4, dmgRed: 80 },
  ];

  const allDmgReductions = [];

  function calcDmgRed(armor) {
    for (const EPFLvl of EPFLvls) {
      const armorEPFDmgRed = armor.dmgRed + (100 - armor.dmgRed) * (EPFLvl.dmgRed / 100);

      for (const resistanceLvl of resistanceLvls) {
        const totalDmgRed =
          armorEPFDmgRed + (100 - armorEPFDmgRed) * (resistanceLvl.dmgRed / 100);
        const result = `${totalDmgRed}% damage reduction [${armor.name}, ${EPFLvl.level} EPF, ${resistanceLvl.level} Resistence]`;

        allDmgReductions.push(result);
      }
    }
  }

  for (const arrayItem of array) {
    calcDmgRed(armorTypes[arrayItem]);
  }

  const splitAllDmgReductions = [];
  for (const dmgReductions of allDmgReductions) {
    splitAllDmgReductions.push(dmgReductions.split("%"));
  }

  const orderedSplitAllDmgReductions = splitAllDmgReductions.sort((a, b) => {
    if (Number(a[0]) < Number(b[0])) return -1;
    else if (Number(a[0]) > Number(b[0])) return 1;
    else return 0;
  });

  let filteredOrderedSplitAllDmgReductions;
  if (options.filter === true) {
    filteredOrderedSplitAllDmgReductions = [orderedSplitAllDmgReductions[0]];
    for (let i = 1; i < orderedSplitAllDmgReductions.length; i++) {
      if (orderedSplitAllDmgReductions[i - 1][0] !== orderedSplitAllDmgReductions[i][0]) {
        filteredOrderedSplitAllDmgReductions.push(orderedSplitAllDmgReductions[i]);
      }
    }
  } else {
    filteredOrderedSplitAllDmgReductions = orderedSplitAllDmgReductions;
  }

  const orderedAllDmgReductions = [];
  for (const orderedSplitDmgReduction of filteredOrderedSplitAllDmgReductions) {
    orderedAllDmgReductions.push(orderedSplitDmgReduction.join(" "));
  }

  if (options.writeToFile === true) {
    fs.writeFile("damageReductions.json", JSON.stringify(orderedAllDmgReductions), () => {
      if (err) throw err;
    });
  } else {
    return orderedAllDmgReductions;
  }
}

function calcDmgList(array, options) {
  const swordTypes = {
    wooden: {
      name: "Wooden",
      dmg: 5,
    },
    golden: {
      name: "Golden",
      dmg: 5,
    },
    stone: {
      name: "Stone",
      dmg: 6,
    },
    iron: {
      name: "Iron",
      dmg: 7,
    },
    diamond: {
      name: "Diamond",
      dmg: 8,
    },
  };
  const sharpLvls = [
    { level: 0, dmg: 0 },
    { level: 1, dmg: 1.25 },
    { level: 2, dmg: 2.5 },
    { level: 3, dmg: 3.75 },
    { level: 4, dmg: 5 },
    { level: 5, dmg: 6.25 },
    { level: 6, dmg: 7.5 },
    { level: 7, dmg: 8.75 },
    { level: 8, dmg: 10 },
    { level: 9, dmg: 11.25 },
    { level: 10, dmg: 12.5 },
  ];
  const weaknessLvls = [
    { level: 0, dmgRed: 0 },
    { level: 1, dmgRed: 0.5 },
    { level: 2, dmgRed: 1 },
    { level: 3, dmgRed: 1.5 },
    { level: 4, dmgRed: 2 },
    { level: 5, dmgRed: 2.5 },
    { level: 6, dmgRed: 3 },
    { level: 7, dmgRed: 3.5 },
    { level: 8, dmgRed: 4 },
    { level: 9, dmgRed: 4.5 },
    { level: 10, dmgRed: 5 },
  ];

  const allDmg = [];

  function calcDmg(weapon) {
    for (const sharpLvl of sharpLvls) {
      const weaponSharpDmg = weapon.dmg + sharpLvl.dmg;

      for (const weaknessLvl of weaknessLvls) {
        const totalDmg = weaponSharpDmg - weaknessLvl.dmgRed;
        const result = `${totalDmg}% damage [${weapon.name}, ${sharpLvl.level} Sharp, ${weaknessLvl.level} Weakness]`;

        allDmg.push(result);
      }
    }
  }

  for (const arrayItem of array) {
    calcDmg(swordTypes[arrayItem]);
  }

  const splitAllDmg = [];
  for (const dmg of allDmg) {
    splitAllDmg.push(dmg.split("%"));
  }

  const orderedSplitAllDmg = splitAllDmg.sort((a, b) => {
    if (Number(a[0]) < Number(b[0])) return -1;
    else if (Number(a[0]) > Number(b[0])) return 1;
    else return 0;
  });

  let filteredOrderedSplitAllDmg;
  if (options.filter === true) {
    filteredOrderedSplitAllDmg = [orderedSplitAllDmg[0]];
    for (let i = 1; i < orderedSplitAllDmg.length; i++) {
      if (orderedSplitAllDmg[i - 1][0] !== orderedSplitAllDmg[i][0]) {
        filteredOrderedSplitAllDmg.push(orderedSplitAllDmg[i]);
      }
    }
  } else {
    filteredOrderedSplitAllDmg = orderedSplitAllDmg;
  }

  const orderedAllDmg = [];
  for (const orderedSplitDmg of filteredOrderedSplitAllDmg) {
    orderedAllDmg.push(orderedSplitDmg.join(" "));
  }

  fs.writeFile("damages.json", JSON.stringify(orderedAllDmg), () => {
    if (err) throw err;
  });
}

function calcHitsToKill(dmg, allDmgRed, options) {
  const resultList = [];

  for (let dmgRed of allDmgRed) {
    dmgRed = dmgRed.split("damage reduction");

    const actualDmg = dmg * ((100 - dmgRed[0]) / 100);
    const hitsToKill = 20 / actualDmg;

    if (hitsToKill >= 5 && hitsToKill <= 5.5) {
      resultList.push(
        hitsToKill + " hits to kill | " + dmgRed[0] + " damage reduction | " + dmgRed[1]
      );
    }
  }

  if (options.writeToFile === true) {
    fs.writeFile("hits.json", JSON.stringify(resultList), () => {
      if (err) throw err;
    });
  } else {
    console.log(resultList);
  }
}

// // get damage list
// calcDmgList(["diamond"], {
//   filter: true,
// });

// // get damage reduction list
// const list = calcDmgRedList(["chain"], {
//   filter: true,
//   writeToFile: false,
// });

// // get hits to kill list
// const array = [7.25];
// for (let i = 0; i < array.length; i++) {
//   console.log("DAMAGE: " + array[i]);
//   calcHitsToKill(array[i], list, {
//     writeToFile: false,
//   });
// }

// get kills needed to upgrade tier weapon tier 1-20
let previousTierKills = 3;
let totalKills = previousTierKills;
console.log("Tier 1 " + previousTierKills);
for (let i = 2; i < 21; i++) {
  previousTierKills *= 1.1;
  previousTierKills += 1;
  totalKills += previousTierKills;
  console.log("Tier " + i + " " + previousTierKills);
}
console.log("Total kills " + totalKills);
