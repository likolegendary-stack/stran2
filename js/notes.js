const NOTES_OPEN_KEY = "gefaNotes:lastTopic";
const NOTES_GROUP_KEY = "gefaNotes:openGroups";
const NOTES_FILTER_KEY = "gefaNotes:filters";

const notesSourceCorpus = [
    "M-GEO-2024-novi (2).pdf",
    "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
    "ilide.info-geografija-matura-zapiski-2-uc-benik-svet-pr_3ad6116b088680bcb9a084f45cca7b88.pdf",
    "geo_mat_celotna_snov_2010-DIJASKINET.docx",
    "geo_sno_evropa_32__celotna_snov.docx",
    "ilide.info-geografija-zapiski-1-pr_adb46da903e2bd107cdc664c63c0db0d.pdf",
    "ilide.info-kopija-od-copy-of-geografija-na-maturi-izpiski-1-pr_b8115ec84fc633d7921c025dbade8690.pdf",
    "ilide.info-obc-a-geografija-1-uc-benik-zapiski-pr_8554dd2c19db90c066217e3f44f92fbc.pdf",
    "gefa uprasanja/M231-M252 maturitetne pole in navodila za ocenjevanje"
];

function topic(id, title, summary, concepts, facts, mistakes, mapUnits = [], figures = [], detail = {}) {
    return { id, title, summary, concepts, facts, mistakes, mapUnits, figures, ...detail };
}

function richTopic(key, id, title, mapUnits = [], figures = []) {
    const item = sourceTopicContent[key];
    if (!item) throw new Error(`Missing source topic content: ${key}`);
    return topic(id, title, item.summary, item.concepts, item.facts, item.mistakes, mapUnits, figures, {
        explanation: item.explanation,
        process: item.process,
        examples: item.examples,
        source: item.source
    });
}

const sourceTopicContent = {
    "azija-relief": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf; M-GEO-2024-novi katalog",
        summary: "Azija je reliefno najbolj raznolika celina: ima najvišja mladonagubana gorstva, obsežne planote, velika nižavja, kotline in puščavske notranjosti.",
        concepts: ["Himalaja", "Tibet", "Pamirsko višavje", "Dekanska planota", "Sibirsko nižavje", "Gobi"],
        explanation: [
            "V virih je Azija predstavljena kot celina velikih reliefnih nasprotij. Na jugu in v osrednjem delu prevladujejo mladonagubana gorstva, med katerimi je najpomembnejša Himalaja. Nastala je ob trku Indijske plošče z Evrazijsko, zato je hkrati primer za regionalno geografijo in za tektoniko plošč.",
            "Severno od Himalaje leži Tibet, visoka planota, ki močno vpliva na kroženje zraka in monsun. V notranjosti celine so sušna višavja, kotline in puščave, na severu pa obsežna sibirska nižavja. Relief zato neposredno pojasnjuje podnebje, gostoto poselitve, prometne ovire in razporeditev kmetijstva.",
            "Za maturo je pomembno, da Azije ne opisuješ samo kot 'veliko celino', ampak povežeš enote: Himalaja zapira pot vlažnemu zraku, Tibet je visoka hladna planota, Gangesovo nižavje je gosto poseljeno in kmetijsko pomembno, Gobi pa je primer sušne notranjosti."
        ],
        process: ["trčenje Indijske in Evrazijske plošče", "gubanje in dvig Himalaje", "nastanek visokih planot in tektonskih kotlin", "vpliv reliefa na monsune, reke in poselitev"],
        examples: ["Himalaja", "Tibet", "Pamirsko višavje", "Gangeško nižavje", "Gobi", "Dekanska planota"],
        facts: ["Razloži nastanek Himalaje s trkom plošč.", "Poveži Tibet in Himalajo z monsunom.", "Poznaj velika nižavja ob Gangesu, Indu, Huang He in Jangceju.", "Loči vlažne obrobne dele od sušne notranjosti Azije."],
        mistakes: [["Himalaja je vulkansko gorstvo.", "Himalaja je predvsem nagubano gorstvo, nastalo s trkom celinskih plošč."], ["Tibet je nižavje.", "Tibet je visoka planota z velikim podnebnim vplivom."]]
    },
    "azija-podnebje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf; obča geografija zapiski",
        summary: "Podnebje Azije oblikujejo geografska širina, ogromna celinskost, reliefne ovire in monsunsko kroženje.",
        concepts: ["monsun", "celinskost", "orografske padavine", "tundra", "tajga", "puščavsko podnebje"],
        explanation: [
            "Azija sega od ekvatorialnega pasu do Arktike, zato ima skoraj vse podnebne tipe. V virih je posebej poudarjeno monsunsko kroženje: južni del azijskega kopna se poleti segreje bolj kot oceana, zato nastane nizek zračni tlak in vlažen zrak piha z morja na kopno. Poletni monsun prinese obilne padavine v Indijo, Bangladeš, Indokino in jugovzhodno Azijo.",
            "Notranjost Azije ima izrazito celinsko podnebje. Zaradi oddaljenosti od morja in reliefnih ovir prejme manj padavin, zato nastajajo stepe, polpuščave in puščave, na primer Gobi. Na severu Azije prevladujeta tajga in tundra, v visokogorjih pa gorsko podnebje.",
            "Maturitetno je najpomembnejša povezava: relief + monsun + reke + kmetijstvo. Himalaja vpliva na padavine in hkrati napaja velike reke s snegom in ledeniki, monsunske padavine pa povzročajo poplave in omogočajo riževo kmetijstvo."
        ],
        process: ["poletno segrevanje azijskega kopna", "nastanek nizkega zračnega tlaka nad celino", "dotok vlažnega zraka z oceanov", "obilne poletne padavine in poplave velikih rek"],
        examples: ["Indija", "Bangladeš", "Ganges", "Brahmaputra", "Gobi", "Sibirija"],
        facts: ["Razloži poletni in zimski monsun.", "Prepoznaj monsunsko podnebje po poletnem višku padavin.", "Poveži Gobi in osrednjo Azijo s celinskostjo in reliefnimi ovirami.", "Poznaj tajgo in tundro v severni Aziji."],
        mistakes: [["Monsun je tropski ciklon.", "Monsun je sezonsko menjavanje smeri vetrov."], ["Vsa Azija ima monsunsko podnebje.", "Monsun je značilen predvsem za južno, jugovzhodno in vzhodno Azijo."]]
    },
    "azija-rastlinstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Rastlinstvo Azije sledi podnebnim pasovom: od ekvatorialnega gozda in monsunskega gozda do step, puščav, tajge in tundre.",
        concepts: ["monsunski gozd", "savana", "stepa", "tajga", "tundra", "puščavsko rastlinstvo"],
        explanation: [
            "V južni in jugovzhodni Aziji se rastlinstvo prilagaja menjavanju vlažnega in sušnega dela leta. Monsunski gozdovi v sušnem obdobju deloma odvržejo liste, zato niso enaki stalno zelenemu ekvatorialnemu gozdu. Tam, kjer je padavin manj, se pojavljajo savane in sušoljubno rastlinstvo.",
            "V notranjosti celine, kjer je vpliv morja majhen in padavin malo, prevladujejo stepe, polpuščave in puščave. V severni Aziji se zaradi hladnega podnebja razprostira tajga, še severneje tundra z mahovi, lišaji in nizkim rastlinstvom.",
            "Za maturo moraš rastlinstvo vedno razlagati skupaj s podnebjem. Če naloga pokaže klimogram ali karto padavin, iz tega sklepaš na rastlinstvo in možno rabo tal."
        ],
        process: ["temperatura in padavine določita vodno bilanco", "vlažni tropi omogočajo gozd", "sušna notranjost omogoča stepo in puščavo", "hladen sever omeji rast na tajgo in tundro"],
        examples: ["monsunski gozd JV Azije", "Gobi", "Sibirska tajga", "tundra severne Azije"],
        facts: ["Loči ekvatorialni in monsunski gozd.", "Poveži stepo in puščavo s sušnostjo notranjosti.", "Poznaj tajgo in tundro v severni Aziji."],
        mistakes: [["Monsunski gozd je enak tropskemu deževnemu gozdu.", "Monsunski gozd ima izrazito sušno dobo in delno odpadanje listov."]]
    },
    "azija-vodovje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Azijske reke izvirajo v visokogorjih in imajo velik pomen za poplave, namakanje, riževo kmetijstvo, hidroenergijo in gosto poselitev.",
        concepts: ["Ganges", "Brahmaputra", "Ind", "Huang He", "Jangce", "dežno-snežni režim"],
        explanation: [
            "Velike azijske reke so povezane z reliefom in monsunom. Mnoge izvirajo v najvišjih gorstvih, zato imajo snežno-ledeniški vpliv, v spodnjem toku pa jih močno povečajo poletne monsunske padavine. V virih je poudarjeno, da reke v monsunskih območjih pogosto poplavljajo.",
            "Ganges in Brahmaputra sta ključni za Indijo in Bangladeš: omogočata rodovitna naplavna nižavja, namakanje in gosto poselitev, a povzročata tudi poplavno ogroženost. Huang He in Jangce sta osrednji reki Kitajske, pomembni za kmetijstvo, promet, energijo in industrijski razvoj.",
            "Pri maturi moraš reko obravnavati kot sistem: izvir, režim, poplave, kmetijstvo, poselitev in gospodarstvo."
        ],
        process: ["sneg in ledeniki v visokogorju napajajo izvire", "poletni monsun poveča pretoke", "reke odlagajo naplavine v nižavjih", "nižavja postanejo območja kmetijstva in goste poselitve"],
        examples: ["Ganges", "Brahmaputra", "Ind", "Huang He", "Jangce", "Mekong"],
        facts: ["Poveži monsun s poplavami.", "Poznaj pomen Gangeškega nižavja.", "Razloži dežno-snežni režim velikih rek."],
        mistakes: [["Azijske reke so pomembne samo za promet.", "Pomembne so tudi za namakanje, hrano, energijo, poselitev in poplave."]]
    },
    "azija-prebivalstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf; obča geografija zapiski",
        summary: "Azija ima največje zgostitve prebivalstva na svetu, zlasti v južni in vzhodni Aziji ob velikih rekah.",
        concepts: ["gostota prebivalstva", "Gangeško nižavje", "Vzhodna Azija", "urbanizacija", "demografski prehod"],
        explanation: [
            "V virih sta kot veliki zgostitvi prebivalstva posebej izpostavljeni vzhodna Azija ob rekah Huang He in Jangce ter južna Azija ob Gangesu in Brahmaputri. Gosta poselitev je povezana z rodovitnimi naplavnimi ravninami, vodo, riževim kmetijstvom in dolgo zgodovino naselitve.",
            "Redkeje so poseljeni gorata notranjost, puščave, visokogorja in severna hladna območja. Stopnja urbanizacije je zelo različna: visoka je na Japonskem, v azijskih tigrih in naftnih državah Perzijskega zaliva, nižja pa v delih južne in jugovzhodne Azije.",
            "Maturitetno pomembno je primerjati naravne in družbene dejavnike poselitve: voda in prsti razložijo kmetijske zgostitve, industrija in storitve pa sodobna mesta."
        ],
        process: ["rodovitna naplavna nižavja", "namakalno in riževo kmetijstvo", "zgodnja civilizacijska jedra", "rast mest in industrijskih območij"],
        examples: ["Indija", "Bangladeš", "Kitajska", "Japonska", "Perzijski zaliv"],
        facts: ["Poznaj glavne zgostitve prebivalstva.", "Loči gosto poseljena nižavja od redkeje poseljene notranjosti.", "Poveži urbanizacijo z gospodarsko razvitostjo."],
        mistakes: [["Azija je povsod gosto poseljena.", "Zelo gosta so nižavja in obale, notranjost, puščave in visokogorja pa so redkeje poseljeni."]]
    },
    "azija-gospodarstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Azija ima največje razlike v gospodarski razvitosti na svetu: od visoko razvitih industrijskih držav do revnih agrarnih območij.",
        concepts: ["azijski tigri", "naftne države", "riževo kmetijstvo", "industrija", "globalne verige"],
        explanation: [
            "V virih je poudarjeno, da ima Azija izjemne razlike v stopnji gospodarskega in družbenega razvoja. Japonska, Južna Koreja, Singapur in druga industrijska središča so visoko razvita, naftne države ob Perzijskem zalivu temeljijo na energijskih virih, številna območja južne in jugovzhodne Azije pa imajo še velik delež kmetijstva.",
            "Kmetijstvo je močno povezano s podnebjem. Riž je glavna prehrambna kulturna rastlina v topli in vlažni monsunski Aziji. V bolj sušnih delih so pomembne pšenica, proso, živinoreja ali namakanje. Industrija se je razvila ob obalah, v mestih in v državah, ki so se vključile v svetovno trgovino.",
            "Pri maturi se pogosto preverja razlika med naravnimi pogoji in stopnjo razvoja: enaka celina ima hkrati tehnološka središča, naftna gospodarstva, gosto agrarno podeželje in revnejša območja."
        ],
        process: ["naravni viri in kmetijski pogoji", "industrializacija ob obalah in mestih", "vključevanje v svetovno trgovino", "povečevanje regionalnih razlik"],
        examples: ["Japonska", "Južna Koreja", "Singapur", "Perzijski zaliv", "Indija", "Kitajska"],
        facts: ["Poznaj riževo kmetijstvo monsunske Azije.", "Razloži pomen nafte v JZ Aziji.", "Primerjaj visoko razvite države in države v razvoju."],
        mistakes: [["Azija je gospodarsko enotna.", "Azija ima zelo velike razlike med regijami in državami."]]
    },
    "azija-drzave": {
        source: "regionalni zapiski in maturitetni katalog",
        summary: "Pri Aziji so za maturo pomembne države kot primeri različnih razvojnih poti: Kitajska, Indija, Japonska, azijski tigri in države Perzijskega zaliva.",
        concepts: ["Kitajska", "Indija", "Japonska", "azijski tigri", "Perzijski zaliv"],
        explanation: [
            "Kitajska je ključna zaradi velikosti, prebivalstva, industrializacije, velikih rek in regionalnih razlik. Indija je pomembna zaradi monsuna, Gangesa, goste poselitve, riževega in drugega kmetijstva ter hitrega razvoja storitev in industrije.",
            "Japonska je primer visoko razvite, gosto poseljene otoške države z malo naravnimi viri, a močno industrijo in tehnologijo. Azijski tigri kažejo hitro industrializacijo in vključenost v svetovno trgovino. Države Perzijskega zaliva so pomembne zaradi nafte, energetike, priseljene delovne sile in urbanizacije v sušnem okolju.",
            "Pri maturi države uporabljaš kot konkretne primere, ne kot seznam glavnih mest."
        ],
        process: ["naravni pogoji", "prebivalstveni pritiski", "industrializacija ali izvoz energentov", "regionalne razlike v razvoju"],
        examples: ["Kitajska", "Indija", "Japonska", "Južna Koreja", "Singapur", "Saudova Arabija"],
        facts: ["Za vsako državo poznaj vsaj en naravni in en gospodarski razlog pomembnosti.", "Poveži Indijo z monsunom in Kitajsko z velikimi rekami.", "Poveži Perzijski zaliv z nafto in sušnim okoljem."],
        mistakes: [["Države naštevam brez funkcije.", "Državo uporabi kot dokaz za pojav: monsun, industrija, nafta, gostota prebivalstva."]]
    },
    "azija-matura": {
        source: "maturitetni katalog; pole in navodila",
        summary: "Azija se na maturi najpogosteje pojavlja prek monsuna, Himalaje, velikih rek, goste poselitve in razlik v gospodarskem razvoju.",
        concepts: ["monsun", "Himalaja", "Ganges", "riž", "gostota prebivalstva", "razvojne razlike"],
        explanation: [
            "Katalog posebej zahteva razlago podnebnih dejavnikov v Aziji s poudarkom na monsunskem kroženju. To pomeni, da moraš znati opisati poletni in zimski monsun, razložiti padavinski višek in posledice za kmetijstvo ter poplave.",
            "Drugi stalni sklop je povezava reliefa in vodovja: Himalaja, Tibet, Ganges, Brahmaputra, Ind, Huang He in Jangce. Tretji sklop so prebivalstvo in gospodarstvo: goste poselitve ob rekah, riževo kmetijstvo, urbanizacija in razlike med Japonsko, Kitajsko, Indijo, tigri ter naftnimi državami.",
            "Dober maturitetni odgovor pri Aziji skoraj vedno poveže karto, naravni dejavnik in družbeno posledico."
        ],
        process: ["prepoznaj enoto na karti", "razloži naravni dejavnik", "poveži s prebivalstvom ali gospodarstvom", "dodaj konkreten primer države ali reke"],
        examples: ["monsunska Indija", "Gangeško nižavje", "Japonska", "Perzijski zaliv"],
        facts: ["Znati moraš monsun.", "Znati moraš Himalajo in velike reke.", "Znati moraš razvojne razlike v Aziji."],
        mistakes: [["Odgovor ostane samo pri karti.", "Karto moraš uporabiti za razlago pojava."]]
    }
};

