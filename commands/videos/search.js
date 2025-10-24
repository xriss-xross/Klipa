const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('klip')
		.setDescription('Request a Klip')
		.addIntegerOption((option) => option
			.setName('id')
			.setDescription('You can search for Klips with the quotebook')
			.setRequired(true)
		),

	async execute(interaction) {
		await interaction.reply( { content: 'Getting your Klip...' });

		const clip_id = interaction.options.getInteger('id');
		const filePath = '.\\commands\\videos\\clip_meta.json';

		const raw_clip_meta = fs.readFileSync(filePath, 'utf-8');
		const clip_meta = JSON.parse(raw_clip_meta).videos;

		const clip = clip_meta.find(c => c.id === clip_id);

		const embed = new EmbedBuilder()
			.setColor('#00ACE6')
			.setTitle(`${clip.title}`)
			.setDescription(`${clip.description}`)
			.setFooter({
				text: `Requested by: **${interaction.user.displayName}**`,
			})
			.addFields(
				{
					name: 'Tags',
					value: `\`${clip.tags.join("`, `")}\``
				}
			)
			.setTimestamp();

		await interaction.channel.send( {embeds: [embed]} );
		await interaction.channel.send(`https://kita-projects.co.uk/${clip.path}.mp4`)
	},
};