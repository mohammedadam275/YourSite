// ================== DARK MODE (DEFAULT = ON) ==================
(function initDarkMode() {
  const saved = localStorage.getItem("darkMode");
  const isDark = saved === null ? true : saved === "true";
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("darkMode", isDark.toString());
})();

function toggleDark() {
  const isDarkNow = document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", isDarkNow.toString());
}

// ================== Gate ==================
const acceptedAnswers = ["carissa", "me"];

function checkAnswer() {
  const inputEl = document.getElementById("answerInput");
  const msg = document.getElementById("gateMessage");
  if (!inputEl || !msg) return;

  const input = inputEl.value.trim().toLowerCase();
  if (acceptedAnswers.includes(input)) {
    window.location.href = "home.html";
  } else {
    msg.textContent = "Nice try 😌 (hint: it’s you)";
  }
}

// ================== Helpers ==================
function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ================== MEMORY BANK ==================
function getMemories() {
  try {
    return JSON.parse(localStorage.getItem("memories") || "[]");
  } catch {
    localStorage.setItem("memories", "[]");
    return [];
  }
}

function saveMemories(arr) {
  localStorage.setItem("memories", JSON.stringify(arr));
}

function addMemory() {
  const typeEl = document.getElementById("memoryType");
  const titleEl = document.getElementById("memoryTitle");
  const noteEl = document.getElementById("memoryNote");
  const statusEl = document.getElementById("memoryStatus");

  if (!titleEl) return;

  const title = titleEl.value.trim();
  if (!title) return alert("Please add a title 🤍");

  const type = typeEl ? typeEl.value : null;
  const note = noteEl ? noteEl.value.trim() : "";
  const status = statusEl ? statusEl.value : null;

  const memories = getMemories();
  memories.push({
    id: Date.now(),
    type,
    title,
    status,
    note
  });

  saveMemories(memories);
  titleEl.value = "";
  if (noteEl) noteEl.value = "";
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

  if (!memories.length) {
    list.innerHTML = "<p class='subtitle'>No memories yet 🤍</p>";
    return;
  }

  memories.forEach(m => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <div>
        <strong>${m.title}</strong><br/>
        ${m.status ? `<span class="tag">${m.status === "want" ? "📌 Want" : "✅ Done"}</span><br/>` : ""}
        <small>${m.note || ""}</small>
      </div>
      <button class="icon-btn" onclick="deleteMemory(${m.id})">🗑️</button>
    `;
    list.appendChild(div);
  });
}

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
// ---------- DATE IDEAS (75+ ideas) ----------
const dateIdeas = [
  "Sunset picnic at the beach 🌅🧺",
  "Coffee shop hopping ☕",
  "Bookstore date + pick books for each other 📚",
  "Movie night at home with snacks 🍿",
  "Cook a new recipe together 🍳",
  "Late night drive with music 🎶🚗",
  "Stargazing night ✨",
  "Go to a farmers market together 🥕",
  "Thrift store challenge (pick outfits for each other) 👕",
  "Mini road trip 🚗",
  "Museum or art gallery date 🖼️",
  "Beach walk + ice cream 🍦🌊",
  "Picnic in the park 🧺",
  "Board game or card game night 🎲",
  "Bake cookies or brownies together 🍪",
  "Watch the sunset from a lookout point 🌄",
  "Go bowling 🎳",
  "Arcade date 🎮",
  "Mini golf ⛳",
  "Go to a local café and journal together ✍️☕",
  "Make a playlist for each other 🎧",
  "Polaroid / photo walk 📸",
  "Try a new restaurant 🍽️",
  "Dessert-only date 🍰",
  "Make homemade pizza together 🍕",
  "Paint or draw together 🎨",
  "Go on a scenic hike 🌲",
  "Beach picnic + music 🎶🌊",
  "Watch a comfort movie marathon 🎬",
  "Do a puzzle together 🧩",
  "Sunrise breakfast date 🌅🥞",
  "Visit a botanical garden 🌿",
  "Go to the aquarium 🐠",
  "Go to the zoo 🐾",
  "Try a pottery or art class 🏺",
  "Make a vision board together 🖼️",
  "Do a spa night at home 💆",
  "Make mocktails or fancy drinks 🍹",
  "Write letters to each other 💌",
  "Go to a bookstore + café date 📚☕",
  "Take a long scenic walk 🚶‍♀️🚶‍♂️",
  "Watch a documentary together 🎥",
  "Try a new dessert spot 🍩",
  "Do a sunset drive 🚗🌅",
  "Visit a pier or boardwalk 🎡",
  "Go to a local market 🛍️",
  "Do a themed movie night (Studio Ghibli, rom-coms, etc.) 🎬",
  "Build a Lego set together 🧱",
  "Do a candlelight dinner at home 🕯️🍽️",
  "Make breakfast in bed 🥐☕",
  "Go on a photo scavenger hunt 📸",
  "Try a new coffee or tea shop 🍵",
  "Do yoga or stretching together 🧘",
  "Write down future trip ideas 🗺️",
  "Go roller skating 🛼",
  "Go ice skating ⛸️",
  "Play video games together 🎮",
  "Have a picnic in the living room 🛋️🧺",
  "Watch the stars from the car ✨🚗",
  "Do a sunset beach bonfire (if allowed) 🔥🌊",
  "Make a scrapbook together 📒",
  "Do a ‘no phones’ date night 📵❤️",
  "Go to a quiet café and people-watch ☕",
  "Recreate your first date 💕",
  "Plan a future vacation together ✈️",
  "Take a long drive and talk 🎶🚗",
  "Do a baking competition 🍰",
  "Try a new hobby together 🎨",
  "Have a themed dinner night (Italian, Japanese, etc.) 🍝🍣",
  "Go to a lookout point and talk 🌄",
  "Do a cozy reading date 📖",
  "Make a shared playlist and listen together 🎧",
  "Do a puzzle + hot chocolate night ☕🧩"
];

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

// ---- Movie / Show ----
let lastPick = null;
let lastPickType = null;

function decideMovie() {
  const brain = document.getElementById("movieBrain")?.value;
  const watchType = document.getElementById("watchType")?.value;
  const genre = document.getElementById("genreMood")?.value;
  const outEl = document.getElementById("movieResult");
  if (!outEl || !watchType || !genre) return;

  let pool;
  if (watchType === "movie") {
    pool = genre === "fun" ? funMovies : genre === "interesting" ? interestingMovies : comfortMovies;
    if (brain === "off") pool = comfortMovies;
  } else {
    pool = genre === "fun" ? funShows : genre === "interesting" ? interestingShows : comfortShows;
    if (brain === "off") pool = comfortShows;
  }

  const pick = randomPick(pool);
  lastPick = pick;
  lastPickType = watchType;

  outEl.textContent = (watchType === "movie" ? "You should watch: " : "You should start: ") + pick;
}

// ---- Food ----
function decideFood() {
  const energy = document.getElementById("foodEnergy")?.value;
  const vibe = document.getElementById("foodVibe")?.value;
  const outEl = document.getElementById("foodResult");
  if (!energy || !vibe || !outEl) return;

  let pool = vibe === "fresh" ? freshFoods : vibe === "new" ? newFoods : comfortFoods;
  if (energy === "low") pool = comfortFoods;

  outEl.textContent = "You should have: " + randomPick(pool);
}

// ---- Activity ----
function decideActivity() {
  const energy = document.getElementById("actEnergy")?.value;
  const place = document.getElementById("actPlace")?.value;
  const outEl = document.getElementById("activityResult");
  if (!energy || !place || !outEl) return;

  let pool;
  if (place === "out") {
    pool = energy === "low" ? outLowEnergy : energy === "medium" ? outMediumEnergy : outHighEnergy;
  } else {
    pool = energy === "low" ? inChill : energy === "medium" ? inFun : inProductive;
  }

  outEl.textContent = "You should: " + randomPick(pool);
}

// ---- Surprise ----
function decideSurprise() {
  const topic = document.getElementById("surpriseTopic").value;
  decideSurpriseFrom(topic);
}

function decideSurpriseFrom(topic) {
  if (topic === "date") {
    document.getElementById("surpriseResult").textContent =
      "Date idea: " + randomPick(dateIdeas);

  } else if (topic === "food") {
    document.getElementById("surpriseResult").textContent =
      "Surprise food idea: " + randomPick([...comfortFoods, ...freshFoods, ...newFoods]);

  } else if (topic === "watch") {
    document.getElementById("surpriseResult").textContent =
      "Surprise watch pick: " + randomPick([...comfortMovies, ...funMovies, ...interestingMovies]);

  } else if (topic === "activity") {
    const allActivities = [
      ...outLowEnergy, ...outMediumEnergy, ...outHighEnergy,
      ...inChill, ...inFun, ...inProductive
    ];
    document.getElementById("surpriseResult").textContent =
      "Surprise activity: " + randomPick(allActivities);

  } else if (topic === "book") {
    const allBooks = [
      ...fictionBooks.romance, ...fictionBooks.fantasy, ...fictionBooks.mystery, ...fictionBooks.literary,
      ...nonfictionBooks.selfhelp, ...nonfictionBooks.history
    ];
    document.getElementById("surpriseResult").textContent =
      "Surprise book: " + randomPick(allBooks);
  }
}


// ---- Book ----
function decideBook() {
  const type = document.getElementById("bookType").value;     // fiction / nonfiction
  const genre = document.getElementById("bookGenre").value;   // romance, fantasy, etc or "any"
  const length = document.getElementById("bookLength").value; // any / short

  let pool = [];

  if (type === "fiction") {
    if (genre === "any") {
      pool = [].concat(...Object.values(fictionBooks));
    } else {
      pool = fictionBooks[genre] || [].concat(...Object.values(fictionBooks));
    }
  } else {
    if (genre === "any") {
      pool = [].concat(...Object.values(nonfictionBooks));
    } else {
      pool = nonfictionBooks[genre] || [].concat(...Object.values(nonfictionBooks));
    }
  }

  // If "shorter", bias toward first half of list
  if (length === "short") {
    pool = pool.slice(0, Math.ceil(pool.length / 2));
  }

  if (!pool.length) {
    document.getElementById("bookResult").textContent = "Couldn't find a book — try again 🤍";
    return;
  }

  const pick = randomPick(pool);
  document.getElementById("bookResult").textContent = "You should read: " + pick;
}


// ================== PLACES ==================
function getPlaces() {
  try {
    return JSON.parse(localStorage.getItem("places") || '{"loved":[],"want":[]}');
  } catch {
    const empty = { loved: [], want: [] };
    localStorage.setItem("places", JSON.stringify(empty));
    return empty;
  }
}

function addPlace() {
  const nameEl = document.getElementById("placeName");
  const typeEl = document.getElementById("placeType");
  if (!nameEl || !typeEl) return;

  const name = nameEl.value.trim();
  if (!name) return;

  const places = getPlaces();
  places[typeEl.value].unshift({ name });
  localStorage.setItem("places", JSON.stringify(places));
  nameEl.value = "";
  renderPlaces();
}

function deletePlace(type, index) {
  const places = getPlaces();
  places[type].splice(index, 1);
  localStorage.setItem("places", JSON.stringify(places));
  renderPlaces();
}

function renderPlaces() {
  const lovedEl = document.getElementById("placesLoved");
  const wantEl = document.getElementById("placesWant");
  if (!lovedEl || !wantEl) return;

  const places = getPlaces();

  lovedEl.innerHTML = places.loved.length
    ? places.loved.map((p, i) => `<div class="list-item"><span>${p.name}</span><button class="icon-btn" onclick="deletePlace('loved',${i})">🗑️</button></div>`).join("")
    : "<p class='subtitle'>No loved places yet 🤍</p>";

  wantEl.innerHTML = places.want.length
    ? places.want.map((p, i) => `<div class="list-item"><span>${p.name}</span><button class="icon-btn" onclick="deletePlace('want',${i})">🗑️</button></div>`).join("")
    : "<p class='subtitle'>No places yet ✨</p>";
}

// ================== IDEAS ==================
function getIdeas() {
  try {
    return JSON.parse(localStorage.getItem("ideas") || "[]");
  } catch {
    localStorage.setItem("ideas", "[]");
    return [];
  }
}

function addIdea() {
  const textEl = document.getElementById("ideaText");
  const tagEl = document.getElementById("ideaTag");
  if (!textEl || !tagEl) return;

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
  el.innerHTML = ideas.length
    ? ideas.map((i, idx) => `
      <div class="list-item">
        <div><strong>${i.text}</strong><div class="subtitle">#${i.tag}</div></div>
        <button class="icon-btn" onclick="deleteIdea(${idx})">🗑️</button>
      </div>
    `).join("")
    : "<p class='subtitle'>No ideas yet 🤍</p>";
}

// ================== HABITS ==================

function getHabits() {
  const raw = localStorage.getItem("habits");

  if (!raw) {
    localStorage.setItem("habits", JSON.stringify([]));
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem("habits", JSON.stringify([]));
    return [];
  }
}

function saveHabits(habits) {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
  const input = document.getElementById("newHabitInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  const habits = getHabits();
  habits.push({ text, done: false });

  saveHabits(habits);
  input.value = "";
  renderHabits();
}

function toggleHabit(index) {
  const habits = getHabits();
  habits[index].done = !habits[index].done;
  saveHabits(habits);
  renderHabits();
}

function deleteHabit(index) {
  const habits = getHabits();
  habits.splice(index, 1);
  saveHabits(habits);
  renderHabits();
}

function clearHabits() {
  if (!confirm("Clear all habits? You can always add new ones 🤍")) return;
  saveHabits([]);
  renderHabits();
}

function renderHabits() {
  const el = document.getElementById("habitsList");
  if (!el) return;

  const habits = getHabits();

  if (!habits.length) {
    el.innerHTML = `<p class="subtitle">No habits yet. Add one 🌱</p>`;
    return;
  }

  el.innerHTML = habits.map((h, i) => `
    <div class="list-item">
      <div onclick="toggleHabit(${i})" style="cursor:pointer;">
        ${h.done ? "✅" : "⬜"} ${h.text}
      </div>
      <button class="icon-btn" onclick="deleteHabit(${i})">🗑️</button>
    </div>
  `).join("");
}


