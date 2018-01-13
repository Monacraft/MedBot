// Welcome to the code, remember to keep a seperate copy for public and dev build
// For any queries, contact Monacraft

const Discord = require("discord.js");
const client = new Discord.Client();
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
var roleJustJoined = '';
var roleUnswElder = '';
var collegeA = '';
var collegeB = '';
var collegeC = '';
var collegeD = '';
var role_1 = '';
var role_2 = '';
var fun_GameNights = '';
var fun_Minecraft = '';
var token;
var welcomeID = '400133865487990804';

var numbers = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];
var reactA = '🇦';
var reactB = '🇧';
var reactC = '🇨';
var reactD = '🇩';

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
   ${plus}  - Phase 2/3 UNSW Med Student
   ${hospital}  - Meidicine but not at UNSW
   ${ok}  - I don't do medicine, but thanks for asking

Select one please (Step 1 of 3):
 `, `
What College are you in?
 (If you haven't found out, react to this whenever you do)

   ${reactA} - College A
   ${reactB} - College B
   ${reactC} - College C
   ${reactD} - College D

Select one please (Step 1.5 of 3):
`, `
Ok!
Finally, would you like to be tagged for game nights?
These are occasional online events we hold like poker, .io games, minecraft and more

React ${dice} if you would like to notified for them.
Otherwise react ${fail} (Step 2 of 3)
`, `
Hope you enjoy your stay !!!
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

client.on('ready', () => {
    client.user.setGame("Welcome to UNSW Medicine");
    console.log(`Logged in as ${client.user.tag}!`);

    welcomeChannel = client.guilds.get(guildID).channels.get(welcomeID);
    client.guilds.get(guildID).channels.get(welcomeID).fetchMessages({ limit: 10 }).then(
        messages => {
            messages.map(function (obj) {
                if (obj.content.substring(0, 9) === welcome[4].substring(1, 10) && obj.author.id === myID) {
                    client.guilds.get(guildID).channels.get(welcomeID).fetchMessage(obj.id).then(
                        msg => {
                            msg.delete();
                        }
                    ).catch(console.error)
                }
            });
        }
    ).catch(console.error);

    roleMedicine = client.guilds.get(guildID).roles.find('name', 'Medicine').id;
    roleMedButNotUnsw = client.guilds.get(guildID).roles.find('name', 'MedbutnotUNSW').id;
    roleNotMed = client.guilds.get(guildID).roles.find('name', 'Normies').id;
    roleUnswElder = client.guilds.get(guildID).roles.find('name', 'Phase 2 & 3').id;
    collegeA = client.guilds.get(guildID).roles.find('name', 'College A').id;
    collegeB = client.guilds.get(guildID).roles.find('name', 'College B').id;
    collegeC = client.guilds.get(guildID).roles.find('name', 'College C').id;
    collegeD = client.guilds.get(guildID).roles.find('name', 'College D').id;
    role_1 = client.guilds.get(guildID).roles.find('name', '1st Year').id;
    role_2 = client.guilds.get(guildID).roles.find('name', '2nd Year').id;
    fun_GameNights = client.guilds.get(guildID).roles.find('name', 'gamenights').id;
    client.guilds.get(guildID).channels.get(welcomeID).send(welcome[4]);
});

var pongCount = 0;
client.on('message', msg => {
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
    if (msg.author.id === myID) {
        if (shutdown) {
            process.exit();
        }
    }
    if (msg.content === "m!test") {
        client.channels.get("400109523118850078").send("⭐ Hello " + msg.author + " and Welcome to the UNSW Medicine Discord!");
        msg.author.send("For the following messages, react options will appear one-by-one and possibly out of order: ").then(
            msg.author.send(welcome[0]).then(message => {
                message.react(numbers[1]);
                message.react(numbers[2]);
                message.react(plus);
                message.react(hospital);
                message.react(ok);
            })
        );
    }
    if (msg.channel.type === "dm") {
        if (msg.author.id !== myID) {
            console.log(msg.content);
        }
    }
});

client.on('messageReactionAdd', (react, user) => {
    //console.log(user.id + ":" + myID + ":" + react.emoji.name);
    if (user.id !== myID) {
        if (react.message.content.substring(0, 19) === welcome[0].substring(1, 20)) {
            var med = false;
            if (react.emoji.name === numbers[1]) {
                client.guilds.get(guildID).members.get(user.id).addRole(role_1);
                client.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === numbers[2]) {
                client.guilds.get(guildID).members.get(user.id).addRole(role_2);
                client.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === hospital) {
                client.guilds.get(guildID).members.get(user.id).addRole(roleMedButNotUnsw);
                client.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
            }
            if (react.emoji.name === plus) {
                client.guilds.get(guildID).members.get(user.id).addRole(roleUnswElder);
                client.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === ok) {
                react.message.delete();
                client.guilds.get(guildID).members.get(user.id).addRole(roleNotMed);
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });
            }
            if (med) {
                react.message.delete();
                react.message.channel.send(welcome[1]).then(sentMessage => {
                    sentMessage.react(reactA);
                    sentMessage.react(reactB);
                    sentMessage.react(reactC);
                    sentMessage.react(reactD);
                });
            }
        }
        //console.log(react.message.content.substring(0, 19) + ":" + welcome[1].substring(1, 20));
        if (react.message.content.substring(0, 19) === welcome[1].substring(1, 20)) {
            //console.log("Yes");
            var college = false;
            if (react.emoji.name === reactA) {
                client.guilds.get(guildID).members.get(user.id).addRole(collegeA);
                college = true;
            }
            if (react.emoji.name === reactB) {
                client.guilds.get(guildID).members.get(user.id).addRole(collegeB);
                college = true;
            }
            if (react.emoji.name === reactC) {
                client.guilds.get(guildID).members.get(user.id).addRole(collegeC);
                college = true;
            }
            if (react.emoji.name === reactD) {
                client.guilds.get(guildID).members.get(user.id).addRole(collegeD);
                college = true;
            }
            if (college) {
                react.message.delete();
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });
            }
        }
        if (react.message.content.substring(0, 19) === welcome[2].substring(1, 20)) {
            var done = false;
            if (react.emoji.name === dice) {
                client.guilds.get(guildID).members.get(user.id).addRole(fun_GameNights);
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

client.on('guildMemberAdd', member => {
    if (member.guild.id === guildID) {
        client.guilds.get(guildID).channels.get(welcomeID).fetchMessages({ limit: 4 }).then(
            messages => {
                messages.map(function (obj) {
                    if (obj.content.substring(0, 9) === welcome[4].substring(1, 10) && obj.author.id === myID) {
                        client.guilds.get(guildID).channels.get(welcomeID).fetchMessage(obj.id).then(
                            msg => {
                                msg.delete();
                            }
                        ).catch(console.error)
                    }
                });
            });
        client.channels.get(welcomeID).send("⭐ Hello " + member.user + " and Welcome to the UNSW Medicine Discord!").then(message => {
            client.channels.get(welcomeID).send(welcome[4]);
        });
        member.user.send("For the following messages, react options will appear one-by-one and possibly out of order: ").then(
            member.user.send(welcome[0]).then(message => {
                message.react(numbers[1]);
                message.react(numbers[2]);
                message.react(plus);
                message.react(hospital);
                message.react(ok);
            })
        );
    }
});

client.login(process.env.BOT_TOKEN);
