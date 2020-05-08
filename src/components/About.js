import React from "react";

function AboutPage() {
  return (
    <div className="App">
      <h1>About Exquisite Corpse</h1>
      <p>
        <span class="lead">
          Exquisite Corpse is the name of a Surrealist technique to create
          stories or works of art as a group.
        </span>{" "}
        Each person takes turns contributing to the work without being able to
        see or predict the total outcome. As the story gets larger, the
        contributions have a lower chance of fitting well together, adding an
        element of amusement and surprise.
      </p>
      <p>
        A user may receive a partially complete story and be prompted to add a
        few lines, some exposition, or a new plot development, before sending it
        on to the next user to grow the story. This technique also works well
        with poetry, and has even been used to create visual art works.
      </p>
    </div>
  );
}

export default AboutPage;
