export interface LoadMoreButtonProps {
    onClick: () => void;
    isFetching: boolean;
    hasNextPage: boolean;
  }