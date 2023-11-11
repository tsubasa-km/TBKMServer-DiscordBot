const { SlashCommandBuilder, Routes, REST } = require('discord.js');

const { clientId, token } = require('../config.json');

/**
 * 
 * @param {*} client 
 * @param {SlashCommandBuilder[]} commands 
 * @param {Number|null} guild 
 */
function deploy(client, data, guild = null) {
	data.map(d => d.toJSON());

	const rest = new REST({ version: '10' }).setToken(token);

	if (guild) {
		rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: data })
			.then(() => console.log(`Successfully registered application commands in ${guild.name}.`))
			.catch(console.error);
	} else {
		client.guilds.cache.forEach(guild => {
			rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: data })
				.then(() => console.log(`Successfully registered application commands in ${guild.name}.`))
				.catch(console.error);
		})
	}
}

module.exports = { deploy }