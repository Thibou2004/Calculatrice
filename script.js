
/**
 * Cette fonction permet d'afficher le calcul en cours,
 * le caractère que l'utilisateur vient d'utiliser, 
 * et le résultat du calcul
 * @param {string} value 
 * @param {string} operation 
 */
function displayOperation(value, operation){
  let affichageOperation = document.querySelector(".operation-display");
  let affichageResultat = document.querySelector(".result-display"); 

  if(/[0-9]/.test(value) && operation !== ""){
  let newOperation = operation.split('').map(x => {
    if(x == "x")
      return "*"
    else
      return x;
   }).join('');  
   affichageResultat.innerText = `= ${eval(newOperation)}`;
  }
  else
  affichageResultat.innerText = value;
  

  if(operation === "")
    affichageOperation.innerText = "0"
  else
    affichageOperation.innerText = operation;
}


/**
* Cette fonction permet d'afficher le calcul en cours,
* le caractère que l'utilisateur vient d'utiliser, 
* et le résultat du calcul
* @param {string} value 
* @param {string} operation 
*/
function displayOperationSubmit(value, operation){
let affichageOperation = document.querySelector(".operation-display");
let affichageResultat = document.querySelector(".result-display"); 

affichageOperation.innerText = value;
affichageResultat.innerText = operation;
}



/**
* Cette fonction permet de vérifier si le calcul a été correctement tapé
* @param {string} operation 
*/
function checkOperation(operation){
  let newOperation = operation;
  let expression = /^[-+]?\d+([,.]\d*)?([+\-*/%]-?\d+([,.]\d+)?)*$/;
  let scientificExpression = /^[-+]?\d+([,.]\d*)?([+\-*/%]-?\d+([,.]\d*)?)*([eE][-+]?\d+)?$/;
  newOperation = newOperation.split('').map(x => {
   if(x == "x")
     return "*"
   else
     return x;
  }).join('');
  
  return expression.test(newOperation) || scientificExpression;

}

/**
* Cette fonction va permettre de vérifier lorsque l'on
* clique sur le boutton virgule si le nombre qui est entrée
* a déja une virgule, si c'est le cas on ajoute pas de virgule.
* @param {string} operation
*/
function checkComma(operation){
 let regexOperateur = /^[x+-\/]{1,1}$/;
 let regexVirgule = /^[\.]{1,1}$/;
 for(let i = operation.length - 1; i >= 0; i--){
     if(regexOperateur.test(operation[i]) && !regexVirgule.test(operation[i])){
       return true;
     }
     else if(regexVirgule.test(operation[i])){
       return false;
     }
   }
 return true;
}

/**
* Cette fonction va permettre de changer l'affichage des nombres sur la
* console lorsque l'on entre une opération valide et lorsque l'on entre
* une nouvelle opération. 
*/
function changeDisplay() {
let resultDisplay = document.querySelector(".result-display");
let operationDisplay = document.querySelector(".operation-display");
let resultDisplayClasses = resultDisplay.classList;
let operationDisplayClasses = operationDisplay.classList;


operationDisplayClasses.toggle("big-font")
resultDisplayClasses.toggle("big-font")
}



