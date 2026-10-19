import "server-only";
import { isFreeGuide } from "@/lib/billing/plan";
import type { CatalogItem, Grade, Subject } from "@/lib/subjects";

export { SUBJECTS, GRADES, subjectMeta, isSubject, isGrade } from "@/lib/subjects";
export type { Subject, Grade, CatalogItem } from "@/lib/subjects";

export type ExperimentVideo = {
  /** YouTube video ID (the 11-char string after `?v=`) */
  youtubeId?: string;
  /** Self-hosted pre-recorded video, e.g. "/videos/strawberry-dna.mp4" */
  src?: string;
  /** Credit for whoever recorded the video */
  credit: string;
};

export type ConceptCheckItem = {
  q: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type Experiment = {
  id: string;
  subject: Subject;
  grade: Grade;
  unit: string;
  /** Curriculum reference, where known. */
  curriculumCode?: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  difficulty: "easy" | "medium";
  /** A short story tying the experiment to everyday Ethiopian life. */
  whyItMatters?: string;
  /** Background the student needs before starting. Bodies support `code`, *italic* and "- " lists. */
  concept: { heading: string; body: string }[];
  materials: { item: string; localNote?: string }[];
  safety: string[];
  steps: { text: string; tip?: string }[];
  /** What the student should see. */
  observe: string;
  /** Why it happens. */
  explanation: string;
  troubleshooting: { problem: string; fix: string }[];
  video?: ExperimentVideo;
  conceptCheck: ConceptCheckItem[];
  /** The scientist who reviewed this guide. The credit is hidden until it's set. */
  reviewedBy?: { name: string; title: string };
};

export const EXPERIMENTS: Experiment[] = [
  // ======================= GRADE 9 =======================
  {
    id: "g9-phy-density-column",
    subject: "physics",
    grade: 9,
    unit: "Matter and its properties",
    title: "Build a density tower in a glass",
    summary: "Stack honey, water and cooking oil in one glass and watch them refuse to mix. Then drop in small objects and see where each one floats.",
    estimatedMinutes: 20,
    difficulty: "easy",
    whyItMatters: "When the Awash floods, oil and fuel spilled upstream spread as a thin film on top of the water — never underneath. Fishermen on Lake Tana know that a wooden boat floats while an iron anchor sinks. Both come down to one idea: density. Engineers use it to design ships, separate crude oil and even test whether honey from the market has been watered down.",
    concept: [
      { heading: "What is density?", body: "Density is how much mass is packed into a given volume: `ρ = m / V`. Units are g/cm³ or kg/m³. Water has a density of about `1 g/cm³`." },
      { heading: "Floating and sinking", body: "A liquid or object that is *less dense* than the liquid around it rises and floats. One that is *more dense* sinks. Liquids that don't mix settle into layers, densest at the bottom." },
    ],
    materials: [
      { item: "A tall clear glass or bottle" },
      { item: "Honey", localNote: "Thick sugar syrup works too" },
      { item: "Water with a few drops of food colouring", localNote: "A little tea or coffee also colours it" },
      { item: "Cooking oil" },
      { item: "Small test objects: a grape, a cork or bottle cap, a coin, a piece of pasta or a dried bean" },
      { item: "A spoon" },
    ],
    safety: [
      "Wipe up spills right away — oil and honey make floors slippery.",
      "Don't drink the mixture afterwards.",
    ],
    steps: [
      { text: "Pour honey into the glass until it is about one-quarter full.", tip: "Pour into the centre so it doesn't coat the sides." },
      { text: "Slowly pour the coloured water over the back of a spoon so it runs gently down the side of the glass.", tip: "Pouring slowly keeps the layers sharp." },
      { text: "Do the same with the cooking oil." },
      { text: "Wait one minute and look at the layers from the side." },
      { text: "Gently drop in your test objects one at a time. Note which layer each one stops in." },
    ],
    observe: "Three clear layers form: honey at the bottom, water in the middle, oil on top. The coin sinks to the bottom. A grape or bean usually rests between water and honey, and a cork floats on the oil.",
    explanation: "Honey is denser than water (about 1.4 g/cm³), and oil is less dense (about 0.9 g/cm³), so they sort themselves by density. Each object stops at the layer where the liquid above it is less dense than the object, and the liquid below it is more dense.",
    troubleshooting: [
      { problem: "The water and honey mixed into one cloudy layer.", fix: "You poured too fast. Start again and pour the water very slowly down the back of a spoon held against the glass." },
      { problem: "I can't see the line between water and oil.", fix: "Add more food colouring (or tea) to the water so it contrasts with the yellow oil." },
    ],
    conceptCheck: [
      { q: "Oil floats on water. What does this tell you?", choices: ["Oil is heavier than water", "Oil is less dense than water", "Oil has more mass", "Oil is a solid"], answerIndex: 1, explanation: "Floating depends on density, not total mass. A litre of oil has less mass than a litre of water." },
      { q: "A 20 g object has a volume of 10 cm³. Will it sink or float in water (1 g/cm³)?", choices: ["Float", "Sink", "Stay exactly in the middle", "Can't tell"], answerIndex: 1, explanation: "ρ = 20 / 10 = 2 g/cm³, which is greater than water's 1 g/cm³, so it sinks." },
    ],
  },
  {
    id: "g9-chem-separate-mixture",
    subject: "chemistry",
    grade: 9,
    unit: "Mixtures and separation",
    title: "Get clean salt back from salty sand",
    summary: "Mix salt and sand, then separate them again using dissolving, filtering and evaporation — the same steps used to make salt from Afar brine.",
    estimatedMinutes: 40,
    difficulty: "easy",
    whyItMatters: "In the Danakil Depression, workers cut salt from the ground, and salt producers elsewhere evaporate brine in the sun to get clean crystals. Water treatment plants in Addis filter river water through sand before it reaches your tap. Separating mixtures is one of the oldest and most useful skills in chemistry.",
    concept: [
      { heading: "Mixtures vs compounds", body: "A *mixture* is two or more substances mixed together but not chemically joined, so they can be separated by physical methods. Salt + sand is a mixture." },
      { heading: "Three separation methods", body: "- *Dissolving*: salt dissolves in water, sand does not.\n- *Filtration*: a filter lets the liquid pass but traps solid particles.\n- *Evaporation*: heating or sun-drying removes the water and leaves the dissolved solid behind." },
    ],
    materials: [
      { item: "2 spoons of table salt" },
      { item: "2 spoons of sand or fine soil" },
      { item: "2 cups and warm water" },
      { item: "A coffee filter or a clean, thin cotton cloth" },
      { item: "A shallow plate or tray" },
      { item: "A sunny window, or a stove with an adult's help" },
    ],
    safety: [
      "If you heat the salt water on a stove, ask an adult to help and never leave it unattended.",
      "Let the plate cool before touching it.",
    ],
    steps: [
      { text: "Mix the salt and sand together in a cup. Notice you can't easily pick the salt out." },
      { text: "Add about half a cup of warm water and stir for one minute.", tip: "Warm water dissolves salt faster." },
      { text: "Place the filter or cloth over the second cup and slowly pour the mixture through it." },
      { text: "Look at what stayed in the filter and what passed through." },
      { text: "Pour the clear liquid onto the plate and leave it in the sun for 1–2 days (or gently heat it with an adult until the water is gone)." },
    ],
    observe: "Wet sand stays in the filter. The liquid that passes through looks clear. After the water evaporates, white salt crystals are left on the plate.",
    explanation: "Salt dissolves into water as ions too small to be stopped by the filter, so it passes through with the water. Sand grains are too big and do not dissolve, so they are trapped. Evaporation removes the water but not the salt, so the salt crystallises again.",
    troubleshooting: [
      { problem: "The filtered water is still cloudy.", fix: "Fine soil particles got through. Filter it a second time, or let it stand for 10 minutes and pour off the clear top part." },
      { problem: "No crystals appeared.", fix: "The water hasn't fully evaporated yet. Leave it longer in a warm, sunny spot, using a wide shallow plate." },
    ],
    conceptCheck: [
      { q: "Why does the salt pass through the filter but the sand doesn't?", choices: ["Salt is lighter", "Dissolved salt particles are far smaller than the filter holes", "The filter is magnetic", "Sand dissolves faster"], answerIndex: 1, explanation: "Dissolved salt exists as tiny ions spread through the water, small enough to pass through the filter." },
      { q: "Which method removes water and leaves dissolved salt behind?", choices: ["Filtration", "Decanting", "Evaporation", "Magnetism"], answerIndex: 2, explanation: "Evaporation turns the water into vapour; the salt doesn't evaporate, so it stays." },
    ],
  },
  {
    id: "g9-bio-starch-test",
    subject: "biology",
    grade: 9,
    unit: "Food and nutrition",
    title: "Which foods contain starch?",
    summary: "Use a drop of iodine antiseptic from the pharmacy to test injera, potato, bread, sugar and more for starch.",
    estimatedMinutes: 25,
    difficulty: "easy",
    whyItMatters: "Teff, maize, wheat and potato provide most of the energy Ethiopians eat each day, mostly in the form of starch. Nutritionists test foods to plan school meals and fight malnutrition. With one drop of iodine you can do the same test they use in the lab.",
    concept: [
      { heading: "Carbohydrates and starch", body: "Starch is a carbohydrate made of many glucose units joined in long chains. Plants store energy as starch in seeds, roots and tubers." },
      { heading: "The iodine test", body: "Iodine solution is yellow-brown. When it meets starch, iodine molecules slip inside the coiled starch chains and the colour changes to *blue-black*. No starch means the colour stays yellow-brown." },
    ],
    materials: [
      { item: "Iodine antiseptic solution (povidone-iodine)", localNote: "Sold in most pharmacies as a wound antiseptic" },
      { item: "Small pieces of food: injera, raw potato, bread, banana, boiled egg white, sugar, rice" },
      { item: "A white plate or a sheet of white paper under a plate" },
      { item: "A dropper or a straw" },
    ],
    safety: [
      "Iodine stains skin and clothes and must not be swallowed. Do not eat the tested food afterwards.",
      "Wash your hands after the experiment.",
    ],
    steps: [
      { text: "Place small pieces of each food on the white plate, spaced apart. Label them on paper." },
      { text: "Put one drop of iodine solution on each food.", tip: "If the antiseptic is very dark, dilute it 1:5 with water so colour changes are easier to see." },
      { text: "Wait 30 seconds." },
      { text: "Record the colour of each food: yellow-brown (no starch) or blue-black (starch)." },
    ],
    observe: "Potato, injera, bread and rice turn blue-black. Sugar and egg white stay yellow-brown. Ripe banana may show only a weak colour change.",
    explanation: "Foods from seeds and tubers store energy as starch, which reacts with iodine to give the blue-black colour. Sugar is a simple carbohydrate, not starch, and egg white is mostly protein, so neither changes colour. As bananas ripen, their starch is converted into sugars, so the reaction becomes weaker.",
    troubleshooting: [
      { problem: "Everything looks dark brown, so I can't tell the difference.", fix: "Your iodine is too concentrated. Dilute it with water and test again on a white background." },
      { problem: "Sugar turned slightly dark.", fix: "Check that the spoon or plate didn't have starchy crumbs on it. Use a clean spot and test a fresh pinch." },
    ],
    conceptCheck: [
      { q: "Iodine turns blue-black on a food. What does that show?", choices: ["Protein is present", "Starch is present", "Fat is present", "Water is present"], answerIndex: 1, explanation: "Blue-black is the positive result for starch." },
      { q: "Why might a ripe banana react less than an unripe one?", choices: ["Ripening turns starch into sugar", "Ripe bananas contain iodine", "Ripe bananas have more starch", "Bananas have no carbohydrates"], answerIndex: 0, explanation: "Ripening enzymes break starch down into sweet sugars, which don't react with iodine." },
    ],
  },

  // ======================= GRADE 10 =======================
  {
    id: "g10-phy-lemon-battery",
    subject: "physics",
    grade: 10,
    unit: "Electricity",
    title: "Light an LED with a lemon battery",
    summary: "Turn lemons, coins and nails into a battery and measure how connecting cells in series raises the voltage.",
    estimatedMinutes: 35,
    difficulty: "medium",
    whyItMatters: "Many rural homes in Ethiopia still depend on dry-cell batteries for torches and radios. Every one of those batteries works on the same principle as your lemon: two different metals in a conducting liquid. Understanding cells is the first step toward the solar and battery storage systems now spreading across the country.",
    concept: [
      { heading: "How a simple cell works", body: "Two *different* metals (electrodes) placed in a conducting liquid (electrolyte) create a voltage. Zinc gives up electrons more easily than copper, so electrons flow from the zinc through the wire to the copper." },
      { heading: "Cells in series", body: "Connecting cells in *series* (copper of one to zinc of the next) adds their voltages: `V_total = V₁ + V₂ + …`. One lemon gives about `0.9 V`; a red LED needs about `1.8–2 V`." },
    ],
    materials: [
      { item: "3–4 lemons", localNote: "Potatoes or salt water in cups also work" },
      { item: "3–4 galvanized (zinc-coated) nails or screws" },
      { item: "3–4 copper pieces: copper coins, or bare copper wire" },
      { item: "Short wires or wires with crocodile clips" },
      { item: "A small red LED", localNote: "From an electronics shop, or salvaged from an old toy" },
      { item: "A multimeter if you have one (optional)" },
    ],
    safety: [
      "This experiment uses only very low voltages and is safe. Never connect anything to a wall socket.",
      "Don't eat the lemons afterwards — metal ions dissolve into the juice.",
    ],
    steps: [
      { text: "Roll each lemon on the table while pressing gently to release the juice inside." },
      { text: "Push one nail and one copper piece into each lemon, about 2 cm apart. They must not touch." },
      { text: "Connect the copper of lemon 1 to the nail of lemon 2 with a wire. Repeat to chain all the lemons in series." },
      { text: "Connect the free nail and the free copper piece to the two legs of the LED.", tip: "The longer LED leg must connect to the copper (+) side." },
      { text: "If you have a multimeter, measure the voltage of one lemon, then two, then three." },
    ],
    observe: "One lemon alone gives about 0.9 V, which is not enough to light the LED. With three or four lemons in series, the LED glows faintly — best seen in a dark room.",
    explanation: "Zinc reacts with the acid in the lemon juice and releases electrons, which travel through the wire to the copper. Each lemon cell provides a small voltage; connecting them in series adds those voltages until they are high enough to push current through the LED.",
    troubleshooting: [
      { problem: "The LED doesn't light at all.", fix: "Flip the LED around — it only works in one direction. Then check that no nail touches a copper piece inside the lemon." },
      { problem: "My multimeter reads 0 V.", fix: "Your nail may not be zinc-coated. Use galvanized nails (dull grey) and clean the copper with salt and vinegar." },
      { problem: "The LED is very dim.", fix: "Add another lemon in series, and look in a darkened room." },
    ],
    conceptCheck: [
      { q: "Why do you need two different metals?", choices: ["For decoration", "Different metals give up electrons differently, creating a voltage", "To make the lemon sour", "One metal is enough"], answerIndex: 1, explanation: "The voltage comes from the difference in how readily the two metals lose electrons." },
      { q: "Three cells of 0.9 V are connected in series. What is the total voltage?", choices: ["0.3 V", "0.9 V", "1.8 V", "2.7 V"], answerIndex: 3, explanation: "In series, voltages add: 0.9 + 0.9 + 0.9 = 2.7 V." },
    ],
  },
  {
    id: "g10-chem-rusting",
    subject: "chemistry",
    grade: 10,
    unit: "Chemical reactions",
    title: "What makes iron rust?",
    summary: "Set up four nails in different conditions and find out which ingredients rusting really needs.",
    estimatedMinutes: 20,
    difficulty: "easy",
    whyItMatters: "Rusted corrugated iron roofs, bridges and water pipes cost Ethiopia millions of birr to replace every year. Engineers protect metal by painting, oiling or galvanizing it. In this experiment you'll discover exactly what causes rust, so you can understand how those protections work.",
    concept: [
      { heading: "Rusting is oxidation", body: "Rust is hydrated iron oxide. It forms when iron reacts with *oxygen* and *water*: `4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O`. Salt speeds it up because it makes water a better conductor." },
      { heading: "A fair test", body: "To find which factor matters, change only *one* condition at a time and keep everything else the same. That way, any difference must be caused by that condition." },
    ],
    materials: [
      { item: "4 identical iron nails (not galvanized — shiny, not dull grey)" },
      { item: "4 clear cups or jars" },
      { item: "Water, salt and cooking oil" },
      { item: "Boiled, cooled water", localNote: "Boiling removes most dissolved air" },
      { item: "Labels or a marker" },
    ],
    safety: [
      "Ask an adult to help boil the water.",
      "Wash your hands after handling rusty nails.",
    ],
    steps: [
      { text: "Label the cups A–D." },
      { text: "A: put a nail in a dry, empty cup." },
      { text: "B: put a nail in tap water, half covered so it touches both water and air." },
      { text: "C: put a nail in boiled, cooled water and pour a thin layer of oil on top to keep air out.", tip: "Fill the cup so the whole nail is under water." },
      { text: "D: put a nail in salt water, half covered." },
      { text: "Check every day for 5 days and record what you see in a table." },
    ],
    observe: "Nail D (salt water) rusts fastest, followed by B (tap water). Nail A (dry) and nail C (no air) show little or no rust.",
    explanation: "Rusting needs both oxygen and water. Cup A has no water and cup C has almost no oxygen, so neither rusts much. Salt dissolves into ions that help electrons move during the reaction, which speeds up rusting — that's why metal rusts faster near salty roads or the sea.",
    troubleshooting: [
      { problem: "None of the nails rusted.", fix: "Your nails are probably galvanized or stainless. Use plain iron nails, or scrub them with sandpaper first." },
      { problem: "Nail C rusted too.", fix: "Some air got in. Make sure the oil layer completely covers the water and the nail is fully submerged." },
    ],
    conceptCheck: [
      { q: "Which two things are both needed for iron to rust?", choices: ["Oil and water", "Oxygen and water", "Salt and oil", "Light and heat"], answerIndex: 1, explanation: "The dry cup (no water) and the oil-sealed cup (no oxygen) barely rusted." },
      { q: "Why does painting a roof stop it rusting?", choices: ["Paint is magnetic", "Paint keeps oxygen and water away from the iron", "Paint adds zinc", "Paint makes the iron heavier"], answerIndex: 1, explanation: "Paint is a barrier — remove one of the two ingredients and rusting stops." },
    ],
  },
  {
    id: "g10-bio-yeast-respiration",
    subject: "biology",
    grade: 10,
    unit: "Respiration",
    title: "Blow up a balloon with yeast",
    summary: "Feed yeast sugar in a bottle and capture the carbon dioxide it releases during respiration — the same process that makes injera batter bubble.",
    estimatedMinutes: 30,
    difficulty: "easy",
    whyItMatters: "Every bubble in injera, every rise of a loaf of dabo and every bottle of tella and tej depends on yeast respiration. Yeast are tiny living fungi that break down sugar for energy and release carbon dioxide as a by-product — just like your own cells do.",
    concept: [
      { heading: "Respiration releases energy", body: "Living cells break down glucose to release energy. With oxygen (aerobic): `glucose + oxygen → carbon dioxide + water + energy`. Without oxygen, yeast carry out *fermentation*: `glucose → ethanol + carbon dioxide + energy`." },
      { heading: "Temperature and enzymes", body: "Respiration is driven by enzymes. They work fastest at a warm *optimum* temperature and are slowed by cold or destroyed by very hot water." },
    ],
    materials: [
      { item: "1 packet (about 7 g) of dry baker's yeast", localNote: "Sold in supermarkets and bakeries" },
      { item: "2 spoons of sugar" },
      { item: "Warm water (comfortably warm to touch, not hot)" },
      { item: "A small plastic bottle" },
      { item: "A balloon" },
      { item: "Optional: a second bottle and balloon for a cold-water comparison" },
    ],
    safety: [
      "Use warm, not boiling, water — very hot water kills the yeast and could burn you.",
      "Don't drink the mixture.",
    ],
    steps: [
      { text: "Pour about 100 ml of warm water into the bottle." },
      { text: "Add the yeast and the sugar. Swirl gently to mix.", tip: "Using a paper funnel stops yeast sticking to the neck." },
      { text: "Stretch the balloon over the mouth of the bottle." },
      { text: "Put the bottle somewhere warm and check it every 5 minutes for 30 minutes." },
      { text: "Optional: set up a second bottle with cold water and compare." },
    ],
    observe: "Foam forms in the bottle and the balloon slowly inflates over 20–30 minutes. The cold-water bottle inflates much more slowly, or hardly at all.",
    explanation: "The yeast use the sugar for respiration and release carbon dioxide gas. The gas has nowhere to go but into the balloon, so it inflates. In cold water the yeast's enzymes work slowly, so less carbon dioxide is produced.",
    troubleshooting: [
      { problem: "Nothing happened after 30 minutes.", fix: "Your water may have been too hot and killed the yeast, or the yeast is old. Try again with fresh yeast and water just warm to the touch." },
      { problem: "The balloon inflated a little and then stopped.", fix: "Check the balloon is sealed tightly on the bottle neck — gas may be leaking out." },
    ],
    conceptCheck: [
      { q: "Which gas inflates the balloon?", choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answerIndex: 2, explanation: "Carbon dioxide is released by yeast during respiration and fermentation." },
      { q: "Why did the cold-water bottle inflate more slowly?", choices: ["Cold water has no sugar", "Enzymes work slowly at low temperature", "Yeast only live in the dark", "Cold water contains more oxygen"], answerIndex: 1, explanation: "Lower temperatures slow down the enzyme-controlled reactions of respiration." },
    ],
  },

  // ======================= GRADE 11 (ported) =======================
  {
    id: "phy-mech-01-kinematics-1d",
    subject: "physics",
    grade: 11,
    unit: "Mechanics",
    curriculumCode: "PHY-G11-M1.1",
    title: "Measure your own walking speed",
    summary: "Time yourself over 10 metres at three different paces and calculate real velocities with v = Δx / Δt.",
    estimatedMinutes: 20,
    difficulty: "easy",
    whyItMatters: "A minibus driver on Bole Road has to brake before a pedestrian crossing — but how far ahead? At 50 km/h, the bus needs about 35 metres to stop safely. Engineers calculate that with exactly the formulas in this experiment: v = Δx/Δt, then a = Δv/Δt for the brakes. The same idea sets bus schedules and decides where speed bumps go.",
    concept: [
      { heading: "Position vs. displacement", body: "Position is *where* an object is on a chosen axis — a coordinate `x`. Displacement is the *change* in position, `Δx = x_final − x_initial`. Distance is the total path length, which can be larger than the magnitude of displacement if the object turns around." },
      { heading: "Velocity vs. speed", body: "Average velocity `v_avg = Δx / Δt` is a vector — it has direction. Average speed is the total distance divided by time and is always non-negative." },
      { heading: "Acceleration", body: "Acceleration is the rate of change of velocity: `a = Δv / Δt`." },
    ],
    materials: [
      { item: "A flat 10-metre path (yard, hallway, or schoolyard)" },
      { item: "A phone with a timer or a wristwatch" },
      { item: "Chalk or tape to mark start and end" },
      { item: "A tape measure", localNote: "Or a string you've marked every metre" },
    ],
    safety: ["Use a path away from traffic.", "When walking fast, watch out for obstacles."],
    steps: [
      { text: "Measure exactly 10 m along the path and mark the start and end." },
      { text: "Walk at your normal pace from start to end. Have a friend time you (or start the timer yourself).", tip: "Start walking a few steps before the start line so you're already at a steady pace." },
      { text: "Record the time. Repeat once walking slowly and once walking fast." },
      { text: "Calculate each speed: speed = 10 ÷ time (in m/s)." },
    ],
    observe: "Your three speeds differ clearly — something like 0.8, 1.3 and 2.0 m/s.",
    explanation: "Because you walked in one straight line in one direction, your displacement equals your distance, so your average speed equals the magnitude of your average velocity. You've measured a real-world v = Δx / Δt with your own feet.",
    troubleshooting: [
      { problem: "My times vary a lot between tries at the same pace.", fix: "Reaction time adds error. Use a longer path (20 m) or average three runs at each pace." },
      { problem: "I got a speed above 3 m/s while walking.", fix: "Check your distance and that the timer started at the start line, not after it." },
    ],
    video: { youtubeId: "EGqpLug-sDk", credit: "FuseSchool" },
    conceptCheck: [
      { q: "A student walks 100 m east, then 40 m west. What is the magnitude of displacement?", choices: ["60 m", "100 m", "140 m", "40 m"], answerIndex: 0, explanation: "Displacement is the net change in position: 100 − 40 = 60 m east. Distance traveled would be 140 m." },
      { q: "Which quantity is always non-negative?", choices: ["Velocity", "Displacement", "Speed", "Acceleration"], answerIndex: 2, explanation: "Speed is a scalar magnitude — always ≥ 0. The others are vectors and can be negative depending on direction." },
    ],
  },
  {
    id: "phy-mech-02-newtons-laws",
    subject: "physics",
    grade: 11,
    unit: "Mechanics",
    curriculumCode: "PHY-G11-M2.1",
    title: "The coin and card — see inertia for yourself",
    summary: "Flick a card out from under a coin and watch Newton's first law drop it straight into a cup.",
    estimatedMinutes: 10,
    difficulty: "easy",
    whyItMatters: "When a Bajaj brakes hard and your body lurches forward, that's Newton's first law — your body wants to keep moving. The same three laws let Ethiopian Airlines pilots calculate the thrust needed to lift a 787 off the runway at Bole.",
    concept: [
      { heading: "First law (inertia)", body: "An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted on by a net external force. The tendency to resist changes is called *inertia*, and it scales with mass." },
      { heading: "Second law (F = ma)", body: "The net force on an object equals its mass times its acceleration: `F_net = m · a`. A force acting for only a very short time produces only a small change in velocity." },
      { heading: "Third law (action–reaction)", body: "If A pushes B with force `F`, then B pushes A with force `−F`. The two forces act on *different* objects." },
    ],
    materials: [
      { item: "A small coin (1 Birr or any coin)" },
      { item: "A stiff card (playing card, ID card, or thick paper)" },
      { item: "A small empty cup or glass" },
    ],
    safety: ["Use a plastic cup if you have one, in case it tips over."],
    steps: [
      { text: "Place the card flat on top of the cup, covering the opening." },
      { text: "Balance the coin in the middle of the card, right over the cup's opening." },
      { text: "Flick the card sharply sideways with your finger so it shoots away.", tip: "Flick fast and flat — horizontally, not upward." },
      { text: "Watch what happens to the coin. Then try pulling the card away slowly and compare." },
    ],
    observe: "With a sharp flick, the coin drops straight into the cup. When you pull the card slowly, the coin moves with the card and falls off to the side.",
    explanation: "The card moves so quickly that friction acts on the coin for only a tiny moment, so the coin barely gains any sideways velocity — its inertia keeps it almost still. Once the card is gone, gravity pulls the coin straight down. Pulling slowly lets friction act for longer, dragging the coin along.",
    troubleshooting: [
      { problem: "The coin flies off with the card.", fix: "Flick faster and keep your finger moving parallel to the card. A smoother card (like a playing card) helps." },
      { problem: "The cup tips over.", fix: "Hold the cup steady with your other hand, or use a heavier glass." },
    ],
    video: { youtubeId: "pS60Dv3uzf4", credit: "Make Science Fun" },
    conceptCheck: [
      { q: "Why does the coin fall into the cup instead of flying away with the card?", choices: ["The coin is magnetic", "Its inertia resists the brief sideways force", "Gravity pulls harder on coins", "Air pushes it down"], answerIndex: 1, explanation: "The friction force acts for too short a time to change the coin's motion much." },
      { q: "If you double the net force on an object, what happens to its acceleration (mass unchanged)?", choices: ["Halved", "Unchanged", "Doubled", "Quadrupled"], answerIndex: 2, explanation: "F = m·a. With m fixed, a is proportional to F, so doubling F doubles a." },
    ],
  },
  {
    id: "phy-mech-03-free-fall",
    subject: "physics",
    grade: 11,
    unit: "Mechanics",
    curriculumCode: "PHY-G11-M1.3",
    title: "Galileo's race: stone vs paper",
    summary: "Drop a stone and a sheet of paper, then crumple the paper and race them again. Discover what really controls how fast things fall.",
    estimatedMinutes: 10,
    difficulty: "easy",
    whyItMatters: "Galileo argued 400 years ago that, without air, a feather and a hammer fall at the same rate. Apollo 15 astronauts proved it on the Moon. On Earth, engineers designing the spillway of the Grand Renaissance Dam calculate falling water with g = 9.8 m/s².",
    concept: [
      { heading: "g, the acceleration of gravity", body: "Near Earth's surface, `g ≈ 9.8 m/s²`. It points toward Earth's centre. In a vacuum, a feather and a hammer fall side by side because `g` doesn't depend on mass." },
      { heading: "Air resistance", body: "Air pushes against falling objects. It matters most for light objects with a large surface area. A parachute reaches *terminal velocity* when drag equals its weight." },
    ],
    materials: [
      { item: "A small stone or coin" },
      { item: "Two sheets of paper of equal size" },
    ],
    safety: ["Drop the stone onto soft ground or a mat, away from feet and anything breakable."],
    steps: [
      { text: "Hold the stone in one hand and a flat sheet of paper in the other, at the same height (above your head)." },
      { text: "Drop them both at the same time. Which lands first?", tip: "Ask a friend to watch at floor level — it's easier to judge." },
      { text: "Now crumple the second piece of paper into a tight ball." },
      { text: "Drop the stone and the crumpled paper together. What changed?" },
    ],
    observe: "The flat paper drifts down slowly and lands long after the stone. The crumpled paper and the stone hit the ground at almost the same time.",
    explanation: "Gravity gives every object the same acceleration g, whatever its mass. Flat paper has a large surface, so air resistance slows it a lot. Crumpling it reduces the surface area, so air resistance becomes small and it falls almost like the stone.",
    troubleshooting: [
      { problem: "The stone always lands first, even against crumpled paper.", fix: "Crumple the paper tighter, and make sure you release both at exactly the same moment and height." },
    ],
    video: { youtubeId: "E43-CfukEgs", credit: "BBC / Brian Cox" },
    conceptCheck: [
      { q: "Two balls of different mass are dropped from the same height in a vacuum. Which hits first?", choices: ["The heavier one", "The lighter one", "They hit at the same time", "Depends on size"], answerIndex: 2, explanation: "In free fall, all objects accelerate at the same g regardless of mass." },
      { q: "What made the flat paper fall slowly?", choices: ["Its small mass", "Air resistance on its large surface", "Weaker gravity", "Static electricity"], answerIndex: 1, explanation: "Crumpling the same paper (same mass) made it fall fast, so mass wasn't the cause — surface area and air resistance were." },
    ],
  },
  {
    id: "phy-mech-04-energy",
    subject: "physics",
    grade: 11,
    unit: "Mechanics",
    curriculumCode: "PHY-G11-M3.2",
    title: "Pendulum: watch energy trade places",
    summary: "Build a pendulum from a string and a key, and watch potential energy turn into kinetic energy and back again.",
    estimatedMinutes: 15,
    difficulty: "easy",
    whyItMatters: "Water held behind the Grand Ethiopian Renaissance Dam stores potential energy. When it falls through the turbines, that becomes kinetic energy and then electricity for homes in Bahir Dar and Addis Ababa. Energy isn't created — it's converted, exactly as in your pendulum.",
    concept: [
      { heading: "Kinetic and potential energy", body: "`KE = ½·m·v²` is the energy of motion. Gravitational `PE = m·g·h` is the stored energy of height." },
      { heading: "Conservation of mechanical energy", body: "When only gravity acts, `KE + PE` stays constant. A swinging pendulum keeps trading one for the other. Friction and air drag slowly turn some of it into heat." },
    ],
    materials: [
      { item: "A string about 50 cm long" },
      { item: "A small heavy object (key, washer, or small stone)" },
      { item: "A doorframe, chair, or table edge to hang from" },
    ],
    safety: ["Tie the weight firmly so it can't fly off.", "Keep faces clear of the swing."],
    steps: [
      { text: "Tie the object firmly to one end of the string and hang the other end from a fixed support." },
      { text: "Pull the weight sideways to a chosen height. Don't push it — just release." },
      { text: "Watch how high it swings up on the other side.", tip: "Hold a ruler or book beside it to mark the heights." },
      { text: "Try with a higher starting height. What changes about its speed at the bottom?" },
    ],
    observe: "The weight rises almost to its starting height on the other side, then comes back. It is fastest at the bottom and stops for an instant at each end. Each swing is slightly lower than the last.",
    explanation: "At the highest points the weight has maximum potential energy and no kinetic energy. At the bottom, all that potential energy has become kinetic energy, so it moves fastest. A higher start means more PE and therefore more speed at the bottom. Air resistance removes a little energy each swing, so the motion slowly dies down.",
    troubleshooting: [
      { problem: "The pendulum wobbles in circles.", fix: "Release it gently without pushing sideways, and make sure the support doesn't move." },
      { problem: "It stops after only a few swings.", fix: "Use a heavier, smaller weight and a thin string so air resistance matters less." },
    ],
    video: { youtubeId: "dPyzEeBVQO0", credit: "Mr. D'Antuono" },
    conceptCheck: [
      { q: "Where does the pendulum have the most kinetic energy?", choices: ["At the highest point", "At the lowest point", "Halfway up", "It's the same everywhere"], answerIndex: 1, explanation: "At the lowest point, all the potential energy has been converted into kinetic energy." },
      { q: "Why does each swing get a little lower?", choices: ["Gravity gets weaker", "Energy is lost to air resistance and friction", "The string gets longer", "Mass decreases"], answerIndex: 1, explanation: "Some mechanical energy is converted to heat by air resistance and friction at the pivot." },
    ],
  },
  {
    id: "chem-mol-01-mole",
    subject: "chemistry",
    grade: 11,
    unit: "Stoichiometry",
    curriculumCode: "CHE-G11-S1.1",
    title: "Feel how big Avogadro's number really is — using rice",
    summary: "Weigh 100 grains of rice, then calculate how much a mole of rice would weigh. The answer shows just how tiny atoms are.",
    estimatedMinutes: 30,
    difficulty: "easy",
    whyItMatters: "Pharmacists dose paracetamol by mass, but what matters inside your body is the number of molecules: 500 mg is about 2 × 10²¹ of them. The mole is the bridge between the grams you can weigh and the atoms you can't see.",
    concept: [
      { heading: "What is a mole?", body: "1 mole = 6.022 × 10²³ particles (Avogadro's number `N_A`). It's just a *counting* unit — like 'dozen' = 12, but vastly bigger because atoms are vastly smaller than eggs." },
      { heading: "Molar mass", body: "The molar mass of a substance (g/mol) is the sum of atomic masses on the periodic table. Water H₂O: 2·(1) + 16 = 18 g/mol. So 1 mole of water weighs 18 g." },
      { heading: "Converting mass ↔ moles ↔ particles", body: "Moles = mass / molar mass. Particles = moles × N_A." },
    ],
    materials: [
      { item: "A handful of uncooked rice", localNote: "Teff grains also work, but are much harder to count" },
      { item: "A kitchen scale", localNote: "No scale? A level teaspoon of rice is about 5 g" },
      { item: "Paper, pen and a calculator" },
    ],
    safety: ["No special safety needed."],
    steps: [
      { text: "Count out exactly 100 grains of rice.", tip: "Make 10 piles of 10 — it's easier to check." },
      { text: "Weigh those 100 grains. Mass of 1 grain = total mass ÷ 100." },
      { text: "Multiply: mass of one mole of rice = (mass of 1 grain) × 6.022 × 10²³." },
      { text: "Convert grams → kilograms → tonnes. Compare it to the mass of Mount Entoto or the whole Earth (6 × 10²⁴ kg)." },
    ],
    observe: "One grain weighs about 25 mg. A mole of rice comes out at about 1.5 × 10¹⁹ kg — far more rice than has ever been grown on Earth.",
    explanation: "A mole of water molecules fits in a single 18 g spoonful, but a mole of rice grains would be a mountain range. The same count gives wildly different masses because atoms and molecules are unimaginably smaller than rice grains.",
    troubleshooting: [
      { problem: "My scale shows 0 g for 100 grains.", fix: "Kitchen scales often can't weigh less than a few grams. Weigh 500 grains instead and divide by 500." },
      { problem: "My calculator shows an error.", fix: "Type 6.022 × 10²³ using the EXP or ×10ˣ key: 6.022 EXP 23." },
    ],
    video: { youtubeId: "TEl4jeETVmg", credit: "TED-Ed" },
    conceptCheck: [
      { q: "What does Avogadro's number represent?", choices: ["Mass of one mole in grams", "Number of particles in one mole", "Volume of one mole of gas", "Number of protons in carbon-12"], answerIndex: 1, explanation: "N_A ≈ 6.022 × 10²³ is the number of particles in one mole." },
      { q: "How many moles are in 9 g of water (18 g/mol)?", choices: ["0.5 mol", "2 mol", "9 mol", "162 mol"], answerIndex: 0, explanation: "Moles = mass / molar mass = 9 / 18 = 0.5 mol." },
    ],
  },
  {
    id: "chem-acid-01-ph",
    subject: "chemistry",
    grade: 11,
    unit: "Acids & Bases",
    curriculumCode: "CHE-G11-AB1.1",
    title: "Make your own pH indicator from red cabbage",
    summary: "Boil red cabbage to make a colour-changing indicator, then test lemon juice, vinegar, baking soda, soap and ash water.",
    estimatedMinutes: 35,
    difficulty: "easy",
    whyItMatters: "Injera tastes sour because fermentation lowers the batter's pH from about 7 to 4. Farmers in the Oromia highlands check soil pH because teff grows best between 5.5 and 7.5. Doctors monitor blood pH, which must stay between 7.35 and 7.45.",
    concept: [
      { heading: "Acids and bases", body: "An *acid* donates a proton (H⁺). A *base* accepts a proton. Lemon juice and vinegar are acids; baking soda, soap and ash water are bases." },
      { heading: "The pH scale", body: "`pH = −log₁₀[H⁺]`. Pure water has pH 7 (neutral). pH < 7 is acidic, pH > 7 is basic. Each pH unit is a factor of 10 in [H⁺]." },
      { heading: "Indicators", body: "An *indicator* is a substance whose colour depends on pH. Red cabbage contains *anthocyanin*, a pigment that changes shape — and colour — as [H⁺] changes." },
    ],
    materials: [
      { item: "Half a red cabbage", localNote: "Beetroot works too, with weaker colours" },
      { item: "Hot water and a pot" },
      { item: "3–5 clear cups" },
      { item: "Test substances: lemon juice, vinegar, baking soda, soap water, ash water", localNote: "Ash water: stir a spoon of wood ash into water and let it settle" },
    ],
    safety: [
      "Ask an adult to help with boiling water.",
      "Ash water is a strong base and can irritate skin and eyes. Handle it with a spoon, not your fingers, and wash hands afterwards.",
      "Never taste the test solutions.",
    ],
    steps: [
      { text: "Chop the cabbage. Boil it in just enough water to cover it for 10 minutes. Cool and strain — keep the deep purple liquid." },
      { text: "Pour a little of the purple liquid into each clear cup." },
      { text: "Add a few drops of one test substance to each cup. Don't mix substances.", tip: "Use a clean spoon for each substance." },
      { text: "Observe the colour change in each cup, and arrange the cups from most acidic to most basic." },
    ],
    observe: "Lemon juice and vinegar turn the indicator pink or red. Plain indicator stays purple. Baking soda and soap water turn it blue or green. Ash water turns it green or yellow.",
    explanation: "Anthocyanin changes colour with pH: pink/red means strongly acidic (pH 1–3), purple is near neutral (about 7), blue/green is mildly basic (9–11), and yellow is strongly basic (12+). Universal indicator paper works the same way, using a mix of pigments.",
    troubleshooting: [
      { problem: "The cabbage water is pale.", fix: "Use less water or boil a little longer. More concentrated indicator shows clearer colours." },
      { problem: "All the cups look the same purple.", fix: "Add more of each test substance, and view the cups against a white sheet of paper." },
    ],
    video: { youtubeId: "PKUwxQI0wIo", credit: "Royal Institution" },
    conceptCheck: [
      { q: "A solution has pH = 4. How does its [H⁺] compare to one with pH = 6?", choices: ["100× higher", "2× higher", "100× lower", "The same"], answerIndex: 0, explanation: "Each pH unit is a 10× change. 6 − 4 = 2 units, so [H⁺] at pH 4 is 10² = 100× higher than at pH 6." },
      { q: "The indicator turns green when you add soap water. Soap water is…", choices: ["Strongly acidic", "Neutral", "Basic", "Impossible to tell"], answerIndex: 2, explanation: "Blue/green means the solution is basic." },
    ],
  },
  {
    id: "bio-cell-01-organelles",
    subject: "biology",
    grade: 11,
    unit: "Cell biology",
    curriculumCode: "BIO-G11-C1.1",
    title: "See real plant cells without a microscope (onion skin)",
    summary: "Peel the thin inner skin of an onion and hold it to the light to see rows of real plant cells.",
    estimatedMinutes: 15,
    difficulty: "easy",
    whyItMatters: "Every cup of bunna comes from coffee plant cells, and injera ferments because yeast cells divide. When doctors at Black Lion Hospital diagnose disease, they look at cells under a microscope. Ethiopian medical and crop research all starts with understanding what's inside a single cell.",
    concept: [
      { heading: "Prokaryotic vs eukaryotic cells", body: "Prokaryotes (bacteria) have no membrane-bound nucleus. Eukaryotes (plants, animals, fungi) have a true nucleus and many membrane-bound organelles." },
      { heading: "Key organelles", body: "- *Nucleus*: stores DNA, controls the cell.\n- *Mitochondria*: release energy (ATP).\n- *Ribosomes*: build proteins.\n- *Chloroplasts* (plants only): photosynthesis." },
      { heading: "Plant vs animal cells", body: "Plant cells also have a rigid *cell wall* made of cellulose and a large central *vacuole*. That's why plant cells look like neat bricks." },
    ],
    materials: [
      { item: "1 fresh onion" },
      { item: "A knife to cut it (ask an adult to help)" },
      { item: "A bright window or strong lamp" },
      { item: "A magnifying glass, if you have one", localNote: "A drop of water on clear plastic also magnifies a little" },
      { item: "Iodine antiseptic (optional) to stain the cells" },
    ],
    safety: ["Ask an adult to cut the onion.", "If you use iodine, don't let it touch your eyes or mouth."],
    steps: [
      { text: "Cut the onion and peel off one layer. Each layer is a curved white sheet." },
      { text: "On the inside (concave) surface, find the very thin transparent skin. Gently peel a small piece with your nail.", tip: "The thinner the piece, the clearer the cells." },
      { text: "Lay it flat on a piece of clear plastic or glass. Optional: add one drop of diluted iodine." },
      { text: "Hold it up to bright light and look carefully, using the magnifier if you have one." },
    ],
    observe: "Tiny rectangular cells line up like bricks in a wall. With iodine, each cell shows a darker round dot inside.",
    explanation: "The clear outlines are cell walls, made of cellulose — a feature of plant cells only. The darker dot is the nucleus, which holds the cell's DNA. Onion skin cells have no chloroplasts because they grow underground, away from light.",
    troubleshooting: [
      { problem: "I just see a blurry sheet.", fix: "Your piece is too thick or folded. Peel a smaller, thinner piece and lay it completely flat." },
      { problem: "I can't see any nucleus.", fix: "Stain it with a drop of diluted iodine and wait one minute." },
    ],
    video: { youtubeId: "Xc5HPAzXbZw", credit: "Microbehunter" },
    conceptCheck: [
      { q: "Which structure is found in plant cells but NOT animal cells?", choices: ["Mitochondria", "Cell wall", "Nucleus", "Ribosomes"], answerIndex: 1, explanation: "Cell walls (cellulose) are a defining plant feature. Animals have only a flexible cell membrane." },
      { q: "Why don't onion skin cells look green?", choices: ["They have no chloroplasts", "They are dead", "They have no nucleus", "They are animal cells"], answerIndex: 0, explanation: "The onion bulb grows underground, so its cells don't photosynthesise and have no chloroplasts." },
    ],
  },
  {
    id: "bio-div-01-mitosis-meiosis",
    subject: "biology",
    grade: 11,
    unit: "Cell biology",
    curriculumCode: "BIO-G11-C2.1",
    title: "Watch mitosis grow a plant from a single seed",
    summary: "Sprout beans on damp cotton and measure root growth every day — mitosis made visible.",
    estimatedMinutes: 15,
    difficulty: "easy",
    whyItMatters: "A teff farmer plants one seed and harvests thousands. Every cell of the growing plant came from mitosis. The new seeds came from meiosis, which mixes genes — that's why breeders at the Debre Zeit Agricultural Research Center can select for drought tolerance.",
    concept: [
      { heading: "Mitosis: one becomes two identical cells", body: "Mitosis produces two genetically identical *diploid* daughter cells (2n → 2n). It's used for growth, tissue repair and asexual reproduction." },
      { heading: "Meiosis: one becomes four varied cells", body: "Meiosis produces four genetically different *haploid* gametes (2n → n), through two divisions in a row." },
    ],
    materials: [
      { item: "5–6 bean or chickpea seeds", localNote: "Any dried beans from the kitchen" },
      { item: "A small dish or plate" },
      { item: "Cotton wool or a thick cloth" },
      { item: "Water and a ruler" },
    ],
    safety: ["Wash your hands after handling seeds and damp cotton."],
    steps: [
      { text: "Soak the seeds in water overnight.", tip: "Soaking softens the seed coat so they sprout faster." },
      { text: "Soak the cotton until damp but not dripping. Place it on the dish and lay the seeds on top." },
      { text: "Put the dish somewhere warm but out of direct sun. Keep the cotton damp every day." },
      { text: "Each day for a week, measure and record the root length in a table." },
    ],
    observe: "After 1–3 days a tiny white root appears, then grows longer every day. A shoot follows a few days later.",
    explanation: "Every new cell in the root and shoot came from mitosis: cells near the root tip divide again and again, and each daughter cell has the same DNA. Meiosis only happens later, when the grown plant makes pollen and egg cells for its own seeds.",
    troubleshooting: [
      { problem: "The seeds went mouldy.", fix: "The cotton was too wet or the dish was sealed. Use less water and leave the dish open to air." },
      { problem: "Nothing sprouted after 4 days.", fix: "Some kitchen beans are too old or were treated. Try a fresh packet, and keep the dish warmer." },
    ],
    video: { youtubeId: "w77zPAtVTuI", credit: "GPhase" },
    conceptCheck: [
      { q: "Which process produces genetically identical daughter cells?", choices: ["Mitosis", "Meiosis", "Fertilization", "Crossing over"], answerIndex: 0, explanation: "Mitosis copies the parent cell exactly. Meiosis and crossing over generate variation." },
      { q: "How many cells does one round of meiosis produce from one starting cell?", choices: ["1", "2", "4", "8"], answerIndex: 2, explanation: "Meiosis is two divisions in a row, producing 4 haploid daughter cells from one diploid parent." },
    ],
  },
  {
    id: "bio-gen-01-dna-structure",
    subject: "biology",
    grade: 11,
    unit: "Genetics",
    curriculumCode: "BIO-G11-G1.1",
    title: "Extract real DNA from a strawberry",
    summary: "Use soap, salt and cold alcohol to pull visible strands of DNA out of a strawberry — the experiment from our first school session with The Science Basement.",
    estimatedMinutes: 30,
    difficulty: "medium",
    whyItMatters: "Researchers at the Ethiopian Biodiversity Institute sequence the DNA of Ethiopian crops to find genes for drought tolerance and disease resistance. Doctors testing for sickle cell disease are reading one letter in one gene. It all starts by getting DNA out of cells — exactly what you'll do today.",
    concept: [
      { heading: "What is DNA made of?", body: "DNA is a long chain of *nucleotides*. Each has a sugar, a phosphate group and one of four bases — *A*, *T*, *G* or *C*. The order of the bases is the genetic code." },
      { heading: "The double helix", body: "DNA is two strands twisted into a *double helix*. A always pairs with T, and G always pairs with C." },
      { heading: "Where DNA lives", body: "In plant and animal cells, DNA is inside the *nucleus*, wrapped by membranes made of fats. To extract it you must break those membranes open." },
    ],
    materials: [
      { item: "1 ripe strawberry (or 2–3 small ones)", localNote: "Banana or kiwi also work, with less DNA" },
      { item: "A zip-lock bag or any clean plastic bag" },
      { item: "1 teaspoon dish soap" },
      { item: "A pinch of table salt (about ¼ teaspoon)" },
      { item: "About 100 ml clean water" },
      { item: "A coffee filter or a clean piece of cloth" },
      { item: "A clear cup or small glass" },
      { item: "Ice-cold rubbing alcohol, kept in the freezer for 30 minutes", localNote: "From a pharmacy. An adult may use strong araki if needed." },
      { item: "A toothpick or thin wooden skewer" },
    ],
    safety: [
      "Rubbing alcohol is flammable and poisonous. Keep it away from flames and never drink it. An adult should handle it.",
      "Work in a well-ventilated room.",
    ],
    steps: [
      { text: "In a cup, gently stir together the water, salt, and dish soap. Don't make foam." },
      { text: "Remove the green leaves from the strawberry, put it in the bag, and seal it. Squish with your fingers for about 2 minutes until it is a smooth pulp." },
      { text: "Pour the soap-salt-water mixture into the bag. Seal and gently squish to mix for one more minute.", tip: "Squish gently — rough mixing breaks the DNA into short pieces." },
      { text: "Pour the bag's contents through the coffee filter or cloth into a clear cup. Wait until you have a clear pink-red juice." },
      { text: "Tilt the cup. Very slowly pour an equal amount of ice-cold alcohol down the inside so it floats on top as a separate layer.", tip: "Do not stir or mix the layers." },
      { text: "Watch where the alcohol meets the juice. Within a minute, white cloudy strands will rise into the alcohol." },
      { text: "Dip in the toothpick and slowly twist to lift the white strands out." },
    ],
    observe: "A white, stringy, cloudy substance appears at the boundary between the juice and the alcohol and floats up into the alcohol layer.",
    explanation: "That white substance is DNA — billions of molecules tangled together so they're visible. The soap broke open the fatty cell and nuclear membranes. The salt neutralised the negative charges on DNA so the strands clump. The cold alcohol pulled the DNA out of solution, because DNA does not dissolve in alcohol. Strawberries have eight copies of every chromosome, so they give a lot of DNA.",
    troubleshooting: [
      { problem: "No white strands appeared.", fix: "The alcohol must be really cold — freeze it for at least 30 minutes. Also check you poured it slowly so it formed a separate layer." },
      { problem: "The layers mixed together.", fix: "Pour the alcohol even more slowly down the tilted side of the cup, or along the back of a spoon." },
      { problem: "I only see tiny bubbles, not strands.", fix: "Squish the strawberry more thoroughly in step 2, and wait 2–3 minutes for the DNA to rise." },
    ],
    video: { youtubeId: "zMw44VDqf2s", credit: "NHGRI (genome.gov)" },
    conceptCheck: [
      { q: "What was the job of the dish soap?", choices: ["To colour the DNA", "To break open the fatty cell and nuclear membranes", "To make the DNA heavier", "To kill bacteria"], answerIndex: 1, explanation: "Membranes are made of lipids (fats); soap dissolves them, releasing the DNA." },
      { q: "In DNA, which bases pair with each other?", choices: ["A–G and T–C", "A–T and G–C", "A–C and T–G", "Any base can pair with any base"], answerIndex: 1, explanation: "Adenine always pairs with thymine, and guanine always pairs with cytosine." },
    ],
  },

  // ======================= GRADE 12 =======================
  {
    id: "g12-phy-electromagnet",
    subject: "physics",
    grade: 12,
    unit: "Electromagnetism",
    title: "Build an electromagnet from a nail",
    summary: "Wrap wire around an iron nail, connect a battery, and pick up pins. Then change the number of turns and measure the difference.",
    estimatedMinutes: 30,
    difficulty: "medium",
    whyItMatters: "Electromagnets are inside every electric motor, loudspeaker and power transformer — from the grain mills in rural towns to the turbines at Gibe III. Scrapyard cranes use giant electromagnets to lift cars. Your nail works on exactly the same principle.",
    concept: [
      { heading: "Current makes a magnetic field", body: "Any electric current produces a magnetic field around the wire. Coiling the wire into a *solenoid* concentrates the field inside the coil." },
      { heading: "Making it stronger", body: "An iron core greatly strengthens the field. The field inside a solenoid is `B = μ·n·I`, so more turns per length (`n`) or more current (`I`) make a stronger magnet." },
    ],
    materials: [
      { item: "A large iron nail (about 8–10 cm)" },
      { item: "About 1 m of thin insulated copper wire", localNote: "Strip it from an old phone charger cable" },
      { item: "A 1.5 V D-cell or AA battery and some tape" },
      { item: "Paper clips or pins" },
      { item: "Sandpaper or a knife to strip the wire ends (adult help)" },
    ],
    safety: [
      "Use only small batteries — never a car battery or wall socket.",
      "The wire and battery can get hot. Connect only for a few seconds at a time.",
      "Ask an adult to strip the wire ends with a knife.",
    ],
    steps: [
      { text: "Strip about 2 cm of insulation from both ends of the wire." },
      { text: "Wrap the wire tightly around the nail 20 times, all in the same direction. Leave both ends free.", tip: "Neat, tight turns work best." },
      { text: "Tape one end of the wire to each terminal of the battery." },
      { text: "Hold the nail tip near the paper clips and count how many it picks up. Disconnect the battery." },
      { text: "Add 20 more turns (40 total) and repeat. Then try 60 turns." },
    ],
    observe: "With current flowing, the nail picks up paper clips; when you disconnect the battery, most of them drop. More turns pick up more clips.",
    explanation: "The current in the coil creates a magnetic field that magnetises the iron core. More turns means a stronger field, as `B = μ·n·I` predicts. When the current stops, the field disappears — which is why electromagnets can be switched on and off, unlike permanent magnets.",
    troubleshooting: [
      { problem: "Nothing is attracted.", fix: "Check the bare wire ends make good contact with the battery terminals, and that the insulation was fully removed." },
      { problem: "Clips stay stuck after I disconnect.", fix: "The nail has become slightly permanently magnetised (common with steel nails). That's normal — tap it on a table to reduce it." },
      { problem: "The battery gets hot quickly.", fix: "You've made a short circuit. Disconnect between tests and only connect for a few seconds." },
    ],
    conceptCheck: [
      { q: "What happens to the electromagnet's strength if you double the number of turns?", choices: ["It halves", "It stays the same", "It roughly doubles", "It becomes zero"], answerIndex: 2, explanation: "B is proportional to the number of turns per length, n." },
      { q: "Why does the electromagnet drop the clips when the battery is disconnected?", choices: ["The nail gets cold", "No current means no magnetic field", "The clips get heavier", "Gravity increases"], answerIndex: 1, explanation: "The magnetic field exists only while current flows through the coil." },
    ],
  },
  {
    id: "g12-chem-reaction-rate",
    subject: "chemistry",
    grade: 12,
    unit: "Chemical kinetics",
    title: "Race fizzing tablets in hot and cold water",
    summary: "Time how long an effervescent tablet takes to dissolve at different temperatures and particle sizes, and plot reaction rate.",
    estimatedMinutes: 30,
    difficulty: "easy",
    whyItMatters: "Food in a refrigerator spoils more slowly because cold slows chemical reactions. Factories that make cement, fertiliser or medicine control temperature and particle size to make reactions run at exactly the right speed. This experiment measures the same effects with a fizzy tablet.",
    concept: [
      { heading: "Collision theory", body: "Particles must *collide* with enough energy (the *activation energy*) to react. Anything that makes useful collisions more frequent speeds up the reaction." },
      { heading: "Factors affecting rate", body: "- *Temperature*: faster particles collide more often and with more energy.\n- *Surface area*: smaller pieces expose more particles to collisions.\n- *Concentration*: more particles per volume means more collisions." },
    ],
    materials: [
      { item: "4 effervescent tablets", localNote: "Effervescent vitamin C or antacid tablets from a pharmacy" },
      { item: "3 clear cups" },
      { item: "Cold water (from the fridge), room-temperature water and warm water" },
      { item: "A timer or phone" },
      { item: "A thermometer, if you have one (optional)" },
    ],
    safety: ["Use warm tap water, not boiling water.", "Don't drink the solutions."],
    steps: [
      { text: "Fill three cups with the same amount (about 150 ml) of cold, room-temperature and warm water." },
      { text: "Drop one whole tablet into the cold water and start the timer. Stop it when the fizzing stops." },
      { text: "Repeat with room-temperature water, then warm water." },
      { text: "Crush the last tablet into powder and repeat with room-temperature water.", tip: "Crush it inside a folded paper with the back of a spoon." },
      { text: "Record all the times in a table and compare." },
    ],
    observe: "The tablet dissolves fastest in warm water and slowest in cold water. The crushed tablet finishes much faster than the whole tablet at the same temperature.",
    explanation: "The fizz is carbon dioxide made by an acid–carbonate reaction. In warm water, particles move faster and collide more often with enough energy to react. Crushing the tablet increases its surface area, so more particles can react at once. Both increase the reaction rate, as collision theory predicts.",
    troubleshooting: [
      { problem: "The times are very close together.", fix: "Make the temperature difference bigger (fridge-cold vs warm), and use the same volume of water each time." },
      { problem: "It's hard to tell when fizzing stops.", fix: "Stop the timer when the last solid piece disappears instead." },
    ],
    conceptCheck: [
      { q: "Why does the tablet react faster in warm water?", choices: ["Warm water has more oxygen", "Particles move faster and collide more often with enough energy", "Warm water is denser", "The tablet is softer"], answerIndex: 1, explanation: "Higher temperature increases both collision frequency and the fraction of collisions above the activation energy." },
      { q: "Crushing the tablet speeds up the reaction because it…", choices: ["Increases surface area", "Raises the temperature", "Adds a catalyst", "Removes the carbonate"], answerIndex: 0, explanation: "More exposed surface means more particles available to collide at once." },
    ],
  },
  {
    id: "g12-bio-catalase-enzyme",
    subject: "biology",
    grade: 12,
    unit: "Enzymes",
    title: "Find the enzyme in a potato",
    summary: "Add hydrogen peroxide to raw and boiled potato and watch the enzyme catalase at work — then see what heat does to it.",
    estimatedMinutes: 25,
    difficulty: "medium",
    whyItMatters: "Enzymes make bread rise, turn milk into ergo and cheese, and are used in washing powders and medicine. Your own liver is packed with catalase to break down harmful hydrogen peroxide. Understanding why enzymes stop working at high temperature explains why a high fever is dangerous.",
    concept: [
      { heading: "Enzymes are biological catalysts", body: "Enzymes are proteins that speed up reactions without being used up. Catalase speeds up the breakdown of hydrogen peroxide: `2H₂O₂ → 2H₂O + O₂`." },
      { heading: "Denaturation", body: "Each enzyme has an *active site* with a precise shape. High temperatures change that shape — the enzyme is *denatured* and stops working, permanently." },
    ],
    materials: [
      { item: "A raw potato" },
      { item: "A boiled potato (cooled)" },
      { item: "3% hydrogen peroxide", localNote: "Sold in pharmacies as a wound cleaner" },
      { item: "3 small clear cups or glasses" },
      { item: "A knife and a small spoon" },
    ],
    safety: [
      "Hydrogen peroxide can irritate eyes and skin. Wear gloves or wash immediately if it touches your skin. Never drink it.",
      "Ask an adult to help with cutting and boiling.",
    ],
    steps: [
      { text: "Cut equal-sized small cubes of raw potato and boiled potato (about 1 cm each)." },
      { text: "Pour about 2 cm of hydrogen peroxide into each of the three cups." },
      { text: "Cup 1: add the raw potato pieces. Cup 2: add the boiled potato pieces. Cup 3: add nothing (control)." },
      { text: "Watch for 2 minutes and compare the amount of bubbles.", tip: "Grating the raw potato gives even more bubbles — more surface area." },
    ],
    observe: "The raw potato fizzes with lots of small bubbles. The boiled potato produces almost none. The control cup with no potato shows no bubbles.",
    explanation: "Raw potato cells contain catalase, which rapidly breaks hydrogen peroxide into water and oxygen gas — the bubbles. Boiling denatured the catalase, changing its active site so it can no longer bind hydrogen peroxide. The control shows the peroxide doesn't break down quickly on its own.",
    troubleshooting: [
      { problem: "Very few bubbles even with raw potato.", fix: "Your hydrogen peroxide may be old (it slowly breaks down). Use a fresh bottle, and grate the potato for more surface area." },
      { problem: "The boiled potato still bubbled a lot.", fix: "It wasn't boiled long enough to denature all the enzyme. Boil for at least 5 minutes." },
    ],
    conceptCheck: [
      { q: "What gas is in the bubbles?", choices: ["Carbon dioxide", "Hydrogen", "Oxygen", "Nitrogen"], answerIndex: 2, explanation: "Catalase breaks 2H₂O₂ into 2H₂O + O₂." },
      { q: "Why does the boiled potato produce almost no bubbles?", choices: ["Boiling removed all the water", "The enzyme was denatured by heat", "Boiled potatoes have more starch", "The peroxide was used up"], answerIndex: 1, explanation: "Heat changes the shape of the enzyme's active site, so it can no longer catalyse the reaction." },
    ],
  },
];

export function getExperiment(id: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.id === id);
}

