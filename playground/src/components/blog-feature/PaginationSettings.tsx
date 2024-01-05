import Button from "../Button";
import { PaginationSettingsProps } from "./BlogTypes";

const selectStyle = "bg-slate-50 border rounded-md px-2 py-1";

function PaginationSettings({ pagination, setPagination }: PaginationSettingsProps) {
  return (
    <div className="w-full lg:fixed py-2 bg-slate-50 px-4 rounded-md border-slate-200 border lg:w-[15rem] xl:w-[20rem]">
      <div className="flex space-x-3 items-center justify-center">
        <Button
          onclick={() => {
            if (pagination.page === 1) return;
            setPagination({ ...pagination, page: pagination.page - 1 });
          }}
        >
          Back
        </Button>
        <h1 className="font-bold text-xl">{pagination.page}</h1>
        <Button onclick={() => setPagination({ ...pagination, page: pagination.page + 1 })}>Forward</Button>
      </div>
      <div className="flex flex-col space-y-4 py-4">
        <div className="flex flex-col">
          <label className="">Posts per page</label>
          <select
            className={selectStyle}
            value={pagination.limit}
            onChange={(e) => setPagination({ ...pagination, limit: Number.parseInt(e.target.value) })}
          >
            <option value={5}>5 Posts</option>
            <option value={10}>10 Posts</option>
            <option value={20}>20 Posts</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="">Sorting</label>
          <select className={selectStyle} value={pagination.sortBy} onChange={(e) => setPagination({ ...pagination, sortBy: e.target.value })}>
            <option value="title">Title</option>
            <option value="body">Body</option>
            <option value="createdAt">Date</option>
          </select>
          <select className={selectStyle} value={pagination.sortDesc} onChange={(e) => setPagination({ ...pagination, sortDesc: e.target.value })}>
            <option value="true">Descending</option>
            <option value="false">Ascending</option>
          </select>
        </div>
        <input
          className="py-1 px-2 border rounded-md"
          placeholder="search by title"
          value={pagination.contains}
          onChange={(e) => {
            e.preventDefault();
            setPagination({ ...pagination, contains: e.target.value });
          }}
        />
      </div>
    </div>
  );
}

export default PaginationSettings;
