[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Modèle Excel d'estimation pour la construction résidentielle : outil de suivi des coûts BOQ et de gestion du budget de projet
<img width="1047" height="790" alt="image" src="https://github.com/user-attachments/assets/bbbf18ff-9749-4d98-a021-5d347d8280c1" />

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)](#)
[![Tool Type](https://img.shields.io/badge/Tool%20Type-Decision%20Support-success.svg)](#)

<p>L'<strong>estimation des coûts de construction résidentielle</strong> rendue simple. Transformez les métrés de plans d'architecte, les prix unitaires, les devis de sous-traitants et les coûts bruts du projet en une <strong>estimation</strong> strictement contrôlée. Que vous ayez besoin d'un <strong>calculateur de coûts</strong> rapide dans le navigateur ou d'un <strong>modèle Excel de budget pour entrepreneurs généraux</strong> téléchargeable, cet outil prévient les dépassements de budget et standardise votre flux de travail <strong>BOQ (bordereau des quantités)</strong>.</p>

<p><strong>Aucune inscription. Aucune installation. Gratuit dans votre navigateur.</strong></p>

Essayez gratuitement la version navigateur. Si vous avez besoin de la version Excel entièrement déverrouillée pour une saisie permanente des coûts, vous pouvez l'acheter avec une garantie satisfait ou remboursé de 30 jours, sans question.

> [🌐 Lancer l’estimateur de construction gratuit en ligne](https://hyvoid.github.io/residential-boq-template/)
>
> [📥 Télécharger le modèle Excel d’estimation résidentielle](https://www.theseusworkshop.com/l/rxxzven?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=residential-boq-estimating)


## Comment l’outil résout vos points sensibles d’estimation

Plutôt que de lister simplement des fonctionnalités, voici comment ce tableur relève les défis courants de gestion d’offres et de saisie des coûts :


| Point sensible courant | Comment ce classeur le résout |
| :--- | :--- |
| **Commandes de matériaux imprécises** | Applique automatiquement des hypothèses de perte par défaut ou personnalisées pour suivre les **quantités d’approvisionnement ajustées**. |
| **Cécité sur les coûts** | Calcule avec précision les **coûts de matériaux, de main-d’œuvre et d’équipement/sous-traitance** pour chaque ligne BOQ. |
| **Angles morts de coûts par corps de métier** | Visualise la **concentration des coûts par division**, en montrant la part de chaque corps de métier et le coût par pied carré. |
| **Trop-payé aux sous-traitants** | Compare les **estimations internes aux offres externes**, en signalant instantanément le devis le plus bas et l’écart. |
| **Dépassements de coûts inaperçus** | Met en correspondance **budgets approuvés et coûts réels du projet**, avec des alertes automatiques pour les divisions hors budget. |
| **Reporting client brouillon** | Génère un tableau de bord clair détaillant **estimations totales, réserve pour imprévus, coûts unitaires et les 3 principaux moteurs de coûts**. |

## Scénarios de coûts de construction : quand utiliser ce tableur d’estimation

Ce flux de travail couvre les scénarios de recherche à haute fréquence en gestion de construction :

* **Répondre à des appels d’offres pour maisons sur mesure :** Compilez rapidement un bordereau des quantités (BOQ) complet pour soumettre aux clients des offres compétitives et mathématiquement solides.
* **Gérer les offres de sous-traitants et les écarts :** Évaluez les devis concurrents de plombiers, d’électriciens ou de charpentiers par rapport à votre base de référence interne, afin de ne pas payer une prime de marché.
* **Suivre les dépassements de coûts sur les rénovations :** Surveillez les dépenses réelles pendant une rénovation de cuisine ou de maison entière, en arrêtant les fuites budgétaires avant la fin du projet.
* **Standardiser les procédures d’estimation de l’entreprise :** Faites passer votre petite équipe de construction de tableurs fragmentés et sujets aux erreurs à un cadre de contrôle des coûts unifié.

## À qui cela s’adresse : rôles et cas d’usage

Cette boîte à outils comble le fossé entre les tableurs de base et les logiciels de construction d’entreprise coûteux. Elle est fortement optimisée pour :

* **Entrepreneurs généraux :** Ont besoin d’un *modèle d’estimation pour la construction résidentielle* pour compiler rapidement des offres détaillées multi-corps de métier.
* **Chefs de projet :** Recherchent un *tableur de suivi de budget de projet* pour surveiller les dépenses réelles face aux budgets approuvés sur le chantier.
* **Estimateurs résidentiels :** Exigent un *outil de calcul BOQ* qui standardise les taux de perte, les taux de main-d’œuvre et la taxe de vente partout.
* **Constructeurs et rénovateurs :** Cherchent un *logiciel de chiffrage pour rénovation* pour gérer des projets de 1 500–2 200 sq ft sans abonnement logiciel massif.
* **Sous-traitants et corps de métier spécialisés :** Ont besoin d’une *feuille Excel de saisie des coûts* pour construire leur tarification interne avant de soumettre des offres compétitives.

*(Remarque : il n’est **pas** conçu comme un ERP d’entreprise, une plateforme complète de gestion de construction, ni un remplacement des systèmes de comptabilité de projet dédiés comme QuickBooks.)*

## Tutoriel de démarrage rapide : votre flux de travail d’estimation

Suivez ces étapes pour construire votre première estimation. **Action requise :** testez d’abord la logique de calcul dans le navigateur.

1. **Configurer les paramètres du projet (hypothèses globales).**
   Ouvrez `00_Parameters`. Définissez votre taux de perte par défaut, la réserve pour imprévus, le taux de taxe de vente, la devise et la liste standard des divisions CSI. *Astuce de pro : les définir globalement évite les erreurs de saisie manuelle ultérieures.*

2. **Initialiser votre projet de construction.**
   Naviguez vers `01_Project_Setup`. Saisissez l’identité du projet, l’adresse, la version de l’estimation et la surface brute. Cela établit la base de référence de vos indicateurs de coût par pied carré.

3. **Effectuer le métré BOQ (construction du coût central).**
   Utilisez `02_BOQ_Takeoff` comme espace de travail principal. Ajoutez les descriptions d’articles, les références de plans, les quantités de base et les unités. Saisissez vos taux de matériaux, de main-d’œuvre et d’équipement. *Le système applique automatiquement les hypothèses de perte et calcule les coûts totaux par ligne.*

4. **Auditer les offres de sous-traitants et suivre l’écart budgétaire.**
   Examinez `03_Division_Summary` pour votre ventilation des coûts. Saisissez les prix des fournisseurs externes dans `04_Subcontractor_Comparison` pour benchmarker le marché. Enfin, consignez les dépenses réelles dans `05_Budget_Cost_Control` pour déclencher les alertes automatiques de dépassement.

5. **Examiner le tableau de bord exécutif et exporter.**
   Ouvrez `06_Dashboard` pour examiner vos KPI, les 3 principaux moteurs de coûts et les marges finales du projet. 
   
   ➔ **Étape suivante :** après avoir évalué ce flux de travail dans le navigateur, **[téléchargez le modèle Excel d’estimation réutilisable](https://www.theseusworkshop.com/l/rxxzven?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=residential-boq-estimating)**. Enregistrez-le comme fichier maître pour standardiser chaque futur cycle d’offre et de contrôle des coûts.

## Pourquoi j’ai construit cet outil de contrôle des coûts

L’estimation résidentielle s’effondre souvent avant que l’arithmétique ne le fasse.

Une quantité peut venir d’un plan d’architecte, un prix unitaire d’un fournisseur, et une offre de sous-traitant peut arriver des jours plus tard dans un format complètement différent. Lorsque ces nombres sont examinés dans des tableurs séparés, répondre à une question critique devient presque impossible :

**Quelle est la base de coûts actuelle de ce projet, et où se situe le prochain risque de coût matériau ?**

L’échec est généralement structurel. Un métré peut être mathématiquement correct, et pourtant l’estimation finale reste trompeuse parce que les taux de perte, la taxe de vente sur matériaux, les charges de main-d’œuvre ou la réserve pour imprévus du projet n’ont pas été appliqués de manière cohérente. 

Ce classeur traite le **bordereau des quantités (BOQ)** comme la source de coûts centrale. Par exemple, votre estimation interne peut afficher une division à `$42,000`, tandis que la plus basse offre de sous-traitant est de `$48,500`. La couche de comparaison rend l’écart de `$6,500` visible face à exactement la même base de référence interne, ce qui clarifie si le marché est cher ou si votre métré initial était incomplet.

## Surmonter les problèmes courants d’estimation 

| Point sensible courant d’estimation | Flux de travail traditionnel en tableur | Solution optimisée du modèle d’estimation |
| :--- | :--- | :--- |
| **Hypothèses de perte incohérentes** | Différentes lignes BOQ utilisent des calculs cachés et implicites, ce qui rend les commandes de matériaux peu fiables. | Les taux de perte spécifiques aux articles surchargent la valeur par défaut, tandis que les valeurs vides héritent instantanément d’un paramètre de perte par défaut centralisé. |
| **Taxe de vente sur matériaux oubliée** | Les taux de matériaux sont traités à tort comme des coûts finaux, en ignorant les obligations fiscales locales. | Les formules de coût des matériaux multiplient et intègrent automatiquement le paramètre de taxe de vente centralisé. |
| **Coûts de corps de métier fragmentés** | La direction examine les offres de corps de métier individuels mais manque d’une hiérarchie de coûts unifiée au niveau division. | Seize divisions standard de la construction résidentielle fournissent une couche d’agrégation commune automatisée. |
| **Benchmarking de sous-traitants difficile** | Les offres sont acceptées ou rejetées à l’aveugle, sans comparaison un-à-un avec l’estimation interne. | Le devis le plus bas, le fournisseur gagnant, l’écart en dollars et l’écart en pourcentage sont calculés automatiquement côte à côte. |
| **Découverte tardive des dépassements de budget** | Les coûts réels du projet vivent dans un logiciel de comptabilité, entièrement déconnectés du budget de l’estimateur initial. | Les bases de référence estimées, les budgets approuvés et les coûts réels sont alignés par division, avec un indicateur d’état automatique `OVER BUDGET`. |
| **Manque de contexte de coûts pour la direction** | Un seul chiffre de « coût total » ne révèle pas quelles phases de construction précis font monter le prix. | Les KPI du tableau de bord exposent instantanément l’estimation totale, la marge pour imprévus, le coût par sq ft, les composants majeurs et les 3 principales divisions. |

## À propos

I build lightweight trackers and decision-support tools for situations where there are too many moving parts to hold in your head, but not enough complexity to justify a large software implementation.

La question centrale est simple :

> **Quelles informations doivent être réunies au même endroit pour prendre la prochaine décision en confiance ?**

Cette boîte à outils BOQ résidentielle applique cette approche à l’estimation et au contrôle des coûts : établir les hypothèses une fois, capturer les entrées opérationnelles, garder la chaîne de calcul connectée et exposer les décisions de coûts qui comptent.

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens d’Excel et les collaborateurs</summary>

### Architecture du classeur

Le classeur contient sept feuilles principales organisées en un flux contrôlé entrée → calcul → analyse → décision.

| Couche        | Feuille                       | Rôle                                                          | Entrée / Calcul                 |
| -------------- | ----------------------------- | ------------------------------------------------------------ | ------------------------------- |
| Paramètres    | `00_Parameters`               | Hypothèses globales et la liste maîtresse des divisions       | Configuration manuelle          |
| Configuration du projet | `01_Project_Setup`      | Identité du projet et surface brute                           | Saisie manuelle                 |
| Données de référence | `02_BOQ_Takeoff`         | BOQ central, quantités, taux et construction du coût par article | Saisie manuelle + formules dynamiques |
| Analyse       | `03_Division_Summary`         | Agrégation des coûts par division                             | Généré par formule              |
| Comparaison   | `04_Subcontractor_Comparison` | Estimation interne vs offres Sous-A/B/C                       | Offres manuelles + formules     |
| Contrôle      | `05_Budget_Cost_Control`      | Estimé vs budget approuvé vs réel                             | Budget/réel manuels + formules  |
| Couche décision | `06_Dashboard`               | KPI du projet, structure des coûts et indicateurs de risque   | Généré par formule + graphiques |

La chaîne de dépendance prévue est :

```text
00_Parameters
      │
      ├── default waste rate
      ├── contingency rate
      ├── sales tax rate
      └── master Division list
              │
              ▼
01_Project_Setup ───────────────┐
      │                         │
      ▼                         │
02_BOQ_Takeoff                  │
      │                         │
      ├── Material Cost         │
      ├── Labour Cost           │
      ├── Equip/Sub Cost        │
      └── Total Item Cost       │
              │                 │
              ▼                 ▼
03_Division_Summary       05_Budget_Cost_Control
              │
              ├───────────────► 04_Subcontractor_Comparison
              │
              ▼
        06_Dashboard
```

`02_BOQ_Takeoff` est la **source unique de vérité** pour les données d’estimation détaillées. Les feuilles en aval ne doivent pas recréer indépendamment la logique de coût au niveau des articles.

### Limites entre saisie et calcul

La feuille BOQ sépare intentionnellement les champs saisis par l’utilisateur des champs générés par formule.

| Zone          | Colonnes | Contrôle                                                |
| ------------ | ------- | -------------------------------------------------------- |
| Saisie manuelle | A:H     | Division, informations d’article, quantités, unités et perte |
| Formule       | I       | Quantité ajustée                                        |
| Saisie manuelle | J       | Taux de matériaux                                       |
| Formule       | K       | Coût des matériaux                                      |
| Saisie manuelle | L       | Taux de main-d’œuvre                                    |
| Formule       | M       | Coût de main-d’œuvre                                    |
| Saisie manuelle | N       | Taux d’équipement/sous-traitance                        |
| Formule       | O:P     | Coûts d’équipement/sous-traitance et coût total par article |

Cette séparation réduit le risque de remplacer accidentellement des formules par des valeurs codées en dur.

### Trois pièges qui attrapent même les estimateurs expérimentés

#### Piège 1 — Traiter la quantité de base comme la quantité d’achat

**1. Décision :** une commande de matériaux est basée directement sur la quantité de métré du plan.

**2. Hypothèse erronée :** la quantité du plan est traitée comme la quantité d’approvisionnement finale.

**3. La recommandation change :** un métré de `1,000 sq ft` avec une majoration de perte de `5%` devrait donner `1,050 sq ft`, et non `1,000 sq ft`.

**4. Pourquoi c’est faux :** les besoins d’approvisionnement et de construction peuvent dépasser la quantité nette mesurée.

**5. Approche corrigée :** appliquez le taux de perte spécifique à l’article lorsqu’il est disponible ; sinon, héritez de la valeur centralisée par défaut.

**6. Résultat corrigé :** l’estimation porte `1,050 sq ft` comme quantité ajustée.

<details>
<summary>Formule</summary>

```excel
=IF(F5:F1000="","",
   F5:F1000*(1+IF(ISNUMBER(H5:H1000),
                   H5:H1000,
                   '00_Parameters'!$C$4)))
```

`F` = Quantité de base
`H` = % de perte par article
`00_Parameters!C4` = Taux de perte par défaut

</details>

---

#### Piège 2 — Comparer une offre de sous-traitant à une estimation interne incomplète

**1. Décision :** une offre de sous-traitant est jugée chère parce qu’elle dépasse l’estimation interne.

**2. Chiffre erroné :** l’estimation interne peut omettre un traitement fiscal cohérent ou d’autres composantes de coût.

**3. La recommandation change :** une offre de `$48,500` contre une base de référence de `$42,000` semble trop élevée de `$6,500`.

**4. Pourquoi c’est faux :** la comparaison n’est utile que si l’estimation interne représente une base de coûts cohérente.

**5. Approche corrigée :** utilisez l’estimation de division calculée comme base de référence, puis identifiez la plus basse parmi Sous A, Sous B et Sous C.

**6. Résultat corrigé :** l’équipe peut distinguer une véritable prime de marché d’une base de référence interne sous-estimée avant de négocier ou de choisir un fournisseur.

<details>
<summary>Formule</summary>

```excel
=BYROW(C4:E19,LAMBDA(row,
    LET(
        minVal,MIN(row),
        vendor,XLOOKUP(minVal,row,$C$3:$E$3,"N/A"),
        HSTACK(minVal,vendor)
    )
))
```

L’offre minimale résultante alimente le calcul d’écart face à l’estimation interne.

</details>

---

#### Piège 3 — Regarder le coût réel sans base de référence budgétaire

**1. Décision :** les dépenses réelles du projet sont examinées de manière isolée.

**2. Métrique erronée :** `$37,800` de coût réel n’ont aucune signification décisionnelle sans le budget approuvé.

**3. La recommandation change :** si le budget approuvé est de `$35,000`, les mêmes `$37,800` représentent un dépassement de `$2,800`.

**4. Pourquoi c’est faux :** le coût réel absolu n’indique pas si la performance des coûts est acceptable.

**5. Approche corrigée :** comparez directement le coût réel au budget approuvé par division.

**6. Résultat corrigé :** le système marque la division comme **OVER BUDGET**, créant un signal de contrôle clair.

<details>
<summary>Formule</summary>

```excel
=HSTACK(
    D4:D19-C4:C19,
    IF(D4:D19>C4:C19,
       "⚠️ OVER BUDGET",
       "✅ OK")
)
```

`C` = Budget approuvé
`D` = Coût réel

</details>

### Scénario d’exemple

Considérez un projet résidentiel de **2 000 sq ft** de surface brute.

Le projet est initialisé avec un **taux de perte par défaut de 5 %**, une **réserve pour imprévus de 10 %** et une **taxe de vente de 8 %**. L’estimateur saisit le BOQ dans `02_BOQ_Takeoff`.

Supposons qu’une ligne BOQ contienne :

| Entrée          |       Valeur |
| -------------- | ----------: |
| Quantité de base | 1,000 sq ft |
| Perte par article |       Vide |
| Taux de matériaux |       $4.00 |
| Taux de main-d’œuvre |       $2.50 |
| Taux d’équipement/sous-traitance |       $0.50 |

Comme le champ de perte spécifique à l’article est vide, le modèle hérite de la valeur par défaut de 5 %. La quantité ajustée devient :

```text
1,000 × (1 + 5%) = 1,050 sq ft
```

Le coût des matériaux inclut la taxe de vente de 8 % :

```text
1,050 × $4.00 × 1.08 = $4,536
```

Le coût de main-d’œuvre est :

```text
1,050 × $2.50 = $2,625
```

Le coût d’équipement/sous-traitance est :

```text
1,050 × $0.50 = $525
```

Le coût total par article qui en résulte est :

```text
$4,536 + $2,625 + $525 = $7,686
```

La ligne alimente ensuite `03_Division_Summary`, où elle contribue aux coûts de matériaux, de main-d’œuvre, d’équipement/sous-traitance et totaux de la division appropriée.

Supposons que l’estimation de construction résultante au niveau du projet soit de `$300,000`. La réserve pour imprévus est :

```text
$300,000 × 10% = $30,000
```

Le tableau de bord présente donc une estimation de projet incluant la réserve pour imprévus de :

```text
$300,000 + $30,000 = $330,000
```

À 2 000 sq ft, l’indicateur de coût résultant au niveau du projet est :

```text
$330,000 ÷ 2,000 = $165 / sq ft
```

L’interprétation opérationnelle n’est pas simplement que le projet coûte `$330,000`. Le modèle montre aussi **quelles divisions créent ce chiffre, quelle part de l’estimation relève des matériaux face à la main-d’œuvre face à l’équipement/sous-traitance, si la tarification des sous-traitants est au-dessus de la base de référence interne, et si les dépenses réelles ont dépassé le budget approuvé**.

Cela rend le classeur utile pour l’estimation, la revue d’offres, le contrôle budgétaire et le reporting de gestion, sans reconstruire la chaîne de calcul à chaque revue.

### Référence des formules

<details>
<summary>00_Parameters et configuration du projet</summary>

Les paramètres globaux sont maintenus de manière centralisée :

```text
C4 = Default Waste Rate
C5 = Contingency Rate
C6 = Sales Tax Rate
C7 = Currency Symbol
E4:E19 = Master Division List
```

`01_Project_Setup!C6` stocke la surface brute et fournit le dénominateur des calculs de coût par pied carré.

</details>

<details>
<summary>02_BOQ_Takeoff — calculs au niveau des articles</summary>

**Quantité ajustée — `I5`**

```excel
=IF(F5:F1000="","",
   F5:F1000*(1+IF(ISNUMBER(H5:H1000),
                   H5:H1000,
                   '00_Parameters'!$C$4)))
```

**Coût des matériaux — `K5`**

```excel
=IF(F5:F1000="","",
   I5:I1000*J5:J1000*(1+'00_Parameters'!$C$6))
```

**Coût de main-d’œuvre — `M5`**

```excel
=IF(F5:F1000="","",
   I5:I1000*L5:L1000)
```

**Coût d’équipement/sous-traitance — `O5`**

```excel
=IF(F5:F1000="","",
   I5:I1000*N5:N1000)
```

**Coût total par article — `P5`**

```excel
=IF(F5:F1000="","",
   K5:K1000+M5:M1000+O5:O1000)
```

Les formules sont conçues comme des calculs de tableau dynamique, de sorte que la logique de calcul est établie au début de la plage désignée plutôt que copiée manuellement ligne par ligne.

</details>

<details>
<summary>03_Division_Summary — agrégation</summary>

**Liste des divisions — `A4`**

```excel
='00_Parameters'!E4:E19
```

**Coûts de matériaux, de main-d’œuvre, d’équipement/sous-traitance et totaux — `B4`**

```excel
=BYROW(A4#,LAMBDA(d,
    HSTACK(
        SUMIFS('02_BOQ_Takeoff'!K5:K1000,
               '02_BOQ_Takeoff'!A5:A1000,d),
        SUMIFS('02_BOQ_Takeoff'!M5:M1000,
               '02_BOQ_Takeoff'!A5:A1000,d),
        SUMIFS('02_BOQ_Takeoff'!O5:O1000,
               '02_BOQ_Takeoff'!A5:A1000,d),
        SUMIFS('02_BOQ_Takeoff'!P5:P1000,
               '02_BOQ_Takeoff'!A5:A1000,d)
    )
))
```

**Part des coûts et coût / sq ft — `F4`**

```excel
=HSTACK(
    INDEX(B4#,,4)/SUM(INDEX(B4#,,4)),
    INDEX(B4#,,4)/'01_Project_Setup'!$C$6
)
```

</details>

<details>
<summary>04_Subcontractor_Comparison — comparaison de marché</summary>

**Estimation interne — `B4`**

```excel
='03_Division_Summary'!E4#
```

**Offre la plus basse et fournisseur — `F4`**

```excel
=BYROW(C4:E19,LAMBDA(row,
    LET(
        minVal,MIN(row),
        vendor,XLOOKUP(minVal,row,$C$3:$E$3,"N/A"),
        HSTACK(minVal,vendor)
    )
))
```

**Écart vs base et écart % — `H4`**

```excel
=HSTACK(
    F4#-B4#,
    (F4#-B4#)/B4#
)
```

</details>

<details>
<summary>05_Budget_Cost_Control — écart budgétaire</summary>

**Écart budgétaire et indicateur d’état — `E4`**

```excel
=HSTACK(
    D4:D19-C4:C19,
    IF(D4:D19>C4:C19,
       "⚠️ OVER BUDGET",
       "✅ OK")
)
```

</details>

<details>
<summary>06_Dashboard — KPI de gestion</summary>

**Estimation totale**

```excel
=SUM('03_Division_Summary'!E4#)
```

**Réserve pour imprévus**

```excel
=B4*'00_Parameters'!$C$5
```

**Total général**

```excel
=B4+B5
```

**Coût / sq ft**

```excel
=B6/'01_Project_Setup'!$C$6
```

**Top 3 des divisions de coûts**

```excel
=CHOOSEROWS(
    SORT('03_Division_Summary'!A4:E19,5,-1),
    1,2,3
)
```

</details>

### Règles de validation

| Champ                             | Règle                                            | Comportement en cas d’erreur                                  |
| --------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| `00_Parameters!C4`                | Le taux de perte par défaut devrait être un pourcentage | Un pourcentage invalide produit des quantités ajustées peu fiables |
| `00_Parameters!C5`                | Le taux de réserve pour imprévus devrait être un pourcentage | Une valeur invalide affecte le total général |
| `00_Parameters!C6`                | Le taux de taxe de vente devrait être un pourcentage | Le calcul du coût des matériaux devient incorrect |
| `00_Parameters!E4:E19`            | La liste des divisions est la liste maîtresse contrôlée | Des noms de division incohérents cassent l’agrégation |
| `01_Project_Setup!C6`             | La surface brute doit être numérique et positive | Sinon, les calculs de coût par pied carré ne peuvent pas être valides |
| `02_BOQ_Takeoff!A:A`              | La division devrait être sélectionnée dans la liste maîtresse | Les valeurs non appariées peuvent ne pas apparaître dans les résumés par division |
| `02_BOQ_Takeoff!F:F`              | La quantité de base doit être numérique | Les sorties de formule restent vides en l’absence de quantité valide |
| `02_BOQ_Takeoff!G:G`              | L’unité devrait être stockée séparément de la quantité | Empêche que des quantités comme `1500 sq ft` soient traitées comme du texte |
| `02_BOQ_Takeoff!H:H`              | Le % de perte par article peut être vide ou un pourcentage numérique | Les valeurs vides héritent de la valeur globale par défaut |
| `02_BOQ_Takeoff!J:J`              | Le taux de matériaux devrait être numérique | Le coût des matériaux ne peut pas être calculé correctement à partir de texte |
| `02_BOQ_Takeoff!L:L`              | Le taux de main-d’œuvre devrait être numérique | Le coût de main-d’œuvre ne peut pas être calculé correctement à partir de texte |
| `02_BOQ_Takeoff!N:N`              | Le taux d’équipement/sous-traitance devrait être numérique | Le coût d’équipement/sous-traitance ne peut pas être calculé correctement à partir de texte |
| `04_Subcontractor_Comparison!C:E` | Les valeurs d’offre devraient être numériques | La logique d’offre la plus basse peut échouer ou renvoyer des comparaisons invalides |
| `05_Budget_Cost_Control!C:C`      | Le budget approuvé devrait être numérique | L’écart budgétaire ne peut pas être évalué correctement |
| `05_Budget_Cost_Control!D:D`      | Le coût réel devrait être numérique | L’état du budget ne peut pas être évalué correctement |
| Plages de déversement de formule | Les cellules de destination doivent rester libres | Excel renvoie `#SPILL!` en cas de blocage |
| Calcul du classeur                | Excel devrait utiliser le calcul automatique | Les paramètres mis à jour peuvent ne pas se propager immédiatement |
| Version d’Excel                   | Microsoft 365 ou Excel 2021+ | Les versions anciennes peuvent renvoyer `#NAME?` pour les fonctions non prises en charge |

### Validation entre feuilles

Les principales références de paramètres du modèle sont intentionnellement traçables :

```text
00_Parameters!C4  → 02_BOQ_Takeoff!I5
Default Waste Rate → Adjusted Qty

00_Parameters!C5  → 06_Dashboard!B5
Contingency Rate   → Contingency

00_Parameters!C6  → 02_BOQ_Takeoff!K5
Sales Tax Rate     → Material Cost

00_Parameters!E4:E19 → 03_Division_Summary!A4
Master Divisions     → Division aggregation

01_Project_Setup!C6 → 03_Division_Summary!G4
Gross Area           → Division cost / sq ft

01_Project_Setup!C6 → 06_Dashboard!B7
Gross Area           → Project cost / sq ft
```

La spécification d’implémentation fournie indique que ces références de paramètres forment une chaîne de calcul fermée, sans références cassées identifiées ni paramètres de contrôle codés en dur.

### Notes d’exploitation et de maintenance

**Environnement Excel recommandé**

* Microsoft 365 ou Excel 2021+.
* Les fonctions de tableau dynamique doivent être prises en charge.
* Le calcul automatique devrait rester activé.

**Volume BOQ recommandé**

La spécification d’implémentation recommande de garder le BOQ à environ **10 000 lignes** pour les performances de calcul, tandis que les projets résidentiels typiques devraient utiliser environ **200–1 000 lignes**.

**Maintenance des données**

* Saisissez les données brutes uniquement dans les zones de saisie manuelle désignées.
* Ne pas écraser les cellules générées par formule.
* Ajoutez les nouveaux enregistrements BOQ directement dans la plage de saisie désignée.
* Modifiez les hypothèses globales uniquement dans `00_Parameters`.
* Utilisez le menu déroulant standard des divisions plutôt que de créer manuellement de nouveaux noms de division.

**Dépannage**

Pour `#SPILL!`, inspectez la plage de déversement prévue à la recherche de texte, de nombres, d’espaces ou d’autre contenu existant.

Si une nouvelle ligne BOQ n’apparaît pas dans le résumé par division, vérifiez que la division correspond exactement à la liste maîtresse contrôlée.

Si les modifications de paramètres ne se propagent pas, vérifiez que le mode de calcul d’Excel est réglé sur **Automatic**.

Si les champs de coût apparaissent vides, vérifiez que `Base Qty` contient une valeur numérique et que les unités sont saisies séparément dans le champ `Unit`.

</details>

## Autres outils de cette série

Une petite collection d’outils légers de soutien décisionnel en Excel et dans le navigateur, couvrant l’estimation, la budgétisation, l’analyse opérationnelle et la planification financière.

* **Boîte à outils d’exploitation de projet et de saisie des coûts** — relie les estimations de projet, les coûts d’exécution et la revue de rentabilité.
* **Calculateur décisionnel de prix et de seuil de rentabilité** — évalue les scénarios de prix, de marge, de contribution et de seuil de rentabilité.
* **Boîte à outils de coût de main-d’œuvre manufacturière et de planification des capacités** — relie les besoins en main-d’œuvre à la capacité de production disponible.

## Licence

Ce projet est publié sous la **licence Apache 2.0**.

Consultez le fichier [`LICENSE`](LICENSE) pour le texte complet de la licence.
