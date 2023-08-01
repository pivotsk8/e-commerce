import { ref, computed } from 'vue';
import { uid } from 'uid';
import { useFirebaseStorage } from 'vuefire';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export default function useImage() {
  const url = ref('');
  const storage = useFirebaseStorage();

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const filename = uid() + '.jpg';
    const sRef = storageRef(storage, '/priducts/' + filename);

    //Sube el archivo
    const uploadTask = uploadBytesResumable(sRef, files[0]);
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => console.log(error),
      () => {
        //Upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          url.value = downloadURL;
        });
      },
    );
  };

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null;
  });

  return {
    url,
    isImageUploaded,
    onFileChange,
  };
}
