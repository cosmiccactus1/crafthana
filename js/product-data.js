/**
 * Baza podataka svih proizvoda
 * Ovdje definišemo sve proizvode koji se prikazuju na stranici
 */
const allProducts = {
    // 2 BLEND proizvodi
    "patchouli-cedarwood": {
        id: "patchouli-cedarwood",
        title: "Patchouli • Cedarwood",
        tagline: "Zemljana nota sa drvenastim prizvukom",
        volume: "10 ml",
        description: "Duboki, zemljani blend pačulija i kedrova pruža balansiranu aromu koja uzemljuje i smiruje. Ova kombinacija spaja bogatu zemljanu dubinu pačulija s toplim drvenastim notama kedrovine, stvarajući atmosferu mira i stabilnosti.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Pačuli (Pogostemon cablin), Kedrovo drvo (Cedrus atlantica) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend2.png", alt: "Patchouli • Cedarwood blend roll on" },
            { src: "images/2blend2-1.png", alt: "Patchouli • Cedarwood detail 1" },
            { src: "images/2blend2-2.png", alt: "Patchouli • Cedarwood detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "vanilla-jasmine": {
        id: "vanilla-jasmine",
        title: "Vanilla • Jasmine",
        tagline: "Slatka, cvjetna harmonija",
        volume: "10 ml",
        description: "Luksuzna kombinacija slatke vanilije i opojnog jasmina stvara bogat, topao miris koji osvaja svojom elegancijom. Ovaj blend podiže raspoloženje i stvara osjećaj ugode i relaksacije.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Vanilija (Vanilla planifolia), Jasmin (Jasminum officinale) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend1.png", alt: "Vanilla • Jasmine blend roll on" },
            { src: "images/2blend1-1.png", alt: "Vanilla • Jasmine detail 1" },
            { src: "images/2blend1-2.png", alt: "Vanilla • Jasmine detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "bergamot-ylang": {
        id: "bergamot-ylang",
        title: "Bergamot • Ylang Ylang",
        tagline: "Citrusna elegancija s cvjetnim dodirom",
        volume: "10 ml",
        description: "Osvježavajuća aroma bergamota u kombinaciji s egzotičnim ylang ylangom stvara uravnotežen miris koji istovremeno osvježava i opušta. Ovaj blend pomaže u podizanju raspoloženja i smanjenju napetosti.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Bergamot (Citrus bergamia), Ylang Ylang (Cananga odorata) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend3.png", alt: "Bergamot • Ylang Ylang blend roll on" },
            { src: "images/2blend3-1.png", alt: "Bergamot • Ylang Ylang detail 1" },
            { src: "images/2blend3-2.png", alt: "Bergamot • Ylang Ylang detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "pine-cedarwood": {
        id: "pine-cedarwood",
        title: "Pine Needle • Cedarwood",
        tagline: "Šumska svježina s drvenastom dubinom",
        volume: "10 ml",
        description: "Osvježavajuća aroma borovih iglica s toplom, zemljanom notom kedrovine stvara utisak šetnje šumom. Ovaj prirodni blend pomaže pri koncentraciji i donosi svježinu u prostor.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Borove iglice (Pinus sylvestris), Kedrovo drvo (Cedrus atlantica) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend4.png", alt: "Pine Needle • Cedarwood blend roll on" },
            { src: "images/2blend4-1.png", alt: "Pine Needle • Cedarwood detail 1" },
            { src: "images/2blend4-2.png", alt: "Pine Needle • Cedarwood detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "sandalwood-jasmine": {
        id: "sandalwood-jasmine",
        title: "Sandalwood • Jasmine",
        tagline: "Drvenasta elegancija s cvjetnim akcentom",
        volume: "10 ml",
        description: "Bogata, drvenasta aroma sandalovine s profinjenim notama jasmina stvara luksuzni, egzotični miris koji smiruje i uzdiže. Savršen je za trenutke relaksacije i meditacije.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Sandalovina (Santalum album), Jasmin (Jasminum officinale) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend5.png", alt: "Sandalwood • Jasmine blend roll on" },
            { src: "images/2blend5-1.png", alt: "Sandalwood • Jasmine detail 1" },
            { src: "images/2blend5-2.png", alt: "Sandalwood • Jasmine detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "frankincense-myrrh": {
        id: "frankincense-myrrh",
        title: "Frankincense • Myrrh",
        tagline: "Drevna spiritualna harmonija",
        volume: "10 ml",
        description: "Ovaj povijesni duet tamjanovca i smirne donosi duboku, balzamičnu aromu koja kroz vijekove simbolizira duhovnost i meditaciju. Umirujući spoj koji poziva na unutarnju refleksiju i mir.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Tamjanovac (Boswellia carterii), Smirna (Commiphora myrrha) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend7.png", alt: "Frankincense • Myrrh blend roll on" },
            { src: "images/2blend7-1.png", alt: "Frankincense • Myrrh detail 1" },
            { src: "images/2blend7-2.png", alt: "Frankincense • Myrrh detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "patchouli-bergamot": {
        id: "patchouli-bergamot",
        title: "Patchouli • Bergamot",
        tagline: "Zemljana dubina s citrusnom svježinom",
        volume: "10 ml",
        description: "Opojna mješavina zemljanog pačulija i svježeg bergamota stvara uravnotežen miris koji istovremeno uzemljuje i energizira. Ovaj blend kombinira duboke, zemljane note pačulija s osvježavajućim citrusnim akcentima bergamota.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Pačuli (Pogostemon cablin), Bergamot (Citrus bergamia) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend6.png", alt: "Patchouli • Bergamot blend roll on" },
            { src: "images/2blend6-1.png", alt: "Patchouli • Bergamot detail 1" },
            { src: "images/2blend6-2.png", alt: "Patchouli • Bergamot detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "bergamot-vanilla": {
        id: "bergamot-vanilla",
        title: "Bergamot • Vanilla",
        tagline: "Citrusna svježina sa slatkom toplinom",
        volume: "10 ml",
        description: "Osvježavajući miris bergamota savršeno se slaže s toplim, ugodnim notama vanilije, stvarajući harmoničan blend koji podiže raspoloženje i unosi smirenost. Idealan za svakodnevno nošenje.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Bergamot (Citrus bergamia), Vanilija (Vanilla planifolia) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend8.png", alt: "Bergamot • Vanilla blend roll on" },
            { src: "images/2blend8-1.png", alt: "Bergamot • Vanilla detail 1" },
            { src: "images/2blend8-2.png", alt: "Bergamot • Vanilla detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "ylang-frankincense": {
        id: "ylang-frankincense",
        title: "Ylang Ylang • Frankincense",
        tagline: "Egzotični cvjetni miris s drevnom notom",
        volume: "10 ml",
        description: "Luksuzna kombinacija koja spaja egzotični, cvjetni miris ylang ylanga sa dubokim, balzamičnim tonovima tamjanovca. Ovaj blend stvara atmosferu koja opušta, uzdiže duh i potiče meditativno stanje.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Ylang Ylang (Cananga odorata), Tamjanovac (Boswellia carterii) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend9.png", alt: "Ylang Ylang • Frankincense blend roll on" },
            { src: "images/2blend9-1.png", alt: "Ylang Ylang • Frankincense detail 1" },
            { src: "images/2blend9-2.png", alt: "Ylang Ylang • Frankincense detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    "myrrh-vanilla": {
        id: "myrrh-vanilla",
        title: "Myrrh • Vanilla",
        tagline: "Drevna smola s toplom slatkoćom",
        volume: "10 ml",
        description: "Jedinstveni spoj drevne smirne i tople vanilije stvara bogatu, balzamičnu i istovremeno slatku aromu. Ova kombinacija pruža osjećaj ugode, topline i duboke smirenosti, idealna za trenutke opuštanja.",
        usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
        ingredients: "Smirna (Commiphora myrrha), Vanilija (Vanilla planifolia) u baznom ulju po izboru.",
        category: "Roll On EO",
        categoryType: "2 Blend Roll On",
        categoryLink: "rollon-eo.html",
        images: [
            { src: "images/2blend10.png", alt: "Myrrh • Vanilla blend roll on" },
            { src: "images/2blend10-1.png", alt: "Myrrh • Vanilla detail 1" },
            { src: "images/2blend10-2.png", alt: "Myrrh • Vanilla detail 2" }
        ],
        prices: {
            classic: 5.99,
            silk: 6.99,
            ultimate: 8.99
        }
    },
    
// 3 BLEND proizvodi - updated images
"bergamot-ylang-sandalwood": {
    id: "bergamot-ylang-sandalwood",
    title: "Bergamot • Ylang Ylang • Sandalwood",
    tagline: "Luksuzna tropska kompozicija",
    volume: "10 ml",
    description: "Uravnotežena mješavina osvježavajućeg bergamota, egzotičnog ylang ylanga i bogate sandalovine stvara harmoničan miris koji uzdiže duh i opušta tijelo, donoseći trajnu svježinu i eleganciju.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Bergamot (Citrus bergamia), Ylang Ylang (Cananga odorata), Sandalovina (Santalum album) u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "3 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/3blend1.png", alt: "Bergamot • Ylang Ylang • Sandalwood blend roll on" },
        { src: "images/3blend1-1.png", alt: "Bergamot • Ylang Ylang • Sandalwood detail 1" },
        { src: "images/3blend1-2.png", alt: "Bergamot • Ylang Ylang • Sandalwood detail 2" }
    ],
    prices: {
        classic: 6.99,
        silk: 7.99,
        ultimate: 9.99
    }
},
"frankincense-myrrh-vanilla": {
    id: "frankincense-myrrh-vanilla",
    title: "Frankincense • Myrrh • Vanilla",
    tagline: "Drevna spiritualna harmonija sa slatkoćom",
    volume: "10 ml",
    description: "Luksuzna kombinacija koja spaja drevne, balzamične arome tamjanovca i smirne s toplom, umirujućom vanilijom. Ovaj blend stvara atmosferu duboke meditacije s ugodnom slatkoćom koja opušta i uzdiže duh.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Tamjanovac (Boswellia carterii), Smirna (Commiphora myrrha), Vanilija (Vanilla planifolia) u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "3 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/3blend2.png", alt: "Frankincense • Myrrh • Vanilla blend roll on" },
        { src: "images/3blend2-1.png", alt: "Frankincense • Myrrh • Vanilla detail 1" },
        { src: "images/3blend2-2.png", alt: "Frankincense • Myrrh • Vanilla detail 2" }
    ],
    prices: {
        classic: 6.99,
        silk: 7.99,
        ultimate: 9.99
    }
},
"jasmine-bergamot-vanilla": {
    id: "jasmine-bergamot-vanilla",
    title: "Jasmine • Bergamot • Vanilla",
    tagline: "Cvjetna orijentalska harmonija",
    volume: "10 ml",
    description: "Elegantna kombinacija opojnog jasmina, osvježavajućeg bergamota i bogate sandalovine stvara sofisticiran miris koji istovremeno smiruje i uzdiže. Ovaj harmoničan blend pruža osjećaj luksuza i unutarnjeg mira.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Jasmin (Jasminum officinale), Bergamot (Citrus bergamia), Vanilla u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "3 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/3blend3.png", alt: "Jasmine • Bergamot • Sandalwood blend roll on" },
        { src: "images/3blend3-1.png", alt: "Jasmine • Bergamot • Sandalwood detail 1" },
        { src: "images/3blend3-2.png", alt: "Jasmine • Bergamot • Sandalwood detail 2" }
    ],
    prices: {
        classic: 6.99,
        silk: 7.99,
        ultimate: 9.99
    }
},
"patchouli-cedarwood-jasmine": {
    id: "patchouli-cedarwood-jasmine",
    title: "Patchouli • Cedarwood • Jasmine",
    tagline: "Šumska zemljana meditacija",
    volume: "10 ml",
    description: "Duboki, zemljani pačuli i topla kedrovoina stapaju se s profinjenim notama jasmina, stvarajući kompleksan miris koji povezuje elemente zemlje, šume i cvijeta. Savršen blend za uzemljenje i unutarnji mir.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Pačuli (Pogostemon cablin), Kedrovo drvo (Cedrus atlantica), Jasmin (Jasminum officinale) u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "3 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/3blend4.png", alt: "Patchouli • Cedarwood • Jasmine blend roll on" },
        { src: "images/3blend4-1.png", alt: "Patchouli • Cedarwood • Jasmine detail 1" },
        { src: "images/3blend4-2.png", alt: "Patchouli • Cedarwood • Jasmine detail 2" }
    ],
    prices: {
        classic: 6.99,
        silk: 7.99,
        ultimate: 9.99
    }
},
"jasmine-myrrh-ylang": {
    id: "jasmine-myrrh-ylang",
    title: "Jasmine • Myrrh • Ylang Ylang",
    tagline: "Egzotična senzualna esencija",
    volume: "10 ml",
    description: "Luksuzna kombinacija opojnih cvjetnih nota jasmina i ylang ylanga s dubokom, balzamičnom smirnom stvara bogat, egzotičan i senzualan miris. Ovaj jedinstveni blend evocira drevne mirise Orijenta.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Jasmin (Jasminum officinale), Smirna (Commiphora myrrha), Ylang Ylang (Cananga odorata) u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "3 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/3blend5.png", alt: "Jasmine • Myrrh • Ylang Ylang blend roll on" },
        { src: "images/3blend5-1.png", alt: "Jasmine • Myrrh • Ylang Ylang detail 1" },
        { src: "images/3blend5-2.png", alt: "Jasmine • Myrrh • Ylang Ylang detail 2" }
    ],
    prices: {
        classic: 6.99,
        silk: 7.99,
        ultimate: 9.99
    }
},

