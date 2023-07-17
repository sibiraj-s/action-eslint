import { getOctokit, context } from '@actions/github';
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';

import { File, FileNamesList } from './types';
import inputs from './inputs';

const getFileNames = (files: File[]): FileNamesList => files
  .filter((file) => file.status !== 'removed')
  .map((file) => file.filename);

const getChangedFiles = async (): Promise<FileNamesList> => {
  const octokit = getOctokit(inputs.token);
  const pullRequest = context.payload.pull_request;

  let filenames: FileNamesList = [];

  if (!pullRequest?.number) {
    const getCommitEndpointOptions = octokit.rest.repos.getCommit.endpoint.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: context.sha,
    });

    type ReposGetCommitResponse = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.getCommit>;
    const response: ReposGetCommitResponse[] = await octokit.paginate(getCommitEndpointOptions);
    const filesArr = response.map((data) => data.files);

    const filesChangedInCommit = filesArr.reduce((acc, val) => acc?.concat(val || []), []);

    filenames = getFileNames(filesChangedInCommit as File[]);
  } else {
    const listFilesEndpointOptions = octokit.rest.pulls.listFiles.endpoint.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pullRequest.number,
    });

    type PullsListFilesResponse = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.pulls.listFiles>;
    const filesChangedInPR: PullsListFilesResponse = await octokit.paginate(listFilesEndpointOptions);

    filenames = getFileNames(filesChangedInPR as File[]);
  }

  return filenames;
};

export default getChangedFiles;
