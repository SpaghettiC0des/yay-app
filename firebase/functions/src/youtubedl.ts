import {HttpsError, onRequest} from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

import ytdl from 'ytdl-core';

export const downloadYoutubeVideo = onRequest(async (request, response) => {
  const {url, options} = request.body as {
    url: string;
    options: ytdl.downloadOptions;
  };

  if (!ytdl.validateURL(url) || !url) {
    throw new HttpsError('invalid-argument', 'url is not valid');
  }

  const info = await ytdl.getInfo(url);
  const {title} = info.videoDetails;
  const newVideo = admin.storage().bucket().file(title);

  const writeStream = newVideo.createWriteStream({resumable: false});

  ytdl(url, options)
    .pipe(writeStream)
    .on('finish', () => {
      response.send({
        data: `${title} is uploaded`,
      });
    })
    .on('error', () => {
      response
        .status(500)
        .send(new HttpsError('aborted', 'unable to download video'));
    });
});
