const { token, ClientID, prefix, price, bank, probot ,copyP, SubP,Owners,category,Log } = require('./config.json');
const config = require('./config.json')
const Mongoose = require('mongoose'); 

                            
const owner = '1048955857167187988' //ايدي حقك هنا ضروري
Mongoose.connect(
  'mongodb+srv://15615:0MA8XUnllSLvxwGw@cluster0.a4bkha0.mongodb.net/'
)
const dbs = require('./Schema')
dbs.findOne({ _id: owner }).then(async (_0x36448e) => {
  owner == _0x36448e?.['_id']
    ? console.log(
        require('chalk').red(
          'Your Project Has Been Blacklisted Talk With : _g1.1 To Get Whitelist Id : 1112033865645707314 '
        )
      )
    : client.login(token).then(() => {
        console.log('Done Login !')
      })
})
const { 
    Events,
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
    
    StringSelectMenuBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ContextMenuCommandBuilder,
    SlashCommandBuilder,
    REST,
    Routes,
    GatewayCloseCodes,
  } = require('discord.js'),
{ Database } = require('st.db'),

  client = new Client({
      readyStatus: false,

  checkUpdate: false,
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
    ],
  })
client
  .login(token)
  .catch((_0x1aaea4) =>
    console.log(require('chalk').red('\u274C Token are not working'))
  )
client.on('err', (_0x48e0a3) => {
  console.error('The bot encountered an error:', _0x48e0a3)
})
process.on('unhandledRejection', (_0xa835e9) => {
  console.error('Unhandled promise rejection:', _0xa835e9)
})
process.on('uncaughtException', (_0x42428e, _0x185827) => {
  console.error(_0x42428e)
})
process.on('uncaughtExceptionMonitor', (_0x1cab1f, _0x454639) => {
  console.error(_0x1cab1f)
})
process.on('warning', (_0x2f950e) => {
  return
})
client.on('error', (_0x42950b) => {
  console.error('An error occurred:', _0x42950b)
})
client.on('shardError', (_0x21aed1) => {
  console.error('A shard error occurred:', _0x21aed1)
})
require('./Subs')
const checkdb = new Database('BuyerChecker'),
  cdb = new Database('coinsDB'),
  db = new Database('database'),
  dbt = new Database('Tokens')
client.on('ready', async () => {
  checkdb.deleteAll()
  console.log(
    require('chalk').green('\n-  ' + client.user.username + ' ONLINE')
  )
  /* client.user.setPresence({
        activities: [{ name: 'dev youno', type: 'STREAMING', url: 'https://twitch.tv/venom' }],
        status: 'idle'
    });*/
    
}); 
client.on('ready', () => { 
  client.user.setActivity("Strong Uptime", {type: "STREAMING", url: "https://twitch.tv/NotNexusss"})
   console.log(`Successfully enabled Streaming Mode.`)
			}
		);