Object.assign(sourceTopicContent, {
    "afrika-relief": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf; M-GEO-2024-novi katalog",
        summary: "Afrika je stara celina z velikimi planotami, kotlinami in tektonskimi jarki; izrazita mladonagubana gorstva so omejena predvsem na Atlas.",
        concepts: ["Afriški ščit", "Atlas", "Vzhodnoafriški tektonski jarek", "Etiopsko višavje", "Kongovska kotlina", "Kalahari"],
        explanation: ["Afrika v virih nastopa kot celina, ki jo v osnovi sestavlja star predkambrijski ščit. Zato nima toliko mladonagubanih gorstev kot Azija ali Južna Amerika, ampak prevladujejo višavja, planote in kotline.", "Posebnost je vzhodna Afrika z velikimi tektonskimi jarki in višavji. Rdeče morje je zalilo tektonski jarek, Jezersko višavje pa je pomembno zaradi jezer, vulkanizma in razgibanega reliefa. Atlas na severozahodu je mladonagubano gorstvo, povezano z alpidskim gorotvornim pasom.", "Relief Afrike moraš povezati s podnebjem in vodovjem: visoki robovi in notranje kotline vplivajo na reke, vzhodnoafriški jarki na jezera, Sahara pa na redko poselitev in prometne ovire."],
        process: ["stara stabilna afriška plošča", "dvigovanje in uravnavanje površja", "prelamljanje v vzhodni Afriki", "nastanek tektonskih jarkov, višavij in velikih jezer"],
        examples: ["Atlas", "Vzhodnoafriški tektonski jarek", "Etiopsko višavje", "Kongovska kotlina", "Kalahari"],
        facts: ["Razloži razliko med Atlasom in starim afriškim ščitom.", "Poznaj pomen Vzhodnoafriškega tektonskega jarka.", "Poveži relief z jezeri, vulkanizmom in poselitvijo."],
        mistakes: [["Afrika je reliefno enostavna ravnina.", "Afrika ima velike planote, kotline, višavja in tektonske jarke."]]
    },
    "afrika-podnebje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Afrika je najbolj tropska celina; podnebni pasovi so razporejeni zelo pravilno severno in južno od ekvatorja.",
        concepts: ["ekvatorialno podnebje", "savansko podnebje", "Sahara", "Sahel", "pasati", "Benguelski tok"],
        explanation: ["Ker ekvator skoraj seka Afriko po sredini, so podnebni in rastlinski pasovi razporejeni približno zrcalno. Ob ekvatorju je vroče in vlažno ekvatorialno podnebje, severno in južno sledijo savane, nato polsuha območja in puščave.", "Sahara na severu je največja vroča puščava. Na jugozahodu hladni Benguelski tok prispeva k sušnosti obale Namiba, na jugovzhodu pa topli tok prinaša več vlage. Vzhodnoafriška višavja imajo zaradi nadmorske višine gorsko podnebje.", "Za maturo je bistvena razlaga prehoda: ekvatorialni gozd - savana - Sahel - Sahara. Sahel je občutljivo prehodno območje, kjer se suše, prenaseljenost, prekomerna paša in širjenje puščave povežejo v razvojni problem."],
        process: ["močno sončno obsevanje v tropih", "premikanje pasu največjih padavin", "pasovi rastlinstva od ekvatorja proti povratnikoma", "suše in degradacija v prehodnih območjih"],
        examples: ["Kongovska kotlina", "Sahel", "Sahara", "Namib", "Kalahari"],
        facts: ["Razloži pravilno razporeditev podnebnih pasov.", "Poveži Sahel s sušo in degradacijo.", "Poznaj vpliv hladnega Benguelskega toka."],
        mistakes: [["Vsa Afrika je puščava.", "Puščave so pomembne, vendar ima Afrika tudi ekvatorialni gozd, savane, sredozemsko in gorsko podnebje."]]
    },
    "afrika-rastlinstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Rastlinstvo Afrike sledi padavinskim pasovom: ekvatorialni gozd, savana, stepno-polpuščavsko rastlinstvo in puščava.",
        concepts: ["ekvatorialni gozd", "savana", "Sahel", "puščavsko rastlinstvo", "mediteransko rastlinstvo"],
        explanation: ["V Kongovski kotlini in ob Gvinejskem zalivu so pogoji za ekvatorialni gozd: visoke temperature in veliko padavin. Ko se od ekvatorja oddaljujemo, se pojavi savana z deževno in sušno dobo.", "Sahel je prehod med savano in Saharo. Rastlinstvo je redkejše, zato je območje občutljivo za prekomerno pašo in suše. Na skrajnem severu in jugu so tudi sredozemski rastlinski tipi, v višavjih pa višinska pasovitost.", "Pri maturi moraš rastlinstvo vedno povezati s podnebnim tipom in človekovo rabo prostora, zlasti z živinorejo, požigalništvom in širjenjem puščave."],
        process: ["padavine se zmanjšujejo od ekvatorja proti puščavam", "gozd preide v savano", "savana preide v polpuščavo", "prekomerna raba pospeši degradacijo"],
        examples: ["Kongovski gozd", "savane vzhodne Afrike", "Sahel", "Sahara"],
        facts: ["Loči ekvatorialni gozd od savane.", "Razloži občutljivost Sahela.", "Poveži rastlinstvo s kmetijstvom in živinorejo."],
        mistakes: [["Savana je isto kot puščava.", "Savana ima travišča z drevesi in sezonske padavine; puščava ima zelo malo padavin."]]
    },
    "afrika-vodovje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Afrika ima velike reke, vendar je vodovje močno odvisno od podnebnih pasov; Nil je izjema, ker teče skozi puščavsko območje.",
        concepts: ["Nil", "Kongo", "Niger", "Zambezi", "Viktorijino jezero", "tektonska jezera"],
        explanation: ["Nil je za maturo klasičen primer reke, ki omogoča življenje in kmetijstvo v sušnem območju. Njegova dolina in delta sta gosto poseljeni, ker voda omogoča namakanje. Kongo ima veliko vode zaradi ekvatorialnega podnebja, Niger pa je pomemben za zahodno Afriko.", "V vzhodni Afriki so velika tektonska jezera, povezana z Vzhodnoafriškim tektonskim jarkom. Viktorijino jezero, Tanganjika in Malavi so pomembna za ribolov, vodooskrbo in regionalno gospodarstvo.", "Pri maturi je pomembno razložiti, zakaj vodna razpoložljivost v Afriki ni enakomerna: Sahara, Sahel in Kalahari imajo vodni primanjkljaj, ekvatorialni pas pa veliko vode."],
        process: ["padavinski pasovi določajo odtok", "reke prečkajo različna podnebna območja", "v sušnih območjih je namakanje ključno", "tektonika oblikuje vzhodnoafriška jezera"],
        examples: ["Nil", "Kongo", "Niger", "Viktorijino jezero", "Tanganjika"],
        facts: ["Razloži pomen Nila za Egipt.", "Poveži Kongo z ekvatorialnim podnebjem.", "Poznaj tektonska jezera vzhodne Afrike."],
        mistakes: [["Afrika nima vodnih virov.", "Ima velike reke in jezera, vendar so prostorsko zelo neenakomerno razporejeni."]]
    },
    "afrika-prebivalstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Prebivalstvo Afrike hitro narašča, poselitev pa je neenakomerna zaradi podnebja, vode, prsti, bolezni, zgodovine in gospodarstva.",
        concepts: ["demografska rast", "Sahel", "Nil", "podsaharska Afrika", "urbanizacija"],
        explanation: ["Afrika ima mlado prebivalstvo in visoko naravno rast, zlasti v podsaharskem delu. Gosteje so poseljena območja z več vode, bolj rodovitnimi prstmi, višavji z ugodnejšim podnebjem in obale. Puščave, zelo sušna območja in nekatere tropske gozdne notranjosti so redkeje poseljene.", "Viri poudarjajo razliko med severno Afriko, kjer prevladuje arabsko-islamski kulturni prostor, in podsaharsko Afriko, ki je jezikovno in kulturno zelo raznolika. Urbanizacija hitro narašča, pogosto hitreje kot infrastruktura in delovna mesta.", "Maturitetno pomembno je razložiti posledice demografske rasti: pritisk na kmetijska zemljišča, širjenje mest, migracije, težave z oskrbo, izobraževanjem in zaposlovanjem."],
        process: ["visoka rodnost in upadanje smrtnosti", "hitra rast mladega prebivalstva", "pritisk na zemljo in mesta", "migracije in razvojni problemi"],
        examples: ["Nilova dolina", "Sahel", "Lagos", "Kairo", "podsaharska Afrika"],
        facts: ["Poznaj vzroke hitre demografske rasti.", "Razloži neenakomerno poselitev.", "Poveži urbanizacijo z razvojnimi problemi."],
        mistakes: [["Afrika je redko poseljena povsod.", "Poselitev je zelo neenakomerna: Nilova dolina in obale so lahko zelo gosto poseljene."]]
    },
    "afrika-gospodarstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Afrika je gospodarsko najmanj razvita celina, vendar ima veliko rudnih bogastev, energijskih virov in kmetijskega potenciala.",
        concepts: ["rude", "nafta", "diamanti", "baker", "plantažno kmetijstvo", "Južna Afrika"],
        explanation: ["V virih je Afrika opisana kot celina z velikimi naravnimi bogastvi: zlato, diamanti, platina, boksit, baker, nafta in drugi viri. Kljub temu je velik del celine gospodarsko slabo razvit, ker razvoj omejujejo kolonialna preteklost, politična nestabilnost, slaba infrastruktura, odvisnost od izvoza surovin in neenakomerna razporeditev koristi.", "Južna Afrika je gospodarsko najrazvitejši del podsaharske Afrike z močno industrijo in rudnim bogastvom. V mnogih državah je še vedno pomembno samooskrbno ali plantažno kmetijstvo, pogosto občutljivo na suše.", "Pri maturi moraš razlikovati med naravnim bogastvom in gospodarsko razvitostjo: veliko virov še ne pomeni visokega življenjskega standarda."],
        process: ["izvoz surovin", "odvisnost od svetovnih cen", "pomanjkljiva infrastruktura", "počasna industrializacija in razvojne razlike"],
        examples: ["Južna Afrika", "Nigerija", "DR Kongo", "Sahel", "Gvinejski zaliv"],
        facts: ["Poznaj pomen rud in energijskih virov.", "Razloži odvisnost od izvoza surovin.", "Poveži kmetijstvo s podnebno ranljivostjo."],
        mistakes: [["Naravna bogastva avtomatično pomenijo razvitost.", "Brez infrastrukture, stabilnosti in predelovalne industrije lahko ostane država revna."]]
    },
    "afrika-problemi": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Problemi razvoja v Afriki so povezani s kolonialno dediščino, hitro rastjo prebivalstva, sušami, degradacijo okolja, boleznimi, konflikti in odvisnostjo od surovin.",
        concepts: ["Sahel", "dezertifikacija", "demografska rast", "bolezni", "odvisnost od surovin"],
        explanation: ["Sahel je najpomembnejši primer povezave naravnih in družbenih problemov. Suše same po sebi ne pojasnijo krize; pomembni so tudi prekomerna paša, širjenje obdelovalnih površin, rast prebivalstva in revščina. Posledica so degradacija prsti, lakota in migracije.", "V tropskih vlažnih območjih se hitreje širijo nekatere bolezni, kar vpliva na zdravje in delo prebivalstva. Gospodarstvo je pogosto odvisno od izvoza ene ali nekaj surovin, zato ga močno prizadenejo spremembe cen na svetovnem trgu.", "Maturitetno se od te teme pričakuje ovrednotenje: navesti moraš naravne in družbene vzroke ter posledice, ne samo napisati 'Afrika je revna'."],
        process: ["naravni pritisk: suša ali bolezni", "družbeni pritisk: rast prebivalstva in revščina", "prekomerna raba zemlje", "degradacija, migracije in razvojni zaostanek"],
        examples: ["Sahel", "Sahara", "podsaharska Afrika", "Gvinejski zaliv"],
        facts: ["Razloži dezertifikacijo.", "Loči naravne in družbene vzroke.", "Poveži razvojne probleme z gospodarstvom in prebivalstvom."],
        mistakes: [["Za probleme Afrike je krivo samo podnebje.", "Podnebje je pomembno, vendar so ključni tudi družbeni, politični in gospodarski dejavniki."]]
    }
});

Object.assign(sourceTopicContent, {
    "matura-zemljevid": {
        source: "maturitetni katalog; maturitetne pole in navodila",
        summary: "Delo z zemljevidom pomeni branje lege, merila, legende, plastnic, tematskih znakov in primerjanje prostorskih pojavov.",
        concepts: ["legenda", "merilo", "plastnice", "tematska karta", "orientacija", "reliefni profil"],
        explanation: ["Na maturi se zemljevidi uporabljajo pri nemih kartah, tematskih kartah, reliefu, podnebju, vodovju, poselitvi in gospodarstvu. Najprej je treba prebrati naslov karte, legendo, merilo in območje, šele nato razlagati pojav.", "Plastnice kažejo nadmorsko višino in naklon: goste plastnice pomenijo strmo pobočje, redke pa položnejše površje. Tematske karte prikazujejo en pojav, na primer gostoto prebivalstva, rabo tal, padavine ali gospodarsko dejavnost.", "Za polne točke moraš iz karte povzeti podatek in ga povezati z razlago. Če karta kaže veliko gostoto ob reki, napiši, katera reka in zakaj je pomembna."],
        process: ["preberi naslov in območje", "preberi legendo in merilo", "opiši razporeditev pojava", "razloži vzroke in posledice s konkretnimi imeni"],
        examples: ["nema karta Evrope", "tematska karta padavin", "karta gostote prebivalstva", "reliefna karta Slovenije"],
        facts: ["Znati moraš brati legendo in merilo.", "Znati moraš povezati karto z razlago.", "Pri nemi karti uporabljaj točna imena enot."],
        mistakes: [["Opisujem karto brez imen.", "Uporabi konkretne enote, reke, države, pokrajine ali mesta."]]
    },
    "matura-klimogram": {
        source: "maturitetni katalog; maturitetne pole",
        summary: "Klimogram prikazuje povprečne mesečne temperature in padavine ter omogoča prepoznavanje podnebnega tipa.",
        concepts: ["temperaturna krivulja", "padavinski stolpci", "letna amplituda", "sušno obdobje", "podnebni tip"],
        explanation: ["Pri klimogramu najprej preberi temperaturno krivuljo: ali so temperature visoke ali nizke, kolikšna je letna amplituda in na kateri polobli je kraj. Nato preberi padavine: količino, razporeditev po mesecih in morebitno sušno ali deževno dobo.", "Iz razmerja med temperaturo in padavinami sklepaš na podnebni tip, rastlinstvo in kmetijsko rabo. Monsunski klimogram ima izrazit poletni višek padavin, sredozemski suho poletje, ekvatorialni pa veliko padavin skozi vse leto.", "Na maturi moraš trditev dokazati s podatkom iz klimograma, na primer 'največ padavin je poleti' ali 'letna amplituda je velika'."],
        process: ["temperatura", "padavine", "letni potek", "določitev podnebnega tipa", "povezava z rastlinstvom in kmetijstvom"],
        examples: ["monsunski klimogram", "sredozemski klimogram", "celinski klimogram", "ekvatorialni klimogram"],
        facts: ["Znati moraš določiti podnebni tip.", "Znati moraš utemeljiti z meseci in podatki.", "Poveži klimogram z rastlinstvom."],
        mistakes: [["Napišem samo 'vroče je'.", "Dodaj dokaz: temperature po mesecih, amplituda in padavine."]]
    },
    "matura-grafi": {
        source: "maturitetne pole in navodila za ocenjevanje",
        summary: "Grafi in tabele na maturi preverjajo branje podatkov, primerjave, trende, izračune in razlago posledic.",
        concepts: ["trend", "primerjava", "delež", "BDP", "HDI", "starostna piramida"],
        explanation: ["Pri grafih najprej preberi naslov, enote in osi. Pogosta napaka je, da kandidat opisuje splošno znanje, ne pa podatkov iz grafa. Če graf prikazuje rast urbanizacije, moraš navesti smer spremembe, razliko med območji in možen vzrok.", "Starostne piramide pokažejo rodnost, smrtnost, staranje, migracije in stopnjo demografskega razvoja. Gospodarski kazalci, kot sta BDP in HDI, omogočajo primerjavo razvitosti, vendar jih je treba razlagati previdno.", "Navodila za ocenjevanje praviloma nagrajujejo točen podatek, pravilno primerjavo in razlago."],
        process: ["preberi naslov in enote", "ugotovi najvišje/najnižje vrednosti", "opiši trend", "razloži vzrok ali posledico"],
        examples: ["starostna piramida", "graf urbanizacije", "tabela BDP", "graf izpustov"],
        facts: ["Znati moraš brati osi in enote.", "Znati moraš izračunati razliko ali delež.", "Podatek poveži z geografsko razlago."],
        mistakes: [["Odgovorim iz glave, ne iz grafa.", "Najprej uporabi podatek iz grafa, potem razloži."]]
    },
    "matura-odgovori": {
        source: "navodila za ocenjevanje; maturitetni katalog",
        summary: "Dober maturitetni odgovor vsebuje definicijo, razlago, primer in jasno povezavo med naravnimi ter družbenimi dejavniki.",
        concepts: ["definicija", "razlaga", "primerjava", "utemeljitev", "vzrok", "posledica"],
        explanation: ["Pri vprašanjih 'opiši' navedeš značilnosti. Pri 'razloži' moraš dodati vzrok in mehanizem. Pri 'primerjaj' moraš pokazati podobnosti in razlike, ne samo opisati obeh stvari posebej. Pri 'utemelji' moraš trditev podpreti s konkretnim dokazom.", "Za polne točke uporabljaj geografske pojme in konkretne primere. Namesto 'tam je slabo vreme' napiši 'zaradi poletnega monsuna je poleti višek padavin, zato so pogoste poplave in riževo kmetijstvo'.", "Pogosta maturitetna past je preveč splošen odgovor. Geografija zahteva prostor: ime reke, gorovja, pokrajine, države ali regije."],
        process: ["opredeli pojem", "razloži proces", "dodaj konkreten primer", "navedi posledico ali primerjavo"],
        examples: ["subdukcija - Andi", "monsun - Indija", "dezertifikacija - Sahel", "suburbanizacija - okolica Ljubljane"],
        facts: ["Razlikuj opiši, razloži, primerjaj in utemelji.", "Uporabljaj konkretne geografske primere.", "Ne piši predolgih splošnih stavkov brez podatka."],
        mistakes: [["Napišem samo definicijo pri 'razloži'.", "Dodati moraš proces, vzrok ali posledico."]]
    },
    "matura-tipi": {
        source: "maturitetne pole 2023-2025; navodila za ocenjevanje",
        summary: "Najpogostejši tipi maturitetnih vprašanj so: naštej, opiši, razloži, primerjaj, utemelji, izračunaj, označi na karti in uporabi sliko ali graf.",
        concepts: ["naštej", "opiši", "razloži", "primerjaj", "utemelji", "izračunaj", "označi"],
        explanation: ["Vsak ukaz zahteva drugačen tip odgovora. 'Naštej' zahteva kratke pravilne elemente. 'Opiši' zahteva značilnosti. 'Razloži' zahteva vzrok ali proces. 'Primerjaj' zahteva podobnosti in razlike. 'Utemelji' zahteva dokaz. 'Izračunaj' zahteva pravilen postopek in enote.", "Pri nalogah s karto ali sliko se točke pogosto izgubijo, ker kandidat ne uporabi prikazanega vira. Če je v nalogi klimogram, graf ali karta, mora odgovor vsebovati podatek iz tega vira.", "Pri nemi karti je natančnost pomembna: enota mora biti označena na pravem območju."],
        process: ["prepoznaj ukazni glagol", "izberi tip odgovora", "uporabi vir v nalogi", "preveri, ali si dodal primer ali podatek"],
        examples: ["označi Himalajo", "razloži monsun", "primerjaj Arktiko in Antarktiko", "izračunaj naravni prirastek"],
        facts: ["Poznaj ukazne glagole.", "Pri grafih in kartah uporabi vir.", "Pri izračunih dodaj enote."],
        mistakes: [["Pri 'primerjaj' napišem dva ločena opisa.", "Primerjava mora jasno povedati podobnosti in razlike."]]
    }
});

