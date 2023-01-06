export default {
  title: "Parent A",
  children: [
    { title: "Child A" },
    { title: "Child B" },
    { title: "Child C" },
    {
      title: null,
      children: [
        { title: "Subchild A" },
        { title: "SubChild B" },
        { title: "SubChild C" },
        { title: null },
      ]
    }
  ]
}
