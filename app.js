const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);

const printProfileData = profileDataArr => {  //printing command line arument one at a time with this function
    for (let i = 0; i < profileDataArr.length; i += 1) {
      console.log(profileDataArr[i]);
    }
    console.log('================');

    profileDataArr.forEach((profileItem) => {
      console.log(profileItem)
    });

  };

  
printProfileData(profileDataArgs);




