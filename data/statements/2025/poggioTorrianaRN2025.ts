// poggioTorrianaRN2025.ts
// Migrato automaticamente dal formato legacy

export interface ImuRateCondition {
  description: string;
  predicate: string;
}

export interface ImuRateEntry {
  label: string;
  ratePercent: number;
  categoryTypes?: string[];
  officialDescription: string;
  conditions: ImuRateCondition[];
}

export const imuRatesPoggioTorrianaRN2025: ImuRateEntry[] = [
  {
    "label": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e relative pertinenze",
    "ratePercent": 0.0004,
    "categoryTypes": [
      "A/1",
      "A/8",
      "A/9"
    ],
    "officialDescription": "Abitazione principale di categoria catastale A/1, A/8 e A/9 e lative pertinenze",
    "conditions": [
      {
        "description": "L'entità ha categoria A/1 o A/8 o A/9",
        "predicate": "['A/1','A/8','A/9'].includes(entity.category)"
      },
      {
        "description": "L'entità è un fabbricato",
        "predicate": "entity.type === 'fabbricato'"
      },
      {
        "description": "L'entità è stata indicata come abitazione principale",
        "predicate": "entity.isMainResidence === true"
      }
    ]
  },
  {
    "label": "Assimilazione all’abitazione principale dell’unità immobiliare posseduta da anziani o disabili",
    "ratePercent": 0.0004,
    "officialDescription": "Assimilazione all’abitazione principale dell’unità immobilia posseduta da anziani o disabili di cui all'art. 1, comma 741, lett. c, n. 6, della legge n. 160 del 2019",
    "conditions": [
      {
        "description": "L'entità è un fabbricato",
        "predicate": "entity.type === 'fabbricato'"
      },
      {
        "description": "L'entità è stata indicata come abitazione principale",
        "predicate": "entity.isMainResidence === true"
      }
    ]
  },
  {
    "label": "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    "ratePercent": 0.0001,
    "categoryTypes": [
      "D/10"
    ],
    "officialDescription": "Fabbricati rurali ad uso strumentale inclusa la categoria catastale D/10",
    "conditions": [
      {
        "description": "L'entità ha categoria D/10",
        "predicate": "['D/10'].includes(entity.category)"
      },
      {
        "description": "Il fabbricato è utilizzato per attività agricola",
        "predicate": "entity.isAgriculturalUse === true"
      },
      {
        "description": "Il proprietario è un coltivatore diretto o imprenditore agricolo",
        "predicate": "entity.ownerIsAgriculturalEntrepreneur === true"
      }
    ]
  },
  {
    "label": "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    "ratePercent": 0.00106,
    "categoryTypes": [
      "D"
    ],
    "officialDescription": "Fabbricati appartenenti al gruppo catastale D esclusa la categoria catastale D/10",
    "conditions": [
      {
        "description": "Condizione applicabile in base al regolamento comunale",
        "predicate": "true // Da specificare in base alle condizioni locali"
      }
    ]
  },
  {
    "label": "Terreni agricoli",
    "ratePercent": 0.00106,
    "officialDescription": "Ter ni agricoli",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Aree fabbricabili",
    "ratePercent": 0.00106,
    "officialDescription": "A e fabbricabili",
    "conditions": [
      {
        "description": "Il terreno è edificabile secondo PRG o catasto",
        "predicate": "entity.isBuildable === true"
      }
    ]
  },
  {
    "label": "Altri fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    "ratePercent": 0.00106,
    "officialDescription": "Altri fabbricati fabbricati diversi dall'abitazione principale e dai fabbricati appartenenti al gruppo catastale D",
    "conditions": [
      {
        "description": "L'entità è un fabbricato",
        "predicate": "entity.type === 'fabbricato'"
      },
      {
        "description": "L'entità è stata indicata come abitazione principale",
        "predicate": "entity.isMainResidence === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli in determinate zone",
    "ratePercent": 0,
    "officialDescription": "Ter ni ricadenti in determinate a e: A a: SEZIONE A:Foglio 5 particelle: 44 – 45 - 48 – 49 – 50 – 51 – 52 – 53 – 58 – 59 – 60 – 62 – 72 - 86 – 87 – 88 – 89 – 90 – 94 – 95 – 100 – 101 – 103 – 104 – 110 – 111 – 112 – 113 – 114 – 137 – 149 – 153 - 155 – 608 – 611 – 612 – 619 – 624 – 625 - 627 – 651 – 689 – 693 – 694 – 695 - 696 - 697 - 702 - 704 – 706 – 749 – 750 - 761 – 763 - 771 – 772",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli in determinate zone",
    "ratePercent": 0,
    "officialDescription": "Ter ni ricadenti in determinate a e: A a: SEZIONE A Foglio 12 particelle: 1–2-3-4-5-6-8-9- 11-12-14-15-16-17-18-19-21-23-24-25-26-27-29-30-31-33-36-37-41-42-43-44-45-46-47-49-52-56-57-58-60-63-65-66-67-71-72-74-76-77-78-79-81-82-83-84-85-87-88-90-91-92-94-95-96-97-98-99-100-102-103-104-105-111-112-119-120-121-123-124-127-128-129-130-131-132-135-136-137-138-148-149-152-154-155-157-160-161-162-163-164-167-168-169-171-173-174-175-176-177-179-180-183-190-191-192-195-197-198-199-201-202-203-204-206-208-211-216-217-218-219-220-221-225-226-228-",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli in determinate zone",
    "ratePercent": 0,
    "officialDescription": "Ter ni ricadenti in determinate a e: A a: SEZIONE A Foglio 12 particelle: 230-231-232-238-239-240-241-244-248-249-250-251-255-256-257-258-260-262-263-264-265-267-269-270-271-272-273-274-276-280-282-283-284-285-286-287-289-290-291-292-293-294-503-504-506-507-510-512-514-515-516-517-519-521-525-526-527-528-529-531-532-533-534-535-536-538-540-543-544-546-547-548-549-550-551-552-553-554-555-556-557-558-560-562-564-567-568-569-573-575-577-578-579-582-583-584-587-588-589-590-592-594-595-597-598-599-600-601-602-603-604-607-609-611-612-613-614-",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli in determinate zone",
    "ratePercent": 0,
    "officialDescription": "Ter ni ricadenti in determinate a e: A a: SEZIONE A Foglio 12 particelle: 615-616-617-618-626-632-636-639-641-642-643-644-645-646-648-649-650-651-652-653-654-656-657-658-659-660-661-662-663-664-665-666-667-668-669-670-674-677-679-680-681-682-685-686-687-688-689-690-692-695-696-697",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli in determinate zone",
    "ratePercent": 0,
    "officialDescription": "Ter ni ricadenti in determinate a e: A a: SEZIONE : Foglio nr. 2 particelle: 1 – 3 – 40 – 42 – 80 - 232 - 307 - 308 - 309 - 310 - 311 - 312 - 313 – 314",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli in determinate zone",
    "ratePercent": 0,
    "officialDescription": "Ter ni ricadenti in determinate a e: A a: SEZIONE : Foglio nr. 9 particelle: 1-2-3-4-5-6-7 -8-9-10-11-12-13-14-15-16-17-18-19-20-21-22-23-24-25-26-30-32-33-42-43-44-47-49-50-51-52-53-54-55-56-57-58-59-60-61-62-63-64-65-66-67-68-69-70-71-72-76-78-79-80-81-82-84-85-86-87-88-89-92-93-94-95-96-9",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  },
  {
    "label": "Terreni agricoli in determinate zone",
    "ratePercent": 0,
    "officialDescription": "Ter ni ricadenti in determinate a e: A a: SEZIONE : Foglio nr. 9 particelle: 183-184-185- 186-187-188-189-190-191-192-194-195-196-197-198-199-200-201-202-203-204-206-208-210-211-217-219- 220-222-223-227-229-232-240-241-242-243-244-245-246-250-251-252-257-258-259-260-261-262-263-264- 265-266-267-268-269-270-271-272-276-279-280-281-282-283-284-285-286-287-288-289-295-302-303-304- 305-307-308-310-312-313-314-315-316-317-318-321-322-323-324-325-326-327-328-329-332-333-334-337- 338-339-341-344-345-346-347-34",
    "conditions": [
      {
        "description": "È un terreno agricolo",
        "predicate": "entity.type === 'terreno' && entity.isAgricultural === true"
      }
    ]
  }
];