Object.assign(sourceTopicContent, {
    "geografija-kot-veda": {
        source: "obča geografija zapiski; M-GEO-2024-novi katalog",
        summary: "Geografija je veda o pokrajini, prostorskih pojavih in povezavah med naravnimi ter družbenimi dejavniki na Zemlji.",
        concepts: ["geografija", "geosfera", "atmosfera", "hidrosfera", "pedosfera", "biosfera", "pokrajina", "regija"],
        explanation: ["Geografija ne obravnava samo imen krajev, držav in rek, ampak razlaga prostorske povezave. Preučuje naravnogeografske elemente, kot so relief, podnebje, vodovje, prsti in rastlinstvo, ter družbenogeografske elemente, kot so prebivalstvo, naselja, gospodarstvo, promet in raba prostora.", "Pokrajina je del Zemljinega površja, kjer se naravni in družbeni elementi povezujejo v celoto. Regija je območje, ki ga določimo po izbranih merilih, na primer po reliefu, podnebju, gospodarstvu ali funkcijskih povezavah.", "Za maturo je pomembno razumeti razliko med občno in regionalno geografijo. Obča geografija razlaga procese in pojme, regionalna geografija pa te procese uporabi na konkretnih območjih sveta, Evrope in Slovenije."],
        process: ["opazovanje prostorskega pojava", "opis razporeditve", "razlaga naravnih in družbenih dejavnikov", "primerjava pokrajin ali regij"],
        examples: ["monsun v Aziji", "kras v Sloveniji", "urbanizacija Evrope", "dezertifikacija Sahela"],
        facts: ["Loči naravnogeografske in družbenogeografske elemente.", "Razloži pojma pokrajina in regija.", "Razlikuj občno in regionalno geografijo."],
        mistakes: [["Geografija je samo učenje zemljevidov.", "Zemljevid je orodje; geografija razlaga prostorske procese in povezave."]]
    },
    "evropa-celina": {
        source: "regionalna skripta; M-GEO katalog",
        summary: "Evropa je močno razčlenjena celina z velikim zgodovinskim, kulturnim in gospodarskim pomenom, čeprav je po površini med manjšimi celinami.",
        concepts: ["Evropa", "Ural", "Kavkaz", "Sredozemlje", "polotoki", "otoki", "razčlenjenost"],
        explanation: ["Meja med Evropo in Azijo ni samo naravna, ampak tudi zgodovinsko-kulturna. Običajno poteka po Uralu, reki Ural, Kaspijskem jezeru, Kavkazu, Črnem morju in ožinah Bospor ter Dardanele.", "Evropa je zelo razčlenjena: ima veliko polotokov, otokov, zalivov in notranjih morij. Ta razčlenjenost je pospeševala pomorstvo, trgovino, kulturne stike in razvoj pristaniških mest.", "Pri maturi je Evropa pomembna kot samostojna regionalna enota in kot okvir za razumevanje Slovenije, EU, migracij, regionalnih razlik in gospodarskega razvoja."],
        process: ["razčlenjene obale omogočijo stik kopnega in morja", "morja spodbujajo promet in trgovino", "zgodovina oblikuje kulturne regije", "gospodarsko povezovanje vodi v EU"],
        examples: ["Skandinavski polotok", "Apeninski polotok", "Balkanski polotok", "Britansko otočje", "Sredozemsko morje"],
        facts: ["Poznaj mejo med Evropo in Azijo.", "Razloži pomen razčlenjenosti.", "Poveži lego Evrope s prometom in zgodovino."],
        mistakes: [["Evropa je jasno ločena od Azije z oceanom.", "Evropa in Azija sta del iste kopenske mase; meja je dogovorjena naravno-kulturno."]]
    },
    "evropa-okolje": {
        source: "regionalna skripta; M-GEO katalog",
        summary: "Okoljski problemi Evrope so povezani z industrijo, prometom, urbanizacijo, intenzivnim kmetijstvom, podnebnimi spremembami, poplavami in sušami.",
        concepts: ["onesnaženje zraka", "onesnaženje voda", "promet", "poplave", "suše", "varstvo okolja"],
        explanation: ["Evropa je gosto poseljena in gospodarsko razvita, zato so okoljski pritiski veliki. Industrija in promet prispevata k onesnaževanju zraka, reke so bile marsikje obremenjene z industrijskimi, komunalnimi in kmetijskimi odplakami, intenzivno kmetijstvo pa vpliva na prsti in vode.", "Podnebne spremembe povečujejo pogostost vročinskih valov, suš, gozdnih požarov in poplav. V gorah se krčijo ledeniki, v Sredozemlju se krepi poletna sušnost, v nižavjih pa se povečuje poplavna ogroženost.", "Maturitetno je pomembno navesti okoljski problem, vzrok, posledico in možno rešitev: javni promet, čistilne naprave, varstvo voda, obnovljivi viri, prilagajanje na poplave in suše."],
        process: ["gospodarska dejavnost povzroči pritisk", "onesnaženje vpliva na zrak, vode ali prsti", "podnebne spremembe povečajo skrajnosti", "varovalni ukrepi zmanjšujejo posledice"],
        examples: ["Ren", "Donava", "Alpe", "Sredozemlje", "Severno morje"],
        facts: ["Poveži promet z onesnaženjem.", "Razloži poplave in suše kot okoljski problem.", "Navedi konkretne ukrepe varstva okolja."],
        mistakes: [["Okoljski problemi so samo lokalni.", "Veliko problemov je čezmejnih, zato so pomembni evropski dogovori."]]
    },
    "slovenija-lega": {
        source: "slovenski zapiski; M-GEO katalog",
        summary: "Slovenija ima izrazito prehodno lego na stiku Alp, Dinaridov, Panonske kotline in Sredozemlja.",
        concepts: ["geografska lega", "prometna lega", "prehodnost", "Alpe", "Dinaridi", "Panonska kotlina", "Sredozemlje"],
        explanation: ["Lega Slovenije pojasnjuje veliko njenih naravnih in družbenih značilnosti. Na majhnem prostoru se stikajo alpski, dinarski, panonski in sredozemski vplivi, zato se hitro menjajo relief, podnebje, vodovje, prsti, rastlinstvo in raba prostora.", "Prometna lega je pomembna, ker Slovenija leži med Srednjo Evropo, Jadranom, Panonsko nižino in Balkanom. Zato so pomembni prometni koridorji, Luka Koper, Ljubljanska kotlina kot križišče in naravni prehodi skozi dinarsko-alpski svet.", "Pri maturi lego vedno poveži s posledicami: promet, gospodarstvo, turizem, kulturni stiki, podnebni prehodi in regionalna raznolikost."],
        process: ["stik naravnih enot", "prehodni podnebni in reliefni vplivi", "razvoj prometnih smeri", "gospodarska in kulturna povezanost"],
        examples: ["Luka Koper", "Ljubljanska kotlina", "Postojnska vrata", "Karavanke"],
        facts: ["Razloži prehodno lego Slovenije.", "Poveži lego s prometom in gospodarstvom.", "Poznaj stik štirih velikih evropskih enot."],
        mistakes: [["Lega pomeni samo geografske koordinate.", "Pri geografiji lega pomeni tudi prometni, gospodarski in pokrajinski položaj."]]
    },
    "slovenija-prsti-rastlinstvo": {
        source: "slovenski zapiski; obča geografija zapiski",
        summary: "Prsti in rastlinstvo Slovenije so odvisni od kamninske podlage, reliefa, podnebja, vode in človekove rabe prostora.",
        concepts: ["rjave prsti", "obrečne prsti", "kraške prsti", "gozdnatost", "višinski pasovi", "varovana območja"],
        explanation: ["Slovenija je zelo gozdnata država, ker so mnogi reliefno razgibani, kraški ali gorski deli manj primerni za intenzivno kmetijstvo. V nižinah in ob rekah so pomembne rodovitnejše obrečne prsti, na krasu pa so prsti plitve, kamnite in občutljive.", "Rastlinstvo se spreminja z nadmorsko višino in podnebnimi vplivi. V Alpah so izraziti višinski pasovi, v dinarskem svetu prevladujejo gozdovi, v submediteranskem delu se pojavljajo sredozemski vplivi.", "Pri maturi prsti in rastlinstvo poveži z rabo tal, kmetijstvom, gozdarstvom, erozijo, zaraščanjem in varovanimi območji."],
        process: ["kamninska podlaga in podnebje vplivata na nastanek prsti", "relief določa debelino in erozijo", "rastlinstvo sledi višini in vlagi", "človek spreminja rabo tal"],
        examples: ["Kras", "Alpe", "Prekmurje", "Ljubljansko barje", "Kočevsko"],
        facts: ["Poznaj visoko gozdnatost Slovenije.", "Razloži kraške in obrečne prsti.", "Poveži višinske pasove z Alpami."],
        mistakes: [["Prsti so povsod enako rodovitne.", "Rodovitnost je odvisna od podlage, vode, reliefa in rabe prostora."]]
    },
    "slovenija-naselja": {
        source: "slovenski zapiski; M-GEO katalog",
        summary: "Naselja Slovenije se razlikujejo po reliefu, zgodovini, prometni dostopnosti in funkciji; pomembni sta urbanizacija in suburbanizacija.",
        concepts: ["podeželsko naselje", "mestno naselje", "suburbanizacija", "centralna naselja", "razpršena poselitev"],
        explanation: ["Podeželska naselja so v Sloveniji zelo raznolika: v ravninah in dolinah so drugačna kot v hribovjih, na krasu ali v alpskem svetu. Mestna naselja so funkcijska središča, ki nudijo delovna mesta, šolstvo, zdravstvo, trgovino in prometne povezave.", "Suburbanizacija je posebej pomembna v okolici Ljubljane, Maribora, Kopra, Celja in drugih središč. Ljudje se selijo v obmestje, kar povečuje dnevne migracije, promet, pozidavo in pritisk na kmetijska zemljišča.", "Pri maturi moraš naselje obravnavati prostorsko: kje leži, kakšno funkcijo ima in kako je povezano s prometom ter zaposlitvijo."],
        process: ["naravni pogoji vplivajo na prvotno poselitev", "promet in delovna mesta povečajo pomen mest", "suburbanizacija širi obmestja", "nastajajo prometni in prostorski problemi"],
        examples: ["Ljubljana", "Maribor", "Koper", "Celje", "Kranj", "Novo mesto"],
        facts: ["Loči podeželska in mestna naselja.", "Razloži suburbanizacijo.", "Poveži centralna naselja s storitvami."],
        mistakes: [["Suburbanizacija je samo rast mesta.", "Je selitev prebivalstva in dejavnosti v obmestje."]]
    }
});

Object.assign(sourceTopicContent, {
    "slovenija-naravne": {
        source: "M-GEO-2024-novi katalog; slovenski zapiski",
        summary: "Slovenija je stik alpskega, panonskega, dinarskega in sredozemskega sveta, zato ima zelo raznolike naravne enote na majhnem prostoru.",
        concepts: ["Alpske pokrajine", "Predalpske pokrajine", "Dinarskokraške pokrajine", "Panonske pokrajine", "Sredozemske pokrajine"],
        explanation: ["Naravne enote Slovenije se razlikujejo po reliefu, kamninah, podnebju, vodovju, prsteh, rastlinstvu in rabi prostora. Alpski svet je visok, razgiban in gozdnat, predalpski svet prehoden, dinarski svet kraški, panonski bolj ravninski in gričevnat, sredozemski pa pod vplivom morja.", "Za maturo je ključno, da ne pišeš samo 'Slovenija je raznolika', ampak navedeš konkretno enoto in posledico za rabo prostora. Kras vpliva na vodovje in poselitev, alpski relief na turizem in promet, panonske ravnine na kmetijstvo, obala pa na promet in turizem.", "Naravne enote so osnova za vse druge teme Slovenije."],
        process: ["stik velikih evropskih naravnih enot", "različna kamninska zgradba in relief", "podnebni prehodi", "različna raba prostora"],
        examples: ["Julijske Alpe", "Ljubljanska kotlina", "Kras", "Prekmurje", "Slovenska Istra"],
        facts: ["Poznaj pet glavnih tipov slovenskih pokrajin.", "Za vsako navedi relief in rabo prostora.", "Poveži naravno enoto s prometom, turizmom ali kmetijstvom."],
        mistakes: [["Naravne enote so isto kot statistične regije.", "Naravne enote temeljijo na reliefu, kamninah, podnebju in pokrajinskih značilnostih."]]
    },
    "slovenija-relief": {
        source: "M-GEO-2024-novi katalog; slovenski zapiski",
        summary: "Relief Slovenije je zelo razgiban: Alpe, predalpska hribovja, dinarski kras, panonske ravnine in gričevja ter sredozemske obalne pokrajine.",
        concepts: ["Alpe", "predalpsko hribovje", "kras", "kotlina", "gričevje", "ravnina"],
        explanation: ["Alpski relief je visokogorski, z ledeniško preoblikovanimi dolinami in velikimi nakloni. Predalpski svet ima hribovja in kotline, pomembne za poselitev in promet. Dinarski svet je zgrajen predvsem iz apnenca in dolomita, zato so pogoste kraške oblike.", "Panonski del ima ravnine in gričevja, ugodna za kmetijstvo, sredozemski del pa flišna gričevja, kraški rob in obalo. Relief močno vpliva na prometne smeri: doline, kotline in prelazi usmerjajo poselitev in infrastrukturo.", "Pri maturi moraš relief vedno povezati z rabo prostora, ne samo z imenovanjem oblik."],
        process: ["tektonsko dvigovanje in gubanje", "rečno in ledeniško preoblikovanje", "kraški procesi na karbonatnih kamninah", "nastanek kotlin, dolin in ravnin"],
        examples: ["Triglav", "Ljubljanska kotlina", "Postojnska vrata", "Kras", "Murska ravan"],
        facts: ["Razloži pomen krasa.", "Poznaj alpske in dinarske reliefne značilnosti.", "Poveži relief s prometom in poselitvijo."],
        mistakes: [["Slovenija je večinoma ravninska.", "Slovenija je izrazito reliefno razgibana."]]
    },
    "slovenija-podnebje": {
        source: "M-GEO-2024-novi katalog; slovenski zapiski",
        summary: "Podnebje Slovenije oblikujejo lega, relief, oddaljenost od morja, zahodni vetrovi in vremenotvorna središča.",
        concepts: ["zmerno celinsko podnebje", "submediteransko podnebje", "gorsko podnebje", "orografske padavine", "burja"],
        explanation: ["Slovenija leži na prehodu med Alpami, Panonsko nižino, Dinarskim gorstvom in Sredozemljem. Zato se na majhnem prostoru menjavajo zmerno celinsko, gorsko in submediteransko podnebje.", "Največ padavin je praviloma v zahodnih in alpsko-dinarskih pregradah zaradi orografskega dviga vlažnega zraka. Proti vzhodu je vpliv morja manjši, celinskost večja, padavin pa manj. Primorje ima milejše zime, sušnejša poletja in vpliv burje.", "Maturitetno pomembno je branje klimogramov slovenskih krajev in razlaga razlik med Obalo, Alpami, kotlinami in panonskim delom."],
        process: ["vlažen zrak z zahoda doseže reliefne pregrade", "orografski dvig povzroči padavine", "proti vzhodu se krepi celinskost", "lokalni vetrovi in kotline ustvarjajo posebnosti"],
        examples: ["Julijske Alpe", "Primorje", "Ljubljanska kotlina", "Prekmurje"],
        facts: ["Razloži orografske padavine.", "Loči glavne podnebne tipe Slovenije.", "Poveži podnebje s kmetijstvom in turizmom."],
        mistakes: [["Slovenija ima eno samo podnebje.", "Ima več podnebnih tipov zaradi reliefa in prehodne lege."]]
    },
    "slovenija-vodovje": {
        source: "M-GEO-2024-novi katalog; slovenski zapiski",
        summary: "Slovensko vodovje pripada predvsem črnomorskemu in jadranskemu povodju; reke imajo velik pomen za oskrbo, energijo, prometne doline in poplavno ogroženost.",
        concepts: ["Sava", "Drava", "Mura", "Soča", "Krka", "povodje", "kras"],
        explanation: ["Sava je osrednja slovenska reka in del črnomorskega povodja. Drava in Mura sta pomembni za severovzhod, Soča pa za jadransko povodje. Krka je pomembna kraška reka. V Sloveniji so reke kratke, a zaradi reliefa pogosto energetsko pomembne.", "Kraška območja imajo posebno vodovje: voda ponika, teče pod površjem in se pojavlja v izvirih. To vpliva na oskrbo z vodo, onesnaževanje in poselitev.", "Pri maturi poveži reke z reliefom, hidroenergijo, poplavami, prometnimi smermi in povodji."],
        process: ["padavine in sneg napajajo vodotoke", "relief določa padec in doline", "kras povzroča ponikanje", "reke vplivajo na energijo, poplave in poselitev"],
        examples: ["Sava", "Drava", "Mura", "Soča", "Krka", "Ljubljanica"],
        facts: ["Poznaj črnomorsko in jadransko povodje.", "Razloži kraško vodovje.", "Poveži reke s hidroenergijo in poplavami."],
        mistakes: [["Kraške reke tečejo enako kot vse druge.", "Na krasu voda pogosto ponika in teče podzemno."]]
    },
    "slovenija-prebivalstvo": {
        source: "M-GEO-2024-novi katalog; slovenski zapiski",
        summary: "Prebivalstvo Slovenije je neenakomerno razporejeno; gostejša poselitev je v kotlinah, ravninah, dolinah in ob prometnih oseh.",
        concepts: ["Ljubljanska kotlina", "suburbanizacija", "staranje", "dnevne migracije", "depopulacija"],
        explanation: ["Najgosteje so poseljene kotline, ravnine, doline in območja večjih mest. Gorska, obmejna in nekatera kraška območja so redkeje poseljena. Ljubljana ima vlogo državnega središča, zato privlači delovna mesta, šolstvo, storitve in dnevne migracije.", "Slovenija ima podobno kot večina Evrope nizko rodnost, staranje prebivalstva in suburbanizacijo. Prebivalstvo se seli v obmestna naselja, kar povzroča rast prometa, spremembe rabe tal in širjenje pozidave.", "Pri maturi je treba navesti konkretne pokrajine, ne samo splošno 'mesta so gosteje poseljena'."],
        process: ["naravne ugodnosti kotlin in ravnin", "rast mest in delovnih mest", "dnevne migracije", "suburbanizacija in staranje"],
        examples: ["Ljubljana", "Maribor", "Celje", "Koper", "obmestja"],
        facts: ["Razloži neenakomerno poselitev.", "Poznaj suburbanizacijo.", "Poveži staranje s slovenskimi razmerami."],
        mistakes: [["Slovenija je enakomerno poseljena.", "Poselitev je močno povezana z reliefom, prometom in delovnimi mesti."]]
    },
    "slovenija-kmetijstvo": {
        source: "slovenski zapiski; M-GEO katalog",
        summary: "Slovensko kmetijstvo je razdrobljeno in močno odvisno od reliefa, podnebja, prsti in velikosti kmetij.",
        concepts: ["poljedelstvo", "živinoreja", "vinogradništvo", "sadjarstvo", "razdrobljenost posesti"],
        explanation: ["Najboljše možnosti za poljedelstvo so v ravninah in gričevjih panonskega in subpanonskega sveta, kjer so ugodnejše prsti in manjši nakloni. V alpskem in predalpskem svetu je pomembnejša živinoreja, v sredozemskem in vinorodnih gričevjih pa vinogradništvo, sadjarstvo in specializirane kulture.", "Omejitve slovenskega kmetijstva so majhne in razdrobljene kmetije, reliefna razgibanost, zaraščanje manj ugodnih zemljišč ter konkurenca na trgu. Hkrati so pomembni kakovostni lokalni proizvodi in varovanje kulturne krajine.", "Pri maturi kmetijstvo poveži s pokrajino: Prekmurje ni isto kot Alpe ali Kras."],
        process: ["relief in prsti določijo rabo tal", "ravnine omogočajo poljedelstvo", "gričevja vinogradništvo", "gore živinorejo in gozdarstvo"],
        examples: ["Prekmurje", "Dravsko-Ptujsko polje", "Goriška brda", "Kras", "Alpe"],
        facts: ["Poznaj regionalne razlike v kmetijstvu.", "Razloži razdrobljenost posesti.", "Poveži relief z rabo tal."],
        mistakes: [["V Sloveniji je kmetijstvo povsod enako.", "Zelo se razlikuje med ravninami, gričevji, krasom in gorami."]]
    },
    "slovenija-industrija": {
        source: "slovenski zapiski; M-GEO katalog",
        summary: "Industrija Slovenije je vezana na prometno lego, mesta, delovno silo, tradicijo, energijo in prestrukturiranje starih industrijskih območij.",
        concepts: ["prestrukturiranje", "industrijska središča", "delovna sila", "prometna lega", "tehnološki razvoj"],
        explanation: ["Starejša industrijska središča so nastajala ob rudah, energiji, prometu in delovni sili. Danes so pomembnejši prometna dostopnost, znanje, trg, kapital in povezave z evropskim gospodarstvom.", "Nekatera nekdanja industrijska območja so se morala prestrukturirati zaradi zapiranja rudnikov, sprememb trga in tehnološkega razvoja. Industrija ostaja pomembna, vendar se povezuje s storitvami, logistiko in izvozom.", "Pri maturi navedi konkretno središče ali regijo ter razloži lokacijske dejavnike."],
        process: ["stara industrijska osnova", "sprememba trga in tehnologije", "prestrukturiranje", "povezava z izvozom in storitvami"],
        examples: ["Ljubljana", "Maribor", "Celje", "Kranj", "Novo mesto"],
        facts: ["Razloži lokacijske dejavnike industrije.", "Poznaj prestrukturiranje.", "Poveži industrijo s prometom in mesti."],
        mistakes: [["Industrija je vezana samo na surovine.", "Danes so pogosto odločilni promet, znanje, kapital in trg."]]
    },
    "slovenija-promet": {
        source: "slovenski zapiski; M-GEO katalog",
        summary: "Promet Slovenije izkorišča prehodno lego med Alpami, Panonsko nižino, Sredozemljem in Balkanom.",
        concepts: ["prometni koridor", "avtocestni križ", "Koper", "Ljubljana", "Postojnska vrata"],
        explanation: ["Slovenija ima pomembno tranzitno lego. Prometne poti sledijo dolinam, kotlinam, prelazom in naravnim prehodom. Ljubljanska kotlina je osrednje križišče, Luka Koper pa povezuje srednjo Evropo z Jadranom.", "Relief promet tudi omejuje: Alpe, dinarski kras in ozke doline zahtevajo predore, viadukte in drago infrastrukturo. Promet povzroča gospodarske koristi, a tudi onesnaževanje, hrup in pritisk na prostor.", "Maturitetno poveži promet z reliefom, gospodarstvom, pristaniščem in suburbanizacijo."],
        process: ["prehodna lega", "usmerjanje poti po dolinah in prehodih", "rast tranzita", "okoljski in prostorski pritiski"],
        examples: ["avtocestni križ", "Luka Koper", "Ljubljana", "Postojnska vrata", "Karavanke"],
        facts: ["Razloži prometno lego Slovenije.", "Poznaj pomen Luke Koper.", "Poveži promet z reliefnimi ovirami."],
        mistakes: [["Prometne poti so naključne.", "Sledijo naravnim prehodom, dolinam, kotlinam in gospodarskim središčem."]]
    },
    "slovenija-turizem": {
        source: "slovenski zapiski; M-GEO katalog",
        summary: "Turizem v Sloveniji temelji na Alpah, obali, krasu, zdraviliščih, mestih, kulturni dediščini in zavarovanih območjih.",
        concepts: ["gorski turizem", "obmorski turizem", "zdraviliški turizem", "kraški turizem", "trajnostni turizem"],
        explanation: ["Alpski svet omogoča zimski in poletni gorski turizem, obala obmorski turizem, kras jamski in pokrajinski turizem, vzhodna Slovenija pa zdraviliški turizem. Ljubljana in druga mesta so pomembna za kulturni in kongresni turizem.", "Turizem prinaša dohodek in delovna mesta, hkrati pa obremenjuje promet, vodo, odpadke, stanovanja in občutljive pokrajine. Zato je za Slovenijo pomemben trajnostni pristop, zlasti v Alpah, obali in zavarovanih območjih.", "Pri maturi vedno navedi vrsto turizma, naravni pogoj in posledico."],
        process: ["naravne in kulturne privlačnosti", "dostopnost in infrastruktura", "rast obiska", "potreba po trajnostnem upravljanju"],
        examples: ["Julijske Alpe", "Bled", "Postojnska jama", "Portorož", "zdravilišča"],
        facts: ["Poznaj glavne vrste turizma.", "Poveži turizem z reliefom in podnebjem.", "Navedi pozitivne in negativne posledice."],
        mistakes: [["Turizem ima samo pozitivne učinke.", "Ima tudi okoljske in prostorske obremenitve."]]
    },
    "slovenija-regionalizacija": {
        source: "slovenski zapiski; M-GEO katalog",
        summary: "Regionalizacija Slovenije pomeni delitev države na pokrajine glede na naravne, družbene, gospodarske ali upravne značilnosti.",
        concepts: ["regionalizacija", "naravna pokrajina", "funkcijska regija", "statistična regija", "regionalni razvoj"],
        explanation: ["Slovenijo lahko regionaliziramo po naravnih enotah, zgodovinskih pokrajinah, funkcijskih območjih, statističnih regijah ali razvojnih problemih. Nobena delitev ni edina pravilna; odvisna je od namena.", "Za maturo je pomembno razumeti, da naravna regionalizacija temelji na reliefu, kamninah, podnebju in vodovju, funkcijska pa na povezavah z mesti, delom, prometom in storitvami. Regionalni razvoj obravnava razlike med središči in obrobjem.", "Pri odgovoru navedi kriterij delitve. Brez kriterija je regionalizacija samo naštevanje pokrajin."],
        process: ["izberi kriterij", "primerjaj pokrajinske značilnosti", "določi meje in središča", "razloži razvojne razlike"],
        examples: ["Alpske pokrajine", "Panonske pokrajine", "Osrednjeslovenska regija", "Pomurje", "Primorska"],
        facts: ["Loči naravno in funkcijsko regionalizacijo.", "Poznaj regionalne razlike.", "Poveži regionalizacijo z razvojem."],
        mistakes: [["Regionalizacija je samo zemljevid regij.", "Je razlaga delitve prostora po izbranem kriteriju."]]
    }
});

