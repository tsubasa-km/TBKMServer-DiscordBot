const { SlashCommandBuilder, Routes, REST } = require('discord.js');

const { clientId, token } = require('./config.json');

function deploy(client,guild = null) {
	const commands = [
		new SlashCommandBuilder().setName('radio').setDescription('くまらじを作成します。')
		,
	]
		.map(command => command.toJSON());

	const rest = new REST({ version: '10' }).setToken(token);

	if (guild){
		rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: commands })
				.then(() => console.log(`Successfully registered application commands.`))
				.catch(console.error);
	}else{
		client.guilds.cache.map(guild => guild.id).forEach(guildId=>{
			rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
				.then(() => console.log(`Successfully registered application commands.`))
				.catch(console.error);
		})
	}
}

module.exports = {deploy}