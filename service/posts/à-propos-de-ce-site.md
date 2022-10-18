# Tilde

Ce site est surnommé tilde, après le caractère qui signifie le répertoire maison dans la console UNIX. Il est construit en Angular avec Express.

J'ai choisi une approche minimaliste puisque c'est mon premier site web avec Angular et aussi mon premier site personnel, et je veux qu'il soit authentique, qu'il me ressemble.

Je l'ai écrit en lisant le livre "Angular Development with Typescript - Second Edition" par Yakov Fain Anton Moiseev, par lequel j'ai appris à utiliser Angular. J'apprécie la structure bien choisie du framework Angular, la modularité qu'il apporte à un projet et l'élégance qu'un projet Angular peut avoir.

Ça me rappelle quand j'ai découvert Qt, un beau framework orienté objet bien structuré qui pouvait m'aider à construire des graphes interactifs avant de découvrir Jupyter.

Comme avec Qt, la structure de l'application Angular apporte de la complexité, si on compare à écrire l'application avec HTML et le DOM, puisqu'avec Angular, on est moins porté à prendre de raccourcis. Angular rajoute une couche au dessus du DOM et prescrit les utilisations de celui-ci. De la même façon, les opérations sur réseau se font à travers RxJS et toutes les requêtes sont accomplies à travers un Subject ou un Observable. Ici, Angular prescrit les intéractions entre le réseau et les composantes comme étant des opérations rxjs. Un composant peut subscribe à une WebSocket et recevoir ses messages, mais une fonction ne peut pas envoyer de messages à une composante sans qu'ils ne passent par un Subject.

Pour construire ce petit site, j'ai eu à comprendre et à utiliser le routeur, les Observables et les principes de RxJS et l'orchestration de composantes. Côté serveur, j'ai construit un blogue en utilisant un serveur Express qui garde une liste de poste en JSON, avec des postes dans des fichiers markdown. Ce service sert le site et expose une API avec le nécessaire pour servir le blogue et le garder à jour.

C'est aussi le service qui sert le site web, et qui apporte des possibilitées infinies pour son extension future lorsque couplé avec Angular.