function calculatrice(){
   let NumberButton = document.querySelectorAll(".number");
   let operation = "";
   let checkLastOperation = false;

   for(let i = 0; i < NumberButton.length; i++){
      NumberButton[i].addEventListener("click", () => {
           if(checkLastOperation === true){
            changeDisplay()
             operation = "";
             checkLastOperation = false;
           }
           
           operation += NumberButton[i].value;
           displayOperation(NumberButton[i].value, operation)
       })
   }
   let regexNumber = /^[0-9\.]{1,1}$/;
   let regexOperator1 = /^[x\/%]{1,1}$/;
   let regexOperator2 = /^[+-]{1,1}$/;

   let operator = document.querySelectorAll(".operator");
   for(let i = 0; i < operator.length; i++){
       operator[i].addEventListener("click", () => {
         let lastCharacter = operation[operation.length - 1];
         if(lastCharacter === undefined)
           lastCharacter = "";
         if(regexNumber.test(lastCharacter)){
             if(checkLastOperation === true){
                 changeDisplay()
                 checkLastOperation = false;
             }
 
             operation += operator[i].value;
             displayOperation(operator[i].value, operation)

         }
         else if(regexOperator2.test(operator[i].value) && operation != ""){
          if(regexOperator1.test(lastCharacter)){
             if(checkLastOperation === true){
               changeDisplay()
               checkLastOperation = false;
             }
             operation += operator[i].value;
             displayOperation(operator[i].value, operation);
           }
           else if(regexOperator2.test(lastCharacter)){
             if(checkLastOperation === true){
               changeDisplay()
               checkLastOperation = false;
             }

             operation = operation.replace(/.$/, "");
             operation += operator[i].value;
             displayOperation(operator[i].value, operation);
           }   
         }
         else if(regexOperator1.test(operator[i].value) && operation != ""){
          if(checkLastOperation === true){
            changeDisplay()
            checkLastOperation = false;
          }
           if(regexOperator1.test(lastCharacter) || regexOperator2.test(lastCharacter)){
             for(let i = operation.length - 1; i >= 0; i--){
               if(regexOperator1.test(operation[i]) || regexOperator2.test(operation[i]))
                 operation = operation.replace(/.$/, "");
               else
                 break;
             }

             operation += operator[i].value;
             displayOperation(operator[i].value, operation);
           }
         }
         else if(operation == ""){
           if(checkLastOperation === true){
               changeDisplay()
               checkLastOperation = false;
           }
           operation += `0${operator[i].value}`;
           displayOperation(`${operator[i].value}`, operation)
         }
       });
   }


   let AC = document.querySelector(".AC");

     AC.addEventListener("click", () => {
       if(checkLastOperation === true){
           changeDisplay()
           checkLastOperation = false;
       }

       operation = "";
       displayOperation(0, operation)
     })
   
   let deleteCharacter = document.querySelector(".delete");
    
     deleteCharacter.addEventListener("click", () => {
       if(operation !== "" && checkLastOperation === false){
         operation = operation.replace(/.$/, "");
         let lastCharacter = operation[operation.length - 1];
         if(lastCharacter === undefined)
           lastCharacter = 0;

         displayOperation(lastCharacter, operation);
       }
     })
    
     let number0 = document.querySelector(".number-0")
     let comma = document.querySelector(".comma");

   comma.addEventListener("click", () => {
     if(checkComma(operation)){
       if(checkLastOperation !== true){
         let dernierCharacter = operation[operation.length - 1];
         if(dernierCharacter === undefined)
             dernierCharacter = "";
 
           if(dernierCharacter == "x" || dernierCharacter == "/" || dernierCharacter == "+" || dernierCharacter == "-" || dernierCharacter == ""){
             operation += `${number0.value}${comma.value}`;
           displayOperation(`${comma.value}`, operation)
           }
           else{
           operation += comma.value;
           displayOperation(comma.value, operation)
           }
       }
       else if(checkLastOperation === true){
         changeDisplay()
         checkLastOperation = false;
         operation = `${number0.value}${comma.value}`;
         displayOperation(`${comma.value}`, operation)
       }
     }
     
   })

   

   
   number0.addEventListener("click", () => {
     let dernierCharacter = operation[operation.length - 1];
         if(dernierCharacter === undefined)
           dernierCharacter = "";
         
         if(checkLastOperation === true){
           changeDisplay()
           operation = "0";
           checkLastOperation = false;
           displayOperation("0", operation)
         }
         else if(regexOperator1.test(dernierCharacter) || regexOperator2.test(dernierCharacter)){
           operation += `${number0.value}${comma.value}`;
           displayOperation(`${number0.value}`, operation);
           console.log("0")
         }  
         else if(dernierCharacter != "0" && operation !== ""){
           operation += "0";
           displayOperation("0", operation)
           console.log("02")
         }
       
   })

   
   let enterOperation = document.querySelector(".enter-operation");
   
   enterOperation.addEventListener("click", () => {
   try{
       if(checkOperation(operation)){
         let lastCharacter = operation[operation.length -1];
         if(regexOperator1.test(lastCharacter) || regexOperator2.test(lastCharacter))
           operation = operation.replace(/.$/, "");
         
           let newOperation = operation.split('').map(x => {
               if(x == "x")
                 return "*"
               else
                 return x;
              }).join('');
           
           changeDisplay()

           displayOperationSubmit(operation, `= ${eval(newOperation)}`)
           operation = `${eval(newOperation)}`;
           checkLastOperation = true;
       }
       else{
           displayOperationSubmit("ERREUR", "ERREUR")
           operation = "";
       }
   }
   catch{
       displayOperationSubmit("ERREUR", "ERREUR")
       operation = "";
   }
   })
}




