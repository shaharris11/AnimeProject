const client = require('./client');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');
    await client.query(`
      DROP TABLE IF EXISTS animes CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS likes CASCADE;
      DROP TABLE IF EXISTS posts CASCADE;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Building All Tables...');
    await client.query(`
      CREATE TABLE animes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        creator VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        link VARCHAR(255) NOT NULL
        );
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email TEXT NOT NULL,
        token VARCHAR(255) NOT NULL
        );
      CREATE TABLE likes (
        id SERIAL PRIMARY KEY,
        userid INTEGER NOT NULL,
        animeid INTEGER NOT NULL
        );
       CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(50),
        animeid INTEGER,
        userid INTEGER,
        description TEXT NOT NULL
       );
      
      `);
  } catch (error) {
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log('Creating Initial Data...');
    await client.query(`
    INSERT INTO animes (name, creator, description, image, link)
    VALUES
      ('Fullmetal Alchemist Brotherhood', 'Hiromu Arakawa', 'Brothers Edward and Alphonse Elric search for the Philsophers Stone, hoping to restore their bodies, which were lost when they attempted to use their alchemy skills to resurrect their deceased mother. Edward, who lost only limbs, joins the State Military, which gives him the freedom to continue the search as he tries to restore his brother, whose soul is tethered to earth by a suit of armor. However, Edward and Alphonse are not the only ones seeking the powerful stone. And as they search, they learn of a plot to transmute the entire country for reasons they cannot comprehend.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHGxd97yq_8jSfNLXM-bIsq4zg9eYJ3L1lqw&usqp=CAU',  'https://www.crunchyroll.com/series/GRGGPG93R/fullmetal-alchemist-brotherhood'), 
      
      ('My Hero Academia', 'Kohei Horikoshi', 'In a world where those with powers are known as Quirks, Izuku Midoriya has aspirations to one day become a hero but there is a catch, he is not a Quirk. After a tragic accident involving his friend Katuski Bakugo, Midoriya is the only one to have stepped forward to help protect Bakugo from a villain, because of his acts, he is given a gift by the worlds greatest hero, All Might. Now, Midoriya attends U.A. School, a school that cultivates the next generation of superheroes.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkyhafqUn4ek5kJt47Xnj4Tlryh9GtrAIhRg&usqp=CAU', 'https://www.crunchyroll.com/series/G6NQ5DWZ6/my-hero-academia?utm_campaign=media_actions&utm_medium=deep_link&utm_source=google'),

      ('TSUKIMICHI Moonlit Fantasy', 'Kei Azumi', 'Makoto Misumi was just an average teenager who suddenly was summoned to another world as a hero. But the goddess of this world called him ugly and took his hero status away from him, then sent him to the ends of the world. He meets dragons, spiders, orcs, dwarves, and many other non-human races in the wastelands. Makoto manages to show promise in the use of magic and fighting, which he would not have been able to do in his former world. He has numerous encounters, but will he be able to survive this new world? A fantasy where a guy who gods and humanity had abandoned tries to reset his life in this new world is about to begin', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6qTG8rKNvgU305pJAQBPsZSiArFxjXwZ0w&usqp=CAU', 'https://www.crunchyroll.com/series/GZJH3D719/tsukimichi--moonlit-fantasy-'),

      ('Solo Leveling', 'Chugong', 'They say whatever does not kill you makes you stronger, but that is not the case for the world is weakest hunter Sung Jinwoo. After being brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo came back with the System, a program only he could see, that is leveling him up in every way. Now, he is inspired to discover the secrets behind his powers and the dungeon that spawned them.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNMqCAxRYJtHwZzHVOfPvXVTtrKSya1mjsw&usqp=CAU', 'https://www.crunchyroll.com/series/GDKHZEJ0K/solo-leveling'),

      ('The Wrong Way to Use Healing Magic', 'Kurokata', 'An ordinary walk home from school turns into an epic journey for Usato. After suddenly being dropped into another world with two fellow students, Usato learns he was summoned there by accident. But things turn around when he discovers a unique aptitude for healing magic! Now, he trains beyond human limitations, using his self-healing abilities to gain absurd strength and unrivaled stamina.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGJQE-_O5iw-ScIAAzJ-M6L6dv8ys2AfXng&usqp=CAU.png', 'https://www.crunchyroll.com/series/G0XHWM1EK/the-wrong-way-to-use-healing-magic'),

      ('Shangri La Frontier', 'Katarina', 'Rakuro Hizutome only cares about one thing: beating crappy VR games. He devotes his entire life to these buggy games and could clear them all in his sleep. One day, he decides to challenge himself and play a popular god-tier game called Shangri La Frontier. But he quickly learns just how difficult it is. Will his expert skills be enough to uncover its hidden secrets?', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn910wo-4dTtlebrp-ytbvmuoytIiuFrXDkw&usqp=CAU', 'https://www.crunchyroll.com/series/G79H23Z8P/shangri-la-frontier'), 

      ('Mashle: Magic and Muscles', 'Hajime Komoto', 'This is a world of magic. This is a world in which magic is casually used by everyone. In a deep, dark forest in this world of magic, there is a boy who is singlemindedly working out. His name is Mash Burnedead, and he has a secret. He can not use magic. All he wanted was to live a quiet life with his family, but people suddenly start trying to kill him one day and he somehow finds himself enrolled in Magic School. There, he sets his sights on becoming a Divine Visionary, the elite of the elite. Will his ripped muscles work against the best and brightest of the wizarding world? The curtain rises on this off-kilter magical fantasy in which the power of being jacked crushes any spell!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9FOVjHKjKjheNHNzjK-4HpS36sr6W-pDFA&usqp=CAU', 'https://www.crunchyroll.com/series/GDKHZEP8W/mashle-magic-and-muscles'),

      ('Villainess Level 99: I May Be the Hidden Boss But I am Not the Demon Lord', 'Satori Tanabata', 'This college kid wants nothing more than a quiet life. So when she is reborn as Yumiella, the hidden villainess of an Otome RPG, she is not exactly thrilled. Still yearning for peace, she abandons her evil duties to live a more discreet life. Until her gamer side kicks in and she accidentally reaches level 99! Now, everyone suspects that she is the infamous Demon Lord. What future awaits her?', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW8scPoJTIezkaYYyPum5Q2wLdZaofdpxhcQ&usqp=CAU', 'https://www.crunchyroll.com/series/GKEH2G099/villainess-level-99-i-may-be-the-hidden-boss-but-im-not-the-demon-lord'),

      ('Jujutsu Kaisen', 'Gege Akutami', 'Follow young Yuji Itadori in this dark supernatural action series as he begins training in the dangerous arts of jujutsu sorcery and explores the violent world of curses! Yuji Itadori eats a cursed finger to save a classmate, and now Ryomen Sukuna, a powerfully evil sorcerer known as the King of Curses, lives in Itadori is soul. Curses are supernatural terrors created from negative human emotions. This cursed energy can be used as a power source by jujutsu sorcerers and cursed spirits alike. Guided by the jujutsu sorcerers, Yuji Itadori joins Tokyo Jujutsu High School, an organization that fights the curses. Mentored by his teacher Satoru Gojo, Itadori befriends Megumi Fushiguro and Nobara Kugisaki, both first-year students.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxuwc0XJo-M0CyQcphYClwW1bOkrJs1hycGQ&usqp=CAU', 'https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen'),

      ('SPYxFAMILY', 'Tatsuya Endo', 'World peace is at stake and secret agent Twilight must undergo his most difficult mission yet—pretend to be a family man. Posing as a loving husband and father, he will infiltrate an elite school to get close to a high-profile politician. He has the perfect cover, except his wife is a deadly assassin and neither knows each other is identity. But someone does, his adopted daughter who is a telepath!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkyTosoAWP3M1g_EFYfrrYDTiDqm0wPvoALw&usqp=CAU', 'https://www.crunchyroll.com/series/G4PH0WXVJ/spy-x-family'),

      ('Dr.Stone', 'Boichi and Riichiro Inagaki', 'Several thousand years after a mysterious phenomenon that turns all of humanity to stone, the extraordinarily intelligent, science-driven boy, Senku Ishigami, awakens. Facing a world of stone and the total collapse of civilization, Senku makes up his mind to use science to rebuild the world. Starting with his super strong childhood friend Taiju Oki, who awakened at the same time, they will begin to rebuild civilization from nothing... Depicting two million years of scientific history from the Stone Age to present day, the unprecedented crafting adventure story is about to begin!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHupV4OvyB-op1ZSEsu7GlMyBussHnAOlu3w&usqp=CAU', 'https://www.crunchyroll.com/series/GYEXQKJG6/dr-stone'),

      ('The UNwanted Undead Adventurer', 'Yu Okano and Jaian', 'Rentt Faina has hunted monsters for the last 10 years. Sadly, he is not great at his job, stuck hunting slimes and goblins for a few coins each day. His luck turns when he finds an undiscovered path. At the path is end, he meets his demise in the maw of a legendary dragon. But, he wakes up as an undead bag of bones! He sets out to achieve Existential Evolution and rejoin the land of the living.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgbb1uMpMME1j-k1fxhBTACMNlYe9XSNmpMA&usqp=CAU', 'https://www.crunchyroll.com/series/GW4HM7WZQ/the-unwanted-undead-adventurer'),

      ('The Daily Life of the Immortal King', 'Kuxuan', 'For cultivation prodigy Wang Ling, defeating a demon king at age 6 is nothing compared to fitting in at highschool. And now with supernatural threats on the rise, Wang may have to put his magic studies on hold to save the world!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI5s2SyEvJxjywzgVi1qQs8pUwRuU7CnKBoA&usqp=CAU', 'https://www.crunchyroll.com/series/GZJH3DJ8E/the-daily-life-of-the-immortal-king'),

      ('Black Cover', 'Yuki Tabata', 'In a world where magic is everything, Asta and Yuno are both found abandoned at a church on the same day. While Yuno is gifted with exceptional magical powers, Asta is the only one in this world without any. At the age of fifteen, both receive grimoires, magic books that amplify their holder is magic. Asta is is a rare Grimoire of Anti-Magic that negates and repels his opponent is spells. Being opposite but good rivals, Yuno and Asta are ready for the hardest of challenges to achieve their common dream, to be the Wizard King. Giving up is never an option!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_HH8yHNetixIryiXAoQy4ZxxyWEXaVH3uhg&usqp=CAU', 'https://www.crunchyroll.com/series/GRE50KV36/black-clover'),

      ('Hells Paradise', 'Yuji Kaku', 'Gabimaru reigns as the strongest and most ruthless assassin in his village. But now finds himself on death row—with only one way out: retrieve the Elixir of Life from a sinister island. Longing for freedom, he accepts the challenge. But with fellow convicts vying for the same prize and demonic beasts lurking, how will Gabimaru survive this harrowing quest?', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-KHKCmxjoLeBopeDB0GNv3MtK2aZhFhfQaA&usqp=CAU', 'https://www.crunchyroll.com/series/GJ0H7Q5ZJ/hells-paradise'),

      ('One Piece', 'Eiichiro Oda', 'Monkey. D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates. With a course charted for the treacherous waters of the Grand Line and beyond, this is one captain who will never give up until he is claimed the greatest treasure on Earth: the Legendary One Piece!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8DeLAcO28yS40Nhspbt69l6BEX69iII5QQ&usqp=CAU', 'https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece'),

      ('The Great Cleric', 'Broccoli Lion', 'After his untimely death, this salaryman gets another shot at life! When Luciel is reborn into a magical new land, he becomes a healer in hopes of leading a peaceful life. However, he quickly learns that being a healer is much more challenging than he expected. With strict and strenuous training in store, this new life is turning out to be anything but peaceful.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gDRTV7Hnz6W3x_l25ZT9WkKuF2E8Klbo3Q&usqp=CAU', 'https://www.crunchyroll.com/series/GG5H5XQ24/the-great-cleric'),

      ('Gintama', 'Hideaki Sorachi', 'In a world where aliens have invaded Edo Period Japan, skyscrapers, trains and motor bikes have replaced the simple life of Earth inhabitants. One man however, still carries the soul of a samurai, Gintoki Sakata, otherwise known as Yorozuya Gin-san. As reckless as he is, Gintoki carries his own resolve and is ready to take on any challenge with his fellow companions.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOBMw_o2mDNh3N94aC3BvX3GFa8iC8Vv7ImA&usqp=CAU', 'https://www.crunchyroll.com/series/GYQ4MKDZ6/gintama'),

      ('Black Butler', 'Yana Toboso', 'Ciel Phantomhive is the most powerful boy in all of England, but he bears the scars of unspeakable suffering. Forced to watch as his beloved parents were brutally murdered, Ciel was subsequently abducted and violently tortured. Desperate to end his suffering, the boy traded his own soul for a chance at vengeance, casting his lot with the one person on whom he could depend, Sebastian, a demon Butler summoned from the very pits of hell. Together, they will prowl the darkest alleys of London on a mission to snuff out those who would do evil.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhFj91OhAkz-qjqKztaDdbW_Zw3OdywaQyOQ&usqp=CAU', 'https://www.crunchyroll.com/series/GYQ43P3E6/black-butler')

        `);
        console.log("created inital data");
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};