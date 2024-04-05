
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


operationDisplayClasses.toggle("fontShrinkActive")
resultDisplayClasses.toggle("fontGrowActive")
}



function calculatrice(){
   const calculatorKeys = document.querySelector(".calculator-keys");
   let operation = "";
   let checkLastOperation = false;


   calculatorKeys.addEventListener("click", handleNumber)

   function handleNumber(event) {
    let regexNumber = /^[0-9]{1,1}$/;
    let regexOperator1 = /^[x\/%]{1,1}$/;
    let regexOperator2 = /^[+-]{1,1}$/;
    let regexOperator = /^[x\/%+-]$/;

    let lastCharacter = operation[operation.length - 1];
    if(lastCharacter === undefined)
        lastCharacter = "";

    const target = event.target.value
    /*---------- NUMBER ----------------------*/
    if(regexNumber.test(target)){
      if(target === "0"){
        if(checkLastOperation === true){
          changeDisplay()
           operation = "";
           checkLastOperation = false;
           displayOperation(target, operation)
         }
        else if(regexOperator.test(lastCharacter)){
          operation += `${target}.`;
          displayOperation(target, operation);
        }  
        else if(operation !== ""){
        operation += "0";
        displayOperation("0", operation)
        }
      }
      else{
        if(checkLastOperation === true){
          changeDisplay()
           operation = "";
           checkLastOperation = false;
         }
        operation += target;
        displayOperation(target, operation)
      }
    }/*------------ OPERATOR --------------------*/
    else if(regexOperator.test(target)){

          if(checkLastOperation){
          //On test si une opération vient d'être validé
            operation += target
            changeDisplay()
            checkLastOperation = false
            displayOperation(target, operation)

          }
          else if(regexOperator.test(lastCharacter)){
          // On test si le dernier character est un opérateur
            if(regexOperator2.test(target)){
            // On test si l'opérateur sélectionné est un - ou un +
             if(regexOperator2.test(lastCharacter))
              operation = operation.replace(/.$/, target)
             else if(regexOperator1.test(lastCharacter))
              operation += target
              
              displayOperation(target, operation)
            }
            else if(regexOperator1.test(target)){
            // On test si l'opérateur sélectionné est un x, % ou /
              for(let i = operation.length - 1; i >= 0; i--){
                if(regexOperator.test(operation[i]))
                  operation = operation.replace(/.$/, "")
                else
                  break
              }
              operation += target
              displayOperation(target, operation)
            }
          }
          else if(operation === ""){
            // On test si l'opération est égal à nul
            if(target !== "%"){
              operation += `0${target}`
              displayOperation(target, operation)
            }
          }
          else if(regexNumber.test(lastCharacter) || /./.test(lastCharacter)){
            operation += target
            displayOperation(target, operation)
          }
    }/*--------------------AC------------------------ */
    else if(target === "AC"){
      if(checkLastOperation === true){
        changeDisplay()
        checkLastOperation = false;
      }

      operation = "";
      displayOperation(0, operation)
    }/*-------------------CE---------------------------- */
    else if(target === "CE"){
      if(operation !== "" && checkLastOperation === false){

        operation = operation.replace(/.$/, "");

      if(regexOperator.test(operation[operation.length - 1])){
        let copyOperation = operation
        for(let i = copyOperation.length - 1; i >= 0 ; i--){
         if(regexOperator.test(copyOperation[i]))
           copyOperation.replace(/.$/, "")
         else
           break
        }
        displayOperation(operation[operation.length - 1], copyOperation)
      }
      else if(operation.length > 0)
        displayOperation(operation[operation.length - 1], operation)
      else if(operation.length == 0)
        displayOperation(0, operation)

      }
    }/*--------------------DotBtn------------------------- */
    else if(target === "."){
      if(checkComma(operation)){
        if(checkLastOperation){
          changeDisplay()
          checkLastOperation = false;
          operation = `0${target}`
          displayOperation(target, operation)
        }
        else if(regexOperator.test(lastCharacter) || operation === ""){
          operation += `0${target}`
          displayOperation(target, operation)
        }
        else if(regexNumber.test(lastCharacter)){
          operation += target
          displayOperation(target, operation)
        }
      }
    }/*----------------------EnterOperation------------- */
    else if(target === "="){
      try{
        if(operation === ""){
          displayOperationSubmit(0, 0)
        }
        else if(checkOperation(operation)  && checkLastOperation === false){
          if(regexOperator.test(lastCharacter)){
            for(let i = operation.length - 1; i >= 0; i--){
              if(regexOperator.test(operation[i]))
                operation = operation.replace(/.$/, "")
              else
                break
            }
          
          }
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
        else if(checkLastOperation === false){
            displayOperationSubmit("ERREUR", "ERREUR")
            operation = "";
        }
      }
    catch{
        displayOperationSubmit("ERREUR", "ERREUR")
        operation = "";
      }
    }
  }
 }