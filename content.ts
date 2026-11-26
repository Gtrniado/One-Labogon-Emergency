export type Lang = "en" | "fil" | "ceb";

export interface CategoryStep {
  title: string;
  detail: string;
}

export interface EmergencyCategory {
  id: string;
  icon: string;
  keywords: string[];
  contactIds: string[];
  steps: Record<Lang, Array<CategoryStep | string>>;
  donts: Record<Lang, string[]>;
}

export interface GoBagItem {
  id: string;
  label: Record<Lang, string>;
}

export interface FirstAidCard {
  id: string;
  icon: string;
  title: Record<Lang, string>;
  steps: Record<Lang, string[]>;
}

export const CATEGORIES: EmergencyCategory[] = [
  {
    id: "medical",
    icon: "🩺",
    keywords: ["ambulance", "ambulansya", "hospital", "ospital", "sick", "sakit", "bleeding", "dugo", "pagdurugo", "stroke", "heart attack", "cpr", "faint", "nawalan ng malay", "nahimatay", "first aid"],
    contactIds: ["nat-911", "eruf-tel-1", "eruf-mobile-1", "prc-mobile"],
    steps: {
      en: [
        {
          title: "Make sure the area is safe",
          detail: "Check for traffic, fire, broken glass, or electrical hazards before approaching the person."
        },
        {
          title: "Check if the person is awake and breathing",
          detail: "Tap their shoulder gently, ask loudly if they are okay, and look at their chest for 10 seconds to see if they are breathing normally."
        },
        {
          title: "Call for medical help right away",
          detail: "Call Labogon Health Center, ERUF, Red Cross, or the nearest hospital below. State your exact sitio/purok, landmark, and the patient's condition."
        },
        {
          title: "Stop heavy bleeding with firm pressure",
          detail: "Press a clean cloth or sterile gauze firmly and continuously over the wound. If blood soaks through, place another cloth on top without lifting the first one."
        },
        {
          title: "Start hands-only CPR if not breathing",
          detail: "Place the heel of both hands on the center of the chest and push hard and fast (about 2 pushes per second) without stopping until medics arrive."
        },
        {
          title: "Check for stroke signs & monitor until help arrives",
          detail: "Remember FAST: Face drooping, Arm weakness, Speech slurred — Time to call immediately. Keep the person warm, calm, and breathing."
        }
      ],
      fil: [
        {
          title: "Tiyaking ligtas muna ang paligid",
          detail: "Suriin kung may dumadaang sasakyan, apoy, basag na salamin, o kable ng kuryente bago lumapit sa pasyente."
        },
        {
          title: "Tingnan kung gising at humihinga ang tao",
          detail: "Tapikin nang marahan ang balikat, tanungin nang malakas kung ayos lang siya, at tingnan ang dibdib sa loob ng 10 segundo kung normal ang paghinga."
        },
        {
          title: "Tumawag agad ng tulong medikal",
          detail: "Tumawag sa Labogon Health Center, ERUF, Red Cross, o pinakamalapit na ospital sa ibaba. Sabihin ang eksaktong sitio/purok, palatandaan, at kalagayan ng pasyente."
        },
        {
          title: "Pigilin ang malakas na pagdurugo",
          detail: "Diinan nang mahigpit at tuloy-tuloy ang sugat gamit ang malinis na tela. Kung tumagos ang dugo, magdagdag ng isa pang tela sa ibabaw nang hindi inaalis ang nauna."
        },
        {
          title: "Magbigay ng hands-only CPR kung hindi humihinga",
          detail: "Ilagay ang dalawang kamay sa gitna ng dibdib at itulak nang malakas at mabilis (mga 2 beses bawat segundo) hanggang dumating ang tulong."
        },
        {
          title: "Bantayan ang senyales ng stroke habang naghihintay",
          detail: "Tandaan ang FAST: nakalaylay na mukha, mahinang braso, utal na pagsasalita — tumawag agad. Panatilihing kalmado at komportable ang pasyente."
        }
      ],
      ceb: [
        {
          title: "Siguroha una nga luwas ang palibot",
          detail: "Tan-awa kung naay trapiko, kalayo, buak nga bildo, o kable sa kuryente sa dili pa moduol sa pasyente."
        },
        {
          title: "Susiha kung nahigmata ug nagginhawa ang tawo",
          detail: "Tapika og hinay ang abaga, pangutana og kusog kung okay ba siya, ug tan-awa ang dughan sulod sa 10 ka segundo kung normal ba ang pagginhawa."
        },
        {
          title: "Tawag dayon og tabang medikal",
          detail: "Tawag sa Labogon Health Center, ERUF, Red Cross, o labing duol nga ospital sa ubos. Isulti ang eksaktong sitio/purok, timaan, ug kahimtang sa pasyente."
        },
        {
          title: "Pugngi ang grabe nga pagdugo",
          detail: "Pislita og lig-on ug walay hunong ang samad gamit ang limpyo nga panapton. Kung molapos ang dugo, pagbutang og lain nga panapton sa ibabaw nga dili tangtangon ang una."
        },
        {
          title: "Buhata ang hands-only CPR kung dili makaginhawa",
          detail: "Ibutang ang duha ka kamot sa tunga sa dughan ug pislita og kusog ug paspas (mga 2 ka pislit kada segundo) hangtod moabot ang tabang."
        },
        {
          title: "Bantayi ang timailhan sa stroke samtang naghulat",
          detail: "Hinumdomi ang FAST: nalupaypay nga nawong, huyang nga bukton, dili klaro nga pagsulti — tawag dayon. Ipadayon nga kalmado ug komportable ang pasyente."
        }
      ]
    },
    donts: {
      en: [
        "Do NOT give food, water, or medicine to someone who is unconscious, drowsy, or having trouble swallowing.",
        "Do NOT move a person with a suspected neck, head, or back injury unless they are in immediate danger.",
        "Do NOT remove a blood-soaked cloth from a wound — keep pressing and add clean layers on top."
      ],
      fil: [
        "HUWAG magbigay ng pagkain, tubig, o gamot sa taong walang malay, hilo, o hirap lumunok.",
        "HUWAG igalaw ang taong hinihinalang may pinsala sa leeg, ulo, o likod maliban kung may agarang panganib.",
        "HUWAG tanggalin ang telang basa ng dugo mula sa sugat — patuloy na diinan at dagdagan lang ng malinis na tela sa ibabaw."
      ],
      ceb: [
        "AYAW pakan-a, paimna, o hatagi og tambal ang tawo nga walay panimuot, nalipong, o naglisod og tulon.",
        "AYAW ibalhin ang tawo nga gidudahang naay samad sa liog, ulo, o likod gawas kung naay dayon nga peligro.",
        "AYAW tangtanga ang panapton nga napuno sa dugo gikan sa samad — ipadayon ang pagpislit ug pagdugang lang og limpyo nga panapton sa ibabaw."
      ]
    }
  },
  {
    id: "fire",
    icon: "🔥",
    keywords: ["fire", "sunog", "bumbero", "bombero", "bfp", "smoke", "usok", "aso", "burn", "paso"],
    contactIds: ["nat-911", "bfp-tel-1", "bfp-tel-2", "bfp-mobile", "labogon-ert-globe-1"],
    steps: {
      en: [
        {
          title: "Alert everyone and evacuate immediately",
          detail: "Shout \"Sunog!\" loudly so neighbors and family wake up and leave the house or building right away."
        },
        {
          title: "Test closed doors before opening",
          detail: "Touch the door and handle with the back of your hand. If it feels hot, keep it shut and use an alternate exit or window."
        },
        {
          title: "Stay low and crawl under smoke",
          detail: "Cleaner, cooler air stays near the floor. Cover your nose and mouth with a damp cloth and crawl quickly toward the exit."
        },
        {
          title: "Stop, Drop, and Roll if clothes catch fire",
          detail: "Stop moving right away, drop flat to the ground, cover your face with your hands, and roll back and forth until the flames are out."
        },
        {
          title: "Call fire responders once you are outside",
          detail: "Move to a safe open area first, then call Mandaue City Fire Station (BFP) or Labogon DRRMO and give the exact street, sitio, and landmark."
        },
        {
          title: "Keep roads clear and stay outside",
          detail: "Meet family at a safe landmark away from power lines, do a headcount, and keep alleys clear so fire trucks can pass."
        }
      ],
      fil: [
        {
          title: "Balaan ang lahat at lumikas agad",
          detail: "Sumigaw ng \"Sunog!\" nang malakas upang magising at makalabas agad ang pamilya at mga kapitbahay."
        },
        {
          title: "Suriin ang saradong pinto bago buksan",
          detail: "Hawakan ng likod ng kamay ang pinto at hawakan nito. Kung mainit, huwag buksan at gumamit ng ibang labasan o bintana."
        },
        {
          title: "Dumapa at gumapang sa ilalim ng usok",
          detail: "Nasa sahig ang mas malinis at malamig na hangin. Takpan ang ilong at bibig ng basang tela at gumapang palabas."
        },
        {
          title: "Tigil, Dapa, at Gumulong kung nagliyab ang damit",
          detail: "Huwag tumakbo. Tumigil agad, dumapa sa lupa, takpan ang mukha gamit ang kamay, at gumulong hanggang mamatay ang apoy."
        },
        {
          title: "Tumawag sa bumbero kapag nasa labas na",
          detail: "Pumunta muna sa ligtas at bukas na lugar bago tumawag sa Mandaue City Fire Station (BFP) o Labogon DRRMO at ibigay ang eksaktong lugar at palatandaan."
        },
        {
          title: "Panatilihing bukas ang daan at manatili sa labas",
          detail: "Magtipon sa ligtas na lugar malayo sa kable ng kuryente, bilangin ang mga kasama, at huwag harangan ang daan ng fire truck."
        }
      ],
      ceb: [
        {
          title: "Pasidan-i ang tanan ug gawas dayon",
          detail: "Singgit og \"Sunog!\" og kusog aron makamata ug makagawas dayon ang imong pamilya ug mga silingan."
        },
        {
          title: "Hikapa una ang sirado nga pultahan",
          detail: "Gamita ang likod sa kamot paghikap sa pultahan ug gunitanan. Kung init kini, ayaw buksi ug gamita ang lain nga gawasanan."
        },
        {
          title: "Pagpaubos ug kamang sa ilawom sa aso",
          detail: "Ang mas limpyo nga hangin naa duol sa salog. Tabuni ang ilong ug baba gamit ang basa nga panapton ug kamang padulong sa gawas."
        },
        {
          title: "Undang, Hapa, ug Ligid kung masunog ang sinina",
          detail: "Ayaw pagdagan. Undang dayon, hapa sa yuta, tabuni ang nawong gamit ang kamot, ug ligid hangtod mapalong ang kalayo."
        },
        {
          title: "Tawag sa bombero kung naa na sa gawas",
          detail: "Balhin una sa luwas ug hawan nga lugar, unya tawag sa Mandaue City Fire Station (BFP) o Labogon DRRMO ug ihatag ang eksaktong dalan ug timaan."
        },
        {
          title: "Hawan-a ang dalan ug pabilin sa gawas",
          detail: "Magtapok sa luwas nga lugar palayo sa kable sa kuryente, ihapa ang pamilya, ug ayaw babagi ang agianan sa fire truck."
        }
      ]
    },
    donts: {
      en: [
        "Do NOT go back inside a burning building for phones, money, documents, or pets.",
        "Do NOT throw water on cooking-oil (grease) fires or live electrical fires — it makes them spread or causes electrocution.",
        "Do NOT lock doors behind you or block narrow alleys where residents and firefighters need to pass."
      ],
      fil: [
        "HUWAG nang bumalik sa loob ng nasusunog na gusali para kumuha ng cellphone, pera, dokumento, o gamit.",
        "HUWAG buhusan ng tubig ang apoy mula sa mantika o kuryente — lalo itong lalaki o maaari kang makuryente.",
        "HUWAG i-lock ang pinto sa likuran mo at huwag harangan ang mga eskinita na daraanan ng bumbero."
      ],
      ceb: [
        "AYAW na pagbalik sa sulod sa nasunog nga balay aron mokuha og cellphone, kwarta, dokumento, o gamit.",
        "AYAW sabwagi og tubig ang kalayo gikan sa mantika o kuryente — makapakusog kini sa kalayo o makakuryente.",
        "AYAW i-lock ang pultahan sa imong likod ug ayaw babagi ang mga eskinita nga agianan sa mga bombero."
      ]
    }
  },
  {
    id: "police",
    icon: "🚓",
    keywords: ["police", "pulis", "crime", "krimen", "theft", "nakaw", "robbery", "holdap", "tanod", "fight", "away", "violence", "abuse", "abuso", "vawc"],
    contactIds: ["nat-911", "mcpo-tel", "mcpo-mobile-1", "mcpo-station3", "labogon-ert-globe-1"],
    steps: {
      en: [
        {
          title: "Move to a safe, well-lit place",
          detail: "Put distance and locked doors between yourself and any threat. Go to a trusted neighbor, open store, or Barangay Hall."
        },
        {
          title: "Call the police or Barangay Hall",
          detail: "Call Mandaue City Police Office or Barangay Labogon Hall. Speak calmly and give your exact location and whether anyone is hurt."
        },
        {
          title: "Share accurate details if safe to observe",
          detail: "Tell responders how many suspects there are, clothing, any weapons seen, vehicle plate/type, and which direction they went."
        },
        {
          title: "Protect the scene until responders arrive",
          detail: "Leave everything undisturbed so police can check footprints, CCTV footage, or physical evidence."
        },
        {
          title: "Coordinate with barangay tanods & support desks",
          detail: "Alert Barangay Labogon tanods to help secure the street. For domestic violence or child abuse, request the Police Women and Children Protection Desk (WCPD)."
        }
      ],
      fil: [
        {
          title: "Pumunta muna sa ligtas at maliwanag na lugar",
          detail: "Lumayo sa panganib at pumasok sa ligtas na bahay, bukas na tindahan, o Barangay Hall."
        },
        {
          title: "Tumawag sa pulisya o Barangay Hall",
          detail: "Tumawag sa Mandaue City Police Office o Barangay Labogon Hall. Ibigay ang eksaktong lokasyon at kung may nasaktan."
        },
        {
          title: "Magbigay ng malinaw na detalye kung ligtas",
          detail: "Sabihin kung ilan ang suspek, suot na damit, anumang nakitang armas, uri o plaka ng sasakyan, at direksyong tinahak."
        },
        {
          title: "Panatilihing hindi nagagalaw ang pinangyarihan",
          detail: "Huwag linisin o galawin ang mga bagay sa lugar upang mapreserba ang mga ebidensya at CCTV."
        },
        {
          title: "Makipag-ugnayan sa barangay tanod o WCPD",
          detail: "Ipaalam sa barangay tanod para mabantayan ang lugar. Para sa pang-aabuso sa kababaihan o bata, i-report sa Police Women and Children Protection Desk (WCPD)."
        }
      ],
      ceb: [
        {
          title: "Adto una sa luwas ug hayag nga lugar",
          detail: "Palayo sa hulga ug sulod sa luwas nga balay, bukas nga tindahan, o Barangay Hall."
        },
        {
          title: "Tawag sa pulis o Barangay Hall",
          detail: "Tawag sa Mandaue City Police Office o Barangay Labogon Hall. Ihatag ang eksaktong lokasyon ug kung naay nasamdan."
        },
        {
          title: "Ihatag ang klaro nga detalye kung luwas tan-awon",
          detail: "Ingna kung pila ang suspetsado, sinina, hinagiban nga nakita, sakyanan o plaka, ug asa sila padulong."
        },
        {
          title: "Ampingi ang lugar nga nahitabuhan",
          detail: "Ayaw limpyohi o tandoga ang mga butang aron mapreserba ang ebidensya ug CCTV."
        },
        {
          title: "Pakig-coordinate sa barangay tanod o WCPD",
          detail: "Pahibaloa ang barangay tanod aron makabantay sa dalan. Kung naay pagpang-abuso sa babaye o bata, i-report sa Police Women and Children Protection Desk (WCPD)."
        }
      ]
    },
    donts: {
      en: [
        "Do NOT chase, corner, or confront an armed or aggressive offender on your own.",
        "Do NOT touch, pick up, or clean items at the scene before police inspect it.",
        "Do NOT post unverified accusations or suspect photos on social media before reporting to authorities."
      ],
      fil: [
        "HUWAG habulin, harangin, o komprontahin nang mag-isa ang may armas o marahas na salarin.",
        "HUWAG hawakan, pulutin, o linisin ang anumang bagay sa pinangyarihan bago dumating ang pulis.",
        "HUWAG mag-post ng hindi beripikadong paratang sa social media bago makapag-report sa awtoridad."
      ],
      ceb: [
        "AYAW gukda, babagi, o atubanga nga mag-inusara ang armado o bayolente nga tawo.",
        "AYAW hikapa, kuhaa, o limpyohi ang bisan unsa sa lugar sa dili pa moabot ang pulis.",
        "AYAW pag-post og dili kumpirmadong pasangil sa social media sa dili pa mo-report sa awtoridad."
      ]
    }
  },
  {
    id: "accident",
    icon: "🚗",
    keywords: ["accident", "aksidente", "crash", "banggaan", "collision", "motorcycle", "motor", "road", "kalsada", "injured", "sugatan", "nasamdan", "rescue"],
    contactIds: ["nat-911", "eruf-tel-1", "eruf-mobile-1", "cdrrmo-tel", "cdrrmo-globe"],
    steps: {
      en: [
        {
          title: "Secure the area and warn traffic",
          detail: "Turn off vehicle engines, switch on hazard lights, and check for oncoming vehicles, leaking fuel, or downed electrical wires."
        },
        {
          title: "Call ERUF or Bantay Mandaue immediately",
          detail: "Report the exact street/landmark, how many vehicles are involved, and the number and condition of injured persons."
        },
        {
          title: "Keep injured persons still and calm",
          detail: "Reassure them that help is on the way. Keep them still unless fire, rising water, or traffic puts them in immediate danger."
        },
        {
          title: "Control bleeding with clean pressure",
          detail: "Press firmly with a clean cloth or bandage over any actively bleeding wound while waiting for the ambulance."
        },
        {
          title: "Clear space for responders",
          detail: "Ask onlookers to step back so air flows freely around the injured person and ambulance crews have clear access."
        }
      ],
      fil: [
        {
          title: "Siguraduhin ang kaligtasan at balaan ang trapiko",
          detail: "Patayin ang makina ng sasakyan, i-on ang hazard lights, at mag-ingat sa dumadaang sasakyan, tumatagas na gasolina, o nakalaylay na kable."
        },
        {
          title: "Tumawag agad sa ERUF o Bantay Mandaue",
          detail: "Ibigay ang eksaktong kalsada o palatandaan, bilang ng sangkot na sasakyan, at bilang at kalagayan ng mga sugatan."
        },
        {
          title: "Panatilihing kalmado at hindi gumagalaw ang sugatan",
          detail: "Kausapin nang mahinahon na parating na ang tulong. Huwag silang buhatin maliban kung may banta ng apoy o paparating na panganib."
        },
        {
          title: "Pahintuin ang pagdurugo gamit ang malinis na tela",
          detail: "Diinan nang mahigpit ang nagdurugong sugat gamit ang malinis na tela habang hinihintay ang ambulansya."
        },
        {
          title: "Magbigay ng espasyo para sa mga rescuer",
          detail: "Pakiusapan ang mga nakikiusyoso na umatras upang makahinga nang maayos ang biktima at makapasok agad ang ambulansya."
        }
      ],
      ceb: [
        {
          title: "Siguroha ang lugar ug pasidan-i ang trapiko",
          detail: "Patya ang makina sa sakyanan, i-on ang hazard lights, ug bantayi ang mga sakyanan, nagtulo nga gasolina, o nahulog nga kable."
        },
        {
          title: "Tawag dayon sa ERUF o Bantay Mandaue",
          detail: "Isulti ang eksaktong dalan o timaan, pila ka sakyanan ang naapil, ug pila ang nasamdan ug unsay kahimtang nila."
        },
        {
          title: "Pabilina nga kalmado ug dili molihok ang nasamdan",
          detail: "Sultihi sila nga padulong na ang tabang. Ayaw sila ibalhin gawas kung naay kalayo o dayon nga peligro sa palibot."
        },
        {
          title: "Pugngi ang pagdugo gamit ang limpyo nga panapton",
          detail: "Pislita og lig-on ang nagdugo nga samad gamit ang limpyo nga panapton samtang naghulat sa ambulansya."
        },
        {
          title: "Paghatag og lugar para sa mga rescuer",
          detail: "Hangyoa ang mga nagtan-aw nga moatras aron makaginhawa og tarong ang biktima ug dali makasulod ang ambulansya."
        }
      ]
    },
    donts: {
      en: [
        "Do NOT remove a motorcycle rider's helmet unless they are unconscious and not breathing or vomiting and choking.",
        "Do NOT pull or lift an injured person out of a vehicle unless there is fire or immediate danger.",
        "Do NOT crowd around the victim or let anyone smoke near spilled fuel."
      ],
      fil: [
        "HUWAG tanggalin ang helmet ng nagmomotor maliban kung walang malay at hindi humihinga o nabubulunan sa pagsusuka.",
        "HUWAG hilahin o buhatin ang sugatan palabas ng sasakyan maliban kung may sunog o agarang panganib.",
        "HUWAG makisiksik sa paligid ng biktima at huwag magsigarilyo malapit sa tumagas na gasolina."
      ],
      ceb: [
        "AYAW tangtanga ang helmet sa nag-motor gawas kung walay panimuot ug dili makaginhawa o matuk-an sa suka.",
        "AYAW biraha o alsaha ang nasamdan gawas sa sakyanan gawas kung naay sunog o dayon nga peligro.",
        "AYAW pagdasok palibot sa biktima ug ayaw panigarilyo duol sa natulo nga gasolina."
      ]
    }
  },
  {
    id: "flood",
    icon: "🌊",
    keywords: ["flood", "baha", "tubig", "water", "evacuate", "lumikas", "mobalhin", "evacuation", "rain", "ulan", "leptospirosis"],
    contactIds: ["nat-911", "labogon-ert-globe-1", "labogon-ert-suntnt-1", "cdrrmo-tel", "pdrrmo-tel"],
    steps: {
      en: [
        {
          title: "Move to higher ground early",
          detail: "Follow Barangay Labogon and Mandaue DRRMO advisories. Evacuate before water reaches knee level or cuts off roads."
        },
        {
          title: "Turn off main electricity & LPG if still dry",
          detail: "Switch off the main circuit breaker and shut off your LPG tank valve only if the floor is dry and you have dry hands and footwear."
        },
        {
          title: "Grab your emergency go-bag",
          detail: "Take waterproofed IDs, essential medicines, drinking water, ready-to-eat food, flashlight, phone, power bank, and dry clothes."
        },
        {
          title: "Assist children, seniors, and PWDs first",
          detail: "Help vulnerable family members and neighbors reach the Barangay Labogon Gymnasium or designated evacuation center safely."
        },
        {
          title: "Wait for official clearance before returning",
          detail: "Stay out of floodwater and check for structural damage or live wires before re-entering your home. See a doctor promptly if you get fever or muscle pain after flood exposure."
        }
      ],
      fil: [
        {
          title: "Lumikas nang maaga sa mas mataas na lugar",
          detail: "Sundin ang mga abiso ng Barangay Labogon at Mandaue DRRMO. Lumikas bago tumaas ang tubig o mabarahan ang kalsada."
        },
        {
          title: "Patayin ang main breaker at LPG kung tuyo pa",
          detail: "I-off ang main switch ng kuryente at isara ang tangke ng LPG kung tuyo pa ang sahig, kamay, at suot na tsinelas o sapatos."
        },
        {
          title: "Dalhin ang iyong emergency go-bag",
          detail: "Ihanda ang mga ID sa plastik, gamot, inuming tubig, pagkaing handang kainin, flashlight, cellphone, power bank, at tuyong damit."
        },
        {
          title: "Unahin ang bata, matanda, at may kapansanan",
          detail: "Tulungan ang mga kasama sa bahay at kapitbahay na makapunta nang ligtas sa Barangay Labogon Gymnasium o itinalagang evacuation center."
        },
        {
          title: "Maghintay ng opisyal na abiso bago bumalik",
          detail: "Iwasan ang tubig-baha at suriin kung may sira o nakalaylay na kable bago pumasok sa bahay. Magpatingin agad sa doktor kung nilagnat o sumakit ang katawan pagkatapos lumusong sa baha."
        }
      ],
      ceb: [
        {
          title: "Balhin sa mas taas nga lugar sayo pa",
          detail: "Sunda ang pahibalo sa Barangay Labogon ug Mandaue DRRMO. Balhin sa dili pa molalom ang tubig o maputol ang mga dalan."
        },
        {
          title: "Patya ang main switch ug LPG kung uga pa",
          detail: "I-off ang main breaker sa kuryente ug sirad-i ang balbula sa LPG kung uga pa ang salog, imong kamot, ug sapatos."
        },
        {
          title: "Kuhaa ang imong emergency go-bag",
          detail: "Dad-a ang mga ID nga naputos sa plastik, tambal, mainom nga tubig, pagkaon, flashlight, cellphone, power bank, ug uga nga sinina."
        },
        {
          title: "Unaha ang mga bata, tigulang, ug PWD",
          detail: "Tabangi ang mga mas huyang nga miyembro sa pamilya ug silingan nga makaabot sa Barangay Labogon Gymnasium o evacuation center."
        },
        {
          title: "Hulata ang opisyal nga pahibalo sa dili pa mouli",
          detail: "Likayi ang tubig-baha ug susiha ang balay kung naay nadaot o kable sa kuryente. Adto dayon sa doktor kung hilantan o magsakit ang kaunuran human makalakaw sa baha."
        }
      ]
    },
    donts: {
      en: [
        "Do NOT walk, wade, swim, or drive through moving floodwater — hidden manholes, sharp debris, and strong currents can be fatal.",
        "Do NOT touch electrical switches, outlets, or appliances while standing on a wet floor.",
        "Do NOT drink tap water or eat food that touched floodwater without proper boiling or clearance."
      ],
      fil: [
        "HUWAG maglakad, lumusong, lumangoy, o magmaneho sa umaagos na baha — may mga bukas na kanal, matulis na bagay, at malakas na agos.",
        "HUWAG hawakan ang switch ng kuryente, saksakan, o appliances habang nakatapak sa basang sahig.",
        "HUWAG uminom ng kontaminadong tubig o kumain ng pagkaing naabot ng baha."
      ],
      ceb: [
        "AYAW paglakaw, pagtabok, paglangoy, o pagdrayb sa nagdagayday nga baha — basin naay abli nga kanal, hait nga butang, o kusog nga sulog.",
        "AYAW hikapa ang switch sa kuryente, outlet, o appliances samtang nagtindog sa basa nga salog.",
        "AYAW inom og tubig o kaon og pagkaon nga naabot sa tubig-baha."
      ]
    }
  },
  {
    id: "disaster",
    icon: "🌀",
    keywords: ["earthquake", "lindol", "linog", "typhoon", "bagyo", "storm", "unos", "disaster", "sakuna", "katalagman", "landslide", "pagguho", "tsunami", "pagasa", "phivolcs"],
    contactIds: ["nat-911", "labogon-ert-globe-1", "cdrrmo-tel", "pdrrmo-tel", "prc-mobile"],
    steps: {
      en: [
        {
          title: "Earthquake: DROP, COVER, and HOLD ON",
          detail: "Drop onto your hands and knees, take cover under a sturdy table or desk protecting your head and neck, and hold on until the shaking stops."
        },
        {
          title: "If outdoors or near hazards, move to open space",
          detail: "Stay away from glass windows, tall cabinets, concrete walls, power poles, and trees. If indoors, wait until shaking stops before exiting."
        },
        {
          title: "After shaking: evacuate damaged buildings & expect aftershocks",
          detail: "Check yourself and others for injuries, turn off gas/power if damaged, use stairs (never elevators), and stay alert for tsunami advisories if near the coast."
        },
        {
          title: "Typhoon: prepare before winds and rain intensify",
          detail: "Follow PAGASA and Barangay Labogon advisories. Charge phones and power banks, store 3 days of clean water and food, and secure loose roofs or outdoor items."
        },
        {
          title: "Stay indoors or evacuate early when ordered",
          detail: "Keep away from windows during strong gusts. If you live near a river, creek, or coastline, evacuate immediately when local authorities advise it."
        },
        {
          title: "Use SMS text and verify official updates",
          detail: "Send short text messages instead of long calls so emergency phone lines remain open for life-threatening calls."
        }
      ],
      fil: [
        {
          title: "Lindol: DROP, COVER, at HOLD ON",
          detail: "Yumuko (Drop), magtago sa ilalim ng matibay na mesa habang tinatakpan ang ulo at leeg (Cover), at kumapit nang mahigpit (Hold On) hanggang tumigil ang pagyanig."
        },
        {
          title: "Lumayo sa mga bagay na maaaring bumagsak",
          detail: "Umiwas sa bintana, matataas na kabinet, pader, at poste ng kuryente. Kung nasa loob ng gusali, hintaying huminto ang pagyanig bago lumabas."
        },
        {
          title: "Pagkatapos ng lindol: lumabas nang maayos at asahan ang aftershock",
          detail: "Suriin kung may sugatan, patayin ang gas/kuryente kung may sira, gumamit ng hagdan (huwag elevator), at maging alerto sa abiso ng tsunami kung malapit sa dagat."
        },
        {
          title: "Bagyo: maghanda bago lumakas ang hangin at ulan",
          detail: "Subaybayan ang PAGASA at Barangay Labogon. I-charge ang cellphone at power bank, mag-imbak ng 3 araw na tubig at pagkain, at itali ang maluluwag na yero o gamit."
        },
        {
          title: "Manatili sa loob o lumikas agad kapag iniutos",
          detail: "Lumayo sa mga bintana habang malakas ang hangin. Kung nakatira malapit sa ilog, sapa, o dagat, lumikas agad kapag nag-abiso ang barangay."
        },
        {
          title: "Gumamit ng text at makinig sa opisyal na balita",
          detail: "Gumamit ng maiikling text message para hindi masikip ang linya ng telepono at sundin lamang ang opisyal na anunsyo."
        }
      ],
      ceb: [
        {
          title: "Linog: DROP, COVER, ug HOLD ON",
          detail: "Yukbo sa salog (Drop), pagtago sa ilawom sa lig-on nga lamesa nga nagtabon sa ulo ug liog (Cover), ug kupot og hugot (Hold On) hangtod mohunong ang pag-uyog."
        },
        {
          title: "Palayo sa mga butang nga mahimong mahulog",
          detail: "Likayi ang bildo nga bintana, taas nga kabinet, pader, ug poste sa kuryente. Kung naa sa sulod, hulata nga mohunong ang linog sa dili pa mogawas."
        },
        {
          title: "Human sa linog: gawas og tarong ug paabota ang aftershock",
          detail: "Susiha kung naay nasamdan, patya ang gas/kuryente kung nadaot, gamita ang hagdanan (ayaw elevator), ug paminaw sa pahibalo sa tsunami kung duol sa dagat."
        },
        {
          title: "Bagyo: pangandam sa dili pa mokusog ang hangin ug ulan",
          detail: "Sunda ang PAGASA ug Barangay Labogon. I-charge ang cellphone ug power bank, pagtigom og 3 ka adlaw nga tubig ug pagkaon, ug ihigot ang luag nga atop o gamit."
        },
        {
          title: "Pabilin sa sulod o balhin dayon kung isugo",
          detail: "Palayo sa bintana samtang kusog ang hangin. Kung nagpuyo duol sa suba, sapa, o dagat, balhin dayon kung mopahibalo ang barangay."
        },
        {
          title: "Gamita ang text ug paminaw sa opisyal nga pahibalo",
          detail: "Pagpadala og mubo nga text aron dili mapuno ang linya sa tawag ug sunda ang opisyal nga impormasyon."
        }
      ]
    },
    donts: {
      en: [
        "Do NOT run outside or stand in doorways while an earthquake is actively shaking — falling glass and walls cause the most injuries.",
        "Do NOT use elevators after an earthquake.",
        "Do NOT stay in coastal or riverbank homes after a mandatory evacuation order."
      ],
      fil: [
        "HUWAG tumakbo palabas o tumayo sa pintuan habang umaalog ang lindol — ang bumabagsak na salamin at pader ang madalas makasakit.",
        "HUWAG gumamit ng elevator pagkatapos ng lindol.",
        "HUWAG magpaiwan sa tabi ng dagat o ilog kapag may utos nang lumikas."
      ],
      ceb: [
        "AYAW pagdagan sa gawas o pagtindog sa pultahan samtang nag-uyog ang linog — ang mahulog nga bildo ug pader kasagaran makasamad.",
        "AYAW paggamit og elevator human sa linog.",
        "AYAW pabilin sa daplin sa dagat o suba kung adunay mando sa pagbalhin."
      ]
    }
  },
  {
    id: "other",
    icon: "⚠️",
    keywords: ["gas", "lpg", "leak", "tagas", "electric", "kuryente", "wire", "kable", "missing", "nawawala", "nawala", "child", "bata", "prank", "other", "iba", "uban"],
    contactIds: ["nat-911", "labogon-ert-globe-1", "cdrrmo-tel", "cdrrmo-smart"],
    steps: {
      en: [
        {
          title: "Check immediate safety and move people clear",
          detail: "Guide everyone away from the hazard first. If anyone is injured or in danger, call Labogon DRRMO or Bantay Mandaue immediately."
        },
        {
          title: "Report with clear, complete information",
          detail: "Give the dispatcher your name, exact sitio/purok and landmark, what happened, and how many people need help. Stay on the line until told to hang up."
        },
        {
          title: "If you smell an LPG or gas leak",
          detail: "Open doors and windows wide, shut off the LPG regulator valve if safe, leave the building immediately, and call BFP from outside."
        },
        {
          title: "If you encounter downed power lines",
          detail: "Keep everyone at least 10 meters away, treat every fallen wire as live, warn passersby, and call BFP and the electric utility."
        },
        {
          title: "If a child or family member is missing",
          detail: "Write down what they were wearing, their photo, and where they were last seen, then report immediately to Barangay Labogon Hall and Mandaue City Police."
        }
      ],
      fil: [
        {
          title: "Tiyakin ang kaligtasan at ilayo ang mga tao",
          detail: "Ilayo muna ang lahat sa panganib. Kung may nasaktan o nanganganib ang buhay, tumawag agad sa Labogon DRRMO o Bantay Mandaue."
        },
        {
          title: "Mag-report nang may malinaw na impormasyon",
          detail: "Ibigay ang pangalan mo, eksaktong sitio/purok at palatandaan, nangyari, at ilan ang nangangailangan ng tulong. Manatili sa linya hanggang sabihing ibaba na."
        },
        {
          title: "Kung may amoy ng tagas ng LPG o gas",
          detail: "Buksan ang mga pinto at bintana, isara ang balbula ng tangke kung ligtas, lumabas agad ng bahay, at tumawag sa BFP mula sa labas."
        },
        {
          title: "Kung may nakalaylay o bumagsak na kable ng kuryente",
          detail: "Lumayo nang hindi bababa sa 10 metro, ituring na may kuryente ang bawat kable, balaan ang dumadaan, at tumawag sa BFP at kompanya ng kuryente."
        },
        {
          title: "Kung may nawawalang bata o miyembro ng pamilya",
          detail: "Tandaan ang suot nila, litrato, at huling lugar na pinuntahan, at mag-report agad sa Barangay Labogon Hall at pulisya."
        }
      ],
      ceb: [
        {
          title: "Siguroha ang kaluwasan ug palayoa ang mga tawo",
          detail: "Ipalayo una ang tanan sa peligro. Kung naay nasamdan o nameligro ang kinabuhi, tawag dayon sa Labogon DRRMO o Bantay Mandaue."
        },
        {
          title: "I-report gamit ang klaro nga impormasyon",
          detail: "Ihatag ang imong ngalan, eksaktong sitio/purok ug timaan, nahitabo, ug pila ang nanginahanglan og tabang. Pabilin sa linya hangtod isulti nga ibutang na."
        },
        {
          title: "Kung makasimhot ka og tagas sa LPG o gas",
          detail: "Ablihi ang mga pultahan ug bintana, sirad-i ang balbula sa tangke kung luwas, gawas dayon sa balay, ug tawag sa BFP gikan sa gawas."
        },
        {
          title: "Kung naay nahulog nga kable sa kuryente",
          detail: "Palayo og labing menos 10 metros, hunahunaa nga naay kuryente ang matag kable, pasidan-i ang moagi, ug tawag sa BFP ug kompanya sa kuryente."
        },
        {
          title: "Kung naay nawala nga bata o miyembro sa pamilya",
          detail: "Isulat unsay ilang gisul-ob, hulagway, ug asa sila katapusang nakita, dayon i-report sa Barangay Labogon Hall ug pulis."
        }
      ]
    },
    donts: {
      en: [
        "Do NOT flip light switches, unplug appliances, light matches, or use phones inside a room that smells of gas — a tiny spark can ignite it.",
        "Do NOT touch or try to move a fallen power line with wood, metal, or any object.",
        "Do NOT make prank or test calls to emergency hotlines — they delay real rescue."
      ],
      fil: [
        "HUWAG pumindot ng switch ng ilaw, magbunot ng saksakan, magsindì ng posporo, o gumamit ng cellphone sa loob ng lugar na amoy gas — maaaring magdulot ng pagsabog ang maliit na kislap.",
        "HUWAG hawakan o subukang alisin ang bumagsak na kable ng kuryente gamit ang kahoy, bakal, o anumang bagay.",
        "HUWAG gumawa ng prank call o test call sa mga emergency hotline."
      ],
      ceb: [
        "AYAW pagpislit og switch sa suga, pag-ibot sa saksakan, pagdagkot og posporo, o paggamit og cellphone sa sulod sa lugar nga baho og gas — bisan gamay nga spark mahimong mosilaob.",
        "AYAW hikapa o sulayi og balhin ang nahulog nga kable sa kuryente gamit ang kahoy, puthaw, o bisan unsa.",
        "AYAW paghimo og prank call o test call sa mga emergency hotline."
      ]
    }
  }
];

