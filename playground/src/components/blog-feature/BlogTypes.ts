export interface PostProps {
  uuid: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
}

export interface PaginationSettingsProps {
  setPagination: (pagination: Pagination) => void;
  pagination: Pagination;
}

export interface PostFormProps {
  closeForm: () => void;
  initialFieldValues?: { body: string; title: string };
  method?: string;
  postId?: string;
}

export interface PostFormsFields {
  title: string;
  body: string;
  thumbnail: FileList;
}
