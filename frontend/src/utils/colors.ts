const categoryColors: { [key: string]: string } = {
  food: "#5AE37C",
  transport: "#FFDE59",
  gifts: "#FFBD5D",
  bills: "#F88997",
  education: "#0CC0DF",
  bonus:"#FFBD5D",
  salary:"#FFDE59"
};

export const GetCategoryColor = (category: string): string => {
  return categoryColors[category] || "#FFFFFF"; // Default color if category is not found
};
