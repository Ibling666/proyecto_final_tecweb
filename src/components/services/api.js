export async function getProjectsFromAPI() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Error al obtener los proyectos");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