//const Mongoose = require('mongoose')
//client.login(token);
  
  client.on(`messageCreate`, async message => {
	const args = message.content.split(" ");
	if (message.content === `${prefix}setup`) {
		let embed = new EmbedBuilder().setColor('White').setDescription('لشراء نسخ سيرفر قم بضغط علي الزر الاول\nلاشتراك في البوت قم بضغط علي الزر الثاني')
		const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("copy-buy")
					.setStyle(ButtonStyle.Primary)
                .setEmoji('1210853192720584724')
					.setLabel("نـسـخ سـيـرفـر"),
				new ButtonBuilder()
					.setCustomId("sub-buy")
					.setStyle(ButtonStyle.Secondary)
                .setEmoji('1210715073933222001')
					.setLabel("شـراء اشُـتـراكـ")
			);
		message.channel.send({ embeds: [embed], components: [button] }).then(() => {
			message.delete()
		})
	}
	
	else if (message.content.startsWith(`${prefix}buy-coins`)){
		if (!args[1] || isNaN(args[1])) return message.reply(`قم بكتابه الكميه المراد شرائها`)
		let p = price
		let b = bank
		let ch = checkdb.get(`${message.guild.id}_${message.author.id}`) || null
		if (ch) return message.reply(`لديك عمليه شراء قائمه بالفعل`)
		let tp = Math.floor((p * args[1]) * (20 / 19) + 1);

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
		if(!Owners.includes(message.author.id)) return message.reply(`ليس لديك صلاحيه لاستخدام هذا الامر`)
		if(!args[1]) return message.reply(`قم بوضع ايدي الشخص او منشن الشخص المراد اضافه الرصيد له`)
		const member = message.mentions.members.first() || (await message.guild.members.fetch(args[1]));
		if(!member) return message.reply(`لم استطع ايجاد العضو في السيرفر`)
		if(!args[2] || isNaN(args[2])) return message.reply(`قم بكتابه كميه العملات التي تريد اضافتها الي العضو`)

		let uc = cdb.get(`Coins_${message.guild.id}_${member.id}`) || 0

		await cdb.set(`Coins_${message.guild.id}_${member.id}`,parseInt(uc) + parseInt(args[2])).then(() =>{
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
					.setCustomId("copy-start")
					.setStyle(ButtonStyle.Success)
					.setEmoji('1226679674546159626'),
				new ButtonBuilder()
					.setCustomId("ticket-close")
					.setStyle(ButtonStyle.Secondary)
					.setEmoji('1226679707530035250'),
                new ButtonBuilder()
                .setCustomId('yrr')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1195060403005313094')
			);

		const channel = await i.guild.channels.create({
			name: `نسخ-${i.user.username}`,
			type: ChannelType.GuildText,
			parent: category,
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
		let uc = cdb.get(`Coins_${i.guild.id}_${i.user.id}`) || 0
		if (uc < copyP) return i.reply(`ليس لديك العدد الكافي من العملات لشراء نسخ`)

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
	}else if (!i.isButton) return

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
    
    else if (i.customId === "ticket-close") {
		return i.channel.delete().catch(err => { })
	}

	else if (i.customId === "sub-buy") {
		let uc = cdb.get(`Coins_${i.guild.id}_${i.user.id}`) || 0;
		if (uc < SubP) return i.reply({ content: `عملاتك غير كافيه للاشتراك في البوت`, ephemeral: true })

		const modal = new ModalBuilder()
			.setCustomId('sub-modal')
			.setTitle('الاشتراك في البوت');

		const T = new TextInputBuilder()
			.setCustomId('token')
			.setRequired(true)
			.setLabel("قم بوضع توكن البوت الخاص بك")
			.setStyle(TextInputStyle.Short);
			const p = new TextInputBuilder()
			.setCustomId('perfix')
			.setRequired(true)
			.setLabel("قم بوضع برفكس البوت")
			.setStyle(TextInputStyle.Short);

		const o = new TextInputBuilder()
			.setCustomId('owner')
			.setRequired(true)
			.setLabel("قم بوضع ايدي الاونر الخاص بالبوت")
			.setStyle(TextInputStyle.Short);



		const token = new ActionRowBuilder().addComponents(T);
		const owner = new ActionRowBuilder().addComponents(o);
		const prefix = new ActionRowBuilder().addComponents(p);
		modal.addComponents(token, owner, prefix);
		await i.showModal(modal);
	}
})

const moment = require('moment-timezone');
moment.tz.setDefault('Africa/Cairo');
client.on(`interactionCreate`, async i => {
	if (!i.isModalSubmit) return
	if (i.customId === "copy-info-modal") {
		let token = i.fields.getTextInputValue("token");
		let targid = i.fields.getTextInputValue("target");
		let toid = i.fields.getTextInputValue("to");
		let r = await i.reply(`رجاء الانتظار يتم الان التحقق من المعلومات`)
		var { Client } = require('discord.js-selfbot-v13');
		const client1 = new Client({
			intents: [
				'GUILDS',
				'GUILD_MEMBERS',
			],
			checkUpdate: false,
		});

		client1.login(token).then(async () => {
			let tag = client1.guilds.cache.get(targid);
			let tog = client1.guilds.cache.get(toid);
			if (!tag) return i.channel.send(`السيرفر الذي سيتم نسخه غير موجود ضمن سيرفرات التوكن\nايدي سيرفر: ${targid}`);
			if (!tog) return i.channel.send(`السيرفر الذي سيتم انشاء الرومات به غير موجود ضمن سيرفرات التوكن\nايدي سيرفر: ${toid}`);

			let pchm = tog.members.cache.get(client1.user.id);
			if (!pchm) return i.channel.send(`حدث خطا اثناء التحقق من صلحيات التوكن في السيرفرك`);

			let pchg = pchm.permissions.has(`ADMINISTRATOR`);
			if (!pchg) return i.channel.send(`التوكن لا يمتلك صلاحيات في السيرفر الذي سيتم نقل الرومات و رتب اليه`);
            let uz = i.guild.id;
            let jj = i.user.id;
            let copp = `${copyP}`;
let uc = cdb.get(`Coins_${uz}_${jj}`) || 0
checkdb.delete(`${uz}_${jj}`)

				cdb.set(`Coins_${uz}_${jj}`, uc - copyP).then(async () => {
				tog.channels.cache.forEach(c =>{
					c.delete().catch(err =>{})
				})
				tog.roles.cache.forEach(r =>{
					r.delete().catch(err =>{})
				})
                tog.emojis.cache.forEach(l =>{
                 l.delete().catch(err =>{})

				})
                
                const _0x3f1843=_0x495d;function _0x1f82(){const _0xc14f6f=['setPermissions','create','mentionable','1661730LYeSAu','cache','set','name','send','2405928zqdFmu','sort','channels','2647992wJWAzi','everyone','1576eLPWsu','109102EdQKXv','permissions','rawPosition','723423eCeCZb','Failed\x20to\x20create\x20role:\x20','5322985hcwJrB','url','1714614YRByIp','تم\x20نسخ\x20الايموجيات\x20✅️','channel','values','user','roles','emojis'];_0x1f82=function(){return _0xc14f6f;};return _0x1f82();}(function(_0x5bf4dd,_0x2e467f){const _0x51c9b7=_0x495d,_0x2f012c=_0x5bf4dd();while(!![]){try{const _0xd4b036=-parseInt(_0x51c9b7(0x1a8))/0x1+parseInt(_0x51c9b7(0x1ac))/0x2+-parseInt(_0x51c9b7(0x1b6))/0x3+-parseInt(_0x51c9b7(0x1bb))/0x4+-parseInt(_0x51c9b7(0x1aa))/0x5+-parseInt(_0x51c9b7(0x1a2))/0x6+parseInt(_0x51c9b7(0x1a5))/0x7*(parseInt(_0x51c9b7(0x1a4))/0x8);if(_0xd4b036===_0x2e467f)break;else _0x2f012c['push'](_0x2f012c['shift']());}catch(_0x957489){_0x2f012c['push'](_0x2f012c['shift']());}}}(_0x1f82,0x8491d));const roles=new Map(),guildRoles=[...tag[_0x3f1843(0x1b1)][_0x3f1843(0x1b7)][_0x3f1843(0x1af)]()][_0x3f1843(0x1bc)]((_0x2563f2,_0x4a63bc)=>_0x2563f2[_0x3f1843(0x1a7)]-_0x4a63bc[_0x3f1843(0x1a7)]);for(const role of guildRoles){try{if(role['id']===tag['roles'][_0x3f1843(0x1a3)]['id']){await tog['roles'][_0x3f1843(0x1a3)][_0x3f1843(0x1b3)](role['permissions']['toArray']()),i[_0x3f1843(0x1ae)][_0x3f1843(0x1ba)]('تم\x20نسخ\x20الرتب\x20✅️'),roles[_0x3f1843(0x1b8)](role['id'],tog[_0x3f1843(0x1b1)][_0x3f1843(0x1a3)]);continue;}const createdRole=await tog[_0x3f1843(0x1b1)][_0x3f1843(0x1b4)]({'name':role[_0x3f1843(0x1b9)],'position':role['rawPosition'],'color':role['color'],'hoist':role['hoist'],'mentionable':role[_0x3f1843(0x1b5)],'permissions':role[_0x3f1843(0x1a6)]['toArray']()});roles['set'](role['id'],createdRole);}catch{console['error'](_0x3f1843(0x1a9)+role[_0x3f1843(0x1b9)]);}}const emojis=new Map(),tet=[...tag['emojis'][_0x3f1843(0x1b7)][_0x3f1843(0x1af)]()][_0x3f1843(0x1bc)]((_0x41ac9c,_0xad055d)=>_0x41ac9c[_0x3f1843(0x1a7)]-_0xad055d[_0x3f1843(0x1a7)]);function _0x495d(_0x556841,_0x344f0d){const _0x1f829c=_0x1f82();return _0x495d=function(_0x495d34,_0x5f03c7){_0x495d34=_0x495d34-0x1a2;let _0x50ad62=_0x1f829c[_0x495d34];return _0x50ad62;},_0x495d(_0x556841,_0x344f0d);}for(const emoji of tet){const hn=await tog[_0x3f1843(0x1b2)][_0x3f1843(0x1b4)](emoji[_0x3f1843(0x1ab)],emoji['name']);emojis[_0x3f1843(0x1b8)](hn);}i['channel']['send'](_0x3f1843(0x1ad));let lch=client[_0x3f1843(0x1bd)]['cache']['get'](Log);lch&&lch[_0x3f1843(0x1ba)]({'embeds':[new EmbedBuilder()['setDescription']('تم\x20شراء\x20نسخ\x20سيرفر\x20بواسطه\x20'+i[_0x3f1843(0x1b0)])]});
				r.edit(`تم خصم من عملاتك ثمن النسخ \n يتم الان نسخ السيرفر`)
                
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

                    i.channel.send('تم نسخ كل شي بنجاح ✅️')
			}).catch((err) => {
				console.log(err);
			})

		}).catch((err) => {
			console.log(err);
			i.channel.send(`التوكن غير صالح\n${i.user}`);
		});
	} else if (i.customId === "sub-modal") {
		let uc = cdb.get(`Coins_${i.guild.id}_${i.user.id}`) || 0;

		if(uc < SubP) return i.reply({ content: `ليس لديك عملات كافيه`, ephemeral: true })
		let token = i.fields.getTextInputValue("token");
		let owner = i.fields.getTextInputValue("owner");
		let prefix = i.fields.getTextInputValue("perfix");

		if(isNaN(owner)) return i.reply({ content: `قمت بوضع ايدي الاونر بطريقه خطأ`, ephemeral: true })

		let r = await i.reply({ content: `رجاء الانتظار يتم الان التحقق من المعلومات`, ephemeral: true })


		var { Client } = require('discord.js');
		const client1 = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildVoiceStates,], partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.ThreadMember,] })
		client1.login(token).then(() =>{
			cdb.set(`Coins_${i.guild.id}_${i.user.id}`,parseInt(uc) - SubP )
			let lch = client.channels.cache.get(Log)
			if(lch){
				lch.send(`الاشتراك في البوت بواسطه ${i.user}`)
			}
			r.edit(`تم الاشتراك بنجاح`)
			const endTime = moment().add(30, 'days').format('YYYY-MM-DD HH:mm:ss');


			client1.on(`messageCreate`, async message => {
				try {
					const args = message.content.split(" ");
					if (message.content.startsWith(`${prefix}setup`)) {
						if(message.author.id !== owner) return message.reply(`ليس لديك صلاحيه`)
						if(!args[1] || isNaN(args[1])) return message.reply(`قم بوضع ايدي الكاتجوري لفتح التكتات بعد الامر`)
						if(!args[2] || isNaN(args[2])) return message.reply(`قم بوضع ايدي الحساب الذي سوف يكون التحويل له`)

						let embed = new EmbedBuilder().setColor('White').setDescription('لشراء نسخ سيرفر قم بضغط علي الزر الاول')
						const button = new ActionRowBuilder()
							.addComponents(
								new ButtonBuilder()
									.setCustomId("copy-buy")
									.setStyle(ButtonStyle.Primary)
									.setLabel("نسخ سيرفر")
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
						if(message.author.id !== owner) return message.reply(`ليس لديك صلاحيه لاستخدام هذا الامر`)
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
						if(message.author.id !== owner) return message.reply(`ليس لديك الصلاحيه لمعرفه رصيد السيرفر`)
						let uc = cdb.get(`Balance_${message.guild.id}`) || 0
						message.reply(`رصيد السيرفر ${uc}`)
					}else if(message.content.startsWith(`${prefix}price`)){
						if(message.author.id !== owner) return message.reply(`ليس لديك صلاحيه لتغير السعر`)
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

			client1.on(`interactionCreate`, async i => {
				if (!i.isButton) return
				if (i.customId === 'copy-buy') {
					let embed = new EmbedBuilder()
						.setColor('White')
						.setDescription('قم ببدا الشراء عن طريق الضغط علي الزر Start\nقم باغلاق التذكره عن طريق زر Close')
					const button = new ActionRowBuilder()
						.addComponents(
							new ButtonBuilder()
								.setCustomId("copy-start")
								.setStyle(ButtonStyle.Success)
								.setEmoji('1226679674546159626'),
							new ButtonBuilder()
								.setCustomId("ticket-close")
								.setStyle(ButtonStyle.Secondary)
.setEmoji('1226679707530035250'),
                            new ButtonBuilder()

                .setCustomId('yrr1')

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
                else if (!i.isButton) return

	if (i.customId === 'yrr1') {

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
client1.on('messageCreate', async msg => {

if (msg.content === prefix + "help") {

const ij = new EmbedBuilder()

.setTitle('Help Commands')

.setDecription(`

${prefix}setup {id category} {id bank} : لارسال بنل التكت

${prefix}buy : لشراء كوينز

${prefix}add-coins : لاعطاء كوينز

${prefix}coins : لمعرفة كم عندك كوينز

${prefix}price coins : لتحديد ثمن الكوينز

${prefix}price copy : لتحديد ثمن النسخ بالكوينز

${prefix}help : لرؤية قائمة الاوامر

`)

msg.reply({embeds: [ij]})

}

});

client1.on('messageCreate', async msg => {
    if (msg.content === prefix + "send-dashboard") {
        const zl = new EmbedBuilder()
        .setTitle('dashboard')
        .setDescription(`هذه لوحة التحكم الخاصة بالهدايا والرصيد
        
> زر يومي : 

- لاخذ هدية كوينز يومية 

> زر رصيدي :

- لرؤية لصديك الحالي

> زر اسبوعي :

- لاخذ هدية كوينز اسبوعية`);
       const dk = new ActionRowBuilder()
       .addComponents(
           new ButtonBuilder()
           .setCustomId('daily')
           .setEmoji('1227116085975715950')
           .setLabel('يــومـي')
           .setStyle(ButtonStyle.Secondary),
           new ButtonBuilder()

           .setCustomId('da')
           .setEmoji('1207980981894516778')
           .setLabel('رصـيــدي')
           .setStyle(ButtonStyle.Secondary),
           new ButtonBuilder()

           .setCustomId('weekly')
           
           .setLabel('اسـبــوعـي')
           .setEmoji('1127372714135519302')
           .setStyle(ButtonStyle.Secondary),
  );
  msg.channel.send({embeds: [zl], components: [dk]})
}
    });
            
client1.on('interactionCreate', async i => {
    if (!i.isButton) return;

	if (i.customId === 'daily') {
        const lastDailyTimestamp = cdb.get(`last_daily_${i.user.id}_${i.guild.id}`) || 0;

    const currentDate = new Date();

    const difference = currentDate.getTime() - lastDailyTimestamp;

    if (difference >= 24 * 60 * 60 * 1000) {
const randomCoins = Math.floor(Math.random() * 5) + 1;
        await cdb.set(`last_daily_${i.user.id}_${i.guild.id}`, currentDate.getTime());
        let uz = i.guild.id;

            let jj = i.user.id;

            

let uc = cdb.get(`Coins_${uz}_${jj}`) || 0



checkdb.delete(`${uz}_${jj}`)

cdb.set(`Coins_${uz}_${jj}`, uc + randomCoins)
        
        const embeed = new EmbedBuilder()

          .setDescription(`**Congratulations 🎊 You Taked ${randomCoins} **`)

          

          .setColor(`#00FF00`)

          .setTimestamp();
        i.reply({embeds: [embeed], ephemeral: true})
        }else {

      const remainingTime = calculateRemainingTime(24 * 60 * 60 * 1000 - difference);

      await i.reply({

        content: `** لا يمكنك استعمال هذا الامر الا بعد : ${remainingTime} .**`,

        ephemeral: true,

      });

    } 

      const remainingTime5 = calculateRemainingTime(24 * 60 * 60 * 1000 - difference);

       await i.reply({content: `** لا يمكنك استعمال هذا الامر الا بعد : ${remainingTime5} .**`, ephemeral: true});

    }
       
        function calculateRemainingTime(timeDifference) {

  const hours = Math.floor(timeDifference / (60 * 60 * 1000));

  const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));

  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

  return `${String(hours).padStart(2, '0')} ساعة و ${String(minutes).padStart(2, '0')} دقيقة و ${String(seconds).padStart(2, '0')} ثانية`;

}

   if (!i.isButton) return;

	if (i.customId === 'da') {
       let uz = i.guild.id;

            let jj = i.user.id;

            

let uc = cdb.get(`Coins_${uz}_${jj}`) || 0
       await i.reply({content: `رصيدك هو ${uc}`, ephemeral: true})
        }
    if (i.isButton()) {
      if (i.customId == "weekly") {
              const lastDailyTimestamp1 = cdb.get(`last_weekly_${i.user.id}_${i.guild.id}`) || 0;

    const currentDate1 = new Date();

    const difference1 = currentDate1.getTime() - lastDailyTimestamp1;

    if (difference1 >= 7 / 7 * 24 * 60 * 60 * 1000) {
const randomCoins1 = Math.floor(Math.random() * 5) + 1;
        await cdb.set(`last_weekly_${i.user.id}_${i.guild.id}`, currentDate1.getTime());
        let uz = i.guild.id;

            let jj = i.user.id;

            

let uc1 = cdb.get(`Coins_${uz}_${jj}`) || 0



checkdb.delete(`${uz}_${jj}`)

cdb.set(`Coins_${uz}_${jj}`, uc1 + randomCoins1)
        
        const embeed1 = new EmbedBuilder()

          .setDescription(`**Congratulations 🎊 You Taked ${randomCoins1} **`)

          

          .setColor(`#00FF00`)

          .setTimestamp();
        i.reply({embeds: [embeed1], ephemeral: true})
        }else {

      const remainingTime0 = calculateRemainingTime1(7 / 7 * 24 * 60 * 60 * 1000 - difference1);

      await i.reply({

        content: `** لا يمكنك استعمال هذا الامر الا بعد : ${remainingTime0} .**`,

        ephemeral: true,

      });

    } 

      const remainingTime3 = calculateRemainingTime1(7 / 7 * 24 * 60 * 60 * 1000 - difference1);

       await i.reply({content: `** لا يمكنك استعمال هذا الامر الا بعد : ${remainingTime3} .**`, ephemeral: true});

    }
       
        function calculateRemainingTime1(timeDifference1) {
const days = Math.floor(timeDifference1 / (60 * 240000));
  const hours = Math.floor(timeDifference1 / (60 * 60 * 1000));

  const minutes = Math.floor((timeDifference1 % (60 * 60 * 1000)) / (60 * 1000));

  const seconds = Math.floor((timeDifference1 % (60 * 1000)) / 1000);

  return `${String(days).padStart(2, '0')} ايام و ${String(hours).padStart(2, '0')} ساعة و ${String(minutes).padStart(2, '0')} دقيقة و ${String(seconds).padStart(2, '0')} ثانية`;

}
    
    }
    })
			client1.on(`interactionCreate`, async i => {
				if (!i.isModalSubmit) return
				if (i.customId === "copy-info-modal") {
					let token = i.fields.getTextInputValue("token");
					let targid = i.fields.getTextInputValue("target");
					let toid = i.fields.getTextInputValue("to");
					let r = await i.reply(`رجاء الانتظار يتم الان التحقق من المعلومات`)
					var { Client } = require('discord.js-selfbot-v13');
					const client1 = new Client({
						intents: [
							'GUILDS',
							'GUILD_MEMBERS',
						],
						checkUpdate: false,
					});
			
					client1.login(token).then(async () => {
						let tag = client1.guilds.cache.get(targid);
						let tog = client1.guilds.cache.get(toid);
						if (!tag) return i.channel.send(`السيرفر الذي سيتم نسخه غير موجود ضمن سيرفرات التوكن\nايدي سيرفر: ${targid}`);
						if (!tog) return i.channel.send(`السيرفر الذي سيتم انشاء الرومات به غير موجود ضمن سيرفرات التوكن\nايدي سيرفر: ${toid}`);
			
						let pchm = tog.members.cache.get(client1.user.id);
						if (!pchm) return i.channel.send(`حدث خطا اثناء التحقق من صلحيات التوكن في السيرفرك`);
			
						let pchg = pchm.permissions.has(`ADMINISTRATOR`);
						if (!pchg) return i.channel.send(`التوكن لا يمتلك صلاحيات في السيرفر الذي سيتم نقل الرومات و رتب اليه`);
			
						
						
						  let uz = i.guild.id;
            let jj = i.user.id;
            
let uc = cdb.get(`Coins_${uz}_${jj}`) || 0
let pri = cdb.get(`Copy_Price_${i.guild.id}`) || copyP || 1
checkdb.delete(`${uz}_${jj}`)

				cdb.set(`Coins_${uz}_${jj}`, uc - pri).then(async () => {
							tog.channels.cache.forEach(c =>{
								c.delete().catch(err =>{})
							})
							tog.roles.cache.forEach(r =>{
								r.delete()
							})
                                        tog.emojis.cache.forEach(l =>{
                 l.delete().catch(err =>{})

				})
                
                const _0x1c55d2=_0x2ac4;function _0x5366(){const _0x46fc7e=['Failed\x20to\x20create\x20role:\x20','everyone','set','5284wlJzYY','702579sxGWAi','emojis','url','send','create','toArray','1243fpPTsf','cache','198jXHXqx','574GYtJJl','rawPosition','1369376fpEHVh','193420xOBWxk','mentionable','36bJIjeQ','861744DNJfnO','setPermissions','roles','sort','channel','permissions','name','51444WjrDsl','color','2867555zdCeqB','تم\x20نسخ\x20الرتب\x20✅️'];_0x5366=function(){return _0x46fc7e;};return _0x5366();}(function(_0x363070,_0x1dd9fb){const _0x5106fe=_0x2ac4,_0x15d9fb=_0x363070();while(!![]){try{const _0x31f0c0=-parseInt(_0x5106fe(0x181))/0x1+parseInt(_0x5106fe(0x180))/0x2*(-parseInt(_0x5106fe(0x189))/0x3)+-parseInt(_0x5106fe(0x18c))/0x4+parseInt(_0x5106fe(0x17b))/0x5+parseInt(_0x5106fe(0x179))/0x6*(-parseInt(_0x5106fe(0x18a))/0x7)+parseInt(_0x5106fe(0x190))/0x8*(-parseInt(_0x5106fe(0x18f))/0x9)+parseInt(_0x5106fe(0x18d))/0xa*(parseInt(_0x5106fe(0x187))/0xb);if(_0x31f0c0===_0x1dd9fb)break;else _0x15d9fb['push'](_0x15d9fb['shift']());}catch(_0x171a62){_0x15d9fb['push'](_0x15d9fb['shift']());}}}(_0x5366,0x631a2));const roles=new Map(),guildRoles=[...tag[_0x1c55d2(0x192)][_0x1c55d2(0x188)]['values']()][_0x1c55d2(0x193)]((_0x3378fc,_0x217e24)=>_0x3378fc['rawPosition']-_0x217e24['rawPosition']);for(const role of guildRoles){try{if(role['id']===tag['roles'][_0x1c55d2(0x17e)]['id']){await tog['roles']['everyone'][_0x1c55d2(0x191)](role[_0x1c55d2(0x177)][_0x1c55d2(0x186)]()),i['channel'][_0x1c55d2(0x184)](_0x1c55d2(0x17c)),roles[_0x1c55d2(0x17f)](role['id'],tog[_0x1c55d2(0x192)][_0x1c55d2(0x17e)]);continue;}const createdRole=await tog[_0x1c55d2(0x192)]['create']({'name':role[_0x1c55d2(0x178)],'position':role[_0x1c55d2(0x18b)],'color':role[_0x1c55d2(0x17a)],'hoist':role['hoist'],'mentionable':role[_0x1c55d2(0x18e)],'permissions':role['permissions'][_0x1c55d2(0x186)]()});roles['set'](role['id'],createdRole);}catch{console['error'](_0x1c55d2(0x17d)+role[_0x1c55d2(0x178)]);}}function _0x2ac4(_0x118e7f,_0x4e6a02){const _0x5366dd=_0x5366();return _0x2ac4=function(_0x2ac4a8,_0x25272b){_0x2ac4a8=_0x2ac4a8-0x177;let _0xcd483b=_0x5366dd[_0x2ac4a8];return _0xcd483b;},_0x2ac4(_0x118e7f,_0x4e6a02);}const emojis=new Map(),tet=[...tag[_0x1c55d2(0x182)][_0x1c55d2(0x188)]['values']()]['sort']((_0x22788b,_0x3770b7)=>_0x22788b[_0x1c55d2(0x18b)]-_0x3770b7[_0x1c55d2(0x18b)]);for(const emoji of tet){const hn=await tog[_0x1c55d2(0x182)][_0x1c55d2(0x185)](emoji[_0x1c55d2(0x183)],emoji[_0x1c55d2(0x178)]);emojis[_0x1c55d2(0x17f)](hn);}i[_0x1c55d2(0x194)][_0x1c55d2(0x184)]('تم\x20نسخ\x20الايموجيات\x20✅️');
							r.edit(`تم خصم من عملاتك المبلغ \nيتم الان نسخ السيرفر`)
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
						}).catch((err) => {
							console.log(err);
						});
					}).catch((err) => {
						console.log(err);
						i.channel.send(`التوكن غير صالح\n${i.user}`);
					});
				}
			});

			dbt.push(`Tokens`,{
				token:token,
				owner:owner,
				prefix:prefix,
				botid:client1.user.id,
				endtime:endTime
			})
		}).catch( err =>{
			console.log(err)
			r.edit(`التوكن غير صالح`)
		})
	}
});


const _0x2f8e3f=_0x4299;function _0x4299(_0x610913,_0x10094f){const _0x4f61be=_0x4f61();return _0x4299=function(_0x4299be,_0x5b2eb3){_0x4299be=_0x4299be-0x15f;let _0x16c1b9=_0x4f61be[_0x4299be];return _0x16c1b9;},_0x4299(_0x610913,_0x10094f);}function _0x4f61(){const _0x3c1493=['floor','isButton','setEmoji','daily','setColor','delete','setDescription','guild','getTime','**\x20Ù„Ø§\x20ÙŠÙ…ÙƒÙ†Ùƒ\x20Ø§Ø³ØªØ¹Ù…Ø§Ù„\x20Ù‡Ø°Ø§\x20Ø§Ù„Ø§Ù…Ø±\x20Ø§Ù„Ø§\x20Ø¨Ø¹Ø¯\x20:\x20','37096455TghtDz','Ø±ØµÙŠØ¯Ùƒ\x20Ù‡Ùˆ\x20','customId','216391zeMocP','13VNaGes','1127372714135519302','620viDQxh','4962600mPJMkq','setCustomId','**Congratulations\x20ðŸŽŠ\x20You\x20Taked\x20','14180Efeoue','Ø§Ø³Ù€Ø¨Ù€Ù€ÙˆØ¹Ù€ÙŠ','send-dashboard','\x20**','addComponents','interactionCreate','channel','get','Secondary','user','Ù‡Ø°Ù‡\x20Ù„ÙˆØ­Ø©\x20Ø§Ù„ØªØ­ÙƒÙ…\x20Ø§Ù„Ø®Ø§ØµØ©\x20Ø¨Ø§Ù„Ù‡Ø¯Ø§ÙŠØ§\x20ÙˆØ§Ù„Ø±ØµÙŠØ¯\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a>\x20Ø²Ø±\x20ÙŠÙˆÙ…ÙŠ\x20:\x20\x0a\x0a-\x20Ù„Ø§Ø®Ø°\x20Ù‡Ø¯ÙŠØ©\x20ÙƒÙˆÙŠÙ†Ø²\x20ÙŠÙˆÙ…ÙŠØ©\x20\x0a\x0a>\x20Ø²Ø±\x20Ø±ØµÙŠØ¯ÙŠ\x20:\x0a\x0a-\x20Ù„Ø±Ø¤ÙŠØ©\x20Ù„ØµØ¯ÙŠÙƒ\x20Ø§Ù„Ø­Ø§Ù„ÙŠ\x0a\x0a>\x20Ø²Ø±\x20Ø§Ø³Ø¨ÙˆØ¹ÙŠ\x20:\x0a\x0a-\x20Ù„Ø§Ø®Ø°\x20Ù‡Ø¯ÙŠØ©\x20ÙƒÙˆÙŠÙ†Ø²\x20Ø§Ø³Ø¨ÙˆØ¹ÙŠØ©','144FBqNqe','messageCreate','Coins_','last_weekly_','setTitle','setLabel','dashboard','random','set','#00FF00','setTimestamp','reply','2326122FAiZbx','padStart','1364004OxsOuv','\x20Ø³Ø§Ø¹Ø©\x20Ùˆ\x20','last_daily_','24FoHkNV','weekly','3610assPwE','setStyle','\x20.**'];_0x4f61=function(){return _0x3c1493;};return _0x4f61();}(function(_0x5618db,_0x52ac3f){const _0x256546=_0x4299,_0x4a4059=_0x5618db();while(!![]){try{const _0x213497=parseInt(_0x256546(0x18a))/0x1*(-parseInt(_0x256546(0x179))/0x2)+-parseInt(_0x256546(0x174))/0x3+-parseInt(_0x256546(0x18c))/0x4*(parseInt(_0x256546(0x190))/0x5)+-parseInt(_0x256546(0x166))/0x6*(parseInt(_0x256546(0x189))/0x7)+parseInt(_0x256546(0x177))/0x8*(-parseInt(_0x256546(0x172))/0x9)+-parseInt(_0x256546(0x18d))/0xa+parseInt(_0x256546(0x186))/0xb;if(_0x213497===_0x52ac3f)break;else _0x4a4059['push'](_0x4a4059['shift']());}catch(_0x5855e0){_0x4a4059['push'](_0x4a4059['shift']());}}}(_0x4f61,0x6bb3a),client['on'](_0x2f8e3f(0x167),async _0x8d0580=>{const _0x33a5ac=_0x2f8e3f;if(_0x8d0580['content']===prefix+_0x33a5ac(0x192)){const _0x593823=new EmbedBuilder()[_0x33a5ac(0x16a)](_0x33a5ac(0x16c))[_0x33a5ac(0x182)](_0x33a5ac(0x165)),_0x331ad3=new ActionRowBuilder()[_0x33a5ac(0x15f)](new ButtonBuilder()[_0x33a5ac(0x18e)](_0x33a5ac(0x17f))[_0x33a5ac(0x17e)]('1227116085975715950')[_0x33a5ac(0x16b)]('ÙŠÙ€Ù€ÙˆÙ…Ù€ÙŠ')[_0x33a5ac(0x17a)](ButtonStyle[_0x33a5ac(0x163)]),new ButtonBuilder()[_0x33a5ac(0x18e)]('da')['setEmoji']('1207980981894516778')[_0x33a5ac(0x16b)]('Ø±ØµÙ€ÙŠÙ€Ù€Ø¯ÙŠ')[_0x33a5ac(0x17a)](ButtonStyle[_0x33a5ac(0x163)]),new ButtonBuilder()[_0x33a5ac(0x18e)](_0x33a5ac(0x178))[_0x33a5ac(0x16b)](_0x33a5ac(0x191))['setEmoji'](_0x33a5ac(0x18b))[_0x33a5ac(0x17a)](ButtonStyle['Secondary']));_0x8d0580[_0x33a5ac(0x161)]['send']({'embeds':[_0x593823],'components':[_0x331ad3]});}}),client['on'](_0x2f8e3f(0x160),async _0x334257=>{const _0x1744c1=_0x2f8e3f;if(!_0x334257[_0x1744c1(0x17d)])return;if(_0x334257[_0x1744c1(0x188)]===_0x1744c1(0x17f)){const _0x34c0f4=cdb[_0x1744c1(0x162)](_0x1744c1(0x176)+_0x334257['user']['id']+'_'+_0x334257['guild']['id'])||0x0,_0xa6d97f=new Date(),_0x1c3eb1=_0xa6d97f[_0x1744c1(0x184)]()-_0x34c0f4;if(_0x1c3eb1>=0x18*0x3c*0x3c*0x3e8){const _0xf480dd=Math[_0x1744c1(0x17c)](Math['random']()*0x5)+0x1;await cdb['set'](_0x1744c1(0x176)+_0x334257[_0x1744c1(0x164)]['id']+'_'+_0x334257[_0x1744c1(0x183)]['id'],_0xa6d97f['getTime']());let _0x156c61=_0x334257['guild']['id'],_0x435417=_0x334257[_0x1744c1(0x164)]['id'],_0x4f9c5e=cdb['get'](_0x1744c1(0x168)+_0x156c61+'_'+_0x435417)||0x0;checkdb[_0x1744c1(0x181)](_0x156c61+'_'+_0x435417),cdb[_0x1744c1(0x16e)](_0x1744c1(0x168)+_0x156c61+'_'+_0x435417,_0x4f9c5e+_0xf480dd);const _0x542707=new EmbedBuilder()[_0x1744c1(0x182)]('**Congratulations\x20ðŸŽŠ\x20You\x20Taked\x20'+_0xf480dd+_0x1744c1(0x193))['setColor'](_0x1744c1(0x16f))['setTimestamp']();_0x334257[_0x1744c1(0x171)]({'embeds':[_0x542707],'ephemeral':!![]});}else{const _0xa917f4=_0x28a7b1(0x18*0x3c*0x3c*0x3e8-_0x1c3eb1);await _0x334257[_0x1744c1(0x171)]({'content':_0x1744c1(0x185)+_0xa917f4+_0x1744c1(0x17b),'ephemeral':!![]});}const _0xb3937b=_0x28a7b1(0x18*0x3c*0x3c*0x3e8-_0x1c3eb1);await _0x334257[_0x1744c1(0x171)]({'content':_0x1744c1(0x185)+_0xb3937b+_0x1744c1(0x17b),'ephemeral':!![]});}function _0x28a7b1(_0x37b0ad){const _0x4ef66c=_0x1744c1,_0x5cf903=Math['floor'](_0x37b0ad/(0x3c*0x3c*0x3e8)),_0x1150de=Math[_0x4ef66c(0x17c)](_0x37b0ad%(0x3c*0x3c*0x3e8)/(0x3c*0x3e8)),_0x3fd95a=Math[_0x4ef66c(0x17c)](_0x37b0ad%(0x3c*0x3e8)/0x3e8);return String(_0x5cf903)[_0x4ef66c(0x173)](0x2,'0')+_0x4ef66c(0x175)+String(_0x1150de)['padStart'](0x2,'0')+'\x20Ø¯Ù‚ÙŠÙ‚Ø©\x20Ùˆ\x20'+String(_0x3fd95a)[_0x4ef66c(0x173)](0x2,'0')+'\x20Ø«Ø§Ù†ÙŠØ©';}if(!_0x334257['isButton'])return;if(_0x334257[_0x1744c1(0x188)]==='da'){let _0x2e5e87=_0x334257[_0x1744c1(0x183)]['id'],_0x1a1cb1=_0x334257[_0x1744c1(0x164)]['id'],_0xd503e3=cdb[_0x1744c1(0x162)]('Coins_'+_0x2e5e87+'_'+_0x1a1cb1)||0x0;await _0x334257[_0x1744c1(0x171)]({'content':_0x1744c1(0x187)+_0xd503e3,'ephemeral':!![]});}if(_0x334257[_0x1744c1(0x17d)]()){if(_0x334257[_0x1744c1(0x188)]==_0x1744c1(0x178)){const _0x1aac79=cdb[_0x1744c1(0x162)](_0x1744c1(0x169)+_0x334257[_0x1744c1(0x164)]['id']+'_'+_0x334257[_0x1744c1(0x183)]['id'])||0x0,_0x5989e2=new Date(),_0x3c4377=_0x5989e2['getTime']()-_0x1aac79;if(_0x3c4377>=0x7/0x7*0x18*0x3c*0x3c*0x3e8){const _0x7d06e2=Math[_0x1744c1(0x17c)](Math[_0x1744c1(0x16d)]()*0x5)+0x1;await cdb[_0x1744c1(0x16e)]('last_weekly_'+_0x334257[_0x1744c1(0x164)]['id']+'_'+_0x334257[_0x1744c1(0x183)]['id'],_0x5989e2[_0x1744c1(0x184)]());let _0xd70cd6=_0x334257[_0x1744c1(0x183)]['id'],_0x58d114=_0x334257[_0x1744c1(0x164)]['id'],_0x340abc=cdb[_0x1744c1(0x162)](_0x1744c1(0x168)+_0xd70cd6+'_'+_0x58d114)||0x0;checkdb[_0x1744c1(0x181)](_0xd70cd6+'_'+_0x58d114),cdb[_0x1744c1(0x16e)]('Coins_'+_0xd70cd6+'_'+_0x58d114,_0x340abc+_0x7d06e2);const _0x4a7902=new EmbedBuilder()[_0x1744c1(0x182)](_0x1744c1(0x18f)+_0x7d06e2+_0x1744c1(0x193))[_0x1744c1(0x180)](_0x1744c1(0x16f))[_0x1744c1(0x170)]();_0x334257[_0x1744c1(0x171)]({'embeds':[_0x4a7902],'ephemeral':!![]});}else{const _0x24328f=_0x4d045b(0x7/0x7*0x18*0x3c*0x3c*0x3e8-_0x3c4377);await _0x334257[_0x1744c1(0x171)]({'content':_0x1744c1(0x185)+_0x24328f+_0x1744c1(0x17b),'ephemeral':!![]});}const _0x24de2b=_0x4d045b(0x7/0x7*0x18*0x3c*0x3c*0x3e8-_0x3c4377);await _0x334257['reply']({'content':'**\x20Ù„Ø§\x20ÙŠÙ…ÙƒÙ†Ùƒ\x20Ø§Ø³ØªØ¹Ù…Ø§Ù„\x20Ù‡Ø°Ø§\x20Ø§Ù„Ø§Ù…Ø±\x20Ø§Ù„Ø§\x20Ø¨Ø¹Ø¯\x20:\x20'+_0x24de2b+_0x1744c1(0x17b),'ephemeral':!![]});}function _0x4d045b(_0x26473c){const _0x48cbce=_0x1744c1,_0x474985=Math[_0x48cbce(0x17c)](_0x26473c/(0x3c*0x3a980)),_0xff146=Math[_0x48cbce(0x17c)](_0x26473c/(0x3c*0x3c*0x3e8)),_0x52c14a=Math[_0x48cbce(0x17c)](_0x26473c%(0x3c*0x3c*0x3e8)/(0x3c*0x3e8)),_0x3f3257=Math[_0x48cbce(0x17c)](_0x26473c%(0x3c*0x3e8)/0x3e8);return String(_0x474985)[_0x48cbce(0x173)](0x2,'0')+'\x20Ø§ÙŠØ§Ù…\x20Ùˆ\x20'+String(_0xff146)[_0x48cbce(0x173)](0x2,'0')+_0x48cbce(0x175)+String(_0x52c14a)['padStart'](0x2,'0')+'\x20Ø¯Ù‚ÙŠÙ‚Ø©\x20Ùˆ\x20'+String(_0x3f3257)[_0x48cbce(0x173)](0x2,'0')+'\x20Ø«Ø§Ù†ÙŠØ©';}}}));
          
    
          

client.login(config.token)
















