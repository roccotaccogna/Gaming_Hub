import { useEffect, useState } from 'react';
import supabase from '../supabase/client';

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // funzione che carica l'immagine nello storage...
  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }

  // funzione downloadImage
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  // funzione che controlla il path dell'immagine da inserire...
  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(event, filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-transparent">
      {avatarUrl ? (        
          <img
            src={avatarUrl}
            alt="Avatar"
            className="avatar mt-4 rounded-full w-48 h-48"
            style={{
              boxShadow: '1px 1px 10px #030405',
            }}
          />
      ) : (
        <div
          className="avatar no-image mt-4 rounded-full"
          style={{
            height: size,
            width: size,
            boxShadow: '1px 1px 10px #030405',
          }}
        />
      )}
      <div style={{ width: size }} className="bg-transparent">
        <button
          type="button">
        </button>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className='mb-2 text-gray-400 bg-transparent'
        />
      </div>
    </div>
  );
}