/*
 * To run bot simply start by adding the bot to server by clicking the bots oauth2 link after you've added to bots token on line 126,
 * then open command line and type node embedbot once you have arrived to the correct directory.
 */

const Discord = require("discord.js");
const client = new Discord.Client();

/*
 * List of bot states
 *
 * State 0 = Inactive
 * State 1 = Bot active and awaiting instruction for embed design
 * State 2 = Set title
 * State 3 = Assigning new field name
 * State 4 = Assigning new field value
 * State 5 = Assigning embed color
 * State 6 = Assigning footer text
 * State 7 = Assigning footer icon
 * State 8 = Requesting embed channel destination
 */

var state = 0;
var channel = "";
var tempFieldName = "";
var tempFooterText = "";
var embed = new Discord.RichEmbed()

client.on("message",(message) => {
    if (message.content.startsWith('{'))
    {
        //initiating embed creation from the user
        if (message.content == "{embed")
        {
            message.channel.send("Which channel would you like me to send the embed to? ( {Channel ID )");
            state = 8;
        }

        else if (state == 1)
        {
            //sends the embed to the desired channel
            if (message.content == "{send")
            {
                client.channels.get(channel).send(embed);
                message.channel.send("Sent!");
                state = 0;
            }
            //changes embed title
            else if (message.content.startsWith("{title"))
            {
                message.channel.send("What would you like the title to be?");
                state = 2;
            }
            //adds a field to embed
            else if (message.content.startsWith("{field"))
            {
                message.channel.send("What would you the field name to be?");
                state = 3;
            }
            //changes embed color
            else if (message.content.startsWith("{color"))
            {
                message.channel.send("What color would you like the embed to be? (Hexadecimal format)");
                state = 5;
            }
            //changes embed footer
            else if (message.content.startsWith("{footer"))
            {
                message.channel.send("What would you the footer text to be?");
                state = 6;
            }
        }
        else if (state == 2)
        {
            embed.setTitle("**" + message.content.substring(1) + "**");
            state = 1;
        }
        else if (state == 3)
        {
            tempFieldName = message.content.substring(1);
            message.channel.send("What would you the field value to be?");
            state = 4;
        }
        else if (state == 4)
        {
            embed.addField(name = tempFieldName, value = "```" + message.content.substring(1) + "```");
            state = 1;
        }
        else if (state == 5)
        {
            embed.color = parseInt("0x" + message.content.substring(1), 16);
            state = 1;
        }
        else if (state == 6)
        {
            tempFooterText = message.content.substring(1);
            message.channel.send("What would you the footer icon to be? ( {url )");
            state = 7;
        }
        else if (state == 7)
        {
            embed.setFooter(text = tempFooterText, icon_url = message.content.substring(1));
            state = 1;
        }
        else if (state == 8)
        {
            channel = message.content.substring(1);
            message.channel.send("\n Let's build that embed now\nEnter {help if you would like to see the instructions.");
            state = 1; 
        }
        
        //we all need help sometimes!
        if (message.content == "{help")
        {
            message.channel.send("**Embed Creation Guide**```{title  => allows you to change embeds title\n{field  => allows you to add a field to the embed\n{color  => allows you the change the color of the embed\n{footer => allows you to change the footer details of the embed\n{send   => sends the current embed to the specified channel\n{help   => that takes you here silly!```");
        }
        //posts the embed on current channel if it's in the base state
        else if (state == 1)
        {
            message.channel.send(embed);
        }
    }
})

//Make a bot here https://discordapp.com/developers/applications/ then take it's token and input here
client.login("ENTER_TOKEN_HERE");