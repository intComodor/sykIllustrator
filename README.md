# SykIllustrator

## Utilisation de l'application
Voici le lien où est herbergée l'application en ligne intcomodor.github.io/sykIllustrator/.
Si vous souhaitez utiliser ce code en local, vous pouvez lancer la commande ng serve aprés avoir fait un npm install à l'endroit du package.json.
Veillez a avoir installer angular a l'aide la commande : `npm install -g @angular/cli`


## Explications 

### Introduction
Ce projet a été réalisé dans le cadre de l’UE analyse et architecture logicielle orientée objets. Le but de ce projet était de réaliser une application web de dessin, comme le célèbre « Paint ». En termes de technologies, nous avions pour contrainte d’utiliser TypeScript ainsi que le framework Angular.

### Fonctionnalités
Voici une liste des principales fonctionnalités que nous avons implémentées : 

#### Outils :
- Outil crayon
- Outil de traçage de segments
- Outil gomme
- Plusieurs formes (Rectangle, Triangle, Rond)

#### Options : 
- Option de changement de l’épaisseur des traits pour le crayon, le segment, et la gomme
- Option pour changer l’épaisseur des traits d’une forme
- Option pour remplir ou non une forme (l’option doit être activée avant de dessiner la forme)
- Option de changement de couleur du crayon, des formes et segments 

#### Autres fonctionnalités : 
- Exportation du dessin dans les formats: png, jpeg et webp.
- Sauvegarde du dessin dans format propriétaire ‘.syk’ avec enregistrement des différents états du dessin, donc possibilités d’utiliser les undo/redo.
- Fonctionnalité Undo/Redo accessible via leurs boutons.
- Raccourcis clavier CTRL+Z (undo) et CTRL+SHIFT+Z (redo)
- Bouton d’upload d’une image (uniquement au format ‘.syk’)
- Bouton full-screen mode
- Bouton pour changer le format de la zone de dessin
- Bouton pour nettoyer le canvas
- Fonctionnalité de restauration du dernier dessin effectué lors de la dernière utilisation de l’app (via le Local Storage)

### Architecture et fonctionnement

Concernant l'architecture notre application est composé de 5 composants : 
- Drawing board 
 -Header
- Option panel
- Snake-bar panel
- Tools panel
- Chacun de ces composants permettent de faire l’interface utilisateur, la logique des fonctionnalités est essentiellement implémentée par les services, ainsi les composants font le lien avec les services existants.
- Les services sont : 
- Canvas.service : c’est dans ce service qu'on stocke l’élément html canvas, qui nous permet de gérer les actions réalisables sur la zone de dessin, ainsi que ses propriétés.
- Drawing-data.service : Dans ce service sont contenu toutes les données du dessin et les différents état du dessin. Ici on met en place les fonctions qui permettent de manipuler la pile de dessin comme push_state, undo, redo.
- Mouse-event.service : Ce service contient les observables des événements de souris détectés sur le canvas. Ainsi les différents outils de dessin implémentent leur fonctionnement en souscrivant à ces observables.
- Storage.service : Gère le local storage et l’importation / sauvegarde d’un fichier propriétaire. 
- Tools.service : Permet le changement d’outil.

 #### Outils et formes

Pour les outils nous avons une classe abstraite Tool, ainsi chaque outil va hériter des méthodes initTool, draw et disableTool pour implémenter la leur logique.
initTool permet de souscrire aux événements de souris sur le canvas, permettant de dessiner une prévisualisation quand le clic est enfoncé et de dessiner le trait final lorsque la souris est relâchée par exemple.
disableTool est une méthode dont le code est commun à chacun des outils, on souscrit simplement à chacun des événements pour empêcher que deux outils ne soient actifs en même temps.

Pour les formes, le principe est le même, mais avec une couche d’abstraction supplémentaire. Nous avons une classe abstraite « shape » qui hérite de la classe « tool », et qui implémente la méthode « init tool », qui est commune à chaque forme. Enfin chaque forme hérite de la classe Shape, et implémente sa propre méthode « draw() ».
