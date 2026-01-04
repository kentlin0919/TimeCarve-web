import { supabase } from "@/lib/supabase";

type UploadAvatarParams = {
  userId: string;
  file: File;
};

export async function updateUserAvatar({
  userId,
  file,
}: UploadAvatarParams): Promise<string> {
  const fileExt = file.name.split(".").pop() || "png";
  const fileName = `${userId}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true });

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(fileName);

  if (!publicUrl) {
    throw new Error("取得公開網址失敗");
  }

  const { error: updateError } = await supabase
    .from("user_info")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);

  if (updateError) {
    throw updateError;
  }

  return publicUrl;
}
