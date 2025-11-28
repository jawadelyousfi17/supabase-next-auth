'use server';

import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';

type T_UploadState = {
  message?: string;
  error?: string;
  url?: string;
};

export async function uploadLogo(file: File): Promise<T_UploadState> {
  const supabase = await createClient();

  if (!file) return { error: 'No file provided' };

  if (!file.type.startsWith('image/'))
    return { error: 'Must be a valid image format' };

  const maxSize = 1024 * 1024;
  if (file.size > maxSize) {
    return {
      error: `Image size must be less than 2MB`,
    };
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return { error: 'You must be logged in to upload' };

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}-avatar.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
      if (error) return { error: error.message };

      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(data.path);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatar: publicUrl,
        },
      });

      return {
        message: 'avatar uploaded succesfauly',
        url: publicUrl,
      };
    }
  } catch (error) {
    return { error: 'Unkown error was accured, try later' };
  }
}
