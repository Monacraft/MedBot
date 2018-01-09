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

var welcomeMsg = `
__** Welcome To UNSW Medicine Discord **__
Play games, ask questions or get a little study done ;)
Please select the roles appropriate for you...

*UNSW Med Stduents*:
 ${numbers[1]} - 1st Years
 ${numbers[2]} - 2nd Years
 ${reactA} - College A
 ${reactB} - College B
 ${reactC} - College C
 ${reactD} - College D
 
`

client.on('ready', () => {
    client.user.setGame("Welcome to UNSW Medicine");
    console.log(`Logged in as ${client.user.tag}!`);

    roleMedicine = client.guilds.get(guildID).roles.find('name', 'Medicine').id;
    roleMedButNotUnsw = client.guilds.get(guildID).roles.find('name', 'MedbutnotUNSW').id;
    roleJustJoined = client.guilds.get(guildID).roles.find('name', 'New User').id;
    roleUnswElder = client.guilds.get(guildID).roles.find('name', 'Phase 2 & 3').id;
    collegeA = client.guilds.get(guildID).roles.find('name', 'College A').id;
    collegeB = client.guilds.get(guildID).roles.find('name', 'College B').id;
    collegeC = client.guilds.get(guildID).roles.find('name', 'College C').id;
    collegeD = client.guilds.get(guildID).roles.find('name', 'College D').id;
    role_1 = client.guilds.get(guildID).roles.find('name', '1st Year').id;
    role_2 = client.guilds.get(guildID).roles.find('name', '2nd Year').id;
    fun_GameNights = client.guilds.get(guildID).roles.find('name', 'gamenights').id;
    
    /*
        client.guilds.get('237582214525616129').channels.get('389198025530015754').fetchMessages({limit: 10}).then(
        messages => {
            messages.map(function(obj) {
                if(obj.content.substring(0, 9) === welcomeText.substring(1,10) && obj.author.id === myID)
                {
                    client.guilds.get('237582214525616129').channels.get('389198025530015754').fetchMessage(obj.id).then(
                        msg => {
                            msg.delete();
                        }
                    ).catch(console.error)
                }
            })
        }
    ).catch(console.error);
    */

});

var pongCount = 0;
client.on('message', msg => {
    if (msg.author.id === devID) {
        // This ID is set to Monacraft's ID
        // Dev Commands
        if (msg.content === '!shutdown') {
            if (msg.author.id === devID) {
                shutdown = true;
                msg.reply("Goodbye :')");
            }
        }
        if (msg.content === '!ping') {
            pongCount = 0;
        }
    }
    if (msg.content === "!avatar") {
        if (msg.author.avatarURL === null || undefined) {
            msg.reply("You do not have an avatar!");
        }
        else {
            msg.reply(msg.author.avatarURL);
        }
    }
    if (msg.content === '!ping') {
        pongCount++;
        if (pongCount < 3) {
            msg.reply('Pong!');
        }
    }
    if (msg.content === "!dates") {
        msg.reply("Here are some key dates");
        msg.reply("https://cdn.discordapp.com/attachments/399907273310208001/400135192062459905/unknown.png");
    }
    if (msg.author.id === myID) {
        if (shutdown) {
            process.exit();
        }
    }
    if (msg.channel.type === "dm") {
        var exec = false;
        if (msg.author.id !== myID) {
            /*
            if (msg.content === acceptText) {
                exec = true;
                for (var a = 0; a < notAccepted.length; a++) {
                    //console.log(r.id + " : " + notAccepted[a]);
                    if (msg.author.id === notAccepted[a]) {
                        //var m = react.message.guild.members.get(r[u].id);
                        client.guilds.get(guildID).fetchMember(msg.author.id).then(member => {
                            member.removeRole(rolePending);
                            console.log(member.user.username + " accepted conditions");
                            member.addRole(roleAccept);
                            acceptedCount++;
                            msg.author.send(acceptMsg);
                        });
                        notAccepted.splice(a, 1);
                    }
                }
            } else {
                if (!exec) {
                    msg.author.send(failMsg);
                }
            }*/
        }
    }
});


client.on('guildMemberAdd', member => {

});

/*
client.on('guildMemberAdd', member => {
    if (member.guild.id === guildID) {
        if (started === 1) {
            console.log('Welcoming... ' + member.user.username + " with ID: " + member.user.id);

            var guild = client.guilds.get(guildID);
            var thisChannel = guild.channels.get(welcomeChannel);

            member.addRole(rolePending);
            notAccepted.push(member.user.id);
            console.log("Not Accepted Count: " + notAccepted.length);

            setTimeout(autoKick, 60000 * 60 * 24, member.user.id);

            thisChannel.send(`⭐ Hello ${member.user} and welcome to the Medical Knowledge Association!`);
            thisChannel.send("Welcome Log");

            member.user.send(dmText);

        } else {
            console.log('Someone joined but I was not started: ' + member.user.username + " : " + member.user.id);
        }
    }
});
*/
client.login(process.env.BOT_TOKEN);
