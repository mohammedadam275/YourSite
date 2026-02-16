// ================== DARK MODE (WORKING) ==================

// Runs on every page load and applies saved mode
// ================== DARK MODE (DEFAULT = ON) ==================
(function initDarkMode() {
  const saved = localStorage.getItem("darkMode");

  // If there's no saved preference yet, default to DARK
  const isDark = saved === null ? true : saved === "true";

  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("darkMode", isDark.toString());
})();

// Toggle function (🌙 button)
function toggleDark() {
  const isDarkNow = document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", isDarkNow.toString());
}


// Called by the 🌙 button
function toggleDark() {
  const isDarkNow = document.body.classList.toggle("dark"); // toggles and returns new state
  localStorage.setItem("darkMode", isDarkNow.toString()); // save it
}

// ================== Gate ==================
const acceptedAnswers = ["carissa", "me"];

function checkAnswer() {
  const input = document.getElementById("answerInput").value.trim().toLowerCase();
  const msg = document.getElementById("gateMessage");
  if (acceptedAnswers.includes(input)) {
    window.location.href = "home.html";
  } else {
    msg.textContent = "Nice try 😌 (hint: it’s you)";
  }
}

// ================== Memory Bank ==================
function getMemories() {
  return JSON.parse(localStorage.getItem("memories") || "[]");
}
function saveMemories(arr) {
  localStorage.setItem("memories", JSON.stringify(arr));
}
function addMemory() {
  const type = document.getElementById("memoryType").value;
  const title = document.getElementById("memoryTitle").value.trim();
  const statusEl = document.getElementById("memoryStatus");
  const status = statusEl ? statusEl.value : null;
  const note = document.getElementById("memoryNote").value.trim();
  if (!title) return alert("Please add a title 🤍");

  const memories = getMemories();
  memories.push({
    id: Date.now(),
    type,
    title,
    status: (type === "movie" || type === "show" || type === "book") ? status : null,
    note
  });
  saveMemories(memories);
  document.getElementById("memoryTitle").value = "";
  if (document.getElementById("memoryNote")) document.getElementById("memoryNote").value = "";
  renderMemories();
}
function deleteMemory(id) {
  const memories = getMemories().filter(m => m.id !== id);
  saveMemories(memories);
  renderMemories();
}
function renderMemories() {
  const list = document.getElementById("memoryList");
  if (!list) return;
  const memories = getMemories();
  list.innerHTML = "";
  if (memories.length === 0) {
    list.innerHTML = "<p class='tag'>No memories yet 🤍</p>";
    return;
  }
  memories.forEach(m => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${m.title}</strong><br/>
      ${m.status ? `<span class="tag">${m.status === "want" ? "📌 Want" : "✅ Done"}</span><br/>` : ""}
      <small>${m.note || ""}</small><br/>
      <button class="ghost" onclick="deleteMemory(${m.id})">Delete</button>
    `;
    list.appendChild(div);
  });
}
document.addEventListener("DOMContentLoaded", renderMemories);

// ================== Helpers ==================
function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ================== HUGE LISTS ==================

// ---------- MOVIES (75+ each) ----------
const comfortMovies = [
"The Princess Bride","Pride & Prejudice","Little Women","About Time","Julie & Julia","The Intern","Notting Hill","10 Things I Hate About You",
"When Harry Met Sally","You’ve Got Mail","The Holiday","Midnight in Paris","Chef","Paddington","Paddington 2","Ratatouille",
"My Big Fat Greek Wedding","The Parent Trap","Mamma Mia!","La La Land","The Devil Wears Prada","Clueless","The Proposal","The Big Sick",
"Amélie","Before Sunrise","Before Sunset","Before Midnight","Fantastic Mr. Fox","Spirited Away","Howl’s Moving Castle","My Neighbor Totoro",
"Kiki’s Delivery Service","Sing Street","Brooklyn","Begin Again","Palm Springs","The Way Way Back","Hunt for the Wilderpeople","Roman Holiday",
"Moonstruck","While You Were Sleeping","Sleepless in Seattle","You’ve Got Mail","Crazy, Stupid, Love","Love, Simon","The Lunchbox",
"Little Miss Sunshine","Chef","Julie & Julia","The Peanut Butter Falcon","A Good Year","Under the Tuscan Sun","The Holiday",
"Silver Linings Playbook","The Secret Life of Walter Mitty","CODA","The Sound of Music","Mary Poppins","Groundhog Day"
];

const funMovies = [
"Knives Out","Glass Onion","Ocean’s Eleven","Ocean’s Twelve","Ocean’s Thirteen","The Nice Guys","School of Rock","Mean Girls","Easy A","Superbad",
"The Hangover","21 Jump Street","22 Jump Street","Game Night","Crazy Rich Asians","Legally Blonde","Jumanji: Welcome to the Jungle",
"Spider-Man: Into the Spider-Verse","Guardians of the Galaxy","Thor: Ragnarok","Back to the Future","Back to the Future II","Catch Me If You Can",
"The Mask","The Incredibles","Toy Story","Toy Story 2","Toy Story 3","Shrek","Shrek 2","Hot Fuzz","Scott Pilgrim vs. the World",
"The Lego Movie","Zombieland","Deadpool","Pitch Perfect","Ferris Bueller’s Day Off","Step Brothers","The Other Guys","Rush Hour","Rush Hour 2",
"Kingsman","Men in Black","Men in Black II","Men in Black III","The Mummy","The Mummy Returns","Pirates of the Caribbean","Pirates 2","Pirates 3",
"Night at the Museum","Night at the Museum 2","The Goonies","Ghostbusters","Ghostbusters 2","Shaun of the Dead"
];

const interestingMovies = [
"Parasite","Arrival","Her","Ex Machina","Eternal Sunshine of the Spotless Mind","Everything Everywhere All at Once","The Social Network",
"The Truman Show","Black Swan","Whiplash","Gone Girl","Prisoners","Nightcrawler","The Prestige","Memento","Inception","Interstellar",
"Blade Runner 2049","The Matrix","No Country for Old Men","There Will Be Blood","The Lighthouse","The Lobster","The Favourite",
"A Beautiful Mind","Good Will Hunting","Dead Poets Society","The Florida Project","Call Me by Your Name","Lost in Translation","Moonlight",
"Drive","The Pianist","Shutter Island","Fight Club","Se7en","Children of Men","The Revenant","Donnie Darko","Coherence",
"Synecdoche, New York","The Theory of Everything","The Imitation Game","Atonement","Blue Valentine","Manchester by the Sea","Hereditary",
"The Witch","The Sixth Sense","The Others","American Beauty","Requiem for a Dream","The Master","Birdman","The Father","The Lives of Others",
"Pan’s Labyrinth","Oldboy","City of God","The Grand Budapest Hotel"
];

// ---------- SHOWS (75+ each combined categories; each list ~50-70) ----------
const comfortShows = [
"Friends","The Office","Parks and Recreation","Brooklyn Nine-Nine","New Girl","How I Met Your Mother","Gilmore Girls","Modern Family",
"Schitt’s Creek","Ted Lasso","The Good Place","Jane the Virgin","Emily in Paris","Heartstopper","Queer Eye","Community","Derry Girls",
"Kim’s Convenience","Downton Abbey","Bridgerton","Sweet Magnolias","Virgin River","Atypical","Young Sheldon","The Big Bang Theory",
"Scrubs","Bluey","Hilda","Anne with an E","Full House","Fuller House","One Day at a Time","The Marvelous Mrs. Maisel","Never Have I Ever",
"Sex Education","Gossip Girl","The OC","Friday Night Lights","Bob’s Burgers","The Great British Bake Off","Avatar: The Last Airbender",
"How to Train Your Dragon: RTTE","The Good Witch","New Amsterdam","Parenthood","Hart of Dixie","Jane the Virgin","Fleabag"
];

const funShows = [
"Stranger Things","Wednesday","The Mandalorian","The Boys","Loki","The Umbrella Academy","Money Heist","Cobra Kai","The Witcher","Outer Banks",
"Peaky Blinders","Arcane","Attack on Titan","One Piece (Live Action)","The Last of Us","Supernatural","Prison Break","24","The Night Agent",
"Reacher","The Flash","Arrow","Daredevil","The Punisher","Suits","White Collar","Psych","Chuck","Barry","The Bear",
"House of the Dragon","Game of Thrones","Invincible","My Hero Academia","Jujutsu Kaisen","Narcos","The Rookie","The IT Crowd","Fargo",
"The Gentlemen","The Expanse","Vikings","The Walking Dead","The Walking Dead: Daryl Dixon","The Boys: Diabolical","Gen V","Lucifer",
"Brooklyn Nine-Nine","Resident Alien"
];

const interestingShows = [
"Black Mirror","Mindhunter","Breaking Bad","Better Call Saul","True Detective","Severance","The Leftovers","Westworld","Dark","Mr. Robot",
"The Crown","Chernobyl","The Queen’s Gambit","Normal People","The Handmaid’s Tale","Station Eleven","The Night Of","Sharp Objects",
"Big Little Lies","The White Lotus","Succession","Mad Men","The Sopranos","The Wire","House of Cards","The Americans","Ozark","Black Bird",
"The Patient","The OA","Devs","The Undoing","Your Honor","The Staircase","Making a Murderer","When They See Us","The Act","Dopesick",
"The Dropout","Unbelievable","Rectify","The Killing","The Bridge","Hannibal","Rome","Boardwalk Empire","Peaky Blinders","The Bear",
"True Detective: Night Country","Tokyo Vice","The Night Manager"
];

// ---------- FOOD (75+ each) ----------
const comfortFoods = [
"Sushi rolls","California rolls","Spicy tuna roll","Salmon avocado roll","Ramen","Udon","Miso soup + rice","Teriyaki tofu bowl",
"Avocado toast","Grilled cheese + tomato soup","Mac and cheese","Cheese pizza","Margherita pizza","Veggie pizza","Pasta marinara",
"Pasta pesto","Butter noodles","Baked salmon","Salmon rice bowl","Tuna melt","Eggs and toast","Veggie omelet","Breakfast burrito",
"Bagel with cream cheese","Bagel with lox","Grilled veggie sandwich","Tomato basil soup","Clam chowder","Veggie fried rice",
"Quesadilla","Nachos with guac","Baked potato","Mashed potatoes","Rice and beans","Hummus + pita","Falafel wrap","Veggie burger",
"Fish sticks + fries","Tater tots","Pancakes","Waffles","French toast","Oatmeal with fruit","Yogurt + granola","Smoothie bowl",
"Grilled cheese + fries","Cheese quesadilla","Spinach quiche","Tomato mozzarella panini","Veggie pot pie","Mac & cheese bites",
"Cheese ravioli","Gnocchi butter sage","Creamy mushroom pasta","Baked ziti","Egg salad sandwich","Caprese sandwich","Miso ramen"
];

const freshFoods = [
"Salmon poke bowl","Tuna poke bowl","Tofu poke bowl","Grain bowl","Quinoa bowl","Mediterranean bowl","Greek salad","Caesar salad (no chicken)",
"Avocado salad","Cucumber tomato salad","Caprese salad","Veggie sushi","Seaweed salad","Miso glazed salmon","Grilled shrimp salad",
"Fish tacos","Veggie tacos","Black bean tacos","Veggie burrito bowl","Tofu stir fry","Veggie stir fry","Zucchini noodles","Soba noodle bowl",
"Rice paper rolls","Spring rolls","Edamame bowl","Chickpea salad","Lentil soup","Minestrone soup","Veggie wrap","Hummus wrap","Tofu banh mi",
"Veggie pho","Light ramen","Sashimi plate","Poke nachos","Ceviche","Acai bowl","Fruit + yogurt bowl","Green smoothie","Protein smoothie",
"Avocado rice bowl","Tomato cucumber sandwich","Kale salad","Beet salad","Arugula pear salad","Grilled halloumi salad","Niçoise (veg/fish)",
"Sushi hand rolls","Cucumber rolls","Avocado rolls","Cold noodle salad","Miso soup + sides","Tofu salad","Shrimp spring rolls"
];

const newFoods = [
"Try a new sushi spot","Try a new poke place","Order something new","Cook a Pinterest recipe","Make homemade sushi","Japanese curry",
"Thai curry","Pad thai","Vietnamese banh mi","Mediterranean mezze","Falafel plate","Shakshuka","Spanish tapas","Veggie dumplings",
"Soup dumplings (seafood)","Onigiri","Korean kimbap","Indian dal + naan","Chana masala","Dosa","Sushi bake","Poke tacos","Ceviche tostadas",
"Tofu katsu","Tempura veggies","Okonomiyaki","Korean corn cheese","Rice bowl with fried egg","Miso butter noodles","Sardines on toast",
"Smoked salmon toast","Handmade pasta","Gnocchi from scratch","Homemade ramen","Homemade pizza","Try a new café brunch",
"Try a new dessert spot","Try a new bakery","Try a farmers market meal","Try Ethiopian veg platter","Try Moroccan tagine (fish/veg)",
"Try Peruvian ceviche","Try Greek mezze night","Try tapas night at home","Try dumpling-making night","Try sushi-rolling night"
];

// ---------- ACTIVITIES (50+) ----------
// --------- ACTIVITY LISTS (NO SOCIAL MEDIA) ---------

const outLowEnergy = [
  "Short scenic walk 🌿",
  "Drive and get coffee ☕",
  "Sit by the water / park bench 🌤️",
  "Bookstore browse 📚",
  "Quick bakery stop 🥐",
  "Farmers market stroll 🥕",
  "Target stroll 🛒",
  "Sunset watch from the car 🚗🌅",
  "Easy errand + treat 🍪",
  "Library visit 📖",
  "Light window shopping 🛍️",
  "Park picnic (simple) 🧺",
  "Go get flowers 💐",
  "Sit in a cafe and read 📚☕",
  "Short beach walk 🌊",
  "Tea shop visit 🍵",
  "Smoothie run 🥤",
  "Scenic drive 🚗",
  "Go feed ducks 🦆",
  "Visit a small local shop 🏪",
  "Walk around a quiet neighborhood 🏘️",
  "Grab soup to-go 🍲",
  "Visit a garden 🌸",
  "Go sit somewhere cozy outside ☀️",
  "Quick thrift peek 👕",
  "Visit a stationery shop ✏️",
  "Browse a record store 💿",
  "Visit a plant shop 🌿",
  "Go get ice cream 🍦",
  "Sit and people-watch (peacefully) 😌"
];

const outMediumEnergy = [
  "Longer walk / trail 🌲",
  "Thrift store trip 👕",
  "Museum visit 🖼️",
  "Aquarium / zoo 🐠",
  "Cafe hopping ☕",
  "Picnic date 🧺",
  "Photo walk 📸",
  "Explore a new neighborhood 🗺️",
  "Try a new restaurant 🍽️",
  "Bookstore + reading time 📚",
  "Go to the beach 🌊",
  "Visit a botanical garden 🌿",
  "Go to a craft store 🎨",
  "Mini road trip 🚗",
  "Go to a market 🥕",
  "Walk + podcast 🎧",
  "Antique store browsing 🕰️",
  "Try a new dessert spot 🍰",
  "Window shopping downtown 🏙️",
  "Visit a pier / boardwalk 🌊",
  "Coffee + journaling outside ✍️☕",
  "Scenic overlook drive 🚗",
  "Local gallery visit 🖼️",
  "Go to a quiet park 🌳",
  "Do errands + reward yourself 🎁",
  "Try a new tea shop 🍵",
  "Walk and sketch 🎨",
  "Visit a library branch 📚",
  "Go get fresh bread 🥖",
  "Sit by the ocean/lake and read 📖"
];

const outHighEnergy = [
  "Hike 🌲",
  "Long beach walk 🌊",
  "Explore a new town 🗺️",
  "Full museum day 🖼️",
  "Bowling 🎳",
  "Arcade 🎮",
  "Mini golf ⛳",
  "Go thrifting seriously 👗",
  "Do a full shopping day 🛍️",
  "Bike ride 🚲",
  "Go to a class (yoga/art/etc) 🧘🎨",
  "Go dancing 💃",
  "Do a long scenic drive 🚗",
  "Visit multiple cafes ☕",
  "Plan a day trip 🧭",
  "Go to a beach and stay 🌊",
  "Go explore trails 🌲",
  "Photography day 📸",
  "Do a city walk 🚶",
  "Go to a market + cook after 🥕",
  "Do a full reset errand day ✅",
  "Go to a bookstore crawl 📚",
  "Visit multiple museums 🖼️",
  "Go to a park and walk for hours 🌳",
  "Explore coastal spots 🌊",
  "Go to a lookout point 🌄",
  "Do a long creative walk 🎧",
  "Visit new neighborhoods 🏘️",
  "Make a full day out plan 🗓️",
  "Go somewhere you’ve never been 🚗"
];

const inChill = [
  "Tea + book 📖🍵",
  "Candle + music 🕯️🎧",
  "Stretching 🧘",
  "Light journaling ✍️",
  "Face mask / skincare 💆",
  "Tidy one small area 🧹",
  "Organize photos 📸",
  "Warm shower + cozy clothes 🚿",
  "Make a snack plate 🍓🧀",
  "Read 10–20 pages 📚",
  "Nap 😴",
  "Watch a comfort movie 🍿",
  "Listen to an album 🎶",
  "Do a puzzle 🧩",
  "Color / draw 🎨",
  "Write letters ✉️",
  "Light cleaning 🧽",
  "Make tea or matcha 🍵",
  "Plan tomorrow lightly 📅",
  "Meditate 🧠",
  "Breathing exercises 🌬️",
  "Organize a drawer 🗂️",
  "Sort clothes 👕",
  "Fold laundry 🧺",
  "Read poetry 📖",
  "Make a cozy corner 🛋️",
  "Do gentle yoga 🧘",
  "Watch a nature documentary 🌿",
  "Write thoughts down ✍️",
  "Rest intentionally 😌"
];

const inProductive = [
  "Full room reset 🧹",
  "Plan the week 📅",
  "Meal plan 🍽️",
  "Clean closet 👚",
  "Organize desk 🖥️",
  "Inbox zero (email) 📧",
  "Declutter a shelf 📚",
  "Make to-do list 📝",
  "Sort files 🗂️",
  "Deep clean one area 🧽",
  "Prep outfits 👗",
  "Grocery list 🛒",
  "Budget review 💰",
  "Print photos 📸",
  "Scrapbook 🖼️",
  "Organize books 📚",
  "Clean makeup / skincare 🧴",
  "Plan trips 🧭",
  "Clean phone storage 📱",
  "Backup photos 💾",
  "Reset calendar 📆",
  "Reorganize kitchen 🍳",
  "Label storage 📦",
  "Wash bedding 🛏️",
  "Clean shoes 👟",
  "Reorganize bag 🎒",
  "Tidy workspace 🖊️",
  "Create routines 📋",
  "Write goals 🎯",
  "Update planner 📓"
];

const inFun = [
  "Bake cookies 🍪",
  "Bake bread 🍞",
  "Try a new recipe 🍳",
  "Make a playlist 🎶",
  "Paint 🎨",
  "Draw ✏️",
  "Craft project ✂️",
  "Scrapbook 📸",
  "Watch a movie 🍿",
  "Start a new show 📺",
  "Board game 🎲",
  "Card game 🃏",
  "Puzzle 🧩",
  "DIY spa night 💅",
  "Dance break 💃",
  "Rearrange room 🛋️",
  "Try latte art ☕",
  "Make a vision board 🖼️",
  "Write stories ✍️",
  "Try calligraphy ✒️",
  "Make candles 🕯️",
  "Origami 🦢",
  "Learn a recipe 🥘",
  "Make a photo album 📷",
  "Do a themed movie night 🎬",
  "Build a playlist by mood 🎧",
  "Try a new tea ☕",
  "Decorate something ✨",
  "Make homemade pizza 🍕",
  "Cook together 🍳"
];


// ---------- BOOKS (75+ total across pools) ----------
const fictionBooks = {
  romance: [
"Pride and Prejudice","Me Before You","The Notebook","Normal People","Love & Other Words","It Ends With Us","It Starts With Us",
"Outlander","The Time Traveler’s Wife","The Hating Game","Beach Read","People We Meet on Vacation","Book Lovers","The Fault in Our Stars",
"One Day","The Light We Lost","Call Me by Your Name","Red, White & Royal Blue","The Seven Husbands of Evelyn Hugo","The Rosie Project",
"Eleanor Oliphant Is Completely Fine","The Song of Achilles","The Night Circus","A Court of Thorns and Roses","Twilight","The Bridges of Madison County"
  ],
  fantasy: [
"Harry Potter","The Hobbit","The Lord of the Rings","The Name of the Wind","Mistborn","Dune","The Night Circus","The Golden Compass",
"Eragon","The Witcher","The Wheel of Time","The Stormlight Archive","The Hunger Games","Divergent","The Maze Runner","Percy Jackson",
"American Gods","Good Omens","Neverwhere","The Magicians","The Shadow and Bone","The Priory of the Orange Tree","Circe","The Atlas Six"
  ],
  mystery: [
"Gone Girl","The Girl with the Dragon Tattoo","Big Little Lies","The Da Vinci Code","The Silent Patient","The Girl on the Train",
"Shutter Island","The Reversal","In the Woods","The Shadowhunter","And Then There Were None","The Maltese Falcon","The Name of the Rose",
"Rebecca","The Woman in White","The Night Manager","The Talented Mr. Ripley","Sharp Objects","The Dry","The Rehearsal"
  ],
  literary: [
"Little Women","The Great Gatsby","The Catcher in the Rye","The Alchemist","Atonement","The Book Thief","East of Eden","To Kill a Mockingbird",
"1984","Brave New World","The Road","The Kite Runner","Life of Pi","The Goldfinch","The Handmaid’s Tale","Never Let Me Go",
"The Old Man and the Sea","Of Mice and Men","Beloved","The Color Purple","The Bell Jar","The Stranger","The Sun Also Rises"
  ]
};

const nonfictionBooks = {
  selfhelp: [
"Atomic Habits","The Power of Now","Deep Work","Think Like a Monk","The Subtle Art of Not Giving a F*ck","Man’s Search for Meaning",
"Grit","The 7 Habits of Highly Effective People","How to Win Friends & Influence People","Mindset","Essentialism","The Four Agreements",
"Digital Minimalism","The Mountain Is You","The Psychology of Money","Can’t Hurt Me","Make Your Bed","Ikigai","The Comfort Book","The Art of War"
  ],
  history: [
"Sapiens","Educated","Becoming","Unbroken","The Diary of a Young Girl","The Wright Brothers","Team of Rivals","The Rise and Fall of the Third Reich",
"Guns, Germs, and Steel","The Silk Roads","SPQR","The Crusades","The Cold War","The Romanovs","The Tudors","The Pioneers","The Immortal Life of Henrietta Lacks",
"Into Thin Air","The Splendid and the Vile","The Gulag Archipelago"
  ]
};

// ================== PICKERS ==================

let lastPick = null;
let lastPickType = null;

// ---- Movie / Show ----
function decideMovie() {
  const brain = document.getElementById("movieBrain").value;
  const watchType = document.getElementById("watchType").value;
  const genre = document.getElementById("genreMood").value;

  let pool;
  if (watchType === "movie") {
    if (genre === "comfort") pool = comfortMovies;
    else if (genre === "fun") pool = funMovies;
    else pool = interestingMovies;
    if (brain === "off") pool = comfortMovies;
  } else {
    if (genre === "comfort") pool = comfortShows;
    else if (genre === "fun") pool = funShows;
    else pool = interestingShows;
    if (brain === "off") pool = comfortShows;
  }

  const pick = randomPick(pool);
  lastPick = pick;
  lastPickType = watchType;

  document.getElementById("movieResult").textContent =
    (watchType === "movie" ? "You should watch: " : "You should start: ") + pick;

  const saveActions = document.getElementById("saveActions");
  if (saveActions) saveActions.style.display = "block";
}

function savePick(status) {
  if (!lastPick || !lastPickType) return;
  const memories = getMemories();
  if (memories.some(m => m.type === lastPickType && m.title === lastPick)) {
    alert("Already in your Memory Bank 🤍");
    return;
  }
  memories.push({
    id: Date.now(),
    type: lastPickType,
    title: lastPick,
    status: status,
    note: ""
  });
  saveMemories(memories);
  alert("Saved 🤍");
}

// ---- Food ----
function decideFood() {
  const energyEl = document.getElementById("foodEnergy"); // low / medium / high
  const vibeEl = document.getElementById("foodVibe");     // comfort / fresh / new
  const outEl = document.getElementById("foodResult");

  if (!energyEl || !vibeEl || !outEl) {
    console.error("Food IDs missing: foodEnergy, foodVibe, foodResult");
    return;
  }

  const energy = energyEl.value;
  const vibe = vibeEl.value;

  // 1) Pick pool strictly by what she wants
  let pool;
  if (vibe === "comfort") {
    pool = comfortFoods;
  } else if (vibe === "fresh") {
    pool = freshFoods;
  } else {
    pool = newFoods; // "something new"
  }

  // 2) Energy influence (only nudges, no location logic)
  // If she's low energy, we bias to comfort regardless of vibe
  if (energy === "low") {
    pool = comfortFoods;
  }

  // 3) Pick and display
  const pick = pool[Math.floor(Math.random() * pool.length)];
  outEl.textContent = "You should have: " + pick;
}


// ---- Activity ----
function decideActivity() {
  const energyEl = document.getElementById("actEnergy");   // low / medium / high
  const placeEl = document.getElementById("actPlace");     // in / out
  const outEl = document.getElementById("activityResult");

  if (!energyEl || !placeEl || !outEl) {
    console.error("Activity IDs missing: actEnergy, actPlace, activityResult");
    return;
  }

  const energy = energyEl.value;
  const place = placeEl.value;

  let pool = [];

  // Respect location FIRST
  if (place === "out") {
    // Going out: energy controls intensity
    if (energy === "low") {
      pool = outLowEnergy;        // easy, low-effort outings
    } else if (energy === "medium") {
      pool = outMediumEnergy;     // moderate outings
    } else {
      pool = outHighEnergy;       // bigger adventures
    }
  } else {
    // Staying in: energy controls how demanding it is
    if (energy === "low") {
      pool = inChill;             // cozy, restful
    } else if (energy === "medium") {
      pool = inFun;               // fun but not exhausting
    } else {
      pool = inProductive;        // higher-effort at-home stuff
    }
  }

  if (!pool || pool.length === 0) {
    outEl.textContent = "Hmm, I couldn’t think of anything—try again 🤍";
    return;
  }

  const pick = pool[Math.floor(Math.random() * pool.length)];
  outEl.textContent = "You should: " + pick;
}



// ---- Surprise ----
function decideSurprise() {
  const topic = document.getElementById("surpriseTopic").value;
  if (topic === "anything") {
    const options = ["food","watch","activity","book"];
    return decideSurpriseFrom(randomPick(options));
  }
  decideSurpriseFrom(topic);
}

function decideSurpriseFrom(topic) {
  if (topic === "food") {
    document.getElementById("surpriseResult").textContent = "Surprise food idea: " + randomPick([...comfortFoods, ...freshFoods, ...newFoods]);
  } else if (topic === "watch") {
    document.getElementById("surpriseResult").textContent = "Surprise watch pick: " + randomPick([...comfortMovies, ...funMovies, ...interestingMovies]);
  } else if (topic === "activity") {
    document.getElementById("surpriseResult").textContent = "Surprise activity: " + randomPick(activities);
  } else if (topic === "book") {
    const allBooks = [
      ...fictionBooks.romance, ...fictionBooks.fantasy, ...fictionBooks.mystery, ...fictionBooks.literary,
      ...nonfictionBooks.selfhelp, ...nonfictionBooks.history
    ];
    document.getElementById("surpriseResult").textContent = "Surprise book: " + randomPick(allBooks);
  }
}

// ---- Book ----
function decideBook() {
  const type = document.getElementById("bookType").value;
  const genre = document.getElementById("bookGenre").value;
  const length = document.getElementById("bookLength").value;

  let pool = [];
  if (type === "fiction") {
    pool = fictionBooks[genre] || [].concat(...Object.values(fictionBooks));
  } else {
    pool = nonfictionBooks[genre] || [].concat(...Object.values(nonfictionBooks));
  }

  if (length === "short") {
    pool = pool.slice(0, Math.ceil(pool.length / 2));
  }

  const pick = randomPick(pool);
  document.getElementById("bookResult").textContent = "You should read: " + pick;
}
// ================== PLACES (USER-ENTERED ONLY) ==================

function getPlaces() {
  const saved = JSON.parse(localStorage.getItem("places"));
  if (!saved) {
    const empty = { loved: [], want: [] };
    localStorage.setItem("places", JSON.stringify(empty));
    return empty;
  }
  return saved;
}

function addPlace() {
  const nameEl = document.getElementById("placeName");
  const typeEl = document.getElementById("placeType");

  if (!nameEl || !typeEl) return;

  const name = nameEl.value.trim();
  const type = typeEl.value; // "loved" or "want"

  if (!name) return;

  const places = getPlaces();
  places[type].unshift({ name });

  localStorage.setItem("places", JSON.stringify(places));

  nameEl.value = "";
  renderPlaces();
}

function renderPlaces() {
  const lovedEl = document.getElementById("placesLoved");
  const wantEl = document.getElementById("placesWant");

  if (!lovedEl || !wantEl) return;

  const places = getPlaces();

  lovedEl.innerHTML = places.loved.length
    ? places.loved.map((p, i) => `
        <div class="list-item">
          <div><strong>${p.name}</strong></div>
          <div class="actions">
            <button class="icon-btn" onclick="deletePlace('loved', ${i})">🗑️</button>
          </div>
        </div>
      `).join("")
    : `<p class="subtitle">No places yet. Add your favorites 🤍</p>`;

  wantEl.innerHTML = places.want.length
    ? places.want.map((p, i) => `
        <div class="list-item">
          <div><strong>${p.name}</strong></div>
          <div class="actions">
            <button class="icon-btn" onclick="deletePlace('want', ${i})">🗑️</button>
          </div>
        </div>
      `).join("")
    : `<p class="subtitle">No places yet. Add places you want to go ✨</p>`;
}

function deletePlace(type, index) {
  const places = getPlaces();
  places[type].splice(index, 1);
  localStorage.setItem("places", JSON.stringify(places));
  renderPlaces();
}

// ================== IDEAS VAULT ==================

// ================== IDEAS VAULT ==================

function getIdeas() {
  const raw = localStorage.getItem("ideas");

  if (!raw) {
    localStorage.setItem("ideas", JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Corrupted ideas in storage, resetting.", e);
    localStorage.setItem("ideas", JSON.stringify([]));
    return [];
  }
}

function addIdea() {
  const textEl = document.getElementById("ideaText");
  const tagEl = document.getElementById("ideaTag");

  if (!textEl || !tagEl) {
    console.error("Idea inputs not found");
    return;
  }

  const text = textEl.value.trim();
  if (!text) return;

  const ideas = getIdeas();
  ideas.unshift({ text, tag: tagEl.value });

  localStorage.setItem("ideas", JSON.stringify(ideas));
  textEl.value = "";
  renderIdeas();
}

function deleteIdea(index) {
  const ideas = getIdeas();
  ideas.splice(index, 1);
  localStorage.setItem("ideas", JSON.stringify(ideas));
  renderIdeas();
}

function renderIdeas() {
  const el = document.getElementById("ideasList");
  if (!el) return;

  const ideas = getIdeas();

  if (!ideas.length) {
    el.innerHTML = `<p class="subtitle">No ideas yet. Add one 🤍</p>`;
    return;
  }

  el.innerHTML = ideas.map((i, idx) => `
    <div class="list-item">
      <div>
        <strong>${i.text}</strong>
        <div class="subtitle">#${i.tag}</div>
      </div>
      <div class="actions">
        <button class="icon-btn" onclick="deleteIdea(${idx})">🗑️</button>
      </div>
    </div>
  `).join("");
}


// ================== HABITS ==================

const defaultHabits = [
  "Drink water","Stretch 5 minutes","Go outside","Read 10 pages","Tidy one small area",
  "Take deep breaths","Eat something nourishing","Short walk","Journal one sentence",
  "Make the bed","Open a window","Listen to music","Light movement","Practice gratitude",
  "Limit screen time","Meditate 5 minutes","Make tea","Posture check","Organize one drawer",
  "Practice a hobby","Plan tomorrow","Water plants","Prep clothes","Do skincare",
  "Neck stretches","Write goals","Check calendar","Clean desk","Do laundry","Read something calming"
];

function getHabits() {
  const saved = JSON.parse(localStorage.getItem("habits"));
  if (!saved) {
    const seeded = defaultHabits.map(name => ({ name, done: false }));
    localStorage.setItem("habits", JSON.stringify(seeded));
    return seeded;
  }
  return saved;
}

function toggleHabit(index) {
  const habits = getHabits();
  habits[index].done = !habits[index].done;
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

function renderHabits() {
  const el = document.getElementById("habitsList");
  if (!el) return;

  const habits = getHabits();

  el.innerHTML = habits.map((h, i) => `
    <div class="list-item">
      <div><strong>${h.name}</strong></div>
      <div class="actions">
        <button class="icon-btn" onclick="toggleHabit(${i})">
          ${h.done ? "✅" : "⬜️"}
        </button>
      </div>
    </div>
  `).join("");
}

