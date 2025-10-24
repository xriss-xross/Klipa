const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Latency check'),

	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Please wait...', fetchReply: true });

		const latency = sent.createdTimestamp - interaction.createdTimestamp;

		const apiLatency = Math.round(interaction.client.ws.ping);

		await interaction.editReply(`Pong!\nRT latency: \`${latency}ms\`\nAPI latency: \`${apiLatency}ms\``);
	},
};
