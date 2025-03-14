/**
 * Baza podataka svih Essential Oil proizvoda
 * Ovdje definišemo sve proizvode koji se prikazuju na stranici
 */
const allEOProducts = {
    // Klasični Blendovi
    "vanilla-jasmine": {
        id: "vanilla-jasmine",
        title: "Vanilla • Jasmine",
        tagline: "Slatka, cvjetna harmonija",
        volume: "10 ml",
        description: "Luksuzna kombinacija slatke vanilije i opojnog jasmina stvara bogat, topao miris koji osvaja svojom elegancijom. Ovaj blend podiže raspoloženje i stvara osjećaj ugode i relaksacije. Idealan za stvaranje smirujuće atmosfere u vašem domu.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Također pogodno za ručnu izradu svijeća, sapuna i drugih mirisnih proizvoda.",
        ingredients: "Vanilija (Vanilla planifolia), Jasmin (Jasminum officinale) u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Klasični Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Podiže raspoloženje i smanjuje stres",
            "Stvara opuštajuću i ugodnu atmosferu",
            "Poboljšava kvalitetu sna",
            "100% prirodna eterična ulja",
            "Proizvedeno u Bosni i Hercegovini"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Vanilla • Jasmine essential oil" },
            { src: "images/EOtest.jpg", alt: "Vanilla • Jasmine detail 1" },
            { src: "images/EOtest.jpg", alt: "Vanilla • Jasmine detail 2" }
        ],
        price: 7.99
    },
    
    "pine-cedarwood": {
        id: "pine-cedarwood",
        title: "Pine Needle • Cedarwood",
        tagline: "Svježa šumska harmonija",
        volume: "10 ml",
        description: "Osvježavajuća aroma borovih iglica s toplom, zemljanom notom kedrovine stvara utisak šetnje šumom. Ovaj prirodni blend pomaže pri koncentraciji i donosi svježinu u prostor. Savršen za osvježavanje doma i stvaranje umirujuće šumske atmosfere.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Također pogodno za ručnu izradu svijeća, sapuna i drugih mirisnih proizvoda.",
        ingredients: "Borove iglice (Pinus sylvestris), Kedrovo drvo (Cedrus atlantica) u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Klasični Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Pročišćava zrak i uklanja neugodne mirise",
            "Poboljšava koncentraciju i mentalnu jasnoću",
            "Smanjuje stres i napetost",
            "100% prirodna eterična ulja",
            "Idealno za zimski ambijent"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Pine Needle • Cedarwood essential oil" },
            { src: "images/EOtest.jpg", alt: "Pine Needle • Cedarwood detail 1" },
            { src: "images/EOtest.jpg", alt: "Pine Needle • Cedarwood detail 2" }
        ],
        price: 7.99
    },
    
    "bergamot-vanilla": {
        id: "bergamot-vanilla",
        title: "Bergamot • Vanilla",
        tagline: "Slatka citrusna elegancija",
        volume: "10 ml",
        description: "Osvježavajući miris bergamota savršeno se slaže s toplim, ugodnim notama vanilije, stvarajući harmoničan blend koji podiže raspoloženje i unosi smirenost. Idealan za stvaranje ugodne atmosfere u dnevnom boravku ili radnom prostoru.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Također pogodno za ručnu izradu svijeća, sapuna i drugih mirisnih proizvoda.",
        ingredients: "Bergamot (Citrus bergamia), Vanilija (Vanilla planifolia) u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Klasični Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Smanjuje anksioznost i stres",
            "Poboljšava raspoloženje",
            "Stvara toplu i ugodnu atmosferu",
            "100% prirodna eterična ulja",
            "Pomaže kod koncentracije i fokusa"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Bergamot • Vanilla essential oil" },
            { src: "images/EOtest.jpg", alt: "Bergamot • Vanilla detail 1" },
            { src: "images/EOtest.jpg", alt: "Bergamot • Vanilla detail 2" }
        ],
        price: 7.99
    },
    
    "myrrh-vanilla": {
        id: "myrrh-vanilla",
        title: "Myrrh • Vanilla",
        tagline: "Topla orijentalna slatkoća",
        volume: "10 ml",
        description: "Jedinstveni spoj drevne smirne i tople vanilije stvara bogatu, balzamičnu i istovremeno slatku aromu. Ova kombinacija pruža osjećaj ugode, topline i duboke smirenosti, idealna za meditaciju i opuštanje u večernjim satima.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Također pogodno za ručnu izradu svijeća, sapuna i drugih mirisnih proizvoda.",
        ingredients: "Smirna (Commiphora myrrha), Vanilija (Vanilla planifolia) u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Klasični Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Pomaže kod opuštanja i smanjenja stresa",
            "Idealno za meditaciju i duboku relaksaciju",
            "Stvara toplu i egzotičnu atmosferu",
            "100% prirodna eterična ulja",
            "Pročišćava zrak i um"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Myrrh • Vanilla essential oil" },
            { src: "images/EOtest.jpg", alt: "Myrrh • Vanilla detail 1" },
            { src: "images/EOtest.jpg", alt: "Myrrh • Vanilla detail 2" }
        ],
        price: 7.99
    },
    
    "bergamot-ylang-sandalwood": {
        id: "bergamot-ylang-sandalwood",
        title: "Bergamot • Ylang Ylang • Sandalwood",
        tagline: "Luksuzna tropska kompozicija",
        volume: "10 ml",
        description: "Uravnotežena mješavina osvježavajućeg bergamota, egzotičnog ylang ylanga i bogate sandalovine stvara harmoničan miris koji uzdiže duh i opušta tijelo, donoseći trajnu svježinu i eleganciju.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Također pogodno za ručnu izradu svijeća, sapuna i drugih mirisnih proizvoda.",
        ingredients: "Bergamot (Citrus bergamia), Ylang Ylang (Cananga odorata), Sandalovina (Santalum album) u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Klasični Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Stvara luksuznu i egzotičnu atmosferu",
            "Balansira raspoloženje i emocije",
            "Pomaže kod opuštanja nakon napornog dana",
            "100% prirodna eterična ulja",
            "Idealan za spavaću sobu i prostore za opuštanje"
        ],
        images: [
            { src: "images/blend-placeholder.png", alt: "Bergamot • Ylang Ylang • Sandalwood essential oil" },
            { src: "images/blend-placeholder.png", alt: "Bergamot • Ylang Ylang • Sandalwood detail 1" },
            { src: "images/blend-placeholder.png", alt: "Bergamot • Ylang Ylang • Sandalwood detail 2" }
        ],
        price: 8.99
    },
    
    "pine-cedarwood-bergamot-vanilla": {
        id: "pine-cedarwood-bergamot-vanilla",
        title: "Pine • Cedarwood • Bergamot • Vanilla",
        tagline: "Šumsko-slatka harmonija",
        volume: "10 ml",
        description: "Intrigantna kombinacija svježine borove šume, topline kedrovine, osvježavajućeg bergamota i slatke vanilije. Ovaj kompleksni blend stvara balansiranu aromu koja obnavlja energiju i smiruje duh. Savršen za sve godišnje doba i različite prostorije u domu.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Također pogodno za ručnu izradu svijeća, sapuna i drugih mirisnih proizvoda.",
        ingredients: "Borove iglice (Pinus sylvestris), Kedrovo drvo (Cedrus atlantica), Bergamot (Citrus bergamia), Vanilija (Vanilla planifolia) u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Klasični Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Kompleksna aroma koja se prilagođava različitim raspoloženjima",
            "Stvara uravnoteženu atmosferu u domu",
            "Kombinira osvježavajuće i umirujuće elemente",
            "100% prirodna eterična ulja",
            "Univerzalan miris za sve prostore"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Pine • Cedarwood • Bergamot • Vanilla essential oil" },
            { src: "images/EOtest.jpg", alt: "Pine • Cedarwood • Bergamot • Vanilla detail 1" },
            { src: "images/EOtest.jpg", alt: "Pine • Cedarwood • Bergamot • Vanilla detail 2" }
        ],
        price: 8.99
    },
    
    // Special Blendovi
    "planinska-koliba": {
        id: "planinska-koliba",
        title: "Planinska Koliba",
        tagline: "Zimska čarolija borova i toplog ognjišta",
        volume: "10 ml",
        description: "Jedinstveni blend koji spaja svježinu planinskog zraka, miris borove šume i toplinu drvenog ognjišta. Ovaj kompleksni miris prenosi vas u ugodnu planinsku kolibu, okruženu snijegom i mirom prirode. Idealan za stvaranje zimske atmosfere i osjećaja topline i sigurnosti u vašem domu.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Posebno preporučeno za zimske dane i večeri.",
        ingredients: "Pažljivo izbalansirana mješavina eteričnih ulja bora, kedrovine, smreke, cimeta i vanilije u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Special Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Stvara atmosferu planinske kolibe u vašem domu",
            "Idealan zimski miris koji pobuđuje ugodne emocije",
            "Smanjuje stres i stvara osjećaj sigurnosti",
            "100% prirodna eterična ulja",
            "Pročišćava zrak i poboljšava raspoloženje"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Planinska Koliba essential oil" },
            { src: "images/EOtest.jpg", alt: "Planinska Koliba detail 1" },
            { src: "images/EOtest.jpg", alt: "Planinska Koliba detail 2" }
        ],
        price: 11.99
    },
    
    "jaffa-keks": {
        id: "jaffa-keks",
        title: "Jaffa Keks",
        tagline: "Nostalgična kombinacija čokolade i naranče",
        volume: "10 ml",
        description: "Sladak, nostalgičan miris koji savršeno oponaša omiljeni keks generacija. Bogata aroma čokolade isprepletena s osvježavajućim notama naranče stvara toplu, ugodnu atmosferu koja budi najljepše uspomene iz djetinjstva. Idealan za kuhinju, dnevni boravak ili bilo koji prostor gdje želite stvoriti ugodnu, slatku atmosferu.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Posebno preporučeno za druženja i obiteljska okupljanja.",
        ingredients: "Pažljivo kreirana mješavina eteričnih ulja naranče, kakaa, vanilije i drugih prirodnih sastojaka u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Special Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Stvara toplu i nostalgičnu atmosferu",
            "Podiže raspoloženje i budi lijepe uspomene",
            "Savršen za obiteljska okupljanja",
            "100% prirodna eterična ulja",
            "Maskira neugodne mirise i stvara ugodnu atmosferu"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Jaffa Keks essential oil" },
            { src: "images/EOtest.jpg", alt: "Jaffa Keks detail 1" },
            { src: "images/EOtest.jpg", alt: "Jaffa Keks detail 2" }
        ],
        price: 11.99
    },
    
    "zalazak-sunca": {
        id: "zalazak-sunca",
        title: "Zalazak Sunca",
        tagline: "Topli cvjetni akordi s notom ambera",
        volume: "10 ml",
        description: "Bogata, topla aroma koja evocira mirne ljetne večeri i romantične zalaske sunca. Ovaj sofisticirani blend kombinira cvjetne note s toplim, dubokim akordima ambera i sandalovine, stvarajući uravnoteženu aromu koja opušta i smiruje duh. Idealan za večernje opuštanje i stvaranje romantične atmosfere.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Preporučeno za večernje sate i romantične trenutke.",
        ingredients: "Kompozicija eteričnih ulja ruže, jasmina, ambera, sandalovine i drugih ekskluzivnih sastojaka u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Special Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Stvara atmosferu opuštanja i mira",
            "Idealan za romantične večeri",
            "Smanjuje stres i anksioznost",
            "100% prirodna eterična ulja",
            "Pomaže kod nesanice i nemira"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Zalazak Sunca essential oil" },
            { src: "images/EOtest.jpg", alt: "Zalazak Sunca detail 1" },
            { src: "images/EOtest.jpg", alt: "Zalazak Sunca detail 2" }
        ],
        price: 11.99
    },
    
    "kandirana-mandarina": {
        id: "kandirana-mandarina",
        title: "Kandirana Mandarina",
        tagline: "Slatka citrusna fantazija",
        volume: "10 ml",
        description: "Sočna, svježa aroma mandarine obogaćena slatkim, kandiranim notama stvara jedinstven miris koji istovremeno osvježava i ugađa. Ovaj radostan blend savršen je za podizanje raspoloženja, posebno tijekom hladnijih mjeseci kada donosi dašak mediteranske svježine i topline u vaš dom.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Odlično za jutarnje buđenje i podizanje energije.",
        ingredients: "Mandarina (Citrus reticulata), vanilija i drugi prirodni sastojci koji stvaraju efekat kandiranog voća, u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Special Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Podiže raspoloženje i energiju",
            "Osvježava prostor i stvara ugodnu atmosferu",
            "Smanjuje umor i mentalni napor",
            "100% prirodna eterična ulja",
            "Posebno popularan tijekom jesenskih i zimskih mjeseci"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Kandirana Mandarina essential oil" },
            { src: "images/EOtest.jpg", alt: "Kandirana Mandarina detail 1" },
            { src: "images/EOtest.jpg", alt: "Kandirana Mandarina detail 2" }
        ],
        price: 11.99
    },
    
    "bijeli-musk": {
        id: "bijeli-musk",
        title: "Bijeli Musk",
        tagline: "Čista elegancija i sofisticiranost",
        volume: "10 ml",
        description: "Raskošna, elegantna aroma inspirirana luksuznim parfemima, prilagođena za vaš dom. Ovaj sofisticirani blend stvara atmosferu čistoće, elegancije i luksuza. Bijeli musk ima suptilnu, puderastu i blago cvjetnu notu koja osvaja svojom bezvremenskom privlačnošću i univerzalnošću.",
        usage: "Idealno za električne difuzere. Dodajte 5-10 kapi u vodu u difuzeru za aromaterapiju cijelog prostora. Savršen za dnevni boravak, spavaću sobu i prostore za primanje gostiju.",
        ingredients: "Pažljivo balansirana formula prirodnih eteričnih ulja koja stvara profinjenu aromu bijelog muska, u 100% čistom obliku.",
        category: "Essential Oil",
        categoryType: "Special Blendovi",
        categoryLink: "essential-oil.html",
        benefits: [
            "Stvara elegantnu i luksuznu atmosferu",
            "Univerzalan miris koji odgovara svim prostorima",
            "Dugotrajan i suptilan",
            "100% prirodna eterična ulja",
            "Pogodan za poslovne prostore i domove"
        ],
        images: [
            { src: "images/EOtest.jpg", alt: "Bijeli Musk essential oil" },
            { src: "images/EOtest.jpg", alt: "Bijeli Musk detail 1" },
            { src: "images/EOtest.jpg", alt: "Bijeli Musk detail 2" }
        ],
        price: 11.99
    }
};
