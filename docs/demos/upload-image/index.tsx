import React, { useState } from 'react';

import {
  UploadImagePresenter,
  SelectImageServiceToken,
  UploadServiceToken,
  AbsUploadService,
  SelectImageServiceBrowserInput,
} from '@lujs/upload-image';
import { usePresenter } from '@lujs/react-mvp-adaptor';

class MyUploadService extends AbsUploadService {
  upload(file) {
    return Promise.resolve({
      url: 'xxxurl',
      name: 'xxx.png',
      thumbUrl: 'xxx',
    });
  }
}

const Page = () => {
  const { presenter, state } = usePresenter<UploadImagePresenter>(
    UploadImagePresenter,
    {
      registry: [
        {
          token: UploadServiceToken,
          useClass: MyUploadService,
        },
        {
          token: SelectImageServiceToken,
          useClass: SelectImageServiceBrowserInput,
        },
      ],
    },
  );

  return (
    <div>
      <h2>fileList</h2>
      <div>{state.fileList.map((v) => v.file.name)}</div>
      <h2>upload info</h2>
      <ul>
        <li>name: {state.fileList[0]?.name}</li>
        <li>url: {state.fileList[0]?.url}</li>
        <li>thumbUrl: {state.fileList[0]?.thumbUrl}</li>
      </ul>
      <div>
        <button
          onClick={() => {
            presenter.selectImage();
          }}
        >
          selectImage
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            presenter.uploadFile();
          }}
        >
          upload
        </button>
      </div>
    </div>
  );
};

export default Page;
