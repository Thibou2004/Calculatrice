
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

/**
 * Cette fonction va permettre de vérifier lorsque l'on
 * clique sur le boutton virgule si le nombre qui est entrée
 * a déja une virgule, si c'est le cas on ajoute pas de virgule.
 * @param {string} operation
 */
function verifierVirgule(operation){
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
    let regexNumber = /^[0-9\.]{1,1}$/;
    let regexOperateur1 = /^[x\/]{1,1}$/;
    let regexOperateur2 = /^[+-]{1,1}$/;

    let operateur = document.querySelectorAll(".operateur");
    for(let i = 0; i < operateur.length; i++){
        operateur[i].addEventListener("click", () => {
          let dernierCharacter = operation[operation.length - 1];
          if(dernierCharacter === undefined)
            dernierCharacter = "";
          if(regexNumber.test(dernierCharacter)){
              if(verificationOperationPrecedente === true)
                  verificationOperationPrecedente = false;
  
              operation += operateur[i].value;
              afficherOperation(operateur[i].value, operation)
            
          }
          else if(regexOperateur2.test(operateur[i].value) && operation != ""){
            if(regexOperateur1.test(dernierCharacter)){
              if(verificationOperationPrecedente === true)
                verificationOperationPrecedente = false;
        
              operation += operateur[i].value;
              afficherOperation(operateur[i].value, operation);
            }
            else if(regexOperateur2.test(dernierCharacter)){
              if(verificationOperationPrecedente === true)
                verificationOperationPrecedente = false;

              operation = operation.replace(/.$/, "");
              operation += operateur[i].value;
              afficherOperation(operateur[i].value, operation);
            }   
          }
          else if(regexOperateur1.test(operateur[i].value) && operation != ""){
            if(regexOperateur1.test(dernierCharacter) || regexOperateur2.test(dernierCharacter)){
              for(let i = operation.length - 1; i >= 0; i--){
                if(regexOperateur1.test(operation[i]) || regexOperateur2.test(operation[i]))
                  operation = operation.replace(/.$/, "");
                else
                  break;
              }

              operation += operateur[i].value;
              afficherOperation(operateur[i].value, operation);
            }
          }
          else if(operation == ""){
            if(verificationOperationPrecedente === true)
                verificationOperationPrecedente = false;
  
            operation += `0${operateur[i].value}`;
            afficherOperation(`${operateur[i].value}`, operation)
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
      if(verifierVirgule(operation)){
        if(verificationOperationPrecedente !== true){
          let dernierCharacter = operation[operation.length - 1];
          if(dernierCharacter === undefined)
              dernierCharacter = "";
  
            if(dernierCharacter == "x" || dernierCharacter == "/" || dernierCharacter == "+" || dernierCharacter == "-" || dernierCharacter == ""){
              operation += `${nombre0.value}${virgule.value}`;
            afficherOperation(`${virgule.value}`, operation)
            }
            else{
            operation += virgule.value;
            afficherOperation(virgule.value, operation)
            }
        }
        else if(verificationOperationPrecedente === true){
          verificationOperationPrecedente = false;
          operation = `${nombre0.value}${virgule.value}`;
          afficherOperation(`${virgule.value}`, operation)
        }
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





