export default function getProfileAvatar(fileUrl){
    if(!fileUrl) {
        return 'https://icon-library.com/images/add-photo-icon/add-photo-icon-19.jpg';
    } else {
        return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileUrl}`;
    }
}