Object.assign(sourceTopicContent, {
    "evropa-relief": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf; M-GEO katalog",
        summary: "Evropski relief sestavljajo stara znižana gorstva, mlada alpidska gorstva, velika nižavja in razčlenjene obale.",
        concepts: ["Alpe", "Karpati", "Pireneji", "Skandinavsko gorovje", "Vzhodnoevropsko nižavje", "stara grudasta gorstva"],
        explanation: ["Viri poudarjajo, da ima Evropa zelo razčlenjeno površje. Na severu in vzhodu so starejše stabilne enote in obsežna nižavja, v srednji Evropi znižana stara gorstva, na jugu pa mladonagubana alpidska gorstva.", "Alpe so najpomembnejši primer mladonagubanega gorstva v Evropi. Vplivajo na podnebje, prometne poti, turizem, vodovje in poselitev. Stara gorstva, kot so Vogezi, Schwarzwald in Harz, so zaradi prelamljanja dobila značaj grudastih gorstev.", "Maturitetno je pomembno razlikovati staronagubana, mladonagubana in grudasta gorstva ter povezati relief z gospodarstvom."],
        process: ["stare tektonske osnove", "alpidsko gubanje na jugu", "prelamljanje starih gorstev", "ledeniško in rečno preoblikovanje površja"],
        examples: ["Alpe", "Karpati", "Vogezi", "Schwarzwald", "Vzhodnoevropsko nižavje"],
        facts: ["Poznaj Alpe kot mladonagubano gorstvo.", "Razloži grudasta stara gorstva.", "Poveži nižavja s poselitvijo in prometom."],
        mistakes: [["Vsa evropska gorstva so mlada.", "Evropa ima mlada alpidska gorstva in starejša znižana/grudasta gorstva."]]
    },
    "evropa-podnebje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Podnebje Evrope oblikujejo geografska širina, razporeditev kopnega in morja, zahodni vetrovi, Severnoatlantski tok in relief.",
        concepts: ["oceansko podnebje", "kontinentalno podnebje", "sredozemsko podnebje", "Severnoatlantski tok", "gorsko podnebje"],
        explanation: ["Zahodna Evropa ima zaradi Atlantika, zahodnih vetrov in toplega Severnoatlantskega toka milejše in bolj vlažno podnebje. Proti vzhodu narašča celinskost: zime so hladnejše, poletja toplejša, temperaturne amplitude večje.", "Južna Evropa ima sredozemsko podnebje s suhimi poletji in milejšimi, bolj vlažnimi zimami. Skandinavija in sever Rusije imata zmerno hladno in tundrsko podnebje, gorovja pa gorsko podnebje.", "Pri maturi moraš podnebne tipe povezati z rastlinstvom, kmetijstvom, turizmom in poselitvijo."],
        process: ["zahodni vetrovi prinašajo atlantski vpliv", "topli morski tok omili zahod in sever", "celinskost se veča proti vzhodu", "relief povzroča višinske pasove"],
        examples: ["Zahodna Evropa", "Sredozemlje", "Vzhodna Evropa", "Skandinavija", "Alpe"],
        facts: ["Razloži vpliv Severnoatlantskega toka.", "Loči oceansko, kontinentalno in sredozemsko podnebje.", "Poveži podnebje s turizmom in kmetijstvom."],
        mistakes: [["Evropa ima enotno zmerno podnebje.", "Evropa ima več podnebnih tipov z močnim zahodno-vzhodnim in severno-južnim gradientom."]]
    },
    "evropa-vodovje": {
        source: "regionalna skripta",
        summary: "Evropsko vodovje je pomembno za promet, energijo, industrijo, mesta in kmetijstvo; ključne reke so Donava, Ren, Volga in reke severnoevropskih nižavij.",
        concepts: ["Donava", "Ren", "Volga", "Črno morje", "Severno morje", "povodje"],
        explanation: ["Ren je ena najpomembnejših gospodarskih rek Evrope, povezana z industrijo, pristanišči in gostim prometom proti Severnemu morju. Donava povezuje srednjo in jugovzhodno Evropo ter se izliva v Črno morje.", "Volga je največja evropska reka in pomembna za Rusijo. Evropske reke so pogosto povezane s kanali, hidroenergijo, vodno oskrbo in zgodovinskim razvojem mest.", "Pri maturi moraš razlikovati porečje in povodje ter reke povezati z reliefom, podnebjem in gospodarstvom."],
        process: ["padavine in taljenje snega napajajo reke", "reke sledijo nižavjem in kotlinam", "nastanejo prometne in gospodarske osi", "regulacije in kanali povečajo uporabnost"],
        examples: ["Ren", "Donava", "Volga", "Severno morje", "Črno morje"],
        facts: ["Poznaj Ren, Donavo in Volgo.", "Razloži pomen rečnega prometa.", "Poveži reke z industrijo in mesti."],
        mistakes: [["Reke so pomembne samo naravnogeografsko.", "V Evropi so tudi prometne, industrijske in poselitvene osi."]]
    },
    "evropa-prebivalstvo": {
        source: "regionalna skripta",
        summary: "Evropa je gosto poseljena in močno urbanizirana, a ima nizko rodnost, staranje prebivalstva in pomembne migracije.",
        concepts: ["gostota prebivalstva", "staranje", "migracije", "urbanizacija", "demografski prehod"],
        explanation: ["Zahodna in srednja Evropa sta med najgosteje poseljenimi deli sveta zaradi ugodnega podnebja, nižavij, dolge zgodovine urbanizacije, industrije, prometa in storitev. Redkeje so poseljeni visoki gorski, severni in nekateri vzhodni deli.", "Evropa je v pozni fazi demografskega prehoda: rodnost je nizka, prebivalstvo se stara, naravni prirastek je majhen ali negativen. Migracije zato pomembno vplivajo na delovno silo, mesta in kulturno sestavo.", "Pri maturi je pomembno povezati naravne pogoje z zgodovinsko-gospodarskim razvojem in sodobnimi demografskimi problemi."],
        process: ["ugodna nižavja in promet", "industrializacija in urbanizacija", "nizka rodnost in staranje", "migracije dopolnjujejo delovno silo"],
        examples: ["Zahodna Evropa", "Srednja Evropa", "Alpe", "Skandinavija"],
        facts: ["Razloži staranje prebivalstva.", "Poveži gostoto s prometom in gospodarstvom.", "Poznaj pomen migracij."],
        mistakes: [["Gosta poselitev je samo posledica podnebja.", "Pomembni so tudi zgodovina, promet, industrija in storitve."]]
    },
    "evropa-gospodarstvo": {
        source: "regionalna skripta",
        summary: "Evropa je visoko razvito gospodarsko območje z močnimi storitvami, industrijo, prometom, intenzivnim kmetijstvom in velikimi regionalnimi razlikami.",
        concepts: ["terciarizacija", "industrijska območja", "intenzivno kmetijstvo", "prometni koridor", "regionalne razlike"],
        explanation: ["Evropsko gospodarstvo temelji na gostem prometnem omrežju, izobraženi delovni sili, velikem trgu, industrijski tradiciji in storitvah. Stara industrijska območja so se prestrukturirala, storitve in visoka tehnologija pa imajo velik pomen.", "Kmetijstvo je v mnogih delih intenzivno in specializirano. Viri omenjajo tudi problem čezmerne produkcije hrane v EU. Turizem je pomemben ob Sredozemlju, v Alpah in v kulturnih mestih.", "Pri maturi moraš primerjati razvite zahodne/srednje dele z manj razvitimi obrobji ter pojasniti lokacijske dejavnike."],
        process: ["industrijska tradicija", "razvoj prometa in mest", "prehod v storitve in tehnologijo", "regionalna politika zmanjšuje razlike"],
        examples: ["Rensko območje", "Severno morje", "Alpe", "Sredozemlje"],
        facts: ["Poznaj storitveno usmerjenost Evrope.", "Razloži prestrukturiranje industrije.", "Poveži turizem z Alpami in Sredozemljem."],
        mistakes: [["Evropsko gospodarstvo je povsod enako razvito.", "Razlike med jedrom in obrobjem so pomembne."]]
    },
    "evropa-eu": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Evropska unija je medvladna in deloma nadnacionalna povezava, ki spodbuja skupni trg, prost pretok, regionalni razvoj in sodelovanje držav.",
        concepts: ["Evropska unija", "skupni trg", "schengen", "evro", "regionalna politika", "subsidiarnost"],
        explanation: ["V virih je EU opisana kot multinacionalna, medvladna in deloma nadvladna organizacija. Po eni strani spodbuja enotnost, po drugi pa ohranja raznolikost držav in regij. Ukrepanje EU je povezano z načelom subsidiarnosti: skupno se rešujejo vprašanja, ki jih države same težje učinkovito rešujejo.", "Za geografijo so pomembni skupni trg, prost pretok ljudi, blaga, kapitala in storitev, regionalna politika, prometni koridorji, kmetijska politika, okoljska pravila in razlike med bolj in manj razvitimi regijami.", "Maturitetno EU ne obravnavaj samo politično, ampak prostorsko: kako vpliva na meje, migracije, gospodarstvo, kmetijstvo, promet in regionalni razvoj."],
        process: ["gospodarsko povezovanje držav", "odpravljanje ovir na trgu", "skupne politike", "poskus zmanjševanja regionalnih razlik"],
        examples: ["schengensko območje", "evrsko območje", "kohezijska politika", "skupna kmetijska politika"],
        facts: ["Razloži skupni trg.", "Poznaj regionalno politiko EU.", "Poveži EU s prometom, migracijami in gospodarstvom."],
        mistakes: [["EU je samo politična zveza.", "EU ima močne prostorske in gospodarske učinke."]]
    },
    "evropa-regionalne": {
        source: "regionalna skripta; M-GEO katalog",
        summary: "Evropske regionalne posebnosti izhajajo iz reliefa, podnebja, zgodovine, gospodarske razvitosti, jezikovne in kulturne raznolikosti.",
        concepts: ["Severna Evropa", "Zahodna Evropa", "Srednja Evropa", "Južna Evropa", "Vzhodna Evropa"],
        explanation: ["Severna Evropa je povezana z ledeniškim reliefom, redkejšo poselitvijo, gozdovi, morjem in visokim standardom. Zahodna Evropa ima močan oceanski vpliv, velika mesta, storitve in industrijsko tradicijo.", "Južna Evropa je sredozemska: suha poletja, turizem, vinogradništvo, oljke, razčlenjene obale in potresna območja. Vzhodna Evropa ima večjo celinskost, obsežna nižavja in drugačno zgodovinsko-gospodarsko pot.", "Pri maturi regionalnih delov ne naštevaj po državah, ampak jih primerjaj po naravnih in družbenih značilnostih."],
        process: ["naravne razlike ustvarijo osnovo", "zgodovina in gospodarstvo oblikujeta regije", "promet in EU zmanjšujeta razdalje", "regionalne razlike ostajajo pomembne"],
        examples: ["Skandinavija", "Rensko območje", "Sredozemlje", "Vzhodnoevropsko nižavje"],
        facts: ["Primerjaj sever, jug, zahod in vzhod Evrope.", "Poveži regije s podnebjem in gospodarstvom.", "Poznaj sredozemske posebnosti."],
        mistakes: [["Regionalna geografija Evrope je samo naštevanje držav.", "Gre za primerjavo naravnih in družbenih značilnosti regij."]]
    }
});

