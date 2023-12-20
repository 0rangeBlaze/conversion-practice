var answer = 0;

function toBinary(dec){
    return "0b" + Number(dec).toString(2);
}

function toHex(dec){
    return "0x" + Number(dec).toString(16).toUpperCase();
}

function randomOperand(){
    let num = Math.floor(Math.random() * 64);
    let text;


    var base = Math.floor(Math.random() * 3);
    if(base == 0){
        text = toBinary(num);
    }
    else if(base == 1) {
        text = Number(num).toString(10);
    }
    else if(base == 2) {
        text = toHex(num);
    }


    bitShift = Math.random();
    if(0.5 < bitShift <= 0.75) {
        let shift = Math.floor(Math.random()*2) + 1;
        text = "(" + text + " << " + shift + ")";
        num <<= shift;
    }
    else {
        let shift = Math.floor(Math.random()*2) + 1;
        text = "(" + text + " >> " + shift +")";
        num >>= shift;
    }
    return [num, text];
}

function generate() {
    document.getElementById("input").value = "";
    document.getElementById("result").innerHTML = "";
    var operators = [
        ["|", (a,b) => a|b],
        ["^", (a,b) => a^b],
        ["&", (a,b) => a&b]
    ]


    var question = "int a = ";


    var operandNum = Math.floor(Math.random() * 4);

    let [num, text] = randomOperand();
    answer = num;
    question += text;
    

    for(let i = 0; i < operandNum-1; i++) {
        let operator = Math.floor(Math.random() * operators.length);
        question += " " + operators[operator][0] + " ";
        [num, text] = randomOperand();
        question += num;
        answer = operators[operator][1](answer,num);

    }
    question += ";";


    var base = Math.floor(Math.random() * 3);
    if(base == 0){
        answer = toBinary(answer);
        question += "<br> Enter your answer in binary.";
    }
    else if(base == 1) {
        question += "<br> Enter your answer in decimal.";
    }
    else if(base == 2) {
        answer = toHex(answer);
        question += "<br> Enter your answer in hexadecimal.";
    }

    document.getElementById("question").innerHTML = question;
}

function submit() {
    var input = document.getElementById("input").value;
    var result;
    if(input == answer) {
        result = "Correct";
    }
    else{
        result = "Incorrect, the correct answer is: " + answer;
    }
    document.getElementById("result").innerHTML = result;
}