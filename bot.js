// Welcome to the code, remember to keep a seperate copy for public and dev build
// For any queries, contact Monacraft

const Discord = require("discord.js");
const medBot = new Discord.Client();
var fs = require('fs');

// Build in ID's
var myID = '397363815861452801';
var devID = '130568487679688704';
var guildID = '285213646244806656';
var lastMessageID = '';
var oldMessage = '';
var shutdown = false;
var accept = '✅';
var fail = '❌';
var stored = {};
var roles = [];
var roleMedicine = '';
var roleMedButNotUnsw = '';
var role_1 = '';
var role_2 = '';
var role_3 = '';
var role_4 = '';
var role_5 = '';
var role_6 = '';
var fun_GameNights = '';
var fun_Minecraft = '';

var welcomeID = '400133865487990804';

var numbers = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];

var plus = '➕';
var hospital = '🏥';
var ok = '👌';
var dice = '🎲';

var welcome = [`
__**\`Welcome To UNSW Medicine Discord\`**__
Play games, ask questions or get a little study done ;)


Before that, why don't you fill me in on who you are:

   ${numbers[1]}  - 1st Year UNSW Med Student
   ${numbers[2]}  - 2nd Year UNSW Med Student
   ${numbers[3]}  - 3rd Year UNSW Med Student
   ${numbers[4]}  - 4th Year UNSW Med Student
   ${numbers[5]}  - 5th Year UNSW Med Student
   ${numbers[6]}  - 6th Year UNSW Med Student
   ${hospital}  - Medicine but not at UNSW
   ${ok}  - I don't do medicine, but thanks for asking

Select one please (Step 1 of 3):
 `, `
We have removed support for colleges in the discord now.
Please contact Monacraft if you get this message
`, `
Ok!
Finally, would you like to be tagged for game nights?
These are occasional online events we hold like poker, .io games, minecraft and more

React ${dice} if you would like to notified for them.
Otherwise react ${fail} (Step 2 of 3)
`, `
Hope you enjoy your stay!
Here are my commands:
\`\`\` - m!help                     These Commands :P
 - m!avatar [username]        Send's that persons profile pic
 - m!dates                    Academic Calendar for UNSW Med

Bot made by Jash. These commands were implemented by Preetham.
\`\`\`
FINISHED!
If you ever have to change your roles, just message an admin.
`, `
__**We hope you enjoy your stay:**__

To get access to the other channels, please react appropriately to me in your private messages.
If you have blocked private messages, change that setting, and re-join the discord.

Here is a permanent invite link: https://discord.gg/Uf3v2wG
Feel free to ask any questions in #general or pm an Admin.
`];


medBot.on('error', console.error);

medBot.on('ready', () => {
    medBot.user.setGame("Welcome to UNSW Medicine");
    console.log(`Logged in as ${medBot.user.tag}!`);

    welcomeChannel = medBot.guilds.get(guildID).channels.get(welcomeID);
    medBot.guilds.get(guildID).channels.get(welcomeID).fetchMessages({ limit: 10 }).then(
        messages => {
            messages.map(function (obj) {
                if (obj.content.substring(0, 9) === welcome[4].substring(1, 10) && obj.author.id === myID) {
                    medBot.guilds.get(guildID).channels.get(welcomeID).fetchMessage(obj.id).then(
                        msg => {
                            // msg.delete();
                        }
                    ).catch(console.error)
                }
            });
        }
    ).catch(console.error);

    roleMedicine = medBot.guilds.get(guildID).roles.find('name', 'Medicine').id;
    roleMedButNotUnsw = medBot.guilds.get(guildID).roles.find('name', 'MedbutnotUNSW').id;
    roleNotMed = medBot.guilds.get(guildID).roles.find('name', 'Normies').id;
    role_1 = medBot.guilds.get(guildID).roles.find('name', '1st Year').id;
    role_2 = medBot.guilds.get(guildID).roles.find('name', '2nd Year').id;
    role_3 = medBot.guilds.get(guildID).roles.find('name', '3rd Year').id;
    role_4 = medBot.guilds.get(guildID).roles.find('name', '4th Year').id;
    role_5 = medBot.guilds.get(guildID).roles.find('name', '5th Year').id;
    role_6 = medBot.guilds.get(guildID).roles.find('name', '6th Year').id;

    fun_GameNights = medBot.guilds.get(guildID).roles.find('name', 'gamenights').id;
    //medBot.guilds.get(guildID).channels.get(welcomeID).send(welcome[4]);
});