Object.assign(sourceTopicContent, {
    "polarna-arktika": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Arktika je polarno območje okrog Severnega ledenega oceana; vključuje morski led, severne dele celin in Grenlandijo.",
        concepts: ["Arktika", "morski led", "tundra", "permafrost", "Inuiti"],
        explanation: ["Arktika leži sredi morja, zato ima v primerjavi z Antarktiko milejše razmere. Obsega Severni ledeni ocean, morski led, Grenlandijo in severne dele Evrope, Azije ter Severne Amerike.", "Na kopnem se pojavljata tundrsko in polarno podnebje. Rastlinstvo je omejeno na mahove, lišaje, trave in nizko grmičevje, kjer razmere to dopuščajo. Taljenje morskega ledu spreminja prometne poti, ekosisteme in dostop do naravnih virov.", "Maturitetno je pomembno razlikovati Arktiko od Antarktike: Arktika je ocean z obrobnimi kopnimi, Antarktika pa celina, pokrita z ledenim pokrovom."],
        process: ["nizko sončno obsevanje", "dolge polarne noči in dnevi", "morski led in permafrost", "hitro segrevanje in taljenje ledu"],
        examples: ["Grenlandija", "Severni ledeni ocean", "Sibirija", "Kanadski sever"],
        facts: ["Loči morski led od celinskega ledu.", "Razloži vpliv podnebnih sprememb.", "Poznaj tundro in permafrost."],
        mistakes: [["Arktika je celina.", "Arktika je polarno območje okrog oceana, ne samostojna celina."]]
    },
    "polarna-antarktika": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Antarktika je najhladnejša celina, pokrita z debelim ledenim pokrovom, z zelo ostrim polarnim podnebjem.",
        concepts: ["Antarktika", "celinski led", "polarno podnebje", "katabatični vetrovi", "znanstvene postaje"],
        explanation: ["Antarktika je celina na južnem polu, prekrita z ledenim pokrovom. Viri navajajo velike razlike med obalo in notranjostjo: notranjost ima izjemno nizke temperature, obala je milejša, a še vedno zelo hladna.", "Ker je led na kopnem, ima taljenje antarktičnega ledu velik pomen za dvig morske gladine. Poselitev je omejena na znanstvene postaje, stalnega avtohtonega prebivalstva ni.", "Pri maturi je Antarktika pomembna za podnebne spremembe, ledene zaloge, raziskovanje in primerjavo z Arktiko."],
        process: ["polarna lega", "velika nadmorska višina ledenega pokrova", "izjemno nizke temperature", "ledeni tokovi in vpliv na morsko gladino"],
        examples: ["Vzhodna Antarktika", "Antarktični polotok", "Južni ocean"],
        facts: ["Poznaj razliko med Antarktiko in Arktiko.", "Razloži pomen celinskega ledu.", "Poveži taljenje ledu z morsko gladino."],
        mistakes: [["Taljenje morskega in celinskega ledu ima enak učinek.", "Dvig morske gladine je posebej povezan s taljenjem ledu na kopnem."]]
    },
    "polarna-podnebje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Polarna podnebja imajo nizke temperature, malo padavin, dolge zime in kratka poletja; življenje omejujejo mraz, led in permafrost.",
        concepts: ["polarno podnebje", "tundrsko podnebje", "permafrost", "albedo", "polarni dan"],
        explanation: ["Polarna območja prejmejo malo sončne energije zaradi nizkega kota padanja žarkov. Sneg in led imata velik albedo, zato odbijata velik del sevanja. Padavin je malo, vendar se zaradi nizkih temperatur sneg dolgo ohranja.", "Tundrsko podnebje omogoča skromno rastlinstvo, polarno podnebje pa je še ostrejše. Permafrost vpliva na gradnjo, promet in ekosisteme. Segrevanje povzroča taljenje permafrosta in spreminja stabilnost tal.", "Pri maturi moraš podnebje povezati z rastlinstvom, poselitvijo in podnebnimi spremembami."],
        process: ["nizek kot sončnih žarkov", "visok albedo snega in ledu", "malo izhlapevanja in padavin", "permafrost omejuje tla in rastlinstvo"],
        examples: ["tundra", "Grenlandija", "Antarktika", "Sibirija"],
        facts: ["Razloži albedo.", "Loči tundrsko in polarno podnebje.", "Poveži permafrost z gradnjo in podnebnimi spremembami."],
        mistakes: [["Polarna območja imajo veliko snega, zato imajo veliko padavin.", "Padavin je malo; sneg se ohranja zaradi nizkih temperatur."]]
    },
    "polarna-led": {
        source: "regionalna skripta; M-GEO katalog",
        summary: "Led v polarnih območjih nastopa kot morski led, ledeni pokrov, ledenik in permafrost; vsak ima drugačen vpliv na okolje.",
        concepts: ["morski led", "celinski led", "ledenik", "permafrost", "morska gladina"],
        explanation: ["Morski led nastane z zmrzovanjem morske vode in plava na oceanu. Celinski led je led na kopnem, npr. na Grenlandiji in Antarktiki. Ta razlika je maturitetno pomembna, ker taljenje celinskega ledu neposredno povečuje količino vode v oceanih.", "Ledeniki preoblikujejo relief z erozijo in akumulacijo. Permafrost pa je trajno zmrznjena podlaga, ki se ob segrevanju tali in povzroča posedanje tal ter sproščanje toplogrednih plinov.", "Pri odgovoru vedno loči vrsto ledu in posledico."],
        process: ["kopičenje snega ali zmrzovanje morja", "zbijanje snega v led", "premikanje ledenikov ali sezonsko taljenje", "vpliv na relief, morje in ekosisteme"],
        examples: ["Grenlandski ledeni pokrov", "Antarktični ledeni pokrov", "arktični morski led"],
        facts: ["Loči morski in celinski led.", "Razloži vpliv ledenikov na relief.", "Poveži permafrost s segrevanjem."],
        mistakes: [["Vsak led dviguje morsko gladino enako.", "Največji vpliv ima taljenje ledu na kopnem."]]
    },
    "polarna-gospodarstvo": {
        source: "regionalna skripta",
        summary: "Gospodarski pomen polarnih območij se povečuje zaradi naravnih virov, ribolova, novih prometnih poti, turizma in znanstvenega raziskovanja.",
        concepts: ["naravni viri", "severna morska pot", "ribolov", "turizem", "znanstvene postaje"],
        explanation: ["Taljenje arktičnega morskega ledu odpira možnost krajših prometnih poti med Evropo in Azijo, hkrati pa povečuje zanimanje za nafto, plin in rudna bogastva. To prinaša gospodarske možnosti, a tudi okoljska in politična tveganja.", "Na Antarktiki je gospodarstvo močno omejeno z mednarodnimi dogovori, najpomembnejše so znanstvene postaje in nadzorovan turizem. V obeh območjih so ekosistemi občutljivi, zato so posledice onesnaženja lahko dolgotrajne.", "Maturitetno je pomembno ovrednotiti koristi in tveganja, ne samo našteti vire."],
        process: ["taljenje ledu poveča dostopnost", "raste zanimanje za vire in promet", "povečajo se okoljska tveganja", "potrebno je mednarodno upravljanje"],
        examples: ["Severna morska pot", "Arktika", "Antarktika", "Grenlandija"],
        facts: ["Razloži pomen novih prometnih poti.", "Poveži vire z okoljskimi tveganji.", "Poznaj znanstveni pomen Antarktike."],
        mistakes: [["Polarna območja so gospodarsko nepomembna.", "Njihov pomen raste zaradi virov, prometa in podnebnih sprememb."]]
    }
});

Object.assign(sourceTopicContent, {
    "juzna-amerika-relief": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf; M-GEO katalog",
        summary: "Južno Ameriko reliefno določajo Andi na zahodu, velika nižavja v notranjosti in stare planote na vzhodu.",
        concepts: ["Andi", "Amazonsko nižavje", "Brazilsko višavje", "Gvajansko višavje", "Pampe"],
        explanation: ["Andi so mladonagubano gorstvo ob zahodnem robu celine in nastajajo zaradi subdukcije oceanske plošče pod Južnoameriško ploščo. So pomembna podnebna pregrada in vplivajo na vodovje, poselitev ter rudarstvo.", "V notranjosti je Amazonsko nižavje, največje tropsko nižavje z obsežnim porečjem Amazonke. Na vzhodu sta Brazilsko in Gvajansko višavje, na jugu pa Pampe, pomembne za kmetijstvo.", "Maturitetno je pomembno povezati Ande z Atakamo, Amazonko in višinsko pasovitostjo."],
        process: ["subdukcija ob zahodni obali", "dvig Andov", "nastanek velikih porečij proti Atlantiku", "oblikovanje nižavij in planot"],
        examples: ["Andi", "Amazonka", "Amazonsko nižavje", "Atakama", "Pampe"],
        facts: ["Razloži nastanek Andov.", "Poveži Ande z vodovjem in podnebjem.", "Poznaj Amazonsko nižavje in Pampe."],
        mistakes: [["Amazonka izvira v amazonskem gozdu.", "Amazonka izvira v Andih in teče proti Atlantiku."]]
    },
    "juzna-amerika-podnebje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Podnebje Južne Amerike oblikujejo geografska širina, Andi, morski tokovi in pasati; zato ima celina ekvatorialni gozd, savane, puščavo Atakamo in zmerne tipe na jugu.",
        concepts: ["ekvatorialno podnebje", "pasati", "Humboldtov tok", "Atakama", "višinska pasovitost"],
        explanation: ["Ob ekvatorju je vroče in vlažno podnebje, zato se je v Amazoniji razvil tropski deževni gozd. Savansko podnebje je značilno za dele severne in osrednje Južne Amerike.", "Na zahodni obali hladni Humboldtov tok in zavetrje Andov prispevata k izjemni sušnosti Atakame. V Andih se podnebje spreminja z nadmorsko višino, na jugu pa prevladujejo zmernejši in hladnejši tipi.", "Pri maturi je Atakama klasičen primer vpliva hladnega morskega toka in reliefne pregrade."],
        process: ["toplotni pasovi določajo osnovo", "Andi preusmerijo zračne mase", "hladni tok zmanjša vlago ob obali", "nastanejo izrazita podnebna nasprotja"],
        examples: ["Amazonija", "Atakama", "Andi", "Pampe"],
        facts: ["Razloži nastanek sušnosti Atakame.", "Poveži Amazonijo z ekvatorialnim podnebjem.", "Poznaj višinsko pasovitost v Andih."],
        mistakes: [["Atakama je suha samo zato, ker je blizu povratnika.", "Pomembna sta tudi Humboldtov tok in zavetrje Andov."]]
    },
    "juzna-amerika-rastlinstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Rastlinstvo Južne Amerike sega od amazonskega tropskega deževnega gozda do savan, pamp, puščavskega rastlinstva in gorskih pasov v Andih.",
        concepts: ["selvas", "savana", "pampe", "puščavsko rastlinstvo", "višinski pasovi"],
        explanation: ["Amazonija je največje območje tropskega deževnega gozda, ker ima veliko toplote in padavin skozi leto. Na območjih z izrazitejšo sušno dobo se pojavljajo savane, na jugu pa travišča Pamp.", "V Atakami zaradi skrajne sušnosti skoraj ni rastlinstva. V Andih se rastlinstvo menja z višino, zato moraš pri regionalni geografiji vedno upoštevati nadmorsko višino.", "Maturitetno pomembna je tudi degradacija Amazonije: krčenje gozda zaradi kmetijstva, pašnikov, sečnje, rudarstva in prometnic."],
        process: ["padavine in temperatura določajo pas", "gozd preide v savano ali travišče", "sušnost omeji rastlinstvo", "človek spreminja naravno odejo"],
        examples: ["Amazonija", "Llanos", "Pampe", "Atakama"],
        facts: ["Poznaj pomen Amazonije.", "Razloži Pampe kot travišča.", "Poveži krčenje gozda z gospodarstvom in okoljem."],
        mistakes: [["Pampe so tropski gozd.", "Pampe so travnata območja z velikim kmetijskim pomenom."]]
    },
    "juzna-amerika-vodovje": {
        source: "regionalna skripta",
        summary: "Amazonka ima največje porečje na svetu; reke Južne Amerike so ključne za gozd, promet, energijo in poselitev.",
        concepts: ["Amazonka", "Orinoko", "Paraná", "porečje", "hidroenergija"],
        explanation: ["Amazonka odvaja vode z Andov in obsežnega ekvatorialnega območja proti Atlantiku. Zaradi velikih padavin ima izjemen pretok in oblikuje ogromno porečje, povezano s tropskim gozdom.", "Paraná in drugi sistemi so pomembni za poselitev, hidroenergijo in gospodarstvo južnega dela celine. Andi kot razvodje vplivajo na smer odtoka: večina velikih rek teče proti Atlantiku.", "Pri maturi moraš Amazonko povezati z ekvatorialnim podnebjem, amazonskim gozdom, prometno dostopnostjo in okoljskimi problemi."],
        process: ["padavine v ekvatorialnem pasu", "odtok z Andov proti vzhodu", "veliko porečje in poplavna območja", "vpliv na gozd in naselitev"],
        examples: ["Amazonka", "Orinoko", "Paraná", "Itaipu"],
        facts: ["Poznaj Amazonko kot največje porečje.", "Poveži vodovje s hidroenergijo.", "Razloži pomen Andov kot razvodja."],
        mistakes: [["Amazonka je pomembna samo zaradi dolžine.", "Pomembnejši sta porečje in pretok."]]
    },
    "juzna-amerika-gospodarstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Gospodarstvo Južne Amerike temelji na naravnih virih, kmetijstvu, rudarstvu, hidroenergiji, mestih in velikih regionalnih razlikah.",
        concepts: ["rudarstvo", "plantaže", "Pampe", "hidroenergija", "urbanizacija"],
        explanation: ["Andi so pomembni za rude, Amazonija za gozd in naravne vire, Pampe pa za tržno kmetijstvo in živinorejo. V nekaterih državah je pomemben izvoz surovin in kmetijskih proizvodov, kar povzroča odvisnost od svetovnega trga.", "Velika mesta, kot so São Paulo, Buenos Aires, Lima in Santiago, so gospodarska središča, vendar se ob njih pojavljajo socialne razlike in neformalna naselja. Hidroenergija ima velik pomen zaradi vodnatih rek.", "Pri maturi je dobro primerjati gospodarsko razvitejša območja z revnejšimi notranjostmi in okoljskimi pritiski v Amazoniji."],
        process: ["izraba naravnih virov", "rast mest in industrije", "izvoz surovin in hrane", "okoljski pritiski in regionalne razlike"],
        examples: ["Brazilija", "Argentina", "Čile", "Amazonija", "Pampe"],
        facts: ["Poznaj Pampe kot kmetijsko območje.", "Razloži pomen rudarstva v Andih.", "Poveži Amazonijo z okoljskimi problemi."],
        mistakes: [["Južna Amerika je gospodarsko homogena.", "Razlike med državami in regijami so velike."]]
    }
});

Object.assign(sourceTopicContent, {
    "avstralija-relief": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Avstralija je reliefno stara in uravnana celina: zahodna planota, osrednje nižavje in Veliko razvodno gorovje na vzhodu.",
        concepts: ["Zahodna planota", "Osrednje nižavje", "Veliko razvodno gorovje", "arteška voda", "Murray-Darling"],
        explanation: ["Viri Avstralijo opisujejo kot staro, nizko in sušno celino. Večino notranjosti zavzema Zahodna planota oziroma zahodno višavje, v notranjosti so sušna nižavja, na vzhodu pa Veliko razvodno gorovje.", "Relief vpliva na vodovje in poselitev: vzhodni rob prejme več padavin, notranjost pa je suha in redko poseljena. Povodje Murray-Darling je pomembno za kmetijstvo, vendar občutljivo za suše.", "Pri maturi poveži relief s sušnostjo, arteško vodo in obalno poselitvijo."],
        process: ["stara stabilna celinska zgradba", "dolgotrajno uravnavanje površja", "dvignjen vzhodni rob", "sušna notranjost in obalna zgostitev"],
        examples: ["Veliko razvodno gorovje", "Zahodna planota", "Murray", "Darling"],
        facts: ["Poznaj tri glavne reliefne enote.", "Poveži vzhodno gorovje s padavinami.", "Razloži redko poselitev notranjosti."],
        mistakes: [["Avstralija je visoka gorata celina.", "Je večinoma nizka, stara in uravnana celina."]]
    },
    "avstralija-podnebje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Avstralija je najbolj suha naseljena celina; večina notranjosti ima suho ali polsuho podnebje.",
        concepts: ["sušno podnebje", "polsuho podnebje", "monsun", "oceansko podnebje", "sredozemsko podnebje"],
        explanation: ["V notranjosti Avstralije prevladuje visok zračni tlak, oddaljenost od morja in malo padavin, zato so razširjene puščave in polpuščave. Zahodne obale so suhe, vzhod pa zaradi oceanskega vpliva in reliefa prejme več padavin.", "Sever celine je pod vplivom poletnega monsuna, jugozahod in jug imata sredozemske poteze, jugovzhod pa bolj vlažno oceansko podnebje. Podnebne spremembe krepijo suše v porečju Murray-Darling.", "Maturitetno je ključno razložiti, zakaj je poselitev obalna: voda, milejše podnebje, promet in gospodarstvo."],
        process: ["subtropski visok zračni tlak", "malo vlage v notranjosti", "monsun na severu", "več padavin ob vzhodni in jugovzhodni obali"],
        examples: ["notranje puščave", "severna Avstralija", "jugovzhodna obala", "Murray-Darling"],
        facts: ["Razloži sušnost notranjosti.", "Poznaj severni monsun.", "Poveži podnebje z obalno poselitvijo."],
        mistakes: [["Avstralija ima povsod puščavsko podnebje.", "Suha je predvsem notranjost; obale imajo drugačne podnebne tipe."]]
    },
    "avstralija-vodovje": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Vodovje Avstralije je skromno in neenakomerno; najpomembnejši je sistem Murray-Darling.",
        concepts: ["Murray", "Darling", "arteški bazen", "suša", "namakanje"],
        explanation: ["Zaradi sušnosti ima Avstralija malo stalnih rek. Murray in Darling sta ključna za kmetijstvo jugovzhoda, a sta občutljiva na suše, namakanje in podnebne spremembe.", "V notranjosti so pomembne podzemne vode, zlasti arteški bazeni. Ti omogočajo živinorejo in oskrbo, vendar niso neomejen vir. Vodni primanjkljaj omejuje poselitev in kmetijstvo.", "Pri maturi vodovje poveži s sušnostjo, namakanjem, kmetijstvom in okoljskimi spori glede rabe vode."],
        process: ["malo padavin", "nestalni vodotoki v notranjosti", "odvisnost od podzemne vode", "konflikti med namakanjem in varstvom vodnih ekosistemov"],
        examples: ["Murray", "Darling", "Veliki arteški bazen"],
        facts: ["Poznaj Murray-Darling.", "Razloži pomen arteške vode.", "Poveži suše s kmetijstvom."],
        mistakes: [["Avstralija ima gosto rečno mrežo.", "Zaradi sušnosti ima malo stalnih rek."]]
    },
    "avstralija-prebivalstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Avstralija je zelo urbanizirana; večina prebivalstva živi ob vzhodni, jugovzhodni in jugozahodni obali.",
        concepts: ["obalna poselitev", "urbanizacija", "Aborigini", "priseljevanje", "Sydney"],
        explanation: ["Viri poudarjajo zelo visoko urbanizacijo in obalno poselitev. Notranjost je redko poseljena zaradi sušnosti, vročine, pomanjkanja vode in velikih razdalj. Mesta so velika, urejena in večinoma ob obali.", "Pomemben je tudi zgodovinski vidik: staroselsko prebivalstvo Aborigini, britanska kolonizacija in sodobno priseljevanje so oblikovali demografsko in kulturno podobo države.", "Maturitetno poveži poselitev z naravnimi omejitvami in gospodarskimi možnostmi obal."],
        process: ["sušna notranjost omeji stalno poselitev", "obale omogočijo pristanišča in milejše podnebje", "rast mest", "visoka urbanizacija"],
        examples: ["Sydney", "Melbourne", "Brisbane", "Perth"],
        facts: ["Razloži obalno zgostitev prebivalstva.", "Poznaj visoko urbanizacijo.", "Omeni staroselsko prebivalstvo in priseljevanje."],
        mistakes: [["Avstralija je enakomerno poseljena.", "Prebivalstvo je močno skoncentrirano ob obalah."]]
    },
    "avstralija-gospodarstvo": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf",
        summary: "Avstralsko gospodarstvo temelji na rudarstvu, kmetijstvu, storitvah, izvozu surovin in visoko urbaniziranih obalnih središčih.",
        concepts: ["rudarstvo", "ovčjereja", "pšenica", "izvoz surovin", "storitve"],
        explanation: ["Avstralija ima pomembna rudna bogastva in je velika izvoznica surovin. Kmetijstvo je prostorsko močno vezano na podnebje: ekstenzivna ovčjereja je značilna za polsuha območja, pšenica in intenzivnejše dejavnosti pa za ugodnejše dele.", "Gospodarska središča so ob obalah, kjer so mesta, pristanišča, storitve in industrija. V notranjosti je pomembna raba velikih površin, vendar jo omejuje voda.", "Pri maturi poveži gospodarstvo z naravnimi pogoji: sušnost, rudna bogastva, obale, promet in izvoz."],
        process: ["naravni viri in velike površine", "izvoz rud in kmetijskih proizvodov", "obalna mesta kot gospodarska jedra", "odvisnost kmetijstva od vode"],
        examples: ["ovčjereja", "pšenica", "rudarstvo zahodne Avstralije", "Sydney"],
        facts: ["Poznaj pomen rudarstva.", "Razloži ekstenzivno ovčjerejo.", "Poveži kmetijstvo s sušnostjo."],
        mistakes: [["Avstralija je gospodarsko pomembna samo zaradi turizma.", "Ključni so tudi rudarstvo, kmetijstvo, storitve in izvoz surovin."]]
    }
});

