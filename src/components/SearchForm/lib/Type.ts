export interface SearchFormProps {
    keyword: string;
    onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }