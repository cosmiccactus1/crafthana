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
    
    // 3 BLEND proizvodi
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
            { src: "images/blend-placeholder.png", alt: "Bergamot • Ylang Ylang • Sandalwood blend roll on" },
            { src: "images/blend-placeholder.png", alt: "Bergamot • Ylang Ylang • Sandalwood detail 1" },
            { src: "images/blend-placeholder.png", alt: "Bergamot • Ylang Ylang • Sandalwood detail 2" }
        ],
        prices: {
            classic: 6.99,
            silk: 7.99,
            ultimate: 9.99
        }
    },
    
    // 4 BLEND proizvodi
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
            { src: "images/pcbv.png", alt: "Pine • Cedarwood • Bergamot • Vanilla blend roll on" },
            { src: "images/pcbv-1.png", alt: "Pine • Cedarwood • Bergamot • Vanilla detail 1" },
            { src: "images/pcbv-2.png", alt: "Pine • Cedarwood • Bergamot • Vanilla detail 2" }
        ],
        prices: {
            classic: 8.99,
            silk: 10.99,
            ultimate: 11.99
        }
    },
    
    // 5 BLEND proizvodi
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
            { src: "images/blend-placeholder.png", alt: "Luxury 5 Oil Blend roll on" },
            { src: "images/blend-placeholder.png", alt: "Luxury 5 Oil Blend detail 1" },
            { src: "images/blend-placeholder.png", alt: "Luxury 5 Oil Blend detail 2" }
        ],
        prices: {
            classic: 8.99,
            silk: 10.99,
            ultimate: 12.99
        }
    }
    
    // Dodaj ostale proizvode po potrebi
};