Object.assign(sourceTopicContent, {
    "severna-amerika-relief": {
        source: "GEOGRAFIJA-skriptaMATURA_PLACLJIVA.pdf; M-GEO-2024-novi katalog",
        summary: "Severna Amerika ima reliefne pasove v smeri sever-jug: na zahodu mladonagubano Skalno gorovje, v notranjosti obsežne ravnine, na vzhodu starejše Apalače.",
        concepts: ["Skalno gorovje", "Apalači", "Velike planjave", "Kanadski ščit", "Misisipijsko nižavje"],
        explanation: ["Relief Severne Amerike je pasovit. Zahod zasedajo mlada gorstva Kordiljer, med njimi Skalno gorovje, planote in kotline. V osrednjem delu so obsežne ravnine in Velike planjave, na vzhodu pa starejše, bolj znižane Apalače.", "Ker se reliefne enote raztezajo v smeri sever-jug, ne zapirajo poti hladnim in toplim zračnim masam. To je pomembno za razlago vremenskih skrajnosti v notranjosti celine.", "Za maturo poveži relief s podnebjem, kmetijstvom in prometom: ravnine omogočajo intenzivno kmetijstvo in prometne povezave, gorstva pa vplivajo na padavine in rabo prostora."],
        process: ["gorotvorni procesi na zahodu", "starejše uravnane strukture na vzhodu", "ledeniško preoblikovanje severa", "oblikovanje ravnin in rečnih sistemov"],
        examples: ["Skalno gorovje", "Apalači", "Velike planjave", "Misisipi"],
        facts: ["Poznaj pasovito zgradbo celine.", "Razloži vpliv S-J smeri reliefa na podnebje.", "Poveži ravnine s kmetijstvom."],
        mistakes: [["Apalači so mlado visoko gorstvo.", "Apalači so starejše in bolj znižano gorstvo."]]
    },
    "severna-amerika-podnebje": {
        source: "regionalna skripta; M-GEO katalog",
        summary: "Podnebje Severne Amerike oblikujejo geografska širina, relief v smeri sever-jug, oceani in morski tokovi.",
        concepts: ["celinskost", "tornado alley", "mrtva črta", "oceansko podnebje", "subtropsko podnebje"],
        explanation: ["Ker relief ne zapira prehoda zračnih mas med severom in jugom, lahko hladne polarne zračne mase prodrejo daleč proti jugu, tople tropske pa proti severu. Zato so v notranjosti pogosti vremenski ekstremi, nevihte in tornadi.", "Zahodna obala ima zaradi oceana in reliefa drugačne razmere kot notranjost. Vzhod in jugovzhod sta bolj vlažna, jugozahod pa je sušnejši. Viri omenjajo tudi podnebno in poselitveno ločnico, povezano z zmanjševanjem padavin proti notranjosti.", "Pri maturi moraš podnebje povezati z rabo tal: vlažnejši vzhod, kmetijske ravnine, sušnejši zahod in namakanje."],
        process: ["S-J usmerjen relief omogoči prodor zračnih mas", "srečanje hladnega in toplega zraka", "nastanek vremenskih skrajnosti", "razlike v kmetijski rabi"],
        examples: ["Velike planjave", "jugovzhod ZDA", "Kalifornija", "Kanada"],
        facts: ["Razloži vpliv reliefa na zračne mase.", "Poznaj razliko med vlažnim vzhodom in sušnejšim zahodom.", "Poveži podnebje s kmetijstvom."],
        mistakes: [["Podnebje Severne Amerike je enotno.", "Celina ima polarne, zmerne, suhe, subtropske in gorske podnebne tipe."]]
    },
    "severna-amerika-vodovje": {
        source: "regionalna skripta",
        summary: "Vodovje Severne Amerike zaznamujejo Misisipi z velikim porečjem, Velika jezera in reke, pomembne za promet, energijo in industrijo.",
        concepts: ["Misisipi", "Missouri", "Velika jezera", "Sveti Lovrenc", "hidroenergija"],
        explanation: ["Misisipi z Missourijem oblikuje eno najpomembnejših rečnih omrežij sveta. Povezuje notranjost ZDA z Mehiškim zalivom, pomemben je za promet, kmetijstvo in poselitev.", "Velika jezera so pomembna za industrijski pas, promet, vodooskrbo in povezavo s Svetim Lovrencem. Na zahodu imajo reke zaradi reliefa velik hidroenergetski pomen, vendar je voda v sušnih območjih omejitveni dejavnik.", "Maturitetno je ključno povezati vodovje z gospodarstvom: promet, industrija, namakanje, energija in mesta."],
        process: ["padavine in taljenje snega napajajo reke", "reke povezujejo notranjost in obale", "jezera omogočajo promet in industrijo", "v sušnih območjih se poveča pomen namakanja"],
        examples: ["Misisipi", "Velika jezera", "Sveti Lovrenc", "Kolorado"],
        facts: ["Poznaj Misisipi in Velika jezera.", "Razloži pomen vodovja za industrijo in promet.", "Poveži sušnost z namakanjem."],
        mistakes: [["Velika jezera so pomembna samo naravno.", "So tudi gospodarska in prometna os."]]
    },
    "severna-amerika-prebivalstvo": {
        source: "regionalna skripta",
        summary: "Prebivalstvo Severne Amerike je močno urbanizirano, z veliko zgostitvijo v vzhodnem delu ZDA, ob Velikih jezerih, ob obalah in v metropolitanskih območjih.",
        concepts: ["urbanizacija", "suburbanizacija", "megalopolis", "priseljevanje", "metropolitansko območje"],
        explanation: ["Viri poudarjajo visoko stopnjo urbanizacije. V ZDA in Kanadi velik delež prebivalstva živi v mestih in obmestjih, pomembna pa so tudi priseljevanja, ki spreminjajo etnično in socialno sestavo.", "Suburbanizacija je posebej pomembna: prebivalstvo in dejavnosti se selijo iz mestnih jeder v obmestje, kar vpliva na promet, rabo prostora in socialne razlike. Velika mesta tvorijo metropolitanska območja.", "Pri maturi poveži poselitev z industrijo, prometom, obalami, podnebjem in zgodovino priseljevanja."],
        process: ["industrializacija in storitve privabijo prebivalstvo", "rast mest", "selitev v obmestja", "nastanek metropolitanskih regij"],
        examples: ["severovzhod ZDA", "Velika jezera", "Kalifornija", "Toronto", "New York"],
        facts: ["Poznaj visoko urbanizacijo.", "Razloži suburbanizacijo.", "Poveži poselitev z gospodarstvom in priseljevanjem."],
        mistakes: [["Urbanizacija pomeni samo rast središč mest.", "Vključuje tudi obmestja in širjenje mestnega načina življenja."]]
    },
    "severna-amerika-gospodarstvo": {
        source: "regionalna skripta",
        summary: "Severna Amerika je eno najrazvitejših gospodarskih območij sveta, z močnimi storitvami, industrijo, kmetijstvom, energetiko in visokotehnološkimi dejavnostmi.",
        concepts: ["agrarni pasovi", "industrijski pas", "storitve", "visoka tehnologija", "NAFTA/USMCA"],
        explanation: ["Gospodarstvo ZDA in Kanade temelji na velikem trgu, kapitalu, tehnologiji, prometni povezanosti, naravnih virih in visoki produktivnosti. Kmetijstvo je specializirano in močno mehanizirano, pogosto povezano z velikimi ravninami.", "Stara industrijska območja ob Velikih jezerih so se prestrukturirala, nove dejavnosti pa rastejo v tehnoloških, storitvenih in obalnih središčih. Kanada ima pomembne gozdne, rudne, energetske in vodne vire.", "Pri maturi ne zadošča 'razvita celina'; navedi lokacijske dejavnike, naravne vire in regionalne razlike."],
        process: ["naravni viri in velik trg", "industrializacija", "prehod v storitveno in tehnološko gospodarstvo", "regionalna specializacija"],
        examples: ["Velika jezera", "Kalifornija", "Velike planjave", "Kanada"],
        facts: ["Poveži kmetijstvo z ravninami.", "Poznaj prestrukturiranje stare industrije.", "Razloži pomen storitev in tehnologije."],
        mistakes: [["Severna Amerika ima samo industrijo.", "Pomembni so tudi storitve, kmetijstvo, energetika in visoka tehnologija."]]
    }
});

