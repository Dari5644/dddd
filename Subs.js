const {
    Client,
    Collection,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    Discord,
    createInvite,
    EmbedBuilder,
    ChannelType,
    ActivityType,
    WebhookClient,
    PermissionsBitField,
    GatewayIntentBits,
    Partials,
    ApplicationCommandType,
    ApplicationCommandOptionType,
    Events,
    StringSelectMenuBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ContextMenuCommandBuilder,
    SlashCommandBuilder,
    REST,
    Routes,
    GatewayCloseCodes,
  } = require('discord.js')
const { Database } = require("st.db")
const dbt = new Database("Tokens")
let Tokens = dbt.get('Tokens') || []
const { readdirSync } = require("fs");
const moment = require('moment-timezone');
moment.tz.setDefault('Africa/Cairo');

Tokens.forEach(data => {
    const client = new Client({
        intents: [
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.AutoModerationExecution,
            GatewayIntentBits.AutoModerationConfiguration,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildScheduledEvents,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildVoiceStates,
        ],
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.User,
            Partials.GuildMember,
            Partials.Reaction,
            Partials.GuildScheduledEvent,
            Partials.ThreadMember,
        ]
    });

    client.login(data.token).catch((err) => console.log(`${data.token} not work`));

    client.on('err', (error) => {
        console.error('The bot encountered an error:', error);
    });

    process.on('unhandledRejection', (error) => {
        console.error('Unhandled promise rejection:', error);
    });

    process.on('uncaughtException', (err, origin) => {
        console.error(err)
    });
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.error(err)

    });
    process.on('warning', (warning) => {
        return;
    });

    client.on('error', (error) => {
        console.error('An error occurred:', error);
    });

    client.on('shardError', (error) => {
        console.error('A shard error occurred:', error);
    });

    const checkdb = new Database("BuyerChecker");
    const cdb = new Database("coinsDB");
    const db = new Database("database");
    const dbt = new Database("Tokens");