export const GO_BAG_ITEMS: GoBagItem[] = [
  {
    id: "water",
    label: {
      en: "Bottled drinking water (at least 3 days supply per person)",
      fil: "Tubig na maiinom (pang-3 araw bawat tao)",
      ceb: "Mainom nga tubig (pang-3 ka adlaw kada tawo)"
    }
  },
  {
    id: "food",
    label: {
      en: "Ready-to-eat canned or dry food and a manual can opener",
      fil: "De-lata o tuyong pagkain na handang kainin at pambukas",
      ceb: "De-lata o uga nga pagkaon ug abrihanan sa lata"
    }
  },
  {
    id: "meds",
    label: {
      en: "Personal medicines, maintenance pills, and small first-aid kit",
      fil: "Mga gamot (maintenance), alcohol, benda, at maliit na first-aid kit",
      ceb: "Personal nga tambal, alcohol, benda, ug gamay nga first-aid kit"
    }
  },
  {
    id: "docs",
    label: {
      en: "Photocopies of IDs and important papers in a waterproof pouch",
      fil: "Kopya ng mga ID at dokumento sa waterproof na plastik",
      ceb: "Kopya sa mga ID ug dokumento sulod sa waterproof nga plastik"
    }
  },
  {
    id: "flashlight",
    label: {
      en: "Flashlight or headlamp with extra batteries",
      fil: "Flashlight at mga ekstrang baterya",
      ceb: "Flashlight ug ekstra nga baterya"
    }
  },
  {
    id: "powerbank",
    label: {
      en: "Charged power bank, phone cable, and written emergency numbers",
      fil: "Charged na power bank, cable, at nakasulat na mga emergency number",
      ceb: "Charged nga power bank, cable, ug sinulat nga mga emergency number"
    }
  },
  {
    id: "whistle",
    label: {
      en: "Whistle to signal rescuers if trapped",
      fil: "Pito (whistle) para makapagbigay ng senyas sa mga rescuer",
      ceb: "Pito (whistle) aron makahatag og signal sa mga rescuer"
    }
  },
  {
    id: "clothes",
    label: {
      en: "Extra dry clothes, raincoat/poncho, and sturdy slippers or shoes",
      fil: "Ekstrang tuyong damit, kapote, at matibay na tsinelas o sapatos",
      ceb: "Ekstra nga uga nga sinina, kapote, ug lig-on nga tsinelas o sapatos"
    }
  },
  {
    id: "cash",
    label: {
      en: "Small bills and coins (ATMs may be offline during power outages)",
      fil: "Maliit na perang papel at barya (kung sakaling walang ATM o kuryente)",
      ceb: "Gamay nga kwarta ug sensilyo (kung walay kuryente o ATM)"
    }
  },
  {
    id: "hygiene",
    label: {
      en: "Face masks, alcohol/sanitizer, soap, and sanitary supplies",
      fil: "Face mask, alcohol, sabon, at mga gamit pangkalinisan",
      ceb: "Face mask, alcohol, sabon, ug mga gamit sa panglimpyo"
    }
  }
];