// 4 BLEND proizvodi - updated images
"pine-cedarwood-bergamot-vanilla": {
    id: "pine-cedarwood-bergamot-vanilla",
    title: "Pine • Cedarwood • Bergamot • Vanilla",
    tagline: "Šumsko-slatka harmonija",
    volume: "10 ml",
    description: "Intrigantna kombinacija svježine borove šume, topline kedrovine, osvježavajućeg bergamota i slatke vanilije. Ovaj kompleksni blend stvara balansiranu aromu koja obnavlja energiju i smiruje duh.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Borove iglice (Pinus sylvestris), Kedrovo drvo (Cedrus atlantica), Bergamot (Citrus bergamia), Vanilija (Vanilla planifolia) u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "4 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/4blend1.png", alt: "Pine • Cedarwood • Bergamot • Vanilla blend roll on" },
        { src: "images/4blend2-1.png", alt: "Pine • Cedarwood • Bergamot • Vanilla detail 1" },
        { src: "images/4blend2-2.png", alt: "Pine • Cedarwood • Bergamot • Vanilla detail 2" }
    ],
    prices: {
        classic: 8.99,
        silk: 10.99,
        ultimate: 11.99
    }
},
"jasmine-patchouli-ylang-cedarwood": {
    id: "jasmine-patchouli-ylang-cedarwood",
    title: "Jasmine • Patchouli • Ylang Ylang • Cedarwood",
    tagline: "Bogata egzotična harmonija",
    volume: "10 ml",
    description: "Luksuzna kombinacija opojnog jasmina, zemljanog pačulija, egzotičnog ylang ylanga i tople kedrovine stvara kompleksan, bogat miris koji balansira cvjetne, zemljane i drvenaste note. Ovaj sofisticirani blend pruža duboko opuštajuće i uzdižuće iskustvo.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Jasmin (Jasminum officinale), Pačuli (Pogostemon cablin), Ylang Ylang (Cananga odorata), Kedrovo drvo (Cedrus atlantica) u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "4 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/4blend2.png", alt: "Jasmine • Patchouli • Ylang Ylang • Cedarwood blend roll on" },
        { src: "images/4blend1-1.png", alt: "Jasmine • Patchouli • Ylang Ylang • Cedarwood detail 1" },
        { src: "images/4blend1-2.png", alt: "Jasmine • Patchouli • Ylang Ylang • Cedarwood detail 2" }
    ],
    prices: {
        classic: 8.99,
        silk: 10.99,
        ultimate: 11.99
    }
},
"jasmine-ylang-bergamot-cedarwood": {
    id: "jasmine-ylang-bergamot-vanilla",
    title: "Jasmine • Ylang Ylang • Bergamot • Vanilla",
    tagline: "Luksuzna cvjetno-drvenasta kompozicija",
    volume: "10 ml",
    description: "Elegantna kombinacija koja spaja cvjetne note jasmina i ylang ylanga, osvježavajući citrusni bergamot i vanillu. Ovaj harmoničan blend stvara sofisticiran miris koji istovremeno energizira i opušta, pružajući trenutke luksuza u svakodnevici.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Jasmin (Jasminum officinale), Ylang Ylang (Cananga odorata), Bergamot (Citrus bergamia), Vanilla u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "4 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/4blend3.png", alt: "Jasmine • Ylang Ylang • Bergamot • Vanilla blend roll on" },
        { src: "images/4blend3-1.png", alt: "Jasmine • Ylang Ylang • Bergamot • Vanilla detail 1" },
        { src: "images/4blend3-2.png", alt: "Jasmine • Ylang Ylang • Bergamot • Vanilla detail 2" }
    ],
    prices: {
        classic: 8.99,
        silk: 10.99,
        ultimate: 11.99
    }
},