var pongCount = 0;
medBot.on('message', msg => {
    if (msg.author.id === devID) {
        // This ID is set to Monacraft's ID
        // Dev Commands
        if (msg.content === 'm!ping') {
            pongCount = 0;
        }
    }
    if (msg.content === "m!avatar") {
        if (msg.author.avatarURL === null || undefined) {
            msg.reply("You do not have an avatar!");
        }
        else {
            msg.reply(msg.author.avatarURL);
        }
    }
    if (msg.content === 'm!ping') {
        pongCount++;
        if (pongCount < 3) {
            msg.reply('Pong!');
        }
    }
    if (msg.content === "m!dates") {
        msg.reply("Key Dates: https://cdn.discordapp.com/attachments/399907273310208001/400135192062459905/unknown.png");
    }
    if (msg.content.toLowerCase() === "uwu") {
     msg.channel.send(" ", { file: "https://cdn.discordapp.com/attachments/285215702774972427/485404754382553098/40591901_10155708527450869_8535339261245784064_n.jpg" });
    }
    if (msg.content.toLowerCase() === "savage") {
     msg.channel.send(" ", { file: "https://media.discordapp.net/attachments/375868257846165506/789464462658109460/unknown.png" });
    }
    if (msg.author.id === myID) {
        if (shutdown) {
            process.exit();
        }
    }
    if (msg.content.substr(0, 3).toLowerCase() === ".e ") {
        var s1 = msg.content.split(':');
        try {
            var s2 = s1[2].split('>');

            var emoji = client.emojis.get(s2[0]);
            msg.channel.send({
                files: [
                    {
                        attachment: emoji.url,
                        name: emoji.name + '.png'
                    }
                ]
            });
            msg.delete();
        } catch (err) {
            console.log("Error: " + msg.content);
        }
    }
    if (msg.content === "m!test") {
        //medBot.channels.get("400133865487990804").send("⭐ Hello " + msg.author + " and Welcome to the UNSW Medicine Discord!");
        msg.author.send("Please react for the appropriate roles: ").then(
            msg.author.send(welcome[0]).then(async function (message) {
                await message.react(numbers[1]);
                await message.react(numbers[2]);
                await message.react(numbers[3]);
                await message.react(numbers[4]);
                await message.react(numbers[5]);
                await message.react(numbers[6]);
                await message.react(hospital);
                await message.react(ok);
            })
        );
    }
    if (msg.channel.type === "dm") {
        if (msg.author.id !== myID) {
            console.log(msg.content);
        }
    }
});

medBot.on('messageReactionAdd', (react, user) => {
    //console.log(user.id + ":" + myID + ":" + react.emoji.name);
    if (user.id !== myID) {
        if (react.message.content.substring(0, 19) === welcome[0].substring(1, 20)) {
            var med = false;
            if (react.emoji.name === numbers[1]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_1);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === numbers[2]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_2);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === numbers[3]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_3);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === numbers[4]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_4);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === numbers[5]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_5);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === numbers[6]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_6);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === hospital) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedButNotUnsw);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleNotMed);
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });                
            }
            if (react.emoji.name === ok) {
                react.message.delete();
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleNotMed);
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });
            }
            if (med) {
                react.message.delete();
                // Used to handle college roles here
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });
            }
        }

        if (react.message.content.substring(0, 19) === welcome[2].substring(1, 20)) {
            var done = false;
            if (react.emoji.name === dice) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(fun_GameNights);
                done = true;
            }
            if (react.emoji.name === fail) {
                done = true;
            }
            if (done) {
                react.message.delete();
                react.message.channel.send(welcome[3]);
            }
        }
    }
});

medBot.on('guildMemberAdd', member => {
     medBot.guilds.get(guildID).channels.get(welcomeID).fetchMessages({ limit: 4 }).then(
         messages => {
             messages.map(function (obj) {
                 if (obj.content.substring(0, 9) === welcome[4].substring(1, 10) && obj.author.id === myID) {
                     medBot.guilds.get(guildID).channels.get(welcomeID).fetchMessage(obj.id).then(
                         msg => {
                             msg.delete();
                         }
                     ).catch(console.error)
                 }
             });
         });
     medBot.channels.get(welcomeID).send("⭐ Hello " + member.user + " and Welcome to the UNSW Medicine Discord!").then(message => {
         medBot.channels.get(welcomeID).send(welcome[4]);
     });
     member.user.send("Please react for the appropriate roles:").then(
        msg.author.send(welcome[0]).then(async function (message) {
            await message.react(numbers[1]);
            await message.react(numbers[2]);
            await message.react(numbers[3]);
            await message.react(numbers[4]);
            await message.react(numbers[5]);
            await message.react(numbers[6]);
            await message.react(hospital);
            await message.react(ok);
        })
     );
});

medBot.login(process.env.BOT_TOKEN);
