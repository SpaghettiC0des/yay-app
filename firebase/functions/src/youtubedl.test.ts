/* eslint-disable @typescript-eslint/ban-ts-comment */
import fTest from 'firebase-functions-test';
fTest(
  {
    projectId: 'yay-app-2023',
    storageBucket: 'yay-app-2023.appspot.com',
  },
  './service-account.json',
);
import {downloadYoutubeVideo} from '.';
import {HttpsError} from 'firebase-functions/v2/https';

describe('youtubedl', () => {
  it('should fail when the URL is not valid', async () => {
    try {
      await downloadYoutubeVideo.run({
        // @ts-ignore
        rawRequest: {url: ''} as Request,
        data: {
          url: '',
        },
      });
    } catch (e) {
      expect(e).toEqual(new HttpsError('invalid-argument', 'url is not valid'));
    }
  });

  it('should download the video', async () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const res = await downloadYoutubeVideo.run({
      // @ts-ignore
      rawRequest: {url} as Request,
      data: {
        url,
      },
    });

    expect(res.title).toBeTruthy();
    expect(res.url).toBeTruthy();
  });
});
