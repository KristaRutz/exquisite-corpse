# Project Proposal

## Name of Student: Krista Rutz

## Project Working Title: _Exquisite Corpse: the game_

## Project’s Purpose or Goal:

This activity, traditionally made using physical paper to hide previous work, allows a group of users to collectively build an amusing story that builds with each contribution. My project will be to create a platform that enables people to use this technique electronically, with people that may not be sitting right next to them.

### Description:

_A summary of what you envision the project becoming. This does not have to be detailed or even a set in stone, but rather a snapshot of your current goals_

[Exquisite Corpse](https://en.wikipedia.org/wiki/Exquisite_corpse) is the name of a Surrealist technique to create stories or works of art as a group. Each person takes turns contributing to the work without being able to see or predict the total outcome. As the story gets larger, the contributions have a lower chance of fitting well together, adding an element of amusement and surprise.

A user may receive a partially complete story and be prompted to add a few lines, some exposition, or a new plot development, before sending it on to the next user to grow the story.

### Use Case:

_Who are the main users? What problems are they facing that you will solve? What will it do for users? What is the purpose/goal of the project?_

- The users might be groups of friends, families, classes, language students, or anyone seeking entertainment or a community.
- For some, it might be a problem to use the traditional method of paper because they wish to utilize the exquisite cadaver technique with people physically far away from them.
- For others, they might have a way to do this electronically that takes extra legwork to ensure all pieces of the story are gathered in the same format without risking the exposure of earlier contributions to later contributors.
- This project will take care of this by using a digital platform with streamlined, intuitive UI that allows users to collaborate on their stories and handles the collection of contributions and publication of the final work in one application.

## Minimum Viable Product

_List the absolute minimum features the project requires before it is considered to be reaching this goal_

- Data persists in database
- Clean and intuitive UI
- Story writing: The user will mainly interact through a form that shows the previous contribution and prompts the new contribution.
  - C-U-D functionality for new story projects
  - C-U-D functionality for new parts of the story
- Ability to “publish” a complete story for all story's contributors to view: the “R” functionality

#### Tools for MVP

_List the tools, frameworks, libraries, APIs, modules, resources, languages, etc that will be used to create your MVP. Be specific._

- React, redux, firebase stack
- Bootstrap and custom CSS

### Additional Features

_If you finish developing your MVP and have time to spare, what features do you want to work on next? Be specific._

- A publicly browsable project library for published stories (Universal read functionality)
- Authorization and authentication for users, to protect content from editing and to provide credit to authors
  - Ability to view one’s stories and contributions
- Unique URLs for story contributions
- A version for photo contributions, à la [photoshop tennis](https://en.wikipedia.org/wiki/Photoshop_contest#Photoshop_tennis)
- A backend API that can get and receive the story data (so that contributions can be made through outside platforms via API).
- Voting on stories by the public, and a top stories page.
  - Ability to view one’s own top stories
- Deployment
- character/setting cards, plot prompts, story arc guides - instead of leaving the format totally open to users, this could add interest by guiding certain stories to follow some logic and be more internally consistent while still maintaining an open format
- Mobile application

#### Tools for Additional Features

_List the tools, frameworks, libraries, APIs, modules, resources, languages, etc that will be used to create your additional features. Be specific._

- C# API (or perhaps exploring how to make an API in JavaScript with Firebase)
- Deploy on firebase
- Extra libraries for routing with unique links/IDs for contributors - still researching
- React native for mobile app, iOS app store and google play store

## Additional Information

_Is there anything else you’d like your instructor to know?_

<details>
Honestly, I think this idea could be fun and have versatile use cases and I feel like I have written a decent proposal but I’m not that committed to it.
I would love to do something more abstract, like build a tool that parses language using English syntax rules, but I’m not sure about how that would be applicable and I’m very sure that Google has already perfected this tech so I don’t want to be redundant.
Other ideas I had included building a tool that will send you a text the night before if you should wake up for an unmissable sunrise (pulling weather data from an API and using location, using an algorithm to determine good sunrise conditions, and SMS), or building a more functional static site for a non-profit organization (I have a connection to an NGO in Uganda that I could build a mobile version of their site, but they use WIX, and it seems like a bit of a shame not to use any actual programming languages in my project).
I also would potentially have a lot to gain from using MapBox as I did in my first team week project and focusing on a deep dive with that since geodata is something I would be pretty interested to do as a job, but I’m again not really sure what I would want to build that isn’t redundant. Perhaps a travel bucket list builder app? I’m not sure.
Resources for React Native?? Is learning an entirely new platform advised against
</details>
