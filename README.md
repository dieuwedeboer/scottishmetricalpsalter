# Scottish Metrical Psalter 1650

This is an application to present the metrical tunes of Scottish Psalmody in a dynamic way and to provide a web render of tunes in staff notation. It also aims to add tools to for the tunes and harmonisations to be played and manipulated on the web.

The tunes here are for singing with the *Scottish Metrical Psalter* approved for use in public worship by the General Assembly of the Church of Scotland in 1650. This psalter is also knows as the *Psalms of David in Metre* and most of the Psalms are in common metre, with a few long metre and short metre versions.

# Getting started

You can try out a [live demo](https://dieuwedeboer.github.io/scottishmetricalpsalter) of this project. It should be regularly updated with the latest build from this repository in the "docs" directory.

Clone the repository and run `npm install && npm start` to get a local version of the app for local development.

With `npm run build` you will get a completely functional Javascript app in the `./build` directory that is portable to any webserver, or you can download the compiled code from the gh-pages branch.

# Dynamic and designed for learning tunes and harmonies

You can select a tune and have full control over the playback and SATB voices.

Want to hear just the melody, and at a slower speed? Push a few buttons and it's done.

Want to learn the tenor line on your favourite tune? Select the tune, disable the other voices, and play it back at whatever speed or pitch you find comfortable.

# Current features

* A handful of tunes from the FCC Split-Leaf Psalter as dynamic sheet music.
* Audio playback, adjust SATB volumes independently, select instruments, change tempo, and transpose sheet music.
* The traditional text of the entire 150 *Psalms of David in Metre* with second versions.
* Commentary on the metrical Psalms from John Brown of Haddington.

# Roadmap

* Ability to switch between split-leaf, tune-only, and psalm-only displays.
* View a selection of stanzas as inline lyrics on a tune.
* Digitise the full list of tunes from the printed FCC 2013 Scottish Psalmody.
* Tracking metadata about tunes, including suggested Psalm/tune matches.
* Support tunes and additionals from other split-leaf versions.
* Dedicated domain, add to home, and local storage for Offline capability.
* Use a device's microphone to identify a tune being sung or hummed.

# Converting a tune to MusicXML

The tunes are entered and maintained in MusicXML. Existing apps and website tend to provide static images and MIDI files. Storing them in XML allows for better maintenance and provides flexibility in the way that the notation is rendered and presented.

There is a guide to how tunes are processed in [the project Wiki](https://github.com/dieuwedeboer/scottishmetricalpsalter/wiki).

# Resources and thanks

The application is written in [Typescript](https://www.typescriptlang.org/) and uses [React's](https://reactjs.org) [Material UI](https://mui.com).

[OpenSheetMusicDisplay](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay) is used to render the staff notation in the browser and the [OSMD Audio Player](https://github.com/jimutt/osmd-audio-player) is used to enable playback of the tunes.

The tunes and their arrangements are taken from the Free Church (Continuing) 2013 Psalmody in staff notation. This project was inspired by the 1650 Split Leaf Psalter app for Android.

# Found a mistake?

You can edit the MusicXML files in a text editor or programme such as MuseScore and submit a pull request.

If you'd like to contribute or have feature requests just open a ticket.
