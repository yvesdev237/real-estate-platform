

import { db } from "./database";

//Upload props images
export const UploadImage = async(file) => {
  try {
    const fileName = `${Date.now()} - ${file.name}` ;

    const {data , error} = await db.storage.from('property_images').upload(`properties/${fileName}` , file);

    if (error) throw error;

    const {data: publicUrl} = db.storage.from('property_images').getPublicUrl(data.path)
    return publicUrl.publicUrl;
    
  } catch (err) {
    console.error('Image upload error :' ,err)
    return
  }
};

//Property Creation
export const CreateProp = async( propertyData , imageFile ) => {
  try {
    let imageUrl = null ;
    
    if (imageFile) {
      imageUrl = await UploadImage(imageFile);
    }

    const { data , error } = await db.from('properties').insert({
      owner_id : propertyData.owner_id , 
      title : propertyData.title , 
      description : propertyData.description , 
      price : propertyData.price , 
      neighborhood : propertyData.neighborhood , 
      bedrooms : propertyData.bedrooms , 
      bathrooms : propertyData.bathrooms , 
      type : propertyData.type , 
      status : propertyData.status , 
      is_featured : propertyData.is_featured , 
      featured_until : propertyData.featured_until , 
      image_url : imageUrl , 
      amenities : propertyData.amenities , 
    }).select().single();

    if (error) throw error;
    return {data , error: null};
  } catch (err) {
    console.error('Failed to create property : ' , err)
    return {data : null , err }
  }
};

//Get a single property
export const GetProp = async(id) => {
  try {
    const {data , error} = await db.from('properties').select('*').eq('id' , id).single();

    if (error) throw error;
    return {data , error : null}
  } catch (err) {
    console.error('Error fetching property : ' , err)
    return {data : null , err}
  }
};

//Delete a property
export const DeleteProp = async (id) => {
  try {
    const {error} = await db.from('properties').delete().eq('id' , id)

    if(error) throw error;

    return {success : true}
  } catch (err) {
    console.error('Error deleting the property : ' , err)
    return {success : false}
  }
}