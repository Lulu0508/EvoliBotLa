const Discord = require('discord.js')
const fs      = require('fs')
const Embeds  = require('./embed')
const superagent = require("superagent")
const { Client } = require('discord.js');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const yt = require('ytdl-core');
const got = (`got`);
const https = require('https')


var client = new Discord.Client()



client.on('warn', console.warn);
client.on('error', console.error);
client.on('ready', () => console.log(`${client.user.username} is ready!`));
client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));
client.on('reconnecting', () => console.log('I am reconnecting now!'));
client.on("ready", () => {

    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
   
    client.user.setActivity(`#TeamEvoli`)
    // #help | Auf ${client.guilds.size} Servern(Beta 2.2.0)
    client.user.setStatus("online")
    
  });

var COMMANDS = {

    say:               cmd_say,
    help:              cmd_help,
    team:              cmd_team,
    teamliste:         cmd_teamliste

}
function cmd_help(msg, args){
    let EMBED = new Discord.RichEmbed()
    .setTitle(`EVOOOOOOO COMMANDS`)
    .setColor(`#a13806`)
    .addField(`evo!help`, `Dieser command(gibt dir hilfe)`)
    .addField(`evo!team`, `Damit trittst du TeamEvoli bei <:TeamEvoli:462254107139506177>`)
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .setFooter(`Tritt #TeamEvoli bei pls`, client.user.avatarURL)
    msg.channel.send(EMBED)
}
function cmd_say(msg, args){
    if(!args[0]) return msg.channel.send(`<@${msg.author.id}> Evoli(Was Soll ich denn sagen?)`)
    msg.channel.send(args.join(" "))
    msg.delete();
}
function cmd_team(msg, args){
    if(msg.member.roles.has("462254253801603099")) return msg.channel.send(`Evoli(Du bist bereits TeamPikachu möchtest du das Team Verlassen Schreibe pika!team remove)`)
    if(args[0] == "remove") return  msg.member.removeRole("462254647852138517").then(()=>msg.channel.send(`Evoli :sob: (<@${msg.author.id}> hat TeamEvoli Verlassen :sob: )`))
    msg.member.addRole("462254647852138517")
    msg.channel.send(`<@${msg.author.id}> ist TeamEvoli beigetreten ;)`)
}
function cmd_teamliste(msg, args){
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    let Embed = new Discord.RichEmbed()
    .setTitle("Team Evoli")
    .addField("Anzahl", msg.guild.roles.get("462254647852138517").members.array().length)
    .addField("Namen", msg.guild.roles.get("462254647852138517").members.array().toString().replaceAll(",", "\n"))
    .setColor("#a13806")
    .setThumbnail(client.user.avatarURL)
    .setFooter("EvoliBot", client.user.avatarURL)
    .setTimestamp()
    msg.channel.send(Embed)
}
// pikachu role: 462248117786640384
//Evolie role: 462248240553656324
//##Music##\\


client.on('ready', () => {
    console.log('ready!');
    const onlinechannel = client.channels.get('name', 'lobby')
    if(!onlinechannel) return
    msg.onlinechannel.send("Hi bin Online.")
});

// client.on('message', msg => {
// 	if (!msg.content.startsWith(config.prefix)) return;
// 	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0]](msg);
// });
client.on('message', (msg) =>{

    var cont    = msg.content,
        author  = msg.member,
        chan    = msg.channel,
        guild   = msg.guild
        message = msg

        if(cont.startsWith(config.prefix)) {
        //#author.id != client.user.id && 
        var invoke = cont.split(' ')[0].substr(config.prefix.length)
            args   = cont.split(' ').slice(1)

            if(invoke in COMMANDS){
                COMMANDS[invoke](msg, args)
            }
        }
        if(cont.startsWith(config.prefix2)) {
            //#author.id != client.user.id && 
            var invoke = cont.split(' ')[0].substr(config.prefix2.length)
                args   = cont.split(' ').slice(1)
    
                if(invoke in COMMANDS){
                    COMMANDS[invoke](msg, args)
                }
            }
})

client.on("message", (message) => {
    if (message.content.startsWith("<@424629228642893824>")) {
      message.channel.send("Was gibts?");
    }
});



client.login(process.env.token)
