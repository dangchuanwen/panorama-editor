import { createContext } from 'react';
import { PublishedWork } from 'requests/requests';

interface IPublishedWorksContext {
  showEmpty: boolean;
  publishedWorks: PublishedWork[];
  commentable: boolean;
  handleComment?: (commentContent: string, commentedPublishedWorkID: string) => Promise<void>;
  handleDeleteComment?: (commentID: string) => Promise<void>;
}

export const PublishedWorksContext = createContext<IPublishedWorksContext>({
  showEmpty: true,
  publishedWorks: [],
  commentable: true,
});
