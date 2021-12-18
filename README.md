# Scottish Metrical Psalter 1650

This is an application to present the metrical tunes of Scottish Psalmody in a dynamic way and to provide a web render of tunes in staff notation. It also aims to add tools to for the tunes and harmonisations to be played and manipulated on the web.

The tunes here are for singing with the Scottish Metrical Psalter approved for use in public worship by the General Assembly of the Church of Scotland in 1650.

# Getting started

Clone the repository and run `yarn && yarn start`.

# Dynamic and designed for learning tunes and harmonies

You can select a tune and have full control over the playback and SATB voices.

Want to hear just the melody, and at a slower speed? Push a few buttons and it's done.

Want to learn the tenor line on your favourite tune? Select the tune, disable the other voices, and play it back at whatever speed you find comfortable.

# Roadmap

* Basic controls to select a tune, manipulate playback, set SATB volumes independently, select soundfonts, change tempo, and transpose sheet music.
* Split-leaf support with the traditional Psalter text and Psalm selection.
* Tracking metadata about tunes, including suggested Psalm/tune matches.
* Digitise the full list of tunes from the printed FCC 2013 Scottish Psalmody.
* Support tunes and additionals from other split-leaf versions.
* Use a device's microphone to identify a tune being sung or hummed.

# Converting a tune to MusicXML

The tunes are entered and maintained in MusicXML. Existing apps and website tend to provide static images and MIDI files. Storing them in XML allows for better maintenance and provides flexibility in the way that the notation is rendered and presented.

# Resources and thanks

The application is written in Typescript and uses React's Material UI.

OpenSheetMusicDisplay is used to render the staff notation in the browser and the OSMD Audio Player is used to enable playback of the tunes.

The tunes and their arrangements are taken from the Free Church (Continuing) 2013 split-leaf psalmody.

This project was inspired by the 1650 Split Leaf Psalter app.

# Found a mistake?

You can edit the MusicXML files in a text editor or programme such as MuseScore and submit a pull request.

If you'd like to contribute or have feature requests just open a ticket.
