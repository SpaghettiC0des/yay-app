import * as admin from 'firebase-admin';

/**
 * Creates a write stream for a video file.
 **/
export function createVideoWriteStream(title: string) {
  const newVideo = admin.storage().bucket().file(title);

  return newVideo.createWriteStream({resumable: false});
}
