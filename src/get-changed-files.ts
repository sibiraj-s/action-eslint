import { getOctokit, context } from '@actions/github';

import { File, FileNamesList } from './types';
import inputs from './inputs';

const getFileNames = (files: File[]): FileNamesList =>
  files.filter((file) => file.status !== 'removed').map((file) => file.filename);

const getChangedFiles = async (): Promise<FileNamesList> => {
  const octokit = getOctokit(inputs.token);
  const pullRequest = context.payload.pull_request;

  let filenames: FileNamesList = [];

  if (!pullRequest?.number) {
    const response = await octokit.rest.repos.getCommit({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: context.sha,
    });
    const filesArr = response.data.files ?? [];
    filenames = getFileNames(filesArr as File[]);
  } else {
    const filesChangedInPR = await octokit.paginate(octokit.rest.pulls.listFiles, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pullRequest.number,
    });

    filenames = getFileNames(filesChangedInPR as File[]);
  }

  return filenames;
};

export default getChangedFiles;
