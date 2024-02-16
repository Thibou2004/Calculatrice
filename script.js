
/**
 * Cette fonction permet d'afficher le calcul en cours,
 * le caractère que l'utilisateur vient d'utiliser, 
 * et le résultat du calcul
 * @param {string} value 
 * @param {string} operation 
 */
function afficherOperation(value, operation){
   let affichageOperation = document.getElementById("affichage-operation");
   let affichageResultat = document.getElementById("affichage-resultat");
   


   affichageResultat.innerText = value;
   affichageOperation.innerText = operation;
}



/**
 * Cette fonction permet de vérifier si le calcul a été correctement tapé
 * @param {string} operation 
 */
function verifierOperation(operation){
   let newOperation = operation;
   let expression = /^[-+]?\d+([,.]\d*)?([+\-*/]-?\d+([,.]\d+)?)*$/;
   let regexNbScientifique = /^[-+]?\d+([,.]\d*)?([+\-*/]-?\d+([,.]\d*)?)*([eE][-+]?\d+)?$/;
   newOperation = newOperation.split('').map(x => {
    if(x == "x")
      return "*"
    else
      return x;
   }).join('');
   
   return expression.test(newOperation) ||regexNbScientifique;

}


function calculatrice(){
    let buttonNombres = document.querySelectorAll(".nombre");
    let operation = "";
    let verificationOperationPrecedente = false;
    for(let i = 0; i < buttonNombres.length; i++){
        buttonNombres[i].addEventListener("click", () => {
            if(verificationOperationPrecedente === true){
              operation = "";
              verificationOperationPrecedente = false;
            }
            
            operation += buttonNombres[i].value;
            afficherOperation(buttonNombres[i].value, operation)
        })
    }

    let operateur = document.querySelectorAll(".operateur");
    for(let i = 0; i < operateur.length; i++){
        operateur[i].addEventListener("click", () => {
          let dernierCharacter = operation[operation.length - 1];
          if(dernierCharacter === undefined)
            dernierCharacter = "";
          
          if(dernierCharacter == "x" || dernierCharacter == "/"){
          
             if(operateur[i].value == "+" || operateur[i].value == "-"){
              if(verificationOperationPrecedente === true)
                 verificationOperationPrecedente = false;
              let affichageResultat = document.getElementById("affichage-resultat");
              if(affichageResultat.textContent !== "0" && operation == ""){
                operation = affichageResultat.textContent;
                operation += operateur[i].value;
                afficherOperation(operateur[i].value, operation)
              }
              else{
                if(operation == ""){
                  operation += `0${operateur[i].value}`;
                  afficherOperation(`${operateur[i].value}`, operation)
                }
                else{
                operation += operateur[i].value;
                afficherOperation(operateur[i].value, operation)
                }
              }
            }
          }
          else if(dernierCharacter != "x" && dernierCharacter != "/" && dernierCharacter != "+" && dernierCharacter != "-" && dernierCharacter != ""){
            if(verificationOperationPrecedente === true)
                verificationOperationPrecedente = false;
              let affichageResultat = document.getElementById("affichage-resultat");
              if(affichageResultat.textContent !== "0" && operation == ""){
                operation = affichageResultat.textContent;
                operation += operateur[i].value;
                afficherOperation(operateur[i].value, operation)
              }
              else{
                if(operation == ""){
                  operation += `0${operateur[i].value}`;
                  afficherOperation(`${operateur[i].value}`, operation)
                }
                else{
                operation += operateur[i].value;
                afficherOperation(operateur[i].value, operation)
                }
              }
          }
          else if(dernierCharacter == "" && operateur[i].value == "-" && operateur[i].value == "+"){
            if(verificationOperationPrecedente === true)
                verificationOperationPrecedente = false;
              let affichageResultat = document.getElementById("affichage-resultat");
              if(affichageResultat.textContent !== "0" && operation == ""){
                operation = affichageResultat.textContent;
                operation += operateur[i].value;
                afficherOperation(operateur[i].value, operation)
              }
              else{
                if(operation == ""){
                  operation += `0${operateur[i].value}`;
                  afficherOperation(`${operateur[i].value}`, operation)
                }
                else{
                operation += operateur[i].value;
                afficherOperation(operateur[i].value, operation)
                }
              }
          }
          
        });
    }


    let AC = document.getElementById("AC");
 
      AC.addEventListener("click", () => {
        if(verificationOperationPrecedente === true)
            verificationOperationPrecedente = false;

        operation = "";
        afficherOperation(0, operation)
      })
     
      let nombre0 = document.getElementById("nombre-0")
      let virgule = document.getElementById("virgule");

    virgule.addEventListener("click", () => {
      if(verificationOperationPrecedente !== true){
        let dernierCharacter = operation[operation.length - 1];
        if(dernierCharacter === undefined)
            dernierCharacter = "";

        if(dernierCharacter != "."){
          if(dernierCharacter == "x" || dernierCharacter == "/" || dernierCharacter == "+" || dernierCharacter == "-" || dernierCharacter == ""){
            operation += `${nombre0.value}${virgule.value}`;
          afficherOperation(`${virgule.value}`, operation)
          }
          else{
          operation += virgule.value;
          afficherOperation(virgule.value, operation)
          }
        }
      }
      else if(verificationOperationPrecedente === true){
        verificationOperationPrecedente = false;
        operation = `${nombre0.value}${virgule.value}`;
        afficherOperation(`${nombre0.value}${virgule.value}`, operation)
      }
    })

    

    
    nombre0.addEventListener("click", () => {
      let dernierCharacter = operation[operation.length - 1];
          if(dernierCharacter === undefined)
            dernierCharacter = "";
          
          if(verificationOperationPrecedente === true){
            operation = "0";
            verificationOperationPrecedente = false;
            afficherOperation("0", operation)
          }
          else if(dernierCharacter == "x" || dernierCharacter == "/" || dernierCharacter == "+" || dernierCharacter == "-" || dernierCharacter == ""){
            operation += `${nombre0.value}${virgule.value}`;
            afficherOperation(`${nombre0.value}`, operation);
          }  
          else if(operation != "0"){
            operation += "0";
            afficherOperation("0", operation)
          }
        
    })

    let entrerOperation = document.getElementById("entrer-operation");

    entrerOperation.addEventListener("click", () => {
    try{
        if(verifierOperation(operation)){
            let newOperation = operation.split('').map(x => {
                if(x == "x")
                  return "*"
                else
                  return x;
               }).join('');

            afficherOperation(eval(newOperation), `${operation}=${eval(newOperation)}`)
            operation = `${eval(newOperation)}`;
            verificationOperationPrecedente = true;
        }
        else{
            afficherOperation("ERREUR", "ERREUR")
            operation = "";
        }
    }
    catch{
        afficherOperation("ERREUR", "ERREUR")
        operation = "";
    }
    })
}





