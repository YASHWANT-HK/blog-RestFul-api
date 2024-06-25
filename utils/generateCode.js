const generateCode = (codeLength) => {
    const number = String(Math.random()).split(".")[1].split(""); //random number generation: 
    //math.random generates a random number in format (0.6356736...), split(".") will split a no. (0, 6356736....),
    //[1]-tells using only second parameter that is a no. after decimal, split("")-will split each number
    const length = number.length;
    let code = "";

    if(!codeLength){
        codeLength = 4;
    }

    for(let i=0; i< codeLength; i++) {
        code = code + number[length - (i+1)];
    }
    return code;
};

module.exports = generateCode;