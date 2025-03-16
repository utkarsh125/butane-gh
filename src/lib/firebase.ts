import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "git-intel.firebaseapp.com",
  projectId: "git-intel",
  storageBucket: "git-intel.firebasestorage.app",
  messagingSenderId: "85931061323",
  appId: "1:85931061323:web:cf7b9d268218f008e29dce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file: File, setProgress?: (progress: number) => void) {
  return new Promise((resolve, reject) => {
    // Check if file is provided
    if (!file) {
      console.error("uploadFile called with undefined file:", file);
      reject(new Error("No file provided"));
      return;
    }

    try {
      // Log file details before starting upload
      console.log("Uploading file:", file.name, file);

      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Log the snapshot for debugging purposes
          console.log("Upload snapshot:", snapshot);

          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (setProgress) setProgress(progress);

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          console.error("Error during upload:", error);
          reject(error);
        },
        () => {
          // Upload completed successfully, now get the download URL.
          getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
            console.log("File available at", downloadUrl);
            resolve(downloadUrl as string);
          });
        }
      );
    } catch (error) {
      console.error("Caught error:", error);
      reject(error);
    }
  });
}
