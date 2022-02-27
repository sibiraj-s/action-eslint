import { getOctokit, context } from '@actions/github';
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';

type FileNamesList = string[];

type File = {
  filename: string;
  status: string;
};

const getFileNames = (files: File[]): FileNamesList => files
  .filter((file) => file.status !== 'removed')
  .map((file) => file.filename);

const getChangedFiles = async (token: string): Promise<FileNamesList> => {
  const octokit = getOctokit(token);
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