// 5 BLEND proizvodi - updated images
"patchouli-frankincense-myrrh-sandalwood-vanilla": {
    id: "patchouli-frankincense-myrrh-sandalwood-vanilla",
    title: "Patchouli • Frankincense • Myrrh • Sandalwood • Vanilla",
    tagline: "Luksuzni orijentalni parfem",
    volume: "10 ml",
    description: "Raskošna kombinacija pet moćnih esencijalnih ulja stvara duboku, kompleksnu aromu koja je istovremeno zemljana, drvenasta, balzamična i slatka. Ovaj luksuzni blend pruža nenadmašno iskustvo mirisa.",
    usage: "Nanesite na pulsne tačke. Idealno kao prirodna mirisna terapija, diskretni parfem ili kao dodatni sloj ispod vašeg omiljenog parfema za veću postojanost. Za najbolje rezultate, nanosite više puta tokom dana po potrebi.",
    ingredients: "Pačuli (Pogostemon cablin), Tamjanovac (Boswellia carterii), Smirna (Commiphora myrrha), Sandalovina (Santalum album), Vanilija (Vanilla planifolia) u baznom ulju po izboru.",
    category: "Roll On EO",
    categoryType: "5 Blend Roll On",
    categoryLink: "rollon-eo.html",
    images: [
        { src: "images/5blend1.png", alt: "Luxury 5 Oil Blend roll on" },
        { src: "images/5blend1-1.png", alt: "Luxury 5 Oil Blend detail 1" },
        { src: "images/5blend1-2.png", alt: "Luxury 5 Oil Blend detail 2" }
    ],
    prices: {
        classic: 8.99,
        silk: 10.99,
        ultimate: 12.99
    }
}
    // Dodaj ostale proizvode po potrebi
}; // <-- Dodao zatvarajuću vitičastu zagradu ovdje