export const FIRST_AID_CARDS: FirstAidCard[] = [
  {
    id: "bleeding",
    icon: "🩹",
    title: {
      en: "Bleeding",
      fil: "Pagdurugo",
      ceb: "Pagdugo"
    },
    steps: {
      en: [
        "Put on clean gloves or protect your hands with a clean cloth if available.",
        "Press firmly and steadily on the wound using clean cloth or gauze.",
        "Do not lift the cloth if blood soaks through — place another clean layer on top and keep pressing.",
        "Call for medical help right away if bleeding is heavy or does not slow down."
      ],
      fil: [
        "Magsuot ng malinis na guwantes o gumamit ng malinis na tela sa kamay kung mayroon.",
        "Diinan nang mahigpit at tuloy-tuloy ang sugat gamit ang malinis na tela o gasa.",
        "Huwag tanggalin ang unang tela kung tumagos ang dugo — patungan lang ng isa pang malinis na tela.",
        "Tumawag agad ng tulong medikal kung malakas o hindi humihinto ang pagdurugo."
      ],
      ceb: [
        "Pagsul-ob og limpyo nga gwantes o panalipdi ang kamot og limpyo nga panapton kung naa.",
        "Pislita og lig-on ug walay hunong ang samad gamit ang limpyo nga panapton o gasa.",
        "Ayaw kuhaa ang unang panapton kung molapos ang dugo — butangi lang og laing limpyo sa ibabaw.",
        "Tawag dayon og tabang medikal kung grabe o dili mohunong ang pagdugo."
      ]
    }
  },
  {
    id: "burns",
    icon: "🔥",
    title: {
      en: "Burns",
      fil: "Paso",
      ceb: "Paso"
    },
    steps: {
      en: [
        "Move the person away from heat, flame, or hot liquid safely.",
        "Cool the burn under cool (not ice-cold) running water for 10 to 20 minutes.",
        "Do not apply butter, toothpaste, oil, or ice, and do not pop blisters.",
        "Cover loosely with a clean, non-fluffy cloth or plastic wrap and seek medical care for large or deep burns."
      ],
      fil: [
        "Ilayo nang ligtas ang tao sa apoy, init, o mainit na likido.",
        "Palamigin ang paso sa malamig (hindi nagyeyelo) na umaagos na tubig nang 10 hanggang 20 minuto.",
        "Huwag pahiran ng mantika, toothpaste, butter, o yelo, at huwag putukin ang mga paltos.",
        "Takpan nang maluwag ng malinis na tela at magpatingin sa doktor kung malaki o malalim ang paso."
      ],
      ceb: [
        "Ipalayo sa luwas nga paagi ang tawo gikan sa kalayo o init nga likido.",
        "Pabugnawa ang paso ilawom sa bugnaw (dili yelo) nga nagdagayday nga tubig sulod sa 10–20 ka minuto.",
        "Ayaw butangi og toothpaste, mantika, butter, o yelo, ug ayaw tusloka ang mga luto (blister).",
        "Tabuni og luag gamit ang limpyo nga panapton ug adto sa doktor kung dako o lawom ang paso."
      ]
    }
  },
  {
    id: "choking",
    icon: "😮‍💨",
    title: {
      en: "Choking",
      fil: "Pagkabulon",
      ceb: "Pagkatuk-an"
    },
    steps: {
      en: [
        "Ask \"Are you choking?\" — if they can cough forcefully, encourage them to keep coughing.",
        "If they cannot breathe, speak, or cough, call for medical help immediately.",
        "Give up to 5 firm back blows between the shoulder blades, followed by 5 inward-and-upward abdominal thrusts if trained.",
        "If the person becomes unconscious, lower them safely to the floor and call emergency responders."
      ],
      fil: [
        "Tanungin kung nabubulunan siya — kung nakakaubo nang malakas, hikayating umubo.",
        "Kung hindi na makahinga, makapagsalita, o makaubo, tumawag agad ng tulong medikal.",
        "Magbigay ng hanggang 5 matatag na tapik sa pagitan ng mga balikat, kasunod ng 5 abdominal thrust kung marunong.",
        "Kung mawalan ng malay ang tao, ihiga nang maingat sa sahig at tumawag ng rescue."
      ],
      ceb: [
        "Pangutana kung natuk-an ba siya — kung kusog pa ang ubo, dasiga nga ipadayon ang pag-ubo.",
        "Kung dili na makaginhawa, makasulti, o makaubo, tawag dayon og tabang medikal.",
        "Paghatag og hangtod 5 ka lig-on nga hapak sa tunga sa abaga, dayon 5 ka abdominal thrust kung kamao.",
        "Kung mawad-an og panimuot, ipahigda og tarong sa salog ug tawag og rescue."
      ]
    }
  },
  {
    id: "fainting",
    icon: "💫",
    title: {
      en: "Fainting",
      fil: "Pagkahimatay",
      ceb: "Pagkalipong / Pagkuyap"
    },
    steps: {
      en: [
        "Help the person lie flat on their back in a shaded, airy spot and loosen tight collars.",
        "Check that they are breathing normally; if safe, slightly raise their legs about 30 cm.",
        "Do not give food or water while drowsy or unresponsive.",
        "If they do not wake up within 1 minute or have chest pain or injury, call medical help right away."
      ],
      fil: [
        "Ihiga nang patihaya ang tao sa malamig at mahangin na lugar at luwagan ang masikip na kwelyo.",
        "Tiyaking normal ang paghinga; kung ligtas, iangat nang bahagya ang mga binti.",
        "Huwag magbigay ng pagkain o tubig habang hilo pa o walang malay.",
        "Kung hindi magising sa loob ng 1 minuto o may pananakit ng dibdib, tumawag agad ng tulong medikal."
      ],
      ceb: [
        "Ipahigda ang tawo sa landong ug presko nga lugar ug luagi ang hugot nga kwelyo.",
        "Susiha kung normal ang pagginhawa; kung luwas, ipataas og gamay ang mga tiil.",
        "Ayaw pakan-a o paimna samtang nalipong pa o walay panimuot.",
        "Kung dili makamata sulod sa 1 ka minuto o magsakit ang dughan, tawag dayon og tabang medikal."
      ]
    }
  }
];
