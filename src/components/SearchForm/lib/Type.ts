export interface SearchFormProps {
  initialKeyword?: string;
  onSubmit: (keyword: string) => void;
}
