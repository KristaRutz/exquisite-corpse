const sampleProject = {
  title: "The Sample Story",
  isPublished: true,
  content: [
    {
      partId: 1,
      content: "Once upon a time...This is an example part one contribution.",
      authorId: "abc123",
    },
    {
      partId: 2,
      precedingPartId: 1,
      content: "This is an example middle contribution.",
      authorId: "def123",
    },
    {
      partId: 3,
      precedingPartId: 2,
      content:
        "This is an example final contribution. And they lived happily ever after.",
      authorId: "xyz123",
    },
  ],
  id: "randomUID",
};

export default sampleProject;
