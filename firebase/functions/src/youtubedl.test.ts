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
      await downloadYoutubeVideo(
        {
          body: {
            url: '',
          },
        } as any,
        {} as any,
      );
    } catch (e) {
      expect(e).toEqual(new HttpsError('invalid-argument', 'url is not valid'));
    }
  });

  it('should download the video', async () => {
    return downloadYoutubeVideo(
      {
        body: {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      } as any,
      {
        send(data: any) {
          expect(data).not.toBeNull();
        },
      } as any,
    );
  });
});