export function experimentsBy(filter: { grade?: Grade; subject?: Subject } = {}): Experiment[] {
  return EXPERIMENTS.filter(
    (e) =>
      (filter.grade === undefined || e.grade === filter.grade) &&
      (filter.subject === undefined || e.subject === filter.subject)
  );
}

/** Previous/next experiment in the same subject, ordered by grade. */
export function adjacentExperiments(id: string): { prev?: Experiment; next?: Experiment } {
  const exp = getExperiment(id);
  if (!exp) return {};
  const siblings = experimentsBy({ subject: exp.subject });
  const i = siblings.findIndex((e) => e.id === id);
  return { prev: siblings[i - 1], next: siblings[i + 1] };
}

export function toCatalogItem(e: Experiment): CatalogItem {
  return {
    id: e.id,
    subject: e.subject,
    grade: e.grade,
    unit: e.unit,
    title: e.title,
    summary: e.summary,
    estimatedMinutes: e.estimatedMinutes,
    difficulty: e.difficulty,
    hasVideo: !!e.video,
    materialsCount: e.materials.length,
    free: isFreeGuide(e.id),
  };
}

/** Summaries of every experiment. Safe to pass to client components. */
export function getCatalog(): CatalogItem[] {
  return EXPERIMENTS.map(toCatalogItem);
}
