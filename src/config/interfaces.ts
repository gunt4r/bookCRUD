export interface headerProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export interface bookProps {
  id: string;
  title: string;
  author: string;
  year: string;
  description: string;
}

export interface bookFormProps extends Partial<bookProps> {}
