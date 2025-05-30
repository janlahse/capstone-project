export default function PetHappiness({ needs }) {
  const averageNeed =
    (needs.hunger + needs.energy + needs.entertainment) / 3;

  let mood = "😐";
  if (averageNeed > 70) mood = "😄";
  else if (averageNeed < 30) mood = "😢";

  return (
    <div>
      <h3>Mood</h3>
      <p style={{ fontSize: "2rem" }}>{mood}</p>
    </div>
  );
}
