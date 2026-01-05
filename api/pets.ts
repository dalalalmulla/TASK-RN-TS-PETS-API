import waiter from './index';

// Function to get ALL pets
export const getAllPets = async () => {
  const response = await waiter.get('/pets');
  return response.data;
  
};

// Function to get ONE pet by ID
export const getPetById = async (id: string) => {
  const response = await waiter.get(`/pets/${id}`);
  return response.data;
};
// Function to CREATE a new pet
export const addPet = async (
  name: string, 
  image: string, 
  type: string, 
  adopted: number,
  description?: string
) => {
  const response = await waiter.post('/pets', {
    name,
    image,
    type,
    adopted,
    description,
  });
  
  return response.data;
};

// Function to DELETE a pet
export const deletePet = async (id: string) => {
  const response = await waiter.delete(`/pets/${id}`);
  return response.data;
};