const notesTree = [
    {
        id: "obca", title: "OBCA GEOGRAFIJA", groups: [
            {
                id: "veda", title: "Geografija kot veda", children: [
                    richTopic("geografija-kot-veda", "geografija-kot-veda", "Geografija kot veda")
                ]
            },
            {
                id: "zemlja", title: "Nastanek in zgradba Zemlje", children: [
                    topic("zgradba-zemlje", "Zgradba Zemlje", "Zemlja ima skorjo, plasc in jedro. Za geografijo je kljucna litosfera, ker je razlomljena na plosce.", ["skorja", "plasc", "jedro", "litosfera", "astenosfera"], ["Litosfera obsega skorjo in zgornji trdni del plasca.", "Astenosfera je bolj plasticna plast, po kateri se premikajo plosce.", "Notranja zgradba pojasni tektoniko, potrese, vulkanizem in nastanek gorovij."], [["Skorja in litosfera sta isto.", "Litosfera je sirsi pojem: skorja + zgornji trdni del plasca."]], ["Alpe", "Himalaja", "Andi"], ["Shema zgradbe Zemlje iz ucbeniskih zapiskov."]),
                    topic("litosfera", "Litosfera", "Litosfera je trdni zunanji del Zemlje, razdeljen na litosferske plosce.", ["litosfera", "litosferska plosca", "oceanska skorja", "kontinentalna skorja"], ["Oceanska skorja je gostejsa in tanjsa od kontinentalne.", "Meje plosc so najpomembnejsa obmocja potresov, vulkanov in gorotvornih procesov.", "Pri maturi litosfero vedno povezi s konkretnim procesom."], [["Litosfera miruje.", "Litosferske plosce se pocasi premikajo."]], ["Srednjeoceanski hrbet", "Himalaja"]),
                    topic("tektonika-plosc", "Tektonika plosc", "Tektonika plosc razlaga razmikanje, primikanje in drsenje litosferskih plosc.", ["subdukcija", "srednjeoceanski hrbet", "globokomorski jarek", "prelom", "orogeneza"], ["Pri razmikanju nastaja nova oceanska skorja.", "Pri subdukciji se gostejsa plosca podriva pod drugo.", "Pri trku celinskih plosc nastajajo nagubana gorstva, npr. Himalaja."], [["Himalaja je nastala zaradi vulkanizma.", "Himalaja je nastala predvsem zaradi trka Indijske in Evrazijske plosce."]], ["Himalaja", "Alpe", "Dinarsko gorstvo"], ["Tektonska karta plosc iz gradiva."]),
                    topic("orogeneze", "Orogeneze", "Orogeneza je gorotvorni proces. Za maturo je pomembna zlasti alpidska orogeneza.", ["orogeneza", "alpidska orogeneza", "mladonagubano gorstvo", "gubanje"], ["Alpe, Dinarsko gorstvo in Himalaja so del mlajsega gorotvornega pasu.", "Gorstva nastajajo z gubanjem, narivanjem in dviganjem kamnin.", "Orogenezo povezi s potresi, reliefno razgibanostjo in prometnimi ovirami."], [["Orogeneza pomeni samo dvig povrsja.", "Orogeneza vkljucuje vec procesov: gubanje, prelamljanje, narivanje in dviganje."]], ["Alpe", "Himalaja", "Karpati"])
                ]
            },
            {
                id: "relief", title: "Relief", children: [
                    topic("nagubana-gorstva", "Nagubana gorstva", "Nagubana gorstva nastanejo predvsem pri primikanju plosc in gubanju kamnin.", ["gubanje", "mladonagubano gorstvo", "orogeneza"], ["So visoka, razgibana in pogosto potresno aktivna.", "Vplivajo na podnebje, promet, poselitev in turizem.", "Primeri: Alpe, Himalaja, Andi."], [["Vsa gorstva nastanejo enako.", "Nagubana gorstva so povezana z gubanjem, grudasta pa s prelomi."]], ["Alpe", "Himalaja", "Andi"]),
                    topic("grudasta-gorstva", "Grudasta gorstva", "Grudasta gorstva nastanejo ob prelomih, ko se deli skorje dvignejo ali ugreznejo.", ["prelom", "gruda", "tektonska kotlina", "horst", "graben"], ["Zanje so znacilni prelomi in tektonske kotline.", "Pogosto jih povezujemo s starejsimi tektonskimi strukturami.", "Pri odgovoru primerjaj z nagubanimi gorstvi."], [["Grudasta gorstva so isto kot nagubana.", "Grudasta gorstva nastajajo ob prelomih, nagubana z gubanjem."]], ["Vogezi", "Schwarzwald"]),
                    topic("vulkanizem", "Vulkanizem", "Vulkanizem nastane, ko magma prodre proti povrsju ali na povrsje.", ["magma", "lava", "vulkan", "vulkanski pepel", "vroca tocka"], ["Pogost je ob subdukciji, razmikanju plosc in vrocih tockah.", "Posledice so lahko rodovitne prsti, nevarnosti, turizem in spremembe rabe prostora.", "Primeri: Islandija, Italija, Indonezija, Japonska."], [["Vulkani so nakljucno razporejeni.", "Vecina vulkanov je povezana z mejami plosc."]], ["Islandija", "Japonska", "Indonezijsko otočje"]),
                    topic("potresi", "Potresi", "Potresi so tresenje tal zaradi nenadne sprostitve energije v Zemljini skorji.", ["zarisce", "epicenter", "magnituda", "intenziteta", "prelom"], ["Skoda je odvisna od magnitude, globine, gradnje in gostote poselitve.", "Najpogostejsi so ob stikih plosc in prelomih.", "Pri maturi je treba razloziti vzrok in posledice."], [["Epicenter je isto kot zarisce.", "Zarisce je v notranjosti Zemlje, epicenter je na povrsju nad zariscem."]], ["Japonska", "Alpe", "Dinarsko gorstvo"]),
                    topic("zunanje-sile", "Zunanje sile", "Zunanje sile preoblikujejo povrsje z vremenenjem, erozijo, prenosenjem in akumulacijo.", ["vremenenje", "erozija", "akumulacija", "ledenik", "reka", "kras"], ["Voda, led, veter in gravitacija odnasajo gradivo.", "Relief vpliva na kmetijstvo, promet in poselitev.", "Pri krasu so pomembne apnenec, voda in raztapljanje."], [["Erozija in akumulacija sta isto.", "Erozija odnasanje, akumulacija odlaganje gradiva."]], ["Kras", "Alpe", "Nil", "Donava"])
                ]
            },
            {
                id: "podnebje", title: "Podnebje", children: [
                    topic("podnebni-dejavniki", "Podnebni dejavniki", "Podnebje oblikujejo geografska sirina, relief, oddaljenost od morja, morski tokovi in zracne mase.", ["geografska sirina", "celinskost", "orografske padavine", "morski tok"], ["Morje zmanjsuje temperaturna nihanja.", "Relief povzroca visinsko pasovitost in orografske padavine.", "Hladni tokovi lahko prispevajo k susnosti obal."], [["Podnebje je isto kot vreme.", "Vreme je trenutno stanje, podnebje je dolgoletno povprecje."]], ["Kanarski tok", "Benguelski tok", "Himalaja"]),
                    topic("zracne-mase", "Zracne mase", "Zracne mase so velike kolicine zraka s podobnimi lastnostmi temperature in vlage.", ["zracna masa", "fronta", "ciklon", "anticiklon"], ["Topla/vlazna masa prinese drugacno vreme kot hladna/suha.", "Na stikih zracnih mas nastajajo fronte.", "Razlaga zracnih mas pomaga pri vremenu in podnebnih tipih."], [["Fronta je stalna meja.", "Fronta je gibajoca se meja med zracnimi masami."]]),
                    topic("monsuni", "Monsuni", "Monsun je sezonsko menjavanje smeri vetrov zaradi razlicnega segrevanja kopnega in morja.", ["monsun", "poletni monsun", "zimski monsun", "sezonske padavine"], ["Poleti vlazen zrak piha z oceana na kopno in prinese padavine.", "Pozimi se smer obrne, zrak je bolj suh.", "Najpomembnejsi primer je juzna in jugovzhodna Azija."], [["Monsun je orkan.", "Monsun je sezonski vetrovni sistem, ne tropski ciklon."]], ["Indija", "Himalaja", "Ganges"], ["Karta monsunov ali klimogram iz maturitetnih prilog."]),
                    topic("podnebni-tipi", "Podnebni tipi", "Podnebni tipi se razlikujejo po temperaturah, padavinah in letnem ritmu.", ["ekvatorialno", "savansko", "puscavsko", "sredozemsko", "celinsko", "polarno"], ["Podnebje povezuj z rastlinstvom, prstmi in kmetijstvom.", "Sredozemsko podnebje ima suha poletja in mile, bolj vlazne zime.", "Puscavsko podnebje ima malo padavin."], [["Podnebni tip dolocimo samo po temperaturi.", "Potrebne so temperature in padavine skozi leto."]], ["Sahara", "Sredozemsko morje", "Amazonija"]),
                    topic("klimogrami", "Klimogrami", "Klimogram prikazuje povprecne mesecne temperature in padavine.", ["temperaturna krivulja", "padavinski stolpci", "letna amplituda", "susni mesec"], ["Najprej poglej temperaturo, nato padavine in razporeditev po mesecih.", "Iz klimograma sklepas na podnebni tip in poloblo.", "Pri maturi navedi dokaz iz grafa."], [["Klimogram samo opisem.", "Treba ga je razloziti in povezati s podnebjem."]], [], ["Klimogrami iz maturitetnih pol."])
                ]
            },
            {
                id: "vodovje", title: "Vodovje", children: [
                    topic("reke", "Reke", "Reke oblikujejo relief in so pomembne za poselitev, kmetijstvo, promet in energijo.", ["porecje", "povodje", "razvodje", "recni rezim", "hidrogram"], ["Porecje pripada reki, povodje morju.", "Recni rezim je letno nihanje pretoka.", "Reke so pogosto osi poselitve in gospodarstva."], [["Porecje in povodje sta isto.", "Porecje je za reko, povodje za morje."]], ["Donava", "Ren", "Nil", "Ganges", "Kongo"]),
                    topic("jezera", "Jezera", "Jezera so naravna ali umetna vodna telesa; nastanejo tektonsko, ledenisko, krasko ali z zajezitvijo.", ["tektonsko jezero", "ledenisko jezero", "umetno jezero", "zasoljenost"], ["Pomembna so za vodooskrbo, turizem, ribolov in energijo.", "Nekatera so slana zaradi mocnega izhlapevanja ali slabega odtoka.", "Primeri: Kaspijsko jezero, Viktorijino jezero, Gornje jezero."], [["Vsa jezera imajo odtok.", "Nekatera jezera so zaprta in lahko zasoljena."]], ["Kaspijsko jezero", "Viktorijino jezero", "Gornje jezero"]),
                    topic("morja", "Morja", "Morja so deli svetovnega oceana, pomembna za promet, podnebje, ribolov in turizem.", ["sredozemsko morje", "robno morje", "zaliv", "preliv", "obala"], ["Sredozemska morja so bolj zaprta med celinami.", "Morja povezujejo prometne poti in gospodarska obmocja.", "Obale so pogosto gosteje poseljene."], [["Morje vpliva samo na promet.", "Morje vpliva tudi na podnebje, turizem, gospodarstvo in poselitev."]], ["Sredozemsko morje", "Severno morje", "Crno morje", "Rdeče morje"]),
                    topic("oceani", "Oceani", "Oceani so glavni deli svetovnega morja in uravnavajo podnebni ter vodni krog.", ["Tihi ocean", "Atlantski ocean", "Indijski ocean", "slanost", "temperatura morja"], ["Oceani so vir vlage in energije za ozracje.", "Pomembni so za svetovni promet in ribolov.", "Tokovi prenasajo toploto med geografskimi sirinami."], [["Oceani so pri geografiji samo lokacije.", "Oceani so dejaven podnebni in gospodarski dejavnik."]]),
                    topic("morski-tokovi", "Morski tokovi", "Morski tokovi prenasajo toplo ali hladno morsko vodo in vplivajo na podnebje obal.", ["topli tok", "hladni tok", "zalivski tok", "Kanarski tok", "Benguelski tok"], ["Topli tokovi omilijo podnebje in povecajo vlago.", "Hladni tokovi pogosto zmanjsajo izhlapevanje in padavine ob obali.", "Puscavi Namib in Atakama sta klasicna primera vpliva hladnih tokov."], [["Hladni tok pomeni hladno celino.", "Hladni tok predvsem vpliva na vlago, meglo in susnost obale."]], ["Zalivski tok", "Kanarski tok", "Benguelski tok", "Humboldtov tok"])
                ]
            },
            { id: "prsti", title: "Prsti", children: [topic("prsti", "Prsti", "Prst nastaja iz kamninske podlage pod vplivom podnebja, reliefa, vode, rastlinstva in cloveka.", ["humus", "preperevanje", "erozija prsti", "zasoljevanje", "rodovitnost"], ["Prsti so osnova kmetijstva.", "Degradacija nastaja zaradi erozije, zasoljevanja, onesnazevanja in prekomerne rabe.", "V odgovoru povezi prst s podnebjem in rastlinstvom."], [["Vec sonca vedno pomeni bolj rodovitno prst.", "Brez vode in humusa rodovitnost ni nujno velika."]], ["Sahel", "Sahara", "Panonska kotlina"], ["Profil prsti iz ucbeniskih zapiskov."])] },
            { id: "rastlinstvo", title: "Rastlinstvo", children: [topic("rastlinstvo", "Rastlinstvo", "Rastlinstvo se razporeja po toplotnih in vodnih pasovih.", ["ekvatorialni gozd", "savana", "stepa", "tajga", "tundra", "makija"], ["Ekvatorialni gozd potrebuje toploto in vlago.", "Savana ima dezno in susno dobo.", "Rastlinstvo je dober dokaz podnebnega tipa."], [["Rastlinstvo je odvisno samo od temperature.", "Odvisno je tudi od padavin, prsti, reliefa in cloveka."]], ["Amazonija", "Sahel", "Sahara"], ["Karta rastlinskih pasov iz gradiva."])] },
            {
                id: "prebivalstvo", title: "Prebivalstvo", children: [
                    topic("demografski-prehod", "Demografski prehod", "Demografski prehod razlaga spremembe rodnosti, smrtnosti in naravnega prirastka skozi razvoj.", ["rodnost", "smrtnost", "naravni prirastek", "starostna piramida"], ["V zgodnjih fazah sta rodnost in smrtnost visoki.", "Ob upadu smrtnosti naravni prirastek naraste.", "V razvitih drzavah je prirastek nizek ali negativen."], [["Naravni prirastek je isto kot priseljevanje.", "Naravni prirastek je razlika med rodnostjo in smrtnostjo."]], [], ["Starostna piramida iz maturitetne pole."]),
                    topic("migracije", "Migracije", "Migracije so selitve prebivalstva zaradi gospodarskih, politicnih, okoljskih ali osebnih razlogov.", ["emigracija", "imigracija", "begunci", "dnevne migracije"], ["Migracije spreminjajo starostno, socialno in narodnostno sestavo.", "Vzroki so potisni in privlacni dejavniki.", "Pri maturi locuj vzroke in posledice."], [["Migracije vedno pomenijo odseljevanje.", "Migracije vkljucujejo priseljevanje in odseljevanje."]]),
                    topic("urbanizacija-preb", "Urbanizacija", "Urbanizacija je rast mestnega prebivalstva, sirjenje mest in mestnega nacina zivljenja.", ["urbanizacija", "suburbanizacija", "dnevne migracije", "metropola"], ["V razvitih drzavah je pomembna suburbanizacija.", "V manj razvitih drzavah so pogosta hitro rastoca velemesta.", "Urbanizacijo povezuj s prometom, delovnimi mesti in kakovostjo zivljenja."], [["Urbanizacija pomeni samo gradnjo blokov.", "Pomeni sirsi proces rasti mest in mestnega nacina zivljenja."]], ["Pariska kotlina", "Padska nizina"])
                ]
            },
            {
                id: "gospodarstvo", title: "Gospodarstvo", children: [
                    topic("kmetijstvo", "Kmetijstvo", "Kmetijstvo je odvisno od prsti, podnebja, reliefa, vode, trga in tehnicne razvitosti.", ["intenzivno", "ekstenzivno", "namakanje", "monokultura", "erozija"], ["Nizavja omogocajo lazjo mehanizacijo.", "Susna obmocja potrebujejo namakanje.", "Neprimerna raba povzroca erozijo in zasoljevanje."], [["Kmetijstvo je odvisno samo od podnebja.", "Odvisno je od naravnih in druzbenih dejavnikov."]], ["Gangeško nižavje", "Nil", "Panonska kotlina"]),
                    topic("industrija", "Industrija", "Industrija se razvija glede na surovine, energijo, delovno silo, promet, trg in kapital.", ["lokacijski dejavnik", "surovine", "trg", "delovna sila", "deindustrializacija"], ["Stara industrijska obmocja se lahko prestrukturirajo.", "Promet in trg sta danes pogosto pomembnejsa od surovin.", "Industrija vpliva na zaposlovanje, mesta in okolje."], [["Industrija mora biti vedno ob surovinah.", "Odloca vec lokacijskih dejavnikov."]], ["Ren", "Severno morje"]),
                    topic("energetika", "Energetika", "Energetika obravnava vire energije, porabo, odvisnost in okoljske posledice.", ["fosilna goriva", "hidroenergija", "jedrska energija", "obnovljivi viri"], ["Hidroenergija potrebuje vodo in reliefni padec.", "Fosilna goriva povzrocajo izpuste in odvisnost.", "Obnovljivi viri so prostorsko pogojeni."], [["Obnovljivi viri nimajo posledic.", "Imajo manjse, a vseeno prostorske in okoljske vplive."]], ["Donava", "Nil", "Severno morje"]),
                    topic("promet", "Promet", "Promet povezuje naselja, regije, trge in gospodarska obmocja.", ["prometni koridor", "tranzit", "pristanisce", "prelaz", "plovna reka"], ["Relief lahko promet olajsa ali ovira.", "Obale, doline in nizavja so pomembni prometni pasovi.", "Promet vpliva na razvoj mest in gospodarstva."], [["Prometne smeri so nakljucne.", "Sledijo reliefu, obalam, rekam, trgom in zgodovinskim potem."]], ["Ren", "Donava", "Sredozemsko morje"]),
                    topic("turizem", "Turizem", "Turizem temelji na naravnih in kulturnih privlacnostih, dostopnosti in storitvah.", ["mnozicni turizem", "trajnostni turizem", "sezonskost", "nosilna zmogljivost"], ["Gorski, obmorski, mestni in zdraviliski turizem imajo razlicne pogoje.", "Turizem prinese dohodek, a tudi pritisk na prostor.", "Pri maturi navedi pozitivne in negativne posledice."], [["Turizem je vedno dober za prostor.", "Lahko povzroca onesnazevanje, sezonskost in preobremenjenost."]], ["Alpe", "Sredozemsko morje"])
                ]
            },
            { id: "trajnost", title: "Trajnostni razvoj", children: [topic("trajnostni-razvoj", "Trajnostni razvoj", "Trajnostni razvoj usklajuje gospodarstvo, druzbo in okolje.", ["trajnost", "okoljski odtis", "obnovljivi viri", "varstvo okolja"], ["Ne pomeni ustavitve razvoja, ampak odgovorno rabo virov.", "Povezan je s prometom, energijo, kmetijstvom, turizmom in mesti.", "Pri maturi predlagaj izvedljivo resitev."], [["Trajnost pomeni nic razvoja.", "Trajnost pomeni razvoj z manjso skodo za okolje in druzbo."]], ["Sahel", "Alpe", "Sredozemsko morje"])] }
        ]
    },
    {
        id: "regionalna", title: "REGIONALNA GEOGRAFIJA SVETA", groups: [
            { id: "azija", title: "Azija", children: [
                richTopic("azija-relief", "azija-0", "Azija - Relief", ["Himalaja", "Tibet", "Ganges", "Ind", "Gobi", "Kaspijsko jezero"]),
                richTopic("azija-podnebje", "azija-1", "Azija - Podnebje", ["Himalaja", "Gobi", "Ganges", "Ind"]),
                richTopic("azija-rastlinstvo", "azija-2", "Azija - Rastlinstvo", ["Gobi", "Tibet"]),
                richTopic("azija-vodovje", "azija-3", "Azija - Vodovje", ["Ganges", "Ind", "Kaspijsko jezero"]),
                richTopic("azija-prebivalstvo", "azija-4", "Azija - Prebivalstvo", ["Ganges", "Kitajsko nižavje"]),
                richTopic("azija-gospodarstvo", "azija-5", "Azija - Gospodarski razvoj", ["Perzijski zaliv", "Ganges"]),
                richTopic("azija-drzave", "azija-6", "Azija - Pomembne države", ["Himalaja", "Ganges", "Perzijski zaliv"]),
                richTopic("azija-matura", "azija-7", "Azija - Maturitetne posebnosti", ["Himalaja", "Ganges", "Gobi"])
            ] },
            { id: "afrika", title: "Afrika", children: [
                richTopic("afrika-relief", "afrika-0", "Afrika - Relief", ["Sahara", "Sahel", "Nil", "Kongo", "Kalahari", "Gvinejski zaliv"]),
                richTopic("afrika-podnebje", "afrika-1", "Afrika - Podnebje", ["Sahara", "Sahel", "Kalahari", "Gvinejski zaliv"]),
                richTopic("afrika-rastlinstvo", "afrika-2", "Afrika - Rastlinstvo", ["Sahara", "Sahel", "Kongo"]),
                richTopic("afrika-vodovje", "afrika-3", "Afrika - Vodovje", ["Nil", "Kongo", "Viktorijino jezero"]),
                richTopic("afrika-prebivalstvo", "afrika-4", "Afrika - Prebivalstvo", ["Nil", "Sahel", "Gvinejski zaliv"]),
                richTopic("afrika-gospodarstvo", "afrika-5", "Afrika - Gospodarstvo", ["Gvinejski zaliv", "Kalahari"]),
                richTopic("afrika-problemi", "afrika-6", "Afrika - Problemi razvoja", ["Sahel", "Sahara"])
            ] },
            { id: "severna-amerika", title: "Severna Amerika", children: [
                richTopic("severna-amerika-relief", "severna-amerika-0", "Severna Amerika - Relief", ["Skalno gorovje", "Apalači", "Misisipi", "Gornje jezero", "Mehiški zaliv"]),
                richTopic("severna-amerika-podnebje", "severna-amerika-1", "Severna Amerika - Podnebje", ["Skalno gorovje", "Mehiški zaliv"]),
                richTopic("severna-amerika-vodovje", "severna-amerika-2", "Severna Amerika - Vodovje", ["Misisipi", "Gornje jezero", "Mehiški zaliv"]),
                richTopic("severna-amerika-prebivalstvo", "severna-amerika-3", "Severna Amerika - Prebivalstvo", ["Misisipi", "Gornje jezero"]),
                richTopic("severna-amerika-gospodarstvo", "severna-amerika-4", "Severna Amerika - Gospodarstvo", ["Misisipi", "Gornje jezero", "Mehiški zaliv"])
            ] },
            { id: "juzna-amerika", title: "Južna Amerika", children: [
                richTopic("juzna-amerika-relief", "juzna-amerika-0", "Južna Amerika - Relief", ["Andi", "Amazonka", "Amazonsko nižavje", "Atakama", "Pampe"]),
                richTopic("juzna-amerika-podnebje", "juzna-amerika-1", "Južna Amerika - Podnebje", ["Andi", "Atakama", "Amazonka"]),
                richTopic("juzna-amerika-rastlinstvo", "juzna-amerika-2", "Južna Amerika - Rastlinstvo", ["Amazonsko nižavje", "Atakama", "Pampe"]),
                richTopic("juzna-amerika-vodovje", "juzna-amerika-3", "Južna Amerika - Vodovje", ["Amazonka", "Andi"]),
                richTopic("juzna-amerika-gospodarstvo", "juzna-amerika-4", "Južna Amerika - Gospodarstvo", ["Pampe", "Andi", "Amazonka"])
            ] },
            { id: "avstralija-oceanija", title: "Avstralija in Oceanija", children: [
                richTopic("avstralija-relief", "avstralija-0", "Avstralija in Oceanija - Relief", ["Veliko razvodno gorovje", "Murray", "Darling", "Tasmanija"]),
                richTopic("avstralija-podnebje", "avstralija-1", "Avstralija in Oceanija - Podnebje", ["Veliko razvodno gorovje", "Murray", "Darling"]),
                richTopic("avstralija-vodovje", "avstralija-2", "Avstralija in Oceanija - Vodovje", ["Murray", "Darling"]),
                richTopic("avstralija-prebivalstvo", "avstralija-3", "Avstralija in Oceanija - Prebivalstvo", ["Tasmanija"]),
                richTopic("avstralija-gospodarstvo", "avstralija-4", "Avstralija in Oceanija - Gospodarstvo", ["Murray", "Darling"])
            ] },
            { id: "polarna", title: "Polarna območja", children: [
                richTopic("polarna-arktika", "polarna-0", "Polarna območja - Arktika", ["Arktika", "Grenlandija"]),
                richTopic("polarna-antarktika", "polarna-1", "Polarna območja - Antarktika", ["Antarktika"]),
                richTopic("polarna-podnebje", "polarna-2", "Polarna območja - Podnebje", ["Arktika", "Antarktika", "Grenlandija"]),
                richTopic("polarna-led", "polarna-3", "Polarna območja - Led", ["Grenlandija", "Antarktika"]),
                richTopic("polarna-gospodarstvo", "polarna-4", "Polarna območja - Gospodarski pomen", ["Arktika", "Antarktika"])
            ] }
        ]
    },
    {
        id: "evropa", title: "EVROPA", groups: [
            { id: "evropa-main", title: "Evropa", children: [
                richTopic("evropa-celina", "evropa-celina", "Evropa - Evropa kot celina", ["Sredozemsko morje", "Severno morje", "Črno morje"]),
                richTopic("evropa-relief", "evropa-0", "Evropa - Relief", ["Alpe", "Karpati", "Ren", "Donava", "Volga", "Sredozemsko morje"]),
                richTopic("evropa-podnebje", "evropa-1", "Evropa - Podnebje", ["Alpe", "Sredozemsko morje", "Severno morje"]),
                richTopic("evropa-vodovje", "evropa-2", "Evropa - Vodovje", ["Ren", "Donava", "Volga", "Črno morje"]),
                richTopic("evropa-prebivalstvo", "evropa-3", "Evropa - Prebivalstvo", ["Nemško-poljsko nižavje", "Padska nižina"]),
                richTopic("evropa-gospodarstvo", "evropa-4", "Evropa - Gospodarstvo", ["Ren", "Severno morje", "Sredozemsko morje"]),
                richTopic("evropa-eu", "evropa-5", "Evropa - Evropska unija", ["Ren", "Donava", "Sredozemsko morje"]),
                richTopic("evropa-regionalne", "evropa-6", "Evropa - Regionalne posebnosti", ["Alpe", "Sredozemsko morje", "Severno morje"]),
                richTopic("evropa-okolje", "evropa-okolje", "Evropa - Okoljski problemi", ["Ren", "Donava", "Alpe", "Sredozemsko morje"])
            ] }
        ]
    },
    {
        id: "slovenija", title: "SLOVENIJA", groups: [
            { id: "slovenija-main", title: "Slovenija", children: [
                richTopic("slovenija-lega", "slovenija-lega", "Slovenija - Lega Slovenije"),
                richTopic("slovenija-naravne", "slovenija-0", "Slovenija - Naravne enote"),
                richTopic("slovenija-relief", "slovenija-1", "Slovenija - Relief"),
                richTopic("slovenija-podnebje", "slovenija-2", "Slovenija - Podnebje"),
                richTopic("slovenija-vodovje", "slovenija-3", "Slovenija - Vodovje"),
                richTopic("slovenija-prsti-rastlinstvo", "slovenija-prsti-rastlinstvo", "Slovenija - Prsti in rastlinstvo"),
                richTopic("slovenija-prebivalstvo", "slovenija-4", "Slovenija - Prebivalstvo"),
                richTopic("slovenija-naselja", "slovenija-naselja", "Slovenija - Naselja"),
                richTopic("slovenija-kmetijstvo", "slovenija-5", "Slovenija - Kmetijstvo"),
                richTopic("slovenija-industrija", "slovenija-6", "Slovenija - Industrija"),
                richTopic("slovenija-promet", "slovenija-7", "Slovenija - Promet"),
                richTopic("slovenija-turizem", "slovenija-8", "Slovenija - Turizem"),
                richTopic("slovenija-regionalizacija", "slovenija-9", "Slovenija - Regionalizacija")
            ] }
        ]
    },
    {
        id: "matura-spretnosti", title: "MATURITETNE NALOGE IN SPRETNOSTI", groups: [
            { id: "matura-main", title: "Maturitetne spretnosti", children: [
                richTopic("matura-zemljevid", "matura-zemljevid", "Delo z zemljevidom"),
                richTopic("matura-klimogram", "matura-klimogram", "Delo s klimogramom"),
                richTopic("matura-grafi", "matura-grafi", "Delo z grafi in tabelami"),
                richTopic("matura-odgovori", "matura-odgovori", "Pisanje odgovorov"),
                richTopic("matura-tipi", "matura-tipi", "Najpogostejši maturitetni tipi vprašanj")
            ] }
        ]
    }
];

const notesData = notesTree.flatMap(section =>
    section.groups.flatMap(group =>
        group.children.map(child => ({ ...child, section: section.title, group: group.title }))
    )
);

