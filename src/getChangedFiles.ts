import { getInput, debug } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';

type FileList = string[];

type File = {
  filename: string;
  additions: number;
  deletions: number;
  changes: number;
  status: string;
  raw_url: string;
  blob_url: string;
  patch: string;
};

const getFiles = (files: File[]): FileList => files
  .filter((file) => file.status !== 'removed')
  .map((file) => file.filename);

const getChangedFiles = async (token: string): Promise<FileList> => {
  const octokit = getOctokit(token);
  const pullRequest = context.payload.pull_request;

  let files: FileList;
  if (!pullRequest?.number) {
    const options = octokit.repos.getCommit.endpoint.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: context.sha,
    });

    type ReposGetCommitResponseData = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.getCommit>;
    const response: ReposGetCommitResponseData[] = await octokit.paginate(options);
    const filesArr = response.map((data) => data.files);

    const filesChangedInCommit = filesArr.reduce((acc, val) => acc?.concat(val || []), []);
    files = getFiles(filesChangedInCommit as File[]);
  } else {
    const options = octokit.pulls.listFiles.endpoint.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pullRequest.number,
    });

    type PullsListFilesResponseData = GetResponseDataTypeFromEndpointMethod<typeof octokit.pulls.listFiles>;
    const prResponse: PullsListFilesResponseData = await octokit.paginate(options);
    files = getFiles(prResponse as File[]);
  }

  debug('Files changed...');
  files.forEach(debug);

  const supportedExtensions = getInput('extensions').split(',').map((ext) => ext.trim());

  const supportedFiles = files.filter((filename) => {
    const isSupportedFile = supportedExtensions.find((ext) => filename.endsWith(`.${ext}`));
    return isSupportedFile;
  });

  return supportedFiles;
};

export default getChangedFiles;
