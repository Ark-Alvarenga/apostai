import { Soccer } from "@/types";

// Helper function to sort the soccer data
export const sortSoccerData = (soccerData: Soccer[]): Soccer[] => {
  const priorityLeagues = ["Serie A", "Serie B", "Serie C", "Serie D"];

  // Sorting function
  return soccerData.sort((a, b) => {
    const nameA = a.league.name;
    const nameB = b.league.name;
    const isPriorityA = priorityLeagues.includes(nameA);
    const isPriorityB = priorityLeagues.includes(nameB);

    if (isPriorityA && !isPriorityB) return -1; // A is priority, B is not
    if (!isPriorityA && isPriorityB) return 1; // B is priority, A is not

    // If both are priority or both are not, sort alphabetically
    return nameA.localeCompare(nameB);
  });
};

// Helper function to filter the soccer data
export const filterActiveSoccerEntities = (entities: Soccer[]): Soccer[] => {
  const currentDate = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

  return entities.filter((entity) => {
    // Get the last season object from the seasons array
    const lastSeason = entity.seasons[entity.seasons.length - 1];

    // Check if the end date of the last season is in the future
    return new Date(lastSeason.end) >= new Date(currentDate);
  });
};
