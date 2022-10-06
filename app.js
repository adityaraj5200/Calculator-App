let style1_path = "style1.css"
let style2_path = "style2.css"

let link = document.createElement('link');
link.rel = "stylesheet";
link.href = style1_path;

let head = document.getElementsByTagName('head')[0];
head.appendChild(link);

let curr_theme;

function apply_style1(){
    curr_theme = 1;
    link.href = style1_path;
}

function apply_style2(){
    curr_theme = 2;
    link.href = style2_path;
}

apply_style1();

// uptil here was styling part

/* Below is the calculator's keypresses and on-screen keys logic part */

const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
    btn.onclick = () => {
        if(btn.id=="RESET")
            screen.innerText = "";
        else if(btn.id=="DEL"){
            let str = screen.innerText;
            screen.innerText = str.substr(0,str.length-1);
        }
        else if(btn.id=="equal_btn"){
            let evaluated_val = eval(screen.innerText);
            screen.innerText = evaluated_val;
        }
        else{
            screen.innerText += btn.id;
        }


        btn.style.filter = "brightness(50%)";

        setTimeout(function () {
            btn.style.filter = "brightness(100%)";
        }, 50);
    }
});



const accepted_key_strokes = new Set(["1","2","3","4","5","6","7","8","9","0",".","+","-","*","/",]);

document.addEventListener("keydown", (event) => {
    document.activeElement.blur();

    let curr_key_stroke = event.key;
    let curr_key_code = event.code;
    
    let btn_id = curr_key_stroke;
    
    if(curr_key_stroke == "c"){
        btn_id = "RESET";
        screen.innerText = "";
    }
    else if(curr_key_stroke == "t"){
        btn_id = null;
        if(curr_theme == 1)
            apply_style2();
        else
            apply_style1();
    }
    else if(curr_key_stroke == "Backspace"){
        btn_id = "DEL";
        let str = screen.innerText;
        screen.innerText = str.substr(0,str.length-1);
    }
    else if(curr_key_stroke == "Enter"){
        btn_id = "equal_btn";
        let evaluated_val = eval(screen.innerText);
        if(evaluated_val == undefined){
            evaluated_val = "";
        }
        screen.innerText = evaluated_val;
    }
    else if(accepted_key_strokes.has(curr_key_stroke)){
        btn_id = curr_key_stroke;
        screen.innerText += curr_key_stroke;
    }

    
    if(btn_id !== null){
        const btn_element = document.getElementById(btn_id);
    
        btn_element.style.filter = "brightness(50%)";
    
        setTimeout(function () {
            btn_element.style.filter = "brightness(100%)";
        }, 50);
    }
});


const bar1 = document.getElementsByClassName("bar1")[0];
bar1.onclick = () => {
    apply_style1(); 
}

const bar2 = document.getElementsByClassName("bar2")[0];
bar2.onclick = () => {
    apply_style2();
}