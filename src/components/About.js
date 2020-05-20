import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./styles/styles";

function AboutPage() {
  return (
    <Container>
      <h1 className="display-3" style={styles.headerMargin}>
        About StoryJam
      </h1>
      <p style={styles.blockParagraphs}>
        <span class="lead">StoryJam is based on</span> fond memories of a game
        where someone writes two lines on a piece of notebook paper, folds over
        the top line, and passes it on to the next person. Each person takes
        turns contributing to the work without being able to see or predict the
        total outcome.
      </p>
      <p>
        As the story gets larger, the contributions have a lower chance of
        fitting well together, adding an element of amusement and surprise. As a
        very simple concept, requiring only materials easily found around the
        house, it was the perfect way to entertain ourselves with friends and
        family.
      </p>
      <h4 style={styles.blockHeaders}>
        History of <em>Exquisite Corpse</em>
      </h4>
      <p style={styles.blockParagraphs}>
        <span class="lead">This game wasn't always just a game.</span>{" "}
        <em>Exquisite Corpse</em>, or <em>Exquisite Cadaver</em>, is the name of
        a Surrealist technique to create stories or works of art as a group
        dating back to the 1920s. This technique also worked well with poetry,
        and has even been used to create visual art works, in a format more
        commonly called <em>Consequences</em>, or <em>Picture Consequences</em>.
      </p>
      <h4 style={styles.blockHeaders}>
        Using <em>StoryJam</em>
      </h4>
      <p style={styles.blockParagraphs}>
        <span class="lead">The simplest way to get started</span> with StoryJam
        is to <a href="/account">sign in</a> and{" "}
        <a href="/new">create a new private room</a>. After generating a room
        key, send the unique link to your friends, family, or the students in
        your classroom. They will be able to start new projects in the room and
        contribute to ongoing projects when they join. For example, a user may
        receive a partially complete story and be prompted to add a few lines,
        some exposition, or a new plot development, before sending it on to the
        next user to grow the story.
      </p>
      <p>
        Once enough contributions have been added to make a sufficiently
        interesting story (you can see this with the progress bar), a project
        may be published to the room, thereby closing it to new additions and
        making it available for the room to read.
      </p>
    </Container>
  );
}

export default AboutPage;
