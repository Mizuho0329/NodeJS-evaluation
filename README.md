# Documentation  
## L’application  
L’application a pour but d’envoyer des anecdotes de chat  

Nous nous basons sur l’API suivante :  
`https://alexwohlbruck.github.io/cat-facts/docs/`  
En utilisant différent ID, nous pouvons obtenir les facts correspondantes.  


## Installation des modules  
Après avoir récupérer le projet, vérifier l’existence du fichier package.json et faire la commande suivante :  
`npm install`  
Dans le fichier package.json, nous retrouvons les modules suivants :  
* npm  
* babel  
* express  
* axios  
* lowdb  
* jest  
* supertest  

## Démarrage de l’application  
Pour démarrer l’application, utiliser la commande suivante :   
`npm run start`  

## Tester l’application  
lancer le script test avec la commande  
`npm run test`  
## Routes disponibles & paramètres  
Routes de la méthode GET  
`localhost:5000/api/facts/:factID `                           
Route de la méthode DELETE  
`localhost:5000/api/delete/:id`  
Route pour la méthode POST  
`localhost:5000/api/add`  
Pour utiliser cette méthode, utilisez les paramètres suivant :  
`{"fact" : "toto"}`  
Route pour la méthode PUT  
`localhost:5000/api/update`  
Pour utiliser cette méthode, utilisez les paramètres suivant :  
`{"id" : "5894af975cdc7400113ef7f9" "fact" : "toto"}`  
Route pour voir tous les enregistrements de la base 
`localhost:5000/api/all`  

## Participants  
Toxé Mizuo, Guillodo Yannick, Larose Marina
