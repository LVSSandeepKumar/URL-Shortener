import supabase from "./supabase";

export async function getClicksFromUrls(urlIds) {
    const {data, error} = await supabase.from("clicks").select("*").in("url_id", urlIds);

    if(error) throw new Error("Unable to load Clicks");

    return data;
}