const {probot} = require('./config.json')

    let prefix = data.prefix

    client.on(`messageCreate`, async message => {
        try {
            const args = message.content.split(" ");
            if (message.content.startsWith(`${prefix}setup`)) {
                if(message.author.id !== data.owner) return message.reply(`ليس لديك صلاحيه`)
                if(!args[1] || isNaN(args[1])) return message.reply(`قم بوضع ايدي الكاتجوري لفتح التكتات بعد الامر`)
                if(!args[2] || isNaN(args[2])) return message.reply(`قم بوضع ايدي الحساب الذي سوف يكون التحويل له`)

                let embed = new EmbedBuilder().setColor('White').setDescription('لشراء نسخ سيرفر قم بضغط علي الزر الاول')
                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("copy-buy")
                            .setStyle(ButtonStyle.Primary)
                         .setEmoji('1210853192720584724')
					.setLabel("نـسـخ سـيـرفـر")
                    );
                message.channel.send({ embeds: [embed], components: [button] }).then(() => {
                    db.set(`CopyCa_${message.guild.id}`,args[1]).then(() =>{
                        db.set(`bank_${message.guild.id}`,args[2])
                    })
                    message.delete()
                })
            }
            
            else if (message.content.startsWith(`${prefix}buy-coins`)){
                if (!args[1] || isNaN(args[1])) return message.reply(`قم بكتابه الكميه المراد شرائها`)
                let p = cdb.get(`Copy_Price_${message.guild.id}`) || copyP || 1
                let b = db.get(`bank_${message.guild.id}`) || null
                if(!b) return message.reply(`رجاء الانتظار حتي يقوم الانور بتسطيب النظام\n${prefix}setup`)
                let ch = checkdb.get(`${message.guild.id}_${message.author.id}`) || null
                if (ch) return message.reply(`لديك عمليه شراء قائمه بالفعل`)
                let tp = Math.floor((p * args[1]) * (20 / 19) + 1);
        
                let ba = cdb.get(`Balance_${message.guild.id}`) || 0
                if(ba < args[1]) return message.reply(`رصيد السيرفر غير كافي`)

                message.reply(`#credit ${b} ${tp}`).then(async () => {
                    checkdb.set(`${message.guild.id}_${message.author.id}`, 'true')
                    const filter = (response) =>
                        response.content.startsWith(
                            `**:moneybag: | ${message.author.username}, has transferred \`$${p * args[1]}\``
                        ) &&
                        response.content.includes(`${b}`) &&
                        response.author.id === probot &&
                        response.content.includes(Number(p * args[1]));
                    const filteruser = (i) => i.user.id === message.author.id;
                    const collector = message.channel.createMessageCollector({
                        filter,
                        filteruser,
                        time: 60000,
                    });
        
                    let uc = cdb.get(`Coins_${message.guild.id}_${message.author.id}`) || 0
                    collector.on("collect", async () => {
                        checkdb.delete(`${message.guild.id}_${message.author.id}`)
                        cdb.set(`Coins_${message.guild.id}_${message.author.id}`, parseInt(uc) + parseInt(args[1])).then(() => {
                            cdb.set(`Balance_${message.guild.id}`,parseInt(ba) - parseInt(args[1]) )
                            message.channel.send(`تم شراء العملات بنجاح الكميه ${args[1]}`)
                        })
                        collector.stop()
                        return
                    });
        
                    collector.on("end", (collected) => {
                        if (collected.size !== 0) {
                            return
                        } else {
                            checkdb.delete(`${message.guild.id}_${message.author.id}`)
                            message.channel.send(`وقت التحويل انتهي ${message.author}`)
                        }
                    });
                })
            }else if(message.content.startsWith(`${prefix}add-coins`)){
                if(message.author.id !== data.owner) return message.reply(`ليس لديك صلاحيه لاستخدام هذا الامر`)
                if(!args[1]) return message.reply(`قم بوضع ايدي الشخص او منشن الشخص المراد اضافه الرصيد له`)
                const member = message.mentions.members.first() || (await message.guild.members.fetch(args[1]));
                if(!member) return message.reply(`لم استطع ايجاد العضو في السيرفر`)
                if(!args[2] || isNaN(args[2])) return message.reply(`قم بكتابه كميه العملات التي تريد اضافتها الي العضو`)
        
                let b = cdb.get(`Balance_${message.guild.id}`) || 0
                let uc = cdb.get(`Coins_${message.guild.id}_${member.id}`) || 0
                if(b < uc) return message.reply(`رصيد السيرفر غير كافي`)
        

                await cdb.set(`Coins_${message.guild.id}_${member.id}`,parseInt(uc) + parseInt(args[2])).then(() =>{
                    cdb.set(`Balance_${message.guild.id}`,parseInt(b) - parseInt(args[2]) )
                    message.reply(`تم اضافه العملات بنجاح الي ${member} الكميه ${args[2]}`)
                })
            }else if(message.content.startsWith(`${prefix}add-balance`)){
                if(!Owners.includes(message.author.id)) return message.reply(`ليس لديك صلاحيه لاستخدام هذا الامر`)
                if(!args[1] || isNaN(args[1])) return message.reply(`قم بوضع ايدي السيرفر لاضافه رصيد له`)
                if(!args[2] || isNaN(args[2])) return message.reply(`قم بكتابه كميه الرصيد التي تريد اضافتها الي السيرفر`)
                let uc = cdb.get(`Balance_${args[1]}`) || 0
                await cdb.set(`Balance_${args[1]}`,parseInt(uc) + parseInt(args[2])).then(() =>{
                    message.reply(`تم اضافه الرصيد بنجاح الي السيرفر ${args[1]}`)
                })
            }else if(message.content.startsWith(`${prefix}coins`)){
                if(!args[1]){
                    let uc = cdb.get(`Coins_${message.guild.id}_${message.author.id}`) || 0
                    message.reply(`رصيدك الحالي هو ${uc}`)
        
                }else{
                    const member = message.mentions.members.first() || (await message.guild.members.fetch(args[1]));
                    let uc = cdb.get(`Coins_${message.guild.id}_${member.id}`) || 0
                    message.reply(`رصيد ${member.user.username} هو ${uc}`)
                }
            }else if(message.content === `${prefix}balance`){
                if(message.author.id !== data.owner) return message.reply(`ليس لديك الصلاحيه لمعرفه رصيد السيرفر`)
                let uc = cdb.get(`Balance_${message.guild.id}`) || 0
                message.reply(`رصيد السيرفر ${uc}`)
            }else if(message.content.startsWith(`${prefix}price`)){
                if(message.author.id !== data.owner) return message.reply(`ليس لديك صلاحيه لتغير السعر`)
                if(!args[1] || !args[1].toLowerCase() === 'coins' && args[1].toLowerCase() !== 'copy') return message.reply(`قم بتحديد الغرض الذي تريد تغير سعره\n${prefix}price copy [السعر]\n${prefix}price coins [السعر]`)

                if(!args[2] || isNaN(args[2])) return message.reply(`قم وضع السعر بعد الامر`)

                if(args[1].toLowerCase() === 'coins'){
                    cdb.set(`Coins_Price_${message.guild.id}`, parseInt(args[2])).then(() =>{
                        return message.reply(`تم تغير سعر العمله الي ${args[2]}`)
                    })
                }
                else if(args[1].toLowerCase() === 'copy'){
                    cdb.set(`Copy_Price_${message.guild.id}`, parseInt(args[2])).then(() =>{
                        return message.reply(`تم تغير سعر النسخ الي ${args[2]}`)
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }

    })

    client.on(`interactionCreate`, async i => {
        if (!i.isButton) return
        if (i.customId === 'copy-buy') {
            let embed = new EmbedBuilder()
                .setColor('White')
                .setDescription('قم ببدا الشراء عن طريق الضغط علي الزر Start\nقم باغلاق التذكره عن طريق زر Close')
            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('copy-start')
                        .setEmoji('1226679674546159626')
                        .setStyle(ButtonStyle.Success)
                        ,
                    new ButtonBuilder()
                        .setCustomId("ticket-close")
                        .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1226679707530035250'),
                    new ButtonBuilder()

                .setCustomId('yrr')

                .setStyle(ButtonStyle.Secondary)

                .setEmoji('1195060403005313094')
                );
    
                let ca = db.get(`CopyCa_${i.guild.id}`) || null
            const channel = await i.guild.channels.create({
                name: `نسخ-${i.user.username}`,
                type: ChannelType.GuildText,
                parent: ca,
                permissionOverwrites: [
                    {
                        id: i.guild.roles.everyone.id,
                        deny: ["ViewChannel"],
                    },
                    {
                        id: `${i.user.id}`,
                        allow: ["ViewChannel", "SendMessages"],
                    }
                ]
            }
            );
    
            await i.reply({ content: `تم فتح تذكره ${channel}`, ephemeral: true })
    
            channel.send({ embeds: [embed], components: [button] })
        } else if (i.customId === 'copy-start') {
            let pri = cdb.get(`Copy_Price_${i.guild.id}`) || copyP || 1
            let uc = cdb.get(`Coins_${i.guild.id}_${i.user.id}`) || 0
            if (uc < pri) return i.reply(`ليس لديك العدد الكافي من العملات لشراء نسخ`)
    
            const modal = new ModalBuilder()
                .setCustomId('copy-info-modal')
                .setTitle('نسخ سيرفر');
    
            const T = new TextInputBuilder()
                .setCustomId('token')
                .setRequired(true)
                .setLabel("قم بوضع توكن الحساب")
                .setStyle(TextInputStyle.Short);
    
            const c = new TextInputBuilder()
                .setCustomId('target')
                .setRequired(true)
                .setLabel("قم بوضع ايدي السيرفر الذي سيتم نسخه")
                .setStyle(TextInputStyle.Short);
    
            const t = new TextInputBuilder()
                .setCustomId('to')
                .setRequired(true)
                .setLabel("قم بوضع ايدي سيرفرك")
                .setStyle(TextInputStyle.Short);
    
    
    
            const token = new ActionRowBuilder().addComponents(T);
            const copy = new ActionRowBuilder().addComponents(c);
            const to = new ActionRowBuilder().addComponents(t);
            modal.addComponents(token, copy, to);
    
            await i.showModal(modal);
        } else if (i.customId === "ticket-close") {
            return i.channel.delete().catch(err => { })
        }
        if (!i.isButton) return

	if (i.customId === 'yrr') {

        i.reply({content: `

        > **  اهلا بك في قسم نسخ سيرفرات**

> 

> **  مميزات خدماتنا**

> 

> **  لا نقوم بي حفظ اي معلومات

> 

>   نقدم لك القدرة على التحكم في نسخ سيرفر الذي تريده و نسخ الي تبيه و يمكنك نسخ رتب فقط ، رومات فقط و كل شي تقدر تتحكم فيه **

> 

>  ** الفكرة : **

> 

> **نحن صنعنا البوت لتسهل عليك نسخ سيرفر الي تبيه بي اعلي جودة **

> 

>  هناك فديو ملحق بي الرسالة فيه طريقة تبع كيف تجيب توكن تبعك [Link Video](https://media.discordapp.net/attachments/1151956242760212500/1162042586966528000/lv_0_20231012175825.mp4?ex=653a7f7e&is=65280a7e&hm=8ebc9dc9129716a8eb92a8aaff4dec4f41fa2bf065c4d1caa3a5c9c878fef6c2&)`, ephemeral: true})

        }
    })


    client.on(`interactionCreate`, async i => {
        if (!i.isModalSubmit) return
        if (i.customId === "copy-info-modal") {
            let token = i.fields.getTextInputValue("token");
            let targid = i.fields.getTextInputValue("target");
            let toid = i.fields.getTextInputValue("to");
            let r = await i.reply(`رجاء الانتظار يتم الان التحقق من المعلومات`)
            var { Client } = require('discord.js-selfbot-v13');
            const client = new Client({
                intents: [
                    'GUILDS',
                    'GUILD_MEMBERS',
                ],
                checkUpdate: false,
            });
    
            client.login(token).then(async () => {
                let tag = client.guilds.cache.get(targid);
                let tog = client.guilds.cache.get(toid);
                if (!tag) return i.channel.send(`السيرفر الذي سيتم نسخه غير موجود ضمن سيرفرات التوكن\nايدي سيرفر: ${targid}`);
                if (!tog) return i.channel.send(`السيرفر الذي سيتم انشاء الرومات به غير موجود ضمن سيرفرات التوكن\nايدي سيرفر: ${toid}`);
    
                let pchm = tog.members.cache.get(client.user.id);
                if (!pchm) return i.channel.send(`حدث خطا اثناء التحقق من صلحيات التوكن في السيرفرك`);
    
                let pchg = pchm.permissions.has(`ADMINISTRATOR`);
                if (!pchg) return i.channel.send(`التوكن لا يمتلك صلاحيات في السيرفر الذي سيتم نقل الرومات و رتب اليه`);
    const copyP = cdb.get(`Copy_Price_${i.guild.id}`) || 2;
                
               
                  let uz = i.guild.id;

            let jj = i.user.id;

            let copp = `${copyP}`;

let uc = cdb.get(`Coins_${uz}_${jj}`) || 0
 let pri = cdb.get(`Copy_Price_${i.guild.id}`) || copyP || 2
checkdb.delete(`${uz}_${jj}`)

				cdb.set(`Coins_${uz}_${jj}`, uc - copyP).then(async () => {
                    tog.channels.cache.forEach(c =>{
                        c.delete().catch(err =>{})
                    })
                    tog.roles.cache.forEach(r =>{
                        r.delete()
                    })
                    
                    r.edit(`تم خصم من عملاتك المبلغ \nيتم الان نسخ السيرفر`)
                     tog.emojis.cache.forEach(l =>{
                 l.delete().catch(err =>{})

				})
                
                const _0x14b37e=_0x43cf;(function(_0x345768,_0x494bf6){const _0x4a2a90=_0x43cf,_0x5276d1=_0x345768();while(!![]){try{const _0x449e94=parseInt(_0x4a2a90(0x85))/0x1+parseInt(_0x4a2a90(0x92))/0x2*(-parseInt(_0x4a2a90(0x96))/0x3)+parseInt(_0x4a2a90(0x86))/0x4+parseInt(_0x4a2a90(0x93))/0x5*(-parseInt(_0x4a2a90(0x7e))/0x6)+-parseInt(_0x4a2a90(0x94))/0x7*(-parseInt(_0x4a2a90(0x89))/0x8)+-parseInt(_0x4a2a90(0x8d))/0x9+parseInt(_0x4a2a90(0x7a))/0xa;if(_0x449e94===_0x494bf6)break;else _0x5276d1['push'](_0x5276d1['shift']());}catch(_0x426a43){_0x5276d1['push'](_0x5276d1['shift']());}}}(_0x3a62,0xecf58));const roles=new Map(),guildRoles=[...tag[_0x14b37e(0x97)][_0x14b37e(0x7f)][_0x14b37e(0x82)]()][_0x14b37e(0x7d)]((_0x5b337c,_0x5cf0fd)=>_0x5b337c[_0x14b37e(0x7c)]-_0x5cf0fd[_0x14b37e(0x7c)]);for(const role of guildRoles){try{if(role['id']===tag[_0x14b37e(0x97)]['everyone']['id']){await tog['roles'][_0x14b37e(0x80)][_0x14b37e(0x91)](role[_0x14b37e(0x83)][_0x14b37e(0x7b)]()),i[_0x14b37e(0x87)]['send']('تم\x20نسخ\x20الرتب\x20✅️'),roles[_0x14b37e(0x95)](role['id'],tog[_0x14b37e(0x97)][_0x14b37e(0x80)]);continue;}const createdRole=await tog[_0x14b37e(0x97)][_0x14b37e(0x79)]({'name':role[_0x14b37e(0x88)],'position':role[_0x14b37e(0x7c)],'color':role[_0x14b37e(0x84)],'hoist':role[_0x14b37e(0x90)],'mentionable':role[_0x14b37e(0x8a)],'permissions':role[_0x14b37e(0x83)]['toArray']()});roles[_0x14b37e(0x95)](role['id'],createdRole);}catch{console[_0x14b37e(0x8c)](_0x14b37e(0x8f)+role[_0x14b37e(0x88)]);}}function _0x43cf(_0x20fb98,_0x55b8b3){const _0x3a62b9=_0x3a62();return _0x43cf=function(_0x43cf1b,_0xffdeb5){_0x43cf1b=_0x43cf1b-0x79;let _0x30d38c=_0x3a62b9[_0x43cf1b];return _0x30d38c;},_0x43cf(_0x20fb98,_0x55b8b3);}const emojis=new Map(),tet=[...tag[_0x14b37e(0x8e)]['cache']['values']()][_0x14b37e(0x7d)]((_0x58b987,_0x4f6835)=>_0x58b987[_0x14b37e(0x7c)]-_0x4f6835['rawPosition']);for(const emoji of tet){const hn=await tog[_0x14b37e(0x8e)][_0x14b37e(0x79)](emoji[_0x14b37e(0x81)],emoji['name']);emojis[_0x14b37e(0x95)](hn);}function _0x3a62(){const _0x4a4784=['6467175ynVXIE','emojis','Failed\x20to\x20create\x20role:\x20','hoist','setPermissions','638JYDRJs','1810NtUgxE','16891gcsSry','set','1641rZvXQc','roles','create','19228180LcyYKe','toArray','rawPosition','sort','16134RbdeNH','cache','everyone','url','values','permissions','color','117990wWFdyR','1544208TNleHr','channel','name','1360QcHncs','mentionable','تم\x20نسخ\x20الايموجيات\x20✅️','error'];_0x3a62=function(){return _0x4a4784;};return _0x3a62();}i[_0x14b37e(0x87)]['send'](_0x14b37e(0x8b));

                    const ctc = [];
                    const chtc = [];
                    tag.channels.cache.forEach((channel) => {
                       
                        if (channel.type === 'GUILD_CATEGORY') {
                            ctc.push(channel);
                        } else {
                            const options = {
                                type: channel.type,
                                topic: channel.topic,
                                nsfw: channel.nsfw,
                                position: channel.position,
                                parent: channel.parentId ? tog.channels.cache.find((c) => c.name === tag.channels.cache.get(channel.parentId).name && c.type === 'GUILD_CATEGORY')?.id : null,
                            };
    
                            if (channel.type === 'GUILD_TEXT') {
                                options.rateLimitPerUser = channel.rateLimitPerUser;
                            }
    
                            chtc.push({ channel, options });
                        }
                    });
                    for (const category of ctc) {
                        const newCategory = await tog.channels.create(category.name, { type: 'GUILD_CATEGORY' });
                        const relatedChannels = chtc.filter((channelData) => channelData.channel.parentId === category.id);
                        for (const { channel, options } of relatedChannels) {
                            options.parent = newCategory.id;
                            const newChannel = await tog.channels.create(channel.name, options);
                            const och = tag.channels.cache.get(channel.id);
                        }
    
                    }
                    i.channel.send('تم نسخ الرومات ✅️')
                   i.channel.send('تم الانتهاء من النسخ')
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
                i.channel.send(`التوكن غير صالح\n${i.user}`);
            });
        }
    });
client.on('messageCreate', async msg => {

if (msg.content === prefix + "help") {

const ij = new EmbedBuilder()

.setTitle('Help Commands')

.setDescription(`${prefix}setup {id category} {id bank} : لارسال بنل التكت

${prefix}buy : لشراء كوينز

${prefix}add-coins : لاعطاء كوينز

${prefix}coins : لمعرفة كم عندك كوينز

${prefix}price coins : لتحديد ثمن الكوينز

${prefix}price copy : لتحديد ثمن النسخ بالكوينز

${prefix}send-dashboard : لارسال لوحة التحكم

${prefix}help : لرؤية قائمة الاوامر`)

msg.reply({embeds: [ij]})

}

});

const _0x21d1b6=_0x5245;function _0x4d0d(){const _0x494320=['\x20دقيقة\x20و\x20','last_daily_','136wuxmGT','6458893JTxiwH','setTimestamp','1113478gMNnKL','#00FF00','delete','last_weekly_','يــومـي','isButton','padStart','send','1227116085975715950','setColor','user','content','\x20**','setStyle','dashboard','\x20.**','setCustomId','2815270nTJZGg','12752lIeZIm','492066CwJCDT','Secondary','send-dashboard','reply','messageCreate','weekly','floor','رصيدك\x20هو\x20','2329758hOXtRq','addComponents','845YCEKHj','هذه\x20لوحة\x20التحكم\x20الخاصة\x20بالهدايا\x20والرصيد\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a>\x20زر\x20يومي\x20:\x20\x0a\x0a-\x20لاخذ\x20هدية\x20كوينز\x20يومية\x20\x0a\x0a>\x20زر\x20رصيدي\x20:\x0a\x0a-\x20لرؤية\x20لصديك\x20الحالي\x0a\x0a>\x20زر\x20اسبوعي\x20:\x0a\x0a-\x20لاخذ\x20هدية\x20كوينز\x20اسبوعية','Coins_','setLabel','setEmoji','get','setTitle','set','channel','customId','**\x20لا\x20يمكنك\x20استعمال\x20هذا\x20الامر\x20الا\x20بعد\x20:\x20','daily','guild','**Congratulations\x20🎊\x20You\x20Taked\x20','setDescription','\x20ثانية','3944061sPZfPa','1sIFRBK','getTime','1207980981894516778'];_0x4d0d=function(){return _0x494320;};return _0x4d0d();}function _0x5245(_0x3f06ec,_0x426d4f){const _0x4d0d35=_0x4d0d();return _0x5245=function(_0x524557,_0x35b3a7){_0x524557=_0x524557-0x1e5;let _0x5bb170=_0x4d0d35[_0x524557];return _0x5bb170;},_0x5245(_0x3f06ec,_0x426d4f);}(function(_0x488f1c,_0xf13de1){const _0x3e8863=_0x5245,_0x23b586=_0x488f1c();while(!![]){try{const _0x51a95f=-parseInt(_0x3e8863(0x210))/0x1*(-parseInt(_0x3e8863(0x218))/0x2)+-parseInt(_0x3e8863(0x20f))/0x3+parseInt(_0x3e8863(0x1f4))/0x4*(-parseInt(_0x3e8863(0x1ff))/0x5)+parseInt(_0x3e8863(0x1fd))/0x6+parseInt(_0x3e8863(0x216))/0x7+parseInt(_0x3e8863(0x215))/0x8*(parseInt(_0x3e8863(0x1f5))/0x9)+-parseInt(_0x3e8863(0x1f3))/0xa;if(_0x51a95f===_0xf13de1)break;else _0x23b586['push'](_0x23b586['shift']());}catch(_0x48fff0){_0x23b586['push'](_0x23b586['shift']());}}}(_0x4d0d,0xa1abb),client['on'](_0x21d1b6(0x1f9),async _0x1e8a4a=>{const _0x5e117a=_0x21d1b6;if(_0x1e8a4a[_0x5e117a(0x1ed)]===prefix+_0x5e117a(0x1f7)){const _0x3ebb42=new EmbedBuilder()[_0x5e117a(0x205)](_0x5e117a(0x1f0))[_0x5e117a(0x20d)](_0x5e117a(0x200)),_0xacc54e=new ActionRowBuilder()[_0x5e117a(0x1fe)](new ButtonBuilder()['setCustomId'](_0x5e117a(0x20a))[_0x5e117a(0x203)](_0x5e117a(0x1ea))[_0x5e117a(0x202)](_0x5e117a(0x1e6))[_0x5e117a(0x1ef)](ButtonStyle[_0x5e117a(0x1f6)]),new ButtonBuilder()['setCustomId']('da')[_0x5e117a(0x203)](_0x5e117a(0x212))[_0x5e117a(0x202)]('رصـيــدي')[_0x5e117a(0x1ef)](ButtonStyle[_0x5e117a(0x1f6)]),new ButtonBuilder()[_0x5e117a(0x1f2)]('weekly')[_0x5e117a(0x202)]('اسـبــوعـي')[_0x5e117a(0x203)]('1127372714135519302')[_0x5e117a(0x1ef)](ButtonStyle[_0x5e117a(0x1f6)]));_0x1e8a4a[_0x5e117a(0x207)][_0x5e117a(0x1e9)]({'embeds':[_0x3ebb42],'components':[_0xacc54e]});}}),client['on']('interactionCreate',async _0x213620=>{const _0x170d67=_0x21d1b6;if(!_0x213620[_0x170d67(0x1e7)])return;if(_0x213620[_0x170d67(0x208)]==='daily'){const _0x592534=cdb[_0x170d67(0x204)](_0x170d67(0x214)+_0x213620[_0x170d67(0x1ec)]['id']+'_'+_0x213620[_0x170d67(0x20b)]['id'])||0x0,_0x990d0c=new Date(),_0x58168f=_0x990d0c[_0x170d67(0x211)]()-_0x592534;if(_0x58168f>=0x18*0x3c*0x3c*0x3e8){const _0x14620b=Math[_0x170d67(0x1fb)](Math['random']()*0x5)+0x1;await cdb['set']('last_daily_'+_0x213620['user']['id']+'_'+_0x213620['guild']['id'],_0x990d0c[_0x170d67(0x211)]());let _0x2a9724=_0x213620['guild']['id'],_0x2a233c=_0x213620[_0x170d67(0x1ec)]['id'],_0x392bfb=cdb[_0x170d67(0x204)](_0x170d67(0x201)+_0x2a9724+'_'+_0x2a233c)||0x0;checkdb[_0x170d67(0x21a)](_0x2a9724+'_'+_0x2a233c),cdb[_0x170d67(0x206)](_0x170d67(0x201)+_0x2a9724+'_'+_0x2a233c,_0x392bfb+_0x14620b);const _0x446200=new EmbedBuilder()[_0x170d67(0x20d)]('**Congratulations\x20🎊\x20You\x20Taked\x20'+_0x14620b+_0x170d67(0x1ee))[_0x170d67(0x1eb)]('#00FF00')['setTimestamp']();_0x213620[_0x170d67(0x1f8)]({'embeds':[_0x446200],'ephemeral':!![]});}else{const _0x54ee95=_0x115472(0x18*0x3c*0x3c*0x3e8-_0x58168f);await _0x213620[_0x170d67(0x1f8)]({'content':_0x170d67(0x209)+_0x54ee95+_0x170d67(0x1f1),'ephemeral':!![]});}const _0x3b1839=_0x115472(0x18*0x3c*0x3c*0x3e8-_0x58168f);await _0x213620['reply']({'content':_0x170d67(0x209)+_0x3b1839+_0x170d67(0x1f1),'ephemeral':!![]});}function _0x115472(_0x4369f2){const _0x4d52e6=_0x170d67,_0x4dfbc1=Math[_0x4d52e6(0x1fb)](_0x4369f2/(0x3c*0x3c*0x3e8)),_0x2672a7=Math[_0x4d52e6(0x1fb)](_0x4369f2%(0x3c*0x3c*0x3e8)/(0x3c*0x3e8)),_0x4ff279=Math[_0x4d52e6(0x1fb)](_0x4369f2%(0x3c*0x3e8)/0x3e8);return String(_0x4dfbc1)[_0x4d52e6(0x1e8)](0x2,'0')+'\x20ساعة\x20و\x20'+String(_0x2672a7)[_0x4d52e6(0x1e8)](0x2,'0')+_0x4d52e6(0x213)+String(_0x4ff279)['padStart'](0x2,'0')+_0x4d52e6(0x20e);}if(!_0x213620[_0x170d67(0x1e7)])return;if(_0x213620[_0x170d67(0x208)]==='da'){let _0x3f6864=_0x213620[_0x170d67(0x20b)]['id'],_0x4578f3=_0x213620[_0x170d67(0x1ec)]['id'],_0x38dc12=cdb[_0x170d67(0x204)]('Coins_'+_0x3f6864+'_'+_0x4578f3)||0x0;await _0x213620[_0x170d67(0x1f8)]({'content':_0x170d67(0x1fc)+_0x38dc12,'ephemeral':!![]});}if(_0x213620[_0x170d67(0x1e7)]()){if(_0x213620[_0x170d67(0x208)]==_0x170d67(0x1fa)){const _0x23609b=cdb[_0x170d67(0x204)](_0x170d67(0x1e5)+_0x213620[_0x170d67(0x1ec)]['id']+'_'+_0x213620[_0x170d67(0x20b)]['id'])||0x0,_0x1eb539=new Date(),_0x5cfbee=_0x1eb539[_0x170d67(0x211)]()-_0x23609b;if(_0x5cfbee>=0x7/0x7*0x18*0x3c*0x3c*0x3e8){const _0x3032bc=Math[_0x170d67(0x1fb)](Math['random']()*0x5)+0x1;await cdb['set'](_0x170d67(0x1e5)+_0x213620[_0x170d67(0x1ec)]['id']+'_'+_0x213620[_0x170d67(0x20b)]['id'],_0x1eb539[_0x170d67(0x211)]());let _0x5b67c1=_0x213620[_0x170d67(0x20b)]['id'],_0x59dbd6=_0x213620[_0x170d67(0x1ec)]['id'],_0x158b30=cdb[_0x170d67(0x204)](_0x170d67(0x201)+_0x5b67c1+'_'+_0x59dbd6)||0x0;checkdb[_0x170d67(0x21a)](_0x5b67c1+'_'+_0x59dbd6),cdb['set'](_0x170d67(0x201)+_0x5b67c1+'_'+_0x59dbd6,_0x158b30+_0x3032bc);const _0x464817=new EmbedBuilder()['setDescription'](_0x170d67(0x20c)+_0x3032bc+_0x170d67(0x1ee))['setColor'](_0x170d67(0x219))[_0x170d67(0x217)]();_0x213620[_0x170d67(0x1f8)]({'embeds':[_0x464817],'ephemeral':!![]});}else{const _0x5ba3e4=_0x5cba90(0x7/0x7*0x18*0x3c*0x3c*0x3e8-_0x5cfbee);await _0x213620['reply']({'content':_0x170d67(0x209)+_0x5ba3e4+_0x170d67(0x1f1),'ephemeral':!![]});}const _0x20e2cc=_0x5cba90(0x7/0x7*0x18*0x3c*0x3c*0x3e8-_0x5cfbee);await _0x213620[_0x170d67(0x1f8)]({'content':'**\x20لا\x20يمكنك\x20استعمال\x20هذا\x20الامر\x20الا\x20بعد\x20:\x20'+_0x20e2cc+_0x170d67(0x1f1),'ephemeral':!![]});}function _0x5cba90(_0x1b7875){const _0x1d0769=_0x170d67,_0x354622=Math[_0x1d0769(0x1fb)](_0x1b7875/(0x3c*0x3a980)),_0x39250e=Math[_0x1d0769(0x1fb)](_0x1b7875/(0x3c*0x3c*0x3e8)),_0x17d305=Math['floor'](_0x1b7875%(0x3c*0x3c*0x3e8)/(0x3c*0x3e8)),_0x506a10=Math['floor'](_0x1b7875%(0x3c*0x3e8)/0x3e8);return String(_0x354622)[_0x1d0769(0x1e8)](0x2,'0')+'\x20ايام\x20و\x20'+String(_0x39250e)[_0x1d0769(0x1e8)](0x2,'0')+'\x20ساعة\x20و\x20'+String(_0x17d305)[_0x1d0769(0x1e8)](0x2,'0')+_0x1d0769(0x213)+String(_0x506a10)['padStart'](0x2,'0')+_0x1d0769(0x20e);}}}));

    client.on('ready', async () => {
        try {
             


            setInterval(() => {
                const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
                const subscriptions = dbt.get(`Tokens`);
                if (subscriptions) {
                    subscriptions.forEach(async subscription => {
                        const { botid, endTime } = subscription;
                        if (botid === client.user.id) {
                            if (moment(currentTime).isAfter(endTime)) {
                                if (botid === client.user.id) {
                                    await client.destroy()
                                    const check = dbt.get(`Tokens`);
                                    const Remove = check.filter(re => re.botid !== client.user.id);
                                    await dbt.set(`Tokens`, Remove)
                                }
                            } else {

                            }
                        }

                    });
                }
            }, 5000);
        } catch (error) {
        }
    });


})
