import {HttpsError, onCall} from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import ytdl from 'ytdl-core';

type Req = {
  url: string;
  options?: ytdl.downloadOptions;
};
export const downloadYoutubeVideo = onCall<Req>(async (request) => {
  const {url, options} = request.data;

  if (!ytdl.validateURL(url) || !url) {
    return Promise.reject(
      new HttpsError('invalid-argument', 'url is not valid'),
    );
  }

  const info = await ytdl.getInfo(url);
  const {title} = info.videoDetails;
  const newVideo = admin.storage().bucket().file(`${title}.mp4`);

  const writeStream = newVideo.createWriteStream({resumable: false});

  return new Promise((resolve) => {
    ytdl(url, options)
      .pipe(writeStream)
      .on('finish', () => {
        resolve({url: newVideo.publicUrl(), title, info});
      })
      .on('error', () => {
        Promise.reject(new HttpsError('internal', 'unable to download video'));
      });
  });
});
