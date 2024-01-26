// Créez à l’intérieur de ce module, une fonction checkBody() qui recevra un objet contenant le body renvoyé par les formulaires d’inputs et un tableau des champs à tester. Si chaque élément de celui-ci existe et que le nombre d’éléments est le bon, la fonction renverra true et sinon false.

// Assuming modules/checkBody.js exists and checkBody is defined there.
function checkBody(body, fields) {
    for(let i = 0; i < fields.length; i++) {
        let field = body[fields[i]];
        if (typeof field === "string") {
            if(!field || field.trim() === "") {
              return false;
            }
        } else if (!field) {
            return false;
        }
    }
    return true;
}

module.exports = { checkBody };

  

//  Intégrez ce module dans les 2 routes POST /signup et /signin afin de faciliter la vérification des données reçues.