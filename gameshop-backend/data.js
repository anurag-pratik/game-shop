import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Anurag Pratik",
      email: "anurag@gameshop.com",
      password: bcrypt.hashSync("Anurag1234"),
      isAdmin: true,
    },
    {
      name: "Aniket Sharma",
      email: "aniket@gameshop.com",
      password: bcrypt.hashSync("Aniket1234"),
      isAdmin: false,
    },
    {
      name: "Anurag Pratik",
      email: "test@gameshop.com",
      password: bcrypt.hashSync("test1234"),
      isAdmin: false,
    },
  ],
  games: [
    {
      name: "VALORANT",
      slug: "valorant",
      category: "FPS",
      image:
        "https://cdn.vox-cdn.com/thumbor/wemL47PtwE0Pps3K2PEwdfZuCrM=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19755279/VALORANT_Jett_Red.jpg",
      price: "500",
      developer: "Riot Games",
      rating: 4.5,
      ratingCount: 9650,
      downloadCount: 92134,
      description:
        "Valorant is a tactical shooting game involving two teams with 5 players in each team. Every player can sign in and play remotely from anywhere in the world. Every game has 25 rounds and the team that wins 13 of them first wins the game. Players can choose their in-game characters called agents at the start of the game.",
    },
    {
      name: "RAINBOW SIX SIEGE",
      slug: "rainbow-six-siege",
      category: "FPS",
      image:
        "https://store-images.s-microsoft.com/image/apps.52624.65170969132831011.1a6969c2-c209-441f-86d0-c320c947d7bb.c7a3c118-f137-4a09-a409-8a26120315a0",
      price: "500",
      developer: "Ubisoft",
      rating: 4.4,
      ratingCount: 8760,
      downloadCount: 69324,
      description:
        " Rainbow Six Siege is a high-precision, tactical shooter that prioritises careful planning teamwork and finely tuned tactical play.",
    },
    {
      name: "GHOST RECON WILDLANDS",
      slug: "ghost-recon-wildlands",
      category: "Tactical Shooter",
      image:
        "https://upload.wikimedia.org/wikipedia/en/b/b9/Ghost_Recon_Wildlands_cover_art.jpg",
      price: "1000",
      developer: "Ubisoft",
      rating: 4.1,
      ratingCount: 2654,
      downloadCount: 12003,
      description:
        "Tom Clancy's Ghost Recon Wildlands is a tactical cover based shooter game set in an open world environment and played from a third-person perspective with an optional first person view for gun aiming.",
    },
    {
      name: "ROAD RASH",
      slug: "road-rash",
      category: "Racing",
      image:
        "http://2.bp.blogspot.com/_CtzMsvWhg4U/SDvEKBQ4XfI/AAAAAAAAAV8/gOpbfA_qaoM/s320/16hkv8o.jpg",
      price: "250",
      developer: "Electronic Arts",
      rating: 4.5,
      ratingCount: 250,
      downloadCount: 426,
      description:
        "Road Rash is a 1991 racing and vehicular combat video game originally developed and published by Electronic Arts (EA) for the Sega Genesis. It was subsequently ported to a variety of contemporary systems by differing companies. The game is centered around a series of motorcycle races throughout California that the player must win to advance to higher-difficulty races, while engaging in unarmed and armed combat to hinder the other racers.",
    },
    {
      name: "CRICKET 07",
      slug: "cricket-07",
      category: "Sports",
      image: "https://upload.wikimedia.org/wikipedia/en/9/94/Cricket07.png",
      price: "540",
      developer: "Electronic Arts",
      rating: 4.8,
      ratingCount: 2065,
      downloadCount: 53102,
      description:
        "Cricket 07 is a 2006 cricket simulation computer game developed by EA Canada and HB Studios and published by EA Sports. It is available for Microsoft Windows and PlayStation 2. The game was released on 26 November 2006 in Europe and in Australia on 14 November 2006.",
    },
    {
      name: "GTA VICE CITY",
      slug: "gta-vice-city",
      category: "Action",
      image:
        "https://upload.wikimedia.org/wikipedia/en/c/ce/Vice-city-cover.jpg",
      price: "750",
      developer: "Rockstar Games",
      rating: 4.9,
      ratingCount: 32096,
      downloadCount: 94539,
      description:
        "Grand Theft Auto: Vice City is a 2002 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the fourth main entry in the Grand Theft Auto series, following 2001's Grand Theft Auto III, and the sixth instalment overall.",
    },
    {
      name: "PROJECT IGI",
      slug: "project-igi",
      category: "FPS",
      image:
        "https://upload.wikimedia.org/wikipedia/en/f/fe/Project_I.G.I._I%27m_Going_In_%28cover%29.jpg",
      price: "430",
      developer: "Innerloop Studios",
      rating: 4.0,
      ratingCount: 2754,
      downloadCount: 86452,
      description:
        "Project I.G.I. is a tactical first-person shooter video game. It was developed by Innerloop Studios and released in December 2000 by Eidos Interactive. The game received mixed reviews due to shortcomings including a poorly programmed A.I., lack of a mid-game save option, and the lack of multiplayer features.",
    },
    {
      name: "NFS MOST WANTED",
      slug: "nfs-most-wanted",
      category: "Racing",
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/8e/Need_for_Speed_Most_Wanted_Box_Art.jpg",
      price: "250",
      developer: "Electronic Arts",
      rating: 4.45,
      ratingCount: 7532,
      downloadCount: 531285,
      description:
        "Need for Speed: Most Wanted is a 2005 open-world racing video game, and the ninth installment in the Need for Speed series. Developed by EA Canada and EA Black Box and published by Electronic Arts, it was released on November 11, 2005, for PlayStation 2, Xbox, GameCube, Nintendo DS, Microsoft Windows, Game Boy Advance and Xbox 360. An additional version, Need for Speed: Most Wanted 5-1-0, was released in the same year for PlayStation Portable. The game focuses on street racing-oriented gameplay involving a selection of events and racing circuits found within the fictional city of Rockport, with the game's main story involving players taking on the role of a street racer who must compete against 15 of the city's most elite street racers to become the most wanted racer of the group, in the process seeking revenge against one of the groups who took their car and developing a feud with the city's police department.",
    },
    {
      name: "PRINCE OF PERSIA - THE TWO THRONES",
      slug: "pop-the-two-thrones",
      category: "Action-adventure",
      image:
        "https://upload.wikimedia.org/wikipedia/en/f/f8/Prince_of_Persia_-_The_Two_Thrones_%28game_box_art%29.jpg",
      price: "750",
      developer: "Ubisoft",
      rating: 4.65,
      ratingCount: 6253,
      downloadCount: 972376,
      description:
        "Prince of Persia: The Two Thrones is a third-person action-adventure puzzle-platforming video game developed by Ubisoft Montreal and released in North America December 2005 across most major platforms. It was published by Ubisoft in western territories and Sony Computer Entertainment in Japan.[2] Prince of Persia: The Two Thrones is, chronologically, the third game in The Sands of Time Trilogy. Canonically, The Two Thrones concludes the story that began in Battles of Prince of Persia and Prince of Persia: Warrior Within. ",
    },
    {
      name: "MAX PAYNE 2",
      slug: "max-payne-2",
      category: "Third-person shooter",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Max_Payne_2.jpg/220px-Max_Payne_2.jpg",
      price: "300",
      developer: "Rockstar Games",
      rating: 4.15,
      ratingCount: 2686,
      downloadCount: 212412,
      description:
        "Max Payne 2: The Fall of Max Payne is a third-person shooter video game developed by Remedy Entertainment and published by Rockstar Games. It is the sequel to 2001's Max Payne and the second game in the Max Payne series. Set two years after the events of the first game, the sequel finds Max Payne working again as a detective for the New York City Police Department (NYPD), while sturggling with nightmares about his troubled past. After being unexpectedly reunited with contract killer Mona Sax, Max must work with her to resolve a conspiracy filled with death and betrayal, which will test where his true loyalties lie.",
    },
    {
      name: "ASSASIN'S CREED 3",
      slug: "assasins-creed-3",
      category: "Action-adventure",
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/29/Assassin%27s_Creed_III_Game_Cover.jpg",
      price: "679",
      developer: "Ubisoft",
      rating: 4.62,
      ratingCount: 1274,
      downloadCount: 235823,
      description:
        "Assassin's Creed III is a 2012 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft for PlayStation 3, Xbox 360, Wii U, and Microsoft Windows. It is the fifth major installment in the Assassin's Creed series, and a direct sequel to 2011's Assassin's Creed: Revelations.",
    },
    {
      name: "COUNTER STRIKE 1.6",
      slug: "counter-strike-1-6",
      category: "FPS",
      image:
        "https://counter-strike-download.eu/wp-content/uploads/2015/03/animaatjes-counter-strike-52430.jpg",
      price: "250",
      developer: "Valve",
      rating: 4.25,
      ratingCount: 89696,
      downloadCount: 9568673,
      description:
        "Counter-Strike (also known as Half-Life: Counter-Strike or Counter-Strike 1.6)[5] is a first-person shooter game developed by Valve. It was initially developed and released as a Half-Life modification by Minh Gooseman Le and Jess Cliffe in 1999, before Le and Cliffe were hired and the game's intellectual property acquired. Counter-Strike was released by Valve for Microsoft Windows in 2000, and is the first installment in the Counter-Strike series. Several remakes and ports were released on Xbox, as well as OS X and Linux.",
    },
  ],
  links: [
    {
      slug: "valorant",
      link: "https://drive.google.com/uc?id=1z72waT6F1XM2kVk6I9N6zWyTudArTaSS&export=download",
    },
    {
      slug: "rainbow-six-siege",
      link: "https://drive.google.com/uc?id=128Gq6Na8c82mZECrCDQCELQRZYUSgaO0&export=download",
    },
    {
      slug: "ghost-recon-wildlands",
      link: "https://drive.google.com/uc?id=1gakQnfwDEHDi_Futv49mvMhBKlBb-p9y&export=download",
    },
    {
      slug: "road-rash",
      link: "https://drive.google.com/uc?id=17pIjPSyRF0rpIvTVTLWwMQ--LuOLkEst&export=download",
    },
    {
      slug: "cricket-07",
      link: "https://drive.google.com/uc?id=1gSk8Uxm6k-eMoolJbycpIBmI3iZmFdgW&export=download",
    },
    {
      slug: "gta-vice-city",
      link: "https://drive.google.com/uc?id=1CcNIO8iRMptNjGu2n9m90BEDVSBHehce&export=download",
    },
    {
      slug: "project-igi",
      link: "https://drive.google.com/uc?id=1UdNXrTSgYX1NT55Lym6MgfQqDzbffmld&export=download",
    },
    {
      slug: "nfs-most-wanted",
      link: "https://drive.google.com/uc?id=1IrDtJ3YutBxQRojRTAC3XEOJ9VGBRgfp&export=download",
    },
    {
      slug: "pop-the-two-thrones",
      link: "https://drive.google.com/uc?id=1cxcRSIL75FmVRKLFOkvB_Al70AYD9e3s&export=download",
    },
    {
      slug: "max-payne-2",
      link: "https://drive.google.com/uc?id=1fKMaSRhpQRUAESepU2JeeFFua5awd9Sp&export=download",
    },
    {
      slug: "assasins-creed-3",
      link: "https://drive.google.com/uc?id=1aCVd6YUUi49-vjHh45MdecBLwJFWIYfo&export=download",
    },
    {
      slug: "counter-strike-1-6",
      link: "https://drive.google.com/uc?id=1dqtE7GIVJ1pU73SJIPWe86jqJM6tiNDg&export=download",
    },
  ],
};

export default data;
