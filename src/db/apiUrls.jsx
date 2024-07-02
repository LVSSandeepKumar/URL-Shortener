import supabase from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error("Unable to load URLs");

  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) throw new Error("Unable to delete URLs");

  return data;
}

export async function createUrl({title, longUrl, customUrl, user_id }, qrCode) {
    const short_url = Math.random().toString(36).substring(2,6);
    
    const fileName = `qr-${short_url}`;

    const {error: storageError} = await supabase.storage
    .from("qrs")
    .upload(fileName, qrCode);

    if(storageError) throw new Error(storageError.message); 

    const { data, error } = await supabase.from("urls")
    .insert([{
        title,
        original_url : longUrl,
        custom_url : customUrl || null,
        user_id,
        short_url,
        qr
        },
    ])
    .select();

    if (error) throw new Error("Error creating Short URL");

}