const textbookFigures = {
    "nagubana-gorstva": [{ src: "assets/notes/textbook-world/world_p01_img09_512x164.jpg", caption: "Reliefni profil iz učbenika: primer prehoda prek različnih reliefnih enot." }],
    "grudasta-gorstva": [{ src: "assets/notes/textbook-world/world_p01_img09_512x164.jpg", caption: "Reliefni profil iz učbenika: uporaben za primerjavo dvignjenih in ugreznjenih delov površja." }],
    "zunanje-sile": [{ src: "assets/notes/textbook-world/world_p01_img09_512x164.jpg", caption: "Reliefni profil iz učbenika: povezava reliefa, podnebja in rastlinstva." }],
    "azija-0": [{ src: "assets/notes/textbook-world/world_p01_img10_521x435.jpg", caption: "Azija: učbeniška karta z reliefom in klimogrami." }],
    "azija-1": [{ src: "assets/notes/textbook-world/world_p01_img10_521x435.jpg", caption: "Azija: karta pomaga povezati relief, podnebje in klimograme." }],
    "afrika-0": [{ src: "assets/notes/textbook-world/world_p01_img05_1333x1049.jpg", caption: "Afrika: učbeniška karta reliefa in podnebnih primerov." }],
    "afrika-1": [{ src: "assets/notes/textbook-world/world_p01_img05_1333x1049.jpg", caption: "Afrika: karta s klimogrami za razlago podnebnih pasov." }],
    "afrika-2": [{ src: "assets/notes/textbook-world/world_p01_img05_1333x1049.jpg", caption: "Afrika: povezava podnebja, rastlinstva in višinskih pasov." }],
    "juzna-amerika-0": [{ src: "assets/notes/textbook-world/world_p01_img08_1036x1597.jpg", caption: "Južna Amerika: lega in reliefna zgradba celine." }],
    "juzna-amerika-1": [{ src: "assets/notes/textbook-world/world_p01_img08_1036x1597.jpg", caption: "Južna Amerika: karta za povezavo reliefa, podnebja in vodovja." }],
    "avstralija-0": [{ src: "assets/notes/textbook-world/world_p01_img02_1356x1015.jpg", caption: "Avstralija: učbeniška karta z reliefom in klimogrami." }],
    "avstralija-1": [{ src: "assets/notes/textbook-world/world_p01_img02_1356x1015.jpg", caption: "Avstralija: karta za razlago sušnosti notranjosti in obalnih razlik." }]
};

notesData.forEach(note => {
    if (textbookFigures[note.id]) note.figures.unshift(...textbookFigures[note.id]);
});

function savedOpenGroups() {
    try { return JSON.parse(localStorage.getItem(NOTES_GROUP_KEY)) || {}; }
    catch { return {}; }
}

function saveOpenGroups(groups) {
    localStorage.setItem(NOTES_GROUP_KEY, JSON.stringify(groups));
}

function savedNoteFilters() {
    try { return JSON.parse(localStorage.getItem(NOTES_FILTER_KEY)) || {}; }
    catch { return {}; }
}

function saveNoteFilters(filters) {
    localStorage.setItem(NOTES_FILTER_KEY, JSON.stringify(filters));
}

function noteSearchText(note) {
    return [
        note.title, note.section, note.group, note.summary,
        ...note.concepts, ...note.facts, ...note.mapUnits,
        ...note.mistakes.flat()
    ].join(" ").toLowerCase();
}

function mapUnitLink(name) {
    return `<button class="map-unit-link" data-map-unit="${name}">${name}</button>`;
}

function renderFigure(figure) {
    if (typeof figure === "string") return `<div class="pdf-figure-ref">${figure}</div>`;
    const src = typeof gefaExternalAssetUrl === "function" ? gefaExternalAssetUrl(figure.src) : figure.src;
    return `
        <figure class="note-figure">
            <img src="${src}" alt="${figure.caption || "Slika iz učbenika"}" loading="lazy">
            <figcaption>${figure.caption || "Slika iz učbenika"}</figcaption>
        </figure>
    `;
}

function highlightTerms(text, concepts = []) {
    let output = text;
    concepts
        .filter(term => term.length > 4)
        .sort((a, b) => b.length - a.length)
        .slice(0, 6)
        .forEach(term => {
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            output = output.replace(new RegExp(`\\b(${escaped})\\b`, "gi"), "<strong>$1</strong>");
        });
    return output;
}

function expandedExplanation(note) {
    if (note.explanation?.length) return note.explanation;
    if (note.id === "grudasta-gorstva") {
        return [
            "Grudasta gorstva nastanejo zaradi prelomov v Zemljini skorji. Ob tektonskih pritiskih se posamezni deli skorje ne nagubajo v dolga vzporedna slemena, ampak se prelomijo v večje bloke.",
            "Dvignjeni deli se imenujejo horsti. Ugreznjeni deli se imenujejo tektonske kotline oziroma grabni. Zato je za grudasta gorstva značilna blokovska zgradba: nekateri deli so dvignjeni, drugi spuščeni.",
            "Za razliko od nagubanih gorstev grudasta gorstva nimajo izrazite slemenitve, ki bi nastala z gubanjem plasti. Pomembno je, da pri maturi ne napišeš samo, da so nastala zaradi tektonike, ampak natančno poveš: nastala so s prelamljanjem in navpičnim premikanjem blokov."
        ];
    }
    if (note.section === "REGIONALNA GEOGRAFIJA" || note.section === "EVROPA" || note.section === "SLOVENIJA") {
        return [
            `${note.title} obravnavaš kot povezavo naravnih in družbenih dejavnikov. Najprej določi, kje je pojav razširjen, nato razloži, kateri reliefni, podnebni, vodni, prebivalstveni ali gospodarski dejavniki ga oblikujejo.`,
            "Pri regionalni geografiji je pomembno, da ne naštevaš samo imen. Ime na karti moraš znati uporabiti kot dokaz za razlago: gorovje je lahko prometna ovira in podnebna ločnica, reka os poselitve in kmetijstva, morje pa prometni, turistični in podnebni dejavnik.",
            "V maturitetnem odgovoru se zato splača pisati v zaporedju: lokacija, vzrok, posledica, primer. Tako odgovor deluje geografsko in ni samo splošna obnova."
        ];
    }
    return [
        note.summary,
        `${note.facts[0] || ""} ${note.facts[1] || ""}`.trim(),
        `${note.facts[2] || "Pri maturi temo poveži s konkretnim primerom, karto ali grafom."}`
    ].filter(Boolean);
}

function processSteps(note) {
    if (note.process?.length) return note.process;
    if (note.id === "grudasta-gorstva") {
        return ["delovanje tektonskih sil", "nastanek prelomov", "dvig in ugrez blokov", "oblikovanje horstov in grabnov"];
    }
    if (note.id.includes("tektonika")) return ["premikanje litosferskih plošč", "stik plošč", "razmikanje, primikanje ali drsenje", "nastanek reliefa, potresov ali vulkanizma"];
    if (note.id.includes("monsun")) return ["različno segrevanje kopnega in morja", "nastanek tlačnih razlik", "sezonska menjava smeri vetrov", "poletne padavine ali zimska suša"];
    if (note.id.includes("klimogram")) return ["preberi temperaturno krivuljo", "preberi padavinske stolpce", "poišči sušno ali deževno dobo", "določi podnebni tip in ga utemelji"];
    if (note.id.includes("reke")) return ["padavine ali taljenje snega", "odtok po porečju", "oblikovanje rečne doline", "vpliv na poselitev, promet in kmetijstvo"];
    if (note.id.includes("urbanizacija")) return ["rast števila prebivalcev", "selitve v mesta", "širjenje mestnega prostora", "spremembe prometa, stanovanj in storitev"];
    return ["opredeli pojem", "poišči pojav na karti ali v gradivu", "razloži vzrok", "dodaj posledico in konkreten primer"];
}

function relatedTopics(note) {
    const defaults = {
        "grudasta-gorstva": ["Nagubana gorstva", "Tektonika plosc", "Orogeneze", "Potresi"],
        "nagubana-gorstva": ["Tektonika plosc", "Orogeneze", "Potresi", "Relief"],
        "vulkanizem": ["Tektonika plosc", "Potresi", "Litosfera"],
        "potresi": ["Tektonika plosc", "Vulkanizem", "Litosfera"],
        "monsuni": ["Podnebni dejavniki", "Podnebni tipi", "Azija - Podnebje"],
        "morski-tokovi": ["Podnebje", "Morja", "Oceani", "Puščave"]
    };
    return defaults[note.id] || [note.group, note.section, ...note.concepts.slice(0, 2)].filter(Boolean);
}

function comparisonTable(note) {
    if (note.id === "grudasta-gorstva" || note.id === "nagubana-gorstva") {
        return `
            <table class="note-table">
                <thead><tr><th></th><th>Nagubana gorstva</th><th>Grudasta gorstva</th></tr></thead>
                <tbody>
                    <tr><td>Nastanek</td><td>gubanje kamninskih plasti</td><td>prelamljanje skorje v bloke</td></tr>
                    <tr><td>Zgradba</td><td>slemena in doline v smeri gub</td><td>horsti in grabni</td></tr>
                    <tr><td>Primeri</td><td>Alpe, Himalaja, Andi</td><td>Vogezi, Schwarzwald, Harz</td></tr>
                    <tr><td>Maturitetna past</td><td>ne razlozis stika plosc</td><td>zamenjas horst in graben</td></tr>
                </tbody>
            </table>
        `;
    }
    if (note.id.includes("klimogram")) {
        return `
            <table class="note-table">
                <thead><tr><th>Kaj gledas?</th><th>Kaj pove?</th></tr></thead>
                <tbody>
                    <tr><td>temperaturna krivulja</td><td>toplotni pas, letna amplituda, polobla</td></tr>
                    <tr><td>padavinski stolpci</td><td>susen ali dezeven del leta</td></tr>
                    <tr><td>razmerje T/P</td><td>podnebni tip in mozna rastlinska odeja</td></tr>
                </tbody>
            </table>
        `;
    }
    return "";
}

function renderNotesNav(activeId, filter = "") {
    const nav = document.getElementById("notesNav");
    const sources = document.getElementById("notesSources");
    if (!nav) return;
    const q = filter.trim().toLowerCase();
    const openGroups = savedOpenGroups();
    const filters = savedNoteFilters();

    nav.innerHTML = notesTree.map(section => {
        const groups = section.groups.map(group => {
            const visibleChildren = group.children.filter(child => {
                const note = { ...child, section: section.title, group: group.title };
                if (filters.maturaOnly && !note.facts?.length) return false;
                if (filters.imagesOnly && !note.figures?.length) return false;
                return !q || noteSearchText(note).includes(q);
            });
            if (!visibleChildren.length) return "";
            const groupKey = `${section.id}:${group.id}`;
            const open = openGroups[groupKey] !== false;
            return `
                <div class="notes-tree-group">
                    <button class="notes-tree-toggle" data-notes-toggle="${groupKey}">
                        <span>${open ? "▾" : "▸"}</span><span>${group.title}</span>
                    </button>
                    <div class="notes-tree-children ${open ? "" : "hidden"}">
                        ${visibleChildren.map(child => `<button class="notes-tree-item ${child.id === activeId ? "active" : ""}" data-note-id="${child.id}">${child.title}</button>`).join("")}
                    </div>
                </div>
            `;
        }).join("");
        if (!groups.trim()) return "";
        return `<div class="notes-tree-section"><div class="notes-tree-heading">${section.title}</div>${groups}</div>`;
    }).join("");

    nav.querySelectorAll("[data-notes-toggle]").forEach(btn => btn.addEventListener("click", () => {
        const groups = savedOpenGroups();
        groups[btn.dataset.notesToggle] = groups[btn.dataset.notesToggle] === false;
        saveOpenGroups(groups);
        renderNotesNav(activeId, document.getElementById("notesQuickSearch")?.value || "");
    }));
    nav.querySelectorAll("[data-note-id]").forEach(btn => btn.addEventListener("click", () => renderNotes(btn.dataset.noteId)));

    if (sources) {
        sources.innerHTML = `<div class="font-black text-slate-700">Viri</div>${notesSourceCorpus.map(source => `<div>• ${source}</div>`).join("")}`;
    }
}

function renderFilterButtons() {
    const filters = savedNoteFilters();
    [
        ["notesMaturaOnly", "maturaOnly"],
        ["notesDefinitionsOnly", "definitionsOnly"],
        ["notesImagesOnly", "imagesOnly"]
    ].forEach(([id, key]) => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.toggle("active", !!filters[key]);
    });
}

function renderTopic(note) {
    const explanation = expandedExplanation(note);
    const steps = processSteps(note);
    const related = relatedTopics(note);
    const comparison = comparisonTable(note);
    const examples = note.examples?.length ? note.examples : note.mapUnits;
    const filters = savedNoteFilters();
    if (filters.definitionsOnly) {
        return `
        <article class="note-topic" id="note-${note.id}">
            <header class="note-topic-header">
                <div class="text-xs uppercase tracking-wider font-black text-slate-500">${note.section} · ${note.group}</div>
                <h3 class="text-2xl font-black mt-1">${note.title}</h3>
            </header>
            <div class="note-body article">
                <section class="note-article-section">
                    <h4>Definicija</h4>
                    <p>${highlightTerms(note.summary, note.concepts)}</p>
                    <p class="note-mini-heading">Ključni pojmi</p>
                    <div class="note-chip-row">${note.concepts.map(x => `<span>${x}</span>`).join("")}</div>
                    ${note.source ? `<p class="note-source-line">Vir: ${note.source}</p>` : ""}
                </section>
            </div>
        </article>`;
    }
    if (filters.imagesOnly) {
        return `
        <article class="note-topic" id="note-${note.id}">
            <header class="note-topic-header">
                <div class="text-xs uppercase tracking-wider font-black text-slate-500">${note.section} · ${note.group}</div>
                <h3 class="text-2xl font-black mt-1">${note.title}</h3>
            </header>
            <div class="note-body article">
                <section class="note-article-section">
                    <h4>Slike / tabele / skice iz PDF-jev</h4>
                    ${note.figures.length ? note.figures.map(renderFigure).join("") : `<div class="pdf-figure-ref">Za to podtemo še ni dodane zanesljivo izrezane slike.</div>`}
                    ${comparison || ""}
                    ${note.source ? `<p class="note-source-line">Vir: ${note.source}</p>` : ""}
                </section>
            </div>
        </article>`;
    }
    return `
        <article class="note-topic" id="note-${note.id}">
            <header class="note-topic-header">
                <div class="text-xs uppercase tracking-wider font-black text-slate-500">${note.section} · ${note.group}</div>
                <h3 class="text-2xl font-black mt-1">${note.title}</h3>
            </header>
            <div class="note-body article">
                <section class="note-article-section">
                    <h4>Razlaga</h4>
                    <div class="note-definition"><strong>Definicija:</strong> ${highlightTerms(note.summary, note.concepts)}</div>
                    ${explanation.map(p => `<p>${highlightTerms(p, note.concepts)}</p>`).join("")}
                    ${comparison}
                    ${examples.length ? `<div class="note-example-box"><strong>Primeri:</strong><ul>${examples.slice(0, 8).map(unit => `<li>${note.mapUnits.includes(unit) ? mapUnitLink(unit) : unit}</li>`).join("")}</ul></div>` : ""}
                </section>

                <section class="note-article-section">
                    <h4>Kako nastane / kako razložiš</h4>
                    <div class="note-process">
                        ${steps.map((step, index) => `<div><span>${index + 1}</span><p>${step}</p></div>`).join("")}
                    </div>
                    ${note.figures.length ? note.figures.map(renderFigure).join("") : `<div class="pdf-figure-ref">Shema/slika iz PDF-ja za to podtemo še ni zanesljivo izrezana, zato je ne vstavljam na silo.</div>`}
                </section>

                <section class="note-article-section">
                    <h4>Maturiteta</h4>
                    <p><strong>Kaj moraš znati:</strong></p>
                    <ul>${note.facts.map(x => `<li>${x}</li>`).join("")}</ul>
                    <p class="note-mini-heading">Ključni pojmi</p>
                    <div class="note-chip-row">${note.concepts.map(x => `<span>${x}</span>`).join("")}</div>
                </section>

                <section class="note-article-section">
                    <h4>Pogoste napake</h4>
                    <div class="note-mistakes">${note.mistakes.map(([bad, good]) => `<div><p class="bad">❌ ${bad}</p><p class="good">✅ ${good}</p></div>`).join("")}</div>
                </section>

                <section class="note-article-section">
                    <h4>Povezave</h4>
                    <ul>${related.map(item => `<li>${item}</li>`).join("")}</ul>
                    <p class="note-mini-heading">Povezane enote na karti</p>
                    <p>${note.mapUnits.length ? note.mapUnits.map(mapUnitLink).join(" ") : "Za to temo povezave pridejo pri slovenski karti ali pri naslednjem vnosu enot."}</p>
                    ${note.source ? `<p class="note-source-line">Vir: ${note.source}</p>` : ""}
                </section>
            </div>
        </article>
    `;
}

function renderNotes(topicId) {
    setupNotesSearch();
    const quickSearch = document.getElementById("notesQuickSearch");
    const remembered = localStorage.getItem(NOTES_OPEN_KEY);
    const activeId = topicId || remembered || notesData[0]?.id;
    const note = notesData.find(item => item.id === activeId) || notesData[0];
    if (!note) return;

    localStorage.setItem(NOTES_OPEN_KEY, note.id);
    renderNotesNav(note.id, quickSearch?.value || "");
    renderFilterButtons();

    const target = document.getElementById("notesContent");
    if (!target) return;
    target.innerHTML = renderTopic(note);
    target.querySelectorAll("[data-map-unit]").forEach(btn => btn.addEventListener("click", () => openMapUnit(btn.dataset.mapUnit)));
}

function setupNotesSearch() {
    const input = document.getElementById("notesQuickSearch");
    if (input && !input.dataset.ready) {
        input.dataset.ready = "1";
        input.addEventListener("input", () => renderNotesNav(localStorage.getItem(NOTES_OPEN_KEY), input.value));
    }
    [
        ["notesMaturaOnly", "maturaOnly"],
        ["notesDefinitionsOnly", "definitionsOnly"],
        ["notesImagesOnly", "imagesOnly"]
    ].forEach(([id, key]) => {
        const btn = document.getElementById(id);
        if (!btn || btn.dataset.ready) return;
        btn.dataset.ready = "1";
        btn.addEventListener("click", () => {
            const filters = savedNoteFilters();
            filters[key] = !filters[key];
            if (key === "definitionsOnly" && filters[key]) filters.imagesOnly = false;
            if (key === "imagesOnly" && filters[key]) filters.definitionsOnly = false;
            saveNoteFilters(filters);
            renderNotes(localStorage.getItem(NOTES_OPEN_KEY));
        });
    });
    renderFilterButtons();
}

async function openMapUnit(name) {
    const item = allSearchUnits().find(unit => unit.name === name);
    if (!item) return;
    switchTab("map");
    if (item.regionId !== currentRegion) await loadRegion(item.regionId, { restore: true });
    setTimeout(() => highlightCorrectFeature(name, 2200, true), 250);
}

function renderGlobalSearch(query) {
    const box = document.getElementById("globalSearchResults");
    const q = query.trim().toLowerCase();
    if (!q) {
        box.classList.add("hidden");
        box.innerHTML = "";
        return;
    }
    const noteMatches = notesData.filter(note => noteSearchText(note).includes(q)).slice(0, 8);
    const unitMatches = allSearchUnits().filter(unit => unit.name.toLowerCase().includes(q)).slice(0, 8);
    box.innerHTML = `
        ${noteMatches.map(note => `<button class="search-result" data-note="${note.id}"><div class="font-black text-sm">${note.title}</div><div class="text-xs text-slate-500">Zapiski · ${note.section} · ${note.group}</div></button>`).join("")}
        ${unitMatches.map(unit => `<button class="search-result" data-unit="${unit.name}"><div class="font-black text-sm">${unit.name}</div><div class="text-xs text-slate-500">Nema karta · ${unit.regionName}</div></button>`).join("")}
        ${!noteMatches.length && !unitMatches.length ? `<div class="p-3 text-sm text-slate-500">Ni zadetkov.</div>` : ""}
    `;
    box.classList.remove("hidden");
    box.querySelectorAll("[data-note]").forEach(btn => btn.addEventListener("click", () => {
        switchTab("notes");
        renderNotes(btn.dataset.note);
        box.classList.add("hidden");
    }));
    box.querySelectorAll("[data-unit]").forEach(btn => btn.addEventListener("click", () => {
        openMapUnit(btn.dataset.unit);
        box.classList.add("hidden");
    }));
}
